---
title: OriginBot底盤控制節點
tags: [智能小车, OriginBot, ROS2, 底盤控制, PID]
created: 2026-05-29
aliases: [OriginBot Base Controller, OriginBot 底盘]
---

# OriginBot 底盤控制節點 Base Controller Node

> 將 `/cmd_vel` Twist 消息轉換為馬達 PWM 信號——這是小車軟體棧最關鍵的一層。

## 節點架構 Node Architecture

```
┌──────────┐  /cmd_vel   ┌──────────────┐  PWM/GPIO  ┌──────────┐
│  Nav2 /  │ ──────────→ │ originbot_   │ ────────→ │ TB6612   │
│  Teleop  │   Twist     │ base_node    │  信號     │ 馬達驅動  │
└──────────┘             └──────┬───────┘           └────┬─────┘
                                │                        │
                                │ /odom                  ▼
                                │ (里程計)          ┌──────────┐
                                └──────────────────→│ 馬達 ×2  │
                                                     │ + 編碼器  │
                                                     └──────────┘
```

## 完整底盤控制節點

```python
#!/usr/bin/env python3
# originbot_base_node.py — 生產級底盤控制節點
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from sensor_msgs.msg import JointState
from tf2_ros import TransformBroadcaster
import math
import RPi.GPIO as GPIO
import threading
import time

class OriginBotBase(Node):
    def __init__(self):
        super().__init__('originbot_base')
        
        # === 參數 ===
        self.declare_parameter('wheel_separation', 0.18)   # 輪距 (m)
        self.declare_parameter('wheel_radius', 0.0325)      # 輪半徑 (m)
        self.declare_parameter('max_linear_speed', 0.5)     # 最大線速度
        self.declare_parameter('max_angular_speed', 2.0)    # 最大角速度
        self.declare_parameter('ticks_per_rev', 360)         # 編碼器每圈脈衝
        
        # === GPIO 初始化 ===
        self.L_PWM = 13; self.L_IN1 = 16; self.L_IN2 = 17
        self.R_PWM = 18; self.R_IN1 = 19; self.R_IN2 = 20
        
        GPIO.setmode(GPIO.BCM)
        for pin in [self.L_PWM, self.L_IN1, self.L_IN2,
                     self.R_PWM, self.R_IN1, self.R_IN2]:
            GPIO.setup(pin, GPIO.OUT)
        
        self.l_pwm = GPIO.PWM(self.L_PWM, 1000)
        self.r_pwm = GPIO.PWM(self.R_PWM, 1000)
        self.l_pwm.start(0)
        self.r_pwm.start(0)
        
        # === 里程計狀態 ===
        self.x = 0.0; self.y = 0.0; self.theta = 0.0
        self.left_ticks = 0; self.right_ticks = 0
        self.prev_left_ticks = 0; self.prev_right_ticks = 0
        self.last_time = self.get_clock().now()
        
        # === Publisher / Subscriber ===
        self.cmd_sub = self.create_subscription(
            Twist, '/cmd_vel', self.cmd_vel_callback, 10)
        self.odom_pub = self.create_publisher(Odometry, '/odom', 10)
        self.joint_pub = self.create_publisher(JointState, '/joint_states', 10)
        self.tf_broadcaster = TransformBroadcaster(self)
        
        # === 定時器 ===
        self.control_timer = self.create_timer(0.02, self.control_loop)  # 50Hz
        self.odom_timer = self.create_timer(0.05, self.publish_odometry)  # 20Hz
        
        # === 目標速度 ===
        self.target_linear = 0.0
        self.target_angular = 0.0
        self.last_cmd_time = self.get_clock().now()
        
        self.get_logger().info('✅ OriginBot Base Node started')
    
    def cmd_vel_callback(self, msg: Twist):
        """接收 /cmd_vel，記錄目標速度"""
        self.target_linear = msg.linear.x
        self.target_angular = msg.angular.z
        self.last_cmd_time = self.get_clock().now()
    
    def control_loop(self):
        """50Hz 控制迴圈：Twist → 馬達 PWM"""
        # 超時保護：超過 0.5s 無新指令 → 停止
        dt = (self.get_clock().now() - self.last_cmd_time).nanoseconds / 1e9
        if dt > 0.5:
            self.target_linear = 0.0
            self.target_angular = 0.0
        
        # 限速
        max_v = self.get_parameter('max_linear_speed').value
        max_w = self.get_parameter('max_angular_speed').value
        v = max(min(self.target_linear, max_v), -max_v)
        w = max(min(self.target_angular, max_w), -max_w)
        
        # 運動學：Twist → 左右輪角速度
        L = self.get_parameter('wheel_separation').value
        R = self.get_parameter('wheel_radius').value
        left_ang = (v - w * L / 2.0) / R
        right_ang = (v + w * L / 2.0) / R
        
        # 角速度 → PWM 佔空比
        max_rpm = 250
        max_ang = max_rpm * 2 * math.pi / 60  # rad/s
        left_duty = min(abs(left_ang) / max_ang * 100, 100)
        right_duty = min(abs(right_ang) / max_ang * 100, 100)
        
        # 設置馬達方向和速度
        self._set_motor(self.L_IN1, self.L_IN2, self.l_pwm, left_ang, left_duty)
        self._set_motor(self.R_IN1, self.R_IN2, self.r_pwm, right_ang, right_duty)
    
    def _set_motor(self, in1, in2, pwm, speed, duty):
        """設置單個馬達"""
        if speed > 0:
            GPIO.output(in1, GPIO.HIGH)
            GPIO.output(in2, GPIO.LOW)
        elif speed < 0:
            GPIO.output(in1, GPIO.LOW)
            GPIO.output(in2, GPIO.HIGH)
        else:
            GPIO.output(in1, GPIO.LOW)
            GPIO.output(in2, GPIO.LOW)
        pwm.ChangeDutyCycle(duty)
    
    def publish_odometry(self):
        """發布里程計和 TF"""
        now = self.get_clock().now()
        dt = (now - self.last_time).nanoseconds / 1e9
        self.last_time = now
        
        L = self.get_parameter('wheel_separation').value
        R = self.get_parameter('wheel_radius').value
        tpr = self.get_parameter('ticks_per_rev').value
        
        # 計算移動距離
        d_left_ticks = self.left_ticks - self.prev_left_ticks
        d_right_ticks = self.right_ticks - self.prev_right_ticks
        self.prev_left_ticks = self.left_ticks
        self.prev_right_ticks = self.right_ticks
        
        left_dist = (d_left_ticks / tpr) * 2 * math.pi * R
        right_dist = (d_right_ticks / tpr) * 2 * math.pi * R
        
        dist = (left_dist + right_dist) / 2.0
        dtheta = (right_dist - left_dist) / L
        
        # 更新位置
        self.x += dist * math.cos(self.theta + dtheta / 2.0)
        self.y += dist * math.sin(self.theta + dtheta / 2.0)
        self.theta += dtheta
        
        # 計算速度
        vx = dist / dt if dt > 0 else 0
        vth = dtheta / dt if dt > 0 else 0
        
        # 發布 Odometry 消息
        from nav_msgs.msg import Odometry
        from geometry_msgs.msg import TransformStamped, Quaternion
        
        odom = Odometry()
        odom.header.stamp = now.to_msg()
        odom.header.frame_id = 'odom'
        odom.child_frame_id = 'base_link'
        odom.pose.pose.position.x = self.x
        odom.pose.pose.position.y = self.y
        odom.pose.pose.orientation.z = math.sin(self.theta / 2)
        odom.pose.pose.orientation.w = math.cos(self.theta / 2)
        odom.twist.twist.linear.x = vx
        odom.twist.twist.angular.z = vth
        self.odom_pub.publish(odom)
        
        # 發布 TF (odom → base_link)
        tf = TransformStamped()
        tf.header.stamp = now.to_msg()
        tf.header.frame_id = 'odom'
        tf.child_frame_id = 'base_link'
        tf.transform.translation.x = self.x
        tf.transform.translation.y = self.y
        tf.transform.rotation.z = odom.pose.pose.orientation.z
        tf.transform.rotation.w = odom.pose.pose.orientation.w
        self.tf_broadcaster.sendTransform(tf)

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

if __name__ == '__main__':
    main()
```

