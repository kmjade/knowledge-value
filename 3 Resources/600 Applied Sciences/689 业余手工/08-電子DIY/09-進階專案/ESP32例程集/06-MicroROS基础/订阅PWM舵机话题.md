---
title: 订阅PWM舵机话题
status: active
priority: medium
tags: [esp32/examples, microros/subscriber]
aliases: [订阅PWM舵机话题, 舵机控制]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706347410/订阅PWM舵机话题.html
related:
  - [[MicroROS机器人控制板]]
  - [[订阅话题]]
  - [[驱动PWM舵机]]
---

# 订阅PWM舵机话题

> 学习ESP32-microROS组件，订阅话题控制PWM舵机。

---

## 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

学习ESP32-microROS组件，订阅话题控制PWM舵机。

---

## 二、硬件连接

如下图所示，microROS控制板集成了ESP32-S3-WROOM核心模组和PWM舵机接口，自带无线WiFi功能，ESP32-S3核心模组需要连接天线，将PWM舵机连接到PWM舵机接口，还需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240117142546351](https://www.yahboom.com/public/upload/upload-html/1706347410/image-20240117142546351.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/microros_samples/servo_subscriber
```

### PWM舵机控制

由于本次使用到PWM舵机，而在之前例程已经做过了PWM舵机的组件，所以需要把PWM舵机的相关组件复制到项目的components目录下。在程序开始的地方调用Servo_Init初始化PWM舵机。

### 订阅PWM舵机话题

创建订阅者"servo"，需要指定ROS话题信息为std_msgs/msg/Int32类型。

```c
rcl_subscription_t servo_subscriber;
RCCHECK(rclc_subscription_init_default(
    &servo_subscriber,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
    "servo"));
```

### PWM舵机回调函数

当microros订阅者接收到PWM舵机话题数据时，触发回调函数，根据接收到的数据控制舵机角度。

```c
void servo_callback(const void * msgin)
{
    const std_msgs__msg__Int32 * msg = (const std_msgs__msg__Int32 *)msgin;
    printf("Servo angle: %d\n", (int)msg->data);
    Servo_Set_Angle(msg->data);
}
```

---

## 四、编译下载烧录固件

使用Type-C数据线连接虚拟机/电脑与microROS控制板，如果系统弹窗选择连接到虚拟机上。

激活ESP-IDF开发环境，注意每次打开新终端都需要先激活ESP-IDF开发环境才可以编译固件。

```bash
source ~/esp/esp-idf/export.sh
```

进入项目目录：

```bash
cd ~/esp/Samples/microros_samples/servo_subscriber
```

打开ESP-IDF的配置工具。

```bash
idf.py menuconfig
```

打开micro-ROS Settings，在micro-ROS Agent IP填入代理主机的IP地址，在micro-ROS Agent Port填入代理主机的端口号。

依次打开micro-ROS Settings->WiFi Configuration，在WiFi SSID和WiFi Password这两栏填入自家的WiFi名称和密码。

打开micro-ROS example-app settings，设置Ros domain id和Ros namespace。

修改后按S保存，再按Q退出配置工具。

编译、烧录、打开串口模拟器。

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

开机后，ESP32尝试连接WiFi热点，再尝试连接代理IP和端口。

启动micro-ROS代理：

```bash
docker run -it --rm -v /dev:/dev -v /dev/shm:/dev/shm --privileged --net=host microros/micro-ros-agent:humble udp4 --port 8090 -v4
```

连接成功后创建节点和订阅者。

向/servo话题发送数据控制舵机角度（范围0-180度）：

```bash
# 舵机转到0度
ros2 topic pub /servo std_msgs/msg/Int32 "data: 0"

# 舵机转到90度
ros2 topic pub /servo std_msgs/msg/Int32 "data: 90"

# 舵机转到180度
ros2 topic pub /servo std_msgs/msg/Int32 "data: 180"
```

---

## 相关文档

- [[订阅话题]] - 基础订阅功能
- [[驱动PWM舵机]] - PWM舵机硬件控制
- [[订阅蜂鸣器话题]] - 蜂鸣器控制订阅
