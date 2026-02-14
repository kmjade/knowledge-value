---
title: "網絡技術知識庫標籤系統規範"
created: 2026-02-15
tags:
  - #system/template
  - #system/navigation
  - #topic/networking
aliases:
  - 網絡技術標籤系統
  - networking-tag-system
---

# 網絡技術知識庫標籤系統規範

> [!info] 概述
> 本規範定義了網絡技術知識庫的統一標籤體系，採用4層標籤結構，中英文對照，提升檢索效率和導航體驗。

---

## 標籤體系架構

```
┌─────────────────────────────────────────────────────────────────┐
│               網絡技術知識庫標籤體系（4層結構）                  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   PARA 核心              網絡技術標籤              元數據標籤
   分類體系               主分類體系               輔助分類體系
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   │         │           │         │           │         │
 #para   #topic      #protocol   #layer     #learning #difficulty
 #type                #topic
 #zettel              #system
```

---

## 一、4層標籤結構規範

### 1.1 標籤層級定義

```
category/type/specific/instance

示例：
category  → #topic
type       → #topic/networking
specific   → #topic/networking/security
instance   → #topic/networking/security/cryptography
```

### 1.2 層級深度規則

- **最少2層**：必須包含 `category` 和 `type`
- **最多4層**：深入細化到實例級別
- **標準深度**：大多數標籤使用2-3層

### 1.3 標籤命名規則

| 規則 | 說明 | 示例 |
|------|------|------|
| 小寫字母 | 統一使用小寫 | `#topic/networking` 而非 `#Topic/Networking` |
| 連字符分隔 | 使用 `-` 分隔單詞 | `#topic/network-security` |
| 斜槓分層 | 使用 `/` 分層 | `#topic/networking/security/cryptography` |
| 英文為主 | 英文標籤作為主鍵 | `#protocol/http` |
| 語義明確 | 標籤名有明確含義 | `#learning/mastered` |
| 避免重複 | 避免語義重複 | 不同時使用 `#active` 和 `#in-progress` |

---

## 二、PARA 核心分類（保持現有）

### 2.1 PARA 標籤結構

```yaml
#para/
├── #para/area/          # 領域
├── #para/project/       # 項目
├── #para/resource/      # 資源（網絡技術知識庫使用）
└── #para/archive/       # 歸檔
```

### 2.2 網絡技術知識庫使用

```yaml
#para/resource/             # 資源
├── #para/resource/tech     # 技術資源（網絡技術知識庫主標籤）
```

**使用場景**：所有網絡技術知識庫文件必須包含 `#para/resource/tech`。

**示例**：
```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
---
```

---

## 三、內容類型分類（type - 新增）

### 3.1 Type 標籤結構

```yaml
#type/
├── #type/concept         # 概念性筆記
├── #type/guide           # 指導性內容
├── #type/reference       # 參考資料
├── #type/tutorial        # 教程
├── #type/template        # 模板
├── #type/documentation   # 文檔
├── #type/summary         # 總結
├── #type/example         # 示例
├── #type/case-study      # 案例研究
└── #type/moc             # 內容地圖（MOC）
```

### 3.2 Type 標籤說明

| 標籤 | 說明 | 使用場景 |
|------|------|----------|
| `#type/concept` | 概念性筆記 | 定義、原理、基礎理論 |
| `#type/guide` | 指導性內容 | 操作步驟、最佳實踐、故障排查 |
| `#type/reference` | 參考資料 | 命令手冊、參數列表、協議規範 |
| `#type/tutorial` | 教程 | 學習教程、逐步指南 |
| `#type/template` | 模板 | 可重用的筆記模板 |
| `#type/documentation` | 文檔 | 官方文檔、技術規範 |
| `#type/summary` | 總結 | 學習心得、知識梳理 |
| `#type/example` | 示例 | 實際示例、代碼片段 |
| `#type/case-study` | 案例研究 | 實戰案例分析 |
| `#type/moc` | 內容地圖 | MOC 文件，組織和索引內容 |

**使用場景**：所有文件必須包含一個 `#type/` 標籤。

**示例**：
```yaml
---
tags:
  - #type/concept        # 概念性筆記（OSI模型）
  - #type/guide          # 指導性內容（故障排查）
  - #type/tutorial       # 教程（協議學習模板）
  - #type/moc            # 內容地圖（MOC-總覽）
---
```

---

## 四、主題分類（topic - 優化）

### 4.1 Topic 標籤結構

