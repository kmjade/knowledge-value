---
aliases:
project:
  - "[[个人知识管理]]"
title: 📓 少记·分层·AI 辅助
para: project
domain:
  - "[[Digital Organization]]"
created: 2026-01-08 01:15
status: active
tags:
  - "#learning"
  - "#para"
  - "#ai"
---
# 📓 少记·分层·AI 辅助
---
> [!note] **核心概念**：
> 在 AI 时代，笔记的价值在于「少而精」而不是「多而杂」。通过分层（Raw → Core） + AI 快速摘要，我们把低价值噪音留在 Raw 层，只把「可执行、可复用、可连接」的核心内容搬进 Core 层（即 PARA 中的 Projects / Areas / Resources）。

## 1️⃣ 文章要点（3‑点法）
1. **核心结论**：AI 让记笔记成本几乎为零，真正的效率来源是主动削减笔记数量。  
2. **潜在争议**：有人认为大量原始素材对后期模型训练有价值，但实际使用中会导致「上下文污染」。  
3. **可行动建议**：采用「Inbox → Raw → Core」二阶段筛选：24 h 复审后，只保留满足三条规则的笔记（未来使用场景、价值转变、单一钩子），其余归档或删除。

---

> **后续动作**（待办）  
- [x] 将本笔记从 Inbox 移动到对应的 PARA 分类（见下文）。 ✅ 2026-01-08
- [ ] 在 `3 Resources/学习/少记法` 中创建学习手册。  
- [ ] 在 `2 Areas/个人知识管理` 中编写 PARA 管理手册。


---

### 2️⃣ 使用 PARA 框架对该笔记进行分类管理

| PARA 维度   | 目标文件夹                           | 说明                                                                          | 示例文件路径                              |
| --------- | ------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| Projects  | `1 Projects/个人知识管理/少记·分层·AI 辅助` | 若该笔记是正在进行的项目（例如：正在撰写一篇《少记法》文章），放这里并在笔记中添加 `type: project`、`status: active`。 | `1 Projects/个人知识管理/少记·分层·AI 辅助.md`  |
| Areas     | `2 Areas/个人知识管理`                | 若该笔记是长期关注的领域（如「个人知识管理」），把它放在领域下的资源子文件夹中，标记 `type: area`。                    | `2 Areas/个人知识管理/资源/少记·分层·AI 辅助.md`  |
| Resources | `3 Resources/学习/少记法`            | 若该笔记是 学习/参考 资料，放在资源层。这里的笔记会被其他项目或领域引用。                                      | `3 Resources/学习/少记法/少记·分层·AI 辅助.md` |

> 推荐做法：因为这篇笔记本身是 学习资料，我们把它最终放到 Resources → 学习 → 少记法，并在 `2 Areas/个人知识管理` 中创建一个“管理手册”，引用此资源。

---

### 3️⃣ 学习资料（Resources）示例

文件路径：`3 Resources/学习/少记法/少记·分层·AI 辅助 手册.md`

```markdown
---
title: "少记·分层·AI 辅助 手册"
date: "{{tp.date.now('YYYY-MM-DD')}}"
type: resource
status: "active"
tags: ["#learning", "#para", "#ai"]
---

# 少记·分层·AI 辅助 手册

## 目标
帮助使用者在 AI 环境下实现**少记、分层、可复用**的笔记体系。

## 关键步骤
1. **捕获** → 使用 QuickAdd 把所有原始信息塞进 `0 Personals/📥 00_InBox`。  
2. **AI 初筛** → 在 `00_InBox` 中运行 Templater 模板 `note-summary.md`（调用 `gpt‑oss:120b‑cloud`），生成 **3‑点摘要**（结论、争议、行动）。  
3. **24 h 二次筛选** → 运行 `moveToCore.js`，只保留满足“三条规则”的笔记并搬入 `01_Core`（对应的 Projects/Areas/Resources）。  
4. **定期归档** → 每周在 `09_Weekly Review.md` 中触发 `autoArchive.js`，把已完成且超过 30 天的笔记移至 `04 Archives`。

## 案例
- **原始笔记**：`0 Personals/📥 00_InBox/📓 少记·分层·AI 辅助.md`  
- **AI 摘要**：见原始笔记的 “文章要点（3‑点法）”。  
- **最终归档**：`3 Resources/学习/少记法/少记·分层·AI 辅助.md`

## 常见问题
- **Q：为什么不直接把原始笔记放在 Resources？**  
  A：保留 Raw 层可以防止一次性决策错误，给 AI 机会先进行粗筛；只有经二次筛选的笔记才进入 Core，保持知识库干净。  

- **Q：如何快速批量搬迁？**  
  A：使用 Obsidian Custom JS 配合 `moveToCore.js`，可一次处理全部超过 24 h 的 Raw 笔记。  

---

> **🔗 关联手册**：[[🗂️ PARA 管理手册（Areas）]]
```
---

