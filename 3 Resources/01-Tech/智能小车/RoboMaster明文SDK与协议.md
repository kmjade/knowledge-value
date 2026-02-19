---
title: RoboMaster 明文SDK与协议
tags:
  - para/resource/tech
  - 技术/机器人
  - 技术/通信
  - 明文SDK
status: active
aliases:
  - RoboMaster协议文档
  - 明文SDK指南
  - 机器人通信协议
cssclasses:
  - resource-note
created: 2026-02-19
---

# RoboMaster 明文SDK与协议

> [!info] 明文SDK概述
> 明文SDK允许用户通过第三方平台与RoboMaster EP建立连接，使用C++、C#、Python或其他语言进行编程，实现更复杂的二次开发。

## 📋 开发流程

### 开发前的准备

1. **建立连接** - 通过WIFI、USB或UART与EP建立连接
2. **使能SDK模式** - 进入SDK模式以接收控制命令
3. **发送控制命令** - 按照协议格式发送命令
4. **处理消息推送** - 接收和处理机器人状态信息
5. **退出SDK模式** - 使用完成后退出SDK模式

### 建立连接

#### WIFI连接

**直连模式**：
```
IP: 192.168.2.1
Port: 40923
```

**路由器模式**：
```
IP: 机器人获取的路由器IP
Port: 40923
```

#### USB连接

```
串口设备: 根据系统而定
Baudrate: 115200
Data bits: 8
Stop bits: 1
Parity: None
```

#### UART连接

```
串口设备: /dev/ttyTHS1（Linux）
Baudrate: 115200
Data bits: 8
Stop bits: 1
Parity: None
```

### 连接示例

```python
import socket

# WIFI连接（TCP）
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("192.168.2.1", 40923))

# 发送命令
command = "command\n"
sock.send(command.encode())

# 接收响应
response = sock.recv(1024).decode()
print(response)

# 关闭连接
sock.close()
```

```cpp
// C++串口连接
#include <SerialPort.h>

SerialPort serial("/dev/ttyTHS1");
serial.SetBaudRate(BaudRate::B_115200);
serial.Open();

// 发送命令
std::string command = "command\n";
serial.Write(command);

// 接收响应
std::string response;
serial.ReadLine(response);
```

---

## 📡 协议格式

### 协议结构

明文SDK协议采用文本格式，每条命令以换行符`\n`结束。

#### 基本格式

```
command [param1] [param2] [param3]
```

#### 示例

```
chassis move x 0.5 y 0 z 0
gimbal move p 10 y 10
blaster fire
```

### 消息类型

#### 1. 控制命令

控制机器人执行特定动作，由客户端发送给机器人。

**格式**：
```
command [subcommand] [parameters]
```

**示例**：
```
chassis move x 0.5 y 0 z 0
gimbal move p 10 y 10
blaster fire
```

#### 2. 消息推送

机器人主动推送状态信息给客户端。

**格式**：
```
[timestamp] [module] [data]
```

**示例**：
```
1625097600.123 chassis position x 100 y 200 z 0
1625097600.234 gimbal angle p 0 y 0
```

#### 3. 事件上报

机器人检测到特定事件时主动上报。

**格式**：
```
[event_type] [event_data]
```

**示例**：
```
armor hit 0 1
ir_distance 50
```

#### 4. IP广播

机器人定期广播IP地址。

**格式**：
```
ROBOT_IP [ip_address]
```

#### 5. 视频流

H.264视频流数据。

#### 6. 音频流

音频采样数据。

---

## 🎮 协议内容

### SDK模式控制

#### 进入SDK模式

```
command
```

**返回**：
```
ok
```

#### 退出SDK模式

```
quit
```

**返回**：
```
ok
```

---

### 机器人控制

#### 机器人运动模式控制

```
robot mode free
```

**参数**：
- `free` - 自由模式
- `position` - 位置模式

**返回**：
```
ok
```

#### 机器人运动模式获取

```
robot mode ?
```

**返回**：
```
free
```

#### 机器人剩余电量获取

```
robot battery ?
```

**返回**：
```
battery 85
```

---

### 底盘控制

#### 底盘运动速度控制

```
chassis move x [x_vel] y [y_vel] z [z_vel]
```

**参数**：
- `x_vel` - x轴速度（-3.5到3.5 m/s）
- `y_vel` - y轴速度（-3.5到3.5 m/s）
- `z_vel` - z轴旋转速度（-600到600 deg/s）

**示例**：
```
chassis move x 0.5 y 0 z 0
```

**返回**：
```
ok
```

#### 底盘轮子速度控制

```
chassis wheel w1 [w1] w2 [w2] w3 [w3] w4 [w4]
```

**示例**：
```
chassis wheel w1 100 w2 100 w3 100 w4 100
```

#### 底盘相对位置控制

```
chassis move x [x] y [y] z [z] v [velocity]
```

