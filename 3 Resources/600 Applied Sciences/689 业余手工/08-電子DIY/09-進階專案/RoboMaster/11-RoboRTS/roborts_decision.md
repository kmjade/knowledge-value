---
title: roborts_decision 决策系统
aliases:
  - RoboRTS Decision
  - 行为树
  - Behavior Tree
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/decision
  - topic/behavior-tree
  - type/tutorial
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster.github.io/RoboRTS-Tutorial/#/sdk_docs/roborts_decision
---

# roborts_decision 决策系统

> [!summary] 概述
> roborts_decision 基于行为树框架实现机器人决策，支持追击、巡逻、逃跑、搜索、导航等行为模式。

---

## 功能说明

### 核心功能

- 行为树框架
- 黑板数据共享
- 多行为模式
- 任务调度执行

### 决策架构

```
┌─────────────────────────────────────────────┐
│                  行为树                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Selector│ │ Sequence│ │ Parallel│       │
│  └────┬────┘ └────┬────┘ └────┬────┘       │
│       │           │           │             │
│  ┌────┴────┐ ┌────┴────┐ ┌────┴────┐       │
│  │ Action  │ │Condition│ │ Decorator│       │
│  └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────┤
│                  黑板                        │
│  ┌─────────────────────────────────────┐   │
│  │  机器人状态 │ 敌人信息 │ 地图数据   │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## 行为树节点

### 节点类型

| 类型 | 说明 | 返回值 |
|------|------|--------|
| **Selector** | 选择节点，任一成功即返回成功 | Success/Failure |
| **Sequence** | 顺序节点，全部成功才返回成功 | Success/Failure |
| **Parallel** | 并行节点，同时执行所有子节点 | Success/Failure |
| **Action** | 动作节点，执行具体行为 | Running/Success/Failure |
| **Condition** | 条件节点，检查条件是否满足 | Success/Failure |
| **Decorator** | 装饰节点，修改子节点行为 | 取决于装饰器类型 |

### 节点实现

```cpp
// 行为节点基类
class BehaviorNode {
public:
    enum BehaviorState { SUCCESS, FAILURE, RUNNING };
    
    virtual BehaviorState Update() = 0;
    virtual void Reset() {}
    
protected:
    BehaviorState state_;
    std::string name_;
};

// 选择节点
class SelectorNode : public BehaviorNode {
public:
    BehaviorState Update() override {
        for (auto& child : children_) {
            BehaviorState state = child->Update();
            if (state != FAILURE) {
                return state;
            }
        }
        return FAILURE;
    }
    
private:
    std::vector<std::shared_ptr<BehaviorNode>> children_;
};

// 顺序节点
class SequenceNode : public BehaviorNode {
public:
    BehaviorState Update() override {
        for (auto& child : children_) {
            BehaviorState state = child->Update();
            if (state != SUCCESS) {
                return state;
            }
        }
        return SUCCESS;
    }
    
private:
    std::vector<std::shared_ptr<BehaviorNode>> children_;
};
```

---

## 行为模式

### 行为列表

| 行为 | 说明 | 触发条件 |
|------|------|----------|
| **Chase** | 追击敌人 | 检测到敌人 |
| **Patrol** | 巡逻 | 无敌人 |
| **Escape** | 逃跑 | 血量过低 |
| **Search** | 搜索 | 目标丢失 |
| **Goal** | 导航 | 有目标点 |

### 行为实现

#### 追击行为

```cpp
class ChaseAction : public ActionNode {
public:
    BehaviorState Update() override {
        // 获取敌人位置
        auto enemy_pose = blackboard_->GetEnemyPose();
        
        if (!enemy_pose.valid) {
            return BehaviorState::FAILURE;
        }
        
        // 移动到敌人位置
        geometry_msgs::PoseStamped goal;
        goal.header.frame_id = "map";
        goal.pose.position.x = enemy_pose.x;
        goal.pose.position.y = enemy_pose.y;
        
        // 调用规划
        planner_->SetGoal(goal);
        
        return BehaviorState::RUNNING;
    }
};
```

#### 巡逻行为

```cpp
class PatrolAction : public ActionNode {
public:
    BehaviorState Update() override {
        // 获取下一个巡逻点
        if (AtCurrentPatrolPoint()) {
            patrol_index_ = (patrol_index_ + 1) % patrol_points_.size();
        }
        
        // 导航到巡逻点
        geometry_msgs::PoseStamped goal;
        goal.pose.position = patrol_points_[patrol_index_];
        planner_->SetGoal(goal);
        
        return BehaviorState::RUNNING;
    }
    
private:
    std::vector<geometry_msgs::Point> patrol_points_;
    int patrol_index_ = 0;
};
```

#### 逃跑行为

```cpp
class EscapeAction : public ActionNode {
public:
    BehaviorState Update() override {
        // 获取自身位置
        auto my_pose = blackboard_->GetRobotPose();
        
        // 计算逃跑方向 (远离敌人)
        auto enemy_pose = blackboard_->GetEnemyPose();
        double escape_x = my_pose.x - enemy_pose.x;
        double escape_y = my_pose.y - enemy_pose.y;
        
        // 归一化
        double dist = sqrt(escape_x * escape_x + escape_y * escape_y);
        escape_x /= dist;
        escape_y /= dist;
        
        // 设置逃跑目标
        geometry_msgs::PoseStamped goal;
        goal.pose.position.x = my_pose.x + escape_x * ESCAPE_DISTANCE;
        goal.pose.position.y = my_pose.y + escape_y * ESCAPE_DISTANCE;
        
        planner_->SetGoal(goal);
        
        return BehaviorState::RUNNING;
    }
};
```

---

## 黑板系统

### 黑板结构

```cpp
class Blackboard {
public:
    // 机器人状态
    struct RobotState {
        geometry_msgs::Pose pose;     // 位姿
        int hp;                        // 血量
        int ammo;                      // 弹量
        bool has_armor;               // 装甲板状态
    };
    
