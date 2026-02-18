---
title: RoboMaster API参考与编程指南
tags:
  - para/resource/tech
  - 技术/机器人
  - 技术/编程
  - API参考
status: active
aliases:
  - RoboMaster API索引
  - 编程指南
  - Python API文档
cssclasses:
  - resource-note
created: 2026-02-19
---

# RoboMaster API参考与编程指南

> [!info] 文档导航
> 本文档提供RoboMaster SDK的完整API参考和编程指南，帮助开发者快速找到所需的接口和功能。

## 📚 文档结构

### Python SDK API

- [[#robot模块]] - 机器人核心控制
- [[#chassis模块]] - 底盘控制
- [[#gimbal模块]] - 云台控制
- [[#blaster模块]] - 发射器控制
- [[#flight模块]] - 飞行控制
- [[#robotic_arm模块]] - 机械臂控制
- [[#gripper模块]] - 机械爪控制
- [[#servo模块]] - 舵机控制
- [[#led模块]] - LED控制
- [[#armor模块]] - 装甲板控制
- [[#sensor模块]] - 传感器控制
- [[#camera模块]] - 相机控制
- [[#vision模块]] - 智能识别
- [[#battery模块]] - 电池管理

### Python编程说明

- [[#多机通信系统]] - 多机协同编程
- [[#自定义UI系统]] - 创建用户界面

---

## 🤖 robot模块

### Robot类

#### 初始化

```python
from robomaster import robot

# 创建机器人对象
ep_robot = robot.Robot()

# 初始化连接
ep_robot.initialize(conn_type="ap")  # WIFI直连
ep_robot.initialize(conn_type="sta", ip="192.168.2.1")  # 路由器
ep_robot.initialize(conn_type="usb")  # USB
ep_robot.initialize(conn_type="uart", uart_name="/dev/ttyTHS1")  # UART
```

#### 基础方法

```python
# 获取机器人版本
version = ep_robot.get_version()

# 获取机器人SN号
sn = ep_robot.get_sn()

# 获取机器人状态
status = ep_robot.get_status()

# 获取电池信息
battery = ep_robot.get_battery()

# 关闭连接
ep_robot.close()
```

---

## 🚗 chassis模块

### 初始化

```python
# 获取底盘模块
ep_chassis = ep_robot.chassis
```

### 运动控制

```python
# 速度控制
ep_chassis.drive_speed(x=0.5, y=0, z=0)

# 位置控制（相对）
ep_chassis.move(x=100, y=0, z=90, v=200)

# 轮速控制
ep_chassis.drive_wheel(w1=50, w2=50, w3=50, w4=50)
```

### 状态查询

```python
# 获取速度
velocity = ep_chassis.get_velocity()

# 获取位置
position = ep_chassis.get_position()

# 获取姿态
attitude = ep_chassis.get_attitude()

# 获取轮速
wheel_speed = ep_chassis.get_wheel_speed()
```

### 数据推送

```python
# 订阅位置信息
def position_callback(data):
    print(f"位置: {data}")

ep_chassis.sub_position(freq=10, callback=position_callback)

# 订阅姿态信息
def attitude_callback(data):
    print(f"姿态: {data}")

ep_chassis.sub_attitude(freq=10, callback=attitude_callback)

# 取消订阅
ep_chassis.unsub_position()
ep_chassis.unsub_attitude()
```

### 模式设置

```python
# 设置运动模式
ep_chassis.set_mode(mode=chassis.MODE_FREE)  # 自由模式
ep_chassis.set_mode(mode=chassis.MODE_POSITION)  # 位置模式
```

---

## 📷 gimbal模块

### 初始化

```python
# 获取云台模块
ep_gimbal = ep_robot.gimbal
```

### 运动控制

```python
# 速度控制
ep_gimbal.drive_speed(pitch=10, yaw=10)

# 角度控制（相对）
ep_gimbal.move(pitch=10, yaw=10)

# 角度控制（绝对）
ep_gimbal.move(pitch=10, yaw=10, pitch_mode="absolute", yaw_mode="absolute")

# 回中
ep_gimbal.recenter()

# 休眠
ep_gimbal.suspend()

# 恢复
ep_gimbal.resume()
```

### 状态查询

```python
# 获取角度
angle = ep_gimbal.get_angle()

# 获取速度
speed = ep_gimbal.get_speed()
```

### 数据推送

```python
# 订阅角度信息
def angle_callback(data):
    print(f"角度: {data}")

ep_gimbal.sub_angle(freq=10, callback=angle_callback)

# 取消订阅
ep_gimbal.unsub_angle()
```

---

## 🔫 blaster模块

### 初始化

```python
# 获取发射器模块
ep_blaster = ep_robot.blaster
```

### 发射控制

```python
# 设置发射次数
ep_blaster.set_fire_num(num=1)

# 发射
ep_blaster.fire()

# 获取发射次数
num = ep_blaster.get_fire_num()
```

---

## 🚁 flight模块

### 初始化

```python
# 获取飞行模块（无人机）
ep_flight = ep_robot.flight
```

### 飞行控制

```python
# 起飞
ep_flight.takeoff()

# 降落
ep_flight.land()

# 移动
ep_flight.move(x=10, y=10, z=10, v=50)

# 旋转
ep_flight.rotate(angle=90, v=50)

# 速度控制
ep_flight.drive_speed(x=0.5, y=0, z=0, v=0)
```

### 状态查询

```python
# 获取高度
height = ep_flight.get_height()

# 获取位置
position = ep_flight.get_position()

# 获取姿态
attitude = ep_flight.get_attitude()
```

---

## 🦾 robotic_arm模块

### 初始化

```python
# 获取机械臂模块
ep_arm = ep_robot.robotic_arm
```

### 运动控制

```python
# 相对位置运动
ep_arm.move(x=10, y=20, z=30)

# 绝对位置运动
ep_arm.move(x=100, y=200, z=300)

# 回中
ep_arm.recenter()

# 停止
ep_arm.pause()
```

### 状态查询

```python
# 获取位置
position = ep_arm.get_position()
```

---

## ✋ gripper模块

### 初始化

```python
# 获取机械爪模块
ep_gripper = ep_robot.gripper
```

### 开合控制

```python
# 打开
ep_gripper.open()

# 关闭
ep_gripper.close()

# 查询状态
status = ep_gripper.get_status()
```

---

## ⚙️ servo模块

### 初始化

```python
# 获取舵机模块
ep_servo = ep_robot.servo
```

### 角度控制

```python
# 设置角度
ep_servo.servo_angle(1, 90)  # 舵机编号1，角度90度

# 设置速度
ep_servo.servo_speed(1, 50)  # 速度值0-100

# 停止
ep_servo.servo_stop(1)

# 查询角度
angle = ep_servo.query_angle(1)
```

---

## 💡 led模块

### 初始化

```python
# 获取LED模块
ep_led = ep_robot.led
```

### 灯效控制

```python
# 设置LED颜色
ep_led.set_led(comp="all", r=255, g=0, b=0)

# 设置顶部灯光
ep_led.set_led(comp="top_light", r=0, g=255, b=0)
```

---

## 🛡️ armor模块

### 初始化

```python
# 获取装甲板模块
ep_armor = ep_robot.armor
```

### 灵敏度控制

```python
# 设置灵敏度
ep_armor.set_sensitivity(level=5)

# 获取灵敏度
sensitivity = ep_armor.get_sensitivity()
```

### 事件订阅

```python
# 订阅击中事件
def hit_callback(data):
    print(f"击中事件: {data}")

ep_armor.sub_hit_event(callback=hit_callback)

# 取消订阅
ep_armor.unsub_hit_event()
```

---

## 📡 sensor模块

### 初始化

```python
# 获取传感器模块
ep_sensor = ep_robot.sensor

# 获取传感器转接板
ep_adapter = ep_robot.sensor_adapter
```

### 红外距离传感器

```python
# 开启红外距离传感器
ep_ir = ep_sensor.ir_distance_sensor

# 订阅距离数据
def distance_callback(data):
    print(f"距离: {data} cm")

ep_ir.subscribe(freq=10, callback=distance_callback)
```

### 传感器转接板

```python
# 获取ADC值
adc_value = ep_adapter.get_adc(index=0)

# 获取IO值
io_value = ep_adapter.get_io(index=0)

# 获取IO时间
time_value = ep_adapter.get_io_time(index=0)
```

---

## 📸 camera模块

### 初始化

```python
# 获取相机模块
ep_camera = ep_robot.camera
```

### 视频流

```python
# 开启视频流
ep_camera.start_video_stream(display=True)

# 关闭视频流
ep_camera.stop_video_stream()

# 获取单帧图像
image = ep_camera.read_cv2_image(strategy="newest")
```

---

## 👁️ vision模块

### 初始化

```python
# 获取视觉模块
ep_vision = ep_robot.vision
```

### 智能识别

```python
# 标记识别
def marker_callback(data):
    print(f"标记: {data}")

ep_vision.sub_detect_info(name="marker", callback=marker_callback)

# 线条识别
def line_callback(data):
    print(f"线条: {data}")

ep_vision.sub_detect_info(name="line", callback=line_callback)
```

---

## 🔋 battery模块

### 初始化

```python
# 获取电池模块
ep_battery = ep_robot.battery
```

### 电量查询

```python
# 获取电量
capacity = ep_battery.get_battery()

# 获取充电状态
charging = ep_battery.get_charging_state()
```

---

## 👥 多机通信系统

### 概述

多机通信系统允许多台机器人之间进行信息交换，实现协同作业。

### 创建多机组

```python
from robomaster import multi_robot

# 创建多机组
robot1 = robot.Robot()
robot1.initialize(conn_type="sta", ip="192.168.2.1")

robot2 = robot.Robot()
robot2.initialize(conn_type="sta", ip="192.168.2.2")

# 创建组对象
group = multi_robot.MultiRobotGroup(robot_list=[robot1, robot2])
```

### 群组控制

```python
# 更新成员
group.update_robot(robot_list=[robot1, robot2, robot3])

# 群组控制
group.move(x=100, y=0, z=0, v=200)
group.rotate(angle=90, v=200)

# 单机控制
robot1.move(x=50, y=0, z=0, v=200)
```

---

## 🎨 自定义UI系统

### 概述

自定义UI系统允许在机器人端创建自定义的用户界面，增强交互体验。

### UI组件

#### Button按钮

```python
from robomaster import button

def on_click(event):
    print("按钮被点击")

# 创建按钮
btn = button.Button(text="开始", callback=on_click)
btn.show()
```

#### Toggle开关

```python
from robomaster import toggle

def on_change(event):
    print(f"开关状态: {event.value}")

# 创建开关
t = Toggle(text="自动模式", callback=on_change)
t.show()
```

#### Text文本

```python
from robomaster import text

# 创建文本
t = text.Text(text="欢迎使用RoboMaster")
t.show()
```

#### InputField输入框

```python
from robomaster import input_field

def on_submit(event):
    print(f"输入内容: {event.value}")

# 创建输入框
input = input_field.InputField(text="请输入", callback=on_submit)
input.show()
```

#### Dropdown下拉菜单

```python
from robomaster import dropdown

def on_select(event):
    print(f"选择: {event.value}")

# 创建下拉菜单
dropdown = dropdown.Dropdown(
    text="模式",
    options=["自动", "手动"],
    callback=on_select
)
dropdown.show()
```

---

## 🔗 相关资源

- [[RoboMaster学习项目]] - 当前学习项目
- [[RoboMaster SDK技术文档]] - SDK详细使用指南
- [[RoboMaster拓展模块说明]] - 拓展模块详细文档
- [[RoboMaster明文SDK与协议]] - 明文SDK协议文档

## 🌐 官方资源

- [RoboMaster SDK API文档](https://robomaster-dev.readthedocs.io/zh-cn/latest/python_sdk/apis.html)
- [RoboMaster SDK模块文档](https://robomaster-dev.readthedocs.io/zh-cn/latest/python_sdk/modules.html)
- [RoboMaster GitHub](https://github.com/dji-sdk/RoboMaster-SDK)

## 💡 编程建议

> [!tip] 代码组织
> - 按功能模块组织代码
> - 使用类封装机器人控制
> - 合理处理异常

> [!tip] 性能优化
> - 避免频繁创建和销毁对象
> - 合理使用数据推送频率
> - 及时释放资源

> [!tip] 调试技巧
> - 使用日志记录关键信息
> - 打印返回值和状态
> - 使用try-except处理异常

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/机器人 #技术/编程 #API参考
