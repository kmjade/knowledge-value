---
aliases: [DNS, DHCP, IPAM, DNS Zones, DHCP Scopes, Network Services]
tags: [DDC/004.451.8, windows-server, dns, dhcp, ipam, networking]
created: 2026-05-30
updated: 2026-05-30
type: chapter
topic: DNS DHCP Network Services
---

# 06 — DNS / DHCP 網路服務 Network Services

> Windows Server 核心網路基礎設施：DNS 區域管理、DHCP 範圍與容錯移轉、IPAM 集中管理。

---

## DNS 架構與區域類型 DNS Architecture & Zone Types

| 區域類型 Zone Type | 讀寫 | 儲存位置 | 複寫範圍 (AD-Integrated) |
|:------|:---:|------|------|
| **Primary (標準主要)** | ✅ R/W | 本機檔案 Local file | ❌ 無複寫 |
| **Secondary (標準次要)** | ❌ Read-Only | 本機檔案 (來自 Primary) | ❌ 無複寫 |
| **AD-Integrated Primary** | ✅ R/W | AD DB (NTDS) | ✅ 可選範圍 (見下表) |
| **Stub Zone** | ❌ Read-Only | 僅 SOA/NS/Glue A | ❌ 僅存根 |
| **GlobalNames Zone (GNZ)** | ✅ R/W | AD-Integrated | ✅ Forest-wide 單一名稱解析 |
| **Forward Lookup** | — | 主機名 → IP | — |
| **Reverse Lookup** | — | IP → 主機名 | — |

### AD-Integrated Zone 複寫範圍 Replication Scope

| 範圍 Scope | 複寫到 Replicates to | 適用場景 |
|:------|------|------|
| **All DNS servers in forest** | 全樹系 DNS 伺服器 | GNZ, 全局解析 |
| **All DNS servers in domain** | 全網域 DNS 伺服器 | 一般網域區域 Default |
| **All domain controllers in domain** | 全網域 DC (Win 2000 相容) | Legacy |
| **Custom application partition** | 自訂分割中的 DC | 選擇性複寫 |

---

## DNS 記錄類型 Record Types

| 記錄 Record | 全名 Full Name | 用途 Purpose | 範例 Example |
|:------|------|------|------|
| **A** | Address (IPv4) | 主機 → IPv4 | `web.contoso.com → 192.168.1.10` |
| **AAAA** | Address (IPv6) | 主機 → IPv6 | `web.contoso.com → fd12::10` |
| **CNAME** | Canonical Name | 別名 Alias | `www → web.contoso.com` |
| **MX** | Mail Exchanger | 郵件伺服器 | `@ → mail.contoso.com (pref 10)` |
| **NS** | Name Server | 權威名稱伺服器 | `contoso.com → dc01.contoso.com` |
| **SOA** | Start of Authority | 區域權威資訊 | Serial, refresh, retry, expire, TTL |
| **SRV** | Service Locator | 服務發現 (AD, SIP, LDAP) | `_ldap._tcp.contoso.com` |
| **PTR** | Pointer | 反向解析 Reverse lookup | `10.1.168.192.in-addr.arpa → web` |
| **TXT** | Text | 驗證、SPF、DKIM | `v=spf1 mx -all` |
| **CAA** | Certification Authority Authorization | 指定可發證 CA | `0 issue "letsencrypt.org"` |

---

## DNS 管理命令 DNS Management

```powershell
# 安裝 DNS 角色
Install-WindowsFeature -Name DNS -IncludeManagementTools

# 建立主要區域
Add-DnsServerPrimaryZone -Name "contoso.com" -ReplicationScope Domain -DynamicUpdate Secure

# 建立正向 A 記錄
Add-DnsServerResourceRecordA -ZoneName "contoso.com" -Name "web" -IPv4Address "192.168.1.10"

# 建立反向區域
Add-DnsServerPrimaryZone -NetworkId "192.168.1.0/24" -ReplicationScope Domain

# 區域傳送設定 (允許特定伺服器)
Set-DnsServerPrimaryZone -Name "contoso.com" -SecureSecondaries TransferToSecureServers `
  -SecondaryServers 192.168.1.20

