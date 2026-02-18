---
title: RoboMaster 拓展模块说明
tags:
  - para/resource/tech
  - 技术/机器人
  - 技术/硬件
  - 拓展模块
status: active
aliases:
  - RoboMaster机械臂
  - RoboMaster传感器
  - RoboMaster舵机
cssclasses:
  - resource-note
created: 2026-02-19
---

# RoboMaster 拓展模块说明

> [!info] 拓展性概述
> RoboMaster EP相比S1具有更加丰富的扩展模块与拓展接口，大大增强了机器人的可编程性和应用场景。

## 📦 拓展模块总览

| 模块 | 主要功能 | 适用场景 |
|------|----------|----------|
| 机械臂与机械爪 | 夹取、移动物体 | 物品抓取、操作任务 |
| 舵机 | 精确角度控制 | 摄像头调节、机械结构 |
| 红外深度传感器 | 距离测量 | 避障、距离检测 |
| 传感器转接模块 | 接入第三方传感器 | 自定义传感器应用 |
| UART接口 | 串行通信 | 第三方平台通信 |

---

## 🔧 机械臂与机械爪

### 概述

工程机器人采用并联机械臂代替云台结构，在机械臂末端装配机械夹爪，可以执行更加复杂的任务。

### 机械臂特性

- **6自由度** - 提供灵活的运动能力
- **高精度** - 支持精确的位置控制
- **大负载** - 能够抓取较重的物体
- **并联结构** - 刚性好，稳定性高

### 机械爪特性

- **PWM控制** - 通过PWM信号控制开合
- **力反馈** - 支持夹持力度调节
- **自适应** - 可适应不同形状的物体

### Python API

#### 初始化

```python
from robomaster import robot

# 初始化机器人
ep_robot = robot.Robot()
ep_robot.initialize()

# 获取机械臂模块
ep_arm = ep_robot.robotic_arm

# 获取机械爪模块
ep_gripper = ep_robot.gripper
```

#### 机械臂控制

```python
# 相对位置运动
ep_arm.move(x=10, y=20, z=30)  # 单位：毫米

# 绝对位置运动
ep_arm.move(x=100, y=200, z=300)

# 机械臂回中
ep_arm.recenter()

# 停止运动
ep_arm.pause()

# 查询位置
position = ep_arm.get_position()
```

#### 机械爪控制

```python
# 打开机械爪
ep_gripper.open()

# 关闭机械爪
ep_gripper.close()

# 查询开合状态
status = ep_gripper.get_status()
```

### 使用说明

1. **机械爪PWM接口** - 连接到指定的PWM输出端口
2. **力控制** - 通过PWM占空比控制夹持力度
3. **状态查询** - 实时获取机械爪开合状态

---

## 🎯 舵机控制

### 概述

舵机是一种能够精确控制角度的执行器，广泛用于机械结构的驱动和控制。

### 舵机特性

- **精确角度控制** - 支持0-180度范围
- **高扭矩** - 提供足够的驱动力
- **快速响应** - 响应时间短
- **PWM控制** - 标准PWM信号驱动

### 引脚说明

| 引脚 | 功能 | 描述 |
|------|------|------|
| VCC | 电源正极 | 5V或6V供电 |
| GND | 电源负极 | 接地 |
| SIGNAL | 信号线 | PWM控制信号 |

### 控制说明

**PWM信号规格**：
- 频率：50Hz
- 脉宽范围：0.5ms-2.5ms
- 对应角度：0-180度

### Python API

```python
from robomaster import robot

# 初始化机器人
ep_robot = robot.Robot()
ep_robot.initialize()

# 获取舵机模块
ep_servo = ep_robot.servo

# 控制舵机角度（0-180度）
ep_servo.servo_angle(1, 90)  # 舵机编号1，角度90度

# 控制舵机速度
ep_servo.servo_speed(1, 50)  # 速度值0-100

# 停止舵机
ep_servo.servo_stop(1)

# 查询舵机角度
angle = ep_servo.query_angle(1)
```

### 应用场景

- 摄像头云台控制
- 机械臂关节驱动
- 机械结构调节
- 夹持机构控制

---

## 📏 红外深度传感器

### 概述

红外深度传感器用于测量物体距离，适用于避障、距离检测等场景。

### 产品特性

- **高精度** - 测距精度高
- **快速响应** - 响应时间短
- **非接触式** - 无需接触目标物体
- **大测量范围** - 支持较大范围的距离测量

### 引脚说明

| 引脚 | 功能 | 描述 |
|------|------|------|
| VCC | 电源正极 | 5V供电 |
| GND | 电源负极 | 接地 |
| OUT | 数据输出 | 模拟信号输出 |

### 通讯协议和数据格式

- **输出类型**：模拟电压信号
- **测量范围**：根据具体型号而定
- **精度**：毫米级

### Python API

