---
title: Thread 与 WiFi
tags: [matter, thread, wifi]
created: 2026-05-27
aliases: [Matter传输层, Thread vs WiFi]
---

# 05-Thread 与 WiFi

> Matter 可以在 Thread 和 WiFi（以及以太网）上运行——两种传输层各有优劣，选哪个取决于设备类型。

## 对比

| 维度 | Thread | WiFi |
|------|--------|------|
| 网络类型 | Mesh（设备互相转发） | 星型（路由器中心） |
| 覆盖 | 每个设备扩展覆盖→全屋覆盖 | 受限于路由器覆盖 |
| 功耗 | 极低→纽扣电池数年 | 高→需要常供电 |
| 延迟 | ~10-50ms | ~5-20ms |
| 带宽 | 250 kbps | 10-1000 Mbps |
| IPv6 | 原生 | 原生 |
| 典型设备 | 传感器、门锁、开关 | 摄像头、电视、网关 |

## Thread 详解

### 为什么 Thread 适合 IoT？

| 特性 | 说明 |
|------|------|
| **Mesh 自愈** | 一个节点离线→数据自动走其他路径 |
| **低功耗** | Thread 设备可以睡眠→电池长寿命 |
| **IPv6 原生** | 每个设备有全球可达的 IPv6 地址 |
| **无需专有网关** | Thread Border Router 可以是 HomePod/Nest Hub/Echo |

### Thread Border Router

Thread 网络和 WiFi/以太网的桥梁：

```
Thread 设备 ←→ Thread Border Router ←→ WiFi/以太网 ←→ Matter Controller
   (电池)      (常供电: HomePod等)
```

> 好消息：你不需要买一个专门的"Thread 网关"——Apple HomePod mini、Google Nest Hub、Amazon Echo 4th Gen 都内置了 Thread Border Router。

## 怎么选？

| 设备 | 推荐传输 | 原因 |
|------|----------|------|
| 智能灯泡 (常供电) | WiFi 或 Thread | 两者都可以 |
| 门锁/传感器 (电池) | **Thread** | 低功耗是关键 |
| 摄像头 | **WiFi** | 需要高带宽 |
| 电视/音箱 | **WiFi/以太网** | 带宽+常供电 |
| 窗帘电机 (电池) | **Thread** | 低功耗 |

## Thread 网络角色

| 角色 | 说明 |
|------|------|
| **Leader** | 管理网络——每个网络一个 |
| **Router** | 转发数据——常供电设备担任 |
| **End Device** | 终端——电池设备可以睡眠 |
| **Border Router** | 连接 WiFi/以太网 |

> 你的智能灯泡（常供电）会自动成为 Router——帮电池传感器转发数据。不需要手动配置。

## 相关笔记

- [[02-架构与协议栈]] — Thread 在协议栈底层
- [[../03-短距离通信/03-短距离通信|IoT·短距通信]] — Thread vs Zigbee/BLE
