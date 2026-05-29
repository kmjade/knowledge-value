---
title: Nav2自主導航基礎
tags: [智能小车, Nav2, ROS2, 導航, SLAM]
created: 2026-05-29
aliases: [Nav2 Navigation, Nav2 导航基础]
---

# Nav2 自主導航基礎 Navigation2 Basics

> Nav2 是 ROS2 的標準導航棧——讓 OriginBot 從「遙控小車」升級為「自主機器人」。

## Nav2 架構總覽

```
┌──────────────────────────────────────────────────┐
│                   Nav2 導航棧                     │
│                                                  │
│  ┌──────────┐   ┌──────────┐   ┌─────────────┐  │
│  │  BT 行為樹 │   │ Planner  │   │ Controller  │  │
│  │  (任務編排)│   │ (全局路徑)│   │  (局部控制)  │  │
│  └─────┬─────┘   └────┬─────┘   └──────┬──────┘  │
│        │              │                │          │
│  ┌─────▼──────────────▼────────────────▼──────┐  │
│  │              Costmap (代價地圖)              │  │
│  │         global_costmap / local_costmap      │  │
│  └─────────────────────┬──────────────────────┘  │
│                        │                         │
│        ┌───────────────┼───────────────┐         │
│  ┌─────▼─────┐  ┌──────▼──────┐ ┌─────▼─────┐   │
│  │  AMCL     │  │  SLAM       │ │ Sensor    │   │
│  │  (定位)   │  │  (建圖)     │ │ Data      │   │
│  └───────────┘  └─────────────┘ └───────────┘   │
└──────────────────────────────────────────────────┘
```

## 核心組件 Core Components

| 組件 | 功能 | 輸入 | 輸出 |
|------|------|------|------|
| **Planner** | 全局路徑規劃 | Map + 起點 + 終點 | 全局路徑 |
| **Controller** | 局部軌跡跟蹤 | 全局路徑 + Costmap | `/cmd_vel` |
| **Costmap** | 障礙物代價地圖 | `/scan` + Map | 代價網格 |
| **AMCL** | 自適應蒙特卡洛定位 | `/scan` + Map + TF | 機器人位置 |
| **BT (行為樹)** | 任務編排 | Goal | Nav2 動作序列 |
| **Recoveries** | 故障恢復 | 卡住/碰撞 | 旋轉/後退 |

## 安裝 Nav2

```bash
# RDK X3 端
sudo apt install -y \
    ros-humble-navigation2 \
    ros-humble-nav2-bringup \
    ros-humble-nav2-rviz-plugins

# PC 端（用於可視化和模擬）
sudo apt install -y \
    ros-humble-navigation2 \
    ros-humble-nav2-bringup \
    ros-humble-turtlebot3-gazebo  # 可選：模擬用
```

## Nav2 參數配置

### nav2_params.yaml（核心配置）

```yaml
amcl:
  ros__parameters:
    use_sim_time: false
    alpha1: 0.2    # 旋轉噪聲
    alpha2: 0.2    # 平移噪聲
    base_frame_id: "base_link"
    odom_frame_id: "odom"
    scan_topic: /scan
    # 粒子濾波器
    max_particles: 2000
    min_particles: 500
    update_min_d: 0.2   # 移動 0.2m 後更新
    update_min_a: 0.2   # 旋轉 0.2rad 後更新

bt_navigator:
  ros__parameters:
    use_sim_time: false
    default_nav_to_pose_bt_xml: "navigate_to_pose_w_replanning_and_recovery.xml"

controller_server:
  ros__parameters:
    use_sim_time: false
    controller_frequency: 20.0   # 20Hz 控制迴圈
    # DWB Controller 參數
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.3        # 最大前進速度
      min_vel_x: -0.15      # 最大後退速度
      max_vel_theta: 1.5    # 最大旋轉速度
      acc_lim_x: 0.5        # 加速度限制
      acc_lim_theta: 2.0

planner_server:
  ros__parameters:
    use_sim_time: false
    GridBased:
      plugin: "nav2_navfn_planner/NavfnPlanner"
      tolerance: 0.5        # 目標容忍距離 (m)
      use_astar: true       # 使用 A* 算法

local_costmap:
  local_costmap:
    ros__parameters:
      update_frequency: 5.0
      publish_frequency: 2.0
      global_frame: odom
      robot_base_frame: base_link
      rolling_window: true   # 滾動窗口
      width: 3               # 3m × 3m 局部地圖
      height: 3
      resolution: 0.05       # 5cm 分辨率
      # 障礙物層
      obstacle_layer:
        plugin: "nav2_costmap_2d::ObstacleLayer"
        enabled: true
        observation_sources: scan
        scan:
          topic: /scan
          max_obstacle_height: 0.6
          clearing: true

global_costmap:
  global_costmap:
    ros__parameters:
      update_frequency: 1.0
      publish_frequency: 0.5
      global_frame: map
      robot_base_frame: base_link
      rolling_window: false   # 固定地圖
      resolution: 0.05
```

