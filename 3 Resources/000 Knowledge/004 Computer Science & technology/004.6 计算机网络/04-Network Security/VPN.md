---
title: VPN (Virtual Private Network)
tags: [networking, security, vpn]
created: 2026-05-29
---

# VPN — Virtual Private Network 虛擬專用網路

## VPN Protocols

| Protocol | Layer | Speed | Security |
|----------|-------|-------|----------|
| **WireGuard** | L3 | Fastest | Modern crypto |
| **IPsec** | L3 | Fast | Mature, complex |
| **OpenVPN** | L3/L7 | Medium | Flexible, TLS-based |
| **L2TP/IPsec** | L2 | Medium | Double encapsulation |
| **PPTP** | L2 | Fast | ❌ Broken, avoid |

## VPN Use Cases

- Remote access (road warrior)
- Site-to-site (branch office connection)
- Privacy / geo-spoofing
- Secure public Wi-Fi usage

> 💡 WireGuard is the modern choice — 4,000 lines of code vs OpenVPN's 70,000. Simplicity = security.
