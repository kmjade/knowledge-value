---
title: roborts_base 底层通信
aliases:
  - RoboRTS Base
  - 底层通信接口
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/serial
  - type/tutorial
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster.github.io/RoboRTS-Tutorial/#/sdk_docs/roborts_base
---

# roborts_base 底层通信

> [!summary] 概述
> roborts_base 负责上位机与 STM32 底层的串口通信，实现传感器数据接收和控制指令下发。

---

## 功能说明

### 核心功能

- 串口通信管理
- 数据协议解析
- 传感器数据发布
- 控制指令接收

### 数据流向

```
上位机 (ROS)                          底层 (STM32)
┌─────────────┐                    ┌─────────────┐
│roborts_base │◀───串口 921600───▶│  Firmware   │
│   节点      │     bps           │   RTOS      │
└─────────────┘                    └─────────────┘
      │                                   │
      │ 发布                              │ 读取
      ▼                                   ▼
 ROS Topics                          传感器/电机
```

---

## 串口配置

### 通信参数

| 参数 | 值 |
|------|-----|
| **设备** | /dev/ttyUSB0 |
| **波特率** | 921600 |
| **数据位** | 8 |
| **停止位** | 1 |
| **校验位** | None |

### 初始化代码

```cpp
// 打开串口
serial::Serial ser;
ser.setPort("/dev/ttyUSB0");
ser.setBaudrate(921600);
serial::Timeout to = serial::Timeout::simpleTimeout(1000);
ser.setTimeout(to);
ser.open();
```

---

## 数据协议

### 接收数据帧 (STM32 → ROS)

| 字节 | 内容 | 说明 |
|------|------|------|
| 0-1 | 帧头 | 0xAA 0x55 |
| 2 | 数据长度 | N |
| 3 | 数据类型 | 类型标识 |
| 4-(N+3) | 数据 | 具体数据 |
| N+4 | 校验和 | CRC8 |

### 发送数据帧 (ROS → STM32)

| 字节 | 内容 | 说明 |
|------|------|------|
| 0-1 | 帧头 | 0xAA 0x55 |
| 2 | 数据长度 | N |
| 3 | 命令类型 | 命令标识 |
| 4-(N+3) | 数据 | 命令参数 |
| N+4 | 校验和 | CRC8 |

---

## 数据类型

### 传感器数据

```cpp
// IMU 数据
struct IMUData {
    float ax, ay, az;      // 加速度
    float gx, gy, gz;      // 角速度
    float qw, qx, qy, qz;  // 四元数
    float roll, pitch, yaw; // 欧拉角
};

// 里程计数据
struct OdomData {
    float x, y, theta;     // 位置和朝向
    float vx, vy, vtheta;  // 速度
};

// 电机反馈
struct MotorFeedback {
    uint8_t id;            // 电机 ID
    int16_t angle;         // 角度
    int16_t speed;         // 速度
    int16_t current;       // 电流
    int8_t temperature;    // 温度
};
```

### 控制指令

```cpp
// 底盘速度控制
struct ChassisCmd {
    float vx;              // 前进速度
    float vy;              // 横向速度
    float vw;              // 旋转角速度
};

// 云台角度控制
struct GimbalCmd {
    float pitch;           // 俯仰角
    float yaw;             // 偏航角
    uint8_t mode;          // 控制模式
};

// 发射控制
struct ShootCmd {
    uint8_t mode;          // 发射模式
    uint16_t speed;        // 弹丸速度
};
```

---

## ROS 接口

### 发布的话题

| 话题 | 消息类型 | 频率 | 说明 |
|------|----------|------|------|
| `/imu/data` | sensor_msgs/Imu | 200 Hz | IMU 数据 |
| `/odom` | nav_msgs/Odometry | 100 Hz | 里程计 |
| `/joint_states` | sensor_msgs/JointState | 100 Hz | 关节状态 |

### 订阅的话题

| 话题 | 消息类型 | 说明 |
|------|----------|------|
| `/cmd_vel` | geometry_msgs/Twist | 速度指令 |
| `/gimbal/cmd` | roborts_msgs/GimbalCmd | 云台控制 |
| `/shoot/cmd` | roborts_msgs/ShootCmd | 发射控制 |

---

## 使用示例

### 接收传感器数据

```cpp
void BaseNode::ReadData() {
    uint8_t buffer[256];
    size_t len = ser.read(buffer, sizeof(buffer));
    
    // 解析数据帧
    if (buffer[0] == 0xAA && buffer[1] == 0x55) {
        uint8_t data_type = buffer[3];
        uint8_t* data = &buffer[4];
        
        switch (data_type) {
            case IMU_DATA:
                ParseIMUData(data);
                break;
            case ODOM_DATA:
                ParseOdomData(data);
                break;
            case MOTOR_FEEDBACK:
                ParseMotorFeedback(data);
                break;
        }
    }
}
```

### 发送控制指令

```cpp
void BaseNode::SendChassisCmd(float vx, float vy, float vw) {
    uint8_t buffer[16];
    buffer[0] = 0xAA;
    buffer[1] = 0x55;
    buffer[2] = 12;  // 数据长度
    buffer[3] = CHASSIS_CMD;
    
    // 填充速度数据
    memcpy(&buffer[4], &vx, 4);
    memcpy(&buffer[8], &vy, 4);
    memcpy(&buffer[12], &vw, 4);
    
    // 计算校验和
    buffer[16] = CRC8(buffer, 16);
    
    ser.write(buffer, 17);
}
```

---

## 调试方法

### 串口调试

```bash
# 查看串口设备
ls /dev/ttyUSB*

# 设置串口权限
sudo chmod 666 /dev/ttyUSB0

# 使用 minicom 调试
minicom -D /dev/ttyUSB0
```

### 数据监控

```bash
# 监听 IMU 话题
rostopic echo /imu/data

# 监听里程计
rostopic echo /odom

# 发布速度指令
rostopic pub /cmd_vel geometry_msgs/Twist \
    "linear: {x: 0.5, y: 0, z: 0}
     angular: {x: 0, y: 0, z: 0}"
```

---

## 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 无法打开串口 | 权限不足 | sudo chmod 666 /dev/ttyUSB0 |
| 数据乱码 | 波特率错误 | 确认 921600 |
| 数据丢包 | 缓冲区溢出 | 增加读取频率 |
| 延迟过高 | 串口阻塞 | 使用异步读取 |

---

## 相关链接

- [[RoboRTS教程概览]] - 返回概览
- [[architecture]] - 系统架构
- [[roborts_decision]] - 决策模块