## 導航工作流 Navigation Workflow

### Phase 1: SLAM 建圖

```bash
# RDK 端：啟動 SLAM + 感測器 + 底盤
source /opt/tros/humble/setup.bash
ros2 launch originbot_bringup originbot_slam.launch.py

# PC 端：遙控小車建圖
source /opt/ros/humble/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
ros2 run teleop_twist_keyboard teleop_twist_keyboard

# PC 端：Rviz2 觀察建圖
rviz2

# 建圖完成後保存地圖
ros2 run nav2_map_server map_saver_cli -f ~/map
# 生成 map.yaml + map.pgm
```

### Phase 2: 自主導航

```bash
# RDK 端：啟動 Nav2（使用已保存地圖）
source /opt/tros/humble/setup.bash
ros2 launch originbot_bringup originbot_nav.launch.py \
    map:=/home/root/map.yaml

# PC 端：Rviz2
rviz2
# → 點擊 "2D Pose Estimate" 設置初始位置
# → 點擊 "Nav2 Goal" 設置導航目標
# → 小車自主規劃路徑並移動到目標點
```

### Phase 3: 避障與恢復

```
Nav2 自動處理：
1. 路徑上出現障礙物 → local_costmap 檢測 → Controller 繞行
2. 全局路徑被阻擋 → Planner 重新規劃路徑
3. 小車被卡住 → Recovery 行為啟動（原地旋轉 → 後退 → 重試）
```

## Launch 文件範例

```python
# originbot_nav.launch.py
import os
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    # 參數：地圖文件路徑
    map_arg = DeclareLaunchArgument(
        'map', default_value='/home/root/map.yaml',
        description='Full path to map yaml file')
    
    map_file = LaunchConfiguration('map')
    
    # Nav2 參數文件
    param_file = os.path.join(
        get_package_share_directory('originbot_nav'),
        'config', 'nav2_params.yaml')
    
    return LaunchDescription([
        map_arg,
        
        # Map Server（提供地圖）
        Node(package='nav2_map_server',
             executable='map_server',
             name='map_server',
             parameters=[{'yaml_filename': map_file}]),
        
        # AMCL（定位）
        Node(package='nav2_amcl',
             executable='amcl',
             name='amcl',
             parameters=[param_file]),
        
        # Nav2 核心
        Node(package='nav2_planner',
             executable='planner_server',
             name='planner_server',
             parameters=[param_file]),
        
        Node(package='nav2_controller',
             executable='controller_server',
             name='controller_server',
             parameters=[param_file]),
        
        Node(package='nav2_bt_navigator',
             executable='bt_navigator',
             name='bt_navigator',
             parameters=[param_file]),
        
        # 生命週期管理器
        Node(package='nav2_lifecycle_manager',
             executable='lifecycle_manager',
             name='lifecycle_manager_navigation',
             parameters=[{'autostart': True},
                        {'node_names': ['map_server', 'amcl',
                                        'planner_server', 'controller_server',
                                        'bt_navigator']}]),
    ])
```

## 常用調試命令

```bash
# 查看導航狀態
ros2 topic echo /navigate_to_pose/_action/status

# 查看當前 Costmap
ros2 run nav2_util costmap_info

# 發送導航目標（命令行）
ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose \
    "{pose: {header: {frame_id: 'map'}, pose: {position: {x: 2.0, y: 0.0, z: 0.0}, orientation: {w: 1.0}}}}"

# 取消導航
ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose "{}" --cancel
```

## 相關資源

- [[OriginBot-Nav2導航實戰|OriginBot Nav2 導航實戰]]
- [[RDK-SLAM建圖|SLAM 建圖]]
- [[ROS2-基礎概念與安裝|ROS2 基礎]]
- [[ROS2-Twist控制與里程計|ROS2 Twist & 里程計]]
