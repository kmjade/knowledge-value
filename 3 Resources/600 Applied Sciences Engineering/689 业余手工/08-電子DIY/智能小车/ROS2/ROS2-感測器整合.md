---
title: ROS2感測器整合
tags: [智能小车, ROS2, LiDAR, Camera, IMU, 感測器]
created: 2026-05-29
aliases: [ROS2 Sensors, ROS2 LiDAR Camera]
---

# ROS2 感測器整合 Sensor Integration

> 讓小車「看見」世界——LiDAR 提供 360° 距離感知、Camera 提供視覺、IMU 感知姿態。ROS2 統一把它們變成標準 Topic。

## 雷射雷達 LiDAR Integration

### 支援的雷達型號

| 型號 | 接口 | ROS2 Driver | 特點 |
|------|------|------------|------|
| RPLIDAR A1 | USB | `rplidar_ros` | 12m 範圍、8k 點/秒 |
| RPLIDAR A2 | USB | `rplidar_ros` | 18m 範圍 |
| YDLIDAR X4 | USB | `ydlidar_ros2` | 10m 範圍、成本低 |
| 氪見 (Kr-Jian) | 網路 | 原廠驅動 | 工業級 |

### RPLIDAR A1 安裝與運行

```bash
# 安裝驅動
sudo apt install ros-humble-rplidar-ros

# 檢查設備
ls -la /dev/ttyUSB*   # RPLIDAR 通常為 /dev/ttyUSB0
sudo chmod 666 /dev/ttyUSB0

# 啟動雷達節點
ros2 launch rplidar_ros rplidar_a1_launch.py

# 查看數據
ros2 topic echo /scan
```

### LaserScan 消息結構

```yaml
# sensor_msgs/msg/LaserScan
header:
  stamp:        # 時間戳
  frame_id: "laser_frame"
angle_min: -3.14       # 起始角度 (rad)
angle_max: 3.14        # 結束角度 (rad)
angle_increment: 0.017 # 角分辨率
range_min: 0.15        # 最小距離 (m)
range_max: 12.0        # 最大距離 (m)
ranges: [0.5, 0.52, ...]  # 距離陣列
intensities: [...]     # 強度陣列
```

### RViz2 可視化雷達

```bash
# 啟動 RViz2
rviz2

# 添加顯示：
# Add → By topic → /scan → LaserScan
# 設置 Fixed Frame: laser_frame
```

## 深度相機 Camera Integration

### 支援的相機

| 型號 | 接口 | Driver | 輸出 |
|------|------|--------|------|
| Astra Pro | USB | `astra_camera` | RGB + Depth |
| Intel RealSense D435 | USB 3.0 | `realsense2_camera` | RGB + Depth + IMU |
| USB Webcam | USB | `usb_cam` / `hobot_usb_cam` | RGB only |
| MIPI F37 | CSI | `mipi_cam` (TROS) | RGB (BGR8) |

### USB 攝像頭 (hobot_usb_cam)

```bash
# 已有 TROS 內建支援
source /opt/tros/humble/setup.bash

# 啟動 USB 攝像頭
ros2 launch hobot_usb_cam hobot_usb_cam.launch.py \
    usb_video_device:=/dev/video0 \
    usb_image_width:=640 \
    usb_image_height:=480

# Web 查看 (PC 瀏覽器: http://RDK_IP:8000)
ros2 launch websocket websocket.launch.py \
    websocket_image_topic:=/image \
    websocket_only_show_image:=true
```

### MIPI 攝像頭 (TROS 內建)

```bash
source /opt/tros/humble/setup.bash

# 啟動 MIPI 攝像頭
ros2 launch mipi_cam mipi_cam.launch.py \
    mipi_out_format:=bgr8 \
    mipi_image_width:=960 \
    mipi_image_height:=544
```

## IMU 慣性感測器

### 驅動節點

