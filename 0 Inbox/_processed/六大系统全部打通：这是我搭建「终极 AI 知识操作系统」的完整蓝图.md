---
title: "六大系统全部打通：这是我搭建「终极 AI 知识操作系统」的完整蓝图"
source: "https://mp.weixin.qq.com/s/n10rWMlr9KoAx4QG-HZs0w"
author:
  - "[[一只阿木木]]"
published:
created: 2026-05-27
description:
compiled: false
tags:
  - "clippings"

triaged: true
triaged_at: 2026-05-27T03:34:30
triaged_to: 3 Resources/ai-ml/raw/articles/
triaged: true
triaged_at: 2026-05-27T09:00:56
triaged_to: ai-ml
---
一只阿木木 *2026年5月15日 00:02*

## 六大系统全部打通：这是我搭建「终极 AI 知识操作系统」的完整蓝图

**作者：一只阿木木** ｜ AI 实战 × 知识系统

## 写在前面：为什么需要「融合」

我收到了很多读者的同一个问题：

「阿木木，这六个系统我都看了，但我不知道到底该装哪个，该从哪里开始，它们之间有没有冲突。」

这个问题问得好。

六个系统，每一个都是独立的价值，但如果你只是随机装几个，它们不会自动产生协同。就像你有了锤子、螺丝刀、水平仪和电钻——单独拿出来都有用，但你需要一张施工图，才能把它们用在正确的地方，盖出一栋完整的房子。

**这篇文章，就是那张施工图。**

---

## 一、先看全局：六大系统各自在解决什么问题

在融合之前，先把每个系统的核心价值说清楚。

| 系统 | 核心问题 | 核心价值 |
| --- | --- | --- |
| **Karpathy LLM Wiki** | 知识散乱，每次从零开始 | 让 LLM 编译和维护知识库，知识复利增长 |
| **Obsidian Skills** | AI 不懂 Obsidian 语法 | 教会 AI 说 OFM 母语，wikilinks / Base / Canvas 全支持 |
| **CLAUDE.md** | AI 不认识你，每次重新介绍 | 把上下文工程化，会话连续性，AI 真正认识你 |
| **Claudian** | 需要切换到终端才能用 AI | Vault 内实时 AI 协作，Inline Edit，零切换成本 |
| **GBrain** | 人脉/会议/跨源信息碎片化 | 生产级 AI 大脑，Brain-First 循环，Dream Cycle |
| **Hermes Agent** | 每次会话重置，不积累 | 四层记忆 + GEPA 自进化，越用越聪明 |

六个系统，对应六个不同层次的问题。

它们不是竞争关系—— **它们是分工关系** 。

---

## 二、整体架构：四层金字塔

把六大系统融合，本质上是构建一个四层金字塔：

text

```
┌─────────────────┐
                    │   自进化层       │  ← Hermes Agent
                    │  越用越聪明      │
                    └────────┬────────┘
               ┌─────────────┴──────────────┐
               │         知识大脑层          │  ← GBrain
               │  人脉/会议/跨源知识图谱      │
               └─────────────┬──────────────┘
    ┌──────────────────────────┴──────────────────────────┐
    │                    知识编译层                        │  ← LLM Wiki + CLAUDE.md
    │         raw/ → wiki/ → 编译真相 → 持续积累           │
    └──────────────────────────┬──────────────────────────┘
┌────────────────────────────────┴────────────────────────────────┐
│                         基础设施层                               │  ← Obsidian + Skills + Claudian
│              Vault 架构 + OFM 语言 + Vault 内 AI 协作            │
└─────────────────────────────────────────────────────────────────┘
```

**第一层：基础设施层** （必装）

- Obsidian：知识的「操作系统」，所有东西的容器
- Obsidian Skills：让 AI 说 Obsidian 的母语
- Claudian：把 AI 协作能力嵌入 Vault 内部

**第二层：知识编译层** （核心）

- Karpathy LLM Wiki：把散乱来源编译成结构化知识网络
- CLAUDE.md：把上下文工程化，建立会话连续性

**第三层：知识大脑层** （进阶）

- GBrain：管理人脉、会议、跨源信息的生产级系统

