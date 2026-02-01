
## QuickAdd + PARA 完整內嵌腳本指南

（適用於 Obsidian ≥ 1.5，插件版本：QuickAdd v0.9.23、Templater v1.10.0、Dataview v0.5.62）

> 目標：用一次 QuickAdd 呼叫就完成  
> 1️⃣ 輸入名稱 → 2️⃣ 自動在對應的 `1 Projects / 2 Areas / 3 Resources` 內新建子資料夾 → 3️⃣ 建立「00 Summary.md」概覽筆記（含 front‑matter）→ 4️⃣ 更新頂層儀表盤（Projects / Areas / Resources Index）。  
> 所有步驟都寫在 QuickAdd 的 Script Action 裡，無需手動拖檔或再跑模板。

---

## 1️⃣ 前置工作

|步驟|操作|
|---|---|
|1️⃣|在 Obsidian Settings → Community plugins 中安裝 QuickAdd、Templater、Dataview（若要自動更新 Dashboard 需要 Dataview）。|
|2️⃣|在 Vault 根目錄建立固定的 PARA 資料夾（名稱可自行修改，本文用的名稱與你提供的結構一致）：  <br>`1 Projects`、`2 Areas`、`3 Resources`、`4 Archives`、`_meta_/scripts`、`_templates/PARA`、`_templates/Base`。|
|3️⃣|在 `_templates/Base` 中放一個 最小 Front‑matter（供所有概覽頁使用），檔名 `frontmatter.md`：|

markdown

```
---
title: "{{tp.file.title}}"
date: "{{tp.date.now('YYYY-MM-DD')}}"
type: ""          # project / area / resource / archive / zettel
status: "inbox"   # inbox | active | done | archived
outcome: ""       # 只對 project 有意義
action_plan: ""   # 只對 project 有意義
tags: []          # 其他自訂標籤
---
```

> 之後的腳本會 `await tp.file.include("[[Base/frontmatter]]")` 把這段前置資訊插入概覽筆記。

---

## 2️⃣ QuickAdd Macro ‑「新建 PARA 項目」的完整配置

以下示範 「新建專案」（Project），Area、Resource 只需把路徑、type 改成對應值即可。

### 2.1 建立 Macro

1. Settings → QuickAdd → Macros → “New Macro” → 取名 `New PARA Project`（或任意你喜歡的名字）。
2. 把 Macro 設為 “Run multiple actions (Macro)”，點 Add Action 依次加入三個 Action：

|Action 編號|Type|目的|重要欄位/代碼|
|---|---|---|---|
|A|Prompt|讓使用者輸入 _專案名稱_（可同時輸入子標題）|Prompt Text：`Project name (e.g. Implement PARA in Obsidian)`  <br>Variable Name：`projectName`|
|B|Run JavaScript|根據輸入建立子資料夾、概覽筆記、寫入 front‑matter，並把 folder 路徑存到 `args.folderPath` 供後續使用|Script（詳見下方 2️⃣ B‑Script）|
|C|Run JavaScript|更新三個頂層 Index（Dashboard）|Script（見 2️⃣ C‑Script）|

> 提示：QuickAdd 會把 Action B、C 的 `args` 物件自動串聯，你在 B 裡設定 `args.folderPath = folderPath;`，C 中即可直接讀取 `args.folderPath`（即使 C 不需要也可以留空）。

### 2.2 Action B – 建立子資料夾 + 00 Summary.md

在 Action B 的「Script」區塊貼上以下程式，全部貼入（不需要再加 `module.exports = …`，QuickAdd 會自動把內容包在一個 async function 內）：


