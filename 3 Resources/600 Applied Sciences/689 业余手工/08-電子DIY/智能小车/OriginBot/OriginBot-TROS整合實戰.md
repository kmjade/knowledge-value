---
title: OriginBot-TROS整合實戰
tags: [智能小车, OriginBot, TROS, RDK, BPU, hobot_dnn]
created: 2026-05-29
aliases: [OriginBot TROS Integration, OriginBot TROS 实战]
---

# OriginBot + TROS 整合實戰 TROS Integration

> TogetheROS.Bot 是地平線專為 RDK 設計的 ROS2 增強版——OriginBot + TROS = 硬體加速的 AI 機器人。

## TROS 為 OriginBot 帶來的增強

| TROS 模組 | OriginBot 應用 | 傳統 ROS2 對比 |
|-----------|---------------|---------------|
| **hobot_dnn** | BPU 加速物體檢測 (FCOS, YOLO) | CPU 推理 → 慢 5–10 倍 |
| **hobot_cv** | 硬體加速圖像 Resize/Crop | CPU 處理 → 佔用資源 |
| **hobot_codec** | 硬體 H.264 編碼 | 軟體編碼 → CPU 高負載 |
| **hobot_sensor** | MIPI 攝像頭 + USB 攝像頭統一 | 各自驅動 |
| **zero-copy** | 進程間零拷貝影像傳輸 | 記憶體複製 → 延遲 |
| **hobot Render** | Web 瀏覽器即時渲染 AI 結果 | 需額外 WebRTC |

## 整合架構

```
┌─────────────────────────────────────────────────────┐
│                   OriginBot + TROS                   │
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ LiDAR   │  │ Camera   │  │ IMU               │  │
│  │ /scan   │  │ /image   │  │ /imu              │  │
│  └────┬────┘  └────┬─────┘  └────────┬──────────┘  │
│       │            │                 │              │
│       │       ┌────▼──────────┐      │              │
│       │       │  hobot_dnn    │      │              │
│       │       │  (BPU 推理)   │      │              │
│       │       │  FCOS / YOLO  │      │              │
│       │       └────┬──────────┘      │              │
│       │            │                 │              │
│       └────────────┼─────────────────┘              │
│                    │                                │
│               ┌────▼──────────┐                     │
│               │  Nav2 導航    │                     │
│               │  SLAM + 規劃  │                     │
│               └────┬──────────┘                     │
│                    │                                │
│               ┌────▼──────────┐                     │
│               │  /cmd_vel     │                     │
│               │  底盤控制      │                     │
│               └───────────────┘                     │
└─────────────────────────────────────────────────────┘
```

## 實戰 1: AI 物體檢測 + Web 可視化

### 啟動

```bash
# Terminal 1: 啟動攝像頭
source /opt/tros/humble/setup.bash
ros2 launch mipi_cam mipi_cam.launch.py \
    mipi_out_format:=bgr8 \
    mipi_image_width:=960 \
    mipi_image_height:=544

# Terminal 2: 啟動 FCOS 物體檢測 (BPU 加速)
source /opt/tros/humble/setup.bash
ros2 launch dnn_node_example dnn_node_example.launch.py \
    dnn_example_config_file:=config/fcosworkconfig.json \
    dnn_example_image_width:=960 \
    dnn_example_image_height:=544

# Terminal 3: 啟動 Web 可視化
source /opt/tros/humble/setup.bash
ros2 launch websocket websocket.launch.py \
    websocket_image_topic:=/image \
    websocket_only_show_image:=true

# PC 瀏覽器: http://RDK_IP:8000
```

### 性能數據

| 模型 | 輸入解析度 | BPU 推理幀率 | 替代 (CPU) |
|------|----------|:----------:|:----------:|
| FCOS | 512×512 | **75 fps** (X3) / **259 fps** (X5) | ~8 fps |
| YOLOv5s | 640×640 | ~30 fps (X3) | ~3 fps |

## 實戰 2: 深度學習巡線 + OriginBot

### 系統整合

結合 RDK 巡線小車文檔中的 CNN 方案與 OriginBot 硬體：

