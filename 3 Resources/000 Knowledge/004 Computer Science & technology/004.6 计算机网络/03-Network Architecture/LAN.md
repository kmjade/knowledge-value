---
title: LAN (Local Area Network)
tags: [networking, lan, architecture]
created: 2026-05-29
aliases: [局域網, 區域網路]
---

# LAN — Local Area Network 區域網路

> LAN connects computers within a limited area (office, building, campus). It's the foundation of enterprise networking.
> LAN 連接有限區域內的電腦（辦公室、建築物、校園）。它是企業網路的基礎。

## LAN 核心概念

| 概念 | 說明 |
|------|------|
| **Broadcast Domain** | 廣播封包可到達的範圍 |
| **Collision Domain** | 封包可能發生碰撞的範圍 |
| **MAC Address** | 48-bit 硬體位址，LAN 內定址 |
| **Switch** | 基於 MAC 位址轉發（L2），隔離 collision domain |
| **Router** | 基於 IP 轉發（L3），隔離 broadcast domain |

## Ethernet 乙太網路

| 標準 | 速度 | 介質 |
|------|------|------|
| 10BASE-T | 10 Mbps | Twisted pair |
| 100BASE-TX | 100 Mbps | Twisted pair |
| 1000BASE-T | 1 Gbps | Twisted pair |
| 10GBASE-T | 10 Gbps | Twisted pair |

## CSMA/CD

Carrier Sense Multiple Access with Collision Detection：
1. 監聽線路 (Carrier Sense)
2. 如果空閒，發送 (Multiple Access)
3. 如果碰撞，停止並等待隨機時間後重試 (Collision Detection)

> ⚠️ 現代交換式 Ethernet 中，全雙工模式下 CSMA/CD 已基本不需要。

> 💡 Switch 讓 LAN 從「共享媒體」進化為「點對點」——每個埠獨立頻寬。
