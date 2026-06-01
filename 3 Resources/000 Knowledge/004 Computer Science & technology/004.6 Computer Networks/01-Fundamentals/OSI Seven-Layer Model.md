---
title: OSI Seven-Layer Model
tags: [networking, osi, fundamentals]
created: 2026-05-29
aliases: [OSI模型, OSI七層, Open Systems Interconnection]
---

# OSI Seven-Layer Model 開放系統互連七層模型

> OSI (Open Systems Interconnection) is a conceptual framework that standardizes network communication into seven layers. Each layer provides services to the layer above and receives services from the layer below.
> OSI 是 ISO 提出的網路通訊參考模型，將通訊過程分為七個層次，每層提供特定服務。

---

## 七層總覽 Seven Layers at a Glance

```
┌─────────────────────────────────────┐
│ 7. Application  應用層  │ HTTP, FTP, SMTP, DNS │
├─────────────────────────────────────┤
│ 6. Presentation 表示層  │ TLS/SSL, JPEG, ASCII │
├─────────────────────────────────────┤
│ 5. Session      會話層   │ NetBIOS, RPC        │
├─────────────────────────────────────┤
│ 4. Transport    傳輸層   │ TCP, UDP            │
├─────────────────────────────────────┤
│ 3. Network      網路層   │ IP, ICMP, OSPF      │
├─────────────────────────────────────┤
│ 2. Data Link    資料鏈路層 │ Ethernet, MAC, ARP │
├─────────────────────────────────────┤
│ 1. Physical     實體層   │ Cables, fiber, radio │
└─────────────────────────────────────┘
```

---

## 各層詳解 Layer Details

| # | Layer | PDU | Function | Protocols |
|---|-------|-----|----------|-----------|
| 7 | **Application** | Data | 提供網路服務給應用程式 | HTTP, FTP, SMTP, DNS, SSH |
| 6 | **Presentation** | Data | 資料格式轉換、加密、壓縮 | TLS/SSL, JPEG, ASCII, MPEG |
| 5 | **Session** | Data | 建立/管理/終止通訊會話 | NetBIOS, RPC, PPTP |
| 4 | **Transport** | Segment | 端到端可靠傳輸、流量控制 | TCP, UDP, SCTP |
| 3 | **Network** | Packet | 邏輯定址、路由選擇 | IP, ICMP, OSPF, BGP |
| 2 | **Data Link** | Frame | MAC 定址、錯誤檢測 | Ethernet, PPP, ARP, Switch |
| 1 | **Physical** | Bit | 物理介質、訊號傳輸 | Cables, Fiber, Radio, Hub |

---

## OSI vs TCP/IP

| 維度 | OSI | TCP/IP |
|------|-----|--------|
| **層數** | 7 | 4 |
| **設計理念** | 先有模型後有協議（理論驅動） | 先有協議後有模型（實踐驅動） |
| **表示層/會話層** | 獨立兩層 | 合併到應用層 |
| **實際使用** | 教學參考模型 | 網際網路的實際標準 |

```
OSI                    TCP/IP
─────────────────────  ─────────────────────
Application (7)  ┐
Presentation (6) ├──→  Application
Session (5)      ┘
Transport (4)    ────→  Transport
Network (3)      ────→  Internet
Data Link (2)    ┐
Physical (1)     ├──→  Link
```

---

## 封裝與解封裝 Encapsulation & Decapsulation

```
Sender:                              Receiver:
Data                                 Data
  + [L4 Header] → Segment              ← [L4 Header] −
  + [L3 Header] → Packet               ← [L3 Header] −
  + [L2 Header + Trailer] → Frame     ← [L2 Header + Trailer] −
  → Bits on wire
```

---

> 💡 **Key Insight**: OSI 七層是理解網路的「語法」，TCP/IP 是「實際語言」。學習時用 OSI 建立心智模型，實務中用 TCP/IP。
