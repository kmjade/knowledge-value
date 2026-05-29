---
title: "標籤系統使用指南"
created: 2026-02-11
updated: 2026-02-15
tags:
  - #system/template
  - #system/navigation
aliases:
  - 標籤系統
  - tag-system
---

# 標籤系統使用指南

> [!info] 概述
> 本指南定義了 Obsidian vault 中統一的標籤體系，涵蓋 PARA、Zettelkasten、報告、系統功能和專用知識庫等各個維度。

---

## 標籤體系架構

```
┌─────────────────────────────────────────────────────────────────┐
│                    統一標籤體系                        │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   PARA 核心               專用知識庫             通用功能
   標籤體系                標籤系統                輔助標籤
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   │         │           │         │           │         │
 #para   #status   #type   #system   #report  #zettel
           #priority  #topic   #workflow
                     #discipline  #method
```

---

## 一、PARA 核心標籤體系

PARA 標籤以 `#para/` 為前綴，使用英文命名，用於組織和分類筆記。

### 1.1 Area (領域) 標籤

```
#para/area/                # 領域
├── #para/area/health       # 健康
├── #para/area/career       # 職業發展
├── #para/area/finance      # 財務管理
├── #para/area/relationships # 人際關係
├── #para/area/learning     # 學習成長
└── #para/area/lifestyle   # 生活方式
```

**使用場景**：記錄某個領域相關的知識、資源和思考，不依賴特定項目。

**示例**：
```yaml
---
tags:
  - #para/area/health
  - #zettel/type/permanent
aliases:
  - 健康領域
  - 健康
---
```

### 1.2 Project (項目) 標籤

```
#para/project/              # 項目
├── #para/project/work       # 工作項目
├── #para/project/learning   # 學習項目
├── #para/project/personal   # 個人項目
└── #para/project/creative  # 創作項目
```

**使用場景**：追蹤具有明確目標和時間限制的項目。

**示例**：
```yaml
---
tags:
  - #para/project/work
  - #status/active
  - #priority/high
aliases:
  - 工作項目
---
```

### 1.3 Resource (資源) 標籤

```
#para/resource/             # 資源
├── #para/resource/tech     # 技術資源
│   └── #para/resource/tech/programming # 編程
│       ├── #para/resource/tech/programming/python
│       └── #para/resource/tech/programming/mql
├── #para/resource/learning # 学习资源
├── #para/resource/productivity # 生产力资源
├── #para/resource/interest # 兴趣资源
└── #para/resource/reference # 参考资料
```

**使用场景**：存储可重用的参考资料、工具和资源。

**示例**：
```yaml
---
tags:
  - #para/resource/tech
  - #para/resource/tech/programming/python
aliases:
  - 技术资源
  - Python编程
---
```

### 1.4 Archive (归档) 标签

```
#para/archive/              # 归档
├── #para/archive/completed  # 已完成
├── #para/archive/on-hold   # 搁置
└── #para/archive/cancelled # 取消
```

**使用场景**：标记已完成或不再活跃的内容。

---

## 二、状态标签

状态标签用于表示笔记或项目的当前状态。

```
#status/                         # 状态根标签
├── #status/active               # 进行中
├── #status/on-hold             # 搁置中
├── #status/completed           # 已完成
├── #status/cancelled          # 已取消
├── #status/planning            # 计划中
└── #status/review             # 待审核
```

**使用场景**：与 PARA 项目标签结合使用，跟踪项目进度。

---

## 三、优先级标签

优先级标签用于标记任务或项目的重要性。

```
#priority/                       # 优先级根标签
├── #priority/high              # 高优先级
├── #priority/medium           # 中优先级
├── #priority/low              # 低优先级
└── #priority/urgent           # 紧急
```

**使用场景**：与项目标签结合使用，帮助确定工作优先顺序。

---

## 四、专用知识库标签

专用知识库标签纳入主标签体系，具有特定用途。

### 4.1 Type (內容類型) - 專用知識庫