**第四层：自进化层** （终极）

- Hermes Agent：让整个系统随时间自动变聪明

这四层有一个重要原则： **可以只用底层，也可以逐层叠加，但不能跳层。**

不装基础设施层，上面全部失效。 不建知识编译层，大脑层没有知识可以管理。 不稳定使用，自进化层没有数据可以学习。

---

## 三、数据流：信息在六大系统之间怎么流动

这是整个融合架构里最需要理解清楚的部分。

text

```
外部世界的信息
    │
    ├── 文章 / 论文 / 推文
    │       ↓
    │   Obsidian Web Clipper + defuddle
    │       ↓
    │   raw/（不可变原始来源）
    │       ↓
    │   LLM Wiki /ingest
    │       ↓
    │   wiki/（编译后的知识页面）
    │       ↓ [Claudian 实时查阅]
    │   [[wikilinks]] 知识图谱
    │
    ├── 会议记录 / 邮件 / 日历
    │       ↓
    │   GBrain 信号探测器
    │       ↓
    │   先查 Brain → 带上下文处理 → 写回 Brain
    │       ↓
    │   people/ + companies/ + meetings/
    │       ↓ [Dream Cycle 夜间整合]
    │   编译真相 + 时间线
    │
    ├── 你完成的任务 / 工作流
    │       ↓
    │   Hermes Agent 执行追踪
    │       ↓
    │   技能文件自动创建（5+工具调用触发）
    │       ↓ [GEPA 定期优化]
    │   进化后的 Skill.md
    │       ↓
    │   下次同类任务速度提升40%
    │
    └── 你自己写的笔记 / 想法
            ↓
        Obsidian inbox/
            ↓
        Hermes inbox-processor 技能
            ↓
        分类进入 wiki/ 或 GBrain
```

**关键洞察** ：

信息进来的入口有三个——原始内容走 LLM Wiki，人际和事件走 GBrain，你自己产出的想法走 inbox。但最终，三条路都汇聚在同一个知识网络里，通过 CLAUDE.md 和 Hermes 的技能体系连接在一起。

---

## 四、融合配置：让六大系统「互相认识」

光说架构不够，我来给你完整的融合配置方案。

### 第一步：统一文件根目录

所有系统共享同一个根目录：

Bash

```
# 建立统一根目录
mkdir -p ~/ai-brain
cd ~/ai-brain

# 子目录结构
mkdir -p \
  obsidian-vault/raw/sources \
  obsidian-vault/wiki/concepts \
  obsidian-vault/wiki/people \
  obsidian-vault/wiki/papers \
  obsidian-vault/wiki/topics \
  obsidian-vault/inbox \
  obsidian-vault/meetings \
  obsidian-vault/projects \
  obsidian-vault/.claude/skills \
  gbrain-repo \
  hermes-skills
```

### 第二步：CLAUDE.md 融合版

这是整个系统的「总宪法」，需要反映所有六个系统的分工：

Markdown

```
# CLAUDE.md — AI 知识操作系统总宪法

> 每次会话先读这里。这不是配置文件，是系统的运行规则。

---

## ⚡ 每次会话必须知道的三件事
1. wiki/ 是 AI 的领地，query 前先读 wiki/index.md
2. 会议/人脉信息优先写入 GBrain，不是 wiki/
3. 会话结束前更新 SESSION_NOTES.md

---

## 系统分工
| 内容类型 | 存储位置 | 操作工具 |
|---------|---------|---------|
| 文章/论文/研究 | wiki/（LLM Wiki） | /ingest |
| 人物/公司/会议 | GBrain（gbrain put_page） | Brain-First |
| 未分类想法 | inbox/ | Hermes inbox 技能 |
| 可复用工作流 | ~/.hermes/skills/ | Hermes 自动创建 |

---

## 知识库结构
- wiki/index.md → 总目录（先读这里）
- wiki/concepts/ → 概念页（约 XX 个）
- wiki/people/   → 人物页（GBrain 主，wiki 副）
- wiki/papers/   → 论文摘要页
- raw/sources/   → 原始来源（不可修改）

---

## 操作协议

### /ingest [文件]
读取 raw/ → 提取实体 → 创建/更新 wiki/ 页面
→ 检查 GBrain 是否有相关人物需要同步
→ 更新 wiki/index.md → 报告

### Brain-First 流程
收到人物/会议信息 → gbrain search 先查
→ 带完整上下文处理 → gbrain put_page 写回
→ wiki/people/ 同步更新摘要

### /lint
扫描 wiki/ → 找矛盾/孤儿页/缺失概念
→ 检查 GBrain 链接是否有对应 wiki 页面
→ 生成报告

### Session Close（每次必做）
更新 SESSION_NOTES.md：完成的事 / 关键决策 / 未完成的工作

---

## 技术栈
- Obsidian Vault：~/ai-brain/obsidian-vault/
- GBrain Repo：~/ai-brain/gbrain-repo/
- Hermes Skills：~/.hermes/skills/
- Claude Code CLI：已安装 + Obsidian Skills 已配置
- GBrain MCP：已注册（gbrain serve）
- Hermes MCP：已注册（hermes serve）

---

*最后更新：记得随使用更新这里*
```

