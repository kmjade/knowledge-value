---
title: RoboMaster开发资源
status: active
priority: medium
tags: [knowledge/robotics, robomaster, dji]
aliases: [RoboMaster, DJI机器人开发, 机器人开发]
created: 2026-02-19
modified: 2026-02-19
source: https://robomaster-dev.readthedocs.io/zh-cn/latest/
related:
  - [[机器人控制笔记]]
  - [[ESP32开发基础]]
  - [[MicroROS机器人控制板]]
---

# RoboMaster开发资源

> DJI RoboMaster EP 教育机器人开发平台完整文档，包括SDK、API、协议和模块说明。

---

## 📋 概述

RoboMaster EP 教育拓展套装在 RoboMaster S1 教育机器人的基础上延展出丰富的拓展性，配有完善的课程内容及全新的 RoboMaster 嘻少年专属赛事；各类编程模块均围绕教学需求精心设计，带来焕然一新的教学与学习体验，拓展未来教育的全新边界。

### EP机器人形态

- **步兵机器人**: 与常规版本的 S1 坦克接近，软硬件升级，增加新部件和拓展能力
- **工程机器人**: 采用并联机械臂代替安装在底盘正中央的云台结构，保留图传系统，末端装配机械夹爪
- **教育机器人**: 基于 S1 坦克设计，拥有更多可编程空间和教学功能

### 主要特性

- 🎮 完善的课程内容
- 🔌 丰富的拓展模块（传感器转接、机械臂、机械爪等）
- 📱 Scratch 编程和 Python 编程支持
- 🤖 Python SDK 和明文 SDK
- 📡 完整的开发者文档

---

## 📚 文档章节

```dataview
Table where contains(rows.file.link, "RoboMaster")
```

---

## 🚀 快速开始

### 1. 编程环境安装

#### Windows平台
- Python 环境安装
- Python 开发环境准备

#### Ubuntu平台
- Python 环境安装
- Python 开发环境准备

---

### 2. 第三方平台通信

#### 通信方式

| 方式 | 说明 |
| --- | --- |
| WIFI 直连 | 机器人作为AP，直接连接 |
| WIFI 组网 | 机器人作为组网成员 |
| USB 连接 | 通过USB直连 |
| UART 连接 | 通过串口通信 |

#### 通讯方式

| 方式 | 说明 |
| --- | --- |
| 直连模式 | 直接连接控制 |
| 组网模式 | 加入网络组后控制 |

#### 通讯协议

| 协议 | 说明 |
| --- | --- |
| 明文协议 | 自定义传输协议 |
| 自定义传输 | 可扩展的传输方式 |

---

## 📖 RoboMaster SDK 说明

### SDK 能做什么

- 机器人状态查询
- 运动控制（底盘、云台、机械臂、机械爪）
- 传感器数据获取
- 灯效和LED控制
- 多机编队和控制
- 任务动作控制
- 音频和视频流控制

### 第一个SDK程序

### 初始化机器人

### 释放机器人资源

### 查询类接口的使用

---

## 🎮 RoboMaster SDK 新手入门

### 基础篇 - EP机器人

#### 初始化机器人

**示例一：查询机器人版本**

```python
from robomaster import robomaster

# 初始化机器人
robot = robomaster.RoboMaster()
robot.connect()  # 连接机器人

# 查询机器人版本信息
version = robot.get_version()
print(f"机器人固件版本: {version}")
print(f"机器人SDK版本: {robot.get_sdk_version()}")
```

**示例二：获取机器人SN号**

```python
# 获取机器人序列号
sn = robot.get_sn()
print(f"机器人SN号: {sn}")
```

#### 设置类接口的使用

**示例一：设置机器人整机运动模式**

```python
# 设置机器人运动模式
robot.set_robot_mode(mode=robot.ROBOT_MODE_GIMBAL)
print("已设置为自平衡模式")
```

**示例二：设置机器人装甲灯**

```python
# 设置装甲灯效果
robot.set_armor_effect(effect=robot.ARMOR_EFFECT_TOP_LED)
print("已设置顶部LED效果")
```

#### 动作类接口的使用

**即时动作控制 - 示例一：控制发射器射击**

```python
# 发射器单次射击
robot.fire_single()
print("发射器单次射击")
```

**即时动作控制 - 示例二：控制底盘速度**