```yaml
#topic/
├── #topic/basics              # 基礎理論
├── #topic/protocols           # 協議
├── #topic/layers             # 分層（替換 #topic/protocol-stack）
├── #topic/architecture       # 架構（替換 #topic/network-topology）
├── #topic/security           # 安全
├── #topic/management         # 管理
├── #topic/tools             # 工具（替換 #topic/practical-tools）
└── #topic/troubleshooting    # 故障排查
```

### 4.2 Topic 標籤層級化

```yaml
#topic/security/            # 安全（可進一步分層）
├── #topic/security/basics        # 安全基礎
├── #topic/security/cryptography  # 加密技術
├── #topic/security/attacks       # 攻擊與防禦
└── #topic/security/vpn           # VPN

#topic/management/          # 管理（可進一步分層）
├── #topic/management/monitoring  # 監控
├── #topic/management/optimization # 優化
└── #topic/management/automation   # 自動化

#topic/tools/              # 工具（可進一步分層）
├── #topic/tools/diagnostic      # 診斷工具
├── #topic/tools/analysis         # 分析工具
└── #topic/tools/configuration    # 配置工具
```

### 4.3 Topic 標籤說明

| 標籤 | 說明 | 典型文件 |
|------|------|----------|
| `#topic/basics` | 基礎理論 | OSI模型、TCP/IP協議棧 |
| `#topic/protocols` | 協議 | HTTP協議、TCP協議深入 |
| `#topic/layers` | 網絡分層 | OSI七層模型、TCP IP協議棧 |
| `#topic/architecture` | 網絡架構 | 局域網、廣域網、SDN |
| `#topic/security` | 安全 | 網絡安全基礎、加密與認證 |
| `#topic/management` | 管理 | 網絡監控、故障排查 |
| `#topic/tools` | 工具 | 網絡診斷工具、封包分析工具 |
| `#topic/troubleshooting` | 故障排查 | 故障排查、問題記錄 |

**使用場景**：所有網絡技術知識庫文件必須包含 `#topic/networking` 和相關的子主題標籤。

**示例**：
```yaml
---
tags:
  - #topic/networking
  - #topic/basics               # 基礎理論
  - #topic/layers               # 分層
  - #topic/security/basics      # 安全基礎（層級化）
  - #topic/management/monitoring # 監控（層級化）
---
```

---

## 五、學習狀態標籤（learning - 新增）

### 5.1 Learning 標籤結構

```yaml
#learning/
├── #learning/new           # 新學習
├── #learning/progress      # 學習中
├── #learning/review        # 複習中
├── #learning/mastered      # 已掌握
└── #learning/archived      # 已歸檔
```

### 5.2 Learning 標籤說明

| 標籤 | 說明 | 更新時機 |
|------|------|----------|
| `#learning/new` | 新學習 | 剛開始學習的內容 |
| `#learning/progress` | 學習中 | 正在深入學習的內容 |
| `#learning/review` | 複習中 | 需要定期複習的內容 |
| `#learning/mastered` | 已掌握 | 完全理解並能應用的內容 |
| `#learning/archived` | 已歸檔 | 已掌握但暫時不需要使用的內容 |

**學習狀態轉換**：
```
new → progress → review → mastered → archived
           ↓           ↓
         progress ← review
```

**使用場景**：所有文件必須包含一個 `#learning/` 標籤。

**示例**：
```yaml
---
tags:
  - #learning/new           # 剛開始學習
  - #learning/progress      # 正在學習中
  - #learning/review        # 需要複習
  - #learning/mastered      # 已掌握
---
```

---

## 六、難度等級標籤（difficulty - 新增）

### 6.1 Difficulty 標籤結構

```yaml
#difficulty/
├── #difficulty/beginner     # 入門級
├── #difficulty/intermediate # 中級
└── #difficulty/advanced      # 高級
```

### 6.2 Difficulty 標籤說明

| 標籤 | 說明 | 典型文件 |
|------|------|----------|
| `#difficulty/beginner` | 入門級 | OSI模型、網路拓撲結構 |
| `#difficulty/intermediate` | 中級 | HTTP協議、TCP協議深入 |
| `#difficulty/advanced` | 高級 | SDN軟體定義網絡、加密與認證 |

**難度評估指南**：

#### 入門級（Beginner）
- 內容：基礎概念、入門知識
- 前置知識：無需前置知識
- 學習時間：1-2小時
- 示例：OSI模型、網路拓撲結構

#### 中級（Intermediate）
- 內容：核心協議、技術細節
- 前置知識：了解基礎概念
- 學習時間：3-5小時
- 示例：HTTP協議、TCP協議深入

