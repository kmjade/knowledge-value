---
title: RoboMaster SDK 技术文档
tags:
  - para/resource/tech
  - 技术/机器人
  - 技术/Python
  - SDK
status: active
aliases:
  - RoboMaster SDK使用指南
  - Python SDK文档
  - RoboMaster编程SDK
cssclasses:
  - resource-note
created: 2026-02-19
---

# RoboMaster SDK 技术文档

> [!info] SDK概述
> RoboMaster SDK是基于Python语言实现的，适用于RoboMaster机甲大师系列（包括EP和Tello Edu）的Python SDK软件库。

## 📚 SDK特性

### 核心特性

- **基于Python** - 使用Python语言，便于学习和教学
- **简单易用** - 设计遵循尽量简单的原则，能够快速上手
- **丰富API** - 提供全面的机器人控制接口
- **跨平台** - 支持Windows、Linux、macOS

### 支持的产品

- RoboMaster EP（教育机器人）
- Tello Edu（教育系列无人机）
- 其他RoboMaster系列产品

## 🎯 主要功能模块

### 机器人控制

| 模块 | 功能描述 |
|------|----------|
| `robomaster.chassis` | 底盘运动控制 |
| `robomaster.gimbal` | 云台控制 |
| `robomaster.blaster` | 发射器控制 |
| `robomaster.flight` | 飞行控制（无人机） |
| `robomaster.led` | LED灯效设置 |
| `robomaster.armor` | 装甲板控制 |
| `robomaster.battery` | 电池状态查询 |

### 拓展模块

| 模块 | 功能描述 |
|------|----------|
| `robomaster.robotic_arm` | 机械臂控制 |
| `robomaster.gripper` | 机械爪控制 |
| `robomaster.servo` | 舵机控制 |
| `robomaster.sensor` | 传感器控制 |
| `robomaster.uart` | UART通信接口 |

### 多媒体功能

| 模块 | 功能描述 |
|------|----------|
| `robomaster.camera` | 相机控制 |
| `robomaster.vision` | 智能识别功能 |
| `robomaster.ai_module` | AI模块 |

### 系统功能

| 模块 | 功能描述 |
|------|----------|
| `robomaster.robot` | 机器人核心控制 |
| `robomaster.action` | 动作控制 |
| `robomaster.exceptions` | 异常处理 |
| `robomaster.version` | 版本信息 |

## 🔧 安装指南

### 系统要求

| 平台 | 要求 |
|------|------|
| Windows | Windows 10 64位，Python 3.6.6-3.8.9（64位） |
| Ubuntu | Ubuntu 16.04 64位，Python 3.7+ |
| macOS | macOS X，Python 3.7+ |

### 安装步骤

#### 1. 安装Python环境

确保安装了正确的Python版本：

```bash
# Windows
# 从python.org下载Python 3.7.8（64位）
# 勾选"Add Python to PATH"

# Ubuntu
sudo add-apt-repository ppa:jonathonf/python-3.7
sudo apt-get update
sudo apt-get install python3.7
```

#### 2. 安装依赖（Windows可选）

如果遇到编译错误，需要安装：

- **VC库环境** - 解决libmedia相关错误
- **VC build tools** - 解决.NET接口错误

#### 3. 安装SDK

```bash
# 标准安装
pip install robomaster

# 使用国内镜像（推荐）
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple robomaster

# 升级SDK
pip install --upgrade robomaster
```

## 🚀 快速开始

### 第一个程序

```python
from robomaster import robot

# 初始化机器人
ep_robot = robot.Robot()
ep_robot.initialize(conn_type="ap")

# 获取机器人版本信息
version = ep_robot.get_version()
print(f"Robot version: {version}")

# 关闭连接
ep_robot.close()
```

### 连接方式

```python
# WIFI直连模式
ep_robot.initialize(conn_type="ap")

# WIFI路由器模式
ep_robot.initialize(conn_type="sta", ip="192.168.2.1")

# USB连接
ep_robot.initialize(conn_type="usb")

# UART连接
ep_robot.initialize(conn_type="uart", uart_name="/dev/ttyTHS1")
```

## 📖 API使用指南