```python
# 控制底盘速度
robot.set_chassis_speed(linear_x=0.5, linear_y=0.0, angular_z=0)
print("底盘速度设置为 0.5 m/s")
```

**任务动作控制 - 示例一：控制底盘移动指定距离**

```python
# 移动指定距离
robot.move_chassis(distance=1.0)
print("底盘移动1米")
```

**任务动作控制 - 示例二：控制遥控器杆量**

```python
# 控制遥控器杆量
robot.move_rockers(amount=50)
print("遥控器杆量设置为50")
```

---

### 教育无人机篇

#### 初始化无人机

#### 释放无人机资源

#### 查询类接口的使用

**示例一：查询机器人固件SDK版本**

**示例二：获取机器人SN号**

#### 设置类接口的使用

**示例一：设置机器人扩展LED模块**

```python
# 设置扩展LED模块
robot.set_led_module_effect(module_id=1, effect=robot.LED_EFFECT_BREATHING)
print("扩展LED模块呼吸效果")
```

#### 动作类接口的使用

**即时动作控制 - 示例一：控制飞机起飞并前后飞行**

```python
# 飞机起飞
robot.take_off()
print("飞机起飞")
```

**任务动作控制 - 示例一：控制遥控器杆量**

**任务动作控制 - 示例二：控制飞机移动到目标坐标点**

```python
# 飞机到目标坐标
robot.fly_to_gps_coordinate(latitude=39.9, longitude=116.3)
print("飞行到指定坐标")
```

---

## 🤖 多机控制篇

### 多机控制简介

RoboMaster EP 支持多机编队功能，可以同时控制多个机器人进行协同作业。

### 多机控制流程

1. 初始化多机系统
2. 对多机进行编号编组
3. 创建编队
4. 执行编队任务

### 多机初始化

```python
from robomaster import robomaster
from robomaster import multi_robot

# 初始化多机控制
multi_ctrl = multi_robot.MultiRobotControl()
multi_ctrl.initialize()

# 添加机器人
multi_ctrl.add_robot(robot_id=1, robot_type="EP")
multi_ctrl.add_robot(robot_id=2, robot_type="EP")
```

### 多机编号

```python
# 对机器人进行编号
multi_ctrl.assign_robot_number(robot_id=1, number=1)
multi_ctrl.assign_robot_number(robot_id=2, number=2)
```

### 多机分组 & 编队控制

**组对象的相关操作**

```python
# 生成组对象
group = multi_ctrl.create_group()

# 更新成员
group.add_member(robot_id=1)
group.add_member(robot_id=2)

# 编组控制
multi_ctrl.group_control(group_id=1, action="start")
```

**编组控制**

- 单机控制
- 多机控制

**动作控制**

- 任务动作控制：即时动作控制、任务动作控制

---

## 📖 RoboMaster SDK APIs

### robomaster package

| 包 | 功能 |
| --- | --- |
| robomaster.action | 动作控制 |
| robomaster.armor | 装甲板控制 |
| robomaster.battery | 电池管理 |
| robomaster.blaster | 发射器控制 |
| robomaster.camera | 相机控制 |
| robomaster.chassis | 底盘控制 |
| robomaster.exceptions | 异常处理 |
| robomaster.light | LED控制 |
| robomaster.gimbal | 陀螺仪控制 |
| robomaster.gripper | 机械爪控制 |
| robomaster.led | LED灯效 |
| robomaster.robot | 机器人基础控制 |
| robomaster.robotic_arm | 机械臂控制 |
| robomaster.sensor | 传感器控制 |
| robomaster.servo | 舵机控制 |
| robomaster.uart | UART通信 |
| robomaster.version | 版本信息 |
| robomaster.vision | 视觉控制 |
| robomaster.ai_module | AI功能模块 |

---

## 📚 编队控制

### 界面

```python
from robomaster import multi_robot
from robomaster.ui import *

# 创建编队界面
multi_ctrl = multi_robot.MultiRobotControl()
ui = MultiRobotUI(multi_ctrl)
ui.show()
```

### 功能介绍

- **机器人运动模式控制**
- **机器人剩余电量获取**
- **底盘控制**
- **云台控制**
- **发射器控制**
- **装甲板控制**
- **声音识别控制**
- **PWM控制**
- **传感器转接板控制**
- **舵机控制**
- **机械臂控制**
- **机械爪控制**
- **智能控制**

---

## 🔧 拓展模块

### 机械臂与机械爪

