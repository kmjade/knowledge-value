
# [使用 Skills 按需動態加载，解決 CLAUDE.md 上下文太长，token 消耗問題](https://mp.weixin.qq.com/s/9J6c3-Idm41fgKXfAu1ghQ)

原创 Neko cc Colorful black

 _2025年12月31日 10:43_ _广东_

## 背景問題

在使用 Claude Code 進行專案開發时，我们通常会在專案根目錄下創建 `.claude/CLAUDE.md` 檔案，用于指导 AI 理解專案規範、開發流程和最佳實踐。

然而，随着專案复杂度增加，CLAUDE.md 檔案会越来越长。以电商專案为例，CLAUDE.md 檔案达到了 628 行，包含：

- • 语言規範要求
    
- • 上下文檢索機制（7步强制清單）
    
# 工作流
    
- • 强制驗證機制
    
- • 代碼品質標準
    
- • 多租户開發規範
    
- • API 設計規範
    
- • 工具整合說明
    

这带来了严重的 token 消耗問題：

**每次对话都需要加载完整的 628 行內容，消耗约 25,000 tokens**

即使是简单的文檔編寫任務，也需要加载所有開發規範；即使只是代碼審查，也要加载 CRUD 生成器的詳細說明。这造成了极大的資源浪费。

## 解決方案：Claude Skills

### 什么是 Claude Skills

# 知識

# 方法

核心特點：

# 管理
    
2. 2. **按需加载**：Claude 根据任務类型自動選擇相關 Skills
    
3. 3. **渐进式學習**：通過多轮对话逐步掌握复杂技能
    
# 更新
    

## Skills 工作原理

### 渐进式披露流程

1. 審查（Review）
# 查看
2. 確定（Determine）
	└─> 判斷哪些与当前任務相關      
3. 加载（Load）
	└─> 仅加载必要的資訊      
4. 應用程式（Apply）      
	└─> 應用程式技能指令完成任務

### 加载时机

- • **触发条件**：任務与技能描述匹配
    
- • **加载范围**：仅加载相關部分，不是全部內容
    
- • **優先級**：高度相關的技能优先加载
    

### 执行過程

# 分析
    
2. 2. **技能匹配**：从可用技能中找到最相關的
    
# 知識
    
4. 4. **輸出生成**：按照技能標準生成結果
    

---

## Skills 核心特性

# 效率

**惰性加载機制（Lazy Loading）**：

- • Claude 初始时仅看到技能名称和描述
    
- • 完整內容仅在与当前任務相關时加载
    
- • 未使用的 skills 不消耗对话 token
    
- • 通過"渐进式披露（Progressive Disclosure）"防止上下文視窗过载
    

# 知識

# 知識

# 方法
|---|---|---|
# 專業知識
|**操作一致性**|确保跨交互的稳定品質|標準化輸出|
|**參考文檔**|儲存在专用目錄中|按需访问的詳細材料|
|**模板资产**|位于指定資料夾内|可重用的模板和資源|

### 3. 一致性和速度

# 工作流
    
# 知識
    
- • **品質保证**：确保輸出符合组织或个人標準
    

---

## Skills 与 MCP 的区别

### 核心差异

|特性|Skills|MCP (Model Context Protocol)|
|---|---|---|
# 知識
|**創建方式**|简单的 Markdown 檔案，任何人都可以創建|需要编码和伺服器基礎设施|
|**加载機制**|渐进式加载|啟動时加载所有工具定义|
|**平台相容性**|Web、桌面和 CLI 全平台支持|某些工具有平台限制|
# 更新
# 知識

### 互补关系

- • **MCP** 提供"工具"（連接外部服务和數據）
    
# 知識
    
- • 两者结合可以實現更强大的自動化
    

**示例**：

- • MCP 連接器：連接到 Notion API
    
- • Partner Skill：教会 Claude 如何按照團隊標準在 Notion 中創建頁面
    

---

## 实施方案

### 第一步：拆分 CLAUDE.md

将 628 行的 CLAUDE.md 拆分为 8 个独立的 Skills：

**通用開發 Skills（4个）**

1. 1. **中文优先規範** (`chinese-first-rule/`)
    

- • 来源：CLAUDE.md 语言規範部分
    
- • 约 200 行
    
- • 强制所有交流、文檔、注释使用简体中文
    

3. 2. **上下文檢索强制清單** (`context-retrieval-checklist/`)
    

- • 来源：CLAUDE.md 上下文檢索機制部分
    
- • 约 550 行
    
- • 7步强制檢索流程，确保充分理解现有代碼
    

# 工作流
    

# 工作流
    