**参数**：
- `x` - x轴距离（mm）
- `y` - y轴距离（mm）
- `z` - z轴旋转角度（deg）
- `velocity` - 运动速度（mm/s）

**示例**：
```
chassis move x 100 y 0 z 90 v 200
```

#### 底盘速度获取

```
chassis speed ?
```

**返回**：
```
chassis speed x 0.5 y 0 z 0 w1 50 w2 50 w3 50 w4 50
```

#### 底盘位置获取

```
chassis position ?
```

**返回**：
```
chassis position x 100 y 200 z 0
```

#### 底盘姿态获取

```
chassis attitude ?
```

**返回**：
```
chassis attitude pitch 0 yaw 0 roll 0
```

#### 底盘状态获取

```
chassis status ?
```

**返回**：
```
chassis status 0
```

#### 底盘信息推送控制

```
chassis push ?
chassis push position on
chassis push attitude on
chassis push speed on
chassis push status on
```

#### 底盘推送信息数据

```
[timestamp] chassis position x [x] y [y] z [z]
[timestamp] chassis attitude pitch [pitch] yaw [yaw] roll [roll]
[timestamp] chassis speed x [x] y [y] z [z]
```

---

### 云台控制

#### 云台运动速度控制

```
gimbal move p [p_speed] y [y_speed]
```

**参数**：
- `p_speed` - 俯仰速度（-400到400 deg/s）
- `y_speed` - 偏航速度（-600到600 deg/s）

**示例**：
```
gimbal move p 10 y 10
```

#### 云台相对位置控制

```
gimbal move p [p_angle] y [y_angle] v [velocity]
```

**参数**：
- `p_angle` - 俯仰角度（deg）
- `y_angle` - 偏航角度（deg）
- `velocity` - 运动速度（deg/s）

#### 云台绝对位置控制

```
gimbal move p [p_angle] y [y_angle] v [velocity]
```

#### 云台休眠控制

```
gimbal suspend
```

#### 云台恢复控制

```
gimbal resume
```

#### 云台回中控制

```
gimbal recenter
```

#### 云台姿态获取

```
gimbal attitude ?
```

**返回**：
```
gimbal attitude pitch 0 yaw 0
```

#### 云台信息推送控制

```
gimbal push attitude on
gimbal push attitude off
```

#### 云台推送信息数据

```
[timestamp] gimbal attitude pitch [pitch] yaw [yaw]
```

---

### 发射器控制

#### 发射器单次发射量控制

```
blaster fire number [num]
```

**参数**：
- `num` - 发射数量（1-24）

#### 发射器发射控制

```
blaster fire
```

#### 发射器单次发射量获取

```
blaster fire number ?
```

**返回**：
```
blaster fire number 1
```

---

### 装甲板控制

#### 装甲板灵敏度控制

```
armor sensitivity [level]
```

**参数**：
- `level` - 灵敏度等级（1-10）

#### 装甲板灵敏度获取

```
armor sensitivity ?
```

**返回**：
```
armor sensitivity 5
```

#### 装甲板事件上报控制

```
armor event on
armor event off
```

#### 装甲板事件上报数据

```
armor hit [index] [type]
```

**参数**：
- `index` - 装甲板索引（0-6）
- `type` - 击中类型

---

### 声音识别控制

#### 声音识别事件上报控制

```
sound event on
sound event off
```

#### 声音识别事件上报数据

```
sound recognize [word]
```

**返回**：
```
sound recognize hello
```

---

### PWM控制

#### PWM输出占空比控制

```
pwm pwm [index] freq [frequency] duty [duty]
```

**参数**：
- `index` - PWM索引
- `frequency` - 频率（Hz）
- `duty` - 占空比（0-100%）

**示例**：
```
pwm pwm 0 freq 50 duty 50
```

#### PWM输出频率控制

```
pwm freq [index] [frequency]
```

---

### LED控制

#### LED灯效控制

```
led control comp [component] r [r] g [g] b [b] [effect]
```

**参数**：
- `component` - 组件（all, top_light等）
- `r` - 红色（0-255）
- `g` - 绿色（0-255）
- `b` - 蓝色（0-255）
- `effect` - 效果（可选）

**示例**：
```
led control comp all r 255 g 0 b 0
```

---

### 传感器转接板控制

#### 传感器转接板ADC值获取

```
adapter adc [index]
```

**返回**：
```
adapter adc [index] [value]
```

#### 传感器转接板IO值获取

```
adapter io [index]
```

**返回**：
```
adapter io [index] [value]
```

#### 传感器转接板IO引脚电平跳变时间值获取

```
adapter time [index]
```

**返回**：
```
adapter time [index] [time]
```

#### 传感器转接板事件上报控制

```
adapter adc [index] on
adapter io [index] on
```

#### 传感器转接板事件上报数据

```
[timestamp] adapter adc [index] [value]
[timestamp] adapter io [index] [value]
```

