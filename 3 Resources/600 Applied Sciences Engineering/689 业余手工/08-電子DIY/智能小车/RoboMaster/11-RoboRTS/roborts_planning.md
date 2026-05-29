---
title: roborts_planning 运动规划
aliases:
  - RoboRTS Planning
  - 路径规划
  - Global Planner
  - Local Planner
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/planning
  - topic/navigation
  - type/tutorial
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster.github.io/RoboRTS-Tutorial/#/sdk_docs/roborts_planning_global_planner
---

# roborts_planning 运动规划

> [!summary] 概述
> roborts_planning 实现全局路径规划和局部轨迹规划，支持 A*/Dijkstra 全局规划和 DWA/TEB 局部规划。

---

## 功能说明

### 规划架构

```
目标点
  │
  ▼
┌─────────────┐
│ 全局规划器   │ ─── A*/Dijkstra
│Global Planner│
└──────┬──────┘
       │ 全局路径
       ▼
┌─────────────┐
│  代价地图   │ ─── 障碍物信息
│  Costmap    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 局部规划器   │ ─── DWA/TEB
│Local Planner │
└──────┬──────┘
       │ 速度指令
       ▼
    /cmd_vel
```

---

## 全局规划器

### A* 算法

```cpp
class AStarPlanner {
public:
    std::vector<geometry_msgs::PoseStamped> MakePlan(
        const geometry_msgs::PoseStamped& start,
        const geometry_msgs::PoseStamped& goal) {
        
        std::priority_queue<Node> open_list;
        std::set<int> closed_list;
        
        // 起点
        Node start_node;
        start_node.pose = start;
        start_node.g_cost = 0;
        start_node.h_cost = Heuristic(start, goal);
        start_node.f_cost = start_node.g_cost + start_node.h_cost;
        open_list.push(start_node);
        
        while (!open_list.empty()) {
            Node current = open_list.top();
            open_list.pop();
            
            // 到达目标
            if (Distance(current.pose, goal) < tolerance_) {
                return ReconstructPath(current);
            }
            
            closed_list.insert(GetIndex(current.pose));
            
            // 扩展邻居
            for (const auto& neighbor : GetNeighbors(current.pose)) {
                if (closed_list.count(GetIndex(neighbor))) {
                    continue;
                }
                
                double tentative_g = current.g_cost + 
                    Distance(current.pose, neighbor);
                
                Node neighbor_node;
                neighbor_node.pose = neighbor;
                neighbor_node.g_cost = tentative_g;
                neighbor_node.h_cost = Heuristic(neighbor, goal);
                neighbor_node.f_cost = neighbor_node.g_cost + neighbor_node.h_cost;
                neighbor_node.parent = &current;
                
                open_list.push(neighbor_node);
            }
        }
        
        return {};  // 无路径
    }
    
private:
    double Heuristic(const geometry_msgs::PoseStamped& a,
                     const geometry_msgs::PoseStamped& b) {
        // 欧几里得距离
        return sqrt(pow(a.pose.position.x - b.pose.position.x, 2) +
                    pow(a.pose.position.y - b.pose.position.y, 2));
    }
};
```

### Dijkstra 算法

```cpp
class DijkstraPlanner {
public:
    std::vector<geometry_msgs::PoseStamped> MakePlan(
        const geometry_msgs::PoseStamped& start,
        const geometry_msgs::PoseStamped& goal) {
        
        std::priority_queue<Node, std::vector<Node>, CompareGCost> open_list;
        std::unordered_map<int, double> cost_so_far;
        
        Node start_node;
        start_node.pose = start;
        start_node.g_cost = 0;
        open_list.push(start_node);
        cost_so_far[GetIndex(start)] = 0;
        
        while (!open_list.empty()) {
            Node current = open_list.top();
            open_list.pop();
            
            if (Distance(current.pose, goal) < tolerance_) {
                return ReconstructPath(current);
            }
            
            for (const auto& neighbor : GetNeighbors(current.pose)) {
                double new_cost = current.g_cost + 
                    Distance(current.pose, neighbor);
                
                int idx = GetIndex(neighbor);
                if (cost_so_far.find(idx) == cost_so_far.end() ||
                    new_cost < cost_so_far[idx]) {
                    cost_so_far[idx] = new_cost;
                    
                    Node neighbor_node;
                    neighbor_node.pose = neighbor;
                    neighbor_node.g_cost = new_cost;
                    neighbor_node.parent = &current;
                    
                    open_list.push(neighbor_node);
                }
            }
        }
        
        return {};
    }
};
```

