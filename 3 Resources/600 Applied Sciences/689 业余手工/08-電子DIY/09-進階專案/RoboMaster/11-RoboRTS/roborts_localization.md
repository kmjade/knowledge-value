---
title: roborts_localization 定位系统
aliases:
  - RoboRTS Localization
  - AMCL 定位
  - 蒙特卡洛定位
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/localization
  - type/tutorial
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster.github.io/RoboRTS-Tutorial/#/sdk_docs/roborts_localization
---

# roborts_localization 定位系统

> [!summary] 概述
> roborts_localization 实现 AMCL (自适应蒙特卡洛定位) 算法，基于激光雷达和里程计进行机器人位姿估计。

---

## 功能说明

### 核心功能

- 自适应蒙特卡洛定位 (AMCL)
- 粒子滤波位姿估计
- 激光雷达数据融合
- 地图匹配定位

### 定位原理

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   里程计    │────▶│  运动模型   │────▶│  粒子传播   │
│  Odometry   │     │ Motion Model│     │   Propagate │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  激光雷达   │────▶│  观测模型   │────▶│  权重更新   │
│   Lidar     │     │Sensor Model │     │   Update    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  重采样     │
                                        │  Resampling │
                                        └─────────────┘
```

---

## AMCL 算法

### 粒子表示

```cpp
// 粒子结构
struct Particle {
    double x;        // X 坐标
    double y;        // Y 坐标
    double theta;    // 朝向角
    double weight;   // 权重
};

// 粒子集
class ParticleFilter {
private:
    std::vector<Particle> particles_;
    int num_particles_;
    double min_x_, max_x_, min_y_, max_y_;
};
```

### 运动模型

```cpp
// 里程计运动模型
void MotionModel(Particle& particle, 
                 const nav_msgs::Odometry& odom_old,
                 const nav_msgs::Odometry& odom_new) {
    // 计算位移增量
    double delta_x = odom_new.pose.pose.position.x - 
                     odom_old.pose.pose.position.x;
    double delta_y = odom_new.pose.pose.position.y - 
                     odom_old.pose.pose.position.y;
    double delta_theta = GetYaw(odom_new) - GetYaw(odom_old);
    
    // 添加噪声
    double alpha1 = 0.1, alpha2 = 0.1, alpha3 = 0.1;
    double delta_rot1 = atan2(delta_y, delta_x) - GetYaw(odom_old);
    double delta_trans = sqrt(delta_x * delta_x + delta_y * delta_y);
    double delta_rot2 = delta_theta - delta_rot1;
    
    // 更新粒子位姿
    particle.x += delta_trans * cos(particle.theta + delta_rot1) +
                  GaussianNoise(alpha1 * delta_trans);
    particle.y += delta_trans * sin(particle.theta + delta_rot1) +
                  GaussianNoise(alpha2 * delta_trans);
    particle.theta += delta_theta + GaussianNoise(alpha3 * delta_theta);
}
```

### 观测模型

```cpp
// 激光观测模型
double SensorModel(const Particle& particle,
                   const sensor_msgs::LaserScan& scan,
                   const nav_msgs::OccupancyGrid& map) {
    double weight = 1.0;
    
    // 遍历激光束
    for (size_t i = 0; i < scan.ranges.size(); i += 10) {
        if (scan.ranges[i] < scan.range_min || 
            scan.ranges[i] > scan.range_max) {
            continue;
        }
        
        // 计算激光终点在地图中的位置
        double angle = particle.theta + scan.angle_min + i * scan.angle_increment;
        double end_x = particle.x + scan.ranges[i] * cos(angle);
        double end_y = particle.y + scan.ranges[i] * sin(angle);
        
        // 地图匹配
        int map_x = (end_x - map.info.origin.position.x) / map.info.resolution;
        int map_y = (end_y - map.info.origin.position.y) / map.info.resolution;
        
        if (map_x >= 0 && map_x < (int)map.info.width &&
            map_y >= 0 && map_y < (int)map.info.height) {
            int idx = map_y * map.info.width + map_x;
            if (map.data[idx] > 50) {  // 障碍物
                weight *= 0.9;
            } else {
                weight *= 0.5;
            }
        }
    }
    
    return weight;
}
```

### 重采样

```cpp
// 自适应重采样
void Resample() {
    // 计算有效粒子数
    double neff = 0;
    for (const auto& p : particles_) {
        neff += p.weight * p.weight;
    }
    neff = 1.0 / neff;
    
    // 只有当有效粒子数过少时才重采样
    if (neff < num_particles_ * 0.5) {
        // 轮盘赌重采样
        std::vector<Particle> new_particles;
        double beta = 0;
        int index = rand() % num_particles_;
        
        for (int i = 0; i < num_particles_; i++) {
            beta += (double)rand() / RAND_MAX * 2 * MaxWeight();
            while (beta > particles_[index].weight) {
                beta -= particles_[index].weight;
                index = (index + 1) % num_particles_;
            }
            new_particles.push_back(particles_[index]);
        }
        
        particles_ = new_particles;
        
        // 重置权重
        for (auto& p : particles_) {
            p.weight = 1.0 / num_particles_;
        }
    }
}
```

---

## 地图服务

### 地图加载

```cpp
// 从地图服务器获取地图
nav_msgs::OccupancyGrid GetMap() {
    ros::ServiceClient client = 
        nh_.serviceClient<nav_msgs::GetMap>("/static_map");
    
    nav_msgs::GetMap srv;
    if (client.call(srv)) {
        return srv.response.map;
    } else {
        ROS_ERROR("Failed to get map");
        return nav_msgs::OccupancyGrid();
    }
}
```

### 地图索引

```cpp
// 世界坐标转地图索引
void WorldToMap(double x, double y, int& map_x, int& map_y,
                const nav_msgs::OccupancyGrid& map) {
    map_x = (int)((x - map.info.origin.position.x) / map.info.resolution);
    map_y = (int)((y - map.info.origin.position.y) / map.info.resolution);
}

