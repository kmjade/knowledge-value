---
aliases: [Active Directory, AD DS, Domain Controller, GPO, LDAP, Kerberos, AD FS, Azure AD Connect]
tags: [DDC/004.451.8, windows-server, active-directory, identity, kerberos, gpo]
created: 2026-05-30
updated: 2026-05-30
type: chapter
topic: Active Directory Domain Services
---

# 03 — Active Directory 域服務 AD DS

> 企業身分管理的核心：網域控制站部署、OU/GPO 管理、Kerberos 驗證、AD FS 同盟、Azure AD 混合身分。

---

## AD DS 核心概念 Core Concepts

| 概念 Concept | 說明 Description | 英文 English |
|:------|------|------|
| 網域 Domain | 邏輯管理邊界，複寫單元 | Replication boundary |
| 樹系 Forest | 安全邊界，共用的 Schema/Configuration | Security boundary |
| 網域樹 Domain Tree | 連續 DNS 命名空間的網域集合 | Contiguous namespace |
| OU (Organizational Unit) | 最小管理委派單元 | Delegation unit |
| 站台 Site | 對應實體網路的複寫拓撲 | Physical topology mapping |
| GC (Global Catalog) | 樹系部分屬性集的唯讀副本 | Partial attribute set |
| FSMO Roles | 5 種操作主機角色 | Flexible Single Master Operations |
| Schema | 定義所有物件類別和屬性 | Object class & attribute definitions |
| SYSVOL | 儲存 GPO 和登入腳本 | Group Policy + scripts |

---

## FSMO 角色 (5 Operations Masters)

| 角色 Role | 範圍 Scope | 說明 Description | PS Cmdlet |
|:------|:---:|------|------|
| **Schema Master** | Forest | 唯一可修改 Schema 的 DC | `Get-ADForest \| Select SchemaMaster` |
| **Domain Naming Master** | Forest | 新增/移除網域 | `Get-ADForest \| Select DomainNamingMaster` |
| **PDC Emulator** | Domain | 密碼變更優先複寫、時間同步 | `Get-ADDomain \| Select PDCEmulator` |
| **RID Master** | Domain | 分配 RID 池 (500 per DC) | `Get-ADDomain \| Select RIDMaster` |
| **Infrastructure Master** | Domain | 跨網域物件參考更新 | `Get-ADDomain \| Select InfrastructureMaster` |

---

## DC 部署與驗證 Deploy & Validate DC

```powershell
# 安裝 AD DS 角色
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# 在新樹系中部署第一個 DC
Install-ADDSForest -DomainName "contoso.com" `
  -DomainNetbiosName "CONTOSO" `
  -ForestMode WinThreshold `
  -DomainMode WinThreshold `
  -InstallDNS:$true

# 在現有網域中部署額外 DC
Install-ADDSDomainController -DomainName "contoso.com" `
  -InstallDNS:$true `
  -Credential (Get-Credential CONTOSO\Administrator)

# 驗證 DC 健康狀態
dcdiag /v /c /e
repadmin /replsummary
repadmin /showrepl
```

---

## OU 設計與委派 OU Design & Delegation

| 設計模式 Pattern | OU 結構 | 適用場景 |
|:------|:------|------|
| **地理 Geographical** | 國家 → 城市 → 部門 | 跨國企業 |
| **部門 Departmental** | 部門 → 團隊 | 中小企業 |
| **混合 Hybrid** | 地理 → 部門 | 大型複雜組織 |
| **物件類型 Object-based** | Users / Computers / Groups / Servers | 安全分層 |

```powershell
# 建立 OU 結構
New-ADOrganizationalUnit -Name "Taiwan" -Path "DC=contoso,DC=com"
New-ADOrganizationalUnit -Name "IT" -Path "OU=Taiwan,DC=contoso,DC=com"

# 委派 OU 權限 Delegation
# Use "Delegate Control Wizard" or PowerShell:
$acl = Get-Acl "AD:\OU=IT,OU=Taiwan,DC=contoso,DC=com"
# Set-Acl to grant specific rights to a group
```

---

## Group Policy (GPO) 管理

