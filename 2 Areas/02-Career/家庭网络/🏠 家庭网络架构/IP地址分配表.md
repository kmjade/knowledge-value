---
title: IP地址分配表
aliases:
  - IP Address Allocation Table
  - IP Allocation
tags:
  - network
  - ip-allocation
  - inventory
created: 2026-01-15
para: areas
review-frequency: monthly
importance: 4
---

# 📋 IP 地址分配表
# IP Address Allocation Table

> [!info] 说明 / Information
# 文檔
> This document tracks all IP address allocations in the network.

---

## 📊 总览仪表板 / Overview Dashboard

# 專案
|-------------|--------------|-------------------|
| 总VLAN数 / Total VLANs | 7 | 1, 10, 20, 30, 40, 50, 99 |
| 总IP地址池 / Total IP Pools | 7 | 各VLAN独立子网 |
# 新增
| DHCP池 / DHCP Pool | ~500 | 动态分配 |
| 保留IP / Reserved | ~100 | 预留使用 |

---

# 網路

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.1.1 |
| 广播地址 / Broadcast | 192.168.1.255 |
| 可用范围 / Available Range | 192.168.1.1 - 192.168.1.254 |

### IP 分配状态 / IP Allocation Status

| IP 地址 / IP | 设备 / Device | MAC 地址 / MAC | 状态 / Status | 备注 / Notes |
|--------------|---------------|-----------------|----------------|--------------|
| 192.168.1.1 | 主路由器 / Main Router | - | ✅ 固定 | 网关 / Gateway |
| 192.168.1.2 | 待分配 / Unassigned | - | 🔶 保留 | - |
| 192.168.1.3 | 待分配 / Unassigned | - | 🔶 保留 | - |
| 192.168.1.4 | 待分配 / Unassigned | - | 🔶 保留 | - |
| 192.168.1.5 | 待分配 / Unassigned | - | 🔶 保留 | - |
| 192.168.1.6-192.168.1.99 | DHCP 池 / DHCP Pool | - | 🔄 动态 | 动态分配设备 |
| 192.168.1.100 | 待分配 / Unassigned | - | 🔶 可用 | 预留给PC1 |
| 192.168.1.101 | 待分配 / Unassigned | - | 🔶 可用 | 预留给PC2 |
| 192.168.1.102 | 待分配 / Unassigned | - | 🔶 可用 | 预留给主要设备 |
| 192.168.1.103 | 待分配 / Unassigned | - | 🔶 可用 | 预留给主要设备 |
| 192.168.1.104 | 待分配 / Unassigned | - | 🔶 可用 | 预留给主要设备 |
| 192.168.1.105 | 待分配 / Unassigned | - | 🔶 可用 | 预留给主要设备 |
| 192.168.1.106-192.168.1.199 | 保留池 / Reserved Pool | - | 🔶 保留 | 预留设备 |
# 系統

### 已注册设备 / Registered Devices

# 新增
> Add device information below when registering

```dataview
TABLE without id
    file.link as "设备 / Device",
    ip_address as "IP 地址 / IP",
    mac_address as "MAC 地址 / MAC",
    status as "状态 / Status",
    notes as "备注 / Notes"
FROM [[#IP地址分配表]] AND -[IP地址分配表]
WHERE status != "待分配" AND status != "Unassigned"
SORT ip_number ASC
```

---

# 網路

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.10.1 |
| 广播地址 / Broadcast | 192.168.10.255 |
| 可用范围 / Available Range | 192.168.10.1 - 192.168.10.254 |

# 分類

| IP 段 / IP Range | 设备类型 / Device Type | 数量 / Count | 分配数 / Allocated |
|------------------|-----------------------|--------------|-------------------|
| 192.168.10.10-29 | 智能插座 / Smart Plugs | 20 | 0 |
| 192.168.10.30-59 | 传感器 / Sensors | 30 | 0 |
| 192.168.10.60-79 | 摄像头 / Cameras | 20 | 0 |
| 192.168.10.80-99 | 智能灯具 / Smart Lights | 20 | 0 |
| 192.168.10.100-119 | 空调/电器 / AC/Appliances | 20 | 0 |
| 192.168.10.120-199 | 其他 IoT / Other IoT | 80 | 0 |

### IoT 设备登记 / IoT Device Registration