```js
// ----------- QuickAdd Action B – 新建 Project Folder & Summary ----------
/*
  這段程式會被 QuickAdd 以 async function(args, app) 的形式執行
  args 內已經有 QuickAdd 前一個 Action（Prompt）產生的變數：
    args.projectName   ← 使用者輸入的專案名稱
*/

const projectName = args.projectName?.trim();
if (!projectName) {
  new Notice("⚠️ 請輸入專案名稱");
  return;
}

/* ---------- 常量 ---------- */
const ROOT = app.vault.adapter;                 // 直接操作檔案系統
const baseFolder = "1 Projects";                // 頂層資料夾（可自行改）
const summaryFileName = "00 Summary.md";         // 概覽筆記的檔名

/* ---------- 建立子資料夾 ---------- */
const folderPath = `${baseFolder}/${projectName}`;
if (await ROOT.exists(folderPath)) {
  new Notice(`⚠️ 資料夾已存在: ${folderPath}`);
} else {
  await ROOT.mkdir(folderPath);
}

/* ---------- 建立概覽筆記（00 Summary.md） ---------- */
const summaryPath = `${folderPath}/${summaryFileName}`;

// 若概覽筆記已經存在，就直接打開；否則創建
if (await ROOT.exists(summaryPath)) {
  new Notice(`✅ 概覽已存在，直接打開`);
  await app.workspace.openLinkText(summaryPath, "", false);
  // 把路徑傳給下一個 Action（Dashboard 更新）使用
  args.folderPath = folderPath;
  return;
}

/* ---- 用 Templater 模板產生概覽內容 ---- */
// 這裡直接寫入最小的 Front‑matter + 標題，之後會由 Templater 追加更多模板內容
const frontMatter = await tp.file.include("[[Base/frontmatter]]");
const content = `${frontMatter}
---
type: project
status: active
---
# ${projectName}
> 這裡是專案概覽，請在下面填寫 **目標**、**行動計畫** 等。

## 🎯 Desired Outcome
> (填寫)

## 🗓️ Action Plan
> (填寫)

`;

await ROOT.write(summaryPath, content);

// 打開新建的概覽筆記
await app.workspace.openLinkText(summaryPath, "", false);

// 把 folderPath 存到 args 供後續 Action 使用
args.folderPath = folderPath;
new Notice(`✅ 新建專案 ${projectName}`);
```

說明

|步驟|目的|
|---|---|
|讀取 `args.projectName`|從 Prompt Action 取得使用者輸入|
|`await ROOT.mkdir(folderPath)`|在 `1 Projects` 下創建子資料夾|
|`await ROOT.write(summaryPath, content)`|用最小 front‑matter + 標題寫入 `00 Summary.md`|
|`await app.workspace.openLinkText(...)`|完成後自動切換到概覽筆記|
|`args.folderPath = folderPath`|把新資料夾路徑塞進 `args`，讓下一個 Action 能拿到|

> 如果想使用更完整的 Templater 模板（比如已經設計好的「Project Summary」），只要把 `summaryPath` 的內容改成 `await tp.file.create_new(content, summaryPath);` 或是直接呼叫 `await tp.file.include("[[PARA/ProjectSummary]]")`，然後把 `projectName` 傳入模板中的變數即可（見下面的可選方案）。

---

### 2️⃣ C – 更新頂層儀表盤（Dashboard）

在 Action C 的腳本區塊貼上：


```js
// ----------- QuickAdd Action C – 更新 Dashboard ----------
/*
  這段程式會在每次新建 Project / Area / Resource 後執行。
  我們只需要重新渲染三個 Index 頁面：
  - 1 Projects/1 Projects Index.md
  - 2 Areas/2 Areas Index.md
  - 3 Resources/3 Resources Index.md
*/

const indexes = [
  "1 Projects/1 Projects Index.md",
  "2 Areas/2 Areas Index.md",
  "3 Resources/3 Resources Index.md"
];

for (const filePath of indexes) {
  const file = app.vault.getAbstractFileByPath(filePath);
  if (!file) {
    console.warn(`Dashboard not found: ${filePath}`);
    continue;
  }
  // 讀取後寫回相同內容，觸發 Dataview 重繪
  const content = await app.vault.read(file);
  await app.vault.modify(file, content);
}

new Notice("✅ Dashboard 已刷新");
```

功能說明

- `await app.vault.modify(file, content)` 會「重新寫一次」同樣的文字，Dataview 會自動重新計算，於 Graph View、Table 都會即時更新。
- 如果你想只刷新 新增的那個類別（例如只更新 Projects），可以在前面的 Action B 把 `args.type = "project"`，然後在此腳本根據 `args.type` 只針對相應的 Index。

---

## 3️⃣ 為 Area、Resource 建立相同結構的 Macro

只需要把上述 Macro 複製兩份，分別改以下幾個地方：

|原欄位|Project（不變）|Area|Resource|
|---|---|---|---|
|Prompt Text|`Project name …`|`Area name …`|`Resource name …`|
|Variable Name|`projectName`|`areaName`|`resourceName`|
|`baseFolder`|`1 Projects`|`2 Areas`|`3 Resources`|
|`type`（front‑matter）|`project`|`area`|`resource`|
|Summary file name（若想統一）|`00 Summary.md`（同樣）|`00 Summary.md`|`00 Summary.md`|
|Macro 名稱|`New PARA Project`|`New PARA Area`|`New PARA Resource`|

