---
title: OriginBot-Nav2導航實戰
tags: [智能小车, OriginBot, Nav2, 導航, 實戰]
created: 2026-05-29
aliases: [OriginBot Nav2 Navigation, OriginBot 导航实战]
---

# OriginBot + Nav2 導航實戰 Navigation in Action

> 從零到自主導航——SLAM 建圖 → 保存地圖 → AMCL 定位 → 路徑規劃 → 避障導航。

## 完整流程總覽

```
Phase 1: 環境準備     (5 分鐘)   硬體檢查 + 軟體安裝
Phase 2: SLAM 建圖    (15 分鐘)  手動遙控小車建立環境地圖
Phase 3: 保存地圖     (1 分鐘)   匯出 map.yaml + map.pgm
Phase 4: 自主導航     (∞)       設置目標點 → 小車自主到達
Phase 5: 進階調優     (持續)     調整參數提升導航效果
```

## Phase 1: 環境準備

### 硬體檢查

```bash
# 所有感測器正常發布數據
ros2 topic list | grep -E "(scan|imu|image|odom)"

# 確認 TF 樹完整
ros2 run tf2_tools view_frames

# 必需 Topic：
# ✅ /scan       — LiDAR
# ✅ /odom       — 里程計
# ✅ /imu        — IMU (可選，但推薦)
# ✅ /tf         — 座標變換
```

### 簡易感測器檢查腳本

```bash
#!/bin/bash
echo "=== OriginBot Nav2 Ready Check ==="

# LiDAR
timeout 3 ros2 topic echo /scan --once > /dev/null 2>&1 && \
    echo "✅ LiDAR (/scan)" || echo "❌ LiDAR MISSING"

# Odometry
timeout 3 ros2 topic echo /odom --once > /dev/null 2>&1 && \
    echo "✅ Odometry (/odom)" || echo "❌ Odometry MISSING"

# TF
timeout 3 ros2 run tf2_ros tf2_echo odom base_link --once > /dev/null 2>&1 && \
    echo "✅ TF (odom→base_link)" || echo "❌ TF MISSING"

echo "=== Check Complete ==="
```

## Phase 2: SLAM 建圖

### Step 1: 啟動 OriginBot（含 SLAM）

```bash
# RDK X3 端
source /opt/tros/humble/setup.bash

# 啟動底盤 + 感測器 + SLAM
ros2 launch originbot_bringup originbot_slam.launch.py
```

### Step 2: PC 端遙控建圖

```bash
# PC 端 — 確保與 RDK 同一網路
source /opt/ros/humble/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# Terminal 1: Teleop 鍵盤遙控
ros2 run teleop_twist_keyboard teleop_twist_keyboard
# 使用 i/k/j/l 控制小車在環境中移動

# Terminal 2: Rviz2 觀察地圖
rviz2
# → Fixed Frame: map
# → Add → By topic → /map → Map
# → Add → By topic → /scan → LaserScan
```

### 建圖技巧

| 技巧 | 說明 |
|------|------|
| **慢速移動** | 速度 < 0.2 m/s，避免地圖變形 |
| **閉環** | 繞環境一圈回到起點，SLAM 可自動修正累積誤差 |
| **多角度** | 經過同一區域時稍微轉向，讓雷達掃到不同角度 |
| **覆蓋完整** | 不要遺漏角落，確保目標導航區域都被掃描 |
| **排除動態物體** | 建圖時避免有人在環境中走動 |

## Phase 3: 保存地圖

```bash
# 在 RDK X3 終端執行
ros2 run nav2_map_server map_saver_cli -f ~/map

# 確認生成文件
ls -la ~/map.yaml ~/map.pgm
# map.yaml: 地圖元數據（解析度、原點、佔用閾值）
# map.pgm: 地圖圖片（白色=自由空間、黑色=牆壁、灰色=未知）
```

### map.yaml 範例

```yaml
image: /home/root/map.pgm
mode: trinary
resolution: 0.05          # 5cm/pixel
origin: [-10.0, -10.0, 0.0]  # 地圖原點在 world frame 中的位置
negate: 0
occupied_thresh: 0.65     # >65% 黑色 → 障礙物
free_thresh: 0.25         # <25% 白色 → 自由空間
```

## Phase 4: 自主導航

### Step 1: 啟動 Nav2

