---
title: RDK-TROS機器人開發
tags: [RDK, TROS, ROS2, 機器人作業系統, 旭日X3派]
created: 2026-05-29
aliases: [TogetheROS.Bot, tros.b, TROS]
source: https://d-robotics.github.io/rdk_doc/Robot_development/tros
---

# RDK TROS 機器人開發 TogetheROS.Bot

> 地瓜機器人 (D-Robotics) 的 ROS2 增強版——專為嵌入式 AI 機器人設計。

## TogetheROS.Bot 簡介

TogetheROS.Bot（簡稱 **tros.b**）是 D-Robotics 基於 ROS2 Foxy/Humble 的機器人作業系統，專為 RDK 系列開發板優化。

### 核心特性

| 模組 | 功能 | 關鍵詞 |
|------|------|--------|
| **hobot_sensor** | 適配機器人常用感測器 | MIPI/USB攝像頭、雷達、IMU |
| **hobot_dnn** | 簡化 BPU 模型推理與部署 | 算法推理、模型管理 |
| **hobot_codec** | 軟硬結合影片編解碼加速 | H.264/H.265、零拷貝 |
| **hobot_cv** | 軟硬結合 CV 算子加速 | Resize、Rotate、Crop |
| **hobot Render** | Web/HDMI 即時可視化 | 算法渲染調試 |
| **zero-copy** | 進程間零拷貝通信 | 低延遲、低CPU |
| **Boxs** | 算法倉庫 | FCOS、YOLO、Unet 等 |
| **Apps** | 應用示例 | SLAM、巡線、AMR |

## 支援平台

| 平台 | 系統 | ROS2 版本 |
|------|------|-----------|
| RDK X3 / X3 Module | Ubuntu 20.04 / 22.04 | Foxy / Humble |
| RDK X5 / X5 Module | Ubuntu 22.04 | Humble |
| RDK Ultra | Ubuntu 20.04 | Foxy |
| RDK S100 / S100P | Ubuntu 22.04 | Humble |
| X86 (模擬) | Ubuntu 20.04 | Foxy |

## 環境準備 Quick Setup

### RDK 端

```bash
# 確保系統為最新
sudo apt update && sudo apt upgrade

# 安裝 tros.b（已預裝於 RDK OS 鏡像）
# 配置環境變數
source /opt/tros/setup.bash        # Foxy
source /opt/tros/humble/setup.bash  # Humble

# 確認安裝
ros2 --version
```

### X86 PC 端 (可選，用於可視化)

```bash
# 安裝 ROS2 桌面版
# Foxy:
sudo apt install ros-foxy-desktop
# Humble:
sudo apt install ros-humble-desktop

source /opt/ros/foxy/setup.bash
```

## 關鍵概念 Key Concepts

### zero-copy 零拷貝通信

RDK 平台內建硬體加速的共享記憶體機制，進程間傳輸影像等大數據無需複製，大幅降低延遲與 CPU 開銷。

### BPU (Brain Processing Unit)

地平線自研的神經網路推理加速單元：
- RDK X3：**5 TOPS** (int8)
- RDK X5：**10 TOPS** (int8)
- RDK Ultra：**96 TOPS** (int8)

### hobot_dnn

將 BPU 推理封裝為 ROS2 Node，開發者只需配置模型路徑即可使用：

```bash
# FCOS 物體檢測示例
ros2 launch dnn_node_example dnn_node_example.launch.py \
    dnn_example_config_file:=config/fcosworkconfig.json \
    dnn_example_image_width:=480 \
    dnn_example_image_height:=272
```

## Boxs 算法倉庫 Algorithm Repository

內建算法模型（可直接下載使用）：

| 算法 | 任務 | X3 推理幀率 |
|------|------|------------|
| FCOS | 物體檢測 (80類) | 74.91 fps |
| YOLOv5s | 物體檢測 | ~30 fps |
| FasterRCNN | 物體檢測 | ~10 fps |
| Mobilenet | 圖像分類 | >200 fps |
| Unet | 語義分割 | ~20 fps |
| 人體檢測+跟蹤 | 行人檢測 | ~30 fps |
| 手勢識別 | 手部關鍵點 | ~30 fps |

## Apps 應用示例

| 應用 | 描述 |
|------|------|
| SLAM 建圖 | 雷射雷達 + SLAM-Toolbox |
| 巡線小車 | CNN 引導線檢測 + PID 控制 |
| AMR 自主導航 | 多感測器融合 + Nav2 |
| 物體檢測展示 | Web 即時渲染檢測框 |

## 常用命令速查 Quick Reference

```bash
# 環境配置
source /opt/tros/setup.bash                    # Foxy
source /opt/tros/humble/setup.bash             # Humble

# 跨設備通信 (RDK ↔ PC)
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# MIPI 攝像頭
ros2 launch mipi_cam mipi_cam.launch.py

# USB 攝像頭
ros2 launch hobot_usb_cam hobot_usb_cam.launch.py \
    usb_video_device:=/dev/video8

# Web 可視化 (PC 瀏覽器 http://RDK_IP:8000)
ros2 launch websocket websocket.launch.py \
    websocket_image_topic:=/image \
    websocket_only_show_image:=true

# 查看 Topic 列表
ros2 topic list

# 查看 Topic 內容
ros2 topic echo /topic_name
```

## 相關資源

- [[旭日X3派快速开始教程|旭日X3派快速開始]]
- [[RDK-深度學習巡線小車|深度學習巡線小車]]
- [[RDK-SLAM建圖|SLAM 建圖]]
- [[RDK-數據採集與感測器|感測器數據採集]]