#### 机械臂控制

| 功能 | 说明 |
| --- | --- |
| 相对位置运动 | 控制机械臂相对位置 |
| 绝对位置运动 | 控制机械臂绝对位置 |
| 回中控制 | 机械臂回到中心位置 |
| 停止运动 | 停止机械臂运动 |
| 位置查询 | 查询机械臂当前位置 |

```python
# 机械臂相对位置控制
robot.set_arm_relative_position(x=10, y=0)
print("机械臂移动到相对位置 (10, 0)")

# 机械臂绝对位置控制
robot.set_arm_absolute_position(x=100, y=50)
print("机械臂移动到绝对位置 (100, 50)")

# 机械臂回中
robot.arm_return_center()
print("机械臂回中")

# 停止运动
robot.stop_arm()
print("机械臂停止")
```

#### 机械爪控制

| 功能 | 说明 |
| --- | --- |
| 张开 | 打开机械爪 |
| 关闭 | 关闭机械爪 |
| 查询 | 查询开合状态 |

```python
# 机械爪控制
robot.open_gripper()
print("机械爪张开")
robot.close_gripper()
print("机械爪关闭")

# 查询状态
status = robot.get_gripper_status()
print(f"机械爪状态: {status}")
```

### 舵机控制

| 功能 | 说明 |
| --- | --- |
| 角度控制 | 控制舵机角度 |
| 速度控制 | 控制舵机转动速度 |
| 停止 | 停止舵机运动 |
| 查询 | 查询舵机角度 |

```python
# 舵机角度控制
robot.set_servo_angle(servo_id=1, angle=45)
print("舵机1设置到45度")

# 舵机速度控制
robot.set_servo_speed(servo_id=1, speed=50)
print("舵机1速度设置为50")

# 停止运动
robot.stop_servo(servo_id=1)
print("舵机1停止")

# 查询角度
angle = robot.get_servo_angle(servo_id=1)
print(f"舵机1角度: {angle}")
```

### 深度传感器

### 产品特性

- 六轴深度检测
- 高精度测量
- 多种输出接口

### 引脚说明

| 引脚 | 功能 |
| --- | --- |
| VCC | 电源正极 |
| GND | 电源负极 |
| TRIG | 触发信号 |
| ECHO | 回波信号 |
| RX | UART接收 |

### 控制说明

```python
from robomaster.sensor import DepthSensor

# 初始化深度传感器
sensor = DepthSensor()

# 获取深度数据
depth = sensor.get_depth()
print(f"深度: {depth} cm")
```

### 通讯协议和数据格式

| 字段 | 说明 |
| --- | --- |
| 头部 | 帧标识符 |
| 数据类型 | 数据类型标识 |
| 数据 | 负载数据 |
| 校验和 | CRC校验 |

### 传感器转接模块

#### 介绍

传感器转接模块用于连接各种外设传感器到机器人系统。

#### 引脚说明

| 引脚 | 功能 |
| --- | --- |
| VCC | 电源正极 |
| GND | 电源负极 |
| TX | UART发送 |
| RX | UART接收 |
| INT1 | 中断1 |
| INT2 | 中断2 |

#### 控制说明

```python
# 读取传感器数据
data = sensor_read_module.read_channel(channel=1)
print(f"通道1数据: {data}")
```

### UART接口

### 介绍

UART接口用于串口通信，支持多种波特率。

#### 引脚说明

| 引脚 | 功能 |
| --- | --- |
| TX | 发送端 |
| RX | 接收端 |
| CTS | 清除发送 |
| RTS | 请求发送 |

#### 串口配置

```python
import serial

# 配置串口
ser = serial.Serial('COM3', 115200, timeout=1)
ser.write(b'command\r\n')
response = ser.readline()
print(f"响应: {response}")
```

---

## 🔤 明文SDK 示例

### 开发前的准备

#### 建立连接

```python
from robomaster import robomaster
import time

# 连接机器人
robot = robomaster.RoboMaster()
robot.connect()

# 等待连接完成
time.sleep(2)
print(f"连接状态: {robot.get_connection_state()}")
```

#### 功能SDK模式

```python
# 切换到功能SDK模式
robot.switch_to_function_sdk()

# 执行功能操作
robot.set_chassis_speed(0.3, 0, 0)

# 切换回机器人模式
robot.switch_to_robot_mode()
```

### 连接方式