```bash
# RDK X3 端
source /opt/tros/humble/setup.bash
ros2 launch originbot_bringup originbot_nav.launch.py \
    map:=/home/root/map.yaml
```

### Step 2: PC 端設置初始位置

```bash
# PC 端
source /opt/ros/humble/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
rviz2
```

在 RViz2 中：
1. **點擊 "2D Pose Estimate"** → 在地圖上標記小車當前位置和朝向
   - 箭頭方向 = 小車前方
2. 觀察雷射掃描點雲是否與地圖吻合
   - 吻合 → 定位正確
   - 不吻合 → 重新設置初始位置

### Step 3: 設置導航目標

在 RViz2 中：
1. **點擊 "Nav2 Goal"** → 在地圖上點擊目標位置 + 拖曳設置朝向
2. Nav2 自動：
   - 全局路徑規劃（綠色線）
   - 局部軌跡生成
   - 發布 `/cmd_vel` 控制小車
3. 觀察小車自主移動到目標點

### Step 4: 驗證導航

```bash
# 觀看導航狀態
ros2 topic echo /navigate_to_pose/_action/status

# 觀看當前速度
ros2 topic echo /cmd_vel
```

## Phase 5: 參數調優

### 常見問題與調整

| 問題 | 原因 | 解決方案 |
|------|------|---------|
| 小車撞牆 | local_costmap 更新太慢 | 提高 `update_frequency` |
| 路徑鋸齒狀 | Planner 容差太大 | 減小 `tolerance` |
| 轉彎過猛 | 角速度限制太高 | 降低 `max_vel_theta` |
| 定位漂移 | AMCL 粒子不足 | 增加 `max_particles` |
| 卡住不恢復 | Recovery 未觸發 | 檢查 BT XML 配置 |

### 調優參數速查

```yaml
# 保守型（室內狹窄空間）
controller_server:
  max_vel_x: 0.2
  max_vel_theta: 0.8
local_costmap:
  inflation_radius: 0.3   # 膨脹半徑（安全距離）

# 進取型（開闊空間）
controller_server:
  max_vel_x: 0.5
  max_vel_theta: 2.0
local_costmap:
  inflation_radius: 0.15
```

## 多目標點導航（Waypoint Following）

```python
# waypoint_nav.py — 多目標點依次導航
import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from nav2_msgs.action import NavigateToPose
from geometry_msgs.msg import PoseStamped

class WaypointNavigator(Node):
    def __init__(self):
        super().__init__('waypoint_navigator')
        self.nav_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')
        
        # 定義巡檢路線
        self.waypoints = [
            {'x': 0.0, 'y': 0.0, 'yaw': 0.0},     # 起點
            {'x': 2.0, 'y': 0.0, 'yaw': 1.57},    # 點 A
            {'x': 2.0, 'y': 2.0, 'yaw': 3.14},    # 點 B
            {'x': 0.0, 'y': 2.0, 'yaw': -1.57},   # 點 C
            {'x': 0.0, 'y': 0.0, 'yaw': 0.0},     # 返回起點
        ]
        self.current = 0
        self.send_next_goal()
    
    def send_next_goal(self):
        if self.current >= len(self.waypoints):
            self.get_logger().info('✅ All waypoints visited!')
            return
        
        wp = self.waypoints[self.current]
        goal = PoseStamped()
        goal.header.frame_id = 'map'
        goal.pose.position.x = wp['x']
        goal.pose.position.y = wp['y']
        goal.pose.orientation.z = 0.0
        goal.pose.orientation.w = 1.0
        
        self.get_logger().info(f'Navigating to waypoint {self.current}: ({wp["x"]}, {wp["y"]})')
        self.nav_client.wait_for_server()
        future = self.nav_client.send_goal_async(
            NavigateToPose.Goal(pose=goal))
        future.add_done_callback(self.goal_response_callback)
    
    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().error('Goal rejected')
            return
        result_future = goal_handle.get_result_async()
        result_future.add_done_callback(self.result_callback)
    
    def result_callback(self, future):
        self.current += 1
        self.send_next_goal()

def main():
    rclpy.init()
    node = WaypointNavigator()
    rclpy.spin(node)
```

## 相關資源

- [[Nav2-自主導航基礎|Nav2 導航基礎]]
- [[OriginBot-TROS整合實戰|TROS 整合實戰]]
- [[OriginBot-底盤控制節點|底盤控制]]
- [[RDK-SLAM建圖|SLAM 建圖]]
