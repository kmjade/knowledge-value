---
title: UGV01机器人开发资源
status: active
priority: medium
tags: [knowledge/robotics, esp32, dji, robomaster]
aliases: [UGV01, 机器人开发]
created: 2026-02-19
modified: 2026-02-19
source: https://www.waveshare.net/wiki/UGV01
related:
  - [[RoboMaster开发资源]]
  - [[ESP32开发基础]]
  - [[机器人控制笔记]]
---

# UGV01机器人开发资源

> UGV01是一款具备超强越野能力和抗震性能的开源移动机器人履带底盘，支持全代码开源，配备完整的教育资源。

---

## 📋 概述

### 产品特点

- ✅ **超强越野能力**：多独立悬挂系统，大坡度地形适应
- ✅ **抗震性能**：优秀底盘设计，复杂地形通过能力
- ✅ **全代码开源**：可二次开发，适合教学和研究
- ✅ **丰富教育资源**：完整课程体系和教程
- ✅ **灵活扩展**：支持多种上位机和通信方式

### 核心特性

| 特性 | 描述 |
| --- | --- |
| 主控芯片 | ESP32-S3 |
| 控制方式 | 串口/UART、WiFi、蓝牙 |
| 扩展接口 | 舵机PWM、LED、传感器 |
| 编码器 | 电机编码器支持速度反馈 |
| 显示 | 0.96" OLED屏幕 |
| 电池 | 3节18650锂电池 + UPS供电 |
| 通信 | ESP-NOW、明文协议 |

---

## 🛠️ 硬件组成

### 底盘模块

- 四路驱动电机（带编码器）
- 独立悬挂系统
- 履带驱动结构
- 电池包和电源管理

### 驱动板

- ESP32-S3 主控芯片
- IMU六轴姿态传感器
- 多功能扩展接口
- WiFi/蓝牙模块

### 扩展模块

- 机械臂
- 机械爪
- 舵机云台
- 深度传感器
- 激光雷达接口

---

## 📚 开发环境

### 方式一：ESP32-IDF开发

直接使用 ESP32-IDF v5.1.2 进行底层开发，适合嵌入式开发。

```bash
# 激活ESP-IDF环境
source ~/esp/esp-idf/export.sh

# 设置目标芯片
idf.py set-target esp32s3

# 编译项目
idf.py build
idf.py flash
```

### 方式二：Arduino IDE

使用 Arduino IDE 开发，简单直观，适合快速原型开发。

### 方式三：上位机控制

通过 Web 端口或串口进行控制，支持多种上位机平台。

---

## 🔗 通信方式

### UART 串口

ESP32与上位机通过 UART 串口进行双向通信，波特率默认 115200。

```python
# 串口通信示例
import serial

ser = serial.Serial('COM3', 115200, timeout=1)
ser.write(b'command\r\n')
response = ser.readline()
print(f"响应: {response}")
```

### ESP-NOW 通信

支持 ESP-NOW 低延迟传输协议，适合实时控制。

### WiFi 通信

AP 模式和 STA 模式支持，可连接路由器或热点。

### 蓝牙 BLE

支持 BLE 5.0 蓝牙通信。

---

## 📋 机器人控制

### 电机控制

#### 底盘速度控制

```python
# 速度控制命令格式
CMD_SPEED_CTRL = 0x41

# 发送速度命令（左侧速度0.5 m/s）
ser.write(b'\x41\x0A\x00\x05\x00')

# 停止
ser.write(b'\x41\x00\x00\x00')
```

#### 转向控制

```python
# 转向控制命令格式
CMD_MOVE_CTRL = 0x46

# 前进 1米
ser.write(b'\x46\x04\x00\x0A')

# 左转
ser.write(b'\x46\x00\x00\x0A')

# 右转
ser.write(b'\x46\x04\x00\x00')
```

#### 发射器控制

```python
# 发射器单次发射
CMD_FIRE_SINGLE = 0x48

# 发射器发射
ser.write(b'\x48\x01')

# 发射量控制
ser.write(b'\x48\x00\x32')
```