### 4️⃣ 管理手册（Areas）示例

文件路径：`2 Areas/个人知识管理/🗂️ PARA 管理手册（Areas）.md`

```markdown
---
title: "🗂️ PARA 管理手册（Areas）"
date: "{{tp.date.now('YYYY-MM-DD')}}"
type: area
status: "active"
tags: ["#para", "#management"]
---

# PARA 框架在 Obsidian 中的实战手册（针对 Areas）

## 目录
1. [文件结构总览](#文件结构总览)  
2. [从 Inbox 到 Core 的全流程](#从-inbox-到-core-的全流程)  
3. [项目、领域、资源的划分原则](#项目领域资源的划分原则)  
4. [常用插件配置（QuickAdd、Templater、Dataview）](#常用插件配置)  
5. [维护与归档（Weekly Review）](#维护与归档)  

---

### 1️⃣ 文件结构总览

0 Personals/
  ├─ 📥 00_InBox/ ← 所有即时捕获的原始笔记
  └─ 📦 01_Core/ ← 经筛选后的核心笔记（符合三条规则）
1 Projects/
2 Areas/
3 Resources/
4 Archives/ ← 已完成或不再活跃的记录

### 2️⃣ 从 Inbox 到 Core 的全流程
| 步骤 | 操作方式 | 插件/脚本 |
|------|----------|-----------|
| **捕获** | QuickAdd → “捕获原始素材” → 填写标题 + 内容 | QuickAdd Macro + `Create a raw.js` |
| **AI 初筛** | 在 `00_InBox` 中运行 Templater 模板 `note-summary.md`（调用 `gpt‑oss:120b‑cloud`） | Templater |
| **24 h 二次筛选** | 脚本 `moveToCore.js` 自动检查三条规则 → 搬入对应的 `01_Core` 子文件夹 | Custom JS |
| **归档** | 每周打开 `09_Weekly Review.md` → 脚本 `autoArchive.js` 将 `status: done` 且 >30 天的笔记搬至 `04_Archives` | Custom JS |

### 3️⃣ 项目 / 领域 / 资源 的划分原则
| 类型 | 何时使用 | 示例 |
|------|----------|------|
| **Project** | 有明确起止时间、可交付成果的任务 | “撰写《少记·分层·AI 辅助》文章”。 |
| **Area** | 持续维持、长期关注的职责或兴趣 | “个人知识管理”。 |
| **Resource** | 静态参考资料、学习材料 | “少记法学习手册”。 |

### 4️⃣ 常用插件配置
- **QuickAdd**：创建宏 `捕获原始素材`（两段 Prompt + Run JS）。  
- **Templater**：模板 `note-summary.md`（调用 Ollama）。  
- **Dataview**：在 `01_Core` 中创建看板，实时展示各类笔记的数量与状态。  
- **Obsidian Custom JS**：放置 `moveToCore.js` 与 `autoArchive.js`，在 Settings → Custom JS → *Run daily* 中设定时间点。  

### 5️⃣ 维护与归档（Weekly Review）
在 `09_Weekly Review.md`（Periodic Notes）底部加入：
每次打开该周报时，脚本会自动把已完成且超过 30 天的笔记归档，保持核心库整洁。

---

> **📌 小结**  
1️⃣ 所有原始信息进入 `0 Personals/📥 00_InBox`。  
2️⃣ 用 AI 生成 3‑点摘要并放回同文件。  
3️⃣ 24 h 后执行 `moveToCore.js`，只保留满足 **未来使用场景 / 价值转变 / 单一钩子** 的笔记。  
4️⃣ 根据内容类型搬到 **Projects / Areas / Resources**。  
5️⃣ 每周归档，保持轻量化的第二大脑。


```