```bash
# Terminal 1: MIPI 攝像頭
source /opt/tros/humble/setup.bash
ros2 launch mipi_cam mipi_cam.launch.py \
    mipi_out_format:=bgr8 \
    mipi_image_width:=960 \
    mipi_image_height:=544

# Terminal 2: 巡線模型 (BPU 推理)
# 使用已訓練的 ResNet18 巡線模型
ros2 launch line_follower line_follower.launch.py

# Terminal 3: OriginBot 底盤控制
source ~/originbot_ws/install/setup.bash
ros2 launch originbot_base originbot_base.launch.py
```

### 控制邏輯

```python
# 巡線 → OriginBot 控制橋接節點
class LineFollowerController(Node):
    def __init__(self):
        super().__init__('line_follower_controller')
        self.line_sub = self.create_subscription(
            Point, '/line_position', self.line_callback, 10)
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        
        self.declare_parameter('linear_speed', 0.15)  # 前進速度
        self.declare_parameter('angular_gain', 2.0)   # 轉向增益
        self.declare_parameter('image_width', 960)
    
    def line_callback(self, msg: Point):
        """根據引導線位置 (x, y) 發出 /cmd_vel"""
        # x = 引導線在影像中的水平位置（像素）
        # 影像中心 = image_width / 2
        center = self.get_parameter('image_width').value / 2.0
        error = msg.x - center  # 正值 = 線在右側
        normalized_error = error / center  # -1.0 ~ 1.0
        
        twist = Twist()
        twist.linear.x = self.get_parameter('linear_speed').value
        twist.angular.z = -normalized_error * self.get_parameter('angular_gain').value
        self.cmd_pub.publish(twist)
```

## 實戰 3: 跨設備開發 (PC + RDK)

### 網路配置

```bash
# 確保 PC 和 RDK X3 在同一區域網路
# PC: 192.168.1.50
# RDK: 192.168.1.100

# 兩端設置相同的 ROS Domain
export ROS_DOMAIN_ID=0

# 使用 CycloneDDS（跨設備最穩定）
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
```

### 分佈式部署

```
PC (Ubuntu 22.04)              RDK X3 (OriginBot)
─────────────────────          ─────────────────────
rviz2  (可視化)                originbot_base (底盤)
rqt_graph (調試)               rplidar_node (雷達)
teleop_twist_keyboard (遙控)   mipi_cam (攝像頭)
Nav2 (可選，用於計算)          hobot_dnn (AI 推理)
```

```bash
# PC 端
source /opt/ros/humble/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
rviz2  # 查看 RDK 上的 /scan 和 /image

# RDK 端
source /opt/tros/humble/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
ros2 launch originbot_bringup originbot.launch.py
```

## 完整 Bringup Launch

```python
# originbot_bringup.launch.py
from launch import LaunchDescription
from launch.ros.actions import Node, SetParameter

def generate_launch_description():
    return LaunchDescription([
        # 使用 CycloneDDS 跨設備通信
        SetParameter(name='use_sim_time', value=False),
        
        # 底盤控制
        Node(package='originbot_base', executable='originbot_base_node',
             name='originbot_base', output='screen'),
        
        # 雷射雷達
        Node(package='rplidar_ros', executable='rplidar_composition',
             name='rplidar_node',
             parameters=[{'serial_port': '/dev/ttyUSB0'}]),
        
        # IMU
        Node(package='originbot_sensors', executable='imu_node',
             name='imu_node'),
        
        # MIPI 攝像頭
        Node(package='mipi_cam', executable='mipi_cam',
             name='mipi_cam',
             parameters=[{'mipi_image_width': 960, 'mipi_image_height': 544}]),
        
        # AI 物體檢測 (可選)
        Node(package='dnn_node_example', executable='dnn_node_example',
             name='fcos_node',
             parameters=[{'config_file': 'config/fcosworkconfig.json'}]),
        
        # Static TF
        Node(package='tf2_ros', executable='static_transform_publisher',
             arguments=['0.15', '0', '0.1', '0', '0', '0',
                       'base_link', 'laser_frame'],
             name='laser_tf'),
    ])
```

## 相關資源

- [[OriginBot-底盤控制節點|底盤控制節點]]
- [[OriginBot-感測器驅動|感測器驅動]]
- [[RDK-深度學習巡線小車|深度學習巡線小車]]
- [[RDK-FCOS物體檢測|FCOS 物體檢測]]
- [[RDK-TROS機器人開發|TROS 機器人開發]]