#### 高級（Advanced）
- 內容：進階架構、複雜技術
- 前置知識：掌握核心協議
- 學習時間：5+小時
- 示例：SDN軟體定義網絡、加密與認證

**使用場景**：所有文件必須包含一個 `#difficulty/` 標籤。

**示例**：
```yaml
---
tags:
  - #difficulty/beginner     # 入門級
  - #difficulty/intermediate # 中級
  - #difficulty/advanced      # 高級
---
```

---

## 七、網絡協議分類（protocol - 保持）

### 7.1 Protocol 標籤結構

```yaml
#protocol/           # 協議
├── #protocol/osi      # OSI協議
├── #protocol/tcp-ip   # TCP/IP協議棧
├── #protocol/http     # HTTP協議
├── #protocol/https    # HTTPS協議
├── #protocol/tcp      # TCP協議
├── #protocol/udp      # UDP協議
├── #protocol/ip       # IP協議
├── #protocol/ipv4     # IPv4協議
├── #protocol/ipv6     # IPv6協議
├── #protocol/icmp     # ICMP協議
├── #protocol/arp      # ARP協議
├── #protocol/dns      # DNS協議
├── #protocol/dhcp     # DHCP協議
├── #protocol/smtp     # SMTP協議
├── #protocol/pop3     # POP3協議
├── #protocol/imap     # IMAP協議
├── #protocol/ssh      # SSH協議
├── #protocol/telnet   # Telnet協議
├── #protocol/ftp      # FTP協議
├── #protocol/ssl-tls  # SSL/TLS協議
├── #protocol/vlan     # VLAN協議
├── #protocol/stp      # STP協議
├── #protocol/rstp     # RSTP協議
├── #protocol/mstp     # MSTP協議
├── #protocol/vrrp     # VRRP協議
├── #protocol/hsrp     # HSRP協議
├── #protocol/snmp     # SNMP協議
├── #protocol/bgp      # BGP協議
├── #protocol/ospf     # OSPF協議
├── #protocol/rip      # RIP協議
├── #protocol/lan      # LAN協議
├── #protocol/wan      # WAN協議
├── #protocol/vpn      # VPN協議
├── #protocol/ipsec    # IPSec協議
├── #protocol/firewall # 防火牆協議
├── #protocol/ethernet # 以太網協議
├── #protocol/wifi     # Wi-Fi協議
├── #protocol/802-11   # 802.11協議
├── #protocol/switch   # 交換機協議
├── #protocol/openflow # OpenFlow協議
└── #protocol/nfv      # NFV協議
```

### 7.2 Protocol 標籤說明

**使用場景**：涉及具體網絡協議的文件必須包含相應的 `#protocol/` 標籤。

**示例**：
```yaml
---
tags:
  - #protocol/http           # HTTP協議
  - #protocol/https          # HTTPS協議
  - #protocol/tcp            # TCP協議
  - #protocol/udp            # UDP協議
  - #protocol/ssl-tls        # SSL/TLS協議
  - #protocol/vlan           # VLAN協議
  - #protocol/stp            # STP協議
  - #protocol/snmp           # SNMP協議
  - #protocol/vpn            # VPN協議
  - #protocol/ipsec          # IPSec協議
  - #protocol/firewall       # 防火牆協議
  - #protocol/ethernet       # 以太網協議
  - #protocol/wifi           # Wi-Fi協議
  - #protocol/switch         # 交換機協議
  - #protocol/openflow       # OpenFlow協議
  - #protocol/nfv            # NFV協議
  - #protocol/osi            # OSI協議
  - #protocol/tcp-ip         # TCP/IP協議棧
  - #protocol/ip             # IP協議
  - #protocol/ipv4           # IPv4協議
  - #protocol/ipv6           # IPv6協議
  - #protocol/icmp           # ICMP協議
  - #protocol/arp            # ARP協議
  - #protocol/dns            # DNS協議
  - #protocol/dhcp           # DHCP協議
  - #protocol/smtp           # SMTP協議
  - #protocol/pop3           # POP3協議
  - #protocol/imap           # IMAP協議
  - #protocol/ssh            # SSH協議
  - #protocol/telnet         # Telnet協議
  - #protocol/ftp            # FTP協議
  - #protocol/rstp           # RSTP協議
  - #protocol/mstp           # MSTP協議
  - #protocol/vrrp           # VRRP協議
  - #protocol/hsrp           # HSRP協議
  - #protocol/bgp            # BGP協議
  - #protocol/ospf           # OSPF協議
  - #protocol/rip            # RIP協議
  - #protocol/lan            # LAN協議
  - #protocol/wan            # WAN協議
  - #protocol/802-11         # 802.11協議
---
```