### 第三步：连接 GBrain 和 Hermes 到 Claude Code

Bash

```
# 注册 GBrain 为 MCP 服务器
claude mcp add gbrain -- gbrain serve

# 注册 Hermes 为 MCP 服务器
claude mcp add hermes -- hermes serve

# 验证
claude mcp list
# 应该看到：
# ✓ gbrain
# ✓ hermes
```

### 第四步：Hermes 配置融合版

YAML

```
# ~/.hermes/config.yaml（融合版）

# 模型配置
provider: anthropic
model: claude-sonnet-4
max_tokens: 8192

# ============================================
# 四层记忆（全部开启）
# ============================================
memory:
  persistent: true
  skill_creation: true
  user_modeling: true
  session_search: true

skill_improvement: true

curator:
  enabled: true
  schedule: "0 2 * * *"

# ============================================
# 系统集成
# ============================================
integrations:
  obsidian:
    vault_path: ~/ai-brain/obsidian-vault
    inbox_path: ~/ai-brain/obsidian-vault/inbox
    wiki_path: ~/ai-brain/obsidian-vault/wiki
    raw_path: ~/ai-brain/obsidian-vault/raw

  gbrain:
    repo_path: ~/ai-brain/gbrain-repo
    mcp_enabled: true

# ============================================
# Telegram（如果已配置）
# ============================================
telegram:
  enabled: true
  # token 在 hermes setup 时已配置
```

### 第五步：全系统启动脚本

Bash

```
#!/bin/bash
# ~/ai-brain/start-all.sh
# 一键启动所有系统

echo "🚀 启动 AI 知识操作系统..."

# 启动 GBrain MCP 服务器（后台）
gbrain serve &
echo "✓ GBrain MCP 启动"

# 启动 Hermes（后台，支持 Telegram）
hermes start --daemon
echo "✓ Hermes Agent 启动（含 Telegram）"

# 打开 Obsidian
open -a Obsidian ~/ai-brain/obsidian-vault
echo "✓ Obsidian Vault 打开"

echo "✅ 系统就绪！"
echo ""
echo "快速命令："
echo "  hermes           → 打开 Hermes 终端"
echo "  claude           → 打开 Claude Code"  
echo "  gbrain search X  → 搜索大脑"
```

Bash

```
chmod +x ~/ai-brain/start-all.sh
# 每天早上运行：
./ai-brain/start-all.sh
```

---

## 五、四套工作流模板：找到你的那一套

不同的人，用这套系统的重点不同。

我为四类人群各设计了一套完整的工作流模板。

---

### 🔬 工作流一：研究者 / 学生

**你的核心需求** ：快速积累某个领域的结构化知识，发现论文之间的关联，跟踪领域进展。

**系统侧重** ：

- 重度使用：LLM Wiki（知识编译核心）
- 中度使用：CLAUDE.md + Obsidian Skills
- 轻度使用：GBrain（主要用于追踪作者人物页）
- 可选：Hermes（自动化 Ingest 流程）

**每日工作流** ：

text

