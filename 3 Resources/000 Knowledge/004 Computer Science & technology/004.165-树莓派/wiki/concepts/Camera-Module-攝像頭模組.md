---
aliases: [Camera Module, Pi Camera] · created: 2026-05-30
type: concept · category: raspberry-pi · status: reviewed
---

# Camera Module 攝像頭模組

## 定義

樹莓派 Camera Module 是透過專用 MIPI CSI 接口連接的官方攝影機模組系列。從早期的 5MP OV5647 到最新的 12MP Sony IMX708（自動對焦 + HDR），Camera Module 已成為 Pi 多媒體與 AI 視覺應用的核心週邊。軟體棧從舊版 raspistill 進化為現代化的 **libcamera** 框架。

## 核心內容

### 模組演化

| 世代 | 模組 | 傳感器 | 解析度 | 關鍵特性 |
|:----:|------|--------|:------:|----------|
| 1st | Camera Module 1 | OV5647 | 5MP | 基礎成像 |
| 2nd | Camera Module 2 | IMX219 | 8MP | 更高解析度 |
| — | HQ Camera | IMX477 | 12.3MP | C/CS 鏡頭, 大像素 |
| 3rd | **Camera Module 3** | IMX708 | 12MP | 自動對焦, HDR, 4K@40fps |
| — | Global Shutter | IMX296 | 1.6MP | 零畸變, 高速 (>100fps) |

### libcamera 工具鏈

| 工具 | 用途 | 替代舊版 |
|------|------|----------|
| `rpicam-still` | 靜態拍照 | raspistill |
| `rpicam-vid` | 錄製影片 | raspivid |
| `rpicam-raw` | RAW 格式拍攝 | — |
| `libcamera-hello` | 相機測試預覽 | — |
| `libcamera-vid` | 底層 API 工具 | — |

### AI Kit 整合 (Hailo-8L)

| 參數 | 值 |
|------|:---:|
| NPU 算力 | 13 TOPS (INT8) |
| 介面 | M.2 (PCIe 2.0×1) |
| 支援模型 | YOLOv5/v8, ResNet, MobileNet |
| 功耗 | ~2.5W |

> Camera Module + AI Kit = 邊緣 AI 視覺方案。Pi 5 透過 libcamera 擷取畫面→ Hailo-8L 推理→ GPIO/網路輸出結果。

## 相關

[[wiki/concepts/HAT-擴展板|HAT]] · [[wiki/entities/Raspberry-Pi-5|Pi 5]] · [[wiki/concepts/GPIO-通用輸入輸出|GPIO]]

## Sources

[[wiki/sources/source-Pi-KB|Source: Pi-KB]] · [[../07-多媒體與攝像頭/07-多媒體與攝像頭|07 多媒體與攝像頭]]