---

## 八、網絡分層（layer - 保持）

### 8.1 Layer 標籤結構

```yaml
#layer/
├── #layer/application   # 應用程式層（Layer 7）
├── #layer/presentation # 表示層（Layer 6）
├── #layer/session      # 會話層（Layer 5）
├── #layer/transport    # 傳輸層（Layer 4）
├── #layer/network      # 網路層（Layer 3）
├── #layer/data-link    # 數據鏈路層（Layer 2）
└── #layer/physical     # 物理層（Layer 1）
```

### 8.2 Layer 標籤說明

**使用場景**：涉及網絡分層的文件必須包含相應的 `#layer/` 標籤。

**示例**：
```yaml
---
tags:
  - #layer/application    # 應用程式層
  - #layer/presentation  # 表示層
  - #layer/session       # 會話層
  - #layer/transport     # 傳輸層
  - #layer/network       # 網路層
  - #layer/data-link     # 數據鏈路層
  - #layer/physical      # 物理層
---
```

---

## 九、標籤映射表（舊標籤 → 新標籤）

### 9.1 需要替換的標籤

```yaml
舊標籤                         → 新標籤
#topic/protocol-stack          → #topic/layers
#topic/network-topology        → #topic/architecture
#topic/network-security        → #topic/security
#topic/security-basics         → #topic/security/basics（層級化）
#topic/network-monitoring      → #topic/management/monitoring（層級化）
#topic/practical-tools         → #topic/tools
#topic/diagnostic-tools        → #topic/tools/diagnostic（層級化）
#topic/automation              → #topic/management/automation（層級化）
#topic/cryptography           → #topic/security/cryptography（層級化）
#topic/attacks                → #topic/security/attacks（層級化）
#topic/cloud                 → #topic/architecture/cloud（層級化）
#topic/sdn                   → #topic/architecture/sdn（層級化）
#topic/subnetting             → 保留（已在topic下）
#type/protocol-learning       → #type/tutorial（更準確）
#type/troubleshooting         → #type/guide（更準確）
```

### 9.2 保留的標籤（無需修改）

```yaml
#para/resource/tech
#topic/networking
#type/concept
#type/guide
#type/documentation
#zettel/type/permanent
#zettel/type/structure
#system/moc
#system/template
#system/index
#system/note
#protocol/[所有現有協議]
#layer/[所有現有分層]
```

---

## 十、標籤使用示例

### 10.1 基礎知識文件標籤示例

**文件**：`OSI七層模型.md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/basics          # 基礎理論
  - #topic/layers          # 分層
  - #protocol/osi
  - #layer/application
  - #layer/presentation
  - #layer/session
  - #layer/transport
  - #layer/network
  - #layer/data-link
  - #layer/physical
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

### 10.2 核心協議文件標籤示例

**文件**：`HTTP協議.md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/protocols       # 協議
  - #protocol/http
  - #protocol/https
  - #layer/application
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/intermediate # 中級
  - #learning/mastered      # 已掌握
---
```

### 10.3 網絡架構文件標籤示例

**文件**：`局域網(LAN).md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/architecture     # 架構
  - #protocol/lan
  - #layer/data-link
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

### 10.4 網絡安全文件標籤示例

**文件**：`網絡安全基礎.md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/security        # 安全
  - #topic/security/basics # 安全基礎（層級化）
  - #type/concept
  - #zettel/type/permanent
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

### 10.5 網絡管理文件標籤示例

**文件**：`網絡監控.md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/management      # 管理
  - #topic/management/monitoring # 監控（層級化）
  - #protocol/snmp
  - #type/guide
  - #zettel/type/permanent
  - #difficulty/intermediate # 中級
  - #learning/review        # 複習中
---
```

### 10.6 實踐工具文件標籤示例

**文件**：`網絡診斷工具.md`

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #topic/tools            # 工具
  - #topic/tools/diagnostic # 診斷工具（層級化）
  - #type/guide
  - #zettel/type/permanent
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

### 10.7 模板文件標籤示例

**文件**：`協議學習模板.md`

```yaml
---
tags:
  - #system/template
  - #type/tutorial         # 教程（替換 #type/protocol-learning）
  - #zettel/type/structure
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

### 10.8 筆記文件標籤示例

**文件**：`學習心得.md`

