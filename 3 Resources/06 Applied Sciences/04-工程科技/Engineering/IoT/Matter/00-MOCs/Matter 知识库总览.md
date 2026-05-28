---
title: Matter 知识库总览
tags: [matter/moc, smart-home, iot, resources]
created: 2026-05-27
aliases: [Matter MOC, Matter协议, 智能家居标准]
---

# Matter 知识库总览

> Matter 是 CSA（连接标准联盟，原 Zigbee 联盟）2022 年发布的智能家居统一应用层协议。愿景：一个 Matter 标识意味着任何品牌的设备都能跨生态协作——Apple Home、Google Home、Amazon Alexa、Samsung SmartThings 互通。

## 之前 vs 之后

```
之前:
  Apple Home ←HomeKit→ Apple 设备
  Google Home ←Weave→ Google 设备
  Amazon Alexa ←Zigbee/BLE→ 合作设备
  (三套生态互不打通)

之后 (Matter):
  任何 Matter 设备 → 同时接入 Apple/Google/Amazon/Samsung
```

## 知识库结构

- [[Matter 学习路径]]
- [[01-Matter概述]] — 为什么需要、解决什么问题、v1.0→v1.3
- [[02-架构与协议栈]] — 应用层/传输层/IP层
- [[03-设备类型与集群]] — 灯/锁/传感器/窗帘/家电
- [[04-安全模型]] — 设备认证、分布式合规 ledger
- [[05-Thread与WiFi]] — 两种传输层的选择
- [[06-开发与实践]] — SDK、认证流程、调试
- [[07-生态与认证]] — CSA、认证流程、Matter 标识
- [[08-竞争与对比]] — vs Zigbee/Z-Wave/HomeKit/私有协议
- [[09-未来演进]] — Matter 2.0、家电/能源/摄像头
- [[Matter 资源收集]] — 芯片平台、SDK、工具
- [[Matter 常见问题]]

## 核心承诺

| 承诺 | 含义 |
|------|------|
| **简单** | 扫码即可添加设备——和加微信好友一样简单 |
| **互操作** | 任何品牌、任何平台——互操作开箱即用 |
| **可靠** | 本地控制——断网也能用 |
| **安全** | 银行级安全——认证+加密+安全更新 |

## 相关笔记

- [[../03-短距离通信/03-短距离通信|IoT·短距通信]] — Thread/WiFi 详解
- [[../07-IoT安全/07-IoT安全|IoT安全]] — 安全模型的放大版
