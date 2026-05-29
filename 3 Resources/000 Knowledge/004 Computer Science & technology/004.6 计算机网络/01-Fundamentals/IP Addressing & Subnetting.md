---
title: IP Addressing & Subnetting
tags: [networking, ip, fundamentals]
created: 2026-05-29
aliases: [IP地址, 子網劃分, CIDR]
---

# IP Addressing & Subnetting IP 定址與子網劃分

> IP addresses uniquely identify devices on a network. Subnetting divides networks into smaller, manageable segments.
> IP 位址唯一標識網路上的裝置。子網劃分將網路分割為更小的可管理區段。

## IPv4 (32-bit)

| Class | Range | Default Mask | CIDR | Hosts |
|-------|-------|-------------|------|-------|
| A | 1.0.0.0 – 126.255.255.255 | 255.0.0.0 | /8 | 16M |
| B | 128.0.0.0 – 191.255.255.255 | 255.255.0.0 | /16 | 65K |
| C | 192.0.0.0 – 223.255.255.255 | 255.255.255.0 | /24 | 254 |

## Private IP Ranges

| Range | CIDR |
|-------|------|
| 10.0.0.0 – 10.255.255.255 | /8 |
| 172.16.0.0 – 172.31.255.255 | /12 |
| 192.168.0.0 – 192.168.255.255 | /16 |

## Subnetting Formula

- Number of subnets = 2^n (n = borrowed bits)
- Hosts per subnet = 2^h − 2 (h = remaining host bits, minus network + broadcast)

## IPv6 (128-bit)

| Feature | IPv4 | IPv6 |
|---------|------|------|
| Address size | 32-bit | 128-bit |
| Notation | Dotted decimal | Hex colon |
| NAT needed | Yes | No |
| Address space | ~4.3B | ~3.4×10³⁸ |

> 💡 Understanding subnetting is the #1 skill for network engineers. Master CIDR notation.
