---
title: VPN虛擬專用網絡
aliases:
  - Virtual Private Network
  - IPSec VPN
  - SSL VPN
  - WireGuard
  - Zero Trust
para: resource
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/security
  - #topic/security/vpn
  - #protocol/vpn
  - #protocol/ipsec
  - #layer/network
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/intermediate
  - #learning/mastered
created: 2026-02-15
updated: 2026-02-15
---

> [!summary] VPN虛擬專用網絡概述
> VPN (Virtual Private Network) 在公網上構建安全的專用網絡，實現遠程安全訪問和網絡連接。

---

## 📋 目錄

- [VPN基礎](#vpn基礎)
- [IPSec VPN](#ipsec-vpn)
- [SSL VPN](#ssl-vpn)
- [WireGuard](#wireguard)
- [Zero Trust](#zero-trust)

---

## 🔐 VPN基礎

### 定義

VPN 是通過公網建立安全的加密隧道，將私有網絡擴展到遠程位置。

### VPN類型

| 類型 | 使用場景 | 協議 |
|------|----------|--------|
| Site-to-Site VPN | 連接兩個網絡 | IPSec |
| Remote Access VPN | 移動用戶接入 | SSL VPN |
| SSL VPN | 通過瀏覽器訪問 | SSL/TLS |
| MPLS VPN | 運營商級VPN | MPLS |

### VPN特點

| 特點 | 說明 |
|------|------|
| 隧道技術 | 加密隧道傳輸 |
| 身份驗證 | 用戶身份驗證 |
| 數據加密 | 保護傳輸數據 |
| 隔離性 | 邏輯隔離於公網 |

---

## 🔒 IPSec VPN

### IPSec協議套件

```
IPSec (IP Security)
├─ AH (Authentication Header) - 僅認證
├─ ESP (Encapsulating Security Payload) - 加密和認證
└─ IKE (Internet Key Exchange) - 密鑰交換
```

### IPSec模式

| 模式 | 說明 | 用途 |
|------|------|------|
| 傳輸模式 | 加密整個IP包 | 端到端VPN |
| 隧道模式 | 加密數據包部分 | Site-to-Site VPN |

### IKE密鑰交換

**階段1 (Main Mode)**：6個消息交換，身份驗證
**階段2 (Quick Mode)**：3個消息交換，快速建立SA

**IKE版本**：
- **IKEv1**：傳統，已被淘汰
- **IKEv2**：現代，更安全，支持移動設備

### IPSec SA (Security Association)

```
SA組成：
1. SPI (Security Parameter Index)
2. 加密算法 (AES, 3DES)
3. 認證算法 (HMAC-SHA1, HMAC-SHA256)
4. 密鑰
5. 生命周期
```

---

## 🌐 SSL VPN

### SSL VPN工作方式

```
用戶瀏覽器
      ↓
  HTTPS連接到SSL VPN網關
      ↓
  身份驗證 (密碼/證書/多因素)
      ↓
  下載SSL VPN客戶端
      ↓
  建立VPN隧道
      ↓
  訪問內部資源
```

### SSL VPN特點

| 特點 | 說明 |
|------|------|
| 無需安裝客戶端 | 使用瀏覽器即可 |
| 支持多平台 | Windows, Linux, Mac, 移動端 |
| 基於標準協議 | HTTPS/TLS |
| 易於部署 | 集中管理用戶訪問 |

### SSL VPN安全

| 安全措施 | 說明 |
|----------|------|
| SSL/TLS加密 | 保護通信 |
| 客戶端安全檢查 | 檢查操作系統、瀏覽器 |
| 多因素認證 | 增強安全性 |
| 會話超時 | 自動斷開空閒會話 |

---

## 🛡️ WireGuard

### 定義

WireGuard是新一代VPN協議，設計目標是更簡單、更快速、更安全。

### WireGuard特點

| 特點 | 說明 |
|------|------|
| 代碼量小 | ~4,000行代碼 |
| 性能優化 | 內核級實現，性能高 |
| 現代加密 | 使用ChaCha20, Poly1305 |
| 支持跨平台 | Linux, Windows, Mac, Android, iOS |
| 隱身到隱身 | 可選擬裝成隨身IP |

### WireGuard配置示例

**伺服器配置**：
```ini
[Interface]
PrivateKey = <私鑰>
Address = 10.0.0.1/24
DNS = 8.8.8.8

[Peer]
PublicKey = <客戶端公鑰>
AllowedIPs = 10.0.0.2/32
```

**客戶端配置**：
```ini
[Interface]
PrivateKey = <私鑰>
Address = 10.0.0.2/32
DNS = 8.8.8.8

[Peer]
PublicKey = <伺服器公鑰>
Endpoint = 1.2.3.4:51820
AllowedIPs = 10.0.0.1/32
PersistentKeepalive = 25
```

### WireGuard vs OpenVPN

| 特性 | WireGuard | OpenVPN |
|------|----------|----------|
| 代碼複雜度 | 低 | 高 |
| 性能 | 高 | 中等 |
| 配置簡單度 | 簡單 | 複雜 |
| 跨平台支持 | 優秀 | 優秀 |
| 社區支持 | 新興 | 成熟 |

---

## 🎯 Zero Trust

### 定義

Zero Trust是一種安全架構理念，假設網絡內部不可信，每個訪問請求都需要驗證。

### Zero Trust原則

1. **永不信任，始終驗證**：無論內外網
2. **最小權限訪問**：按需分配權限
3. **顯性驗證**：持續驗證身份和設備
4. **微分段**：網絡細粒度分段隔離

### Zero Trust組件

```
┌─────────────────────────────────────────────┐
│              PEP (Policy Enforcement Point) │
├─────────────────────────────────────────────┤
│   策略決策引擎 (PDP)                │
│   ├─ 身份驗證                        │
│   ├─ 設備信任評估                      │
│   ├─ 策略引擎                          │
│   └─ 威脅情報                          │
└─────────────────────────────────────────────┘
              ↓ 策略決策
┌─────────────────────────────────────────────┐
│              PA (Policy Administrator)      │
└─────────────────────────────────────────────┘
```

### Zero Trust vs VPN

| 特性 | VPN | Zero Trust |
|------|-----|-----------|
| 信任模型 | 內網信任 | 內外網均不信任 |
| 訪問控制 | 基於網絡位置 | 基於身份和設備 |
| 許可模型 | 允許所有 | 最小權限 |
| 適用場景 | 遠程訪問 | 所有訪問 |

---

## 📝 學習檢查清單

- [ ] 理解VPN的定義和類型
- [ ] 掌握IPSec VPN的協議套件和工作模式
- [ ] 了解SSL VPN的工作方式
- [ ] 掌握WireGuard的特點和配置
- [ ] 理解Zero Trust的安全理念
- [ ] 能夠配置和管理VPN連接

---

## 🔗 相關連結

- 🔙 [[04-網絡安全|返回網絡安全]]
- 🔐 [[加密與認證]]
- 🔥 [[防火牆技術]]
- 🛠️ [[網絡診斷工具]]
