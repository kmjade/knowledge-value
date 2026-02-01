---
type: web-capture
created: 2026-01-29
url: "{{url}}"
---

# 🔗 2026-01-29-通用智能体 + MCP Servers + Skills 構建企业智能体落地新范式

> 2026-01-29 | [原文連結](https://mp.weixin.qq.com/s/FRHY580K9bXbfUgSOasJCA)

---

## 📌 核心內容

# 專業知識

过去一年发生了诸多变化。MCP（智能体連接协议）已成为智能体互联的行业標準，得到了行业领军企业和開發者社區的快速采用。Claude Code 作为通用編程智能体正式推出，Anthropic 还發佈了 Claude Agent SDK，如今可直接提供生产级就绪的智能体。

# 專業知識

![圖片](https://mmbiz.qpic.cn/mmbiz_jpg/9TPn66HT930MS1Lz5VlPG9QDkLXtH3I2hUrFCFhO1CjfFwPEIT1UzicqA4FkureLBJknniaeiayXuy3m3bib1k7NoA/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0)

在本文中，我们将解釋为何停止開發专用智能体、转而構建 Skills ，以及这一转变如何改变我们对擴展智能体能力的思考方式。

# 1. 新范式：代碼即为一切

我们曾认为，不同领域的智能体必然存在显著差异。編程智能体、研究智能体、金融智能体、营销智能体，每个似乎都需要专属工具和架構。行业初期也普遍采用这种 “领域专用智能体” 模式。但随着模型智能水平的提升和智能体能力的發展，我们逐渐趋向于另一种方案。

过去：领域专用智能体

![圖片](https://mmbiz.qpic.cn/mmbiz_png/9TPn66HT930MS1Lz5VlPG9QDkLXtH3I2BhzZcKibc8BBugISQeuXM3qYwtkvHIDjx1hiaLcYWETTTpDn2JeMWVyg/640?wx_fmt=png&from=appmsg&watermark=1&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1)

- 編程智能体
    
- 研究智能体
    
- 金融智能体
    
- 营销智能体
    

我们逐渐意识到，代碼不仅仅是一个應用程式場景，更是智能体完成几乎所有数字工作的接口。Claude Code 虽是編程智能体，但本质上是通過代碼工作的通用智能体。

![圖片](https://mmbiz.qpic.cn/mmbiz_png/9TPn66HT930MS1Lz5VlPG9QDkLXtH3I2pxEIicD3IyfROZd3fz5icDvqFz2WZCLL4G1HUtpdic4yiayQp6ypzGJVhA/640?wx_fmt=png&from=appmsg&watermark=1&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=2)

如今：通用編程智能体（應用程式場景广泛覆盖）

# 分析

# 專業知識

# 專業知識

# 專業知識

# 專業知識

# 專業知識

# 3. 什么是智能体技能（Agent Skills）？

# 專業知識

```
anthropic_brand/
```

# 工作流

## 3.1 渐进式披露（Progressive Disclosure）

Skills 可能包含大量資訊。为避免占用过多上下文視窗并确保 Skills 的可组合性，Skills 采用 “渐进式披露” 機制：運行时仅向模型展示元數據（YAML 前置資訊中的名称和描述），示例如下：

```
---
```

当 Claude 判斷需要使用某项 Skills 时，才会讀取完整的 SKILL.md 檔案。如需更多细节，Skills 可包含 references/ 目錄，其中的支持文檔仅在需要时加载。

这种三层结构允许为智能体配备数百项 Skills，而不会造成上下文視窗过载：元數據仅占用约 50 个 Token，完整 SKILL.md 檔案约 500 个 Token，參考檔案则包含 2000+ 个 Token，且仅在特定需要时加载。

## 3.2 Skills 可整合腳本作为工具

# 修改

以下是一个真实案例：我们發現 Claude 反复編寫相同的腳本，用于为幻灯片應用程式 Anthropic 品牌樣式。于是我们让 Claude 将其儲存为自用工具：

```
# anthropic/brand_styling/apply_template.py
```

slide-decks.md 中的对应文檔仅需引用该腳本：

```
## Anthropic 幻灯片規範
```

# 4. Skills 生態系統

Skills 生態系統發展迅速，目前已出现三类主要 Skills：

## 4.1 基礎技能（Foundational Skills）

提供所有人都需要的核心能力：處理文檔、电子表格、演示文稿等，编码了文檔生成和處理的最佳實踐。你可以通過我们的公共代碼库探索基礎技能的实际案例。

## 4.2 合作伙伴技能（Partner Skills）

随着技能標準化了智能体与专业功能的交互方式，多家公司正通過構建 Skills 让其服务支持智能体访问。K-Dense、Browserbase、Notion 等众多企业已推出相關技能，将其服务直接整合到 Claude 中，在特定领域擴展 Claude 能力的同时，保持了 Skills 格式的简洁性。

## 4.3 企业技能（Enterprise Skills）

# 專業知識

# 5. 我们观察到的趨勢

随着 Skills 的普及，一些模式逐渐显现，预示着这一范式的發展方向。这些趨勢影响着我们对 Skills 設計的思考，以及为支持 Skills 開發者而構建的工具。

## 5.1 复杂度不断提升

# 工作流

- 简单级：“狀態報告生成器”（约 100 行）『提供模板和格式規範』
    
- 中级：“财务模型構建器”（约 800 行）『支持數據檢索、Python Excel 建模』
    
# 分析
    

## 5.2 Skills 与 MCP 的协同

# 分析

## 5.3 非開發者广泛采用

# 專業知識

# 6. 完整架構

整合所有組件后，新兴的智能体架構包含以下部分：

![圖片](https://mmbiz.qpic.cn/mmbiz_png/9TPn66HT930MS1Lz5VlPG9QDkLXtH3I2EueghP4Y7icmJTrh28Y5pJ30Tv8awcqWBqszolpRYk7bkFmosUUKeew/640?wx_fmt=png&from=appmsg&watermark=1&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=3)

- 智能体循环（Agent loop）：核心推理系統，决定下一步行动；
    
- 智能体運行时（Agent runtime）：执行環境（代碼、檔案系統）；
    
- MCP Servers：連接外部工具和數據源；
    
# 專業知識
    

## 6.1 架構示意图

智能体 ↔ 檔案系統 ↔ MCP Server 1 ↔ 技能 1

智能体 ↔ 檔案系統 ↔ MCP Server 2 ↔ 技能 2

每个层级都有明确的职责：循环负责推理、運行时负责执行、MCP 负责連接、Skills 负责指导。这种分离使系統易于理解，且各組件可独立演进。

以新增 “前端設計 Skills” 为例：该技能可立即提升 Claude 的前端開發能力，提供关于排版、色彩理论和动画的专业指导，且仅在構建網頁界面时激活。借助渐进式披露機制，它仅在相關場景下加载，新增能力的過程简单直接。

# 部署

# 部署

## 7.1 金融服务领域

Skills 推出后，我们立即为金融服务行业增强了 Claude 的能力，使其更适配金融专业人士的需求：

# 分析
    
# 分析
    
# 分析
    
- 首次覆盖報告：構建包含金融模型的综合研究報告
    
# 分析
    
- 推介材料：按照行业標準創建客户演示文稿
    

## 7.2 医疗健康与生命科學领域

我们还为医疗健康和生命科學领域增强了 Claude 的能力，使其更适配研究人员、临床医生和医疗開發者的需求：

# 管理
    
- 临床试验方案生成：加速临床研究的方案制定過程
    
- 科學問題選擇：帮助研究人员识别和構建具有影响力的研究問題
    
- FHIR 開發：帮助開發者編寫更精准的健康數據互操作代碼，加快医疗系統連接速度并减少错误
    
# 指南
    

# 8. 標準化智能体 Skills

为實現这一愿景，Anthropci 将 “智能体 Skills” 作为開放標準發佈。与 MCP 一样，Anthropic 认为 Skills 应可跨工具和平台移植，無论你使用 Claude 还是其他 AI 平台，同一 Skills 都应能正常工作。Anthropic 已与生態系統成员合作制定该標準，并对早期采用者的回饋感到振奋。

# 專業知識

# 9. 開始使用

# 專業知識

---

## 💡 要點

- 要點 1
- 要點 2
- 要點 3

---

## 🏷️ 標籤

- #主題 #领域

---

## 🔗 相關

- [[]]
- [[]]

---

# 整理
