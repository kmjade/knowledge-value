---
title: Firewall Technology
tags: [networking, security, firewall]
created: 2026-05-29
---

# Firewall Technology 防火牆技術

## Firewall Types

| Type | Layer | Description |
|------|-------|-------------|
| **Packet Filter** | L3-L4 | Filter by IP/Port/Protocol |
| **Stateful** | L3-L4 | Track connection state |
| **Proxy** | L7 | Intermediary for application traffic |
| **NGFW** | L3-L7 | DPI, IPS, application awareness |
| **WAF** | L7 | Web-specific protection (SQLi, XSS) |

## Firewall Rules

```
Source IP | Dest IP | Port | Protocol | Action
10.0.1.0/24 | ANY | 80,443 | TCP | ALLOW
ANY | 10.0.1.0/24 | 22 | TCP | DENY
```

> 💡 Default-deny posture: block everything, allow only what's needed.