---

## 局部规划器

### DWA (Dynamic Window Approach)

```cpp
class DWAPlanner {
public:
    geometry_msgs::Twist ComputeVelocityCommands(
        const geometry_msgs::PoseStamped& current_pose,
        const std::vector<geometry_msgs::PoseStamped>& global_plan) {
        
        // 计算动态窗口
        DynamicWindow window = CalculateDynamicWindow();
        
        // 采样速度空间
        std::vector<VelocitySample> samples;
        for (double v = window.min_v; v <= window.max_v; v += v_resolution_) {
            for (double w = window.min_w; w <= window.max_w; w += w_resolution_) {
                VelocitySample sample;
                sample.v = v;
                sample.w = w;
                sample.score = EvaluateTrajectory(v, w, current_pose, global_plan);
                samples.push_back(sample);
            }
        }
        
        // 选择最优速度
        auto best = std::max_element(samples.begin(), samples.end(),
            [](const VelocitySample& a, const VelocitySample& b) {
                return a.score < b.score;
            });
        
        geometry_msgs::Twist cmd_vel;
        cmd_vel.linear.x = best->v;
        cmd_vel.angular.z = best->w;
        
        return cmd_vel;
    }
    
private:
    DynamicWindow CalculateDynamicWindow() {
        DynamicWindow window;
        
        // 速度限制
        window.max_v = std::min(max_vel_x_, current_vel_x_ + max_accel_x_ * sim_time_);
        window.min_v = std::max(min_vel_x_, current_vel_x_ - max_accel_x_ * sim_time_);
        window.max_w = std::min(max_vel_theta_, current_vel_theta_ + max_accel_theta_ * sim_time_);
        window.min_w = std::max(-max_vel_theta_, current_vel_theta_ - max_accel_theta_ * sim_time_);
        
        return window;
    }
    
    double EvaluateTrajectory(double v, double w,
                              const geometry_msgs::PoseStamped& pose,
                              const std::vector<geometry_msgs::PoseStamped>& plan) {
        // 模拟轨迹
        Trajectory traj = SimulateTrajectory(v, w, pose);
        
        // 计算评分
        double score = 0;
        score += path_distance_weight_ * PathDistanceScore(traj, plan);
        score += goal_distance_weight_ * GoalDistanceScore(traj);
        score += obstacle_cost_weight_ * ObstacleCost(traj);
        
        return score;
    }
};
```

### TEB (Timed Elastic Band)

```cpp
class TEBPlanner {
public:
    geometry_msgs::Twist ComputeVelocityCommands() {
        // 优化时间弹性带
        OptimizeTEB();
        
        // 提取第一个速度指令
        if (!teb_.empty()) {
            return teb_.front().velocity;
        }
        
        return geometry_msgs::Twist();
    }
    
private:
    void OptimizeTEB() {
        for (int iter = 0; iter < max_iterations_; iter++) {
            // 计算障碍物代价
            double obstacle_cost = ComputeObstacleCost();
            
            // 计算时间代价
            double time_cost = ComputeTimeCost();
            
            // 计算运动学代价
            double kinematic_cost = ComputeKinematicCost();
            
            // 梯度下降
            double total_cost = obstacle_cost + time_cost + kinematic_cost;
            if (total_cost < tolerance_) {
                break;
            }
            
            UpdateTEB();
        }
    }
};
```

---

## 代价地图

### 地图结构

