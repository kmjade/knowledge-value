---
title: Matter 知识库 README
tags: [matter, readme]
created: 2026-05-27
---

# Matter 知识库

> Matter —— 统一智能家居的开放标准
> 位于 IoT 知识库之下

## 快速导航

| 想看什么 | 点这里 |
|----------|--------|
| 全部总览 | [[Matter 知识库总览]] |
| 为什么需要 Matter | [[01-Matter概述]] |
| 协议栈/节点/端点/集群 | [[02-架构与协议栈]] |
| 灯/锁/传感器/家电 | [[03-设备类型与集群]] |
| DAC/PAKE配网/DCL | [[04-安全模型]] |
| Thread vs WiFi | [[05-Thread与WiFi]] |
| SDK/芯片/cluster | [[06-开发与实践]] |
| CSA/认证/Matter标识 | [[07-生态与认证]] |
| vs Zigbee/Z-Wave/HomeKit | [[08-竞争与对比]] |
| v2.0/摄像头/能源/AI | [[09-未来演进]] |
| 平台/SDK/工具 | [[Matter 资源收集]] |
| 常见误解 | [[Matter 常见问题]] |

## 目录结构

```
IoT/Matter/
├── README
├── 00-MOCs/
├── 01-Matter概述/      ← 智能家居巴别塔、v1.0→v1.3、四大承诺
├── 02-架构与协议栈/     ← Node/Endpoint/Cluster、Fabric多管理员
├── 03-设备类型与集群/   ← 灯/锁/传感器/窗帘/家电、OnOff/Level
├── 04-安全模型/         ← DAC设备身份证、PAKE配网、DCL分布式账本
├── 05-Thread与WiFi/     ← Mesh vs 星型、Border Router、低功耗
├── 06-开发与实践/       ← SDK、芯片选型、chip-tool调试、认证流程
├── 07-生态与认证/       ← CSA会员、认证测试、Matter标识、已上市产品
├── 08-竞争与对比/       ← vs Zigbee/Z-Wave/HomeKit、共存策略
├── 09-未来演进/         ← v2.0摄像头、能源管理、AI集成、挑战
└── 99-资源收集/
```

## 隶属关系

[[3 Resources/06 Applied Sciences/04-工程科技/Engineering/IoT/README|IoT]] → **Matter** 是 IoT 短距通信的应用层标准