```
早上（30分钟）
├── 打开 Obsidian
├── 看 inbox/——昨天 Web Clipper 采集的文章
└── 运行：「处理今天的 inbox，Ingest 所有新来源」

上午（专注工作）
├── 在 wiki/ 里查阅知识（Claudian 侧边栏随时提问）
├── 深入研究某个概念时：
│   「@wiki/concepts/XXX.md 这个概念我还不清楚，帮我深入解释」
└── 遇到新术语：「为 XXX 创建一个 wiki 页面，从已有来源推断」

每周五（20分钟）
├── 运行 /lint → 查看缺失概念和矛盾
├── 看 Graph View → 找知识盲区（孤立节点）
└── 生成「本周知识积累报告」（Hermes weekly-knowledge-review 技能）
```

**核心 CLAUDE.md 配置重点** ：

Markdown

```
## 研究者专项配置
主研究领域：[你的领域]
核心关注问题：[3-5个核心研究问题]
阅读标准：必须引用来源，不接受无出处声明
输出格式：学术风格，精确术语
```

**一个月后你会得到** ：

- 50-200 个结构化知识页面
- 覆盖你领域的完整知识图谱
- 所有论文的摘要 + 交叉引用
- 随时可以问「XXX 领域最新进展」并得到综合答案

---

### 🚀 工作流二：创业者 / 投资人

**你的核心需求** ：管理大量人脉关系，追踪会议和项目进展，快速回顾任何人的历史背景。

**系统侧重** ：

- 重度使用：GBrain（核心，People CRM + 会议记录）
- 重度使用：Hermes（处理 Telegram 语音备忘录，自动写入 GBrain）
- 中度使用：CLAUDE.md（保持会话连续性）
- 轻度使用：LLM Wiki（行业研究文章归档）

**每日工作流** ：

text

```
早上（在路上，手机端）
├── 打开 Telegram，发语音：
│   「今天的重点：上午见 A 公司，下午投委会」
└── Hermes 创建今日任务清单，同步到日历

会议中（手机备忘）
├── 发消息给 Hermes：「刚才 Jordan 提到他们下个月关闭 B 轮」
└── Hermes 自动更新 GBrain 里 Jordan 的 Timeline

会议后（5分钟）
├── 在 Telegram 语音：「会议总结：[口述核心内容]」
└── Hermes：转录 → 格式化为会议记录 → 写入 GBrain meetings/
    → 更新所有与会者的 people/ 档案

每周一（周回顾）
├── 「帮我生成本周人脉动态摘要」
│   GBrain 搜索本周所有更新，Hermes 生成摘要
├── 「哪些 Open Threads 超过7天没有跟进？」
└── 「本周见了哪些做 AI 基础设施的人？」
```

**GBrain 专项配置** ：

Bash

```
# 为创业者优化的 GBrain 初始化
gbrain init --template startup-investor

# 导入联系人（如果有 CSV）
gbrain import contacts.csv --type people

# 连接 Gmail（自动从邮件提取关系）
gbrain setup gmail

# 连接 Google Calendar（自动关联会议）
gbrain setup gcal
```

**三个月后你会得到** ：

- 完整的人脉 CRM，每个人都有编译真相 + 时间线
- 所有会议记录自动结构化归档
- 随时可以问「我认识哪些在 XX 领域有影响力的人」
- AI 在你睡觉时帮你整理今天的所有信息

---

### 🛠️ 工作流三：开发者 / 技术人

**你的核心需求** ：管理技术决策记录，维护代码知识库，跟踪技术债，自动化文档工作。

**系统侧重** ：

- 重度使用：CLAUDE.md + Claude Code（代码和架构知识）
- 重度使用：Hermes（技术任务技能积累，GEPA 优化）
- 中度使用：LLM Wiki（技术文档 + 论文研究）
- 轻度使用：GBrain（团队人物档案）

**每日工作流** ：

text

