---
aliases: [網絡 FAQ]
tags: [DDC/004.6, faq]
---
# 計算機網絡 FAQ

### TCP 還是 UDP？
可靠性要求、資料完整性 → TCP (HTTP/SSH)。低延遲、即時性 > 可靠性 → UDP (串流/VoIP/遊戲)。

### HTTP vs HTTPS？
HTTPS = HTTP + TLS 加密。現代 Web 必須使用 HTTPS。

### 負載均衡 L4 vs L7？
L4: 基於 IP+Port 分發 (速度)。L7: 基於 HTTP 內容分發 (靈活 — 路徑路由、Cookie 黏性)。

### IPv4 用完怎麼辦？
NAT (私有 IP 重複使用) + IPv6 (128-bit, 340 undecillion 地址)。

### 什麼是 5G 三大場景？
eMBB (增強寬頻)、URLLC (超低延遲可靠)、mMTC (大規模物聯網)。