```python
# imu_node.py（簡化版）
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Imu
import smbus  # I2C

class MPU6050Node(Node):
    def __init__(self):
        super().__init__('imu_node')
        self.publisher = self.create_publisher(Imu, '/imu', 10)
        self.bus = smbus.SMBus(1)
        self.mpu_addr = 0x68
        
        # 初始化 MPU6050
        self.bus.write_byte_data(self.mpu_addr, 0x6B, 0)
        
        self.timer = self.create_timer(0.02, self.read_imu)  # 50Hz
    
    def read_imu(self):
        # 讀取加速度計
        accel_x = self.read_word_2c(0x3B) / 16384.0 * 9.81
        accel_y = self.read_word_2c(0x3D) / 16384.0 * 9.81
        accel_z = self.read_word_2c(0x3F) / 16384.0 * 9.81
        
        # 讀取陀螺儀
        gyro_x = self.read_word_2c(0x43) / 131.0 * 0.01745
        gyro_y = self.read_word_2c(0x45) / 131.0 * 0.01745
        gyro_z = self.read_word_2c(0x47) / 131.0 * 0.01745
        
        # 發布 IMU 消息
        msg = Imu()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'imu_frame'
        msg.linear_acceleration.x = accel_x
        msg.linear_acceleration.y = accel_y
        msg.linear_acceleration.z = accel_z
        msg.angular_velocity.x = gyro_x
        msg.angular_velocity.y = gyro_y
        msg.angular_velocity.z = gyro_z
        self.publisher.publish(msg)
    
    def read_word_2c(self, reg):
        high = self.bus.read_byte_data(self.mpu_addr, reg)
        low = self.bus.read_byte_data(self.mpu_addr, reg + 1)
        val = (high << 8) + low
        return val - 65536 if val >= 0x8000 else val
```

## 多感測器融合 Sensor Fusion

### 時間同步

ROS2 使用 `message_filters` 進行多感測器時間同步：

```python
from message_filters import ApproximateTimeSynchronizer, Subscriber

# 訂閱多個 Topic
image_sub = Subscriber(self, Image, '/image_raw')
lidar_sub = Subscriber(self, LaserScan, '/scan')

# 近似時間同步 (允許 0.1 秒誤差)
ts = ApproximateTimeSynchronizer(
    [image_sub, lidar_sub], queue_size=10, slop=0.1)
ts.registerCallback(self.synced_callback)

def synced_callback(self, image_msg, lidar_msg):
    """處理時間對齊的影像和雷達數據"""
    # 可以在這裡做 Camera-LiDAR 融合
    pass
```

### Launch 文件整合

```python
# originbot_sensors.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # 雷射雷達
        Node(
            package='rplidar_ros',
            executable='rplidar_composition',
            name='rplidar_node',
            parameters=[{'serial_port': '/dev/ttyUSB0'}]
        ),
        # USB 攝像頭
        Node(
            package='hobot_usb_cam',
            executable='hobot_usb_cam',
            name='usb_cam',
            parameters=[{'video_device': '/dev/video0'}]
        ),
        # IMU
        Node(
            package='originbot_sensors',
            executable='imu_node',
            name='imu_node'
        ),
    ])
```

## 感測器檢查清單 Sensor Checklist

```bash
# 雷射雷達
ros2 topic echo /scan --once    # 應該看到 ranges 陣列

# 攝像頭
ros2 topic hz /image_raw        # 應該看到 ~30 Hz

# IMU
ros2 topic echo /imu --once     # 應該看到加速度和角速度

# 在 RViz2 中驗證
rviz2
# → Add → By topic → 選擇各感測器 Topic
# → Fixed Frame: base_link
```

## 相關資源

- [[ROS2-基礎概念與安裝|ROS2 基礎概念]]
- [[ROS2-Twist控制與里程計|ROS2 Twist 控制]]
- [[RDK-數據採集與感測器|RDK 感測器數據採集]]
- [[05-感測器模組|感測器模組]]（硬體級感測器介紹）