# 清除過時記錄 Scavenging
Set-DnsServerScavenging -ScavengingState $true -ScavengingInterval 7.00:00:00
Start-DnsServerScavenging

# 測試解析
Resolve-DnsName -Name "web.contoso.com" -Type A
nslookup web.contoso.com
```

### DNS 安全最佳實踐 DNS Security Best Practices

| 實踐 Practice | 設定 | 效果 |
|:------|------|------|
| **DNS Cache Locking** | 啟用 (預設) | 防止 Cache poisoning |
| **DNSSEC** | 簽署區域 Sign zone | 防篡改，確保完整性 |
| **DNS over HTTPS (DoH)** | Server 2022+ | 加密 DNS 查詢 |
| **Secure Dynamic Updates** | Secure only | 僅 AD 驗證用戶端可更新 |
| **Root Hints / Forwarders** | 鎖定、限制外部遞迴 | 限制遞迴查詢範圍 |
| **Response Rate Limiting** | 啟用 | 防止 DNS Amplification DDoS |

---

## DHCP — 動態主機設定通訊協定 DHCP

### DHCP 範圍設定 DHCP Scope Configuration

```powershell
# 安裝 DHCP
Install-WindowsFeature -Name DHCP -IncludeManagementTools

# 授權 DHCP 伺服器 (AD 環境)
Add-DhcpServerInDC -DnsName "dhcp01.contoso.com"

# 建立範圍
Add-DhcpServerv4Scope -Name "Corporate LAN" `
  -StartRange 192.168.1.100 -EndRange 192.168.1.200 `
  -SubnetMask 255.255.255.0

# 設定範圍選項
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -Router 192.168.1.1
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -DnsServer 192.168.1.10
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -DnsDomain contoso.com

# 保留 IP (MAC 綁定)
Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 `
  -IPAddress 192.168.1.50 -ClientId "00-15-5D-12-34-56" -Name "Printer01"
```

### DHCP 高可用 DHCP Failover / HA

| 模式 Mode | 說明 Description | 負載平衡 | 適用場景 |
|:------|:---:|:---:|------|
| **Hot Standby** | 一台 Active + 一台 Standby | ❌ | 災難備援 DR |
| **Load Balance** | 兩台同時服務，按比例分流 | ✅ | 生產環境 Production |

```powershell
# 設定 DHCP 容錯移轉 (Load Balance 模式)
Add-DhcpServerv4Failover -Name "DHCP-Failover" `
  -ScopeId 192.168.1.0 `
  -PartnerServer "dhcp02.contoso.com" `
  -LoadBalancePercent 50 `
  -SharedSecret "P@ssw0rd!" `
  -Force

# DHCP Failover 狀態
Get-DhcpServerv4Failover
```

---

## IPAM — IP 位址管理 IP Address Management

| 功能 Function | 說明 Description | 需求 |
|:------|------|------|
| **IP 位址空間管理** | 集中管理所有 IP 範圍、使用率 | GPO provisioned agents |
| **DNS/DHCP 監視** | 監視多台 DNS/DHCP 伺服器 | 管理權限 |
| **IP 位址追蹤** | 每個 IP 的使用記錄與歷史 | Audit logging |
| **多樹系管理** | 跨樹系 IP 管理 | Forest trust |
| **RBAC 存取控制** | 角色型精細權限委派 | AD groups |

### IPAM 架構 IPAM Architecture

```
  ┌──────────────────────┐
  │    IPAM Server       │  (Windows Internal DB / WID)
  │  - IP address space   │
  │  - DNS/DHCP monitor  │
  │  - Audit & reporting  │
  └──────┬───────────────┘
         │    WinRM / RPC
    ┌────┴────┬──────────┐
    │         │          │
  DHCP01   DNS01     DNS02
  DHCP02
```

---

> **Next:** [[07-儲存與檔案服務]] → NTFS/ReFS、Storage Spaces、SMB、DFS

> **Back to MOC:** [[004.451.8-Windows-Server]]
