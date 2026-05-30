---
aliases: [IIS, Internet Information Services, Web Server, Application Pools, TLS, ARR, URL Rewrite]
tags: [DDC/004.451.8, windows-server, iis, web-server, http, aspdotnet]
created: 2026-05-30
updated: 2026-05-30
type: chapter
topic: IIS Web Server
---

# 05 — IIS Web 伺服器 Internet Information Services

> IIS 10 架構深度解析：應用程式集區、站台繫結、模組管線、HTTPS/TLS 設定、ARR 反向代理與 PHP/.NET 整合。

---

## IIS 架構 Architecture

```
                    HTTP.sys (Kernel Mode)
                           │
                 ┌─────────┴─────────┐
                 │  WAS (Windows      │
                 │  Process           │
                 │  Activation        │
                 │  Service)          │
                 └─────────┬─────────┘
              ┌────────────┼────────────┐
        ┌─────┴─────┐ ┌───┴────┐ ┌────┴─────┐
        │ App Pool 1 │ │ App   │ │ App      │
        │ w3wp.exe   │ │ Pool 2│ │ Pool 3   │
        │ (worker)   │ │w3wp   │ │ w3wp     │
        │ .NET CLR   │ │       │ │ (PHP)    │
        └────────────┘ └───────┘ └──────────┘
              │
    ┌─────────┴──────────┐
    │  IIS Modules       │
    │  Pipeline (Native  │
    │  + Managed)        │
    └────────────────────┘
```

### 核心元件 Core Components

| 元件 Component | 說明 Description | 行程/服務 Process |
|:------|------|------|
| **HTTP.sys** | Kernel-mode HTTP listener & cache | Kernel driver |
| **WAS** | Process activation, config management | `was-service` |
| **w3wp.exe** | Worker process per app pool | User-mode |
| **App Pool** | Isolation boundary for apps | Worker process group |
| **Site** | Bindings + root app + virtual directories | Config in applicationHost.config |
| **Module** | Request pipeline middleware | Native (.dll) or Managed (.NET) |

---

## 應用程式集區 App Pool 設定

| 設定項 Setting | 建議值 Recommended | 說明 Description |
|:------|:------|------|
| **.NET CLR 版本** | No Managed Code (.NET Core 時代) | 僅 Legacy ASP.NET 才需 CLR |
| **Managed Pipeline Mode** | Integrated | Classic 僅向後相容 |
| **Identity** | ApplicationPoolIdentity (預設) | 虛擬帳戶，最小權限 |
| **Idle Time-out** | 0 (永不逾時) / 依需設定 | 防止冷啟動延遲 Cold start |
| **Regular Time Interval** | 特定時間 (off-peak) | 避免尖峰時回收 |
| **Private Memory Limit** | 視應用需求 | 防止記憶體洩漏 OOM |
| **Recycling Disable Overlapped** | False (允許重疊回收) | 無停機回收 Zero-downtime recycle |
| **CPU Limit** | 視需求 (如 50000 = 50%) | 防止 CPU 壟斷 |

### App Pool 身分與權限 App Pool Identity

| Identity 類型 | 說明 | 網路存取 | SQL 整合驗證 |
|:------|------|:---:|:---:|
| **ApplicationPoolIdentity** | 動態 SID，最小權限 | ❌ | ❌ (需 MSA/gMSA) |
| **NetworkService** | 機器帳戶 Machine account | ✅ | ✅ (DOMAIN\MACHINE$) |
| **LocalSystem** | 最高權限 SYSTEM | ✅ | ✅ |
| **特定使用者 Specific User** | 自訂帳戶 | ✅ | ✅ |
| **gMSA (Group Managed Service Account)** | 自動密碼管理 | ✅ | ✅ 🟢 建議 |

---

## 站點繫結與 HTTPS/TLS Site Bindings & TLS

| 繫結 Binding | 埠 Port | 說明 | TLS 需求 |
|:------|:---:|------|:---:|
| **http** | 80 | 明碼 HTTP | — |
| **https** | 443 | HTTPS + TLS | ✅ 需要憑證 |
| **net.tcp** | 808:* | WCF TCP (已棄用) | — |
| **net.pipe** | — | 本機 IPC only | — |

