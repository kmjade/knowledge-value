---
title: OriginBot軟體環境搭建
tags: [智能小车, OriginBot, RDK, TROS, 環境配置]
created: 2026-05-29
aliases: [OriginBot Software Setup, OriginBot 环境搭建]
source: https://www.originbot.org
---

# OriginBot 軟體環境搭建 Software Environment Setup

> 組裝好硬體之後，讓軟體跑起來——從燒錄 RDK X3 到運行第一個 ROS2 節點。

## 環境總覽 Environment Overview

```
┌──────────────────────────────────────┐
│            應用層                     │
│  Nav2 導航 / SLAM / 物體檢測 / ...    │
├──────────────────────────────────────┤
│          TogetheROS.Bot              │
│  hobot_sensor / hobot_dnn / hobot_cv │
├──────────────────────────────────────┤
│             ROS2 Humble              │
│  (rclcpp / rclpy / rmw)              │
├──────────────────────────────────────┤
│           Ubuntu 22.04               │
│           RDK X3 (ARM64)             │
└──────────────────────────────────────┘
```

## Step 1: 燒錄 RDK X3 系統鏡像

### 下載鏡像

從 D-Robotics 官方下載最新 Ubuntu 22.04 鏡像：

```bash
# 下載鏡像（選擇 RDK X3 對應版本）
# 官方下載頁：https://developer.d-robotics.cc/resource
```

### 燒錄到 SD 卡

**Windows（使用 balenaEtcher）：**
1. 下載 balenaEtcher: https://www.balena.io/etcher/
2. 選擇鏡像文件 → 選擇 SD 卡 → Flash

**Linux/macOS（使用 dd）：**
```bash
# 查看 SD 卡設備
lsblk

# 燒錄（替換 /dev/sdX 為實際設備）
sudo dd if=rdk_x3_ubuntu_22.04.img of=/dev/sdX bs=4M status=progress
sync
```

### 首次開機

```
1. 將 SD 卡插入 RDK X3
2. 連接 HDMI 顯示器（可選）
3. 連接鍵盤或通過 USB-UART 串口
4. 接通電源

默認登錄：
  用戶名: root
  密碼: root
```

## Step 2: 網路配置

### WiFi 連接

```bash
# 掃描可用 WiFi
nmcli device wifi list

# 連接 WiFi
nmcli device wifi connect "你的WiFi名稱" password "你的密碼"

# 查看 IP 地址
ip addr show wlan0
```

### 有線網路

```bash
# DHCP 自動獲取 IP（預設）
# 查看 IP
ip addr show eth0
```

### 固定 IP（可選）

```bash
# 編輯網路配置
sudo nano /etc/netplan/01-netcfg.yaml

# 內容：
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 114.114.114.114]

# 應用
sudo netplan apply
```

## Step 3: SSH 遠程連接

```bash
# 從 PC 連接 RDK X3
ssh root@<RDK_IP>

# 首次連接需確認指紋
# 輸入密碼: root
```

> 💡 推薦使用 VS Code Remote-SSH 插件進行開發——直接在 RDK X3 上編輯程式碼。

## Step 4: 系統更新

```bash
# 更新軟體源
sudo apt update

# 升級系統
sudo apt upgrade -y

# 確認系統版本
cat /etc/version
rdkos_info    # 2.1.0 以上版本

# 確認 ROS2 環境
source /opt/tros/humble/setup.bash
ros2 --version
```

## Step 5: 安裝 TogetheROS.Bot

TROS 已預裝於 RDK OS 鏡像。確認安裝：

```bash
# 檢查 TROS 安裝
ls /opt/tros/

# 應包含：
#  humble/        — ROS2 Humble 核心
#  setup.bash     — 環境配置 (Foxy)
#  share/         — 共享包

# 配置環境變數（建議加入 ~/.bashrc）
echo "source /opt/tros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## Step 6: 安裝 OriginBot 專用包

```bash
# 創建工作空間
mkdir -p ~/originbot_ws/src
cd ~/originbot_ws

# 克隆 OriginBot 源碼
cd src
git clone https://github.com/wunuo1/originbot.git

# 安裝依賴
cd ~/originbot_ws
rosdep install --from-paths src --ignore-src -r -y

# 編譯
colcon build --symlink-install

# 配置環境
echo "source ~/originbot_ws/install/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## Step 7: 驗證環境

### 檢查設備

```bash
# 檢查 USB 設備（雷達、相機）
lsusb

# 檢查 I2C 設備（IMU）
i2cdetect -y -r 1

# 檢查 GPIO
ls /sys/class/gpio/

# 檢查攝像頭
ls /dev/video*
```

### 運行第一個 ROS2 節點

```bash
# 終端 1：運行 talker
source /opt/tros/humble/setup.bash
ros2 run demo_nodes_cpp talker

# 終端 2：運行 listener
source /opt/tros/humble/setup.bash
ros2 run demo_nodes_cpp listener

# 看到 "Hello World" 訊息 → 環境正常 ✅
```

## 常用工具安裝

```bash
# ROS2 開發工具
sudo apt install -y \
    ros-humble-rqt \
    ros-humble-rviz2 \
    ros-humble-teleop-twist-keyboard \
    ros-humble-slam-toolbox \
    ros-humble-navigation2 \
    ros-humble-nav2-bringup

# 系統工具
sudo apt install -y \
    htop \
    vim \
    git \
    python3-pip \
    python3-colcon-common-extensions
```

## 開機自啟動（可選）

如需 RDK X3 開機自動啟動機器人節點：

```bash
# 創建 systemd 服務
sudo nano /etc/systemd/system/originbot.service

# 內容：
[Unit]
Description=OriginBot ROS2 Launch
After=network.target

[Service]
Type=simple
User=root
ExecStart=/bin/bash -c 'source /opt/tros/humble/setup.bash && source ~/originbot_ws/install/setup.bash && ros2 launch originbot_bringup originbot.launch.py'
Restart=on-failure

[Install]
WantedBy=multi-user.target

# 啟用
sudo systemctl enable originbot.service
sudo systemctl start originbot.service
```

## 環境變數速查

```bash
# 每次新終端需要載入：
source /opt/tros/humble/setup.bash       # TROS (ROS2 Humble)
source ~/originbot_ws/install/setup.bash  # OriginBot 工作空間

# 跨設備通信（RDK ↔ PC）
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
export ROS_DOMAIN_ID=0  # 確保 RDK 和 PC 在同一 Domain
```

## 相關資源

- [[OriginBot-硬體規格與組裝|硬體規格與組裝]]
- [[旭日X3派快速开始教程|旭日X3派快速開始]]
- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[ROS2-基礎概念與安裝|ROS2 基礎概念與安裝]]
