---
title: OSI七層模型
aliases:
  - Open Systems Interconnection
  - OSI模型
  - OSI七層
para: resource
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/basics
  - #topic/layers
  - #protocol/osi
  - #layer/application
  - #layer/presentation
  - #layer/session
  - #layer/transport
  - #layer/network
  - #layer/data-link
  - #layer/physical
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/beginner
  - #learning/mastered
created: 2026-01-21
updated: 2026-02-15
---

> [!summary] OSI模型概述
> OSI (Open Systems Interconnection) 七层模型是国际標準化组织(ISO)提出的網路通訊參考模型，将網路通訊過程分为七个层次，每层提供特定的服务。

---

## 📊 七层模型架構

```
┌─────────────────────────────────────────────────────────┐
│  7. 應用程式层 (Application Layer)                           │
│     HTTP, FTP, SMTP, DNS, Telnet                         │
├─────────────────────────────────────────────────────────┤
│  6. 表示层 (Presentation Layer)                          │
│     數據格式化、加密/解密、压缩                           │
├─────────────────────────────────────────────────────────┤
│  5. 会话层 (Session Layer)                               │
│     会话建立、維護、终止                                 │
├─────────────────────────────────────────────────────────┤
│  4. 傳輸层 (Transport Layer)                            │
│     TCP, UDP - 端到端通訊                                │
├─────────────────────────────────────────────────────────┤
│  3. 網路层 (Network Layer)                              │
│     IP, ICMP, ARP - 路徑選擇与寻址                       │
├─────────────────────────────────────────────────────────┤
│  2. 數據鏈路层 (Data Link Layer)                        │
│     Ethernet, MAC, VLAN - 帧傳輸                         │
├─────────────────────────────────────────────────────────┤
│  1. 物理层 (Physical Layer)                             │
│     光纤、双绞线、电信号傳輸                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 各层详解

### 7️⃣ 應用程式层 (Application Layer)

**功能**：为應用程式程式提供網路服务接口

**职责**：
- 提供使用者接口
- 處理應用程式级协议
- 使用者身份驗證

**常见协议**：

| 协议 | 全称 | 用途 |
|------|------|------|
| HTTP | HyperText Transfer Protocol | Web 瀏覽 |
| HTTPS | HTTP Secure | 安全 Web 瀏覽 |
| FTP | File Transfer Protocol | 檔案傳輸 |
| SMTP | Simple Mail Transfer Protocol | 電子郵件發送 |
| POP3 | Post Office Protocol v3 | 電子郵件接收 |
| DNS | Domain Name System | 網網域名稱稱解析 |
| SSH | Secure Shell | 远程登入 |
| Telnet | Telecommunication Network | 远程登入(不安全) |

---

### 6️⃣ 表示层 (Presentation Layer)

**功能**：處理數據的表示、格式化和编码

**职责**：
- 數據格式转换 (ASCII, EBCDIC, Unicode)
- 數據加密/解密
- 數據压缩/解压
- 语法转换

**常见协议/標準**：
- SSL/TLS - 安全傳輸层
- JPEG, GIF, PNG - 图像格式
- ASCII, Unicode - 字符编码
- MPEG, MP3 - 多媒体编码

---

### 5️⃣ 会话层 (Session Layer)

**功能**：建立、維護和終止會話連接。

**职责**：
- 会话的建立、維護和终止
- 会话同步
- 会话恢復和断点续传

**常见协议**：
- RPC (Remote Procedure Call)
- NetBIOS
- SMB (Server Message Block)

---

### 4️⃣ 傳輸层 (Transport Layer)

**功能**：提供端到端的數據傳輸服务

**职责**：
- 分段和重组
- 流量控制
- 错误控制
- 拥塞控制
- 端口寻址

**常见协议**：

| 协议 | 特點 | 适用場景 |
|------|------|----------|
| TCP | 面向連接、可靠傳輸 | Web瀏覽、電子郵件、檔案傳輸 |
| UDP | 無連接、不可靠、快速 | 視訊流、線上游戏、DNS |

详见：[[TCP協議深入]], [[UDP协议]]

---

### 3️⃣ 網路层 (Network Layer)

**功能**：负责數據包的路由選擇和寻址

**职责**：
- 逻辑寻址 (IP地址)
- 路徑選擇 (路由)
- 分片与重组
- 流量控制

**常见协议**：
- IP (Internet Protocol) - 网际协议
- ICMP (Internet Control Message Protocol) - 網路控制訊息
- ARP (Address Resolution Protocol) - 地址解析协议
- RARP (Reverse ARP) - 反向地址解析
- 路由协议：RIP, OSPF, BGP, EIGRP

详见：[[IP协议与路由]]

---

### 2️⃣ 數據鏈路层 (Data Link Layer)

**功能**：提供节点到节点的數據傳輸

**职责**：
- 物理寻址 (MAC地址)
- 帧同步
- 差错检测
- 流量控制
- 访问控制

**常见协议**：
- Ethernet (以太网)
- PPP (Point-to-Point Protocol)
- HDLC (High-Level Data Link Control)
- 帧中继 (Frame Relay)
- ATM (Asynchronous Transfer Mode)

详见：[[Ethernet]], [[MAC地址]], [[VLAN]]

---

### 1️⃣ 物理层 (Physical Layer)

**功能**：负责比特流在物理介质上的傳輸

**职责**：
- 物理連接建立、維護、释放
- 數據的物理傳輸
- 机械特性、电气特性、功能特性
- 比特同步

**常见技術**：
- 傳輸介质：
  - 双绞线 (Cat5e, Cat6, Cat7)
  - 光纤 (单模/多模)
  - 同轴电缆
  - 無线电波
- 接口標準：
  - RJ45 (以太网)
  - SC/ST (光纤)
  - USB, HDMI, VGA

---

## 🔄 數據封装与解封装

### 封装過程 (發送方)

```
應用程式數據
    ↓ 新增應用程式层头部
