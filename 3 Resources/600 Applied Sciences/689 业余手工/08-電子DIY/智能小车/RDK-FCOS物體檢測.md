---
title: RDK-FCOS物體檢測
tags: [RDK, FCOS, 物體檢測, BPU, AI推論, 旭日X3派]
created: 2026-05-29
aliases: [FCOS, 物体检测, Object Detection]
source: https://d-robotics.github.io/rdk_doc/Robot_development/boxs/detection/fcos
---

# RDK FCOS 物體檢測 FCOS Object Detection

> 在 RDK X3 上以 75 FPS 運行 AI 物體檢測——80 類目標即時識別。

## 功能介紹

FCOS (Fully Convolutional One-Stage Object Detection) 使用圖片作為輸入，利用 BPU 進行算法推論，發布包含目標類別和檢測框的智能消息。

- 支持 **80 類**目標檢測（人、動物、水果、交通工具等）
- 代碼倉庫：https://github.com/D-Robotics/hobot_dnn
- 訓練數據集：COCO

## 算法性能 Algorithm Performance

| 模型 | 平台 | 輸入尺寸 | 推論幀率 (fps) |
|------|------|----------|---------------|
| **FCOS** | RDK X3 | 1×3×512×512 | **74.91** |
| **FCOS** | RDK X5 | 1×3×512×512 | **258.92** |

> RDK X5 上的 FCOS 推論速度是 X3 的 **3.5 倍**。

## 使用方式

### 1. MIPI 攝像頭 + 即時檢測 + Web 渲染

```bash
source /opt/tros/setup.bash          # Foxy
# 或 source /opt/tros/humble/setup.bash  # Humble

export CAM_TYPE=mipi

ros2 launch dnn_node_example dnn_node_example.launch.py \
    dnn_example_config_file:=config/fcosworkconfig.json \
    dnn_example_image_width:=480 \
    dnn_example_image_height:=272
```

### 2. USB 攝像頭 + 即時檢測 + Web 渲染

```bash
source /opt/tros/setup.bash
export CAM_TYPE=usb

ros2 launch dnn_node_example dnn_node_example.launch.py \
    dnn_example_config_file:=config/fcosworkconfig.json \
    dnn_example_image_width:=480 \
    dnn_example_image_height:=272
```

### 3. 本地圖片回灌（離線模式）

無需攝像頭，使用本地圖片推論：

```bash
source /opt/tros/setup.bash

ros2 launch dnn_node_example dnn_node_example_feedback.launch.py \
    dnn_example_config_file:=config/fcosworkconfig.json \
    dnn_example_image:=config/target.jpg
```

推理結果將渲染並儲存在本地。

## 結果分析

運行時終端輸出：

```
[example-3] [WARN] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [img_sub]: Sub img fps 31.16
[example-3] [WARN] [example]: Smart fps 31.56
```

- 發布 Topic：`hobot_dnn_detection`（檢測結果）
- 訂閱 Topic：`/hbmem_img`（輸入圖像）
- 推論幀率：~30 fps（取決於攝像頭幀率，非 BPU 上限）

PC 瀏覽器開啟 `http://RDK_IP:8000` 查看即時檢測效果。

## 檢測類別示例 (80類 COCO)

| 類別 | 類別 | 類別 |
|------|------|------|
| person | bicycle | car |
| motorcycle | airplane | bus |
| train | truck | boat |
| traffic light | fire hydrant | stop sign |
| dog | cat | bird |
| ... | ... | ... |

## 架構流程 Architecture

```
┌──────────┐   ROS2 Topic    ┌──────────────┐   ROS2 Topic     ┌──────────┐
│  Camera   │ ─────────────→ │  FCOS Node   │ ───────────────→ │  Web 渲染 │
│  (MIPI/   │   /hbmem_img   │  (BPU推論)    │  hobot_dnn_     │  (PC瀏覽) │
│   USB)    │                 │              │  detection      │           │
└──────────┘                 └──────────────┘                 └──────────┘
```

## 擴展：自定義模型部署

FCOS 使用 JSON 配置檔案指定模型路徑：

```json
{
  "dnn_config_file": "config/fcosworkconfig.json",
  "model_path": "/opt/tros/share/dnn_node_example/config/fcos.bin"
}
```

替換 `model_path` 即可部署自訓練模型。

## 相關資源

- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[RDK-數據採集與感測器|數據採集與感測器]]
- [[旭日X3派算法工具链指南|算法工具鏈指南]]（模型訓練→轉換→部署）
- [[旭日X3派Python开发指南|Python 開發指南]]