#### WIFI直连

```python
# WIFI直连模式
robot.connect()
# 机器人作为AP
```

#### WIFI组网

```python
# WIFI组网模式
robot.connect()
# 加入网络组
```

### SDK模式控制

#### 进入SDK模式

```python
robot.switch_to_function_sdk()
```

#### 退出SDK模式

```python
robot.switch_to_robot_mode()
```

### 机器人控制

#### 机器人运动模式控制

```python
# 设置运动模式
robot.set_robot_mode(mode=robot.ROBOT_MODE_GIMBAL)

# 获取当前运动模式
mode = robot.get_robot_mode()
print(f"当前运动模式: {mode}")
```

#### 机器人运动模式获取

```python
# 获取运动模式
mode = robot.get_robot_mode()
print(f"运动模式: {mode}")
```

#### 机器人剩余电量获取

```python
# 获取电量
battery = robot.get_battery()
print(f"电量百分比: {battery}%")
```

### 小结

- 连接方式灵活（WIFI直连/组网/USB/UART）
- 功能SDK模式和机器人模式可切换
- 丰富的API接口满足各种控制需求

---

## 📝 明文协议

### 协议格式

#### 数据包结构

```
| 字段 | 长度 | 说明 |
| --- | --- | --- |
| 帧标识 | 2字节 | 固定标识符 |
| 命令类型 | 1字节 | 命令类型 |
| 数据长度 | 2字节 | 负载长度 |
| 数据 | N字节 | 负载数据 |
| 校验和 | 2字节 | CRC16校验 |
```

### 控制命令

#### 任务动作控制

| 命令类型 | 功能 | 数据格式 |
| --- | --- | --- |
| 底盘控制 | 运动模式、速度、位置 | 结构体 |
| 云台控制 | 相对/绝对位置、休眠/恢复 | 结构体 |
| 发射器控制 | 单次发射、发射控制 | 简单/扩展 |
| 机械臂控制 | 相对/绝对位置、回中、停止 | 结构体 |
| 机械爪控制 | 张开、关闭、查询状态 | 简单/扩展 |
| PWM控制 | 占空比、频率、灯效 | 结构体 |
| 多机控制 | 编队、分组、控制 | 结构体 |

#### 消息推送

| 类型 | 说明 |
| --- | --- |
| 事件上报 | 状态变化事件 |
| IP广播 | IP地址信息 |
| 视频流 | H.264视频流 |
| 音频流 | AAC音频流 |

---

## 🤖 用户自定义UI系统

### Common

通用UI组件。

### Stage

舞台显示机器人状态和视频。

### Button

按钮组件。

### Toggle

开关组件。

### Text

文本输入组件。

### InputField

输入框组件。

### Dropdown

下拉选择组件。

### 发射器

发射器控制组件。

### 机械爪

机械爪控制组件。

### 机械臂

机械臂控制组件。

### 智能

智能控制组件。

### 舵机

舵机控制组件。

### 传感器转接模块

传感器转接模块控制。

### UART

UART配置组件。

### 相机

相机控制组件。

### 深度传感器

深度传感器控制组件。

### 音频

音频控制组件。

### 视频

视频控制组件。

---

## 📱 Python编程说明

### 界面

基于 Python 的用户界面系统。

### 功能介绍

- Scratch 编程
- Python 编程
- 模块控制

### Python API

详细的 Python API 参考，参见官方文档。

---

## 🔗 相关文档

### SDK 文档

- [RoboMaster 开发者文档](https://robomaster-dev.readthedocs.io/zh-cn/latest/) - 官方完整文档
- [RoboMaster Python SDK](https://github.com/RoboMaster/RoboMaster-Python-SDK) - Python SDK 仓库
- [RoboMaster 明文SDK](https://github.com/RoboMaster/RoboMaster-ClearText-SDK) - 明文SDK仓库

### 相关笔记

- [[机器人控制笔记]] - 机器人控制理论与实践
- [[ESP32开发基础]] - 嵌入式开发
- [[3 Resources/01-Tech/MicroROS机器人控制板]] - 另一个机器人平台

---

## 📊 版本信息

- **RoboMaster EP 教育套装**
- **RoboMaster S1 教育机器人**
- **Tello Edu 系列**
- **Python SDK 版本**: 参考官方文档
- **明文 SDK 版本**: 参考官方文档
- **固件版本**: 通过 API 查询

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
