---
title: Data Link Layer Protocols
tags: [networking, data-link, layer2]
created: 2026-05-29
---

# Data Link Layer Protocols 資料鏈路層協議

| Protocol | Medium | Speed |
|----------|--------|-------|
| **Ethernet** | Copper/Fiber | 10M – 400G |
| **Wi-Fi (802.11)** | Radio | Up to 10 Gbps (Wi-Fi 7) |
| **PPP** | Serial | Varies |
| **ARP** | — | Address resolution |

## MAC Address
- 48-bit (e.g., `00:1A:2B:3C:4D:5E`)
- First 24 bits: OUI (Organizationally Unique Identifier)
- Last 24 bits: Device-specific
- Flat addressing (no hierarchy like IP)

## ARP Process
```
Who has 192.168.1.5? → Broadcast
192.168.1.5 is at 00:1A:2B:3C:4D:5E → Unicast reply
```

> 💡 Data Link layer is where bits become frames and MAC addresses enable same-network communication.
