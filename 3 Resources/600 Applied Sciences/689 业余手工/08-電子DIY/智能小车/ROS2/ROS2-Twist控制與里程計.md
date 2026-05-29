---
title: ROS2 Twist控制與里程計
tags: [智能小车, ROS2, Twist, Odometry, TF2]
created: 2026-05-29
aliases: [ROS2 Twist Control, ROS2 Odometry, /cmd_vel]
---

# ROS2 Twist 控制與里程計 Twist Control & Odometry

> `/cmd_vel` 是控制小車的通用語言——無論底盤是什麼牌子，ROS2 都用同一個 Twist 消息來驅動它。

## Twist 消息詳解

### 消息定義

```yaml
# geometry_msgs/msg/Twist
Vector3 linear
  float64 x    # 前進速度 (m/s)，正值 = 前進
  float64 y    # 橫向速度 (m/s)，差速小車通常為 0
  float64 z    # 垂直速度 (m/s)，通常為 0
Vector3 angular
  float64 x    # 翻滾角速度
  float64 y    # 俯仰角速度
  float64 z    # 偏航角速度 (rad/s)，正值 = 左轉
```

### 差速驅動的運動模型

```
小車線速度 v = linear.x
小車角速度 ω = angular.z

輪距 = L（兩輪之間的距離）

左輪速度 v_left  = v - ω × L/2
右輪速度 v_right = v + ω × L/2
```

### 常用控制命令

```bash
# 前進 0.2 m/s
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.2}, angular: {z: 0.0}}" -1

# 後退 0.2 m/s
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: -0.2}, angular: {z: 0.0}}" -1

# 原地左轉 0.5 rad/s
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.0}, angular: {z: 0.5}}" -1

# 停止
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.0}, angular: {z: 0.0}}" -1
```

## 底盤控制節點 (Python 實現)

```python
# originbot_base_node.py
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
import RPi.GPIO as GPIO  # RDK X3 兼容 RPi.GPIO

class OriginBotBase(Node):
    def __init__(self):
        super().__init__('originbot_base')
        
        # 參數
        self.declare_parameter('wheel_separation', 0.18)  # 輪距 18cm
        self.declare_parameter('wheel_radius', 0.0325)    # 輪半徑 3.25cm
        self.declare_parameter('max_speed', 0.5)          # 最大速度 m/s
        
        # GPIO 初始化 (TB6612)
        self.PWMA = 13   # 左輪 PWM
        self.AIN1 = 16   # 左輪方向
        self.AIN2 = 17
        self.PWMB = 18   # 右輪 PWM
        self.BIN1 = 19   # 右輪方向
        self.BIN2 = 20
        
        GPIO.setmode(GPIO.BCM)
        for pin in [self.PWMA, self.AIN1, self.AIN2, self.PWMB, self.BIN1, self.BIN2]:
            GPIO.setup(pin, GPIO.OUT)
        
        self.pwm_a = GPIO.PWM(self.PWMA, 1000)  # 1kHz
        self.pwm_b = GPIO.PWM(self.PWMB, 1000)
        self.pwm_a.start(0)
        self.pwm_b.start(0)
        
        # 訂閱 /cmd_vel
        self.subscription = self.create_subscription(
            Twist, '/cmd_vel', self.cmd_vel_callback, 10)
        
        self.get_logger().info('OriginBot Base Node started')
    
    def cmd_vel_callback(self, msg: Twist):
        """將 Twist 轉換為左右輪速度"""
        v = msg.linear.x    # 線速度 m/s
        w = msg.angular.z   # 角速度 rad/s
        
        wheel_sep = self.get_parameter('wheel_separation').value
        wheel_rad = self.get_parameter('wheel_radius').value
        
        # 運動學：Twist → 左右輪角速度
        left_ang = (v - w * wheel_sep / 2.0) / wheel_rad
        right_ang = (v + w * wheel_sep / 2.0) / wheel_rad
        
        # 角速度 → PWM 佔空比 (0-100)
        max_rpm = 250  # 馬達最大轉速
        left_pwm = abs(left_ang) / (max_rpm * 2 * 3.14159 / 60) * 100
        right_pwm = abs(right_ang) / (max_rpm * 2 * 3.14159 / 60) * 100
        
        left_pwm = min(left_pwm, 100)
        right_pwm = min(right_pwm, 100)
        
        # 設置方向
        GPIO.output(self.AIN1, left_ang >= 0)
        GPIO.output(self.AIN2, left_ang < 0)
        GPIO.output(self.BIN1, right_ang >= 0)
        GPIO.output(self.BIN2, right_ang < 0)
        
        # 設置速度
        self.pwm_a.ChangeDutyCycle(left_pwm)
        self.pwm_b.ChangeDutyCycle(right_pwm)
        
        self.get_logger().debug(
            f'Twist: v={v:.2f}, w={w:.2f} → '
            f'Left={left_pwm:.0f}%, Right={right_pwm:.0f}%')

def main():
    rclpy.init()
    node = OriginBotBase()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()
        node.destroy_node()
        rclpy.shutdown()
```

