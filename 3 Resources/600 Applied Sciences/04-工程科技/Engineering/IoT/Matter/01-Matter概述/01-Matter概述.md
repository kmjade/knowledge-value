---
title: Matter 概述
tags: [matter, foundation]
created: 2026-05-27
aliases: [Matter协议, 什么是Matter]
---

# 01-Matter 概述

> Matter 是 CSA（连接标准联盟，原 Zigbee 联盟）于 2022 年 10 月发布的智能家居统一标准。核心承诺：**简单、互操作、可靠、安全**。Apple、Google、Amazon、Samsung 同时支持——这是智能家居历史上第一次竞争平台站到了同一个标准背后。

## 为什么需要 Matter？

### 智能家居的"巴别塔"问题

| 平台 | 协议 | 只能控制 |
|------|------|----------|
| Apple Home | HomeKit | Apple 认证设备 |
| Google Home | Weave/Thread | Google 认证设备 |
| Amazon Alexa | Zigbee/BLE | 合作设备 |
| Samsung SmartThings | Zigbee/Z-Wave | 合作设备 |

> 结果是消费者困惑——"这个灯泡支持 Alexa 但不支持 HomeKit"。厂商痛苦——做 4 套认证。Matter 解决的就是这个问题。

## Matter 好在哪？

| 特性 | 之前 | Matter |
|------|------|--------|
| 配网 | 各平台不同的 App 和流程 | **扫码添加**——二维码在设备上 |
| 跨平台 | 这个支持 Apple 那个不支持 | 一个设备**同时**接入所有平台 |
| 控制 | 很多时候依赖云端 | **本地控制**——断网也能用 |
| 安全 | 各平台标准不一 | 统一的安全模型 |

## Matter 版本演进

| 版本 | 日期 | 新增设备类型 |
|------|------|------------|
| **v1.0** | 2022.10 | 灯、锁、传感器、窗帘、电视、桥接 |
| **v1.1** | 2023.05 | 增强和修复 |
| **v1.2** | 2023.10 | 扫地机器人、洗碗机、冰箱、空调、空气净化器 |
| **v1.3** | 2024.05 | 微波炉、烤箱、洗衣机、烘干机、EV充电、能源管理 |
| **v2.0** (预计) | 2025-26 | 摄像头、门铃、更多大家电 |

## 谁加入了 Matter？

| 角色 | 代表 |
|------|------|
| **平台** | Apple, Google, Amazon, Samsung |
| **芯片** | Nordic, Espressif, SiLabs, NXP, TI, Infineon |
| **品牌** | Philips Hue, IKEA, TP-Link, Eve, Nanoleaf, Aqara |
| **推动者** | CSA (原 Zigbee 联盟) |

> 几乎所有智能家居主要玩家都在支持 Matter。这是前所未有的行业共识。

## 相关笔记

- [[02-架构与协议栈]] — 技术内部的运作
- [[07-生态与认证]] — 产品如何获得 Matter 标识
