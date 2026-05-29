---
title: OriginBot感測器驅動
tags: [智能小车, OriginBot, LiDAR, IMU, Camera, 驅動]
created: 2026-05-29
aliases: [OriginBot Sensor Drivers, OriginBot 传感器]
---

# OriginBot 感測器驅動 Sensor Drivers

> LiDAR、IMU、Camera——三個核心感測器的驅動整合，讓 OriginBot 擁有完整的環境感知能力。

## 感測器架構

```
                    ┌─────────────────────┐
                    │     OriginBot        │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
    ┌─────▼─────┐      ┌──────▼──────┐      ┌─────▼─────┐
    │  RPLIDAR  │      │   MPU6050   │      │  Camera   │
    │  (USB)    │      │   (I2C)     │      │  (USB/CSI)│
    └─────┬─────┘      └──────┬──────┘      └─────┬─────┘
          │                    │                    │
    ┌─────▼─────┐      ┌──────▼──────┐      ┌─────▼─────┐
    │  /scan    │      │   /imu      │      │ /image_raw│
    │ LaserScan │      │   Imu msg   │      │ Image msg │
    └───────────┘      └─────────────┘      └───────────┘
```

## RPLIDAR A1 驅動整合

### 硬體連接

```
RPLIDAR A1 → OriginBot:
  USB 接口直接連接到 RDK X3 的 USB 埠
  馬達由 USB 供電（5V）
```

### 安裝與測試

```bash
# 安裝驅動包
sudo apt install ros-humble-rplidar-ros

# 賦予 USB 權限
sudo chmod 666 /dev/ttyUSB0

# 永久賦權（可選）
sudo usermod -a -G dialout $USER

# 測試雷達
ros2 launch rplidar_ros rplidar_a1_launch.py

# 驗證數據
ros2 topic echo /scan --once | head -20
```

### OriginBot 整合 Launch

```python
# originbot_lidar.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='rplidar_ros',
            executable='rplidar_composition',
            name='rplidar_node',
            parameters=[{
                'serial_port': '/dev/ttyUSB0',
                'serial_baudrate': 115200,
                'frame_id': 'laser_frame',
            }],
            remappings=[('scan', '/scan')]
        ),
    ])
```

## MPU6050 IMU 驅動

### 硬體連接

```
MPU6050 → RDK X3 40PIN:
  VCC  → Pin 1  (3.3V)
  GND  → Pin 6  (GND)
  SDA  → Pin 3  (GPIO 2)
  SCL  → Pin 5  (GPIO 3)
```

### 驅動實現