```
#type/                          # 內容類型
├── #type/concept               # 概念性筆記
├── #type/clinical              # 臨床相關
├── #type/research              # 研究性內容
├── #type/treatment             # 治療方案
├── #type/moc                   # 內容地圖
├── #type/template              # 模板
├── #type/reference             # 參考資料
├── #type/guide                 # 指導性內容
├── #type/summary               # 總結性內容
├── #type/tutorial              # 教程（網絡技術知識庫）
├── #type/example               # 示例
├── #type/case-study            # 案例研究
└── #type/documentation         # 文檔
```

### 4.2 Topic (主題分類) - 專用知識庫

```
#topic/                         # 主題分類
├── #topic/basics                # 基礎理論
├── #topic/anatomy               # 解剖相關
├── #topic/physiology            # 生理學
├── #topic/diagnosis             # 診斷學
├── #topic/treatment            # 治療
├── #topic/networking           # 網絡技術主題
├── #topic/protocols            # 協議主題
├── #topic/layers              # 網絡分層主題
├── #topic/architecture        # 網絡架構主題
├── #topic/security            # 安全主題
├── #topic/management          # 管理主題
├── #topic/tools               # 工具主題
├── #topic/subnetting          # 子網劃分主題
└── #topic/troubleshooting     # 故障排查主題
```

### 4.3 Discipline (学科分类) - 耳穴知识库

```
#discipline/                    # 学科分类
├── #discipline/tcm             # 中医学
└── #discipline/western-medicine # 西医学
```

### 4.4 Method (研究方法) - 耳穴知识库

```
#method/                        # 研究方法
├── #method/clinical-trial      # 临床试验
└── #method/rct                 # 随机对照试验
```

### 4.5 Yixue (易学知识库)

```
#yixue/                         # 易学知识库
├── #yixue/basics/              # 基础概念
├── #yixue/hexagram/            # 六十四卦
├── #yixue/philosophy/          # 哲学思想
├── #yixue/application/         # 实践应用
└── #yixue/divination/          # 占卜方法
```

### 4.6 Protocol (协议分类) - 网络技术知识库

```
#protocol/                       # 协议分类
├── #protocol/os                # OSI 协议
├── #protocol/tcp-ip            # TCP/IP 协议栈
├── #protocol/http              # HTTP/HTTPS 协议
├── #protocol/tcp               # TCP 协议
├── #protocol/udp               # UDP 协议
├── #protocol/ip                # IP 协议
├── #protocol/icmp              # ICMP 协议
├── #protocol/arp               # ARP 协议
├── #protocol/dns               # DNS 协议
├── #protocol/smtp              # SMTP 协议
├── #protocol/dhcp              # DHCP 协议
├── #protocol/ssh               # SSH 协议
├── #protocol/ssl-tls           # SSL/TLS 协议
├── #protocol/vlan              # VLAN 协议
├── #protocol/stp               # STP 生成树协议
├── #protocol/snmp              # SNMP 网络管理协议
├── #protocol/bgp               # BGP 路由协议
├── #protocol/ospf              # OSPF 路由协议
├── #protocol/rip               # RIP 路由协议
├── #protocol/lan               # LAN 局域网
└── #protocol/switch            # 交换机相关
```

### 4.7 Layer (網絡分層) - 網絡技術知識庫

```
#layer/                          # 網絡分層
├── #layer/application          # 應用程式層 (Layer 7)
├── #layer/presentation          # 表示層 (Layer 6)
├── #layer/session               # 會話層 (Layer 5)
├── #layer/transport            # 傳輸層 (Layer 4)
├── #layer/network              # 網路層 (Layer 3)
├── #layer/data-link            # 數據鏈路層 (Layer 2)
└── #layer/physical             # 物理層 (Layer 1)
```

### 4.8 Learning (學習狀態) - 網絡技術知識庫

```
#learning/                       # 學習狀態
├── #learning/new              # 新學習
├── #learning/progress         # 學習中
├── #learning/review           # 複習中
├── #learning/mastered         # 已掌握
└── #learning/archived         # 已歸檔
```

### 4.9 Difficulty (難度等級) - 網絡技術知識庫

```
#difficulty/                     # 難度等級
├── #difficulty/beginner       # 入門級
├── #difficulty/intermediate   # 中級
└── #difficulty/advanced        # 高級
```

**使用場景**：標記特定知識庫的內容類型和主題。