應用程式层 + 應用程式數據
    ↓ 新增表示层头部
表示层 + 應用程式层 + 應用程式數據
    ↓ 新增会话层头部
会话层 + 表示层 + 應用程式层 + 應用程式數據
    ↓ 新增傳輸层头部 (TCP/UDP)
傳輸层段 + 会话层 + 表示层 + 應用程式层 + 應用程式數據
    ↓ 新增網路层头部 (IP)
網路层數據包 + 傳輸层段 + ...
    ↓ 新增數據鏈路层头部 + 尾部 (MAC, FCS)
數據鏈路层帧 + 網路层數據包 + ...
    ↓ 转换为比特流
物理层比特流
```

### 解封装過程 (接收方)

過程相反，从物理层向上逐层處理。

---

## 🔗 OSI vs TCP/IP 模型對比

```
OSI 七层模型            TCP/IP 四层模型
┌───────────────┐      ┌───────────────┐
│ 應用程式层        │      │               │
│ 表示层        │      │   應用程式层      │
│ 会话层        │      │               │
├───────────────┤      ├───────────────┤
│ 傳輸层        │  ←→  │   傳輸层      │
├───────────────┤      ├───────────────┤
│ 網路层        │  ←→  │   网际层      │
├───────────────┤      │               │
│ 數據鏈路层    │      │   網路接口层  │
│ 物理层        │      │               │
└───────────────┘      └───────────────┘
```

| 特性 | OSI 模型 | TCP/IP 模型 |
|------|----------|-------------|
| 层次 | 7 层 | 4 层 |
| 理论/實踐 | 理论模型 | 实际使用 |
| 国际標準 | ISO 提出 | IETF 開發 |
| 實現复杂度 | 较高 | 较低 |

详见：[[TCP/IP协议棧]]

---

## 💡 學習要點

### 理解重点
1. **每一层的核心职责**
2. **常见的协议属于哪一层**
3. **數據如何层层封装**
4. **PDU (Protocol Data Unit) 的命名**：
   - 應用程式/表示/会话层：數據 (Data)
   - 傳輸层：段 (Segment)
   - 網路层：包/數據报 (Packet/Datagram)
   - 數據鏈路层：帧 (Frame)
   - 物理层：比特 (Bit)

### 记忆技巧
- **从下往上**：**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way
  - Physical, Data Link, Network, Transport, Session, Presentation, Application
- **从上往下**：**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

---

## 🎯 常见問題

### Q1: 为什么需要分层模型？
**A**:
- 模块化設計，降低复杂度
- 便于標準化
- 促进互操作性
- 便于學習和理解

### Q2: OSI 模型只是理论吗？
**A**: OSI 模型主要作为參考標準，实际網路主要使用 TCP/IP 模型，但 OSI 模型的分层思想仍被广泛采用。

### Q3: 同一台设备是否需要完整的七层？
**A**: 不一定。例如：
- 路由器只涉及網路层及以下
- 交换机只涉及數據鏈路层及以下
- 网关可能涉及多层

---

## 🛠️ 實踐建議

1. **抓包观察**：使用 Wireshark 抓取數據包，观察各层协议头
2. **绘制流程图**：画出數據在七层中的传递過程
3. **协议分類**：列出常见协议，判斷其所属层次
4. **故障定位**：根据 OSI 模型分层排查網路故障

---

## 🔗 相關連結

- 🔙 [[01-基礎知識|返回基礎知識]]
- 📖 [[TCP IP协议棧]]
- 🛠️ [[06-實踐工具]]
