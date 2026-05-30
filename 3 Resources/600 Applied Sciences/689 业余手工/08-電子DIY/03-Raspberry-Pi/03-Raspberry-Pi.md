---
title: Raspberry Pi 入門
ddc: 689
udc: 004.382.7
clc: TP368.1
lcc: QA76.8.R15
tags: [電子, RaspberryPi, Linux, 入門, ddc/689, udc/004.382.7, clc/TP368.1, lcc/QA76.8.R15]
created: 2026-05-29
aliases: [樹莓派, Raspberry Pi Basics, 樹莓派入門]
---

# 03 Raspberry Pi 入門 Raspberry Pi Basics

> Raspberry Pi 是一台巴掌大的 Linux 電腦——插上 SD 卡就能開機，寫 Python 就能控制硬體。

## 什麼是 Raspberry Pi？

Raspberry Pi 是由 Raspberry Pi Foundation 推出的**單板電腦 (SBC, Single-Board Computer)**。它執行完整的 Linux 作業系統，接上螢幕、鍵盤、滑鼠就是一台桌上電腦。

| 特性 | 說明 |
|------|------|
| 架構 | ARM64 / ARMv8 |
| OS | Raspberry Pi OS (Debian)，也支援 Ubuntu、Arch |
| 程式語言 | Python、C/C++、Node.js、Go…… |
| GPIO | 40-pin 通用輸入輸出 |
| 價格 | ¥100–500（依型號） |

## Pi vs Arduino 對比

| | Raspberry Pi | Arduino |
|------|-------------|---------|
| 本質 | 迷你電腦（有 OS） | 微控制器（裸機） |
| CPU | 1.5–2.4GHz 多核 | 16–240MHz 單核 |
| RAM | 1–16GB | 2–512KB |
| 儲存 | microSD / SSD | Flash (KB 級) |
| OS | Linux | 無 OS（僅 runtime） |
| 多工 | ✅ 真多工 | ❌ 單一任務 |
| GPIO | 有，但反應慢 (~ms) | 即時 (~μs) |
| 功耗 | ~2–15W | ~0.1–0.5W |
| 適合 | 需要網路、處理、OS 的專案 | 即時控制、低功耗、感測器 |

> 💡 **選 Pi 還是 Arduino？** 需要開瀏覽器、跑 Python、做伺服器 → **Pi**。只是讀感測器、控制 LED/馬達 → **Arduino**。很多高手兩者搭配使用。

## 型號比較

| 型號 | SoC | RAM | 價格 | 適合 |
|------|-----|-----|------|------|
| **Pi 5** | BCM2712 (2.4GHz 四核) | 4–16GB | ¥300–500 | 桌面、伺服器、邊緣運算 |
| **Pi 4** | BCM2711 (1.8GHz 四核) | 1–8GB | ¥200–400 | 穩定的萬用選擇 |
| **Pi 3** | BCM2837 (1.2GHz 四核) | 1GB | ¥100–200 | 入門、舊專案 |
| **Pi Zero 2 W** | BCM2837 (1GHz 四核) | 512MB | ¥50–80 | 超小、嵌入、隨身 |
| **Pi Pico** | RP2040 (133MHz 雙核) | 264KB | ¥10–20 | 像 Arduino 的微控制器 |

## 入手準備

### 必備清單

| 物品 | 說明 | 價格 |
|------|------|------|
| Raspberry Pi 5 (4GB) | 目前最佳選擇 | ¥300–350 |
| microSD 卡 32GB+ | Class 10 / A2 為佳 | ¥30–50 |
| 5V/3A USB-C 電源 | 原廠或可靠品牌 | ¥30–50 |
| 散熱片 + 風扇 | Pi 5 發熱較高 | ¥20–40 |
| HDMI 線（可選） | 首次設定需要螢幕 | ¥15–30 |

### 首次設定（Headless 模式——無螢幕）

```
1. 下載 Raspberry Pi Imager → 選擇 OS → 選 SD 卡
2. 點齒輪圖示（進階設定）：
   ✓ 啟用 SSH (密碼或金鑰)
   ✓ 設定 Wi-Fi (SSID + 密碼)
   ✓ 設定主機名 (如 raspberrypi.local)
   ✓ 設定帳號 (如 pi / 自訂密碼)
3. 寫入 SD 卡
4. 插卡 → 通電 → 等 1 分鐘
5. 從電腦 SSH 連線：
   ssh pi@raspberrypi.local
```

```bash
# SSH 連線成功後的第一件事
sudo apt update && sudo apt upgrade -y   # 更新系統
sudo raspi-config                         # 設定工具（開啟 I2C/SPI/UART 等介面）
```

## GPIO 基礎

### 引腳圖（40-pin）

