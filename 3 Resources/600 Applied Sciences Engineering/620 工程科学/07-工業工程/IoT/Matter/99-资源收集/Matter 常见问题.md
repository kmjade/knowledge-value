---
title: Matter 常见问题
tags: [matter, faq]
created: 2026-05-27
---

# Matter 常见问题

| ❌ 误解 | ✅ 事实 |
|---------|---------|
| Matter 替代 Zigbee | Matter 是应用层，Thread/WiFi 是传输层。Zigbee 是应用+传输一体。Matter 和 Zigbee 会共存——Matter 解决互操作，Zigbee 继续在现有设备中运行 |
| Matter = Thread | Matter 可以在 Thread 上跑，也可以在 WiFi 和以太网上跑——三种传输 |
| 所有智能家居设备都支持 Matter | 目前 v1.3 覆盖了灯、锁、传感器、窗帘、电视等——摄像头、扫地机器人、大家电在后续版本 |
| Matter 设备都互操作 | 前提是通过 Matter 认证——必须通过 CSA 测试 |
| Matter = 云端 | Matter 是本地优先——设备之间本地通信，不需要云。远程控制需要通过 Matter Controller（通常是智能音箱/网关） |
| 老设备不能升级到 Matter | 部分 Zigbee 设备可以通过网关桥接到 Matter——如 Hue Bridge 升级后 Matter 支持 |