#### 云台控制

```python
# 云台相对位置
CMD_GIMBAL_PITCH = 0x49

# 角度控制
ser.write(b'\x49\x1E\x00')
```

#### 机械臂控制

```python
# 机械臂控制命令
CMD_ARM_ABSOLUTE = 0x50
CMD_ARM_RELATIVE = 0x51
CMD_ARM_RETURN = 0x52
CMD_ARM_STOP = 0x53

# 绝对位置 100, 50
ser.write(b'\x50\x00\x32\x00')

# 回中
ser.write(b'\x52\x00\x00')

# 停止
ser.write(b'\x53\x00\x00')
```

#### 机械爪控制

```python
# 机械爪控制命令
CMD_GRIPPER_OPEN = 0x54
CMD_GRIPPER_CLOSE = 0x55
CMD_GRIPPER_STATUS = 0x56

# 张开
ser.write(b'\x54\x01')

# 关闭
ser.write(b'\x55\x01')

# 查询状态
ser.write(b'\x56\x01')
```

### 明文协议

数据包格式采用 JSON 结构：

```json
{
  "header": {
    "length": 2,
    "token": 0x40
  },
  "data": {
    "command": "CMD_MOVE_CTRL",
    "params": {
      "L": 0.5,
      "R": 0.5
    }
  }
  }
}
```

---

## 📱 固件更新与OTA

### 固件下载

官方固件可通过 Web 端口下载。

### 更新流程

1. 下载固件 bin 文件
2. 配置更新参数
3. 通过串口或 WiFi 上传到机器人
4. 等待更新完成

---

## 📖 Web控制界面

### Web端访问

1. 连接机器人 WiFi 热点（UGV01，密码：12345678）
2. 打开浏览器访问控制界面

### JSON 指令发送

通过 Web 界面可以发送各种控制指令，支持以下类型：

#### 底盘控制
- 速度控制（前进/后退/左转/右转）
- 停止运动
- 发射器控制

#### 机械臂控制
- 绝对/相对位置控制
- 抓取
- 停止

#### 云台控制
- 水平/垂直角度控制
- 休眠/恢复

#### 扩展控制
- PWM 舵机控制
- LED 效果设置

---

## 🔧 扩展接口

### 传感器接口

| 接口 | 说明 | 引脚 |
| --- | --- |
| ADC | 模拟输入 |
| GPIO | 数字输入/输出 |
| I2C | 传感器通信 |
| PWM | 舵机控制 |
| UART | 串口通信 |

### 机械臂接口

标准 6 线串口，可适配自定义机械臂。

---

## 📚 Python SDK

官方提供 Python SDK，支持完整的功能控制。

### 主要功能

- 机器人状态查询
- 运动控制
- 传感器数据获取
- 多机编队

```python
# 安装
pip install robomaster

# 示例：连接机器人
from robomaster import robomaster

robot = robomaster.RoboMaster()
robot.connect()

# 查询版本
version = robot.get_version()
print(f"版本: {version}")

# 控制运动
robot.set_chassis_speed(0.5, 0, 0)
```

---

## 🎓 教育资源

### Scratch 编程

通过图形化编程界面进行控制，适合初学者。

### Python 编程

基于 Python 的编程界面，适合进阶学习。

---

## 🔗 相关文档

- [UGV01 Wiki 完整文档](https://www.waveshare.net/wiki/UGV01)
- [RoboMaster 开发资源](https://github.com/RoboMaster/RoboMaster-Python-SDK)
- [UGV01 固件下载](https://www.waveshare.net)

---

## 💡 学习路径建议

### 入门路径

1. 了解机器人硬件组成
2. 学习基础控制命令
3. 使用 Arduino IDE 进行简单控制
4. 熟悉明文协议

### 进阶路径

1. 使用 ESP32-IDF 开发自定义功能
2. 开发上位机程序
3. 研究 Python SDK 高级功能
4. 探索机械臂和云台应用

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