```
     3.3V (1) (2) 5V
  GPIO2 (3) (4) 5V
  GPIO3 (5) (6) GND
  GPIO4 (7) (8) GPIO14
     GND (9) (10) GPIO15
 GPIO17 (11) (12) GPIO18
 GPIO27 (13) (14) GND
 GPIO22 (15) (16) GPIO23
     3.3V (17) (18) GPIO24
  GPIO10 (19) (20) GND
   GPIO9 (21) (22) GPIO25
  GPIO11 (23) (24) GPIO8
     GND (25) (26) GPIO7
   GPIO0 (27) (28) GPIO1
   GPIO5 (29) (30) GND
   GPIO6 (31) (32) GPIO12
  GPIO13 (33) (34) GND
  GPIO19 (35) (36) GPIO16
  GPIO26 (37) (38) GPIO20
     GND (39) (40) GPIO21
```

### Python 控制 GPIO

```python
# 安裝套件（通常內建）
# pip install gpiozero    # 推薦（新專案）
# pip install RPi.GPIO    # 傳統（舊專案）

# --- 閃爍 LED (gpiozero) ---
from gpiozero import LED
from time import sleep

led = LED(17)          # GPIO17 (pin 11)
while True:
    led.on()
    sleep(1)
    led.off()
    sleep(1)
```

```python
# --- 讀取按鈕 (gpiozero) ---
from gpiozero import Button
from signal import pause

button = Button(2)     # GPIO2 (pin 3)
button.when_pressed = lambda: print("Button pressed!")
button.when_released = lambda: print("Button released!")
pause()
```

## 第一個專案

### 1. LED 閃爍（5 分鐘）

與 Arduino 的 Blink 對應——連接 LED 到 GPIO17 (pin 11) + 220Ω 電阻 → GND，執行上面程式。

### 2. Web 伺服器（10 分鐘）

```bash
# 用 Flask 建立一個控制 LED 的網頁
pip install flask gpiozero

cat > app.py << 'EOF'
from flask import Flask, render_template_string
from gpiozero import LED

app = Flask(__name__)
led = LED(17)

HTML = '''
<h1>LED Control</h1>
<a href="/on">ON</a> | <a href="/off">OFF</a>
<p>Status: {{ "ON" if led.value else "OFF" }}</p>
'''

@app.route("/")
def index():
    return render_template_string(HTML, led=led)

@app.route("/on")
def turn_on():
    led.on()
    return index()

@app.route("/off")
def turn_off():
    led.off()
    return index()

app.run(host="0.0.0.0", port=80)
EOF

sudo python app.py
# 在瀏覽器打開 http://raspberrypi.local
```

### 3. Pi-Hole 廣告封鎖（30 分鐘）

```bash
curl -sSL https://install.pi-hole.net | bash
# 照提示設定 → 把路由器的 DNS 指向 Pi 的 IP
# 從此全家無廣告（可再搭配 unbound 做 DNS 伺服器）
```

## 常用場景

| 場景 | 適合型號 | 說明 |
|------|---------|------|
| **RetroPie 懷舊遊戲機** | Pi 4/5 | 模擬 FC/SFC/PS 等老主機 |
| **Home Assistant 智慧家庭** | Pi 4/5 | 開源智慧家庭中樞 |
| **Pi-Hole 廣告封鎖** | Pi 3/4/5 | 全網 DNS 廣告過濾 |
| **NAS 網路儲存** | Pi 4/5 (USB 3.0) | 用 OpenMediaVault |
| **OctoPrint 3D 列印** | Pi 3/4 | 遠端控制 3D 列印機 |
| **監視器 (MotionEye)** | Pi 3/4 | USB 攝影機監控 |
| **低功耗伺服器** | Pi Zero 2 W | 隨身 VPN / Web 伺服器 |

## 常見問題

### 無法 SSH 連線 (`connection refused`)
- 檢查 SD 卡有沒有 `ssh` 檔案（無副檔名，放 boot 分割區）
- 確認 Pi 有連上 Wi-Fi（檢查路由器管理頁面）
- 用 `arp -a` 或 `ping raspberrypi.local` 測試是否在網路上

### Pi 過熱降頻
- Pi 5 在滿載下溫度會超過 85°C → 自動降頻保護
- 解決方案：加裝散熱片 + 風扇，或降低 CPU 頻率
- 用 `vcgencmd measure_temp` 監控溫度

### SD 卡損壞頻繁
- 高品質 SD 卡 (Samsung EVO / SanDisk Extreme) 壽命長很多
- 減少寫入日誌：`sudo apt install log2ram`
- 或用 SSD 開機（Pi 4/5 支援 USB 3.0 SSD）

## 相關資源

- [[01-Arduino入門|🔵 Arduino 入門]] — 對比學習效果更好
- [[02-ESP32與物聯網|📡 ESP32 入門]] — 低功耗 IoT 替代方案
- [[智能小车/智能小车|🚗 智能小車專案]] — 用 Raspberry Pi 做小車
- [[電子DIY資源收集|📦 零件購買指南]]
- [[電子DIY常見問題|❓ 更多 FAQ]]

> 💡 Raspberry Pi 最強的地方不是硬體規格，而是**生態**——數百萬使用者、無數開源專案、從遊戲機到伺服器，什麼都有人做過。