簡化寫法（共用腳本）  
如果你不想維護三個相同結構的 Macro，可以在 同一個 Macro 裡加入一個 QuickAdd Choice Prompt 讓使用者先選「Project / Area / Resource」再輸入名稱，然後在腳本裡根據選擇動態決定 `baseFolder` 與 `type`：


```js
// Choice Prompt (QuickAdd) – 先選類別
// 在 Macro 的第一個 Action 設為 Prompt，Variable Name = "category"
// Prompt Text = "Choose category: project / area / resource"

const category = args.category?.toLowerCase();
if (!["project","area","resource"].includes(category)) {
  new Notice("⚠️ 請輸入 project / area / resource");
  return;
}

// 第二個 Prompt 取得名稱，變數名 = "itemName"
// .... (同上) 之後根據 category 設定常量：
const baseFolder = {
  project: "1 Projects",
  area:    "2 Areas",
  resource:"3 Resources"
}[category];

const type = category; // 用於 front‑matter

// 接下來的程式碼與上面的 Action B 完全相同，只是把 const
//   baseFolder、type 替換成上述變數即可
```

這樣只需要 一個 Macro（`New PARA Item`）即可完成全部三類型的捕獲。

---

## 4️⃣ 進階：在已存在的 Project/Area/Resource 中快速新增筆記

> 需求：在某個專案（或領域、資源）下快速寫筆記，同時自動在概覽頁的「Notes in this folder」區塊顯示（Dataview 已自動支持），而且筆記會帶有 `type`、`status`、`tags` 等屬性。

### 4️⃣ A – 建立「Add note to current PARA item」的 QuickAdd Macro

1. Macro 名稱：`Add note to PARA item`
2. Action 1 – Prompt：`Enter note title` → 變數 `noteTitle`
3. Action 2 – Prompt：`Select target folder (use fuzzy search)` → 變數 `targetFolder`（此處可以使用 QuickAdd 的「Search”功能」）
    - 設定 → `Search in vault` → `Folder` → `1 Projects`, `2 Areas`, `3 Resources`（共三個根目錄）
    - 使用者可以直接輸入子資料夾名稱（例如 `Implement PARA in Obsidian/Define My PAR`）
4. Action 3 – Run JavaScript：以下腳本把筆記寫入所選資料夾，並自動寫入 front‑matter。


```js
// ----------- Add note to selected PARA folder -------------
const noteTitle = args.noteTitle?.trim();
const targetFolder = args.targetFolder?.trim();   // 例如: 1 Projects/Implement PARA in Obsidian

if (!noteTitle || !targetFolder) {
  new Notice("⚠️ 需要標題與目標資料夾");
  return;
}

// 確保目標資料夾真的存在
const adapter = app.vault.adapter;
if (!await adapter.exists(targetFolder)) {
  new Notice(`⚠️ 找不到資料夾 ${targetFolder}`);
  return;
}

// 檔名 → 使用時間戳 + 標題（避免同名衝突）
const ts = tp.date.now("YYYYMMDDHHmmss");
const fileName = `${ts} ${noteTitle}.md`;
const filePath = `${targetFolder}/${fileName}`;

// 生成 front‑matter（繼承上層類型）
let type = "";
if (targetFolder.startsWith("1 Projects"))   type = "project";
else if (targetFolder.startsWith("2 Areas"))    type = "area";
else if (targetFolder.startsWith("3 Resources"))type = "resource";

const frontMatter = await tp.file.include("[[Base/frontmatter]]");
const content = `${frontMatter}
---
type: ${type}
status: active
tags: []
---
# ${noteTitle}

> 這裡撰寫筆記內容
`;

await adapter.write(filePath, content);
await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ 新建筆記 ${fileName}`);
```

> 小技巧：如果你想在建立筆記時自動加入「相關 Project」的連結，可以在腳本裡把 `targetFolder` 的最後一層名稱（即專案資料夾名稱）插入 `[[...]]`。例如：


```js
const projectName = targetFolder.split("/").pop();
content = `${frontMatter}
---
type: ${type}
status: active
tags: []
related_project: "[[${projectName}]]"
---
# ${noteTitle}
...
`;
```


在概覽頁可使用 Dataview 把 `related_project` 欄位顯示為連結。

---

## 5️⃣ 進階自動歸檔（將完成的 Project/Area/Resource 移到 Archives）

### 5️⃣ A – 手動觸發的「Archive Completed Items」Macro

|Action|說明|
|---|---|
|Prompt|`Enter item type (project / area / resource)` → `itemType`|
|Prompt|`Enter folder name (or leave empty for all)` → `folderName`|
|Run JavaScript|下面的腳本會把符合 `status = "done"` 且 `completed` 超過 30 天的筆記搬到 `4 Archives/{type}` 內。|


```js
// ----------- Archive Completed Items ----------
const itemType = args.itemType?.toLowerCase();   // project / area / resource
const folderName = args.folderName?.trim();      // 可空，表示全部

