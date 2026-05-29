---
title: SDN (Software-Defined Networking)
tags: [networking, sdn, architecture]
created: 2026-05-29
---

# SDN — Software-Defined Networking 軟體定義網路

> SDN separates the control plane from the data plane, enabling programmable, centralized network management.

## Traditional vs SDN

| Layer | Traditional | SDN |
|-------|-------------|-----|
| Control Plane | Distributed (per-device) | Centralized (controller) |
| Data Plane | Per-device forwarding | OpenFlow / programmable |
| Management | CLI per device | API / Controller |

## SDN Architecture
```
Application Layer → Northbound API → SDN Controller → Southbound API (OpenFlow) → Network Devices
```

## Benefits

- Centralized management & automation
- Network virtualization
- Dynamic traffic engineering
- Faster innovation (software speed vs hardware cycles)

> 💡 SDN is to networking what cloud is to servers — abstraction and programmability over physical infrastructure.