| IP 地址 / IP | 设备 / Device | MAC / MAC | 品牌 / Brand | 状态 / Status | 备注 / Notes |
|--------------|---------------|------------|--------------|----------------|--------------|
| 192.168.10.10 | 待分配 / Unassigned | - | - | 🔶 | 米家智能插座1 |
| 192.168.10.11 | 待分配 / Unassigned | - | - | 🔶 | 米家智能插座2 |
| 192.168.10.30 | 待分配 / Unassigned | - | - | 🔶 | 温湿度传感器 |
| 192.168.10.31 | 待分配 / Unassigned | - | - | 🔶 | 门窗传感器1 |
| 192.168.10.32 | 待分配 / Unassigned | - | - | 🔶 | 门窗传感器2 |
| 192.168.10.60 | 待分配 / Unassigned | - | - | 🔶 | 门口摄像头 |
| 192.168.10.61 | 待分配 / Unassigned | - | - | 🔶 | 客厅摄像头 |
| 192.168.10.80 | 待分配 / Unassigned | - | - | 🔶 | 客厅Yeelight |
| 192.168.10.81 | 待分配 / Unassigned | - | - | 🔶 | 卧室Yeelight |
| 192.168.10.100 | 待分配 / Unassigned | - | - | 🔶 | 客厅空调 |
| 192.168.10.101 | 待分配 / Unassigned | - | - | 🔶 | 卧室空调 |

---

## 🏷️ VLAN30 - 服务器区 / Server Zone (192.168.20.0/24)

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.20.1 |
| 广播地址 / Broadcast | 192.168.20.255 |
| 可用范围 / Available Range | 192.168.20.1 - 192.168.20.254 |

### 服务器设备分配 / Server Device Allocation

| IP 地址 / IP | 设备 / Device | MAC / MAC | 角色 / Role | 状态 / Status | 服务 / Services |
|--------------|---------------|------------|--------------|----------------|---------------|
| 192.168.20.1 | 网关 / Gateway | - | Router | ✅ 固定 | - |
| 192.168.20.2 | NAS | - | Storage | 🔶 可用 | SMB, WebDAV, Photo |
| 192.168.20.3 | 主服务器 / Main Server | - | App Server | 🔶 可用 | Web, API, DB |
# 開發
# 數據
| 192.168.20.6 | 监控服务器 / Monitor Server | - | Monitoring | 🔶 可用 | Grafana, Prometheus |
# 備份

### 容器/虚拟机分配 / Container/VM Allocation

| IP 地址 / IP | 容器 / Container | 用途 / Purpose | 状态 / Status | 端口 / Ports |
|--------------|------------------|----------------|----------------|--------------|
| 192.168.20.51 | Home Assistant | 智能家居中心 / Smart Home Hub | 🔶 | 8123 |
| 192.168.20.52 | Plex | 媒体服务器 / Media Server | 🔶 | 32400 |
| 192.168.20.53 | Jellyfin | 媒体服务器 / Media Server | 🔶 | 8096 |
| 192.168.20.54 | Nextcloud | 云存储 / Cloud Storage | 🔶 | 80, 443 |
| 192.168.20.55 | GitLab | 代码仓库 / Code Repository | 🔶 | 80, 443, 22 |
| 192.168.20.56 | Nginx Proxy | 反向代理 / Reverse Proxy | 🔶 | 80, 443 |
| 192.168.20.57 | Pi-hole | DNS 广告拦截 / Ad Blocker | 🔶 | 53, 80, 443 |
# 管理
# 數據

---

# 網路

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.30.1 |
| 广播地址 / Broadcast | 192.168.30.255 |
| 可用范围 / Available Range | 192.168.30.1 - 192.168.30.254 |

### IP 分配状态 / IP Allocation Status

# 連接
|--------------|---------------|-------------------------|----------------|
| 192.168.30.1 | 网关 / Gateway | - | ✅ 固定 |
| 192.168.30.2-192.168.30.150 | DHCP 池 / DHCP Pool | 动态 | 🔄 动态 |
| 192.168.30.151-192.168.30.254 | 保留池 / Reserved Pool | - | 🔶 保留 |

# 記錄

| 时间 / Time | MAC 地址 / MAC | 分配IP / Assigned IP | 设备类型 / Device Type |
|------------|----------------|---------------------|------------------------|
| - | - | - | - |

---

## 🏷️ VLAN50 - 媒体中心 / Media Center (192.168.40.0/24)

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.40.1 |
| 广播地址 / Broadcast | 192.168.40.255 |
| 可用范围 / Available Range | 192.168.40.1 - 192.168.40.254 |

### 媒体设备分配 / Media Device Allocation