```
开始工作
├── claude（打开 Claude Code）
├── 自动读取 CLAUDE.md → 了解当前项目状态
└── 读取 SESSION_NOTES.md → 从昨天的断点继续

开发过程中
├── 架构决策发生时：
│   「把这个决策记录为 ADR（架构决策记录），
│    保存到 docs/decisions/YYYY-MM-DD-XXX.md」
├── 发现技术债时：
│   「在 wiki/tech-debt.md 里记录这个问题，
│    标注严重程度和影响范围」
└── 解决了一个复杂问题：
    Hermes 自动创建技能文件（如果步骤足够多）

每周
├── /lint → 检查技术文档的一致性
├── hermes curator → 查看技术技能库健康状态
└── 生成「本周技术进展摘要」写入周报
```

**开发者专项 CLAUDE.md 配置** ：

Markdown

```
## 开发者专项配置
当前项目：[项目名称]
技术栈：[具体技术栈]
代码仓库：[路径]

架构原则：
1. 重要决策必须有 ADR 记录
2. 新接口必须有文档
3. 技术债发现即记录，不拖延

代码相关规范：
详见 docs/code-standards.md（不在此处重复）
```

**Hermes 为开发者的特殊价值** ：

开发者的工作流高度重复——代码审查、写测试、部署流程、排查 Bug。每种工作流只要发生5次以上，Hermes 就会积累出对应的技能文件。两个月后，你完成这些任务的速度会有明显提升，因为 Agent 已经学会了你的代码库特征和你的工作方式。

---

### ✍️ 工作流四：内容创作者 / 博主

**你的核心需求** ：积累选题灵感，管理内容素材，高效输出高质量内容，保持风格一致性。

**系统侧重** ：

- 重度使用：LLM Wiki（素材库和知识积累）
- 重度使用：Claudian（写作中的实时 AI 协作）
- 重度使用：CLAUDE.md（写作风格和人设保持一致）
- 中度使用：Hermes（内容工作流技能积累）
- 轻度使用：GBrain（读者互动和合作关系管理）

**每日工作流** ：

text

```
灵感捕获（随时，手机端）
├── Telegram 语音：「刚想到一个选题：[想法]」
└── Hermes 保存到 inbox/ideas/，自动加 tag

选题确定（每周一，30分钟）
├── 「列出 inbox/ideas/ 里本周的所有选题，
│    按潜力评分排序，推荐本周写什么」
└── 确定选题 → 创建文章工作文件夹

写作（Obsidian + Claudian）
├── 写初稿：在 Obsidian 里直接写
├── 卡住时：Claudian 侧边栏「帮我扩展这个段落」
├── 写完段落：Inline Edit「让这段更简洁有力」
└── 引用知识点：「@wiki/concepts/XXX.md 帮我
                  用这个知识点支撑上面的论点」

发布前检查
├── 「检查这篇文章的逻辑结构，找出论证漏洞」
├── 「对比我过去的文章风格，这篇是否保持一致？」
└── Hermes 自动更新 MEMORY.md 里的「已发布内容库」
```

**内容创作者专项 CLAUDE.md 配置** ：

Markdown

```
## 内容创作者专项配置
IP 定位：[你的内容定位]
目标读者：[读者画像]
写作风格：[具体风格描述]

风格关键词：
- 必须有的：[具体要求]
- 绝对避免：[禁忌清单]
- 标志性句式：[你的独特表达方式]

已发布内容索引：
详见 wiki/published/index.md
（确保新内容不和已有内容重复）
```

**这套工作流的核心价值** ：

内容创作者最大的痛点是「有想法但写不快」和「写了很多但相互割裂」。

LLM Wiki 解决了「割裂」的问题——所有文章的知识点互相链接，你可以快速召回过去写过的任何相关内容。

Claudian 的 Inline Edit 解决了「写不快」的问题——不需要切换，选中就改，原地 diff，整个写作流程不中断。

而 Hermes 在背后积累你的「写作技能」——它会学会你偏好的段落结构、你常用的论证模式、你的文章节奏——让每次写作都比上次更顺。

---

## 六、每日运营流：把一切变成习惯

再好的系统，不用就是零。

我来给你一个 **最小可行的每日运营流** ——每天只需要 30-45 分钟维护，就能让系统持续有价值。

### 晨间 15 分钟

text

