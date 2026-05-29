---
title: Network Security Basics
tags: [networking, security]
created: 2026-05-29
aliases: [網絡安全基礎, Network Security]
---

# Network Security Basics 網路安全基礎

> Network security protects the integrity, confidentiality, and availability of data during transmission.
> 網路安全保護資料在傳輸過程中的完整性、機密性和可用性。

---

## CIA Triad 安全三要素

| 要素 | 說明 | 技術手段 |
|------|------|---------|
| **Confidentiality** 機密性 | 防止未授權存取 | Encryption, Access Control |
| **Integrity** 完整性 | 防止未授權修改 | Hashing, Digital Signatures |
| **Availability** 可用性 | 確保授權使用者可存取 | Redundancy, DDoS protection |

---

## 常見威脅 Common Threats

| 攻擊類型 | 說明 | 防禦 |
|---------|------|------|
| **DDoS** | 分散式阻斷服務 | Rate limiting, CDN, WAF |
| **MITM** | 中間人攻擊 | TLS/SSL, certificate pinning |
| **ARP Spoofing** | ARP 欺騙 | Static ARP, DAI |
| **DNS Poisoning** | DNS 快取汙染 | DNSSEC |
| **SQL Injection** | SQL 注入 | Parameterized queries |
| **XSS** | 跨站腳本 | Input sanitization, CSP |
| **Phishing** | 釣魚攻擊 | User education, MFA |

---

## 防火牆 Firewall

| 類型 | 說明 | OSI Layer |
|------|------|-----------|
| **Packet Filter** | 根據 IP/Port 過濾 | L3-L4 |
| **Stateful** | 追蹤連線狀態 | L3-L4 |
| **Application (NGFW)** | 深度封包檢測 (DPI) | L7 |
| **WAF** | Web 應用防火牆 | L7 |

---

## VPN — Virtual Private Network

| 協議 | 特點 |
|------|------|
| **IPsec** | L3，站點對站點，成熟 |
| **OpenVPN** | SSL/TLS based，靈活 |
| **WireGuard** | 現代、高效、程式碼精簡 |
| **L2TP/IPsec** | 雙層封裝 |

---

> 💡 Security is not a product — it's a process. 安全不是一個產品——它是一個持續的過程。
