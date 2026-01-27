---
title: 📥 Inbox Dashboard
tags:
  - inbox
  - dashboard
created: 2026-01-09
updated: 2026-01-09
---

> [!info] 這個 Dashboard 用於即時監控 **收件箱（Inbox）** 的筆記、未完成任務與搬移狀態。建議固定在側邊欄或每日打開檢視。

# 📊 收件箱概覽
---

## 1️⃣ 本週新增筆記統計
```dataview
TABLE file.ctime AS "建立時間", status, length(file.tasks) AS "任務數"
FROM "0 Personals/📥 00_InBox"
WHERE file.ctime >= date(today) - dur(7 days)
SORT file.ctime DESC
```

## 2️⃣ 待處理筆記（status = draft）

```dataview
TABLE
    file.link AS "筆記",
    file.ctime AS "建立時間",
    length(filter(file.tasks, (t) => !t.completed)) AS "未完成任務"
FROM "0 Personals/📥 00_InBox"
WHERE status = "draft"
SORT file.ctime DESC
```

## 3️⃣ 未完成任務總覽（所有 Inbox 筆記）

```dataview
TABLE
    file.link AS "筆記",
    task.text AS "任務",
    task.due AS "截止日",
    task.completed AS "已完成"
FROM "0 Personals/📥 00_InBox"
WHERE !task.completed
SORT task.due ASC
```

##  超時任務（截止日已過且未完成）

```dataview
TABLE
    file.link AS "筆記",
    task.text AS "任務",
    task.due AS "截止日"
FROM "0 Personals/📥 00_InBox"
WHERE !task.completed AND task.due <= date(today)
SORT task.due ASC
```

## 5️⃣ 搬移成功率（根據 `status` 欄位）

```dataview
TABLE file.link AS "筆記", status
FROM "0 Personals/📥 00_InBox"
WHERE status = "draft"
```

```dataview
TABLE file.link AS "筆記", status
FROM "0 Personals/📥 00_InBox"
WHERE status = "in-progress"
```

```dataview
TABLE file.link AS "筆記", status
FROM "0 Personals/📥 00_InBox"
WHERE status = "completed"
```
## 6️⃣ 最近 5 條捕獲摘要（快速瀏覽）

```dataview
TABLE
    file.link AS "筆記",
    summary AS "摘要",
    file.ctime AS "建立時間"
FROM "0 Personals/📥 00_InBox"
WHERE summary
SORT file.ctime DESC
LIMIT 5
```

# 📈 圖形化統計（DataviewJS）

> 以下程式碼會產生一個簡易柱狀圖，顯示過去 7 天每日新增筆記數。若不需要圖形，可直接刪除此段落。
```dataviewjs
// 取得過去 7 天的筆記數量
let start = dv.date("today").minus(dv.duration("7 days"));
let data = dv.pages('"0 Personals/📥 00_InBox"')
            .where(p => p.file.ctime >= start)
            .groupBy(p => p.file.ctime.toFormat("yyyy‑MM‑dd"))
            .map(g => ({date: g.key, count: g.rows.length}))
            .sort((a,b)=> a.date.localeCompare(b.date));

// 建立 Canvas
let container = this.container;
container.empty();
let canvas = container.createEl("canvas", {cls:"dvjs-canvas"});
canvas.width = 420;
canvas.height = 200;
let ctx = canvas.getContext("2d");

// 繪製柱狀圖
let max = Math.max(...data.map(d=>d.count),1);
let barWidth = 40;
let gap = 20;
data.forEach((d,i)=>{
    let height = (d.count / max) * 150;
    ctx.fillStyle = "#4A90E2";
    ctx.fillRect(i*(barWidth+gap)+30, 180-height, barWidth, height);
    ctx.fillStyle = "#000";
    ctx.fillText(d.date, i*(barWidth+gap)+30, 190);
    ctx.fillText(d.count, i*(barWidth+gap)+30, 170-height);
});
```

# 🛠️ 使用說明

1. **每日檢視**：先看「待處理筆記」表格，使用 **QuickAdd → 搬移至** 宏（快捷鍵 `Ctrl+Shift+M`）把筆記搬到正確的 PARA 資料夾。
2. **任務管理**：在「未完成任務總覽」或「超時任務」表格中點擊任務文字，即可在原筆記內勾選完成。
3. **效能回顧**：每週檢查「搬移成功率」與「本週新增筆記統計」表格，評估捕獲流程是否需要優化（例如調整模板欄位、增減 QuickAdd 宏）。
4. **圖形化**：若在手機端使用，確保已啟用 **DataviewJS** 插件，圖表會自動渲染。

---

> **小技巧**
> 
> - 若你同時使用 `tags` 來標示收件箱（例如 `#inbox`），可以把 `WHERE status = "draft"` 改成 `WHERE contains(file.tags, "inbox")`，這樣即使其他插件改寫 `status`，仍能正確過濾。
> - 想把「未完成任務」匯出為 CSV？在表格右上角點三點 → **Export to CSV** 即可。

祝你的收件箱保持乾淨、資訊可追蹤，工作效率大幅提升 🚀