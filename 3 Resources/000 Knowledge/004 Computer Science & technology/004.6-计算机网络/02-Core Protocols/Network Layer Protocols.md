---
title: Network Layer Protocols
tags: [networking, network-layer, ip]
created: 2026-05-29
---

# Network Layer Protocols 網路層協議

| Protocol | Purpose |
|----------|---------|
| **IP (v4/v6)** | Logical addressing & packet routing |
| **ICMP** | Error reporting & diagnostics (ping, traceroute) |
| **ARP** | IPv4 → MAC address resolution |
| **OSPF** | Interior gateway routing (link-state) |
| **BGP** | Exterior gateway routing (Internet backbone) |
| **RIP** | Distance-vector routing (legacy) |

## IP Routing Basics
```
Packet arrives at router → Check routing table → Forward to next hop → ... → Destination
```

## NAT (Network Address Translation)
```
Private IP (192.168.1.5) → NAT Router → Public IP (203.0.113.5)
```
- Solves IPv4 address exhaustion
- Provides basic security (hides internal structure)
- Breaks end-to-end principle

> 💡 IP is the "narrow waist" of the Internet — everything runs over IP, and IP runs over everything.
