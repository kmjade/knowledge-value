---
title: UGV JSON指令集完整手冊
tags: [UGV, JSON, ESP32, 機器人控制, Waveshare]
created: 2026-05-29
aliases: [UGV JSON Command Reference, UGV指令集]
source: https://www.waveshare.net/wiki/UGV01
---

# UGV JSON 指令集完整手冊 JSON Command Reference

> UGV01 / UGV02 通用 JSON 控制協議——一組 JSON 指令控制所有功能。

## 通訊方式 Communication Methods

| 方式 | 媒介 | 特點 |
|------|------|------|
| **Web 應用** | WiFi (AP/STA) | 瀏覽器訪問 `192.168.4.1` |
| **HTTP 請求** | WiFi | `http://IP/js?json={指令}` |
| **串口/USB** | UART / Type-C | 波特率 115200，雙向通信 |
| **ESP-NOW** | 2.4GHz | 免連接、低延遲、支援單播/組播/廣播 |

> ⚠️ 心跳機制：3 秒內無移動指令，機器人自動停止。上位機需定時重複發送移動指令。

---

## 1. 底盤移動 Chassis Movement

### 1.1 左右輪速度控制 — `CMD_SPEED_CTRL` (T=1)

```json
{"T":1,"L":0.5,"R":0.5}
```

| 參數 | 類型 | 範圍 | 說明 |
|------|------|------|------|
| T | int | 1 | 指令類型 |
| L | float | -1.0 ~ 1.0 | 左輪速度（負值=反轉） |
| R | float | -1.0 ~ 1.0 | 右輪速度（負值=反轉） |

### 1.2 PWM 直接控制 — `CMD_PWM_INPUT` (T=3)

```json
{"T":3,"L":512,"R":512}
```

| 參數 | 範圍 | 說明 |
|------|------|------|
| L | 0~1023 | 左側 PWM 佔空比 |
| R | 0~1023 | 右側 PWM 佔空比 |

### 1.3 ROS 控制 — `CMD_ROS_CTRL` (T=2)

```json
{"T":2,"X":0.5,"Z":0.3}
```

| 參數 | 範圍 | 說明 |
|------|------|------|
| X | -1.0~1.0 | 線速度 (前進/後退) |
| Z | -1.0~1.0 | 角速度 (旋轉) |

> 用於 ROS2 `/cmd_vel` Twist 消息轉換。

### 1.4 設置電機 PID (T=4)

```json
{"T":4,"p":2.5,"i":0.8,"d":0.3}
```

| 參數 | 說明 |
|------|------|
| p | 比例係數 (預設 ~2.0) |
| i | 積分係數 |
| d | 微分係數 |

---

## 2. OLED 螢幕設置 OLED Screen

### 2.1 OLED 控制 (T=110)

```json
{"T":110,"line":0,"text":"Hello"}
```

| 參數 | 說明 |
|------|------|
| line | 行號 (0–3) |
| text | 顯示文字 |

### 2.2 OLED 恢復 (T=111)

```json
{"T":111}
```

恢復 OLED 為預設顯示（WiFi狀態、MAC、電壓）。

---

## 3. 產品資訊獲取 Product Info

### 3.1 獲取 IMU 數據 (T=121)

```json
{"T":121}
```

返回九軸 IMU 數據（加速度、陀螺儀、磁力計）。

### 3.2 獲取底盤反饋 — `CMD_BASE_FEEDBACK` (T=200)

```json
{"T":200}
```

返回底盤狀態：電壓、電流、馬達速度等。

### 3.3 串口連續反饋開關 (T=201)

```json
{"T":201,"status":1}   // 開啟
{"T":201,"status":0}   // 關閉
```

開啟後底盤狀態會定時通過串口回傳。

### 3.4 串口回聲開關 (T=202)

```json
{"T":202,"status":1}   // 開啟回聲
{"T":202,"status":0}   // 關閉回聲
```

---

## 4. WiFi 配置 WiFi Config

### 4.1 設置 WiFi 模式 — `CMD_WIFI_APSTA` (T=404)

```json
{"T":404,"ap_ssid":"UGV","ap_password":"12345678","sta_ssid":"your_ssid","sta_password":"password"}
```

| 參數 | 說明 |
|------|------|
| ap_ssid | AP 模式熱點名稱 |
| ap_password | AP 密碼 (≥8位) |
| sta_ssid | 要連接的 WiFi 名稱 |
| sta_password | WiFi 密碼 |

> 連接成功後自動儲存配置，下次開機自動連接。

---

## 5. IO4/IO5 控制 GPIO Control

### IO4/IO5 輸出 (T=114)

```json
{"T":114,"IO4":255,"IO5":0}
```

| 參數 | 範圍 | 說明 |
|------|------|------|
| IO4 | 0–255 | PWM 輸出（可控制 LED 亮度） |
| IO5 | 0–255 | PWM 輸出 |

