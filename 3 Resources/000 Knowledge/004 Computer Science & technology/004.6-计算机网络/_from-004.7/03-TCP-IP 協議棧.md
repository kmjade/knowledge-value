---
aliases: [TCP, IP, UDP]
tags: [DDC/004.6, tcpip]
---
# 03 TCP/IP 協議棧

## TCP vs UDP
| | TCP | UDP |
|:--|:---|:---|
| 連接 | 需建立 (三次握手) | 無連接 |
| 可靠性 | 確認+重傳 | 盡力而為 |
| 順序 | 保證 | 不保證 |
| 流量控制 | 滑動窗口 | 無 |
| 應用 | HTTP, SSH | DNS, 串流, VoIP |

## TCP 三次握手: SYN → SYN-ACK → ACK

## IP 核心功能
- **定址** — IPv4 (32-bit) / IPv6 (128-bit)
- **路由** — 最佳路徑選擇 (OSPF/BGP)
- **分片** — MTU 限制下拆分封包