    // 敌人信息
    struct EnemyInfo {
        bool detected;                 // 是否检测到
        geometry_msgs::Pose pose;     // 位姿
        int id;                        // ID
    };
    
    // 数据接口
    RobotState GetRobotState() const;
    EnemyInfo GetEnemyInfo() const;
    nav_msgs::OccupancyGrid GetMap() const;
    
    void SetRobotState(const RobotState& state);
    void SetEnemyInfo(const EnemyInfo& info);
    
private:
    RobotState robot_state_;
    EnemyInfo enemy_info_;
    nav_msgs::OccupancyGrid map_;
};
```

### 数据更新

```cpp
// 订阅并更新黑板数据
void DecisionNode::UpdateBlackboard() {
    // 更新机器人位姿
    geometry_msgs::PoseWithCovarianceStamped amcl_pose;
    amcl_pose = *(ros::topic::waitForMessage<geometry_msgs::PoseWithCovarianceStamped>(
        "/amcl_pose", nh_));
    blackboard_->SetRobotPose(amcl_pose.pose.pose);
    
    // 更新敌人信息
    roborts_msgs::ArmorInfo armor_info;
    armor_info = *(ros::topic::waitForMessage<roborts_msgs::ArmorInfo>(
        "/armor_info", nh_));
    
    EnemyInfo enemy;
    enemy.detected = armor_info.detected;
    enemy.pose = armor_info.pose;
    blackboard_->SetEnemyInfo(enemy);
}
```

---

## 行为树配置

### XML 配置

```xml
<root>
    <selector>
        <!-- 血量低时逃跑 -->
        <sequence>
            <condition>hp_low</condition>
            <action>escape</action>
        </sequence>
        
        <!-- 检测到敌人时追击 -->
        <sequence>
            <condition>enemy_detected</condition>
            <action>chase</action>
        </sequence>
        
        <!-- 默认巡逻 -->
        <action>patrol</action>
    </selector>
</root>
```

### 行为树可视化

```bash
# 启动行为树可视化
rosrun roborts_decision behavior_tree_visualizer
```

---

## ROS 接口

### 订阅的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/amcl_pose` | geometry_msgs/PoseWithCovarianceStamped | 机器人位姿 |
| `/armor_info` | roborts_msgs/ArmorInfo | 敌人信息 |
| `/referee/robot_status` | roborts_msgs/RobotStatus | 比赛状态 |

### 发布的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/decision/behavior` | std_msgs/String | 当前行为 |
| `/goal` | geometry_msgs/PoseStamped | 导航目标 |

---

## 相关链接

- [[RoboRTS教程概览]] - 返回概览
- [[architecture]] - 系统架构
- [[roborts_planning]] - 规划模块
- [[roborts_detection]] - 检测模块