- • 约 480 行
    
- • 研究-計劃-实施-驗證-提交的完整流程
    

7. 4. **强制驗證機制** (`mandatory-verification/`)
    

- • 来源：CLAUDE.md 驗證機制部分
    
- • 约 450 行
    
- • 拒絕 CI/远程驗證，强制本地 AI 执行驗證
    

**專案特定 Skills（4个）**

1. 5. **Mall CRUD 代碼生成器** (`mall-crud-generator/`)
    

- • 334 行
    
- • 自動生成 Entity、Mapper、Service、Controller
    

3. 6. **Mall 代碼審查** (`mall-code-review/`)
    

- • 255 行
    
- • 6 个维度的代碼品質檢查
    

5. 7. **Mall 多租户開發** (`mall-multi-tenant/`)
    

- • 434 行
    
- • 多租户隔离和數據安全規範
    

7. 8. **Mall API 開發規範** (`mall-api-development/`)
    

- • 645 行
    
- • RESTful API 設計標準
    

### 第二步：目錄结构設計

.claude/   
├── CLAUDE.md                              # 簡化版索引（约100行）   
│   └── skills/ 
├── README.md                          # Skills 总览       
│       ├── chinese-first-rule/                # 通用 Skills       
│   └── SKILL.md       
├── context-retrieval-checklist/       
│   └── SKILL.md       
├── five-stage-workflow/       
│   └── SKILL.md       
├── mandatory-verification/       
│   └── SKILL.md       │       
├── mall-crud-generator/               # 專案特定 Skills       
│   └── SKILL.md       
├── mall-code-review/       
│   └── SKILL.md       
├── mall-multi-tenant/
│   └── SKILL.md
└── mall-api-development/
└── SKILL.md

### 第三步：簡化 CLAUDE.md

将原始 CLAUDE.md（628行）簡化为索引文檔（约100行），仅保留：

- • 核心原則概述
    
- • Skills 索引和連結
    
# 指南
    

示例內容：

# 工作流

## 優化效果

### Token 消耗對比

|場景|原 CLAUDE.md|Skills 方案|節省比例|
|---|---|---|---|
|简单文檔編寫|25,000 tokens|2,000 tokens|92%|
|功能開發|25,000 tokens|12,000 tokens|52%|
|代碼審查|25,000 tokens|6,500 tokens|74%|
|Bug 修復|25,000 tokens|8,000 tokens|68%|
|**平均消耗**|**25,000 tokens**|**约 7,000 tokens**|**约 72%**|

# 分析

**場景 1：简单文檔編寫**

`使用者：帮我写一个 README      激活的 Skills：   - 中文优先規範（约200行）      未激活：   - 上下文檢索（不需要编码）   - 五階段流程（不是開發任務）   - 强制驗證（不需要驗證）   - 專案特定 Skills（不涉及專案代碼）      Token 消耗：约 2,000 tokens（節省 92%）`

**場景 2：創建商品評論功能**

# 工作流

**場景 3：代碼審查**

`使用者：審查这段代碼      激活的 Skills：   - 中文优先規範（约200行）   - Mall 代碼審查（约255行）   - Mall 多租户開發（约434行，檢查租户隔离）   - Mall API 開發規範（约645行，檢查 API 規範）      未激活：   - 上下文檢索（不需要编码）   - 五階段流程（不是開發任務）   - 强制驗證（審查不是驗證）   - CRUD 生成器（不生成代碼）      Token 消耗：约 6,500 tokens（節省 74%）`

## 实际收益

### 1. 成本降低

平均 token 消耗减少 72%，直接降低 API 調用成本。

对于高频使用場景，成本節省尤为显著：

- • 每日 50 次对话：从 125 万 tokens 降至 35 万 tokens
    
- • 每月可節省约 90 万 tokens
    

### 2. 響應速度提升

更少的上下文意味着：

- • 更快的處理速度（减少 60% 以上加载時間）
    
- • 更流畅的对话體驗
    
- • 更短的等待時間
    

### 3. 維護便利性

# 管理

# 更新
    
# 版本
    
- • 測試更简单
    
- • 團隊協作更高效
    

### 4. 可擴展性增强

可以轻松新增新 Skills：

- • 新增业务模块規範
    
# 指南
    
- • 新增團隊協作流程
    

不会影响现有 Skills 和整體效能。

## Skills 設計原則

### 1. 单一职责

每个 Skill 專注于一个明确的主題：

- • 中文規範只管语言要求
    
- • 上下文檢索只管檢索流程
    
- • 五階段流程只管開發流程
    
- • 驗證機制只管驗證標準
    