```python
#!/usr/bin/env python3
# originbot_imu.py
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Imu
import smbus
import math

class MPU6050Driver(Node):
    def __init__(self):
        super().__init__('imu_node')
        
        # I2C 初始化
        self.bus = smbus.SMBus(1)  # RDK X3 使用 bus 1
        self.MPU_ADDR = 0x68
        
        # 喚醒 MPU6050
        self.bus.write_byte_data(self.MPU_ADDR, 0x6B, 0)
        
        # Publisher
        self.imu_pub = self.create_publisher(Imu, '/imu', 10)
        
        # 50Hz 定時讀取
        self.timer = self.create_timer(0.02, self.read_and_publish)
        
        # 校準偏移（需手動校準）
        self.gyro_bias_z = 0.0  # 靜止時陀螺儀 Z 軸讀數
        
        self.get_logger().info('✅ IMU (MPU6050) node started')
    
    def read_raw(self, reg):
        """讀取 16-bit 原始值"""
        high = self.bus.read_byte_data(self.MPU_ADDR, reg)
        low = self.bus.read_byte_data(self.MPU_ADDR, reg + 1)
        val = (high << 8) + low
        return val - 65536 if val >= 0x8000 else val
    
    def read_and_publish(self):
        # 讀取加速度計（±2g → 16384 LSB/g）
        ax = self.read_raw(0x3B) / 16384.0 * 9.81
        ay = self.read_raw(0x3D) / 16384.0 * 9.81
        az = self.read_raw(0x3F) / 16384.0 * 9.81
        
        # 讀取陀螺儀（±250°/s → 131 LSB/°/s）
        gx = self.read_raw(0x43) / 131.0 * math.pi / 180.0
        gy = self.read_raw(0x45) / 131.0 * math.pi / 180.0
        gz = self.read_raw(0x47) / 131.0 * math.pi / 180.0
        
        # 構建 IMU 消息
        msg = Imu()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'imu_frame'
        
        # 線性加速度 (m/s²)
        msg.linear_acceleration.x = ax
        msg.linear_acceleration.y = ay
        msg.linear_acceleration.z = az
        msg.linear_acceleration_covariance[0] = 0.01  # 協方差
        
        # 角速度 (rad/s)
        msg.angular_velocity.x = gx
        msg.angular_velocity.y = gy
        msg.angular_velocity.z = gz - self.gyro_bias_z
        msg.angular_velocity_covariance[0] = 0.01
        
        # 姿態（由加速度計估算）
        roll = math.atan2(ay, az)
        pitch = math.atan2(-ax, math.sqrt(ay**2 + az**2))
        
        # 歐拉角 → 四元數
        cy = math.cos(0 / 2); sy = math.sin(0 / 2)
        cp = math.cos(pitch / 2); sp = math.sin(pitch / 2)
        cr = math.cos(roll / 2); sr = math.sin(roll / 2)
        
        msg.orientation.w = cr * cp * cy + sr * sp * sy
        msg.orientation.x = sr * cp * cy - cr * sp * sy
        msg.orientation.y = cr * sp * cy + sr * cp * sy
        msg.orientation.z = cr * cp * sy - sr * sp * cy
        msg.orientation_covariance[0] = 0.1
        
        self.imu_pub.publish(msg)

def main():
    rclpy.init()
    node = MPU6050Driver()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## 攝像頭驅動整合

### USB 攝像頭

```python
# originbot_camera.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='hobot_usb_cam',
            executable='hobot_usb_cam',
            name='usb_cam',
            parameters=[{
                'video_device': '/dev/video0',
                'image_width': 640,
                'image_height': 480,
                'framerate': 30,
                'pixel_format': 'mjpeg',
            }],
            remappings=[('image_raw', '/camera/image_raw')]
        ),
    ])
```

### MIPI 攝像頭（TROS 內建）

```python
# originbot_mipi_camera.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='mipi_cam',
            executable='mipi_cam',
            name='mipi_cam',
            parameters=[{
                'mipi_image_width': 960,
                'mipi_image_height': 544,
                'mipi_out_format': 'bgr8',
                'mipi_io_method': 'mmap',
            }],
            remappings=[('image_raw', '/camera/image_raw')]
        ),
    ])
```

## 完整感測器啟動 Launch

```python
# originbot_sensors.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # LiDAR
        Node(
            package='rplidar_ros',
            executable='rplidar_composition',
            name='rplidar_node',
            parameters=[{'serial_port': '/dev/ttyUSB0'}],
        ),
        # IMU
        Node(
            package='originbot_sensors',
            executable='imu_node',
            name='imu_node',
        ),
        # Camera (USB)
        Node(
            package='hobot_usb_cam',
            executable='hobot_usb_cam',
            name='usb_cam',
            parameters=[{'video_device': '/dev/video0'}],
        ),
        # Static TF: laser → base_link
        Node(
            package='tf2_ros',
            executable='static_transform_publisher',
            arguments=['0.15', '0', '0.1', '0', '0', '0', 'base_link', 'laser_frame'],
            name='laser_tf',
        ),
    ])
```

## 感測器驗證腳本

```bash
#!/bin/bash
# check_sensors.sh — OriginBot 感測器健康檢查

echo "=== LiDAR Check ==="
timeout 5 ros2 topic echo /scan --once | head -5 || echo "❌ LiDAR not publishing"

echo "=== IMU Check ==="
timeout 5 ros2 topic echo /imu --once | head -5 || echo "❌ IMU not publishing"

echo "=== Camera Check ==="
timeout 5 ros2 topic hz /camera/image_raw --window 10 || echo "❌ Camera not publishing"

echo "=== TF Check ==="
ros2 run tf2_tools view_frames --once 2>/dev/null
echo "Check frames.pdf for TF tree"
```

## 相關資源

- [[OriginBot-底盤控制節點|底盤控制節點]]
- [[OriginBot-TROS整合實戰|TROS 整合實戰]]
- [[RDK-數據採集與感測器|RDK 感測器數據採集]]
- [[ROS2-感測器整合|ROS2 感測器整合]]