```cpp
class Costmap {
public:
    struct Layer {
        std::vector<unsigned char> data;
        int width, height;
        double resolution;
    };
    
    // 更新障碍物
    void UpdateObstacles(const sensor_msgs::LaserScan& scan) {
        for (size_t i = 0; i < scan.ranges.size(); i++) {
            if (scan.ranges[i] < scan.range_max) {
                // 计算障碍物位置
                double angle = scan.angle_min + i * scan.angle_increment;
                double x = robot_x_ + scan.ranges[i] * cos(angle + robot_theta_);
                double y = robot_y_ + scan.ranges[i] * sin(angle + robot_theta_);
                
                // 更新代价
                int map_x, map_y;
                WorldToMap(x, y, map_x, map_y);
                SetCost(map_x, map_y, LETHAL_OBSTACLE);
                
                // 膨胀障碍物
                InflateObstacle(map_x, map_y);
            }
        }
    }
    
private:
    void InflateObstacle(int center_x, int center_y) {
        int inflation_radius = inflation_radius_ / resolution_;
        
        for (int dx = -inflation_radius; dx <= inflation_radius; dx++) {
            for (int dy = -inflation_radius; dy <= inflation_radius; dy++) {
                int x = center_x + dx;
                int y = center_y + dy;
                
                if (IsValid(x, y)) {
                    double dist = sqrt(dx * dx + dy * dy) * resolution_;
                    unsigned char cost = CostLookup(dist);
                    if (cost > GetCost(x, y)) {
                        SetCost(x, y, cost);
                    }
                }
            }
        }
    }
};
```

---

## Actionlib 接口

### Action 定义

```
# Goal
geometry_msgs/PoseStamped target_pose
---
# Result
bool success
---
# Feedback
geometry_msgs/Pose base_position
float64 distance_to_goal
float64 angle_to_goal
```

### Action Server

```cpp
class PlanningActionServer {
public:
    void ExecuteCallback(const move_base_msgs::MoveBaseGoalConstPtr& goal) {
        ros::Rate rate(20);
        
        // 全局规划
        auto global_plan = global_planner_->MakePlan(
            current_pose_, goal->target_pose);
        
        if (global_plan.empty()) {
            as_.setAborted();
            return;
        }
        
        while (ros::ok()) {
            // 局部规划
            auto cmd_vel = local_planner_->ComputeVelocityCommands(
                current_pose_, global_plan);
            
            cmd_vel_pub_.publish(cmd_vel);
            
            // 检查是否到达
            double distance = Distance(current_pose_, goal->target_pose);
            if (distance < tolerance_) {
                as_.setSucceeded();
                return;
            }
            
            // 发布反馈
            feedback_.base_position = current_pose_;
            feedback_.distance_to_goal = distance;
            as_.publishFeedback(feedback_);
            
            // 检查是否被抢占
            if (as_.isPreemptRequested()) {
                as_.setPreempted();
                return;
            }
            
            rate.sleep();
        }
    }
};
```

---

## ROS 接口

### Action

| Action | 说明 |
|--------|------|
| `/move_base` | 导航 Action |

### 发布的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/cmd_vel` | geometry_msgs/Twist | 速度指令 |
| `/global_plan` | nav_msgs/Path | 全局路径 |
| `/local_plan` | nav_msgs/Path | 局部路径 |

### 参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `planner_frequency` | 1.0 | 规划频率 |
| `planner_patience` | 5.0 | 规划超时 |
| `max_vel_x` | 0.5 | 最大前进速度 |
| `max_vel_theta` | 1.0 | 最大旋转速度 |
| `acc_lim_x` | 2.5 | 最大加速度 |
| `xy_goal_tolerance` | 0.1 | 位置容差 |
| `yaw_goal_tolerance` | 0.1 | 角度容差 |

---

## 相关链接

- [[RoboRTS教程概览]] - 返回概览
- [[architecture]] - 系统架构
- [[roborts_decision]] - 决策模块
- [[roborts_localization]] - 定位模块