// 地图索引转世界坐标
void MapToWorld(int map_x, int map_y, double& x, double& y,
                const nav_msgs::OccupancyGrid& map) {
    x = map.info.origin.position.x + (map_x + 0.5) * map.info.resolution;
    y = map.info.origin.position.y + (map_y + 0.5) * map.info.resolution;
}
```

---

## ROS 接口

### 订阅的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/scan` | sensor_msgs/LaserScan | 激光数据 |
| `/odom` | nav_msgs/Odometry | 里程计 |
| `/initialpose` | geometry_msgs/PoseWithCovarianceStamped | 初始位姿 |

### 发布的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/amcl_pose` | geometry_msgs/PoseWithCovarianceStamped | 机器人位姿 |
| `/particlecloud` | geometry_msgs/PoseArray | 粒子云可视化 |

### 服务

| 服务 | 类型 | 说明 |
|------|------|------|
| `/global_localization` | std_srvs/Empty | 全局重定位 |
| `/request_nomotion_update` | std_srvs/Empty | 无运动更新 |

---

## 参数配置

### 关键参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `min_particles` | 500 | 最小粒子数 |
| `max_particles` | 5000 | 最大粒子数 |
| `kld_err` | 0.01 | KL 距离误差 |
| `update_min_d` | 0.2 | 最小位移更新阈值 |
| `update_min_a` | π/6 | 最小角度更新阈值 |
| `resample_interval` | 2 | 重采样间隔 |
| `alpha1` | 0.2 | 旋转噪声参数 |
| `alpha2` | 0.2 | 平移噪声参数 |
| `laser_model_type` | likelihood_field | 激光模型类型 |

---

## 初始化

### 设置初始位姿

```bash
# 通过 RViz 2D Pose Estimate 设置
# 或发布话题
rostopic pub /initialpose geometry_msgs/PoseWithCovarianceStamped \
    "header: {frame_id: 'map'}
     pose:
       pose:
         position: {x: 0, y: 0, z: 0}
         orientation: {x: 0, y: 0, z: 0, w: 1}"
```

### 全局重定位

```bash
# 触发全局重定位
rosservice call /global_localization
```

---

## 相关链接

- [[RoboRTS教程概览]] - 返回概览
- [[architecture]] - 系统架构
- [[roborts_planning]] - 规划模块
- [ROS AMCL Wiki](http://wiki.ros.org/amcl)
