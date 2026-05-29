---
title: VLAN (Virtual LAN)
tags: [networking, vlan, architecture]
created: 2026-05-29
---

# VLAN — Virtual LAN 虛擬區域網路

> VLAN logically segments a physical network into multiple broadcast domains — without additional hardware.

## Why VLAN?

| 問題 | VLAN 解法 |
|------|----------|
| Too many broadcast domains | Logical segmentation |
| Security isolation between departments | Separate VLANs for HR, Engineering, etc. |
| Physical topology constraints | Any port can belong to any VLAN |

## VLAN Types

| Type | Description |
|------|-------------|
| **Port-based** | Switch port assigned to VLAN |
| **Tag-based (802.1Q)** | 4-byte tag inserted into Ethernet frame |
| **Native VLAN** | Untagged traffic on trunk port |

## 802.1Q Tag
```
[DA|SA|802.1Q Tag(4B)|Type|Data|FCS]
              └─ TPID(0x8100) + PCP(3b) + DEI(1b) + VID(12b)
```
- VID: VLAN ID (1-4094)
- Trunk port carries multiple VLANs (tagged)
- Access port belongs to single VLAN (untagged)

> 💡 VLAN is the foundation of network segmentation in every enterprise.