## Launch 文件

```python
# originbot_base.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='originbot_base',
            executable='originbot_base_node',
            name='originbot_base',
            output='screen',
            parameters=[{
                'wheel_separation': 0.18,
                'wheel_radius': 0.0325,
                'max_linear_speed': 0.5,
                'max_angular_speed': 2.0,
            }]
        ),
    ])
```

## PID 速度控制（進階）

當馬達有編碼器時，可加入 PID 閉環控制：

```python
class PIDController:
    def __init__(self, kp, ki, kd, max_output):
        self.kp = kp; self.ki = ki; self.kd = kd
        self.max_output = max_output
        self.prev_error = 0; self.integral = 0
    
    def update(self, setpoint, measurement, dt):
        error = setpoint - measurement
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        self.prev_error = error
        
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        return max(min(output, self.max_output), -self.max_output)

# 使用 PID 控制馬達速度
left_pid = PIDController(kp=2.0, ki=0.5, kd=0.1, max_output=100)
right_pid = PIDController(kp=2.0, ki=0.5, kd=0.1, max_output=100)

# 在 control_loop 中：
measured_left_rpm = self.get_left_rpm()  # 從編碼器讀取實際 RPM
measured_right_rpm = self.get_right_rpm()
left_pwm = left_pid.update(target_left_rpm, measured_left_rpm, dt)
right_pwm = right_pid.update(target_right_rpm, measured_right_rpm, dt)
```

## 手動校準 Manual Calibration

```bash
# 發布測試指令
# 前進 0.2 m/s（小車應該走直線）
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist \
    "{linear: {x: 0.2}, angular: {z: 0.0}}" -1

# 如果小車偏向一側 → 調整 wheel_separation 參數
# 如果前進距離不準 → 調整 wheel_radius 參數
```

## 相關資源

- [[OriginBot-軟體環境搭建|OriginBot 環境搭建]]
- [[ROS2-Twist控制與里程計|ROS2 Twist 控制]]
- [[OriginBot-TROS整合實戰|TROS 整合實戰]]
- [[06-馬達與驅動|馬達與驅動]]（TB6612 控制）