```
7:30 — 打开系统（运行 start-all.sh）
        ↓
7:32 — 处理 inbox/（昨晚 Web Clipper 采集 + 手机备忘录）
       命令：「处理今天的 inbox，分类 Ingest 或写入 GBrain」
        ↓
7:40 — 查看 SESSION_NOTES.md（昨天未完成的工作）
        ↓
7:42 — 确认今日重点
       命令：「根据我的 Open Threads 和当前项目，
              建议今天最重要的3件事」
        ↓
7:45 — 开始工作
```

### 工作中（随时触发）

text

```
遇到好内容 → Web Clipper 一键采集到 raw/
想到好想法 → Telegram 语音备忘 → Hermes 保存到 inbox/ideas/
完成重要会议 → 语音总结 → Hermes 写入 GBrain
卡在某个问题 → Claudian 侧边栏提问（不离开 Obsidian）
```

### 下班前 10 分钟

text

```
关闭工作前：
「更新今日 SESSION_NOTES.md，
 记录完成的事、关键决策、明天继续的工作」
```

这 10 分钟，是整个系统「连续性」的关键。明天早上，Claude Code 读到这份记录，会直接接上你昨天的工作状态。

### 每周五 20 分钟

text

```
周知识回顾：
「生成本周知识积累报告：
 - LLM Wiki 新增了哪些页面
 - GBrain 更新了哪些关键人物档案
 - Hermes 创建了哪些新技能
 - 本周最重要的知识发现是什么」
        ↓
运行 /lint → 处理紧急错误
        ↓
Graph View 全景看一眼 → 感受知识网络的生长
```

这个周回顾，不只是维护，它是「感受复利」的仪式。

第一周看 Graph View：几十个节点，稀疏连接。 第三个月看 Graph View：几百个节点，密集网络。

那个时刻，你会真正明白「知识复利」不是比喻。

---

## 七、选择你的起点：三条入门路径

前面说了很多，但我知道很多人看完还是会问：「我到底该从哪里开始？」

根据你的情况，我给你三条清晰的入门路径：

### 路径 A：完全新手（从未用过 Obsidian + AI）

**第一周** ：只做一件事

Bash

```
# 1. 安装 Obsidian
# 2. 安装 Claude Code CLI
# 3. 按第二篇文章的教程搭建 LLM Wiki
# 4. 找5篇你最关心领域的文章，完成第一次 Ingest
# 5. 看 Graph View
```

**第二周** ：添加 Obsidian Skills

Bash

```
# 按第三篇文章配置 Obsidian Skills
# 体验 OFM 格式正确的笔记生成
```

**第三周以后** ：根据你的使用感受，决定是否继续添加 GBrain 或 Hermes。

**原则** ：宁可少装一个系统，也不要装了不用。一个运转良好的 LLM Wiki，比六个系统都装上但都不维护，价值大得多。

---

### 路径 B：已有 Obsidian 用户（有一定笔记积累）

**第一周** ：升级现有 Vault

Bash

```
# 1. 安装 Obsidian Skills（让 AI 读懂你的笔记）
# 2. 写你的第一版 CLAUDE.md
# 3. 安装 Claudian（升级日常使用体验）
# 4. 用 LLM Wiki 的模式「重新编译」你已有的笔记
```

**重点** ：不需要清空重建，用 LLM Wiki 的 Ingest 流程，把已有笔记重新编译成互联的知识网络。

**第二周以后** ：按四层金字塔逐层叠加。

---

### 路径 C：已有基础，想要生产级系统

**直接对照本文第三节的融合配置，按顺序执行** ：

Bash

```
# 第1天：统一文件结构 + 融合版 CLAUDE.md
# 第2天：安装 GBrain，导入现有 Obsidian Vault
# 第3天：安装 Hermes，开启四层记忆，连接 Telegram
# 第4天：注册 GBrain + Hermes MCP 到 Claude Code
# 第5天：运行第一次全系统测试
```

**检验标准** ：说一句话，三个系统同步更新——如果做到了，融合成功。

---

## 八、常见问题：最后的答疑

**Q：六个系统都装上，会不会太贵？**

A：有一个心理账期要算清楚：