if (!["project","area","resource"].includes(itemType)) {
  new Notice("⚠️ 請選擇正確類型");
  return;
}

// 根目錄
const rootFolder = {
  project: "1 Projects",
  area:    "2 Areas",
  resource:"3 Resources"
}[itemType];

const archiveRoot = "4 Archives";

// 取得符合條件的筆記（使用 Dataview API 也可以，這裡直接遍歷檔案）
const adapter = app.vault.adapter;
const allFiles = await app.vault.getFiles();
let moved = 0;

for (const file of allFiles) {
  if (!file.path.startsWith(rootFolder)) continue; // 只看指定類別
  if (folderName && !file.path.includes(`/${folderName}/`)) continue; // 限制子資料夾

  const cache = app.metadataCache.getFileCache(file);
  const fm = cache?.frontmatter;
  if (!fm) continue;

  // 必須是 done 且 有 completed 日期
  if (fm.status?.toLowerCase() !== "done" || !fm.completed) continue;

  const completedDate = new Date(fm.completed);
  const now = new Date();
  const diffDays = (now - completedDate) / (1000 * 60 * 60 * 24);
  if (diffDays < 30) continue; // 未滿 30 天不搬

  // 計算新路徑
  const subPath = file.path.replace(`${rootFolder}/`, ""); // remove root prefix
  const newPath = `${archiveRoot}/${itemType}/${subPath}`;

  // 確保目標資料夾存在
  const targetFolder = newPath.split("/").slice(0, -1).join("/");
  if (!await adapter.exists(targetFolder)) await adapter.mkdir(targetFolder);

  // 搬檔
  await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

  // 更新 front‑matter 為 archived
  let content = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
  content = content.replace(/status:\s*done/i, "status: archived");
  await app.vault.modify(app.vault.getAbstractFileByPath(newPath), content);

  moved++;
}

new Notice(`✅ 已歸檔 ${moved} 個 ${itemType}`);
```

> 自動化  
> 把這段腳本放在 `_meta_/scripts/autoArchive.js`，然後在 Weekly Review（或每日筆記）底部插入 `![[_meta_/scripts/autoArchive.js]]`，每次複盤時執行一次。

---

## 6️⃣ 可選方案：把概覽筆記交給 Templater（更易維護）

如果概覽頁的內容較複雜（例如需要插入子模板、表格等），建議把 概覽模板 放在 `_templates/PARA/ProjectSummary.md`，腳本只負責「建立檔案」與「把變數傳給模板」：

#### 6️⃣ B – Project Summary Templater 模板（示例）

`_templates/PARA/ProjectSummary.md`

```markdown
<%*
await tp.file.include("[[Base/frontmatter]]");
%>
---
type: project
status: active
outcome: ""
action_plan: ""
tags: []
---
# {{tp.file.title}}

## 🎯 Desired Outcome
> (在此填寫)

## 🗓️ Action Plan
> (在此填寫)

## 📂 Notes in this folder
```dataview
LIST
FROM "{{tp.file.folder(true)}}"
WHERE file.name != this.file.name
SORT file.mtime DESC
```
```


````

#### 6️⃣ C – 在 QuickAdd Action B 中呼叫該模板

```js
// QuickAdd Action B – 使用 Templater 創建概覽
const summaryPath = `${folderPath}/00 Summary.md`;
if (await ROOT.exists(summaryPath)) {
  // 已存在則直接開啟
  await app.workspace.openLinkText(summaryPath, "", false);
} else {
  // Templater 內部函式：create_new(content, path)
  // 這裡直接呼叫模板，讓 Templater 處理所有內容
  await tp.file.create_new("", summaryPath); // 先建立空檔
  await tp.file.move(summaryPath, summaryPath); // 讓 Templater 記錄檔案路徑
  await tp.file.include("[[PARA/ProjectSummary]]"); // 把模板內容寫入
}
````


#### 6️⃣ C – 在 QuickAdd Action B 中呼叫該模板

