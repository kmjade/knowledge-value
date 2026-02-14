---
title: SDN軟體定義網絡
aliases:
  - Software Defined Networking
  - SDN
  - OpenFlow
  - NFV
para: resource
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/architecture
  - #topic/architecture/sdn
  - #protocol/openflow
  - #protocol/nfv
  - #layer/application
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/intermediate
  - #learning/review
created: 2026-02-15
updated: 2026-02-15
---

> [!summary] SDN軟體定義網絡概述
> SDN (Software Defined Networking) 是通過軟體控制和編程網絡的架構，將控制平面與數據平面分離。

---

## 📋 目錄

- [SDN基礎](#sdn基礎)
- [SDN架構](#sdn架構)
- [OpenFlow協議](#openflow協議)
- [NFV](#nfv)
- [SDN應用場景](#sdn應用場景)

---

## 🏗️ SDN基礎

### 定義

SDN 是一種網路架構理念，將網絡設備的控制邏輯從硬體中分離出來，集中到控制器軟體中。

### 傳統網路 vs SDN

| 特性 | 傳統網路 | SDN |
|------|----------|-----|
| 控制位置 | 分布在各設備中 | 集中在控制器 |
| 配置方式 | 命令行每個設備 | 通過API統一配置 |
| 靈活性 | 低，重新配置慢 | 高，動態調整 |
| 可編程性 | 無 | 支持 |
| 設備類型 | 黑盒 | 白盒/白盒 |

### SDN目標

1. **集中控制**：統一管理整個網絡
2. **可編程性**：通過API自動化網絡配置
3. **敏捷性**：快速響應業務需求變化
4. **降低成本**：使用商業硬體和開源軟體

---

## 🏢 SDN架構

### 經典SDN架構

```
┌─────────────────────────────────────────────┐
│           應用程式層                │
├─────────────────────────────────────────────┤
│   SDN應用程式 (北向)                │
│   (SDN Applications)                  │
├─────────────────────────────────────────────┤
│   SDN控制器 (南向API)               │
│   (SDN Controller)                    │
├─────────────────────────────────────────────┤
│   數據平面 (南向)                  │
│   (Data Plane)                        │
│   ├─ OpenFlow Switches                │
│   ├─ OVS (Open vSwitch)              │
│   └─ SDN-enabled Network Devices       │
└─────────────────────────────────────────────┘
```

### 平面分離

**控制平面 (Control Plane)**：
- 負責網絡拓撲和路由
- 運行在控制器中
- 通過南向API與數據平面通信

**數據平面 (Data Plane)**：
- 負責根據控制平面指令轉發數據包
- 運行在交換機/路由器中
- 實現OpenFlow或其他協議

### SDN控制器

| 控制器 | 特點 |
|--------|------|
| OpenDaylight | 開源，模塊化 |
| ONOS | 開源，企業級 |
| Floodlight | 輕量級，易於開發 |
| Ryu | Python框架，易於擴展 |

---

## 🔄 OpenFlow協議

### 定義

OpenFlow 是SDN的南向協議，用於控制器與交換機之間通信。

### OpenFlow消息類型

| 類型 | 說明 |
|------|------|
| Controller-to-Switch | 控制器發送到交換機 |
| Switch-to-Controller | 交換機發送到控制器 |
| Asynchronous | 異步消息 |

### OpenFlow流表

```
流表項目格式：
匹配規則 (Priority + Match Fields)
    ↓
動作集合 (Actions)
    ↓
計數器 (Counters)
    ↓
過期時間 (Timeouts)
```

**匹配字段**：
- 入端口
- 以太網源/目的MAC
- 以太網類型
- VLAN ID
- IP源/目的地址
- IP協議類型
- TCP/UDP源/目的端口

**動作**：
- 轉發到端口
- 封裝到VLAN
- 修改TTL
- 轉發到控制器
- 丟棄

---

## 📦 NFV

### 定義

NFV (Network Functions Virtualization) 是將網絡功能（如路由、防火牆、負載均衡）虛擬化為軟體。

### VNF (Virtual Network Functions)

**VNF類型**：

| VNF | 功能 |
|-----|------|
| vRouter | 虛擬路由器 |
| vFirewall | 虛擬防火牆 |
| vLB | 虛擬負載均衡 |
| vWAN | 虛擬WAN優化 |
| vDPI | 虛擬深度包檢測 |

### MANO (Management and Orchestration)

**定義**：MANO是NFV的管理和編排系統。

**MANO組件**：
- **Orchestrator**：虛擬資源的生命週期管理
- **VNF Manager**：VNF實例的管理
- **Virtualized Infrastructure Manager**：計算/存儲/網絡資源管理

### NFVI (NFV Infrastructure)

**定義**：NFVI是承載VNF的虛擬化基礎設施。

**NFVI組成**：
- 商業現成品（COTS）硬體
- 虛擬層（Hypervisor, Container Runtime）
- 虛擬網絡層

---

## 🎯 SDN應用場景

### 數據中心網絡

**應用**：
- 自動配置虛擬機之間連接
- 貢載均衡流量分佈
- 網絡功能虛擬化

**優勢**：
- 快速部署新服務
- 靈活擴展網絡容量
- 降低硬體成本

### 企業園區網絡

**應用**：
- 統一管理多個樓宇網絡
- 基於策略的訪問控制
- 動態調整網絡拓撲

**優勢**：
- 簡化運維
- 提高安全性
- 快速響應用戶需求

### 運營商網絡

**應用**：
- 流量工程和優化
- 動態帶寬分配
- 服務鏈路創建

**優勢**：
- 提高資源利用率
- 快速推出新業務
- 降低運維成本

### 5G移動網絡

**應用**：
- 網絡切片（Network Slicing）
- 動態資源分配
- MEC (Multi-access Edge Computing)

**優勢**：
- 支持不同業務SLA
- 低延遲服務
- 邊緣計算集成

---

## 💡 實踐示例

### Mininet (SDN模擬器)

```bash
# 創建簡單拓撲
sudo mn --topo single,3

# 創建自定義拓撲
sudo mn --custom customtopo.py

# 使用OpenFlow控制器
sudo mn --controller=remote,ip=controllerIP,port=6633
```

### Ryu控制器

```python
from ryu.base import app_manager
from ryu.controller import ofp_event

class SimpleSwitch(app_manager.RyuApp):
    OFP_VERSIONS = [ofp_event.OFPVersion13]

    @set_ev_cls(ofp_event.EventOFPPacketIn)
    def _packet_in_handler(self, ev):
        # 處理數據包
        pass
```

---

## 📝 學習檢查清單

- [ ] 理解SDN的核心概念和目標
- [ ] 掌握SDN的架構和平面分離
- [ ] 了解OpenFlow協議和流表機制
- [ ] 理解NFV和VNF的概念
- [ ] 了解MANO和NFVI的組成
- [ ] 能夠識別SDN的應用場景
- [ ] 了解主流的SDN控制器和開源項目

---

## 🔗 相關連結

- 🔙 [[03-網絡架構|返回網絡架構]]
- ☁️ [[雲端計算網絡]]
- 🏗️ [[SDN軟體定義網絡]]
- 🛠️ [[網絡診斷工具]]