---

## 6. ESP-NOW 通信 ESP-NOW Comm

### 6.1 ESP-NOW 模式設置 (T=301)

```json
{"T":301,"mode":0}   // 關閉接收
{"T":301,"mode":3}   // 開啟接收（預設）
```

### 6.2 添加 Peer (T=303)

```json
{"T":303,"mac":"CC:DB:A7:5C:1C:40"}
```

### 6.3 刪除 Peer (T=304)

```json
{"T":304,"mac":"CC:DB:A7:5C:1C:40"}
```

### 6.4 發送 ESP-NOW 指令 (T=306)

```json
{"T":306,"mac":"CC:DB:A7:5C:1C:40","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{\"T\":114,\"IO4\":255}"}
```

| mac 值 | 模式 |
|--------|------|
| 具體 MAC 地址 | 單播 |
| `"FF:FF:FF:FF:FF:FF"` | 廣播 |
| 多個 MAC (不含廣播) | 組播 |

---

## 7. 外接模組擴展 Expansion Modules

### 7.1 設置外接模組類型 (T=108)

```json
{"T":108,"type":0}   // 無擴展
{"T":108,"type":1}   // RoArm-M2 機械臂
{"T":108,"type":2}   // Camera PT 雲台
```

### 7.2 雲台控制 (T=130)

```json
{"T":130,"pan":90,"tilt":45}
```

| 參數 | 範圍 | 說明 |
|------|------|------|
| pan | 0–180° | 水平旋轉 |
| tilt | 0–180° | 垂直傾斜 |

### 7.3 機械臂控制 (T=140)

```json
{"T":140,"id":1,"angle":90}
```

---

## 8. 文件管理 File Management

### 寫入 boot.mission (T=222)

```json
{"T":222,"name":"boot","step":"{\"T\":301,\"mode\":0}"}
```

開機自動執行的指令序列。

### 刪除文件 (T=203)

```json
{"T":203,"name":"boot.mission"}
```

---

## HTTP 請求 Python 範例 HTTP Example

```python
import requests

ip = "192.168.4.1"

# 前進 (半速)
requests.get(f"http://{ip}/js?json={{"T":1,"L":0.5,"R":0.5}}")

# 停止
requests.get(f"http://{ip}/js?json={{"T":1,"L":0,"R":0}}")

# 獲取底盤資訊
resp = requests.get(f"http://{ip}/js?json={{"T":200}}")
print(resp.text)

# 設置 WiFi
requests.get(f"http://{ip}/js?json={{"T":404,"ap_ssid":"UGV","ap_password":"12345678","sta_ssid":"MyWiFi","sta_password":"mypassword"}}")
```

## 串口 Python 範例 Serial Example

```python
import serial

ser = serial.Serial("COM3", baudrate=115200)
ser.setRTS(False)
ser.setDTR(False)

# 發送指令
ser.write(b'{"T":1,"L":0.5,"R":0.5}\n')

# 讀取反饋
line = ser.readline().decode('utf-8')
print(line)

ser.close()
```

## 指令速查表 Quick Reference

| T 值 | 指令名 | 功能 |
|------|--------|------|
| 1 | CMD_SPEED_CTRL | 左右輪速度控制 |
| 2 | CMD_ROS_CTRL | ROS Twist 控制 |
| 3 | CMD_PWM_INPUT | PWM 直接控制 |
| 4 | SET_PID | 設置電機 PID |
| 108 | SET_MODULE_TYPE | 設置擴展模組類型 |
| 110 | OLED_CTRL | OLED 顯示控制 |
| 111 | OLED_RECOVER | OLED 恢復預設 |
| 114 | IO4_IO5 | IO4/IO5 輸出 |
| 121 | GET_IMU | 獲取 IMU 數據 |
| 130 | CAMERA_PT | 雲台控制 |
| 140 | ROARM_CTRL | 機械臂控制 |
| 200 | CMD_BASE_FEEDBACK | 底盤資訊反饋 |
| 201 | SERIAL_FEEDBACK | 串口連續反饋開關 |
| 202 | SERIAL_ECHO | 串口回聲開關 |
| 203 | FILE_DELETE | 刪除文件 |
| 222 | FILE_WRITE | 寫入文件 |
| 301 | ESPNOW_MODE | ESP-NOW 模式 |
| 303 | ESPNOW_ADD_PEER | 添加 Peer |
| 304 | ESPNOW_DEL_PEER | 刪除 Peer |
| 306 | ESPNOW_SEND | 發送 ESP-NOW 指令 |
| 404 | CMD_WIFI_APSTA | WiFi AP/STA 配置 |

## 相關資源

- [[UGV01机器人|UGV01 履帶機器人]]
- [[UGV02机器人|UGV02 六輪機器人]]
- [[UGV01与UGV02对比|UGV01 vs UGV02 對比]]