```js
// QuickAdd Action B – 使用 Templater 創建概覽
const summaryPath = `${folderPath}/00 Summary.md`;
if (await ROOT.exists(summaryPath)) {
  // 已存在則直接開啟
  await app.workspace.openLinkText(summaryPath, "", false);
} else {
  // Templater 內部函式：create_new(content, path)
  // 這裡直接呼叫模板，讓 Templater 處理所有內容
  await tp.file.create_new("", summaryPath); // 先建立空檔
  await tp.file.move(summaryPath, summaryPath); // 讓 Templater 記錄檔案路徑
  await tp.file.include("[[PARA/ProjectSummary]]"); // 把模板內容寫入
}
````

> `tp.file.include` 會把模板的所有 Markdown（包括 front‑matter）寫入當前檔案。這樣如果你日後需要改版概覽樣式，只要編輯 `ProjectSummary.md` 即可，所有新建專案都會自動套用最新樣式。

---

## 7️⃣ 快捷鍵設定（讓「一鍵」真正成為快捷鍵）

1. Settings → Hotkeys → QuickAdd
2. 找到剛剛建立的 Macro（例如 `New PARA Project`）
3. 設定快速鍵，例如 `Ctrl+Alt+P`。
4. 同理給 Area（`Ctrl+Alt+A`）和 Resource（`Ctrl+Alt+R`）分別設定。

> 提示：若你使用的是 Mac，可以設為 `⌥⌘P`、`⌥⌘A`、`⌥⌘R`。

---

## 8️⃣ 完整工作流程示意圖（文字版）

```
快捷鍵 Ctrl+Alt+P
│
└─► QuickAdd Macro「New PARA Project」
      ├─ Prompt → projectName (使用者輸入)
      ├─ Run JavaScript (Action B)
      │     • 建 folder: 1 Projects/{{projectName}}
      │     • 建 00 Summary.md (含 front‑matter + Templater 模板)
      │     • 打開 Summary.md
      │     • 把 folderPath 存入 args
      └─ Run JavaScript (Action C)
            • 重新寫入 1 Projects Index.md、2 Areas Index.md、3 Resources Index.md
            • 更新 Dataview 計算 → Dashboard 即時顯示
```

類似的流程可用 `Ctrl+Alt+A`、`Ctrl+Alt+R` 產生 Area / Resource。

---

## 9️⃣ 常見錯誤與排查

|錯誤訊息|可能原因|解決方法|
|---|---|---|
|`⚠️ 請輸入專案名稱`|Prompt 沒有正確傳遞變數名（`projectName`）|確認 Prompt Action 的「Variable Name」與腳本裡的 `args.projectName` 完全相同（大小寫敏感）。|
|`⚠️ 資料夾已存在`|之前已經手動創建過同名資料夾|刪除舊資料夾或在 Prompt 時改別名。|
|`Dashboard 未更新`|Dataview 表格仍然顯示舊的計算結果|確認 `Action C` 的檔案路徑正確（`1 Projects/1 Projects Index.md`）。若路徑錯誤，`app.vault.modify` 不會被觸發。|
|`⚠️ 找不到資料夾`（Add note）|`targetFolder` 輸入錯誤或拼寫不完整|在 Prompt 時使用 Search 功能，選擇自動補全的資料夾路徑。|
|`Unicode … 报错`|Windows 路徑中使用了中文或特殊符號|建議所有 PARA 資料夾與子資料夾使用 英文字母+數字+空格，避免跨平台同步問題。|

---

## 10️⃣ 完整程式碼匯總（可直接貼到 QuickAdd）

> 以下是「單一 Macro」的完整腳本（同時支援 Project / Area / Resource 透過先選類別），只需要把它貼進 QuickAdd → Macros → New Macro → “Add PARA item” → Action – Run JavaScript，其餘的 Prompt Action 已在說明裡說明。若你想分成三個獨立 Macro，只把 `category` 那段刪除、直接使用對應的 `baseFolder` 常量即可。


```js
// ------- QuickAdd Macro: Add PARA item (Project / Area / Resource) -------
// 1️⃣ Prompt 1 – Choose type (project | area | resource)
//    Variable name: category
// 2️⃣ Prompt 2 – Enter name (e.g. Implement PARA in Obsidian)
//    Variable name: itemName
// 3️⃣ Run JavaScript – below code

// ------------------ 取得使用者輸入 ------------------
const category = args.category?.toLowerCase();   // project / area / resource
const itemName = args.itemName?.trim();         // 名稱

