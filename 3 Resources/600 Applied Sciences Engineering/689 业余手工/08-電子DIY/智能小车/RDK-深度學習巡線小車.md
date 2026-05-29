---
title: RDK深度學習巡線小車
tags: [RDK, 旭日X3派, 巡線, CNN, ResNet, 深度學習]
created: 2026-05-29
aliases: [Line Follower, 巡线小车, 深度学习巡线]
source: https://d-robotics.github.io/rdk_doc/Application_case/line_follower
---

# RDK 深度學習巡線小車 Deep Learning Line Follower

> 用 CNN 取代傳統光電感測器——讓小車自己學會"看線"。

## 功能介紹

巡線任務：機器人小車自主跟著引導線向前運行。傳統做法依賴光電感測器或邊緣檢測，對環境變化敏感。本方案使用 **卷積神經網路 (CNN)** 直接在 RDK 板端推論引導線座標，適應性強、無需反覆調參。

- 源碼倉庫：https://github.com/D-Robotics/line_follower
- 支持平台：RDK X3 / X3 Module (Ubuntu 20.04/22.04)

## 系統架構 System Architecture

```
┌─────────────┐    影像     ┌──────────┐    CNN推論    ┌──────────┐
│  MIPI Camera │ ────────→ │  RDK X3  │ ───────────→ │ 座標(x,y)│
│   (F37模組)  │            │  (BPU)   │              └────┬─────┘
└─────────────┘            └──────────┘                   │
                                                         │ UART
                                                    ┌────▼─────┐
                                                    │ MCU (底盤) │
                                                    │ 馬達控制   │
                                                    └──────────┘
```

## 開發流程 Development Pipeline

工程包含 5 個環節：

### 1. 數據採集與標註 Data Collection & Annotation

**RDK 端啟動 MIPI 攝像頭：**

```bash
# 配置環境 (Foxy)
source /opt/tros/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# 啟動 mipi_cam，輸出 BGR8 格式，960x544 解析度
ros2 launch mipi_cam mipi_cam.launch.py \
    mipi_out_format:=bgr8 \
    mipi_io_method:=mmap
```

**PC 端標註工具：**

```bash
source /opt/ros/foxy/setup.bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# 編譯標註程式
cd line_follower_model && colcon build --packages-select line_follower_model
source install/setup.bash

# 啟動標註工具
ros2 run line_follower_model annotation
```

> 用滑鼠右鍵點擊畫面中引導線中心處標記目標點，按 Enter 儲存。建議至少採集 100 張。

### 2. 模型選擇 Model Selection

選用 **ResNet18** 作為 Backbone：

| 指標 | ResNet18 | ResNet50 |
|------|----------|----------|
| RDK X3 推理幀率 | **232 FPS** | ~100 FPS |
| 輸入解析度 | 224×224 | 224×224 |
| 輸出 | 引導線 (x, y) 座標 | 同左 |

> 將 FC 層輸出改為 2（直接輸出引導線 x, y 座標值）。

### 3. 模型訓練 Training

```bash
# 安裝 PyTorch (CPU版)
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu

# 開始訓練
ros2 run line_follower_model training
```

### 4. 模型轉換 Model Conversion

使用地平線算法工具鏈將浮點模型轉為 RDK 可執行的定點模型：

```bash
# 獲取 OE 包
wget -c ftp://vrftp.horizon.ai/Open_Explorer_gcc_9.3.0/2.3.3/horizon_xj3_open_explorer_v2.3.3_20220727.tar.gz

# 獲取工具鏈 Docker
wget -c ftp://vrftp.horizon.ai/Open_Explorer_gcc_9.3.0/2.3.3/x3pi_toolchain/ai_toolchain_2.3.3.tar.gz
```

### 5. 端側部署 On-Device Deployment

在 RDK X3 上運行轉換後的模型，通過 UART 向 MCU 發送運動控制指令，實現閉環控制。

## 硬體方案 Hardware

- **底盤**：OriginBot 套件（兩主動輪 + 一從動輪，差速控制）
- **主控**：RDK X3（旭日X3派）
- **攝像頭**：MIPI F37 模組
- **通訊**：RDK ↔ MCU 通過 UART 串口

OriginBot 官網：https://www.originbot.org

## 關鍵要點 Key Takeaways

- CNN 巡線比傳統光電感測器更魯棒，不受光照/場地變化影響
- ResNet18 在 RDK X3 上可達 **232 FPS**，確保即時控制
- 數據採集 → 標註 → 訓練 → 轉換 → 部署 一站式流程
- 算法工具鏈 OE (Open Explorer) 負責浮點→定點模型轉換

## 相關資源

- [[旭日X3派快速开始教程|旭日X3派快速開始]]
- [[旭日X3派算法工具链指南|算法工具鏈指南]]
- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[RDK-SLAM建圖|SLAM 建圖]]