| 使用模式 | 月均成本 | 对应价值 |
| --- | --- | --- |
| 只用 LLM Wiki + Claude Code | $10-20 | 知识编译，研究效率提升 |
| 加上 GBrain | +$5-15 | 人脉管理，会议记忆 |
| 加上 Hermes | +$15-40 | 技能积累，自动化工作流 |
| 完整系统 | **$30-75/月** | 全面知识操作系统 |

对比你花在 Notion/Obsidian 订阅、各种 SaaS 工具、生产力课程上的费用——这套系统的价值密度高得多。而且越用越省，因为 Hermes 的技能积累会让你的 Token 消耗随时间降低。

**Q：这套系统适合非技术背景的人吗？**

A：坦白说：目前不完全适合。

- LLM Wiki + Obsidian + Claudian：对非技术用户友好，只需会用 Obsidian 和输入命令
- GBrain：需要一点命令行经验，安装有一定门槛
- Hermes：需要命令行经验，GEPA 优化需要 Python 基础

**我的建议** ：如果你是非技术背景，从 LLM Wiki + Claudian 开始，这两个系统的价值已经非常大，门槛也相对低。等用熟了，再考虑是否要深入 GBrain 和 Hermes。

**Q：这套系统一年后还会有价值吗？会不会被新工具取代？**

A：这个问题问得非常好。

这套系统的护城河不是工具本身，而是 **你积累的数据** ：

- 你的 wiki/ 里的知识页面
- 你的 GBrain 里的人物档案和历史记录
- 你的 Hermes skills/ 里积累的技能文件

这些数据，全部是标准 Markdown 格式，存在你本地，不绑定任何服务商。

新工具出现时，你可以直接把这些数据导入新工具——你的积累不会清零。

就像 Karpathy 说的：现在的 AI Agent 工具是「Altair BASIC 时代」——粗糙但方向正确。现在开始积累的人，等工具成熟的时候，已经有了几年的数据复利。

**Q：我现在很忙，能不能只花每天10分钟维护？**

A：可以，但要选择适合10分钟的使用模式：

text

```
最小可行维护（每天10分钟）：
├── 5分钟：处理 inbox（Web Clipper 采集的文章）
└── 5分钟：关闭工作前更新 SESSION_NOTES.md

每周一次（20分钟）：
└── 运行 /lint，处理提示的问题
```

不需要每天都跑 GEPA，不需要每天都维护 GBrain。最小可行维护就能让系统保持健康和增长。

---

## 九、课程毕业项目：一周构建你的完整系统

如果你看完了整个系列，想要系统地实践，我给你设计了一个 **一周毕业项目** 。

text

```
Day 1（周一）：基础设施
├── 安装 Obsidian + Obsidian Skills
├── 写第一版 CLAUDE.md（使用第四篇的模板）
└── 验证：Claude Code 能正确读取 CLAUDE.md

Day 2（周二）：知识编译
├── 准备你领域的 10 篇核心文章
├── 完成第一次完整 Ingest
├── 查看 Graph View
└── 验证：wiki/ 里有 30+ 页面，有连线

Day 3（周三）：AI 协作
├── 安装 Claudian
├── 体验 Inline Edit（修改3段不满意的笔记）
└── 验证：选中文字 → 快捷键 → 原地 diff

Day 4（周四）：知识大脑（可选）
├── 安装 GBrain
├── 导入现有 Obsidian Vault
├── 创建5个人物档案（Compiled Truth + Timeline 格式）
└── 验证：gbrain search 能返回有意义的结果

Day 5（周五）：自进化引擎（可选）
├── 安装 Hermes，开启四层记忆
├── 完成3个复杂任务，触发自动技能创建
├── 连接 Telegram
└── 验证：~/.hermes/skills/ 里出现了新技能文件

Day 6（周六）：全系统融合
├── 执行本文第三节的融合配置
├── 注册 GBrain + Hermes MCP 到 Claude Code
├── 运行「一句话更新三个系统」测试
└── 验证：说一件事，三个系统同步更新

Day 7（周日）：展示与规划
├── 截图你的 Graph View
├── 展示你的 wiki/ 文件夹（有多少页面？）
├── 规划未来30天的维护节奏
└── 在课程社群分享你的成果
```