| GPO 處理順序 Order | 層級 Level | 優先級 Priority |
|:---:|------|:---:|
| 1 | 本機 Local | 最低 Lowest |
| 2 | Site | ↓ |
| 3 | Domain | ↓ |
| 4 | OU (父) | ↓ |
| 5 | OU (子) | 最高 Highest |

### 關鍵 GPO 命令 Key GPO Commands

```powershell
# 建立 GPO
New-GPO -Name "Password Policy" | New-GPLink -Target "OU=IT,DC=contoso,DC=com"

# 設定密碼原則 (需在 Domain level)
Set-GPRegistryValue -Name "Default Domain Policy" `
  -Key "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Password" `
  -ValueName "MinimumPasswordLength" -Type DWord -Value 12

# 強制更新
gpupdate /force

# 查看套用結果
gpresult /r /scope:computer
gpresult /h report.html
```

---

## 驗證通訊協定 Authentication Protocols

| 通訊協定 Protocol | 版本 | 安全等級 Security | 預設埠 Port | 說明 |
|:------|:---:|:---:|:---:|------|
| **Kerberos v5** | 5 | 🟢 高 | 88 (TCP/UDP) | 預設、雙向驗證、票證系統 |
| **NTLMv2** | 2 | 🟡 中 | Dynamic | 向下相容，逐步淘汰 |
| **NTLMv1** | 1 | 🔴 低 | Dynamic | 應禁用 Deprecated |
| **LDAP** | 3 | 🟡 中 | 389 | 明文目錄查詢 |
| **LDAPS** | 3 | 🟢 高 | 636 | LDAP over TLS |
| **LDAP Signing** | 3 | 🟢 高 | 389 | LDAP + 簽章 (建議) |

### Kerberos 票證流程 Ticket Flow

```
   Client                    DC (KDC)                      Server
    │                          │                             │
    │  1. AS-REQ (pre-auth)   │                             │
    │ ─────────────────────────>                             │
    │  2. AS-REP (TGT)        │                             │
    │ <─────────────────────────                             │
    │                          │                             │
    │  3. TGS-REQ (TGT + SPN) │                             │
    │ ─────────────────────────>                             │
    │  4. TGS-REP (ST)        │                             │
    │ <─────────────────────────                             │
    │                          │                             │
    │  5. AP-REQ (ST)                                        │
    │ ──────────────────────────────────────────────────────>│
    │  6. AP-REP (opt mutual)                                │
    │ <──────────────────────────────────────────────────────│
```

---

## AD FS (Active Directory Federation Services) 同盟服務

| 概念 Concept | 說明 Description |
|:------|------|
| Claims Provider (CP) | 發出身分宣告的組織 (如內部 AD) |
| Relying Party (RP) | 信任外部宣告的應用程式 |
| Claim Rules | 宣告轉換規則 (如：組別 → 角色) |
| WAP (Web Application Proxy) | DMZ 中的 AD FS 反向代理 |
| SAML / WS-Fed / OAuth2.0 / OIDC | 支援的通訊協定 |

### AD FS 高可用部署拓撲 AD FS HA Topology

```
  Internet ──> WAP1/WAP2 (DMZ, NLB)
                  │
  Internal ──> ADFS1/ADFS2 (Farm, NLB or WAP proxy)
                  │
              AD DS DC (身分來源 Identity Source)
```

---

## Azure AD Connect — 混合身分整合 Hybrid Identity

| 功能 Feature | Azure AD Connect | Azure AD Connect Cloud Sync |
|:------|:---:|:---:|
| **同步方向 Direction** | On-prem → Azure AD | On-prem → Azure AD |
| **驗證方式 Auth** | PHS / PTA / Federation | PHS only |
| **安裝位置 Install Location** | 內部部署 On-prem DC 附近 | 輕量級代理 Lightweight agent |
| **高可用 HA** | 暫存模式 Staging mode | 多代理 Multiple agents |
| **寫回 Writeback** | ✅ (密碼、群組、裝置) | ❌ (限群組寫回) |
| **過濾 Filtering** | OU / 屬性 / 群組 | OU / 屬性 |

---

> **Next:** [[04-Hyper-V-虛擬化]] → Hyper-V 架構與 VM 管理

> **Back to MOC:** [[004.451.8-Windows-Server]]