| IP 地址 / IP | 设备 / Device | MAC / MAC | 品牌 / Brand | 状态 / Status | 备注 / Notes |
|--------------|---------------|------------|--------------|----------------|--------------|
| 192.168.40.1 | 网关 / Gateway | - | - | ✅ 固定 | - |
| 192.168.40.10 | 智能电视 / Smart TV | - | - | 🔶 | 客厅电视 |
| 192.168.40.11 | Chromecast / 投屏设备 | - | Google | 🔶 | 投屏接收器 |
| 192.168.40.12 | Apple TV | - | Apple | 🔶 | Apple生态 |
| 192.168.40.13 | NVIDIA Shield | - | NVIDIA | 🔶 | 游戏流媒体 |
| 192.168.40.14 | 回音壁 / Soundbar | - | - | 🔶 | 音响设备 |

---

## 🏷️ VLAN99 - DMZ 区域 / DMZ Zone (192.168.99.0/24)

# 資訊

# 專案
|-------------|-----------|
# 網路
| 子网掩码 / Subnet Mask | 255.255.255.0 |
| 网关 / Gateway | 192.168.99.1 |
| 广播地址 / Broadcast | 192.168.99.255 |
| 可用范围 / Available Range | 192.168.99.1 - 192.168.99.254 |

### DMZ 服务分配 / DMZ Service Allocation

| IP 地址 / IP | 服务 / Service | 端口 / Ports | 公开端口 / Public Port | 状态 / Status | SSL / HTTPS |
|--------------|---------------|--------------|----------------------|----------------|-------------|
| 192.168.99.1 | 网关 / Gateway | - | - | ✅ 固定 | - |
| 192.168.99.10 | Web Server | 80, 443 | 80, 443 | 🔶 | ✅ |
| 192.168.99.11 | VPN Server | 1194, 443 | 1194, 443 | 🔶 | ✅ |
| 192.168.99.12 | Game Server | 25565, 7777 | 25565, 7777 | 🔶 | ❌ |
| 192.168.99.13 | Mail Server | 25, 587, 993, 995 | - | 🔶 | ✅ |

---

## 📝 设备登记模板 / Device Registration Template

# 新增

使用以下模板登记新设备：
Use the following template to register new devices:

```yaml
---
设备名称 / Device Name: [填写 / Fill]
设备类型 / Device Type: [选择 / Select]
MAC 地址 / MAC Address: [填写 / Fill]
IP 地址 / IP Address: [填写 / Fill]
VLAN: [选择 / Select]
品牌 / Brand: [填写 / Fill]
购买日期 / Purchase Date: [填写 / Fill]
保修期 / Warranty: [填写 / Fill]
状态 / Status: [在线/离线 / Online/Offline]
备注 / Notes: [填写 / Fill]
---
```

### 设备类型选项 / Device Type Options

- 🖥️ 电脑 / PC
- 📱 手机 / Phone
- 📟 平板 / Tablet
# 列印
- 📷 摄像头 / Camera
- 💡 智能灯具 / Smart Light
- 🔌 智能插座 / Smart Plug
- 🌡️ 传感器 / Sensor
- ❄️ 空调 / AC
- 📺 电视 / TV
- 🖥️ 服务器 / Server
- 💾 存储 / NAS
- 🎮 游戏机 / Console

---

## 📊 使用统计 / Usage Statistics

### VLAN 使用情况 / VLAN Usage

| VLAN | 已分配 / Allocated | 可用 / Available | 使用率 / Usage |
|-------|-------------------|-----------------|----------------|
| VLAN1 (Mgmt) | 5 | 248 | ~2% |
| VLAN10 (Main) | 0 | 253 | 0% |
| VLAN20 (IoT) | 0 | 253 | 0% |
| VLAN30 (Server) | 0 | 253 | 0% |
| VLAN40 (Guest) | 0 | 253 | 0% |
| VLAN50 (Media) | 0 | 253 | 0% |
| VLAN99 (DMZ) | 0 | 253 | 0% |

### 类型分布 / Type Distribution

```dataview
TABLE without id type as "类型 / Type", count(rows) as "数量 / Count"
FROM [[#IP地址分配表]]
GROUP BY type
SORT count DESC
```

---

# 尋找

# 尋找

```dataview
LIST
FROM [[#IP地址分配表]]
WHERE ip_number = <search_ip>
```

# 尋找

```dataview
LIST
FROM [[#IP地址分配表]]
WHERE mac_address = "<search_mac>"
```

# 尋找

```dataview
TABLE file.link as "设备 / Device", ip_address as "IP", mac_address as "MAC"
FROM [[#IP地址分配表]]
WHERE status = "在线" OR status = "Online"
```

---

# 資源

- [私有IP地址范围](https://en.wikipedia.org/wiki/Private_network)
- [子网计算器](https://www.subnet-calculator.com/)

---

*使用简体中文、繁體中文、英文维护 / Maintained in Simplified Chinese, Traditional Chinese, English*
