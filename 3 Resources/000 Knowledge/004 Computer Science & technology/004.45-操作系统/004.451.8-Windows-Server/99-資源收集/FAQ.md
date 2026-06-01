---
aliases: [FAQ, Troubleshooting, Common Issues, Windows Server FAQ]
tags: [DDC/004.451.8, windows-server, faq, troubleshooting]
created: 2026-05-30
updated: 2026-05-30
type: resource
topic: FAQ & Troubleshooting
---

# 常見問答 FAQ & Troubleshooting

> Windows Server 部署與運維中常見問題彙總。

---

## 安裝與部署 Installation & Deployment

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q1 | **Server Core 安裝後如何設定 IP？** | 使用 `sconfig` → 選項 8，或 `New-NetIPAddress -InterfaceIndex <#> -IPAddress <IP> -PrefixLength <CIDR> -DefaultGateway <GW>` |
| Q2 | **autounattend.xml 密碼為何失敗？** | 密碼需 Base64 編碼；範例使用 `administrator` 作為預設使用者名稱；需滿足複雜度要求 |
| Q3 | **Sysprep 後無法 OOBE？** | Sysprep 限制 1001 次；檢查 `%WINDIR%\System32\Sysprep\Panther\setupact.log` |
| Q4 | **WDS PXE 開機卡在 "TFTP..."** | 檢查 DHCP Option 66/67；確認 WDS 服務已啟動；確認網路未阻擋 TFTP (UDP 69) |
| Q5 | **WAC 無法連線到伺服器** | 確認目標伺服器 WinRM 啟用 (`Enable-PSRemoting`; `winrm quickconfig`)；確認 CredSSP 或 Kerberos 委派 |

---

## Active Directory

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q6 | **DC 複寫失敗 "Access Denied"** | 檢查時間同步 (最大誤差 5 min)；執行 `repadmin /syncall`；確認網路連通性 |
| Q7 | **GPO 未生效？** | 檢查繼承封鎖、強制 (`Enforced`)、權限過濾；執行 `gpresult /h report.html` |
| Q8 | **AD FS 登入循環 Loop** | 檢查 Claims Rules 設定；確認 Relying Party Identifier 正確；清除瀏覽器 Cookies |
| Q9 | **Azure AD Connect 同步失敗** | 檢查 `Microsoft Azure AD Sync` 服務；執行 `Start-ADSyncSyncCycle -PolicyType Delta`；查看 Synchronization Service Manager |
| Q10 | **Kerberos TGT 過期導致驗證失敗** | 預設 TGT lifetime 10 hrs；檢查 DC 時間同步；檢查 SPN 重複 (`setspn -X`) |
| Q11 | **AD 資料庫過大？** | 執行離線重組 (`ntdsutil` → `files` → `compact to <path>`)；確認已啟用 AD Recycling Bin |

---

## Hyper-V 虛擬化

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q12 | **VM 無法啟動 — "Not enough memory"** | 檢查 Dynamic Memory 是否設有合理的最小值；確認主機可用記憶體 |
| Q13 | **Live Migration 失敗** | 確認兩端認證設定一致 (Kerberos vs CredSSP)；確認儲存位置可存取；檢查防火牆 (TCP 6600) |
| Q14 | **Checkpoints 合併中 VM 暫停** | 合併 AVHDX 需要大量 IOPS；勿關機打斷合併；於低負載時排程合併 |
| Q15 | **VM 網路不通** | 檢查虛擬交換器類型；確認 VLAN ID 設定；檢查 VM 中的 vNIC IP 設定 |
| Q16 | **巢狀虛擬化 Nested Virtualization 不工作** | 需 Server 2016+ / Win 10 Anniversary+；VM 需為 Gen2；`Set-VMProcessor -VMName <VM> -ExposeVirtualizationExtensions $true` |

---

## IIS Web 伺服器

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q17 | **IIS 回傳 503 Service Unavailable** | App Pool 已停止或崩潰；檢查 Application Event Log；確認磁碟空間/記憶體充足 |
| Q18 | **HTTPS 連線失敗 / 證書錯誤** | 檢查憑證繫結 (`netsh http show sslcert`)；確認憑證未過期；確認私鑰存在且可讀 |
| Q19 | **App Pool Recycling 造成 500 錯誤** | 設定 Disable Overlapped Recycle = False；確保應用程式無狀態或使用外部分散式 Session |

---

## DNS / DHCP

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q20 | **DNS 區域傳送失敗 "REFUSED"** | 確認次要伺服器 IP 在 Zone Transfer 允許清單；確認防火牆允許 TCP 53 |
| Q21 | **DHCP 用戶端無法取得 IP** | 確認 DHCP Server 已授權 (AD)；確認 Scope 已啟用；檢查 IP 範圍已用盡 |

---

## 儲存與檔案服務

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q22 | **ReFS 磁碟區變 RAW？** | 可能是未預期斷電導致損壞；ReFS 可嘗試線上修復 (`Repair-Volume -DriveLetter X`)，但若失敗需從備份還原 |
| Q23 | **SMB 存取被拒 (Access Denied)** | 檢查 NTFS 權限 **和** SMB Share 權限(兩者交集)；檢查 `SmbShare` 和 `SmbServerConfiguration` |
| Q24 | **DFS-R 複寫積壓過大 Backlog** | 檢查 DFS-R 頻寬排程；使用 `dfsrdiag backlog` 確認；考慮預植 Pre-seeding |

---

## 安全 Security

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q25 | **Credential Guard 無法啟動** | 確認 TPM 2.0 存在且啟用；確認 Secure Boot 啟用；確認 Hyper-V 角色已安裝 |
| Q26 | **LAPS 密碼未輪替** | 等待下一次 GPO 背景重新整理 (預設 90-120 min)；或執行 `Invoke-LapsPolicyProcessing` |
| Q27 | **auditpol 設定不生效** | 確認 `Audit: Force audit policy subcategory settings` 安全性選項已啟用 |

---

## 高可用 / DR

| # | 問題 Question | 答案 Answer |
|:--:|------|------|
| Q28 | **叢集驗證失敗 — 儲存驗證** | 確認所有節點可看到相同磁碟；確認 MPIO 已設定；確認磁碟未在其他節點上線 |
| Q29 | **CSV 磁碟區離線** | 檢查叢集記錄 (`Get-ClusterLog`); 確認底層儲存連線；執行 `Get-ClusterSharedVolumeState` |
| Q30 | **ASR 複寫狀態為 Critical** | 檢查網路連線；確認 Process Server 服務運作；查看 ASR 代理記錄 |

---

> **Back to MOC:** [[004.451.8-Windows-Server]]

<<<<<<< HEAD
> **See also:** [[3 Resources/000 Knowledge/004 Computer Science & technology/04-操作系统/004.451.8-Windows-Server/99-資源收集/資源總覽]] — 完整資源彙整
=======
> **See also:** [[3 Resources/000 Knowledge/004 Computer Science & technology/004.45-操作系统/004.451.8-Windows-Server/99-資源收集/資源總覽]] — 完整資源彙整
>>>>>>> origin/main