## 里程計 Odometry

### 里程計消息

```yaml
# nav_msgs/msg/Odometry
std_msgs/Header header
string child_frame_id          # "base_link"
geometry_msgs/PoseWithCovariance pose
  Pose pose
    Point position             # x, y, z (米)
    Quaternion orientation     # 姿態（四元數）
  float64[36] covariance       # 協方差矩陣
geometry_msgs/TwistWithCovariance twist
  Twist twist
    Vector3 linear             # 線速度
    Vector3 angular            # 角速度
  float64[36] covariance
```

### 編碼器里程計計算

```python
# 基於編碼器脈衝計算位置
def update_odometry(self, left_ticks, right_ticks):
    """根據編碼器脈衝更新里程計"""
    ticks_per_rev = 360      # 編碼器每圈脈衝數
    wheel_radius = 0.0325    # 輪半徑 (m)
    wheel_separation = 0.18  # 輪距 (m)
    
    # 計算每輪移動距離
    left_dist = (left_ticks / ticks_per_rev) * 2 * math.pi * wheel_radius
    right_dist = (right_ticks / ticks_per_rev) * 2 * math.pi * wheel_radius
    
    # 小車移動距離和轉角
    dist = (left_dist + right_dist) / 2.0
    angle = (right_dist - left_dist) / wheel_separation
    
    # 更新位置
    self.x += dist * math.cos(self.theta + angle / 2.0)
    self.y += dist * math.sin(self.theta + angle / 2.0)
    self.theta += angle
```

## TF2 座標變換

### TF 樹結構

```
map
 └── odom
      └── base_footprint
           └── base_link
                ├── laser_frame
                ├── camera_frame
                └── imu_frame
```

### TF2 常用命令

```bash
# 查看 TF 樹
ros2 run tf2_tools view_frames

# 查看兩個 frame 之間的變換
ros2 run tf2_ros tf2_echo base_link laser_frame

# 發布靜態 TF（雷達相對於底盤的位置）
ros2 run tf2_ros static_transform_publisher \
    0.15 0 0.1 0 0 0 base_link laser_frame
```

## 鍵盤遙控 Teleop

```bash
# 安裝
sudo apt install ros-humble-teleop-twist-keyboard

# 運行
ros2 run teleop_twist_keyboard teleop_twist_keyboard

# 控制鍵：
#   i  前進
#   ,  後退
#   j  左轉
#   l  右轉
#   k  停止
#   q  加速 / z  減速
```

## 相關資源

- [[ROS2-基礎概念與安裝|ROS2 基礎概念]]
- [[ROS2-感測器整合|ROS2 感測器整合]]
- [[OriginBot-底盤控制節點|OriginBot 底盤控制]]
- [[06-馬達與驅動|馬達與驅動]]（TB6612 控制）