### 查询类接口

获取机器人信息：

```python
# 查询机器人版本
version = ep_robot.get_version()

# 获取机器人SN号
sn = ep_robot.get_sn()

# 查询电池电量
battery = ep_robot.get_battery()

# 查询机器人状态
status = ep_robot.get_status()
```

### 设置类接口

配置机器人参数：

```python
# 设置运动模式
ep_chassis.set_mode(mode=chassis.MODE_FREE)

# 设置LED颜色
ep_led.set_led(comp="all", r=255, g=0, b=0)

# 设置发射器单次发射量
ep_blaster.set_fire_num(num=1)
```

### 动作类接口

控制机器人运动：

```python
# 底盘速度控制
ep_chassis.drive_speed(x=0.5, y=0, z=0)

# 云台速度控制
ep_gimbal.drive_speed(pitch=10, yaw=10)

# 发射器射击
ep_blaster.fire()
```

### 多媒体接口

获取视频和音频：

```python
# 获取视频流
ep_camera.start_video_stream(display=True)

# 获取音频流
ep_audio.start_audio_stream()
```

## 🤖 多机控制

### 多机初始化

```python
from robomaster import robot

# 初始化多个机器人
robot1 = robot.Robot()
robot1.initialize(conn_type="sta", ip="192.168.2.1")

robot2 = robot.Robot()
robot2.initialize(conn_type="sta", ip="192.168.2.2")

robot3 = robot.Robot()
robot3.initialize(conn_type="sta", ip="192.168.2.3")
```

### 编队控制

```python
# 创建编队
from robomaster import multi_robot

# 生成组对象
group = multi_robot.MultiRobotGroup(robot_list=[robot1, robot2, robot3])

# 群组控制
group.move(x=100, y=0, z=0)

# 单机控制
robot1.move(x=50, y=0, z=0)
```

## 📊 日志记录

### 配置日志等级

```python
import logging

# 设置日志等级
logging.basicConfig(level=logging.INFO)
```

### 日志文件

```python
# 日志会自动记录到文件中
# 可通过配置调整日志输出位置和格式
```

## 🎓 学习路径

### 基础篇
1. SDK安装与环境配置
2. 机器人连接
3. 第一个程序
4. 查询类接口使用
5. 设置类接口使用
6. 动作类接口使用

### EP机器人篇
1. 初始化机器人
2. 获取模块对象
3. 查询类接口使用（版本、SN号）
4. 设置类接口使用（运动模式、LED）
5. 动作类接口使用（底盘、发射器）
6. 多媒体接口使用（视频流、音频流）

### 无人机篇
1. 初始化无人机
2. 获取模块对象
3. 查询类接口使用
4. 设置类接口使用（LED）
5. 动作类接口使用（飞行控制、遥控器）
6. 多媒体接口使用（视频流）

### 多机控制篇
1. 多机控制简介
2. 多机控制流程
3. 多机初始化
4. 多机编号
5. 多机分组与群组控制
6. 任务控制

## 🔗 相关资源

- [[RoboMaster学习项目]] - 当前学习项目
- [[RoboMaster拓展模块说明]] - 拓展模块详细文档
- [[RoboMaster明文SDK与协议]] - 明文SDK协议文档
- [[RoboMaster API参考]] - 完整API文档

## 🌐 官方资源

- [RoboMaster SDK GitHub](https://github.com/dji-sdk/RoboMaster-SDK)
- [RoboMaster Developer Guide](https://robomaster-dev.readthedocs.io/zh-cn/latest/index.html)
- [RoboMaster 官网](https://www.robomaster.com/)

## 💡 最佳实践

> [!tip] 连接建议
> - 首次使用建议使用WIFI直连模式
> - 开发调试建议使用路由器模式
> - 生产环境建议使用UART连接以提高稳定性

> [!tip] 错误处理
> - 始终使用try-except处理异常
> - 检查返回值和状态码
> - 及时释放机器人资源

> [!tip] 性能优化
> - 避免频繁创建和销毁机器人对象
> - 使用连接池管理多机连接
> - 合理设置日志等级减少I/O开销

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/机器人 #技术/Python #SDK
