---
title: Networking - 知識庫
aliases:
  - 計算機網路
  - Network Knowledge
  - 網絡技術知識庫
  - 計算機網絡
  - 網絡技術知識庫
para: resource
tags:
  - #para/resource/tech
  - #topic/networking
  - #system/index
  - #type/guide
  - #zettel/type/permanent
  - #difficulty/beginner
  - #learning/mastered
created: 2026-01-21
updated: 2026-02-15
---

# Networking 網絡技術知識庫

## 📚 目錄結構

### 🗺️ [[MOC-學習路徑]] - 推薦學習順序

### 📖 [[01-基礎知識]] - 理論基礎
- [[OSI七層模型]]
- [[TCP-IP協議棧]]
- [[網路拓撲結構]]
- [[IP地址與子網劃分]]

### 🔌 [[02-網路設備]] - 硬體設備
- [[交換機]] - Switch
- [[路由器]] - Router
- [[防火牆]] - Firewall
- [[無線AP]] - Wireless Access Point

### 📡 [[03-核心協議]] - 協議詳解
- [[應用層協議]] (HTTP, HTTPS, FTP, SMTP, DNS)
- [[傳輸層協議]] (TCP, UDP)
- [[網路層協議]] (IP, ICMP, ARP)
- [[數據鏈路層協議]] (Ethernet, MAC, VLAN)

### 🌐 [[04-網路架構]] - 網路設計
- [[區域網(LAN)]]
- [[廣域網(WAN)]]
- [[無線網路(Wi-Fi)]]
- [[雲端計算網路]]
- [[SDN軟體定義網路]]

### 🛡️ [[05-網路安全]] - 安全防護
- [[網路安全基礎]]
- [[加密與認證]]
- [[防火牆技術]]
- [[VPN虛擬專用網路]]
- [[常見網路攻擊與防禦]]

### 🔧 [[06-實踐工具]] - 工具集
- [[網路診斷工具]] (ping, traceroute, netstat, nslookup)
- [[封包分析工具]] (Wireshark)
- [[網路監控工具]]

### 📊 [[07-管理運維]] - 管理與監控
- [[網路監控]]
- [[故障排查]]
- [[網路效能優化]]
- [[自動化運維]]

### 📝 [[08-筆記模板]] - 筆記模板
- [[協議學習模板]]
- [[問題排查模板]]

### 📅 [[09-學習筆記]] - 學習記錄
- 個人學習記錄和心得

---

## 🎯 快速開始

> [!tip] 推薦學習路徑
>
> 1. 從 [[MOC-學習路徑]] 開始，了解整體學習框架
> 2. 學習 [[01-基礎知識]] 建立理論框架
> 3. 認識 [[02-網路設備]] 了解硬體基礎
> 4. 深入 [[03-核心協議]] 理解各層協議機制
> 5. 實踐 [[06-實踐工具]] 掌握常用網路工具
> 6. 探索 [[04-網路架構]] 和 [[05-網路安全]] 進階主題

## 📊 知識庫概覽

```dataview
TABLE WITHOUT ID
  file.link as "模組",
  length(file.outlinks) as "子檔案數"
FROM "3 Resources/01-Tech/Networking"
WHERE para = "resource" AND file.name != "README.md"
GROUP BY file.folder
SORT file.link
```

## 🔗 相關資源

- [[01-Tech]] - 返回技術資源
- [[Programming]] - 網路程式設計
- [[AI-ML]] - 人工智慧與機器學習

---

> [!quote]
> "網路不是將計算機連接在一起，而是將人連接在一起。" - 雷蒙德·庫里

---

## 📅 更新日誌

- **2026-02-14**: 新增交換機資源，優化目錄結構
- **2026-01-21**: 初始建立知識庫