if (!["project","area","resource"].includes(category)) {
  new Notice("⚠️ 請先選擇 project / area / resource");
  return;
}
if (!itemName) {
  new Notice("⚠️ 請輸入名稱");
  return;
}

// ------------------ 常量映射 ------------------
const baseFolder = {
  project: "1 Projects",
  area:    "2 Areas",
  resource:"3 Resources"
}[category];

const summaryFileName = "00 Summary.md";
const adapter = app.vault.adapter;
const folderPath = `${baseFolder}/${itemName}`;

// ------------------ 建立子資料夾 ------------------
if (await adapter.exists(folderPath)) {
  new Notice(`⚠️ ${category} 已存在: ${folderPath}`);
} else {
  await adapter.mkdir(folderPath);
}

// ------------------ 建立概覽筆記 ------------------
const summaryPath = `${folderPath}/${summaryFileName}`;

if (await adapter.exists(summaryPath)) {
  // 檔已存在，直接打開
  await app.workspace.openLinkText(summaryPath, "", false);
  new Notice(`✅ 已存在的概覽已打開`);
} else {
  // 用 Templater 模板產生完整概覽（如果你不想使用模板，可直接寫 front‑matter）
  // 下面示範「直接寫入最小 front‑matter + 標題」的方式；如果你有 `PARA/ProjectSummary.md`、`PARA/AreaSummary.md`、`PARA/ResourceSummary.md`，請改用 `await tp.file.include("[[PARA/ProjectSummary]]")` 之類。
  const fm = await tp.file.include("[[Base/frontmatter]]");
  const content = `${fm}
---
type: ${category}
status: active
---
# ${itemName}
> 這裡是 ${category} 的概覽頁，請在下方補齊 **Desired Outcome**、**Action Plan** 等。

## 🎯 Desired Outcome
> (填寫)

## 🗓️ Action Plan
> (填寫)

## 📂 Notes in this folder
\`\`\`dataview
LIST
FROM "${folderPath}"
WHERE file.name != this.file.name
SORT file.mtime DESC
\`\`\`

## 🔗 Linked notes
\`\`\`dataview
TABLE file.link AS "Note"
FROM ""
WHERE contains(file.outlinks, this.file.path)
\`\`\`
`;

  await adapter.write(summaryPath, content);
  await app.workspace.openLinkText(summaryPath, "", false);
  new Notice(`✅ 已建立 ${category} ${itemName}`);
}

// ------------------ 更新 Dashboard ------------------
const dashboards = [
  "1 Projects/1 Projects Index.md",
  "2 Areas/2 Areas Index.md",
  "3 Resources/3 Resources Index.md"
];

for (const dp of dashboards) {
  const file = app.vault.getAbstractFileByPath(dp);
  if (!file) continue;
  const txt = await app.vault.read(file);
  await app.vault.modify(file, txt); // 重寫觸發 Dataview 重新計算
}
new Notice("✅ Dashboard 已刷新");

```

> 使用說明
> 
> 1. 把 Macro 定義成「Add PARA item」
> 2. 設定兩個 Prompt（Category + Name）
> 3. 把上面的腳本貼到最後的「Run JavaScript」動作中
> 4. 為 Macro 設一個快捷鍵（如 `Ctrl+Alt+N`），現在你只需要一次快捷鍵就能完成「新建 Project / Area / Resource」的全部步驟。

---

## 11️⃣ 小結 & 常見應用案例

|使用情境|只用一個 Macro 還是三個？|推薦設定|
|---|---|---|
|日常捕獲（每次只建立一個專案）|單一 Add PARA item（先選類別）|快捷鍵 `Ctrl+Alt+N`|
|團隊統一流程（只允許建立 Project）|三個獨立 Macro（Project / Area / Resource）|分別綁定 `Ctrl+Alt+P/A/R`|
|寫會議筆記（需要掛在已有 Project）|另一個 Macro 「Add note to PARA item」|快捷鍵 `Ctrl+Alt+M`|
|每週歸檔|週複盤 Markdown 中插入 `![[_meta_/scripts/autoArchive.js]]`|只需點擊一次|

---

### 🎉 結語

- 所有步驟均在本機，不需外部服務。
- 模板化 + JavaScript 讓你既可以保留 Markdown 可讀性，又能享受自動化的便利。
- 若日後想加入更複雜的需求（如自動生成代辦任務、寫入 Google Calendar、或把完成日期寫入 Zotero），只要在上述腳本裡加入相應的 API 呼叫即可，整個流程依舊保持「一鍵」操作。

祝你玩得順手、管理更流暢！ 🚀✨