---
title: ROS-WiFi图传模块
status: active
priority: medium
tags: [esp32/examples, wifi, camera]
aliases: [WiFi图传, 摄像头驱动]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1713429961/2024041101.html
related:
  - [[MicroROS机器人控制板]]
  - [[WiFi联网]]
---

# ROS-WiFi图传模块

> 驱动WiFi摄像头进行ROS2图传。

---

## 📋 所需硬件

- 7.4V锂电池
- MicroROS机器人控制板
- WiFi摄像头

---

## 📋 摄像头驱动步骤

### 1. 接线

如下图所示接线：

![接线图](https://www.yahboom.com/public/upload/upload-html/1713429961/2024041101.png)

### 2. 连接WiFi热点

打开扩展板开关，然后在电脑列表可以看到"Yahboom_ESP32_WIFI"，点击并连接该热点。（该网络没有密码）

![连接热点](https://www.yahboom.com/public/upload/upload-html/1713429961/2024041102.png)

### 3. 访问摄像头画面

连接之后，我们可以在电脑浏览器里输入网址 http://192.168.4.1:81/stream 来访问摄像头画面

![访问摄像头](https://www.yahboom.com/public/upload/upload-html/1713429961/2024041103.png)

---

## 🔗 相关文档

- [[WiFi联网]] - WiFi连接配置
- [[发布IMU数据话题]] - IMU数据发布