```yaml
---
tags:
  - #system/note
  - #topic/networking
  - #type/summary         # 總結（替換 #type/documentation）
  - #zettel/type/structure
  - #difficulty/beginner   # 入門級
  - #learning/progress      # 學習中
---
```

### 10.9 MOC 文件標籤示例

**文件**：`MOC-總覽.md`

```yaml
---
tags:
  - #system/moc
  - #topic/networking
  - #type/moc              # 內容地圖
  - #zettel/type/structure
  - #difficulty/beginner   # 入門級
  - #learning/mastered      # 已掌握
---
```

---

## 十一、標籤檢查清單

### 11.1 必須包含的標籤

所有網絡技術知識庫文件必須包含：

- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`
- [ ] `#type/[類型]`
- [ ] `#zettel/type/[卡片類型]`

### 11.2 可選的標籤

- [ ] `#protocol/[具體協議]`（涉及協議時）
- [ ] `#layer/[具體分層]`（涉及分層時）
- [ ] `#topic/[子主題]`（根據內容選擇）
- [ ] `#system/[系統功能]`（MOC、模板等）

### 11.3 標籤格式檢查

- [ ] 所有標籤使用小寫
- [ ] 使用連字符分隔單詞
- [ ] 使用斜槓分層
- [ ] 標籤層級深度在2-4層
- [ ] 英文標籤為主標籤
- [ ] 無語義重複標籤

---

## 十二、學習狀態和難度評估指南

### 12.1 學習狀態評估

**#learning/new**：剛開始學習
- 剛創建的筆記
- 還在理解基本概念
- 需要進一步研究

**#learning/progress**：學習中
- 已理解基本概念
- 正在深入研究細節
- 需要實踐驗證

**#learning/review**：複習中
- 已理解大部分內容
- 需要定期複習以保持記憶
- 計劃進一步深入

**#learning/mastered**：已掌握
- 完全理解並能應用
- 可以向他人解釋
- 能夠解決相關問題

**#learning/archived**：已歸檔
- 已掌握但暫時不需要使用
- 保留作為參考
- 可隨時重新激活

### 12.2 難度等級評估

**#difficulty/beginner**：入門級
- 內容：基礎概念、入門知識
- 前置知識：無需前置知識
- 學習時間：1-2小時
- 典型文件：OSI模型、網路拓撲結構

**#difficulty/intermediate**：中級
- 內容：核心協議、技術細節
- 前置知識：了解基礎概念
- 學習時間：3-5小時
- 典型文件：HTTP協議、TCP協議深入

**#difficulty/advanced**：高級
- 內容：進階架構、複雜技術
- 前置知識：掌握核心協議
- 學習時間：5+小時
- 典型文件：SDN軟體定義網絡、加密與認證

---

## 十三、快速查詢表

### 13.1 標籤快速查詢

| 查詢需求 | 使用標籤 |
|----------|----------|
| 所有基礎知識 | `#topic/basics` |
| 所有協議 | `#topic/protocols` |
| 所有安全相關 | `#topic/security` |
| 所有管理相關 | `#topic/management` |
| 所有工具 | `#topic/tools` |
| 所有入門級內容 | `#difficulty/beginner` |
| 所有已掌握內容 | `#learning/mastered` |
| 所有教程 | `#type/tutorial` |
| 所有MOC | `#type/moc` |

### 13.2 文件類型查詢

| 查詢需求 | 使用標籤 |
|----------|----------|
| 所有概念筆記 | `#type/concept` |
| 所有指南 | `#type/guide` |
| 所有教程 | `#type/tutorial` |
| 所有模板 | `#type/template` |
| 所有總結 | `#type/summary` |

---

## 十四、相關文檔

- [[tag-system-guide.md]] - 主標籤系統指南
- [[tag-validation-checklist.md]] - 標籤驗證清單
- [[示例筆記-Zettelkasten標準使用]] - Zettelkasten標準使用示例

---

## 十五、實施注意事項

1. **新筆記使用新規範**：新創建的筆記應直接使用本規範
2. **舊筆記逐步遷移**：可選擇性地更新舊筆記的標籤
3. **保持一致性**：同一類型的文件使用相同的標籤組合
4. **定期檢查**：定期檢查標籤使用情況，及時修正不一致
5. **使用aliases**：通過 `aliases` 字段實現中文搜索便利性

---

**文檔資訊**
- 創建時間：2026-02-15
- 最後更新：2026-02-15
- 文檔類型：標籤系統規範
- 適用範圍：網絡技術知識庫