```python
from robomaster import robot

# 初始化机器人
ep_robot = robot.Robot()
ep_robot.initialize()

# 获取传感器模块
ep_sensor = ep_robot.sensor

# 开启红外深度传感器
ep_sensor.subscribe(distance=10, callback=lambda data: print(f"距离: {data}"))

# 获取距离数据
distance = ep_sensor.get_ir_distance()
print(f"当前距离: {distance} cm")
```

### 应用场景

- 机器人避障
- 距离测量
- 物体检测
- 导航辅助

---

## 🔌 传感器转接模块

### 概述

传感器转接模块允许接入第三方传感器，极大拓展了机器人的感知能力。

### 引脚说明

#### ADC输入

| 引脚 | 功能 | 描述 |
|------|------|------|
| ADC0-ADC3 | 模拟输入 | 0-3.3V模拟信号输入 |
| GND | 地 | 模拟地 |

#### GPIO输入

| 引脚 | 功能 | 描述 |
|------|------|------|
| IO0-IO7 | 数字输入 | 数字信号输入 |
| GND | 地 | 数字地 |

### 功能

- **ADC采集** - 支持4路模拟信号采集
- **GPIO输入** - 支持8路数字信号输入
- **事件上报** - 支持电平跳变事件上报
- **时间测量** - 支持引脚电平跳变时间测量

### Python API

```python
from robomaster import robot

# 初始化机器人
ep_robot = robot.Robot()
ep_robot.initialize()

# 获取传感器转接板模块
ep_adapter = ep_robot.sensor_adapter

# 获取ADC值
adc_value = ep_adapter.get_adc(index=0)  # 获取ADC0的值

# 获取IO值
io_value = ep_adapter.get_io(index=0)  # 获取IO0的值

# 获取IO引脚电平跳变时间值
time_value = ep_adapter.get_io_time(index=0)

# 事件上报控制
ep_adapter.subscribe_adc(adc_index=0, freq=10, callback=adc_callback)
ep_adapter.subscribe_io(io_index=0, callback=io_callback)
```

### 应用场景

- 温度传感器
- 湿度传感器
- 光敏传感器
- 触摸传感器
- 压力传感器

---

## 📡 UART接口

### 概述

UART（通用异步收发传输器）接口提供串行通信能力，可用于与第三方平台进行通信。

### 引脚说明

| 引脚 | 功能 | 描述 |
|------|------|------|
| TX | 发送数据 | 串口数据发送 |
| RX | 接收数据 | 串口数据接收 |
| GND | 地 | 接地 |
| VCC | 电源 | 3.3V或5V供电 |

### 串口配置

- **波特率**：115200
- **数据位**：8
- **停止位**：1
- **校验位**：None

### 第三方平台连接方式

#### WIFI连接
```python
ep_robot.initialize(conn_type="ap")  # 直连模式
ep_robot.initialize(conn_type="sta", ip="192.168.2.1")  # 路由器模式
```

#### USB连接
```python
ep_robot.initialize(conn_type="usb")
```

#### UART连接
```python
ep_robot.initialize(
    conn_type="uart",
    uart_name="/dev/ttyTHS1",  # Linux
    # uart_name="COM3",  # Windows
    baudrate=115200
)
```

### Python编程示例

```python
from robomaster import robot

# 初始化机器人（UART连接）
ep_robot = robot.Robot()
ep_robot.initialize(conn_type="uart", uart_name="/dev/ttyTHS1")

# 获取UART模块
ep_uart = ep_robot.uart

# 发送数据
ep_uart.write_data(data="Hello Robot")

# 接收数据
data = ep_uart.read_data()
print(f"接收到的数据: {data}")

# 订阅数据
ep_uart.subscribe(callback=uart_callback)
```

### 明文SDK示例

通过UART发送明文SDK命令：

```python
import serial

# 打开串口
ser = serial.Serial(
    port='/dev/ttyTHS1',
    baudrate=115200,
    timeout=1
)

# 发送命令
command = "chassis move x 0.5 y 0 z 0\n"
ser.write(command.encode())

# 接收响应
response = ser.readline()
print(response.decode())
```

### 应用场景

- 第三方平台控制
- 嵌入式系统集成
- 实时数据传输
- 远程控制

---

## 🔗 相关资源

- [[RoboMaster学习项目]] - 当前学习项目
- [[RoboMaster SDK技术文档]] - SDK详细使用指南
- [[RoboMaster明文SDK与协议]] - 明文SDK协议文档
- [[RoboMaster API参考]] - 完整API文档

## 📚 学习建议

> [!tip] 学习顺序
> 1. 先掌握基础模块（舵机、传感器）
> 2. 再学习复杂模块（机械臂、机械爪）
> 3. 最后掌握通信模块（UART）

> [!tip] 实践建议
> - 从简单的角度控制开始
> - 逐步增加复杂度
> - 结合实际场景练习

> [!warning] 注意事项
> - 确保电源充足
> - 注意接线顺序
> - 避免短路
> - 正确设置PWM参数

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/机器人 #技术/硬件 #拓展模块
