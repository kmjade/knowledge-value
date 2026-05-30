---
title: RDK-數據採集與感測器
tags: [RDK, 感測器, 攝像頭, IMU, 雷達, 旭日X3派]
created: 2026-05-29
aliases: [Sensor Data Collection, 传感器数据采集]
source: https://d-robotics.github.io/rdk_doc/Robot_development/quick_demo/demo_sensor
---

# RDK 數據採集與感測器 Sensor Data Collection

> USB 攝像頭、MIPI 攝像頭、雷射雷達——RDK 上所有視覺感測器的接入與數據採集方法。

## USB 圖像採集 USB Camera

### 功能

`hobot_usb_cam` 節點將 USB 攝像頭封裝為 ROS2 標準圖像消息，支援 MJPEG / YUYV 格式。

- 代碼倉庫：https://github.com/D-Robotics/hobot_usb_cam.git
- 支持平台：RDK X3/X5/Ultra/S100

### 使用方式

```bash
# 確認攝像頭設備
ls /dev/video*

# 啟動 USB 攝像頭 (MJPEG 模式)
source /opt/tros/setup.bash
ros2 launch hobot_usb_cam hobot_usb_cam.launch.py \
    usb_video_device:=/dev/video8

# YUYV 轉 RGB 模式
ros2 launch hobot_usb_cam hobot_usb_cam.launch.py \
    usb_video_device:=/dev/video8 \
    usb_pixel_format:=yuyv2rgb \
    usb_image_width:=640 \
    usb_image_height:=480
```

### Web 端查看即時畫面

```bash
source /opt/tros/setup.bash
ros2 launch websocket websocket.launch.py \
    websocket_image_topic:=/image \
    websocket_only_show_image:=true
```

PC 瀏覽器打開 `http://RDK_IP:8000` 即可查看。

## MIPI 攝像頭 MIPI Camera

RDK 板載 MIPI CSI 接口，支援 D-Robotics 官方攝像頭模組（如 F37、IMX219 等）。

```bash
source /opt/tros/setup.bash

# 啟動 MIPI 攝像頭
ros2 launch mipi_cam mipi_cam.launch.py

# 自定義參數
ros2 launch mipi_cam mipi_cam.launch.py \
    mipi_out_format:=bgr8 \
    mipi_image_width:=960 \
    mipi_image_height:=544 \
    mipi_io_method:=mmap
```

## 感測器快速檢查 Quick Sensor Check

### 雙目攝像頭 Stereo Camera (I2C)

```bash
# 檢查 i2c bus 4 和 bus 6 上的設備
i2cdetect -y -r 4
i2cdetect -y -r 6
# 預期看到 0x32, 0x50, 0x58 (bus 4) 和 0x30, 0x50, 0x58 (bus 6)
```

### 雷射雷達 LiDAR

```bash
# 確保雷達 IP 與開發板同網段
ping <雷達IP>

# 檢查 CAN 通訊
ip link set can1 up type can bitrate 500000
ip link show can1
candump can1
```

### IMU 慣性感測器

```bash
# 檢查 I2C 設備
i2cdetect -y -r 5
# 預期看到 0x19 和 0x69

# 讀取原始數據（數據隨姿態變化）
cat /sys/devices/virtual/input/input2/acc_bal
cat /sys/devices/virtual/input/input2/gry_bal
```

### ToF 攝像頭

```bash
# 檢查 USB 設備
lsusb
# 預期看到光鑒 ToF 設備
```

## 支援的感測器格式 Supported Formats

### USB Camera

| 格式 | 解析度 | 幀率 |
|------|--------|------|
| Motion-JPEG | 640×480 | 30 fps |
| Motion-JPEG | 1920×1080 | 30 fps |
| Motion-JPEG | 1280×720 | 30 fps |
| YUYV 4:2:2 | 640×480 | 30 fps |
| YUYV 4:2:2 | 1920×1080 | 5 fps |

### MIPI Camera

| 模組 | 解析度 | 格式 | 幀率 |
|------|--------|------|------|
| F37 | 1920×1080 | BGR8/NV12 | 30 fps |
| IMX219 | 3280×2464 | Bayer | 15 fps |
| GC4663 | 2560×1440 | BGR8 | 30 fps |
| SC132GS (雙目) | 1080×1280 | RAW | 30 fps |

## Web 可視化架構

```
┌──────────┐   ROS2 Topic    ┌────────────┐   WebSocket   ┌──────────┐
│  Camera   │ ─────────────→ │  websocket  │ ───────────→ │  Browser │
│  Node     │   /image       │   Node      │   ws://IP:8000│  PC      │
└──────────┘                 └────────────┘               └──────────┘
```

## 相關資源

- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[RDK-SLAM建圖|SLAM 建圖]]（使用雷射雷達數據）
- [[RDK-深度學習巡線小車|巡線小車]]（使用 MIPI 攝像頭）
- [[感測器模組|05 感測器模組]]（Arduino 感測器對比）