**示例**：
```yaml
---
tags:
  - #type/concept
  - #topic/basics
  - #discipline/tcm
aliases:
  - 耳穴概念
  - 基础理论
  - 中医
---
```

---

## 五、Zettelkasten 标签系统

Zettelkasten 标签用于标记卡片笔记的类型、状态和分类。

### 5.1 卡片类型

```
#zettel/type/              # 卡片类型
├── #zettel/type/fleeting     # 闪念笔记
├── #zettel/type/literature   # 文献笔记
├── #zettel/type/permanent    # 永久笔记
└── #zettel/type/structure   # 结构笔记
```

### 5.2 卡片状态

```
#zettel/status/            # 卡片状态
├── #zettel/status/draft       # 草稿
├── #zettel/status/refined     # 已润色
└── #zettel/status/verified   # 已验证
```

### 5.3 卡片分类

```
#zettel/category/          # 卡片分类
├── #zettel/category/philosophy # 哲学
├── #zettel/category/science     # 科学
├── #zettel/category/technology # 技术
├── #zettel/category/literature # 文学
└── #zettel/category/other      # 其他
```

**使用场景**：组织卡片笔记系统。

**示例**：
```yaml
---
tags:
  - #zettel/type/permanent
  - #zettel/status/verified
aliases:
  - 永久笔记
  - 已验证
---
```

---

## 六、报告/日志标签

报告标签用于标记各种定期报告和日志。

```
#report/                         # 报告根标签
├── #report/daily               # 日报
├── #report/weekly              # 周报
├── #report/monthly             # 月报
├── #report/quarterly           # 季报
├── #report/annual              # 年报
└── #report/reflection          # 反思
```

**使用场景**：
```markdown
日常记录: #report/daily #journal
周回顾: #report/weekly #review
月总结: #report/monthly #reflection
年回顾: #report/annual #reflection
```

---

## 七、系统功能标签

系统功能标签用于标记具有特定系统功能的笔记。

```
#system/                         # 系统功能根标签
├── #system/template            # 模板
├── #system/index               # 索引页
├── #system/cache               # 缓存页
├── #system/moc                # 内容地图（MOC）
├── #system/dashboard           # 仪表板
└── #system/navigation          # 导航页
```

---

## 八、工作流标签

工作流标签用于标记笔记在工作流中的位置。

```
#workflow/                       # 工作流根标签
├── #workflow/inbox             # 收件箱
├── #workflow/review            # 回顾
├── #workflow/processing        # 处理中
├── #workflow/automation        # 自动化
└── #workflow/quickadd          # 快速添加
```

---

## 中英文标签规范

### 规则

1. **英文标签为主标签** - 用于分类和系统查询
2. **中文标签作为 aliases** - 通过 frontmatter 的 `aliases` 字段实现搜索便利性
3. **中英文标签可并存** - 在 frontmatter 中同时使用，但英文标签作为 tags 的主值

### 示例格式

```yaml
---
tags:
  - #para/area/health
  - #type/clinical
aliases:
  - 健康领域
  - 健康
  - 临床相关
---
```

### 映射关系表

| 英文主标签 | 中文 aliases |
|-----------|-------------|
| `#para/area/health` | 健康领域、健康 |
| `#para/area/career` | 职业发展、职业 |
| `#para/area/finance` | 财务管理、财务 |
| `#para/area/relationships` | 人际关系、人脉 |
| `#para/area/learning` | 学习成长、学习 |
| `#para/area/lifestyle` | 生活方式 |
| `#para/project/work` | 工作项目 |
| `#para/resource/tech` | 技术资源 |
| `#type/clinical` | 临床相关 |
| `#topic/basics` | 基础理论 |

---

## 标签命名规范

| 规则 | 说明 | 示例 |
|------|------|------|
| 小写字母 | 统一使用小写 | `#para/area` 而非 `#PARA/area` |
| 连字符分隔 | 使用 `-` 分隔单词 | `#zettel/type/fleeting` |
| 层次化结构 | 使用 `/` 分层，最多3级 | `#para/resource/tech/programming` |
| 英文为主 | 优先使用英文标签 | `#status/active` |
| 语义明确 | 标签名有明确含义 | `#priority/high` |
| 避免重复 | 避免语义重复 | 不同时使用 `#active` 和 `#in-progress` |

