---
title: Application Layer Protocols
tags: [networking, application, protocols]
created: 2026-05-29
---

# Application Layer Protocols 應用層協議

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| **HTTP** | 80 | TCP | Web browsing |
| **HTTPS** | 443 | TCP | Secure web |
| **DNS** | 53 | UDP/TCP | Name resolution |
| **SMTP** | 25 | TCP | Email sending |
| **IMAP** | 143 | TCP | Email retrieval |
| **FTP** | 21/20 | TCP | File transfer |
| **SSH** | 22 | TCP | Secure remote access |
| **DHCP** | 67/68 | UDP | Dynamic IP assignment |
| **NTP** | 123 | UDP | Time sync |
| **SNMP** | 161 | UDP | Network management |

## DNS Resolution Flow
```
Browser → DNS Resolver → Root NS → TLD NS → Authoritative NS → IP
```

> 💡 Application layer is where the user meets the network — every protocol solves a specific user need.