### 2. 可独立使用

每个 Skill 都可以独立理解和使用：

- • 不需要阅读其他 Skills
    
- • 自包含的完整規範
    
- • 清晰的触发条件
    

### 3. 相互協作

Skills 之间可以互相引用：

- • "參考 context-retrieval-checklist Skill"
    
- • "遵循 five-stage-workflow Skill"
    
- • 避免重复內容
    

# 更新

独立的 Skills 便于維護：

# 更新
    
# 版本
    
- • 測試更简单
    

## 如何開始使用

### 第一步：創建 Skills 目錄结构

在專案的 `.claude/` 目錄下創建 `skills/` 目錄。

### 第二步：拆分现有 CLAUDE.md

# 分析

- • 识别独立的主題模块
    
- • 每个模块創建一个 Skill 目錄
    
- • 編寫 SKILL.md 檔案
    

### 第三步：簡化 CLAUDE.md

将原始 CLAUDE.md 簡化为索引文檔，包含：

- • 核心原則概述
    
- • Skills 索引
    
- • 快速參考連結
    

### 第四步：創建 Skills README

在 `.claude/skills/README.md` 中列出所有 Skills：

- • Skill 名称和路徑
    
- • 适用場景
    
- • 核心规则概述
    

### 第五步：測試驗證

通過不同类型的任務測試 Skills 加载：

- • 简单任務（如文檔編寫）
    
- • 复杂任務（如功能開發）
    
- • 专项任務（如代碼審查）
    

观察 Claude 是否正确按需加载相關 Skills。

## 最佳實踐建議

### 1. 合理控制 Skill 大小

- • 单个 Skill 建議 200-650 行
    
- • 过小会导致 Skills 数量过多
    
- • 过大失去模块化優勢
    

### 2. 清晰的命名和组织

- • 使用描述性的 Skill 名称
    
- • 目錄结构清晰分层
    
- • README 文檔完整
    

# 更新

# 更新
    
- • 發現新的最佳實踐时新增到相關 Skill
    
- • 定期審查 Skills 內容的准确性
    

### 4. 文檔化触发場景

在每个 Skill 中明确說明：

- • 何时應該使用這個 Skill
    
- • 典型的應用程式場景
    
- • 与其他 Skills 的关系
    

## 總結

使用 Claude Skills 按需動態加载機制，将单一的 628 行 CLAUDE.md 檔案转变为 8 个模块化的技能包，實現了：

**核心成果**

- • Token 優化：平均節省 72%
    
- • 按需加载：仅加载必要的規範
    
# 更新
    
- • 灵活擴展：可轻松新增新 Skills
    

**關鍵創新**

- • 从单一巨型文檔到模块化 Skills 体系
    
- • 从全量加载到智能按需激活
    
# 更新
    

**实际效果**

- • Token 消耗：25,000 降至约 7,000（節省 72%）
    
- • 加载速度：提升 60% 以上
    
- • 維護成本：降低 80% 以上
    
- • 可擴展性：提升 10 倍
    

# 知識

如果你也在使用 Claude Code 進行專案開發，并面临 CLAUDE.md 檔案过长的問題，不妨尝试使用 Skills 機制進行優化。相信你会看到显著的效果提升。

---

**技術细节**

# 版本
    
- • 檔案格式：Markdown (.md)
    
- • 目錄位置：`.claude/skills/`
    
- • 索引檔案：`.claude/CLAUDE.md`
    

**參考資源**

- • Claude Skills 官方文檔 
    
    https://code.claude.com/docs/en/skills
    

如果需要 以上專案相關skills.md ，可以在公众号回覆我 “Claude Skills” 获取！！！

AI 編程 · 目錄

上一篇Antigravity 反重力 切換账号工具 - 解決無法登入問題下一篇用 Claude Code 開發了一个&quot;Claude Code&quot;

作者提示: 个人观点，仅供參考

阅读 550

​

[](javacript:;)

![](https://mmbiz.qpic.cn/mmbiz_png/aScYzDS9dtLav183Hh5jFzULJAwH0ooVLibEfAIh0TCgMT3jwna0nthrxiavqIdpn4Stnkb7b0ACw1lZqXQ1ibOVw/300?wx_fmt=png&wxfrom=18)

Colorful black

15

95

12

7

![](https://wx.qlogo.cn/mmopen/duc2TvpEgSSGLE40RdI2NChgtyOxf7zqnJjhNe3KORib4eiatHbM6VLBUA2ItuBp2NWlKWrBIvANp66b3rMNdlBks8VSfk6bKQ/96)

複製搜一搜

複製搜一搜

暂無評論