---

## 标签组合最佳实践

### 项目笔记完整标签组合

```yaml
---
tags:
  - #para/project/work
  - #status/active
  - #priority/high
  - #zettel/type/permanent
aliases:
  - 工作项目
  - 高优先级
---
```

### 领域笔记标签组合

```yaml
---
tags:
  - #para/area/health
  - #type/clinical
  - #zettel/type/permanent
aliases:
  - 健康领域
  - 健康
---
```

### 资源笔记标签组合

```yaml
---
tags:
  - #para/resource/tech
  - #zettel/type/literature
aliases:
  - 技术资源
  - 文献笔记
---
```

### 耳穴知识库笔记标签组合

```yaml
---
tags:
  - #type/concept
  - #topic/basics
  - #discipline/tcm
aliases:
  - 耳穴概念
  - 基础理论
  - 中医
---
```

### 易学知识库笔记标签组合

```yaml
---
tags:
  - #yixue/basics
  - #yixue/philosophy
aliases:
  - 易学基础
  - 易学哲学
---
```

### 網絡技術知識庫筆記標籤組合

```yaml
---
tags:
  - #para/resource/tech
  - #topic/networking
  - #protocol/tcp-ip
  - #layer/transport
  - #type/concept
  - #zettel/type/permanent
  - #learning/mastered      # 已掌握
  - #difficulty/intermediate # 中級
aliases:
  - TCP/IP協議棧
  - 傳輸層
  - 計算機網路
---
```

---

## 標籤使用場景速查

### PARA 標籤使用場景

| 場景 | 使用標籤 | 示例 |
|------|----------|------|
| 領域筆記 | `#para/area/` + 子分類 | `#para/area/health` |
| 項目筆記 | `#para/project/` + 子分類 + `#status/` + `#priority/` | `#para/project/work #status/active #priority/high` |
| 資源筆記 | `#para/resource/` + 子分類 | `#para/resource/tech` |
| 歸檔筆記 | `#para/archive/` + 子分類 | `#para/archive/completed` |

### Zettelkasten 標籤使用場景

| 卡片類型 | 標籤組合 |
|----------|-----------|
| 閃念筆記 | `#zettel/type/fleeting #zettel/status/draft` |
| 文獻筆記 | `#zettel/type/literature #zettel/category/[分類]` |
| 永久筆記 | `#zettel/type/permanent #zettel/status/verified` |
| 結構筆記 | `#zettel/type/structure` |

### 報告標籤使用場景

```markdown
日常記錄: #report/daily #journal
週回顧: #report/weekly #review
月總結: #report/monthly #reflection
年回顧: #report/annual #reflection
```

### 專用知識庫標籤使用場景

```markdown
耳穴知識庫: #type/[類型] #topic/[主題] #discipline/[學科] #method/[方法]
易學知識庫: #yixue/[分類]
網絡技術知識庫: #type/[類型] #topic/[主題] #protocol/[協議] #layer/[分層] #learning/[狀態] #difficulty/[等級]
```

---

## 實施注意事項

1. **本規範僅建立標籤體系標準**，不進行大規模現有標籤遷移
2. **新創建的筆記應直接使用新規範**
3. **用戶可手動選擇何時更新現有筆記的標籤**
4. **專用知識庫標籤納入主體系後**，保留了其特殊用途和分類邏輯
5. **中英文標籤通過 aliases 實現搜索便利性**，英文標籤作為系統查詢的主鍵

---

## 相關文檔

- [[networking-tag-system]] - 網絡技術知識庫標籤系統規範
- [[tag-validation-checklist]] - 標籤驗證清單
- [[tag-quick-reference]] - 標籤速查表
- [[示例筆記-領域標籤使用.md]] - 領域標籤使用示例
- [[示例筆記-項目標籤使用.md]] - 項目標籤使用示例
- [[示例筆記-資源標籤使用.md]] - 資源標籤使用示例
- [[示例筆記-Zettelkasten標籤使用.md]] - Zettelkasten 標籤使用示例