**毕业标准** ：

text

```
✅ wiki/ 里有 30+ 页面，Graph View 有明显的连线网络
✅ 执行过完整的 /ingest + /lint 流程
✅ Claudian 的 Inline Edit 已经用过
✅ SESSION_NOTES.md 已经写过至少一次
✅ 说得出「下周要继续做的一件事」
```

---

## 尾声：给未来的你写一封信

我想用一段话结束这个系列。

十年前，「第二大脑」这个概念开始流行。

人们开始用 Evernote、Notion、Obsidian 记录一切，期待有一天这些笔记能帮助他们更聪明地工作。

但大多数人的第二大脑，最终变成了一个数字仓库——东西进去，就再也找不到了。你写下的东西只是安静地躺在那里，不会自动连接，不会帮你行动，更不会随时间变聪明。

2026 年，情况变了。

不是因为工具更好看了，不是因为功能更多了。

而是因为现在有了一个图书管理员——它不会忘记添加反向链接，不会留下未完成的文章，能读50篇文章并生成一致的摘要，能在你睡觉时整理今天的所有信息，能从你完成的任务里提炼出可复用的工作流。

**这个图书管理员，就是 LLM。**

你的任务，不再是「维护知识库」，而是「决定图书馆里放什么书」。

Karpathy 花了一个下午写了一篇想法文件，1960 万人看到了，5000人立刻开始搭建自己的 LLM Wiki。

Garry Tan 用11天搭了一个系统，然后开源了，首日 5400 颗星。

Nous Research 发布了 Hermes，七周 105,000 颗星，ICLR 2026 口头报告。

Obsidian CEO 写了5个技能文件，教会 AI 说 Obsidian 的母语。

这些不是孤立的事件。这是一个时代的集体觉醒： **知识工作的方式正在被重新定义。**

你现在搭建的这套系统，不是一个工具，而是一个会随时间增值的资产。

六个月后，你 LLM Wiki 里的知识网络，是你花了六个月时间一篇一篇积累起来的——没有人能复制，也没有人能抄捷径。

一年后，你 Hermes 积累的技能库，是从你真实工作中提炼出来的——它比任何通用 AI 都更了解你的工作方式。

三年后，你 GBrain 里的人物档案和时间线，是你三年来所有重要关系的完整历史——它会在你最需要的时刻，帮你想起五年前和某个人说过的话。

**这就是知识复利的真正含义。**

现在是开始的最好时机。

> 💬 **你是哪种人群？** 研究者 / 创业者 / 开发者 / 内容创作者——在评论区告诉我，我帮你确认最适合你的入门路径。

---

**系列完整目录回顾**

| 篇 | 标题 | 核心内容 |
| --- | --- | --- |
| 第1篇 | Karpathy 用一篇 Gist 让1960万人重新思考 AI | LLM Wiki 思想 |
| 第2篇 | 30分钟从零搭建 LLM Wiki | LLM Wiki 实操 |
| 第3篇 | Obsidian CEO 亲自写了5个技能文件 | Obsidian Skills |
| 第4篇 | CLAUDE.md 不是配置文件，是你 AI 系统的宪法 | Context Engineering |
| 第5篇 | 不用离开 Obsidian，右键就能让 AI 重写你的笔记 | Claudian |
| 第6篇 | YC CEO 开源了他的 AI 大脑 | GBrain |
| 第7篇 | 7周105,000颗星，自我进化不是噱头 | Hermes Agent |
| 第8篇 | 花了$3让它优化了一个技能，结果让我沉默了3秒 | Hermes 实操 |
| **第9篇** | **六大系统全部打通：终极 AI 知识操作系统** | **系列终章** |

---

*一只阿木木 | 公众号同名 | 专注 AI 实战落地* *转载请注明出处*

**我是一只阿木木 | AI数字大脑实践者**

**扫码加入行动营👇**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**或搜索公众号：一只阿木木**  
获取更多Obsidian + AI数字大脑方法论

**微信扫一扫赞赏作者**

作者提示: 个人观点，仅供参考

继续滑动看下一个

一只阿木木

向上滑动看下一个