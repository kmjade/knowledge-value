---
title: Obsidian Flashcards 外掛
status: active
tags: [Obsidian, Flashcards, plugin, spaced-repetition]
aliases: [Obsidian Flashcards Plugin]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian Flashcards 外掛

## 定義

Flashcards 是 Obsidian 中的閃念學習外掛，支持間隔重複學習算法（SRS），可在 Obsidian 中創建和複習學習卡片。

## 核心功能

### 間隔重複學習
- 基於 SM-2 算法的間隔重複
- 自動安排複習時間
- 追蹤學習進度和記憶率

### 卡片類型
- 基本卡片（問題-答案）
- 雙向卡片
- 填空卡片
- 圖片卡片

### 學習界面
- 可視化的卡片學習界面
- 進度統計和學習報告
- 支持鍵盤快捷鍵

## 卡片格式

### 基本卡片
```markdown
<!-- Flashcards -->

Q: What is Obsidian?
翻譯：什麼是 Obsidian？
提示：A powerful note-taking app using Markdown files.
答案：Obsidian is a powerful knowledge management app using Markdown files.
```

### 雙向卡片
```markdown
<!-- Flashcards -->

Q: Obsidian 的核心檔案格式是什麼？
翻譯：What is the core file format of Obsidian?
答案：Markdown

Q: Markdown 是什麼軟體的核心檔案格式？
答案：Obsidian
```

### 填空卡片
```markdown
<!-- Flashcards -->

# 管理
```

### 圖片卡片
```markdown
<!-- Flashcards -->

Q: 識別這個界面組件
![[screenshot.png]]
翻譯：Identify this UI component
答案：圖表視圖（Graph View）
```

# 工作流

### 創建卡片
1. 在筆記中編寫卡片內容
2. 使用標準的卡片格式
3. 新增提示和翻譯（可選）

### 複習卡片
1. 打開 Flashcards 面板
2. 選擇要複習的牌組
3. 根據記憶程度評級
4. 系統自動安排下次複習

### 導出卡片
- 支持 Anki 格式導出
- 可將卡片導出為 CSV
- 便於在其他應用中使用

## 與其他工具整合

### Anki 整合
- 直接從 Obsidian 創建 Anki 卡片
- 支持卡片格式轉換
- 保持兩端同步

### 學習計劃
- 與 [[閃念-學習]] 系統結合
- 與學習筆記關聯
- 追蹤學習進度

## 最佳實踐

### 卡片設計
- 保持問題簡潔明確
- 答案要準確完整
- 使用圖片和示例增強理解
- 新增提示降低難度

### 學習策略
- 每日固定時間複習
- 分散學習而非集中學習
# 更新
- 追蹤學習效果

# 管理
- 使用標籤分類卡片
- 為不同學習主題創建牌組
- 定期清理過時或無用的卡片
- 備份重要的卡片庫

## 應用場景

### 語言學習
- 單詞和短語記憶
- 語法規則複習
- 翻譯練習

### 技術知識
- 概念定義
- 技術術語
- 命令和快捷鍵

### 考試準備
- 重點知識點
- 公式和定理
- 歷史事件和日期

## 相關筆記

- [[Obsidian 外掛生態]]
- [[2 Areas/05-Learning/閃念-學習.md]]
- [[2 Areas/05-Learning/持續學習.md]]

## 參考資源

- [Flashcards 外掛文檔](https://github.com/st3v3nmw/obsidian-spaced-repetition)
- [Anki 手冊](https://docs.ankiweb.net/)