### TLS 設定最佳實踐 TLS Best Practices

```powershell
# 停用舊版 TLS / SSL
New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 2.0\Server" -Force
New-ItemProperty -Path "HKLM:\...\SSL 2.0\Server" -Name Enabled -Value 0

New-Item "HKLM:\...\Protocols\SSL 3.0\Server" -Force
New-ItemProperty -Path "HKLM:\...\SSL 3.0\Server" -Name Enabled -Value 0

New-Item "HKLM:\...\Protocols\TLS 1.0\Server" -Force
New-ItemProperty -Path "HKLM:\...\TLS 1.0\Server" -Name Enabled -Value 0

New-Item "HKLM:\...\Protocols\TLS 1.1\Server" -Force
New-ItemProperty -Path "HKLM:\...\TLS 1.1\Server" -Name Enabled -Value 0

# 僅啟用 TLS 1.2 + 1.3
# TLS 1.3 預設啟用於 Server 2022+
```

### HTTP 回應標頭安全 Headers Security

| 標頭 Header | 範例值 | 效果 |
|:------|------|------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | 強制 HTTPS (HSTS) |
| `X-Frame-Options` | `DENY` / `SAMEORIGIN` | 防止 Clickjacking |
| `X-Content-Type-Options` | `nosniff` | 防止 MIME sniffing |
| `Content-Security-Policy` | `default-src 'self'` | 限制資源來源 |
| `X-XSS-Protection` | `0` (modern browsers obsolete) | 舊瀏覽器 XSS 防護 |

---

## ARR (Application Request Routing) 與 URL Rewrite

| 功能 Feature | 模組 Module | 場景 Scenario |
|:------|:------|------|
| **反向代理 Reverse Proxy** | ARR 3.0 | 前端 IIS → 後端 Kestrel / Node.js |
| **負載平衡 Load Balancing** | ARR (Server Farm) | 多後端伺服器分流 |
| **URL 重寫 URL Rewrite** | URL Rewrite 2.1 | HTTP → HTTPS redirect, SEO, clean URLs |
| **URL 重導 URL Redirect** | URL Rewrite (redirect action) | 301/302 重導 |

```xml
<!-- web.config: HTTP → HTTPS 重導規則 -->
<rule name="HTTP to HTTPS" stopProcessing="true">
  <match url="(.*)" />
  <conditions>
    <add input="{HTTPS}" pattern="off" />
  </conditions>
  <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" 
          redirectType="Permanent" />
</rule>
```

---

## PHP / .NET 託管 Hosting

| 技術 Technology | 模組 Module | 方式 | 建議 |
|:------|------|------|:---:|
| **ASP.NET Framework 4.x** | ASP.NET Module (System.Web) | IIS Integrated Pipeline | Legacy |
| **ASP.NET Core** | ASP.NET Core Module (ANCM) | In-process / Out-of-process (Kestrel) | 🟢 建議 |
| **PHP** | FastCGI Module + PHP-CGI | FastCGI | Maintenance mode |
| **Node.js** | iisnode / ARR reverse proxy | Pass-through to Node process | ARR proxy |

---

## IIS 管理命令 IIS Management Commands

```powershell
# 安裝 IIS 角色
Install-WindowsFeature -Name Web-Server -IncludeManagementTools

# 常用功能
Install-WindowsFeature Web-Asp-Net45, Web-Net-Ext45, Web-ISAPI-Ext, Web-ISAPI-Filter
Install-WindowsFeature Web-WebSockets, Web-Mgmt-Console, Web-Scripting-Tools

# AppCmd (legacy CMD)
appcmd list site
appcmd list apppool
appcmd recycle apppool "DefaultAppPool"

# PowerShell IISAdministration 模組
Get-IISSite
Get-IISAppPool
New-IISSite -Name "MySite" -PhysicalPath "C:\inetpub\wwwroot\mysite" -BindingInformation ":80:mysite.local"
Start-IISSite -Name "MySite"
```

---

> **Next:** [[06-DNS-DHCP-網路服務]] → DNS 區域與 DHCP 範圍管理

> **Back to MOC:** [[004.451.8-Windows-Server]]
