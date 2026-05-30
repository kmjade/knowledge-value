---
title: Waveshare 2-Axis Pan-Tilt Camera Module
tags: [富福, pan-tilt, 云台, camera, waveshare, esp32]
created: 2026-05-30
source: https://www.waveshare.net/wiki/2-Axis_Pan-Tilt_Camera_Module
aliases: [Pan-Tilt Camera, 二自由度摄像云台, Waveshare云台]
---

# Waveshare 2-Axis Pan-Tilt Camera Module

> 二自由度摄像云台 — ESP32 下位机 + Pi 上位机，TTL 总线舵机，30kg.cm 扭矩

## 规格

| 参数 | 值 |
|------|-----|
| 自由度 | 2-DOF：PAN ±180° (360°) / TILT -45°~90° (135°) |
| 舵机 | ST3215 总线舵机 ×2 |
| 堵转扭矩 | 30kg.cm |
| 角度传感器 | 12位 360° 磁编码器（闭环） |
| 下位机 | ESP32-D0WD-V3 |
| 上位机 | Raspberry Pi 4B/5 (GPIO UART) |
| 板载 IMU | QMI8658 (6轴) + AK09918C (3轴罗盘) |
| 板载驱动 | TB6612FNG |
| 供电 | 12V |
| 重量 | 441g |
| 摄像头 | Pi Camera / USB Camera |
| 转速 | 40rpm |

## 功能

- Web 浏览器控制界面（实时画面 + 云台操控）
- AI 检测：人脸 / 运动 / 颜色 / 手势
- 云台自稳（IMU）
- LED 补光灯
- 拍照 / 录像 / Photo Gallery
- 开源：ESP32 固件 + Pi 主程序 + STEP 模型 + 原理图

## 通信

- Pi 5 ↔ ESP32：GPIO UART (需禁用蓝牙)
- 默认 IP：AP 模式 192.168.50.5:5000，STA 模式 `{ip}:5000`
- JupyterLab：`{ip}:8888`
- SSH：`sudo raspi-config` → Interface Options → SSH
- 热点名：AccessPopup，密码：1234567890

## JSON 指令集

### 云台控制

| 指令 | T | 参数 | 说明 |
|------|:--:|------|------|
| CMD_GIMBAL_CTRL_SIMPLE | 133 | X(角度) Y(角度) SPD ACC | 绝对角度控制 |
| CMD_GIMBAL_CTRL_MOVE | 134 | X Y SX SY | 连续速度控制 |
| CMD_GIMBAL_CTRL_STOPE | 135 | — | 停止 |
| CMD_GIMBAL_STEADY | 136 | s(0/1) y(角度) | 自稳开关 |
| CMD_GIMBAL_USER_CTRL | 137 | X(-1/0/1) Y(-1/0/1) SPD | UI 摇杆 |
| CMD_LED_CTRL | 132 | IO5(0–255) | LED 亮度 |

### 示例

```json
{"T":133,"X":90,"Y":30,"SPD":50,"ACC":10}   // 看向右90°上30°
{"T":137,"X":0,"Y":1,"SPD":80}              // UI摇杆向上
{"T":136,"s":1,"y":0}                       // 开启自稳
{"T":132,"IO5":255}                         // LED最亮
```

### 命令行应用（Pi 端）

```bash
# 直接发送 JSON 指令给下位机
base -c '{"T":133,"X":0,"Y":0,"SPD":0,"ACC":0}'

# 颜色识别设置
cv -r [90,120,90] [120,255,200]   # 目标颜色区间
cv -s red                          # 选择颜色

# 追踪参数
track -c 0.023                     # 颜色追踪迭代比例
track -f 0.068                     # 人脸追踪迭代比例
track -a 0.4                       # 动作加速度比例
```

## 驱动板接口

| 接口 | 说明 |
|------|------|
| 40PIN GPIO | 直插 Pi 5/Zero/Jetson |
| ESP32-WROOM-32 | 主控模组，Arduino IDE 开发 |
| LiDAR 接口 | 板载雷达转接板 |
| I2C 扩展 | OLED / 传感器 |
| 总线舵机接口 | ST3215 × 多路 |
| 电机接口 PH2.0 | A/B 组编码电机 |
| INA219 | 电压电流监测 |
| CP2102 ×2 | USB 转串口 |

## 固件更新

使用 ESP32 下载工具 `flash_download_tool_3.9.5.exe`：
- Chip Type: ESP32
- WorkMode: Factory
- BAUD: 921600

## 注意事项

- Pi 需禁用蓝牙释放 GPIO UART
- 首次使用需烧录镜像（提供预配置镜像）
- 舵机已在组装时校准，一般不需要重新设置

## 来源

- 官方 Wiki：https://www.waveshare.net/wiki/2-Axis_Pan-Tilt_Camera_Module
- 开源程序：云台下位机 + 上位机（Pi）主程序（提取码：R5mw）
- STEP 模型 + 原理图：Wiki 页面下载