---

### 红外深度传感器控制

#### 红外深度传感器开关控制

```
ir_distance on
ir_distance off
```

#### 红外深度传感器距离获取

```
ir_distance ?
```

**返回**：
```
ir_distance 50
```

---

### 舵机控制

#### 舵机角度控制

```
servo [index] angle [angle]
```

**参数**：
- `index` - 舵机索引
- `angle` - 角度（0-180度）

#### 舵机速度控制

```
servo [index] speed [speed]
```

**参数**：
- `speed` - 速度值（0-100）

#### 舵机停止控制

```
servo [index] stop
```

#### 舵机角度查询

```
servo [index] angle ?
```

**返回**：
```
servo [index] angle 90
```

---

### 机械臂控制

#### 机械臂相对位置运动控制

```
arm move x [x] y [y] z [z] v [velocity]
```

#### 机械臂绝对位置运动控制

```
arm move x [x] y [y] z [z] v [velocity]
```

#### 机械臂回中控制

```
arm recenter
```

#### 机械臂停止运动控制

```
arm pause
```

#### 机械臂绝对位置查询

```
arm position ?
```

**返回**：
```
arm position x [x] y [y] z [z]
```

---

### 机械爪控制

#### 机械爪张开运动控制

```
gripper open
```

#### 机械爪关闭运动控制

```
gripper close
```

#### 机械爪开合状态查询

```
gripper status ?
```

**返回**：
```
gripper status 0
```

---

### 智能识别功能控制

#### 智能识别功能属性控制

```
ai push [type] on
```

**类型**：
- `marker` - 标记识别
- `line` - 线条识别
- `vision` - 视觉识别

#### 智能识别功能推送控制

```
ai push marker on
ai push line on
```

#### 智能识别功能推送数据

```
[timestamp] ai marker [x] [y] [type]
[timestamp] ai line [x1] [y1] [x2] [y2]
```

---

### 相机控制

#### 相机曝光设置

```
camera set_exposure [value]
```

---

### 视频流控制

#### 视频流开启控制

```
stream on
```

#### 视频流关闭控制

```
stream off
```

---

### 音频流控制

#### 音频流开启控制

```
audio on
```

#### 音频流关闭控制

```
audio off
```

---

## 📊 数据说明

### 时间戳格式

所有推送消息都包含时间戳，格式为Unix时间戳：

```
[timestamp] [module] [data]
```

**示例**：
```
1625097600.123 chassis position x 100 y 200 z 0
```

### 坐标系统

- **X轴** - 前方为正方向
- **Y轴** - 左侧为正方向
- **Z轴** - 逆时针为正方向

### 角度单位

- **角度** - 度（deg）
- **角速度** - 度/秒（deg/s）

### 距离单位

- **距离** - 毫米（mm）
- **速度** - 米/秒（m/s）

---

## 👥 编队控制

### 介绍

编队控制允许同时控制多台机器人，实现协同作业。

### 示例环境

- **网络** - 路由器模式
- **机器人** - 多台EP机器人
- **控制端** - PC或嵌入式设备

### 建立多机连接

```python
# 连接第一台机器人
robot1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
robot1.connect(("192.168.2.1", 40923))
robot1.send("command\n".encode())

# 连接第二台机器人
robot2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
robot2.connect(("192.168.2.2", 40923))
robot2.send("command\n".encode())

# 连接第三台机器人
robot3 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
robot3.connect(("192.168.2.3", 40923))
robot3.send("command\n".encode())
```

### 运行示例程序

```python
# 控制机器人编队移动
robot1.send("chassis move x 100 y 0 z 90 v 200\n".encode())
robot2.send("chassis move x 100 y 0 z 90 v 200\n".encode())
robot3.send("chassis move x 100 y 0 z 90 v 200\n".encode())

# 控制机器人编队旋转
robot1.send("chassis move x 0 y 0 z 90 v 200\n".encode())
robot2.send("chassis move x 0 y 0 z 90 v 200\n".encode())
robot3.send("chassis move x 0 y 0 z 90 v 200\n".encode())
```

---

## 🔗 相关资源

- [[RoboMaster学习项目]] - 当前学习项目
- [[RoboMaster SDK技术文档]] - Python SDK文档
- [[RoboMaster拓展模块说明]] - 拓展模块详细文档
- [[RoboMaster API参考]] - 完整API文档

## 📚 学习建议

> [!tip] 开发建议
> - 先使用Python SDK熟悉协议
> - 使用串口调试工具测试命令
> - 逐步增加功能复杂度

> [!tip] 调试技巧
> - 打印所有发送和接收的消息
> - 检查返回值和错误码
> - 使用抓包工具分析网络流量

> [!warning] 注意事项
> - 每条命令必须以换行符结束
> - 注意数据类型和范围
> - 及时关闭连接释放资源

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/机器人 #技术/通信 #明文SDK
