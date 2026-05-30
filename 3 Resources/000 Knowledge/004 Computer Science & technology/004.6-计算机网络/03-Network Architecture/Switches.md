---
title: Network Switches
tags: [networking, switch, hardware]
created: 2026-05-29
---

# Network Switches 交換機

> A switch operates at Layer 2 (Data Link), forwarding frames based on MAC addresses.

## Switch vs Hub

| Feature | Hub | Switch |
|---------|-----|--------|
| Layer | L1 (Physical) | L2 (Data Link) |
| Forwarding | Broadcast to all ports | MAC table lookup |
| Collision Domain | One for all | Per port |
| Duplex | Half | Full |
| Use Today | Obsolete | Standard |

## Switch Features

| Feature | Description |
|---------|-------------|
| **MAC Table** | Maps MAC → Port, auto-learned |
| **VLAN** | Logical segmentation |
| **STP** | Spanning Tree Protocol — prevents loops |
| **Link Aggregation** | Combine multiple ports (LACP) |
| **PoE** | Power over Ethernet (up to 90W) |
| **Port Mirroring** | Copy traffic for analysis |

> 💡 A switch turns a shared collision domain into individual point-to-point links — this is why modern LANs are fast.
