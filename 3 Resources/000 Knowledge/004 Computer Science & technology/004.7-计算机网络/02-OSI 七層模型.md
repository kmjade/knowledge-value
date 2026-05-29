---
aliases: [OSI Model]
tags: [DDC/004.7, osi]
---
# 02 OSI 七層模型

## 七層
| 層 | 名稱 | 功能 | 協議/設備 |
|:--:|------|------|------|
| 7 | 應用層 | 用戶介面 | HTTP, SMTP |
| 6 | 表示層 | 編碼/加密 | TLS, ASCII |
| 5 | 會話層 | 對話控制 | NetBIOS |
| 4 | 傳輸層 | 端到端可靠性 | TCP, UDP |
| 3 | 網絡層 | 路由/定址 | IP, Router |
| 2 | 數據鏈路層 | 訊框/錯誤檢測 | Ethernet, Switch |
| 1 | 物理層 | 位元傳輸 | 電纜, Hub |

## 封裝: 數據自上而下 → 每層加 header → Physical 傳輸 → 自下而上解封
## 實際對比: OSI 七層 (理論) vs TCP/IP 四層 (實用)
