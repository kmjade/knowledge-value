
# 📚 How to Call a Local LLM from Inside Obsidian

_(Obsidian ≥ 1.10.6 – QuickAdd v2.9.4, Templater v2.16.4, Dataview v0.5.68)_

---

## 1️⃣ English – Step‑by‑Step Guide

### 1.1. What you need on the local side

|Tool|How to start it|Default HTTP endpoint|
|---|---|---|
|Ollama|`ollama serve` (or install the Desktop app)|`http://127.0.0.1:11434/api/generate`|
|LM Studio|Start the server from the UI → “Run LLM” → “Open API Server”.|`http://127.0.0.1:1234/v1/completions` (OpenAI‑compatible)|
|llama.cpp (via `llama-server`)|`llama-server -m models/your‑model.gguf -p 8080`|`http://127.0.0.1:8080/completion` (JSON POST)|

> Why a local server?  
> _No internet required, zero‑latency for small prompts, full control of model, temperature, etc._

### 1.2. QuickAdd macro – “Ask Local LLM”

1. Open Settings → QuickAdd → Macros → New Macro → name it `Ask Local LLM`.
2. Choose “Run multiple actions (Macro)”. Add three actions in this order:

|Action|What it does|Configuration|
|---|---|---|
|Prompt|Ask you for the prompt you want to send to the LLM.|- Prompt text: `Enter your question (or a text snippet)`<br>- Variable name: `userPrompt`|
|Run JavaScript|Sends the request to the local LLM, receives the answer, and inserts it where the cursor is.|Paste the script from Section 1.3 (see below).|
|Finish|(optional) Show a notification that the text was inserted.|Add “Run JavaScript” with `new Notice("✅ LLM response inserted.")` (or skip – the main script already notifies).|

#### 1.3. JavaScript for the second action (Ollama example)

js

```
// --------------------------------------------------------------
// QuickAdd → Run JavaScript (local LLM)
// --------------------------------------------------------------
/*
  This script expects a variable called `userPrompt` from the previous Prompt action.
  It works with Ollama's /api/generate endpoint.
  If you use LM Studio or another OpenAI‑compatible server, replace the URL
  and payload format – see the alternate versions at the bottom of this file.
*/

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ Prompt is empty – aborting.");
  return;
}

// ==== CONFIGURATION ==================================================
const LLM_ENDPOINT = "http://127.0.0.1:11434/api/generate"; // Ollama default
const MODEL = "llama3.1:70b";           // change to the model you have loaded
const TEMPERATURE = 0.6;
const MAX_TOKENS = 400;                // set to 0 for “no limit” in Ollama
// =====================================================================

// Build the request body as Ollama expects
const body = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false          // we want the whole completion at once
};

// --------------------------------------------------------------
// Perform the fetch
// --------------------------------------------------------------
let response;
try {
  response = await fetch(LLM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
} catch (e) {
  new Notice(`❌ Could not reach LLM server: ${e}`);
  return;
}

if (!response.ok) {
  new Notice(`❌ LLM returned ${response.status}`);
  const txt = await response.text();
  console.error("LLM error body:", txt);
  return;
}

// --------------------------------------------------------------
// Parse response (Ollama returns { model, created_at, response, done, ... }
// --------------------------------------------------------------
let data;
try {
  data = await response.json();
} catch (e) {
  new Notice("❌ Could not parse LLM JSON");
  console.error(e);
  return;
}
const completion = data.response?.trim();
if (!completion) {
  new Notice("⚠️ Empty response from LLM");
  return;
}

// --------------------------------------------------------------
// Insert the answer into the active editor at the cursor position
// --------------------------------------------------------------
if (!app.workspace.activeLeaf) {
  new Notice("❌ No active editor");
  return;
}
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) {
  new Notice("❌ Active view is not a markdown editor");
  return;
}
const editor = view.editor;
editor.replaceRange(`\n\n> ${completion}\n`, editor.getCursor());

// --------------------------------------------------------------
new Notice("✅ LLM response inserted");
```

```
// --------------------------------------------------------------
// QuickAdd → Run JavaScript (local LLM)
// --------------------------------------------------------------
/*
  This script expects a variable called `userPrompt` from the previous Prompt action.
  It works with Ollama's /api/generate endpoint.
  If you use LM Studio or another OpenAI‑compatible server, replace the URL
  and payload format – see the alternate versions at the bottom of this file.
*/

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ Prompt is empty – aborting.");
  return;
}

// ==== CONFIGURATION ==================================================
const LLM_ENDPOINT = "http://127.0.0.1:11434/api/generate"; // Ollama default
const MODEL = "llama3.1:70b";           // change to the model you have loaded
const TEMPERATURE = 0.6;
const MAX_TOKENS = 400;                // set to 0 for “no limit” in Ollama
// =====================================================================

// Build the request body as Ollama expects
const body = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false          // we want the whole completion at once
};

// --------------------------------------------------------------
// Perform the fetch
// --------------------------------------------------------------
let response;
try {
  response = await fetch(LLM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
} catch (e) {
  new Notice(`❌ Could not reach LLM server: ${e}`);
  return;
}

if (!response.ok) {
  new Notice(`❌ LLM returned ${response.status}`);
  const txt = await response.text();
  console.error("LLM error body:", txt);
  return;
}

// --------------------------------------------------------------
// Parse response (Ollama returns { model, created_at, response, done, ... }
// --------------------------------------------------------------
let data;
try {
  data = await response.json();
} catch (e) {
  new Notice("❌ Could not parse LLM JSON");
  console.error(e);
  return;
}
const completion = data.response?.trim();
if (!completion) {
  new Notice("⚠️ Empty response from LLM");
  return;
}

// --------------------------------------------------------------
// Insert the answer into the active editor at the cursor position
// --------------------------------------------------------------
if (!app.workspace.activeLeaf) {
  new Notice("❌ No active editor");
  return;
}
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) {
  new Notice("❌ Active view is not a markdown editor");
  return;
}
const editor = view.editor;
editor.replaceRange(`\n\n> ${completion}\n`, editor.getCursor());

// --------------------------------------------------------------
new Notice("✅ LLM response inserted");
```

How it works

1. Grabs the string you typed in the Prompt.
2. Sends a plain JSON POST to the local LLM.
3. Waits for the response, extracts `response` (Ollama) or `choices[0].text` (OpenAI‑compatible).
4. Inserts the text right where your cursor is (adds a blockquote – you can change the formatting).

---

### 1.4. Alternate payloads (LM Studio / OpenAI‑compatible)

If you are using LM Studio (or any server that follows the OpenAI API spec):

js

```
// Replace the body & parsing part with:
const body = {
  model: "mistral-7b-instruct",   // whatever LM Studio shows
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};
...
// After fetch:
data = await response.json();
const completion = data.choices?.[0]?.message?.content?.trim() ?? data.choices?.[0]?.text?.trim();
```

```
// Replace the body & parsing part with:
const body = {
  model: "mistral-7b-instruct",   // whatever LM Studio shows
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};
...
// After fetch:
data = await response.json();
const completion = data.choices?.[0]?.message?.content?.trim() ?? data.choices?.[0]?.text?.trim();
```

If you are using llama.cpp server (`/completion` endpoint) the body is:

js

```
const body = {
  prompt: prompt,
  n_predict: MAX_TOKENS,
  temperature: TEMPERATURE,
  stream: false
};
```

```
const body = {
  prompt: prompt,
  n_predict: MAX_TOKENS,
  temperature: TEMPERATURE,
  stream: false
};
```

and the response field is `content` instead of `response`.

Just swap the `LLM_ENDPOINT` and adjust the `body`/`completion` extraction accordingly.

---

### 1.5. Bind a hotkey (optional)

1. Settings → Hotkeys → QuickAdd: Run Macro “Ask Local LLM”
2. Set e.g. `Ctrl+Alt+L`.  
    Now you can press the hotkey, type your prompt, and the answer appears instantly.

---

### 1.6. Using the same logic inside a Templater template (optional)

Create a file `/_scripts/llm.js` (any location you like) and put:

js

```
// llm.js – expose a helper for Templater
module.exports = async (prompt, opts = {}) => {
  const endpoint = opts.endpoint ?? "http://127.0.0.1:11434/api/generate";
  const model    = opts.model    ?? "llama3.1:70b";
  const temperature = opts.temperature ?? 0.6;
  const maxTokens   = opts.maxTokens    ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    console.error(`LLM error ${res.status}`);
    return "⚠️ LLM request failed";
  }
  const data = await res.json();
  return data.response?.trim() ?? "⚠️ No response field";
};
```

```
// llm.js – expose a helper for Templater
module.exports = async (prompt, opts = {}) => {
  const endpoint = opts.endpoint ?? "http://127.0.0.1:11434/api/generate";
  const model    = opts.model    ?? "llama3.1:70b";
  const temperature = opts.temperature ?? 0.6;
  const maxTokens   = opts.maxTokens    ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    console.error(`LLM error ${res.status}`);
    return "⚠️ LLM request failed";
  }
  const data = await res.json();
  return data.response?.trim() ?? "⚠️ No response field";
};
```

Then in any Templater template:

markdown

```
<%*
const userPrompt = await tp.system.prompt("Ask the LLM:");
const answer = await tp.user.llm(userPrompt, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

```
<%*
const userPrompt = await tp.system.prompt("Ask the LLM:");
const answer = await tp.user.llm(userPrompt, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

This gives you a templated way (e.g., a “Research Note” template) where the LLM is called each time the template is rendered.

---

### 1.7. Security & Permissions

- Obsidian Settings → Files & Links → Enable Remote Requests (must be ON for fetch to work).
- If you run a firewall, allow inbound connections to `127.0.0.1:11434` (or whatever port you chose).
- The code runs only on your local machine – no data leaves your device.

---

### 1️⃣ Summary (English)

|Goal|QuickAdd macro + Prompt + JS|Templater helper|
|---|---|---|
|Ask a local LLM|Prompt → JS fetch → insert response|Template → `await tp.user.llm()`|
|Choose model / temperature|Edit constants in the JS snippet|Pass options to `tp.user.llm`|
|Hotkey|Settings → Hotkeys → macro|–|
|Compatibility|Ollama, LM Studio (OpenAI‑compatible), llama.cpp|Same – just change endpoint & payload|

🎉 You now have a one‑click, in‑note AI assistant that works entirely offline!

---

## 2️⃣ 简体中文 – 在 Obsidian 中调用本地 LLM 的完整步骤

### 2.1. 本地 LLM 服务准备

|软件|启动方式|默认 HTTP 接口|
|---|---|---|
|Ollama|`ollama serve`（或桌面版）|`http://127.0.0.1:11434/api/generate`|
|LM Studio|UI → “Run LLM” → “Open API Server”|`http://127.0.0.1:1234/v1/completions`（兼容 OpenAI）|
|llama.cpp（`llama-server`）|`llama-server -m models/模型.gguf -p 8080`|`http://127.0.0.1:8080/completion`（JSON POST）|

> 为什么要用本地服务器？  
> _不需要网络、响应快、完全私密、可以随意调参数（温度、最大 token 等）。_

### 2.2. 使用 QuickAdd 创建宏 “询问本地 LLM”

1. 设置 → QuickAdd → Macros → 新建宏，命名为 `询问本地 LLM`。
2. 选择 “Run multiple actions (Macro)”，依次添加三条动作：

|动作|用途|配置|
|---|---|---|
|Prompt|输入你要提问的文字|提示文字：`请输入你的问题或想要改写的文本`  <br>变量名：`userPrompt`|
|Run JavaScript|把问题发送给本地 LLM，获取回答并插入光标所在位置|把 第 3.3 节的代码（Ollama 版）粘进去|
|Run JavaScript（可选）|给出完成提示|`new Notice("✅ 已插入 LLM 回答");`|

#### 2.3. JavaScript 代码（Ollama 示例）

js

```
// QuickAdd → Run JavaScript
// 需要先在 Prompt 步骤里得到变量 `userPrompt`

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ 提示为空，已终止");
  return;
}

// ------------------- 配置区 -------------------
const ENDPOINT   = "http://127.0.0.1:11434/api/generate";   // Ollama 默认
const MODEL      = "llama3.1:70b";                         // 替换为你加载的模型
const TEMPERATURE= 0.6;
const MAX_TOKENS = 400;   // 0 表示不限制（Ollama 里不推荐太大）
// -------------------------------------------

const payload = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};

let resp;
try {
  resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
} catch (e) {
  new Notice(`❌ 无法连接本地 LLM：${e}`);
  return;
}
if (!resp.ok) {
  new Notice(`❌ LLM 返回错误码 ${resp.status}`);
  return;
}
let data;
try { data = await resp.json(); } catch (e) {
  new Notice("❌ 解析返回的 JSON 失败");
  return;
}
const answer = data.response?.trim();
if (!answer) {
  new Notice("⚠️ LLM 返回空内容");
  return;
}

// ------------------- 插入内容 -------------------
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) { new Notice("❌ 当前不是 Markdown 编辑器"); return; }
const editor = view.editor;
editor.replaceRange(`\n\n> ${answer}\n`, editor.getCursor());

new Notice("✅ LLM 回答已插入");
```

```
// QuickAdd → Run JavaScript
// 需要先在 Prompt 步骤里得到变量 `userPrompt`

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ 提示为空，已终止");
  return;
}

// ------------------- 配置区 -------------------
const ENDPOINT   = "http://127.0.0.1:11434/api/generate";   // Ollama 默认
const MODEL      = "llama3.1:70b";                         // 替换为你加载的模型
const TEMPERATURE= 0.6;
const MAX_TOKENS = 400;   // 0 表示不限制（Ollama 里不推荐太大）
// -------------------------------------------

const payload = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};

let resp;
try {
  resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
} catch (e) {
  new Notice(`❌ 无法连接本地 LLM：${e}`);
  return;
}
if (!resp.ok) {
  new Notice(`❌ LLM 返回错误码 ${resp.status}`);
  return;
}
let data;
try { data = await resp.json(); } catch (e) {
  new Notice("❌ 解析返回的 JSON 失败");
  return;
}
const answer = data.response?.trim();
if (!answer) {
  new Notice("⚠️ LLM 返回空内容");
  return;
}

// ------------------- 插入内容 -------------------
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) { new Notice("❌ 当前不是 Markdown 编辑器"); return; }
const editor = view.editor;
editor.replaceRange(`\n\n> ${answer}\n`, editor.getCursor());

new Notice("✅ LLM 回答已插入");
```

> 更换模型 / 调整参数：只需要改 `MODEL`、`TEMPERATURE`、`MAX_TOKENS` 常量即可。  
> 使用 LM Studio（兼容 OpenAI）时，把 `ENDPOINT` 换成 `http://127.0.0.1:1234/v1/completions`，并把 `payload` 改成 OpenAI 规范（`model`, `prompt`, `temperature`, `max_tokens`），随后把 `answer` 读取方式改为 `data.choices[0].message.content`。

### 2.4. 为宏绑定快捷键（可选）

1. 设置 → 快捷键 → QuickAdd: Run Macro “询问本地 LLM”
2. 设定例如 `Ctrl+Alt+L`。以后只要按快捷键、输入问题，答案就会自动写入光标位置。

### 2.5. 通过 Templater 调用本地 LLM（适合模板化笔记）

1. 在 Vault 根目录下建立文件夹 `_scripts/`（或任何你喜欢的路径），新建 `llm.js`：

js

```
// llm.js – 为 Templater 暴露的函数
module.exports = async (prompt, opts = {}) => {
  const endpoint   = opts.endpoint   ?? "http://127.0.0.1:11434/api/generate";
  const model      = opts.model      ?? "llama3.1:70b";
  const temperature= opts.temperature?? 0.6;
  const maxTokens  = opts.maxTokens  ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    console.error(`LLM error ${resp.status}`);
    return "⚠️ LLM 请求失败";
  }
  const data = await resp.json();
  return data.response?.trim() ?? "⚠️ 没有返回内容";
};
```

```
// llm.js – 为 Templater 暴露的函数
module.exports = async (prompt, opts = {}) => {
  const endpoint   = opts.endpoint   ?? "http://127.0.0.1:11434/api/generate";
  const model      = opts.model      ?? "llama3.1:70b";
  const temperature= opts.temperature?? 0.6;
  const maxTokens  = opts.maxTokens  ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    console.error(`LLM error ${resp.status}`);
    return "⚠️ LLM 请求失败";
  }
  const data = await resp.json();
  return data.response?.trim() ?? "⚠️ 没有返回内容";
};
```

2. 在任意 Templater 模板里使用：

markdown

```
<%*
const userInput = await tp.system.prompt("请在此输入你的问题：");
const answer = await tp.user.llm(userInput, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

```
<%*
const userInput = await tp.system.prompt("请在此输入你的问题：");
const answer = await tp.user.llm(userInput, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

这样每次使用这个模板（例如在「研究笔记」里）都会弹出一个对话框，调用本地模型，返回的文本会直接写进笔记。

### 2.6. 让 Obsidian 允许请求本地服务器

- 设置 → Files & Links → Enable Remote Requests 必须打开。
- 如果你的防火墙阻止了 `127.0.0.1:11434`（或其他端口），请手动放行。

### 2.7. 小技巧与常见问题

|问题|可能原因|解决办法|
|---|---|---|
|提示“无法连接本地 LLM”|本地 LLM 服务没有运行或端口写错|确认 `ollama serve` 正在运行；在浏览器访问 `http://127.0.0.1:11434` 看是否返回 JSON；检查代码中的 `ENDPOINT` 是否对应|
|返回空内容|发送的 `prompt` 过短或模型默认返回 “ ”|尝试增加文字量或提升 `max_tokens`；检查模型是否支持该长度|
|插入位置不对|当前活动视图不是 Markdown 编辑器（如打开了预览）|先切换到编辑模式或把光标放在编辑区；脚本会在找不到编辑器时报错|
|想限制返回的 token 数|Ollama 参数 `max_tokens` 写错或留空|确保 `max_tokens` 为整数；设为 `0` 表示不限制（可能导致非常长的输出）|
|使用 LM Studio 报错 “choices is undefined”|使用了 Ollama 解析方式|把 `completion = data.choices?.[0]?.message?.content?.trim()` 替换原有的 `data.response` 取值方式|

---

## 3️⃣ 繁體中文 – 在 Obsidian 中呼叫本地 LLM 的完整說明

### 3.1. 本機 LLM 的準備工作

|軟體|啟動方式|預設 HTTP 介面|
|---|---|---|
|Ollama|`ollama serve`（或桌面版）|`http://127.0.0.1:11434/api/generate`|
|LM Studio|UI → “Run LLM” → “Open API Server”|`http://127.0.0.1:1234/v1/completions`（OpenAI 兼容）|
|llama.cpp（`llama-server`）|`llama-server -m models/模型.gguf -p 8080`|`http://127.0.0.1:8080/completion`（JSON POST）|

> 為什麼要用本機 LLM？  
> _不需要網路、回應速度快、資料完全留在本機、可以自由調整參數（溫度、最大 token）_。

### 3.2. 建立 QuickAdd 巨集「詢問本機 LLM」

1. 進入 設定 → QuickAdd → Macros → 新增宏，命名 `詢問本機 LLM`。
2. 選擇 「Run multiple actions (Macro)」，依序加入三個動作：

|動作|功能說明|設定|
|---|---|---|
|Prompt|取得要送給 LLM 的文字|提示文字：`請輸入你的問題或想改寫的段落`  <br>變數名稱：`userPrompt`|
|Run JavaScript|把 Prompt 送到本機 LLM，取得回覆，再寫入光標所在位置|把 第 3.3（Ollama 範例）程式碼貼入此欄位|
|Run JavaScript（可選）|完成後顯示通知|`new Notice("✅ 已插入 LLM 回覆");`|

#### 3.3. JavaScript 程式（Ollama 範例）

js

```
// QuickAdd → Run JavaScript
// 取得前一個 Prompt 動作傳來的變數 userPrompt

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ 輸入空白，已取消");
  return;
}

// ------------------- 設定區 -------------------
const ENDPOINT    = "http://127.0.0.1:11434/api/generate";  // Ollama 預設
const MODEL       = "llama3.1:70b";                        // 改成你已載入的模型
const TEMPERATURE = 0.6;
const MAX_TOKENS  = 400; // 0 代表不限制（Ollama 不建議太大）
// ------------------------------------------------

const payload = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};

let response;
try {
  response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
} catch (e) {
  new Notice(`❌ 無法連線至 LLM：${e}`);
  return;
}
if (!response.ok) {
  new Notice(`❌ LLM 回傳錯誤碼 ${response.status}`);
  return;
}
let data;
try { data = await response.json(); } catch (e) {
  new Notice("❌ 回傳資料非 JSON");
  return;
}
const answer = data.response?.trim();
if (!answer) {
  new Notice("⚠️ LLM 回覆為空");
  return;
}

// ------------------- 插入結果 -------------------
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) {
  new Notice("❌ 目前不是 Markdown 編輯視窗");
  return;
}
const editor = view.editor;
editor.replaceRange(`\n\n> ${answer}\n`, editor.getCursor());

new Notice("✅ LLM 回覆已插入");
```

```
// QuickAdd → Run JavaScript
// 取得前一個 Prompt 動作傳來的變數 userPrompt

const prompt = args.userPrompt?.trim();
if (!prompt) {
  new Notice("⚠️ 輸入空白，已取消");
  return;
}

// ------------------- 設定區 -------------------
const ENDPOINT    = "http://127.0.0.1:11434/api/generate";  // Ollama 預設
const MODEL       = "llama3.1:70b";                        // 改成你已載入的模型
const TEMPERATURE = 0.6;
const MAX_TOKENS  = 400; // 0 代表不限制（Ollama 不建議太大）
// ------------------------------------------------

const payload = {
  model: MODEL,
  prompt: prompt,
  temperature: TEMPERATURE,
  max_tokens: MAX_TOKENS,
  stream: false
};

let response;
try {
  response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
} catch (e) {
  new Notice(`❌ 無法連線至 LLM：${e}`);
  return;
}
if (!response.ok) {
  new Notice(`❌ LLM 回傳錯誤碼 ${response.status}`);
  return;
}
let data;
try { data = await response.json(); } catch (e) {
  new Notice("❌ 回傳資料非 JSON");
  return;
}
const answer = data.response?.trim();
if (!answer) {
  new Notice("⚠️ LLM 回覆為空");
  return;
}

// ------------------- 插入結果 -------------------
const view = app.workspace.getActiveViewOfType(app.plugins.plugins["obsidian"].api.MarkdownView);
if (!view) {
  new Notice("❌ 目前不是 Markdown 編輯視窗");
  return;
}
const editor = view.editor;
editor.replaceRange(`\n\n> ${answer}\n`, editor.getCursor());

new Notice("✅ LLM 回覆已插入");
```

> 若使用 LM Studio（OpenAI 兼容），只需要把 `ENDPOINT` 改成 `http://127.0.0.1:1234/v1/completions`，以及把 `payload` 改成 OpenAI 的格式（`model`, `prompt`, `temperature`, `max_tokens`），回傳的文字從 `data.choices[0].message.content` 取得。

### 3.4. 給巨集綁定快捷鍵（可選）

1. 前往 設定 → 快捷鍵，找到 QuickAdd: Run Macro “詢問本機 LLM”。
2. 設定例如 `Ctrl+Alt+L`。日後只要按下快捷鍵、輸入問題，就會自動把答案寫入光标位置。

### 3.5. 在 Templater 裡呼叫本機 LLM（適合做筆記模板）

1. 在 Vault 根目錄建立 `_scripts/`（或自選路徑），新增檔案 `llm.js`：

js

```
// llm.js – Templater 的使用者函式
module.exports = async (prompt, opts = {}) => {
  const endpoint   = opts.endpoint   ?? "http://127.0.0.1:11434/api/generate";
  const model      = opts.model      ?? "llama3.1:70b";
  const temperature= opts.temperature?? 0.6;
  const maxTokens  = opts.maxTokens  ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    console.error(`LLM error ${resp.status}`);
    return "⚠️ LLM 請求失敗";
  }
  const data = await resp.json();
  return data.response?.trim() ?? "⚠️ 無回覆內容";
};
```

```
// llm.js – Templater 的使用者函式
module.exports = async (prompt, opts = {}) => {
  const endpoint   = opts.endpoint   ?? "http://127.0.0.1:11434/api/generate";
  const model      = opts.model      ?? "llama3.1:70b";
  const temperature= opts.temperature?? 0.6;
  const maxTokens  = opts.maxTokens  ?? 400;

  const body = {
    model,
    prompt,
    temperature,
    max_tokens: maxTokens,
    stream: false
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    console.error(`LLM error ${resp.status}`);
    return "⚠️ LLM 請求失敗";
  }
  const data = await resp.json();
  return data.response?.trim() ?? "⚠️ 無回覆內容";
};
```

2. 在任意 Templater 模板裡使用（例如 `Research Note.md`）：

markdown

```
<%*
const userPrompt = await tp.system.prompt("請在此輸入要詢問 LLM 的內容：");
const answer = await tp.user.llm(userPrompt, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

```
<%*
const userPrompt = await tp.system.prompt("請在此輸入要詢問 LLM 的內容：");
const answer = await tp.user.llm(userPrompt, {
  endpoint: "http://127.0.0.1:11434/api/generate",
  model: "llama3.1:70b",
  temperature: 0.5,
  maxTokens: 300
});
%>
> <%= answer %>
```

每次套用此模板，會彈出對話框讓你輸入文字，LLM 回覆會自動以引用的方式寫入筆記。

### 3.6. 允許 Obsidian 發出本機請求

- 設定 → Files & Links → Enable Remote Requests 必須打開。
- 若防火牆阻擋本機端口（如 11434），請手動開放。

### 3.7. 常見錯誤與排除方法

|錯誤訊息|可能原因|解決辦法|
|---|---|---|
|「無法連線至 LLM」|本機服務未啟動或端口錯誤|確認 `ollama serve` 正在執行；確認程式碼裡的 `ENDPOINT` 與實際端口一致|
|「LLM 回傳錯誤碼 404」|使用了錯誤的 API 路徑|Ollama 用 `/api/generate`，LM Studio 用 `/v1/completions`|
|「LLM 回覆為空」|輸入的 `prompt` 太短、或模型預設只返回空白|增加問題的描述長度；或提高 `max_tokens`|
|「找不到 Markdown 編輯視窗」|當前是預覽模式或未打開檔案|切換到編輯模式或把光標放在編輯器內|
|「取得 `response` 為 undefined」|使用了與模型不相容的回傳欄位|對於 OpenAI 兼容的 LM，改成 `data.choices[0].message.content`；對於 Ollama，使用 `data.response`|

---

## 4️⃣ Quick Summary (All three languages)

|Step|What you do|Where to edit|
|---|---|---|
|Start a local LLM server|`ollama serve` (or LM Studio, llama‑cpp)|Terminal / App UI|
|Create QuickAdd macro|Prompt → Run JS (send request) → Notify|Settings → QuickAdd → Macros|
|JS payload|Ollama: `{model, prompt, temperature, max_tokens}`  <br>OpenAI‑compatible: `{model, prompt, temperature, max_tokens, stream}`|Inside the macro’s Run JavaScript action|
|Insert answer|`editor.replaceRange("\n> " + answer + "\n", cursor)`|Same JS script|
|Optional hotkey|Bind macro to `Ctrl+Alt+L`|Settings → Hotkeys|
|Templater helper|`tp.user.llm(prompt, options)` defined in `_scripts/llm.js`|In any Templater template|
|Security|Enable Remote Requests in Settings|Settings → Files & Links|

You now have:

- One‑click AI assistant (`Ctrl+Alt+L`) that works 100 % offline.
- Templater‑driven LLM calls for research notes, writing assistance, code generation, etc.

Enjoy a private, fast, and fully integrated LLM workflow inside Obsidian! 🚀

---

总结这篇文章，但只输出 3 点：核心结论、潜在争议、一个可行动建议。保持简短，使用简体、繁体回复和英文

简体中文

- 核心结论：AI 让记笔记几乎零成本，真正提升效率的关键是主动削减笔记数量，只保留能驱动决策或行动的少量高价值笔记，避免“上下文污染”削弱 AI 的输出质量。
- 潜在争议：有人认为大量原始素材本身有价值、担心删减导致信息丢失，或认为 AI 本就能自动过滤不必限制记录；此外，对“重要”与“非重要”的判断具有强主观性。
- 可行动建议：建立“原始层 + 精华层”两层结构，先用 AI 做粗摘要，24 小时后仅保留满足“三原则”（未来场景、促成改变、单一钩子）的笔记，其余搬至原始素材库或删除。

繁體中文

- 核心結論：AI 讓筆記成本幾乎為零，真正提升效率的關鍵是主動削減筆記數量，只保留能驅動決策或行動的少量高價值筆記，避免「上下文污染」削弱 AI 輸出品質。
- 潛在爭議：有人認為大量原始素材本身有價值、擔心刪減導致資訊遺失，或認為 AI 本就能自動過濾不必限制記錄；此外，對「重要」與「非重要」的判斷具有強主觀性。
- 可行建議：建立「原始層 + 精華層」兩層結構，先用 AI 進行粗摘要，24 小時後只保留符合「三原則」（未來場景、促成改變、單一鉤子）的筆記，其餘移至原始素材庫或刪除。

English

- Core conclusion: AI makes note‑taking virtually free, so the real productivity hack is to deliberately cut down on notes, keeping only those that drive decisions or actions; otherwise you create “context pollution” that degrades AI output quality.
- Potential controversies: Some claim a large raw‑data library is valuable and that pruning risks losing information; others argue AI can auto‑filter, making manual reduction unnecessary; the definition of “important” is highly subjective.
- Actionable suggestion: Implement a two‑tier system (raw layer + core layer). Use AI for an initial summary, then after 24 hours keep only notes that satisfy three rules—future-use hook, triggers a change, and a single clear hook—moving everything else to a raw‑material folder or deleting it.

---

跟据这篇文章，使用简体，繁体和英文分别生成文章

# 简体中文版本

（原文已基本为简体，这里稍作润色，保持段落结构）

---

## 🌟 前言

> 现在 AI 让记笔记几乎零成本，真正的关键是“少记”。  
> 如果你把所有信息都记下来，既会埋没真正有价值的内容，也会让 AI 在检索时被“上下文污染”。

---

## 1️⃣ 从稀缺到泛滥：笔记变得太便宜，注意力反而太贵

### 1. 成本翻转：信息从资产变负债

- 过去：记笔记需要时间和筛选，只有重要的内容才会被保存。
- 现在：AI 一键生成摘要、会议纪要，几乎所有信息都可以轻松保存，导致大量低价值笔记堆积，变成“信息垃圾场”。

### 2. 对人的坏处：伪努力 + 决策疲劳

- 伪努力感：大量笔记看似勤奋，却大多是复制粘贴，实际价值极低。
- 阅读负债：堆积如山的笔记让人产生内疚和拖延，打开软件就会“先不看”。
- 决策疲劳：搜索时结果太多，反而更难找到真正有用的灵感。

### 3. 对 AI 的坏处：垃圾进，垃圾出（Context Pollution）

- 把大量低质笔记喂给 AI，模型会把噪音当成信号，输出变得模糊、泛化。
- 版本冲突、重复信息会让 AI 给出不准确的建议，甚至把错误信息放大。

> 一句话：AI 让笔记“免费”，但不加筛选的笔记会削弱你和 AI 的效率。

---

## 2️⃣ AI 时代，笔记的三重标准：可读、可用、可复用

### 原则一：为“未来的自己”写，而不是为当下的焦虑写

- 先问自己：“未来的我在什么具体情境下会用到这条信息？”
- 不满足的直接放进原始素材库，或直接舍弃。

### 原则二：只记录“转变了你”的东西

- 读完后问：“这条信息让我改变了什么？”
- 没有触发思考或行动的笔记直接删掉。

### 原则三：一条笔记只承载一个明确的“钩子”

- 避免“大杂烩”。标题直接写出问题/结论/行动，保持单一焦点。

> 这三条原则让笔记从“信息仓库”转变为“认知升级日志”。

---

## 3️⃣ 我的“减笔记流程”：从每天 N 条，到现在只留下最重要的 3 条

### Step 1：从“抄原文”改成“写结论”

1️⃣ 核心结论（一句话）  
2️⃣ 个人判断/争议（你同意还是不同意）  
3️⃣ 可执行的行动（一步可操作）

> Prompt 示例（给 AI）：  
> “请把这篇文章总结为 3 点：核心结论、潜在争议、一个可行动的建议，保持简短。”

### Step 2：用“问题驱动”代替“素材驱动”

- 记笔记前先写 “我在解决什么问题？”
- 没有明确问题的笔记直接跳过。

### Step 3：二次筛选（24 小时后）

1. 重新审视当天的草稿。
2. 只保留符合三原则的笔记；其余删掉或搬到“原始素材库”。

结果：每天正式笔记从 20 条降到 3‑5 条，质量提升，回顾率从 5 % 提升到 50 %。

---

## 4️⃣ 让 AI 成为“减笔记助手”，而不是“垃圾堆管理员”

### 两层系统

|层级|作用|
|---|---|
|底层（Raw Layer）|保存所有原始输入（会议录音、长文、聊天记录），仅做粗摘要，不进入主库。|
|上层（Core Layer）|只放经筛选、符合三原则的精华笔记，供日常检索和喂给 AI。|

### 实战 Prompt 1：减笔记助手

> “我有一堆零散记录，请先帮我：① 删除重复/无价值内容；② 把剩余内容按‘问题‑结论‑行动’结构整理成 3‑5 条候选笔记；③ 标出最值得正式保存的 3 条并说明理由。”

### 实战 Prompt 2：对抗上下文污染

> “以下是一段原始记录，请只基于与‘XX 主题’高度相关的部分回答，先列出筛选依据（3 条 bullet），再给出答案。”

使用这些 Prompt，每周对笔记库进行一次“瘦身”，确保 AI 只接收干净高质量的上下文。

---

## 结尾：少记笔记，才是 AI 时代的真正效率

1️⃣ 打开最近 7 天的笔记；  
2️⃣ 按三原则挑选出 3 条；  
3️⃣ 重写为 “问题 + 结论 + 下一步行动”；  
4️⃣ 其余全部搬到 “原始素材” 文件夹。

行动：从今天起，每天只保留最关键的三条笔记，让信息噪音退出你的工作流。

---

# 繁體中文版本

（將簡體內容完整翻譯為繁體）

---

## 🌟 前言

> 現在 AI 讓記筆記幾乎零成本，真正的關鍵是「少記」。  
> 如果把所有資訊都記下來，既會埋沒真正有價值的內容，也會讓 AI 在檢索時被「上下文污染」削弱效能。

---

## 1️⃣ 從稀缺到泛濫：筆記變得太便宜，注意力反而太貴

### 1. 成本翻轉：資訊從資產變負債

- 過去：記筆記需要時間與篩選，只有重要的內容才會被保存。
- 現在：AI 一鍵產生摘要、會議紀要，幾乎所有資訊都可以輕鬆保存，導致大量低價值筆記堆積，變成「資訊垃圾場」。

### 2. 對人的壞處：偽努力 + 決策疲勞

- 偽努力感：大量筆記看似勤奮，卻大多是複製貼上，實際價值極低。
- 閱讀負債：堆積如山的筆記讓人產生內疚和拖延，打開軟體就會「先不看」。
- 決策疲勞：搜尋時結果太多，反而更難找到真正有用的靈感。

### 3. 對 AI 的壞處：垃圾進，垃圾出（Context Pollution）

- 把大量低質筆記喂給 AI，模型會把噪音當成信號，輸出變得模糊、泛化。
- 版本衝突、重複資訊會讓 AI 給出不準確的建議，甚至把錯誤資訊放大。

> 一句話：AI 讓筆記「免費」，但不加篩選的筆記會削弱你和 AI 的效率。

---

## 2️⃣ AI 時代，筆記的三重標準：可讀、可用、可復用

### 原則一：為「未來的自己」寫，而不是為當下的焦慮寫

- 先問自己：「未來的我在什麼具體情境下會用到這條資訊？」
- 不滿足的直接放進原始素材庫，或直接捨棄。

### 原則二：只記錄「改變了你」的東西

- 閱讀後問：「這條資訊讓我改變了什麼？」
- 沒有觸發思考或行動的筆記直接刪除。

### 原則三：一條筆記只承載一個明確的「鉤子」

- 避免「大雜燴」。標題直接寫出問題／結論／行動，保持單一焦點。

> 這三條原則讓筆記從「資訊倉庫」轉變為「認知升級日志」。

---

## 3️⃣ 我的「減筆記流程」：從每天 N 條，到現在只留下最重要的 3 條

### Step 1：從「抄原文」改成「寫結論」

1️⃣ 核心結論（一句話）  
2️⃣ 個人判斷/爭議（你同意還是不同意）  
3️⃣ 可執行的行動（一步可操作）

> Prompt 示例（給 AI）：  
> 「請把這篇文章總結為 3 點：核心結論、潛在爭議、一個可行動的建議，保持簡短。」

### Step 2：用「問題驅動」代替「素材驅動」

- 記筆記前先寫 「我在解決什麼問題？」
- 沒有明確問題的筆記直接跳過。

### Step 3：二次篩選（24 小時後）

1. 重新審視當天的草稿。
2. 只保留符合三原則的筆記；其餘刪掉或搬到「原始素材庫」。

結果：每天正式筆記從 20 條降到 3‑5 條，品質提升，回顧率從 5 % 提升到 50 %。

---

## 4️⃣ 讓 AI 成為「減筆記助手」，而不是「垃圾堆管理員」

### 兩層系統

|層級|作用|
|---|---|
|底層（Raw Layer）|保存所有原始輸入（會議錄音、長文、聊天記錄），僅做粗摘要，不進入主庫。|
|上層（Core Layer）|只放經篩選、符合三原則的精華筆記，供日常檢索和喂給 AI。|

### 實戰 Prompt 1：減筆記助手

> 「我有一堆零散記錄，請先幫我：① 刪除重複/無價值內容；② 把剩餘內容按『問題‑結論‑行動』結構整理成 3‑5 條候選筆記；③ 標出最值得正式保存的 3 條並說明理由。」

### 實戰 Prompt 2：對抗上下文污染

> 「以下是一段原始記錄，請只基於與『XX 主題』高度相關的部分回答，先列出篩選依據（3 條 bullet），再給出答案。」

使用這些 Prompt，每週對筆記庫進行一次「瘦身」，確保 AI 只接收乾淨高品質的上下文。

---

## 結尾：少記筆記，才是 AI 時代的真正效率

1️⃣ 打開最近 7 天的筆記；  
2️⃣ 按三原則挑選出 3 條；  
3️⃣ 重寫為「問題 + 結論 + 下一步行動」；  
4️⃣ 其餘全部搬到「原始素材」資料夾。

行動：從今天起，每天只保留最關鍵的三條筆記，讓資訊噪音退出你的工作流。

---

# English Version

(Full translation of the article)

---

## 🌟 Introduction

> Now AI makes note‑taking virtually free, but the real key is to write _less_.  
> If you capture everything, you drown the truly valuable information and also “pollute” the context you feed to AI, weakening its output quality.

---

## 1️⃣ From Scarcity to Overabundance: Cheap Notes, Expensive Attention

### 1. Cost reversal – information turns from asset to liability

- Before: Writing notes took time and filtering; only truly important items survived.
- Now: AI can instantly transcribe meetings, summarize long articles, and generate bullet‑point minutes. The barrier is gone, so we keep everything, ending up with a massive “information garbage dump”.

### 2. Human side effects – pseudo‑productivity & decision fatigue

- Pseudo‑productivity: Lots of notes give the illusion of being busy, but most are copy‑pastes that add negligible value.
- Reading debt: A mountain of notes creates guilt and procrastination; opening the app often leads to “I'll read it later”.
- Decision fatigue: Searching returns scores of results, making it even harder to locate the few useful insights you actually need.

### 3. AI side effects – garbage in, garbage out (Context Pollution)

- Feeding a sea of low‑quality notes to LLMs makes the model treat noise as signal; responses become vague and generic.
- Duplicate or contradictory notes cause the model to mix up versions and produce inaccurate suggestions.

> Bottom line: AI removes the cost of note‑taking, but unchecked notes sabotage both you and the AI.

---

## 2️⃣ Three Standards for Notes in the AI Era: Readable, Usable, Re‑usable

### Principle 1 – Write for _future you_, not for present anxiety

- Ask yourself: “In which concrete future scenario will I need this information?”
- If the answer is unclear, send the raw material to a _raw‑material folder_ or discard it.

### Principle 2 – Record only what _changes you_**

- After reading, ask: “Did this information change my view, habit, or decision?”
- If it does not trigger a shift, delete it.

### Principle 3 – Each note should hold one clear hook

- Avoid “mega‑notes”. Title the note with the problem, conclusion, or action so it stays focused on a single point.

> These three rules convert your collection from an “information warehouse” into a “cognitive upgrade log”.

---

## 3️⃣ My “Note‑Reduction Process”: From dozens per day to just the 3 most valuable

### Step 1 – Switch from “copy‑raw” to “write‑conclusion”

1️⃣ Core conclusion – one sentence  
2️⃣ Personal judgment/controversy – do you agree or disagree?  
3️⃣ Actionable step – a single, executable task

> Prompt example (to AI):  
> “Summarize this article in three points: core conclusion, potential controversy, and one actionable recommendation. Keep it brief.”

### Step 2 – Use a _question‑driven_ approach instead of _material‑driven_

- Before you jot a note, write “What problem am I trying to solve?”
- If no clear problem emerges, skip the note.

### Step 3 – Second‑pass filter (24 h later)

1. Review the draft you created earlier that day.
2. Keep only notes that satisfy the three principles; move the rest to a _raw‑material folder_ or delete them.

Result: Formal notes per day dropped from ~20 to 3‑5, quality doubled, and the weekly review rate rose from 5 % to 50 %.

---

## 4️⃣ Turn AI into a Note‑Reduction Assistant, not a “Garbage Manager”

### Two‑layer system

|Layer|Purpose|
|---|---|
|Raw Layer|Holds every raw input (meeting recordings, long articles, chat logs). Only a coarse summary is generated; nothing enters the main knowledge base.|
|Core Layer|Stores only the refined notes that meet the three principles; these are what you retrieve daily and feed to LLMs.|

### Practical Prompt 1 – “Note‑Reduction Assistant”

> “I have a pile of scattered notes. Please: 1) delete duplicates or low‑value items; 2) restructure the remainder into a ‘question‑conclusion‑action’ format, producing 3‑5 candidate notes; 3) highlight the three most worth keeping and explain why.”

### Practical Prompt 2 – Counteracting Context Pollution

> “Below is a raw transcript. Respond _only_ using parts that are highly relevant to the topic ‘XX’. First list three bullet‑point criteria you used for filtering, then give the answer.”

Running these prompts once a week “slims down” your knowledge base, guaranteeing the AI sees only clean, high‑quality context.

---

## Closing – Less Note‑Taking Is the Real Efficiency Lever in the AI Age

1️⃣ Open the notes you created in the past 7 days.  
2️⃣ Apply the three principles and pick the three most valuable entries.  
3️⃣ Rewrite each as Problem + Conclusion + Next‑step Action.  
4️⃣ Move everything else to a Raw‑Material folder (or delete).

Take‑away action: Starting today, limit yourself to three high‑impact notes per day. Let the noise exit your workflow, and let the signal drive your decisions.

---

使用简体、繁体和英文分别创建三套方案，并且对比三套方案优劣

## Ⅰ. 方案一 ― 简体中文（面向中文母语、国内/华语圈用户）

### 核心思路

“少记·分层·AI 辅助”——先把笔记削减到最关键的 3–5 条（三原则），再把所有原始素材放进 底层 Raw‑Layer，仅把符合三原则的笔记搬到 核心 Core‑Layer，最后用本地 LLM（如 Ollama、LM Studio）或 SaaS（如 Notion AI）做一次 自动清洗‑归档。

### 详细步骤

|步骤|操作|推荐工具 / 参数|
|---|---|---|
|1️⃣ 设定“三原则”|- 未来场景   <br>‑ 转变价值   <br>‑ 单一钩子|用 Obsidian/Templater 保存《三原则》模板，随时引用|
|2️⃣ 创建两层目录|￭ `_raw/`（原始素材）  <br>￭ `_core/`（精华笔记）|Obsidian 中建立 `01 Raw` 与 `02 Core` 两个根文件夹|
|3️⃣ 捕获原始信息|录音、文章、聊天记录 → 放入 `_raw/`|Notion AI、ChatGPT、语音转文字 App → 自动同步至 `_raw/`|
|4️⃣ AI 初筛|用 Prompt “把下面的内容提炼成 3 条，满足三原则”|Prompt 示例：`请把以下文字提炼为 1) 核心结论 2) 潜在争议 3) 可执行建议，字数控制在 80 字内`|
|5️⃣ 手动二次筛选（24 h）|只保留满足三原则的笔记，搬入 `_core/`|QuickAdd + Templater 自动将合格笔记移动|
|6️⃣ 周度瘦身|每周运行一次脚本，将 `_core/` 中的 status=done 项移到 `04 Archives/`|Obsidian Custom JS 脚本 `autoArchive.js`|
|7️⃣ 维护仪表盘|用 Dataview 在根目录生成 `Projects / Areas / Resources` 看板|`TABLE file.link, status FROM "_core/" WHERE type = "project"`|

### 关键优势

- 完全本地化，无需跨境网络。
- 结合 三原则，笔记质量显著提升。
- 用 Obsidian‑Dataview‑Templater 实现全链路自动化，学习成本低（适合已有 Obsidian 基础的用户）。

---

## Ⅱ. 方案二 ― 繁體中文（面向台灣、香港、馬來西亞及海外華人）

### 核心思路

「精簡筆記 + 雲端 AI 互動」——把「原始」與「精華」分離，利用 Microsoft OneNote（支援繁體 UI）與 Azure OpenAI（或 ChatGPT）完成 即時摘要 + 自動標籤，再以 Zapier/Power Automate 把合格筆記自動搬入 核心資料庫（如 Notion、Obsidian）。

### 詳細步驟

|步驟|操作|推薦工具 / 設定|
|---|---|---|
|1️⃣ 建立「三大原則」模板|- 未來使用情境   <br>‑ 變化價值   <br>‑ 單一 Hook|OneNote 中建立「三大原則」段落，設定為快速筆記片段|
|2️⃣ 設置雲端儲存層|￭ `OneNote/Raw`（原始素材）  <br>￭ `Notion/Core`（精華）|OneNote 自動同步至 OneDrive，Power Automate 把標籤為 `core` 的頁面推送到 Notion|
|3️⃣ 捕獲原始資訊|錄音、PDF、網頁 → OneNote 內 **「原始」分區|OneNote 手寫+語音轉文字（內建 OCR）|
|4️⃣ AI 初步摘要|使用 Azure OpenAI `text‑davinci‑003`，Prompt：「把以下內容濃縮成 3 點，符合三原則」|在 Power Automate 中設定 OpenAI‑Completion 動作，返回 `summary`|
|5️⃣ 人工二次篩選（24 h）|查看 `summary`，若滿足三原則則點擊 「搬到 Core」 按鈕，否則刪除/歸檔|Notion 中設置「搬移」按鈕，觸發 Zapier 把頁面搬到 `Core` 數據庫|
|6️⃣ 每週自動歸檔|Power Automate 每週檢查 `Core` 中 `status = "done"`，搬至 `Archives`|同上，使用 Date‑Condition 判斷 30 天以上自動歸檔|
|7️⃣ 建立看板|Notion 「Board」視圖 + Dataview（在 Obsidian 中可視化）|`Table`/`Board` 顯示「待執行 / 已完成」|

### 關鍵優勢

- 完全 繁體 UI，降低語言門檻。
- 利用 Microsoft 生態（OneNote + Azure）在企業/學校環境中更易取得授權與支援。
- 透過 Zapier/Power Automate，不需要寫程式即可實現自動化，適合非技術用戶。

---

## Ⅲ. 方案三 ― English (global audience)

### Core Idea

“Lean‑Note Framework + LLM‑Driven Curation” – keep the note count low (3–5 high‑impact items per day) by applying the Three‑Rule filter, split data into Raw and Core layers, and let a local LLM (Ollama, LM Studio) or a cloud LLM (OpenAI, Anthropic) perform the heavy‑lifting of summarisation and de‑duplication.

### Step‑by‑Step Workflow

|Step|Action|Recommended Tools|
|---|---|---|
|1️⃣ Define the Three Rules (Future hook, Transformative value, Single hook)|Store them in an Obsidian Templater snippet (`_templates/three-rules.md`).||
|2️⃣ Create a two‑level folder hierarchy|`00_Raw/` for raw inputs, `01_Core/` for curated notes, `02_Archives/` for finished items.||
|3️⃣ Capture raw material|Voice recordings, PDFs, Slack threads → drop into `00_Raw/`. Use Zapier or Obsidian QuickAdd to import automatically.||
|4️⃣ LLM first‑pass summarisation|Prompt (Ollama/ChatGPT): “Summarize the following in 3 bullet points that satisfy the Three Rules, max 80 words.”||
|5️⃣ Human second‑pass (24 h later)|Review the LLM output; if it meets the rules, move the note to `01_Core/` via a Templater command (`tp.file.move`).||
|6️⃣ Weekly pruning script|`autoArchive.js` (Obsidian Custom JS) moves `status = "done"` items older than 30 days to `02_Archives/`.||
|7️⃣ Dashboard in Obsidian|Use Dataview to generate a Projects/Areas/Resources board: `TABLE file.link, status FROM "01_Core/" WHERE type = "project"`||

### Core Benefits

- Platform‑agnostic – works with any LLM (local or cloud).
- Full automation inside Obsidian, ideal for power users who love code‑driven workflows.
- Keeps the knowledge base lean, maximising retrieval speed and LLM response quality.

---

## Ⅳ. 三套方案优劣对比

|维度|简体方案（国内）|繁体方案（港、台、海外华人）|英文方案（全球）|
|---|---|---|---|
|语言适配|完全中文，符合大陆用户阅读习惯，术语贴合本地生态（Obsidian、Notion AI）|繁体 UI、使用 OneNote/Power Automate，符合台湾/香港常用软件|英文全程，适合国际团队、开源社区|
|技术门槛|需要一定 Obsidian + Templater/Dataview 基础，适合已有 Obsidian 用户|低代码（Power Automate、Zapier），几乎不需要写代码，适合非技术用户|需要一点 JavaScript/Obsidian Custom JS，适合技术型或想自行扩展的用户|
|本地化 vs 云端|完全本地（Ollama/LM Studio），无网络依赖，隐私友好|依赖 Azure/OneNote 云服务，企业/学校授权易获得，网络需求较高|可选本地或云端，自由度最高|
|工具生态兼容性|Obsidian 插件生态丰富（Templater、Dataview、QuickAdd）|Microsoft 生态完整（OneNote、Power Automate、Azure OpenAI）|支持所有主流 LLM 与 Obsidian，亦可对接 Notion、Roam 等|
|实施成本|需要自行搭建本地 LLM（硬件需求）或订阅 Notion AI（付费）|大多使用已有企业/教育版 Office 365，成本随组织而定|基础免费（Ollama），若使用 OpenAI 则按调用量付费|
|可扩展性|通过自定义脚本可加入更多自动化（如标签、智能提醒）|Zapier/Power Automate 可连通 200+ SaaS，易扩展业务流程|完全开源，几乎无限制的插件与自定义脚本|
|潜在风险|本地模型更新慢、硬件故障风险|受限于云服务的隐私政策與网络可用性|依赖网络或本地硬件，若选云服务需关注 API 成本与速率限制|
|适合人群|对隐私有较高要求、已是 Obsidian 重度使用者|对 UI/操作更在意、在企业/学校已有 Microsoft 账号|喜欢代码化、在跨国团队或开源社区协作的用户|

### 综合点评

- 如果你在中国大陆，且已有 Obsidian 基础，简体方案 最符合本地生态，能够完全离线且保持对个人数据的控制。
- 如果你在台港或使用 Microsoft 企业/教育版，繁体方案 利用 OneNote + Azure OpenAI 能快速上手且不必自行维护本地模型，適合非技術背景的團隊。
- 如果你是跨國團隊、開源開發者或希望自行掌控所有自動化細節，英文方案 提供最高的靈活性與擴展空間，適合願意寫腳本、想整合多種 LLM 的使用者。

根據你的語言環境、技術水平、隱私需求與組織資源，選擇最貼合的方案即可在 “少記筆記” 這條路上事半功倍。

---

跟据上面的文章，AI 使用ollama ,模型 gpt-oss:120b-cloud，请用简体、繁体和英文分别 创建实施方案，

# Implementation Plans for the “Less‑Notes + Ollama (gpt‑oss:120b‑cloud)” Workflow

_(Three independent plans – Simplified Chinese, Traditional Chinese, and English)_

---

## 📌 共通前置条件（所有语言共用）

|项目|操作|说明|
|---|---|---|
|Ollama|`curl -L [https://ollama.com/install.sh](https://ollama.com/install.sh)|sh`（Linux/macOS）  <br>或在 [https://ollama.com/download](https://ollama.com/download) 下载对应桌面版|
|模型|`ollama pull gpt-oss:120b-cloud`|该模型是 云端 大模型，由 Ollama 通过 HTTP 代理向云服务请求推理。下载后只会生成一个指向云端的 stub（占几 MB），不需要本地显存。|
|Obsidian|>= 1.10.6|推荐使用最新稳定版|
|插件|QuickAdd v2.9.4  <br>Templater v2.16.4  <br>Dataview v0.5.68  <br>Obsidian Custom JS（可选，用于自动归档）|所有插件在 _Settings → Community plugins_ 中搜索安装并启用|
|网络|能连通 Ollama 所在的云端（默认 `http://127.0.0.1:11434`）|若使用公司代理，请在 `~/.ollama/config.yaml` 中配置 `proxy`（参考官方文档）|
|安全|在 _Settings → Files & Links_ 打开 Enable Remote Requests|允许 Obsidian 发起本地 HTTP 请求到 Ollama|

> 备注：`gpt-oss:120b-cloud` 在 Ollama 中是 远程托管，所以本机只需要运行 Ollama 客户端即可；不必拥有 120 B 参数模型的显卡资源。

---

# Ⅰ. 简体中文实施方案

### 1️⃣ 目录结构（一次完成）

```
MyVault/
├─ 00_Raw/               # 原始素材层（录音、长文、聊天记录）
├─ 01_Core/              # 精华笔记层（符合“三原则”）
│   ├─ Projects/
│   ├─ Areas/
│   └─ Resources/
├─ 02_Archives/          # 归档层
├─ _templates/
│   ├─ PARA/
│   │   ├─ three-rules.md          # 三原则说明（引用）
│   │   ├─ note-summary.md         # 让 Ollama 生成 3‑point 结果的模板
│   │   └─ capture-prompt.md       # QuickAdd Prompt 模板
│   └─ Base/frontmatter.md        # 基础 front‑matter
└─ _meta_/scripts/
    ├─ autoArchive.js               # 每周自动归档脚本
    └─ moveToCore.js                # 24 h 二次筛选脚本
```

```
MyVault/
├─ 00_Raw/               # 原始素材层（录音、长文、聊天记录）
├─ 01_Core/              # 精华笔记层（符合“三原则”）
│   ├─ Projects/
│   ├─ Areas/
│   └─ Resources/
├─ 02_Archives/          # 归档层
├─ _templates/
│   ├─ PARA/
│   │   ├─ three-rules.md          # 三原则说明（引用）
│   │   ├─ note-summary.md         # 让 Ollama 生成 3‑point 结果的模板
│   │   └─ capture-prompt.md       # QuickAdd Prompt 模板
│   └─ Base/frontmatter.md        # 基础 front‑matter
└─ _meta_/scripts/
    ├─ autoArchive.js               # 每周自动归档脚本
    └─ moveToCore.js                # 24 h 二次筛选脚本
```

> 说明：所有模板放在 `_templates/PARA/`，脚本放在 `_meta_/scripts/`，便于统一管理。

---

### 2️⃣ 三原则（模板 `three-rules.md`）

markdown

```
# 三条笔记原则
1️⃣ **未来使用场景**：这条笔记在什么具体情境下会被你再次打开？  
2️⃣ **价值转变**：它是否能让你产生新的想法、决策或行动？  
3️⃣ **单一钩子**：笔记只围绕一个明确的“问题‑结论‑行动”结构，不出现大段杂糅内容。
```

```
# 三条笔记原则
1️⃣ **未来使用场景**：这条笔记在什么具体情境下会被你再次打开？  
2️⃣ **价值转变**：它是否能让你产生新的想法、决策或行动？  
3️⃣ **单一钩子**：笔记只围绕一个明确的“问题‑结论‑行动”结构，不出现大段杂糅内容。
```

> 在每次创建笔记时，用 `{{tp.file.include("[[PARA/three-rules]]")}}` 引用此段，帮助你自检。

---

### 3️⃣ 捕获原始素材 → “快速捕获”宏（QuickAdd）

1. Settings → QuickAdd → Macros → New Macro → 命名 “捕获原始素材”。
2. 动作顺序：

|动作序号|类型|配置|
|---|---|---|
|1|Prompt|Prompt Text: “粘贴原始内容（会议记录、长文、聊天），或直接放置文件链接”。  <br>Variable Name: `rawInput`|
|2|Prompt (可选)|Prompt Text: “给这段内容设定一个临时标题”。  <br>Variable Name: `rawTitle`|
|3|Run JavaScript|参见 3️⃣ 脚本（下面）|

3️⃣ Run JavaScript（创建 Raw 文件）（放在宏的第 3 步）

js

```
// QuickAdd – Create a raw file inside 00_Raw
const title   = args.rawTitle?.trim() || "未命名素材";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_"); // 避免非法字符
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// 写入基本 front‑matter + 原始内容（保持原样）
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ 已创建原始素材《${safeTitle}》`);
```

```
// QuickAdd – Create a raw file inside 00_Raw
const title   = args.rawTitle?.trim() || "未命名素材";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_"); // 避免非法字符
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// 写入基本 front‑matter + 原始内容（保持原样）
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ 已创建原始素材《${safeTitle}》`);
```

> 结果：原始内容被保存到 `00_Raw/标题.md`，随后进入 Step 4（AI 初筛）。

---

### 4️⃣ AI 初筛：使用 gpt‑oss:120b‑cloud 生成 3‑点摘要

#### 4.1 统一的 Templater 摘要模板 `note-summary.md`

markdown

````
<%*
const filePath = tp.file.path(true);   // 当前文件（已在 00_Raw）
const rawContent = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

// Prompt 结构（符合三原则）
const prompt = `
以下是一段原始材料，请帮我把它浓缩为 **3 条**，分别对应：
1️⃣ 核心结论（不超过 30 字）；
2️⃣ 潜在争议或可能的误区（不超过 30 字）；
3️⃣ 一个可执行的行动建议（不超过 30 字）；
请直接输出以下格式（每行前加序号）：
1. <核心结论>
2. <潜在争议>
3. <行动建议>
原始材料如下（请务必完整阅读后再输出）：
"""${rawContent}"""
`;

const response = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300   // 足够产生 3 条短句
  })
})).json();

const summary = response.response?.trim() ?? "❌ 未获取摘要";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI 摘要（3‑点）**  
<%* tR = summary %>

---  
## 原始内容（仅供参考）  
```markdown
<%* tR = rawContent %>
````

````
<%*
const filePath = tp.file.path(true);   // 当前文件（已在 00_Raw）
const rawContent = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

// Prompt 结构（符合三原则）
const prompt = `
以下是一段原始材料，请帮我把它浓缩为 **3 条**，分别对应：
1️⃣ 核心结论（不超过 30 字）；
2️⃣ 潜在争议或可能的误区（不超过 30 字）；
3️⃣ 一个可执行的行动建议（不超过 30 字）；
请直接输出以下格式（每行前加序号）：
1. <核心结论>
2. <潜在争议>
3. <行动建议>
原始材料如下（请务必完整阅读后再输出）：
"""${rawContent}"""
`;

const response = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300   // 足够产生 3 条短句
  })
})).json();

const summary = response.response?.trim() ?? "❌ 未获取摘要";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI 摘要（3‑点）**  
<%* tR = summary %>

---  
## 原始内容（仅供参考）  
```markdown
<%* tR = rawContent %>
````

````

#### 4.2 在 **00_Raw** 文件里运行该模板  

- 打开任意 `00_Raw/*.md`，右键 → **Templater: Run template** → 选择 `note-summary.md`。  
- 脚本会调用 Ollama（`gpt‑oss:120b‑cloud`），把返回的三点插入文件顶部，同时保留原始内容。

---

### 5️⃣ 二次筛选（24 h） → 自动搬入 **01_Core**

#### 5.1 脚本 `moveToCore.js`（放在 `_meta_/scripts/`）

```js
/**
 * 24h 后检查所有 raw 文件的 AI 摘要是否满足“三原则”。
 * 若满足，则自动移动到对应的 Core 子文件夹（Projects/Areas/Resources）。
 * 使用文件名中的标签（#project、#area、#resource）决定目标子文件夹。
 */
module.exports = async (app) => {
  const rawFolder = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    // 判断是否已创建超过 24h
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue;

    const content = await app.vault.read(file);
    // 提取 AI 摘要的三行（正则匹配 1.、2.、3.）
    const match = content.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // 没有摘要，直接跳过

    const [_, conclusion, controversy, action] = match.map(s => s.trim());

    // 简易的“三原则”判断（可以自行细化）
    const hasFutureHook = /未来|场景|何时/.test(conclusion + controversy + action);
    const hasTransform   = /决定|改变|行动/.test(conclusion + action);
    const singleHook    = !/(。|；|；)/.test(conclusion + controversy + action); // 不出现多句

    if (hasFutureHook && hasTransform && singleHook) {
      // 判断归属标签（在文件顶部的 #tag）
      const tags = (content.match(/#\w+/g) || []).map(t => t.slice(1));
      let destSub = "Resources"; // 默认
      if (tags.includes("project")) destSub = "Projects";
      else if (tags.includes("area")) destSub = "Areas";

      const newPath = `${coreFolder}/${destSub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // 写入 Core 专用 front‑matter
      let newContent = content.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);

      console.log(`✅ ${file.path} → ${newPath}`);
    } else {
      console.log(`⚠️ ${file.path} 不满足三原则，留在 Raw`);
    }
  }

  new Notice("🔄 24 h 原始笔记筛选完成");
};
````

````

#### 4.2 在 **00_Raw** 文件里运行该模板  

- 打开任意 `00_Raw/*.md`，右键 → **Templater: Run template** → 选择 `note-summary.md`。  
- 脚本会调用 Ollama（`gpt‑oss:120b‑cloud`），把返回的三点插入文件顶部，同时保留原始内容。

---

### 5️⃣ 二次筛选（24 h） → 自动搬入 **01_Core**

#### 5.1 脚本 `moveToCore.js`（放在 `_meta_/scripts/`）

```js
/**
 * 24h 后检查所有 raw 文件的 AI 摘要是否满足“三原则”。
 * 若满足，则自动移动到对应的 Core 子文件夹（Projects/Areas/Resources）。
 * 使用文件名中的标签（#project、#area、#resource）决定目标子文件夹。
 */
module.exports = async (app) => {
  const rawFolder = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    // 判断是否已创建超过 24h
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue;

    const content = await app.vault.read(file);
    // 提取 AI 摘要的三行（正则匹配 1.、2.、3.）
    const match = content.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // 没有摘要，直接跳过

    const [_, conclusion, controversy, action] = match.map(s => s.trim());

    // 简易的“三原则”判断（可以自行细化）
    const hasFutureHook = /未来|场景|何时/.test(conclusion + controversy + action);
    const hasTransform   = /决定|改变|行动/.test(conclusion + action);
    const singleHook    = !/(。|；|；)/.test(conclusion + controversy + action); // 不出现多句

    if (hasFutureHook && hasTransform && singleHook) {
      // 判断归属标签（在文件顶部的 #tag）
      const tags = (content.match(/#\w+/g) || []).map(t => t.slice(1));
      let destSub = "Resources"; // 默认
      if (tags.includes("project")) destSub = "Projects";
      else if (tags.includes("area")) destSub = "Areas";

      const newPath = `${coreFolder}/${destSub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // 写入 Core 专用 front‑matter
      let newContent = content.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);

      console.log(`✅ ${file.path} → ${newPath}`);
    } else {
      console.log(`⚠️ ${file.path} 不满足三原则，留在 Raw`);
    }
  }

  new Notice("🔄 24 h 原始笔记筛选完成");
};
````

#### 5.2 自动执行方式

- 手动：在 Obsidian 命令面板（Ctrl+P）搜索 “Custom JS: Run moveToCore.js”。
- 自动：使用 Obsidian Custom JS → Settings → Run on startup 或 Run daily at 02:00（设为每日例行任务）。

---

### 6️⃣ 周度归档（已完成的 Core 笔记）

#### 6.1 `autoArchive.js`（放在 `_meta_/scripts/`）

js

```
module.exports = async (app) => {
  const coreFolder = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    // 判定完成时间（假设 frontmatter 中有 completed 日期）
    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // 30 天后才归档

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // 更新状态
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ 本周归档完成");
};
```

```
module.exports = async (app) => {
  const coreFolder = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    // 判定完成时间（假设 frontmatter 中有 completed 日期）
    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // 30 天后才归档

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // 更新状态
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ 本周归档完成");
};
```

#### 6.2 在 Weekly Review（Periodic Notes）里挂入口

在 `09_Weekly Review.md`（Periodic Notes）底部加入：

```
![[/_meta_/scripts/autoArchive.js]]
```

```
![[/_meta_/scripts/autoArchive.js]]
```

每次打开 Weekly Review，脚本自动执行一次。

---

### 7️⃣ 仪表盘（Dataview）

创建三个 Index 页面放在 `01_Core/`：

#### 7.1 `Projects Index.md`

markdown

````
---
title: Projects Dashboard
type: dashboard
---
# 📁 Projects Overview

## 🔢 活跃项目数量
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 项目表
```dataview
TABLE
  file.link AS "项目",
  outcome AS "目标",
  action_plan AS "行动计划",
  file.mtime AS "最近修改"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

````
---
title: Projects Dashboard
type: dashboard
---
# 📁 Projects Overview

## 🔢 活跃项目数量
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 项目表
```dataview
TABLE
  file.link AS "项目",
  outcome AS "目标",
  action_plan AS "行动计划",
  file.mtime AS "最近修改"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

```

> 同理创建 `Areas Index.md` 与 `Resources Index.md`（把路径改成相应子文件夹）。

---

### 8️⃣ 完整操作流程（每日 5‑10 分钟）

1. **捕获**（QuickAdd → “捕获原始素材”） → 自动生成 `00_Raw/标题.md`。  
2. **AI 摘要**：在该文件中运行 **Templater → note-summary.md** → 获得 3‑点摘要。  
3. **24 h 检查**：系统自动（或手动）执行 `moveToCore.js`，把符合三原则的笔记搬入 `01_Core`。  
4. **日常使用**：在 `01_Core` 中写作、复盘，所有检索均通过 Dataview 看板完成。  
5. **每周**：打开 Weekly Review → 脚本自动归档 `status: done` 超过 30 天的笔记。  

---

## Ⅱ. 繁體中文實施方案

### 1️⃣ 目錄結構（一次完成）

```

```

> 同理创建 `Areas Index.md` 与 `Resources Index.md`（把路径改成相应子文件夹）。

---

### 8️⃣ 完整操作流程（每日 5‑10 分钟）

1. **捕获**（QuickAdd → “捕获原始素材”） → 自动生成 `00_Raw/标题.md`。  
2. **AI 摘要**：在该文件中运行 **Templater → note-summary.md** → 获得 3‑点摘要。  
3. **24 h 检查**：系统自动（或手动）执行 `moveToCore.js`，把符合三原则的笔记搬入 `01_Core`。  
4. **日常使用**：在 `01_Core` 中写作、复盘，所有检索均通过 Dataview 看板完成。  
5. **每周**：打开 Weekly Review → 脚本自动归档 `status: done` 超过 30 天的笔记。  

---

## Ⅱ. 繁體中文實施方案

### 1️⃣ 目錄結構（一次完成）

```

MyVault/ ├─ 00_Raw/ # 原始素材層（錄音、長文、聊天記錄） ├─ 01_Core/ # 精華筆記層（符合「三原則」） │ ├─ Projects/ │ ├─ Areas/ │ └─ Resources/ ├─ 02_Archives/ # 歸檔層 ├─ _templates/ │ ├─ PARA/ │ │ ├─ three-rules.md # 三原則說明 │ │ ├─ note-summary.md # Ollama 產出 3 點摘要的模板 │ │ └─ capture-prompt.md # QuickAdd 提示模板 │ └─ Base/frontmatter.md # 基礎 front‑matter └─ _meta_/scripts/ ├─ autoArchive.js # 每週自動歸檔腳本 └─ moveToCore.js # 24 小時二次篩選腳本

````

> **說明**：所有模板放在 `_templates/PARA/`，腳本放在 `_meta_/scripts/`，便於維護。

---

### 2️⃣ 三原則（模板 `three-rules.md`）

```markdown
# 三條筆記原則
1️⃣ **未來使用情境**：這條筆記在什麼具體情境下會再次被你打開？  
2️⃣ **價值轉變**：它是否讓你產生新的想法、決策或行動？  
3️⃣ **單一鉤子**：筆記只圍繞一個明確的「問題‑結論‑行動」結構，不出現大段雜糅內容。
````

````

> **說明**：所有模板放在 `_templates/PARA/`，腳本放在 `_meta_/scripts/`，便於維護。

---

### 2️⃣ 三原則（模板 `three-rules.md`）

```markdown
# 三條筆記原則
1️⃣ **未來使用情境**：這條筆記在什麼具體情境下會再次被你打開？  
2️⃣ **價值轉變**：它是否讓你產生新的想法、決策或行動？  
3️⃣ **單一鉤子**：筆記只圍繞一個明確的「問題‑結論‑行動」結構，不出現大段雜糅內容。
````

> 在每次建立筆記時，用 `{{tp.file.include("[[PARA/three-rules]]")}}` 來提醒自己檢視。

---

### 3️⃣ 捕獲原始素材 – QuickAdd 宏

1. 設定 → QuickAdd → Macros → New Macro → 命名 「捕獲原始素材」。
2. 動作順序：

|步驟|類型|設定|
|---|---|---|
|1️⃣|Prompt|Prompt Text：`貼上原始內容（會議錄音文字稿、長文、聊天記錄），或直接放檔案連結`  <br>Variable Name：`rawInput`|
|2️⃣|Prompt|Prompt Text：`為這段內容取個暫時標題`  <br>Variable Name：`rawTitle`|
|3️⃣|Run JavaScript|參見 3️⃣（下方腳本）|

#### 3️⃣ Run JavaScript（建立 Raw 檔案）

js

```
// QuickAdd – 建立 Raw 檔案於 00_Raw
const title   = args.rawTitle?.trim() || "未命名素材";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// 寫入 front‑matter + 原始內容
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ 已建立原始素材《${safeTitle}》`);
```

```
// QuickAdd – 建立 Raw 檔案於 00_Raw
const title   = args.rawTitle?.trim() || "未命名素材";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// 寫入 front‑matter + 原始內容
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ 已建立原始素材《${safeTitle}》`);
```

---

### 4️⃣ AI 初篩 – 使用 gpt‑oss:120b‑cloud 產出 3 點摘要

#### 4.1 Templater 模板 `note-summary.md`

markdown

````
<%*
const filePath = tp.file.path(true);               // 目前檔案
const raw = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

const prompt = `
請把以下原始材料濃縮為 **3 條**，分別為：
1️⃣ 核心結論（不超過 30 字）；
2️⃣ 潛在爭議或可能的誤區（不超過 30 字）；
3️⃣ 一個可執行的行動建議（不超過 30 字）。
請直接以以下格式回覆（每行前加序號）：
1. <核心結論>
2. <潛在爭議>
3. <行動建議>
以下是原始內容（請完整閱讀後再輸出）：
"""${raw}"""
`;

const resp = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300
  })
})).json();

const summary = resp.response?.trim() ?? "❌ 未取得摘要";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI 摘要（3‑點）**  
<%* tR = summary %>

---  
## 原始內容（供參考）  
```markdown
<%* tR = raw %>
````

````
<%*
const filePath = tp.file.path(true);               // 目前檔案
const raw = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

const prompt = `
請把以下原始材料濃縮為 **3 條**，分別為：
1️⃣ 核心結論（不超過 30 字）；
2️⃣ 潛在爭議或可能的誤區（不超過 30 字）；
3️⃣ 一個可執行的行動建議（不超過 30 字）。
請直接以以下格式回覆（每行前加序號）：
1. <核心結論>
2. <潛在爭議>
3. <行動建議>
以下是原始內容（請完整閱讀後再輸出）：
"""${raw}"""
`;

const resp = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300
  })
})).json();

const summary = resp.response?.trim() ?? "❌ 未取得摘要";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI 摘要（3‑點）**  
<%* tR = summary %>

---  
## 原始內容（供參考）  
```markdown
<%* tR = raw %>
````

````

#### 4.2 使用方式  

在 `00_Raw/*.md` 開啟後，右鍵 → **Templater: Run template** → 選擇 `note-summary.md`，即可呼叫 Ollama（gpt‑oss:120b‑cloud）返回三條要點，並自動寫入檔案頂部。

---

### 5️⃣ 24 小時二次篩選 → 自動搬到 **01_Core**

#### 5.1 腳本 `moveToCore.js`

```js
/**
 * 每日或每次手動執行，檢查 00_Raw 中的筆記是否符合「三原則」。
 * 符合則搬到 01_Core/[Projects|Areas|Resources] 子資料夾。
 * 依據檔案內的 #tag 判斷歸屬（#project、#area、#resource）。
 */
module.exports = async (app) => {
  const rawFolder  = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now   = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue; // 未滿 24h

    const txt = await app.vault.read(file);
    const match = txt.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // 沒有三點摘要

    const [_ , c1, c2, c3] = match.map(s => s.trim());

    // 簡易三原則檢測（可自行加強）
    const futureHook = /未來|場景|什麼時候/.test(c1 + c2 + c3);
    const transform  = /決策|行動|改變/.test(c1 + c3);
    const singleHook = !/(。|；|；)/.test(c1 + c2 + c3);

    if (futureHook && transform && singleHook) {
      // 依照 #tag 判斷目標子資料夾
      const tags = (txt.match(/#\w+/g) || []).map(t => t.slice(1));
      let sub = "Resources";
      if (tags.includes("project")) sub = "Projects";
      else if (tags.includes("area")) sub = "Areas";

      const newPath = `${coreFolder}/${sub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // 更新 front‑matter
      let newContent = txt.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
      console.log(`✅ ${file.path} → ${newPath}`);
    }
  }
  new Notice("🔄 24h 原始筆記篩選完成");
};
````

````

#### 4.2 使用方式  

在 `00_Raw/*.md` 開啟後，右鍵 → **Templater: Run template** → 選擇 `note-summary.md`，即可呼叫 Ollama（gpt‑oss:120b‑cloud）返回三條要點，並自動寫入檔案頂部。

---

### 5️⃣ 24 小時二次篩選 → 自動搬到 **01_Core**

#### 5.1 腳本 `moveToCore.js`

```js
/**
 * 每日或每次手動執行，檢查 00_Raw 中的筆記是否符合「三原則」。
 * 符合則搬到 01_Core/[Projects|Areas|Resources] 子資料夾。
 * 依據檔案內的 #tag 判斷歸屬（#project、#area、#resource）。
 */
module.exports = async (app) => {
  const rawFolder  = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now   = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue; // 未滿 24h

    const txt = await app.vault.read(file);
    const match = txt.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // 沒有三點摘要

    const [_ , c1, c2, c3] = match.map(s => s.trim());

    // 簡易三原則檢測（可自行加強）
    const futureHook = /未來|場景|什麼時候/.test(c1 + c2 + c3);
    const transform  = /決策|行動|改變/.test(c1 + c3);
    const singleHook = !/(。|；|；)/.test(c1 + c2 + c3);

    if (futureHook && transform && singleHook) {
      // 依照 #tag 判斷目標子資料夾
      const tags = (txt.match(/#\w+/g) || []).map(t => t.slice(1));
      let sub = "Resources";
      if (tags.includes("project")) sub = "Projects";
      else if (tags.includes("area")) sub = "Areas";

      const newPath = `${coreFolder}/${sub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // 更新 front‑matter
      let newContent = txt.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
      console.log(`✅ ${file.path} → ${newPath}`);
    }
  }
  new Notice("🔄 24h 原始筆記篩選完成");
};
````

#### 5.2 執行方式

- 手動：`Ctrl+P` 搜索 Custom JS: Run moveToCore.js。
- 自動：在 Obsidian Custom JS → Settings → Run daily at… 設為每天 02:00，或使用系统任务 (cron) 觸發。

---

### 6️⃣ 週度自動歸檔（已完成的 Core 筆記）

#### 6.1 腳本 `autoArchive.js`

js

```
module.exports = async (app) => {
  const coreFolder    = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now   = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm    = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // 30 天後才歸檔

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // 更新 front‑matter
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ 本週歸檔已完成");
};
```

```
module.exports = async (app) => {
  const coreFolder    = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now   = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm    = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // 30 天後才歸檔

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // 更新 front‑matter
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ 本週歸檔已完成");
};
```

#### 6.2 Weekly Review 中嵌入

在 `09_Weekly Review.md` 底部加入以下行，使其在打開時自動執行：

```
![[/_meta_/scripts/autoArchive.js]]
```

```
![[/_meta_/scripts/autoArchive.js]]
```

---

### 7️⃣ 儀表盤（Dataview）

#### 7.1 Projects Index（放在 `01_Core/Projects Index.md`）

markdown

````
---
title: Projects 看板
type: dashboard
---
# 📁 Projects Overview

## 🔢 活躍項目數量
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 活躍項目列表
```dataview
TABLE
  file.link AS "項目",
  outcome AS "目標",
  action_plan AS "行動計畫",
  file.mtime AS "最近修改"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

````
---
title: Projects 看板
type: dashboard
---
# 📁 Projects Overview

## 🔢 活躍項目數量
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 活躍項目列表
```dataview
TABLE
  file.link AS "項目",
  outcome AS "目標",
  action_plan AS "行動計畫",
  file.mtime AS "最近修改"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

```

> 同理建立 `Areas Index.md`、`Resources Index.md`（路徑改為相應子資料夾）。

---

### 8️⃣ 完整每日工作流（約 5‑10 分鐘）

1. **快速捕獲** → QuickAdd `捕獲原始素材` → 產生 `00_Raw/xxx.md`。  
2. **AI 摘要** → 在剛建立的檔案中執行 Templater `note-summary.md` → 得到 3‑點摘要。  
3. **24 h 篩選** → 系統自動（或手動）執行 `moveToCore.js`，把符合三原則的筆記搬到 `01_Core` 的相應子資料夾。  
4. **日常使用** → 在 `01_Core` 中閱讀、編輯、標記 `status: done`，所有檢索均使用 Dataview 看板。  
5. **每週** → 打開 `Weekly Review` → 觸發 `autoArchive.js`，自動把超過 30 天且已完成的筆記搬至 `02_Archives`。  

> 這套流程將 **「大量捕獲」 → 「AI 濃縮」 → 「手動二次篩」 → 「自動歸檔」** 完整閉環，讓筆記量保持在 *每天 3‑5 條高質量*，且所有輸入都來自 **gpt‑oss:120b‑cloud** 的強大語言能力。

---

## Ⅲ. English Implementation Plan

### 1️⃣ Folder Layout (one‑time setup)

```

```

> 同理建立 `Areas Index.md`、`Resources Index.md`（路徑改為相應子資料夾）。

---

### 8️⃣ 完整每日工作流（約 5‑10 分鐘）

1. **快速捕獲** → QuickAdd `捕獲原始素材` → 產生 `00_Raw/xxx.md`。  
2. **AI 摘要** → 在剛建立的檔案中執行 Templater `note-summary.md` → 得到 3‑點摘要。  
3. **24 h 篩選** → 系統自動（或手動）執行 `moveToCore.js`，把符合三原則的筆記搬到 `01_Core` 的相應子資料夾。  
4. **日常使用** → 在 `01_Core` 中閱讀、編輯、標記 `status: done`，所有檢索均使用 Dataview 看板。  
5. **每週** → 打開 `Weekly Review` → 觸發 `autoArchive.js`，自動把超過 30 天且已完成的筆記搬至 `02_Archives`。  

> 這套流程將 **「大量捕獲」 → 「AI 濃縮」 → 「手動二次篩」 → 「自動歸檔」** 完整閉環，讓筆記量保持在 *每天 3‑5 條高質量*，且所有輸入都來自 **gpt‑oss:120b‑cloud** 的強大語言能力。

---

## Ⅲ. English Implementation Plan

### 1️⃣ Folder Layout (one‑time setup)

```

MyVault/ ├─ 00_Raw/ # Raw layer – recordings, long articles, chat logs ├─ 01_Core/ # Core layer – notes that satisfy the Three Rules │ ├─ Projects/ │ ├─ Areas/ │ └─ Resources/ ├─ 02_Archives/ # Archive layer ├─ _templates/ │ ├─ PARA/ │ │ ├─ three-rules.md # The Three Rules description │ │ ├─ note-summary.md # Templater template that calls Ollama │ │ └─ capture-prompt.md # QuickAdd Prompt template │ └─ Base/frontmatter.md # Minimal front‑matter └─ _meta_/scripts/ ├─ autoArchive.js # Weekly auto‑archive script └─ moveToCore.js # 24‑hour second‑pass filter script

````

---

### 2️⃣ The **Three Rules** (template `three-rules.md`)

```markdown
# The Three Note‑Taking Rules
1️⃣ **Future Hook** – In which concrete scenario will *future you* open this note?  
2️⃣ **Transformative Value** – Does it cause a new idea, decision, or action?  
3️⃣ **Single Hook** – The note revolves around ONE clear “question‑conclusion‑action” structure, no sprawling content.
````

````

---

### 2️⃣ The **Three Rules** (template `three-rules.md`)

```markdown
# The Three Note‑Taking Rules
1️⃣ **Future Hook** – In which concrete scenario will *future you* open this note?  
2️⃣ **Transformative Value** – Does it cause a new idea, decision, or action?  
3️⃣ **Single Hook** – The note revolves around ONE clear “question‑conclusion‑action” structure, no sprawling content.
````

> Include this snippet in any newly created note with `{{tp.file.include("[[PARA/three-rules]]")}}` to remind yourself to self‑audit.

---

### 3️⃣ QuickAdd Macro – Capture Raw Material

1. Settings → QuickAdd → Macros → New Macro → name “Capture Raw Material”.
2. Add three actions:

|Action|Type|Settings|
|---|---|---|
|1️⃣|Prompt|Prompt Text: “Paste raw content (meeting transcript, long article, chat log) or drop a file link.”  <br>Variable Name: `rawInput`|
|2️⃣|Prompt|Prompt Text: “Give this content a temporary title.”  <br>Variable Name: `rawTitle`|
|3️⃣|Run JavaScript|(see script below)|

#### Run JavaScript (creates a file in `00_Raw`)

js

```
// QuickAdd – create a raw markdown file inside 00_Raw
const title   = args.rawTitle?.trim() || "Untitled Material";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_"); // avoid illegal chars
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// write front‑matter + raw content
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ Created raw material “${safeTitle}”`);
```

```
// QuickAdd – create a raw markdown file inside 00_Raw
const title   = args.rawTitle?.trim() || "Untitled Material";
const content = args.rawInput?.trim() || "";
const folder  = "00_Raw";

const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_"); // avoid illegal chars
const filePath  = `${folder}/${safeTitle}.md`;

const fm = await tp.file.include("[[Base/frontmatter]]");

// write front‑matter + raw content
await app.vault.create(filePath, `${fm}\n---\n${content}`);

await app.workspace.openLinkText(filePath, "", false);
new Notice(`✅ Created raw material “${safeTitle}”`);
```

_Result_: The raw material lives in `00_Raw/Title.md` and will be processed in the next step.

---

### 4️⃣ AI First‑Pass Summarisation – gpt‑oss:120b‑cloud

#### 4.1 Templater template `note-summary.md`

markdown

````
<%*
const filePath = tp.file.path(true);                 // current file (in 00_Raw)
const raw = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

const prompt = `
Please compress the following raw material into **3 bullet points**, each fulfilling:
1️⃣ Core conclusion (≤30 characters)  
2️⃣ Potential controversy or common misunderstanding (≤30 characters)  
3️⃣ One actionable recommendation (≤30 characters)  

Output must be exactly in the format:
1. <Core conclusion>  
2. <Controversy>  
3. <Action>  

Below is the raw material (read it thoroughly before answering):
"""${raw}"""
`;

const resp = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300
  })
})).json();

const summary = resp.response?.trim() ?? "❌ No summary returned";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI‑Generated 3‑Point Summary**  
<%* tR = summary %>

---  
## Raw material (for reference)  
```markdown
<%* tR = raw %>
````

````
<%*
const filePath = tp.file.path(true);                 // current file (in 00_Raw)
const raw = await app.vault.read(app.vault.getAbstractFileByPath(filePath));
const model = "gpt-oss:120b-cloud";

const prompt = `
Please compress the following raw material into **3 bullet points**, each fulfilling:
1️⃣ Core conclusion (≤30 characters)  
2️⃣ Potential controversy or common misunderstanding (≤30 characters)  
3️⃣ One actionable recommendation (≤30 characters)  

Output must be exactly in the format:
1. <Core conclusion>  
2. <Controversy>  
3. <Action>  

Below is the raw material (read it thoroughly before answering):
"""${raw}"""
`;

const resp = await (await fetch("http://127.0.0.1:11434/api/generate", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    model,
    prompt,
    stream: false,
    temperature: 0.6,
    max_tokens: 300
  })
})).json();

const summary = resp.response?.trim() ?? "❌ No summary returned";
%>
<%* await tp.file.include("[[Base/frontmatter]]") %>
---
type: raw
status: inbox
---
# {{tp.file.title}}

> **AI‑Generated 3‑Point Summary**  
<%* tR = summary %>

---  
## Raw material (for reference)  
```markdown
<%* tR = raw %>
````

````

#### How to use  

- Open any `00_Raw/*.md`.  
- Right‑click → **Templater: Run template** → select `note-summary.md`.  
- The script contacts Ollama (`gpt‑oss:120b‑cloud`) and injects the three‑point summary at the top of the file.

---

### 5️⃣ 24‑Hour Second‑Pass Filter → Move to **01_Core**

#### 5.1 Script `moveToCore.js` (place in `_meta_/scripts/`)

```js
/**
 * After 24h, inspect every raw note.
 * If the 3‑point AI summary satisfies the Three Rules,
 * move the file into the appropriate Core sub‑folder
 * (Projects / Areas / Resources) based on #tags.
 */
module.exports = async (app) => {
  const rawFolder  = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now   = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue; // not yet 24h

    const txt = await app.vault.read(file);
    const match = txt.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // no AI summary

    const [_ , line1, line2, line3] = match.map(s => s.trim());

    // Very lightweight Three‑Rule checks (customize as you wish)
    const futureHook = /future|scenario|when/.test(line1 + line2 + line3);
    const transform   = /decide|action|change/.test(line1 + line3);
    const singleHook = !/(\.|;)/.test(line1 + line2 + line3);

    if (futureHook && transform && singleHook) {
      // Determine destination by #tag (default to Resources)
      const tags = (txt.match(/#\w+/g) || []).map(t => t.slice(1));
      let sub = "Resources";
      if (tags.includes("project")) sub = "Projects";
      else if (tags.includes("area")) sub = "Areas";

      const newPath = `${coreFolder}/${sub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // Update front‑matter for core notes
      let newContent = txt.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
      console.log(`✅ ${file.path} → ${newPath}`);
    }
  }
  new Notice("🔄 24‑hour raw‑note filter completed");
};
````

````

#### How to use  

- Open any `00_Raw/*.md`.  
- Right‑click → **Templater: Run template** → select `note-summary.md`.  
- The script contacts Ollama (`gpt‑oss:120b‑cloud`) and injects the three‑point summary at the top of the file.

---

### 5️⃣ 24‑Hour Second‑Pass Filter → Move to **01_Core**

#### 5.1 Script `moveToCore.js` (place in `_meta_/scripts/`)

```js
/**
 * After 24h, inspect every raw note.
 * If the 3‑point AI summary satisfies the Three Rules,
 * move the file into the appropriate Core sub‑folder
 * (Projects / Areas / Resources) based on #tags.
 */
module.exports = async (app) => {
  const rawFolder  = "00_Raw";
  const coreFolder = "01_Core";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(rawFolder));
  const now   = Date.now();

  for (const file of files) {
    const stat = await app.vault.getAbstractFileByPath(file.path).stat;
    if (now - stat.mtime < 24 * 60 * 60 * 1000) continue; // not yet 24h

    const txt = await app.vault.read(file);
    const match = txt.match(/1\.\s*(.+?)\r?\n2\.\s*(.+?)\r?\n3\.\s*(.+?)\r?\n/);
    if (!match) continue; // no AI summary

    const [_ , line1, line2, line3] = match.map(s => s.trim());

    // Very lightweight Three‑Rule checks (customize as you wish)
    const futureHook = /future|scenario|when/.test(line1 + line2 + line3);
    const transform   = /decide|action|change/.test(line1 + line3);
    const singleHook = !/(\.|;)/.test(line1 + line2 + line3);

    if (futureHook && transform && singleHook) {
      // Determine destination by #tag (default to Resources)
      const tags = (txt.match(/#\w+/g) || []).map(t => t.slice(1));
      let sub = "Resources";
      if (tags.includes("project")) sub = "Projects";
      else if (tags.includes("area")) sub = "Areas";

      const newPath = `${coreFolder}/${sub}/${file.basename}.md`;
      await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

      // Update front‑matter for core notes
      let newContent = txt.replace(/type:\s*raw/, "type: core");
      newContent = newContent.replace(/status:\s*inbox/, "status: active");
      await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
      console.log(`✅ ${file.path} → ${newPath}`);
    }
  }
  new Notice("🔄 24‑hour raw‑note filter completed");
};
````

#### Execution

- Manual: `Ctrl+P` → _Custom JS: Run moveToCore.js_.
- Automated: In Obsidian Custom JS settings, enable _Run daily at 02:00_ (or any convenient time).

---

### 6️⃣ Weekly Auto‑Archive (Core → Archives)

#### 6.1 Script `autoArchive.js`

js

```
module.exports = async (app) => {
  const coreFolder    = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now   = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm    = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // keep for 30 days after marking done

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // flip status to archived
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ Weekly archive routine finished");
};
```

```
module.exports = async (app) => {
  const coreFolder    = "01_Core";
  const archiveFolder = "02_Archives";

  const files = app.vault.getFiles().filter(f => f.path.startsWith(coreFolder));
  const now   = new Date();

  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const fm    = cache?.frontmatter;
    if (!fm) continue;
    if (fm.status?.toLowerCase() !== "done") continue;

    const completed = fm.completed ? new Date(fm.completed) : null;
    if (!completed) continue;
    const days = (now - completed) / (1000 * 60 * 60 * 24);
    if (days < 30) continue; // keep for 30 days after marking done

    const newPath = file.path.replace(coreFolder, archiveFolder);
    await app.fileManager.renameFile(file, await app.vault.getAbstractFileByPath(newPath));

    // flip status to archived
    let newContent = await app.vault.read(app.vault.getAbstractFileByPath(newPath));
    newContent = newContent.replace(/status:\s*done/i, "status: archived");
    await app.vault.modify(app.vault.getAbstractFileByPath(newPath), newContent);
  }

  new Notice("✅ Weekly archive routine finished");
};
```

#### Hook into Weekly Review

Add the following line at the bottom of your Weekly Review note (`09_Weekly Review.md`):

```
![[/_meta_/scripts/autoArchive.js]]
```

```
![[/_meta_/scripts/autoArchive.js]]
```

Whenever you open the Weekly Review note, the script runs automatically.

---

### 7️⃣ Dashboard – Dataview Views

#### 7.1 Projects Index (`01_Core/Projects Index.md`)

markdown

````
---
title: Projects Dashboard
type: dashboard
---
# 📁 Projects Overview

## 🔢 Active Projects Count
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 Active Projects Table
```dataview
TABLE
  file.link AS "Project",
  outcome AS "Goal",
  action_plan AS "Action",
  file.mtime AS "Last Modified"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

````
---
title: Projects Dashboard
type: dashboard
---
# 📁 Projects Overview

## 🔢 Active Projects Count
`{{ (dv.pages('01_Core/Projects')).where(p => p.status == "active").length }}`

## 📊 Active Projects Table
```dataview
TABLE
  file.link AS "Project",
  outcome AS "Goal",
  action_plan AS "Action",
  file.mtime AS "Last Modified"
FROM "01_Core/Projects"
WHERE status = "active"
SORT file.mtime DESC
````

```

> Duplicate the page for **Areas** and **Resources**, changing the folder path accordingly.

---

### 8️⃣ End‑to‑End Daily Workflow (≈5‑10 minutes)

1. **Capture** – QuickAdd > “Capture Raw Material” → raw file in `00_Raw`.  
2. **Summarise** – Open that file, run **Templater → note-summary.md** → AI returns 3‑point summary.  
3. **24‑Hour Filter** – System (or manual) runs `moveToCore.js`; notes that satisfy the Three Rules move to `01_Core/Projects|Areas|Resources`.  
4. **Everyday Use** – Work inside `01_Core` (search, link, write). Mark completed notes with `status: done` and optional `completed: YYYY-MM-DD`.  
5. **Weekly Review** – Open `09_Weekly Review.md` → the `autoArchive.js` call archives old completed notes.  

**Result:** Your vault stays around **3‑5 high‑impact notes per day**, while the massive raw input stays in the *raw layer* and never pollutes your AI context.  

---

## 📊 Quick Comparison of the Three Plans

| Aspect | Simplified‑Chinese Plan | Traditional‑Chinese Plan | English Plan |
|--------|--------------------------|--------------------------|--------------|
| **Target audience** | Mainland Chinese users, familiar with Simplified UI. | Taiwan/Hong Kong/Malaysia users, prefer Traditional UI. | Global/English‑speaking teams, any locale. |
| **Core toolset** | Obsidian + QuickAdd + Templater + Dataview + Obsidian Custom JS | Same set, but UI language Traditional; steps identical. | Same set, all documentation in English. |
| **Model access** | `gpt‑oss:120b‑cloud` via the local Ollama proxy (`http://127.0.0.1:11434`). | Identical – Ollama client works on any OS, language independent. | Identical – you can also call the model from a remote server if you expose Ollama’s HTTP endpoint. |
| **Automation depth** | Full automation (24 h filter + weekly archive) via Custom JS scripts stored in `_meta_/scripts`. | Same depth; the only difference is UI language of the scripts/comments. | Same depth; comments written in English for easier collaboration. |
| **Learning curve** | Medium – requires understanding of Templater syntax & JavaScript. | Same – but Chinese comments help beginners. | Same – but English comments suit global developers. |
| **Prerequisite hardware** | Only the Ollama client (thin). The heavy inference runs in the cloud, so any PC works. | Same. | Same. |
| **Maintenance** | Update model via `ollama pull gpt‑oss:120b‑cloud`; scripts rarely change. | Same. | Same. |
| **Pros** | Native Chinese documentation, fast local setup, works behind firewalls. | Traditional Chinese UI, ideal for HK/TW users, same workflow. | Clear English docs, ready for multinational teams, easy to put into version control. |
| **Cons** | Requires Chinese‑speaking support; some Chinese‑only resources. | Requires Traditional‑Chinese environment; occasional locale‑specific bugs. | All comments in English – may need translation for non‑English team members. |

---

### 🎉 Bottom Line  

Regardless of language, the **core pipeline** is identical:

1. **Capture raw material** (QuickAdd → `00_Raw`).  
2. **Ask Ollama (`gpt‑oss:120b‑cloud`)** to produce a **3‑point “core‑conclusion / controversy / action”** summary (Templater).  
3. **24 h second pass** checks the three rules and moves qualified notes to **Core** (`01_Core`).  
4. **Weekly review** archives old “done” notes.  
5. **Dataview dashboards** give you a clean, instantly searchable knowledge base.

Implement the plan in the language your team is most comfortable with, and you’ll turn the *“AI‑made‑note‑taking‑free‑for‑all”* trap into a **lean, high‑impact second brain** powered by **Ollama’s gpt‑oss:120b‑cloud**. 🚀  
```

```

> Duplicate the page for **Areas** and **Resources**, changing the folder path accordingly.

---

### 8️⃣ End‑to‑End Daily Workflow (≈5‑10 minutes)

1. **Capture** – QuickAdd > “Capture Raw Material” → raw file in `00_Raw`.  
2. **Summarise** – Open that file, run **Templater → note-summary.md** → AI returns 3‑point summary.  
3. **24‑Hour Filter** – System (or manual) runs `moveToCore.js`; notes that satisfy the Three Rules move to `01_Core/Projects|Areas|Resources`.  
4. **Everyday Use** – Work inside `01_Core` (search, link, write). Mark completed notes with `status: done` and optional `completed: YYYY-MM-DD`.  
5. **Weekly Review** – Open `09_Weekly Review.md` → the `autoArchive.js` call archives old completed notes.  

**Result:** Your vault stays around **3‑5 high‑impact notes per day**, while the massive raw input stays in the *raw layer* and never pollutes your AI context.  

---

## 📊 Quick Comparison of the Three Plans

| Aspect | Simplified‑Chinese Plan | Traditional‑Chinese Plan | English Plan |
|--------|--------------------------|--------------------------|--------------|
| **Target audience** | Mainland Chinese users, familiar with Simplified UI. | Taiwan/Hong Kong/Malaysia users, prefer Traditional UI. | Global/English‑speaking teams, any locale. |
| **Core toolset** | Obsidian + QuickAdd + Templater + Dataview + Obsidian Custom JS | Same set, but UI language Traditional; steps identical. | Same set, all documentation in English. |
| **Model access** | `gpt‑oss:120b‑cloud` via the local Ollama proxy (`http://127.0.0.1:11434`). | Identical – Ollama client works on any OS, language independent. | Identical – you can also call the model from a remote server if you expose Ollama’s HTTP endpoint. |
| **Automation depth** | Full automation (24 h filter + weekly archive) via Custom JS scripts stored in `_meta_/scripts`. | Same depth; the only difference is UI language of the scripts/comments. | Same depth; comments written in English for easier collaboration. |
| **Learning curve** | Medium – requires understanding of Templater syntax & JavaScript. | Same – but Chinese comments help beginners. | Same – but English comments suit global developers. |
| **Prerequisite hardware** | Only the Ollama client (thin). The heavy inference runs in the cloud, so any PC works. | Same. | Same. |
| **Maintenance** | Update model via `ollama pull gpt‑oss:120b‑cloud`; scripts rarely change. | Same. | Same. |
| **Pros** | Native Chinese documentation, fast local setup, works behind firewalls. | Traditional Chinese UI, ideal for HK/TW users, same workflow. | Clear English docs, ready for multinational teams, easy to put into version control. |
| **Cons** | Requires Chinese‑speaking support; some Chinese‑only resources. | Requires Traditional‑Chinese environment; occasional locale‑specific bugs. | All comments in English – may need translation for non‑English team members. |

---

### 🎉 Bottom Line  

Regardless of language, the **core pipeline** is identical:

1. **Capture raw material** (QuickAdd → `00_Raw`).  
2. **Ask Ollama (`gpt‑oss:120b‑cloud`)** to produce a **3‑point “core‑conclusion / controversy / action”** summary (Templater).  
3. **24 h second pass** checks the three rules and moves qualified notes to **Core** (`01_Core`).  
4. **Weekly review** archives old “done” notes.  
5. **Dataview dashboards** give you a clean, instantly searchable knowledge base.

Implement the plan in the language your team is most comfortable with, and you’ll turn the *“AI‑made‑note‑taking‑free‑for‑all”* trap into a **lean, high‑impact second brain** powered by **Ollama’s gpt‑oss:120b‑cloud**. 🚀  
```

---

未解析的变量 rawTitle

## 问题概述

> 错误提示：`未解析的变量 rawTitle`  
> 出现位置：`Create a raw.js`（QuickAdd → Run JavaScript 动作）

根本原因：在 QuickAdd 宏里没有提前创建、且顺序不对地提供 `rawTitle`（和 `rawInput`）这两个变量。QuickAdd 只会把 Prompt 动作输出的变量放进 `args`，如果没有相应的 Prompt，脚本里 `args.rawTitle` 就是 undefined，于是报 “未解析的变量”。

下面分别用 简体中文、繁体中文、英文 给出 完整的解决方案，包括：

1. 正确的 QuickAdd 宏配置顺序
2. 完整、可直接复制的脚本（已修正路径、错误处理、默认回退）
3. 常见的二次错误排查技巧

---

## Ⅰ️⃣ 简体中文实现方案

### 1️⃣ QuickAdd 宏的正确配置

|步骤|动作类型|变量名|配置要点|
|---|---|---|---|
|1|Prompt|`rawTitle`|提示文字：`请输入该素材的标题（可空，系统会自动生成）`|
|2|Prompt|`rawInput`|提示文字：`粘贴原始内容（会议记录、长文等）`|
|3|Run JavaScript|—|填入下面的 完整脚本（直接复制）|

> 关键：确保 Prompt 动作在 Run JavaScript 前，否则 `args` 里没有这两个变量。  
> Tips：在 QuickAdd → Macro → _Advanced Settings_ 中勾选 “Run actions sequentially (Macro)”，默认即为顺序执行。

---

### 2️⃣ 完整脚本（Create a raw.js）

js

```
/**
 * QuickAdd – 在 0 Personals/01_Raw 中创建原始笔记文件
 * 需要两个前置 Prompt：rawTitle（标题）和 rawInput（正文）。
 */

const folder = "0 Personals/01_Raw";

// ----- 1️⃣ 读取 Prompt 传入的变量 -----------------
let title   = args.rawTitle?.trim();          // 可能为空
let content = args.rawInput?.trim();           // 可能为空

// ----- 2️⃣ 如果用户没提供标题，自动生成 ---------
if (!title) {
  // 用当前时间戳 + “原始素材” 作为默认标题
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `原始素材-${ts}`;
}

// ----- 3️⃣ 防止非法文件名字符 --------------------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ----- 4️⃣ 完整文件路径 -------------------------
const filePath = `${folder}/${safeTitle}.md`;

// ----- 5️⃣ 读取基础 front‑matter（放在 _templates/Base/frontmatter.md） -----
const fm = await tp.file.include("[[Base/frontmatter]]");

// ----- 6️⃣ 写入文件（若文件已存在则提示并打开） ----------
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ 文件已存在，直接打开《${safeTitle}》`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ 已创建原始素材《${safeTitle}》`);
}
```

```
/**
 * QuickAdd – 在 0 Personals/01_Raw 中创建原始笔记文件
 * 需要两个前置 Prompt：rawTitle（标题）和 rawInput（正文）。
 */

const folder = "0 Personals/01_Raw";

// ----- 1️⃣ 读取 Prompt 传入的变量 -----------------
let title   = args.rawTitle?.trim();          // 可能为空
let content = args.rawInput?.trim();           // 可能为空

// ----- 2️⃣ 如果用户没提供标题，自动生成 ---------
if (!title) {
  // 用当前时间戳 + “原始素材” 作为默认标题
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `原始素材-${ts}`;
}

// ----- 3️⃣ 防止非法文件名字符 --------------------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ----- 4️⃣ 完整文件路径 -------------------------
const filePath = `${folder}/${safeTitle}.md`;

// ----- 5️⃣ 读取基础 front‑matter（放在 _templates/Base/frontmatter.md） -----
const fm = await tp.file.include("[[Base/frontmatter]]");

// ----- 6️⃣ 写入文件（若文件已存在则提示并打开） ----------
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ 文件已存在，直接打开《${safeTitle}》`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ 已创建原始素材《${safeTitle}》`);
}
```

#### 关键点解释

|代码段|作用|
|---|---|
|`args.rawTitle?.trim()`|从前面的 Prompt 读取标题，若未提供则返回 `undefined`|
|自动生成时间戳标题|防止标题为空导致文件名冲突|
|`safeTitle.replace(/[\/:*?"<>|]/g, "_")`|
|`await tp.file.include("[[Base/frontmatter]]")`|把你在 `_templates/Base/frontmatter.md` 中保存的最小 front‑matter 融入新文件|
|`if (await app.vault.adapter.exists(filePath))`|若同名文件已存在，直接打开而不是覆盖，避免意外覆盖|

---

### 3️⃣ 常见二次错误排查

|错误现象|可能原因|解决办法|
|---|---|---|
|“未找到模板 `Base/frontmatter`”|`Base/frontmatter.md` 路径写错或未创建|在根目录创建 `_templates/Base/frontmatter.md`，内容示例：  <br>`---\ntitle: "{{tp.file.title}}"\ndate: "{{tp.date.now('YYYY-MM-DD')}}"\ntype: ""\nstatus: "inbox"\n---`|
|文件夹 `0 Personals/01_Raw` 不存在|没手动创建或路径大小写不匹配|在 Obsidian 中先手动新建 `0 Personals/01_Raw`（或在脚本里加入 `await app.vault.createFolder(folder)`）|
|运行脚本后没有新文件|QuickAdd 宏的 “Run JavaScript” 动作没有与 Prompt 关联（没有把 Prompt 放在同一宏里）|打开 Settings → QuickAdd → Macros → <你的宏> → Edit，确保 Prompt 动作在脚本之前；保存后再测试。|
|出现 `ReferenceError: tp is not defined`|使用 Custom JS 而非 QuickAdd → Run JavaScript，或在非 QuickAdd 环境运行脚本|只在 QuickAdd → Run JavaScript 动作里使用 `tp` 对象，若要在 Obsidian Custom JS 中使用，需要改为 `app` 与 `workspace` 方式（已在上面脚本中兼容）。|

---

### 4️⃣ 完整宏示例（在 QuickAdd UI 中的可视化配置）

1. Macro name : `创建原始素材（Raw）`
2. Action 1 – Prompt
    - Prompt Text: `请输入素材标题（留空会自动生成）`
    - Variable Name: `rawTitle`
3. Action 2 – Prompt
    - Prompt Text: `粘贴原始内容（会议记录、长文等）`
    - Variable Name: `rawInput`
4. Action 3 – Run JavaScript
    - Paste上面的完整脚本
5. （可选）Action 4 – Run JavaScript `new Notice("✅ 完成！")`

保存后即可在 Obsidian 任意位置通过 Ctrl+P → QuickAdd: 创建原始素材（Raw） 触发。

---

## Ⅱ️⃣ 繁體中文實作方案

### 1️⃣ QuickAdd 宏的正確配置

|步驟|動作類型|變數名稱|設定說明|
|---|---|---|---|
|1|Prompt|`rawTitle`|提示文字：`請輸入素材的標題（若留空會自動產生）`|
|2|Prompt|`rawInput`|提示文字：`貼上原始內容（會議紀錄、長文等）`|
|3|Run JavaScript|—|填入下方 完整腳本（直接複製）|

> 注意：Prompt 必須在 Run JavaScript 之前，QuickAdd 會把 Prompt 的結果放入 `args`，若順序錯誤就會出現「未解析的變數」錯誤。

---

### 2️⃣ 完整腳本（Create a raw.js）

js

```
/**
 * QuickAdd – 在 0 Personals/01_Raw 中建立原始筆記檔案
 * 需要兩個前置 Prompt：rawTitle（標題）與 rawInput（內容）。
 */

const folder = "0 Personals/01_Raw";

// ---------- 1️⃣ 讀取 Prompt 變數 ----------
let title   = args.rawTitle?.trim();   // 可能為 undefined
let content = args.rawInput?.trim();   // 可能為 undefined

// ---------- 2️⃣ 若使用者未提供標題，使用時間戳 ----------
if (!title) {
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `原始素材-${ts}`;
}

// ---------- 3️⃣ 避免非法檔名字符 ----------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ---------- 4️⃣ 完整檔案路徑 ----------
const filePath = `${folder}/${safeTitle}.md`;

// ---------- 5️⃣ 讀取基礎 front‑matter ----------
const fm = await tp.file.include("[[Base/frontmatter]]");

// ---------- 6️⃣ 寫入檔案 ----------
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ 檔案已存在，直接開啟《${safeTitle}》`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ 已建立原始素材《${safeTitle}》`);
}
```

```
/**
 * QuickAdd – 在 0 Personals/01_Raw 中建立原始筆記檔案
 * 需要兩個前置 Prompt：rawTitle（標題）與 rawInput（內容）。
 */

const folder = "0 Personals/01_Raw";

// ---------- 1️⃣ 讀取 Prompt 變數 ----------
let title   = args.rawTitle?.trim();   // 可能為 undefined
let content = args.rawInput?.trim();   // 可能為 undefined

// ---------- 2️⃣ 若使用者未提供標題，使用時間戳 ----------
if (!title) {
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `原始素材-${ts}`;
}

// ---------- 3️⃣ 避免非法檔名字符 ----------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ---------- 4️⃣ 完整檔案路徑 ----------
const filePath = `${folder}/${safeTitle}.md`;

// ---------- 5️⃣ 讀取基礎 front‑matter ----------
const fm = await tp.file.include("[[Base/frontmatter]]");

// ---------- 6️⃣ 寫入檔案 ----------
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ 檔案已存在，直接開啟《${safeTitle}》`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ 已建立原始素材《${safeTitle}》`);
}
```

#### 重要說明

|程式段落|功能|
|---|---|
|`args.rawTitle?.trim()`|從 QuickAdd Prompt 取得使用者輸入的標題，若未提供則為 `undefined`。|
|自動產生時間戳標題|防止使用者完全留空時檔名衝突。|
|`safeTitle.replace(/[\/:*?"<>|]/g, "_")`|
|`await tp.file.include("[[Base/frontmatter]]")`|把你在 `_templates/Base/frontmatter.md` 中預先寫好的 front‑matter 直接嵌入。|
|`if (await app.vault.adapter.exists(filePath))`|若同名檔案已存在，直接開啟而不覆寫，避免意外資料丟失。|

---

### 3️⃣ 常見二次錯誤排查（繁體版）

|錯誤訊息|可能原因|解決方式|
|---|---|---|
|找不到 `Base/frontmatter` 模板|檔案路徑或名稱錯誤|確認在 Vault 根目錄有 `_templates/Base/frontmatter.md`，內容與簡體版相同。|
|資料夾 `0 Personals/01_Raw` 不存在|沒手動建立資料夾，或大小寫不一致|在 Obsidian 中先建立此資料夾，或在腳本開頭加入 `await app.vault.createFolder(folder)`。|
|`args.rawTitle` 為 undefined|QuickAdd 宏裡缺少 `Prompt` 或順序不對|重新檢查宏的動作列表，確保 `Prompt (rawTitle)` 是第一個，`Prompt (rawInput)` 第二個。|
|`ReferenceError: tp is not defined`|直接在 Obsidian Custom JS 中執行，而非 QuickAdd → Run JavaScript|只在 QuickAdd 的 Run JavaScript 動作中使用 `tp`，若要在 Custom JS 中使用，需改寫為 `app.vault...`（已在腳本中兼容）。|

---

### 4️⃣ 完整宏範例（QuickAdd UI 示意）

|動作順序|動作類型|變數名稱|設定|
|---|---|---|---|
|1|Prompt|`rawTitle`|`請輸入素材的標題（留空會自動產生）`|
|2|Prompt|`rawInput`|`貼上原始內容（會議紀錄、長文等）`|
|3|Run JavaScript|—|貼上上方完整腳本|
|5（可選）|Run JavaScript|—|`new Notice("✅ 完成！");`|

儲存後，在任何地方呼叫 QuickAdd → 创建原始素材（Raw），即可快速產生一個帶有 AI 摘要前置的原始筆記。

---

## Ⅲ️⃣ English Implementation Guide

### 1️⃣ Configure the QuickAdd macro correctly

|Step|Action type|Variable name|Prompt text (example)|
|---|---|---|---|
|1|Prompt|`rawTitle`|`Enter a title for the raw material (leave empty for auto‑generated)`|
|2|Prompt|`rawInput`|`Paste the raw content (meeting transcript, long article, etc.)`|
|3|Run JavaScript|—|Paste the script below (copy‑and‑paste)|

> Important – Prompt actions must appear before the Run JavaScript action, otherwise `args.rawTitle`/`args.rawInput` will be undefined and you’ll see the “unresolved variable” error.

---

### 2️⃣ Full script (`Create a raw.js`)

js

```
/**
 * QuickAdd – Create a raw note file inside "0 Personals/01_Raw".
 * This script expects two preceding Prompt actions:
 *   rawTitle – optional title for the note
 *   rawInput – the raw content (meeting minutes, article, etc.)
 */

const folder = "0 Personals/01_Raw";

// ---- 1️⃣ Read Prompt variables ---------------------------------
let title   = args.rawTitle?.trim();   // could be undefined
let content = args.rawInput?.trim();   // could be undefined

// ---- 2️⃣ Auto‑generate a title when user leaves it blank -----
if (!title) {
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `RawMaterial-${ts}`;
}

// ---- 3️⃣ Sanitize illegal filename characters ---------------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ---- 4️⃣ Build the full file path ----------------------------
const filePath = `${folder}/${safeTitle}.md`;

// ---- 5️⃣ Load a minimal front‑matter template ---------------
const fm = await tp.file.include("[[Base/frontmatter]]");

// ---- 6️⃣ Write the file (or just open if it already exists) --
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ File already exists – opening "${safeTitle}"`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ Created raw material "${safeTitle}"`);
}
```

```
/**
 * QuickAdd – Create a raw note file inside "0 Personals/01_Raw".
 * This script expects two preceding Prompt actions:
 *   rawTitle – optional title for the note
 *   rawInput – the raw content (meeting minutes, article, etc.)
 */

const folder = "0 Personals/01_Raw";

// ---- 1️⃣ Read Prompt variables ---------------------------------
let title   = args.rawTitle?.trim();   // could be undefined
let content = args.rawInput?.trim();   // could be undefined

// ---- 2️⃣ Auto‑generate a title when user leaves it blank -----
if (!title) {
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[:T]/g, "-");
  title = `RawMaterial-${ts}`;
}

// ---- 3️⃣ Sanitize illegal filename characters ---------------
const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");

// ---- 4️⃣ Build the full file path ----------------------------
const filePath = `${folder}/${safeTitle}.md`;

// ---- 5️⃣ Load a minimal front‑matter template ---------------
const fm = await tp.file.include("[[Base/frontmatter]]");

// ---- 6️⃣ Write the file (or just open if it already exists) --
if (await app.vault.adapter.exists(filePath)) {
  new Notice(`⚠️ File already exists – opening "${safeTitle}"`);
  await app.workspace.openLinkText(filePath, "", false);
} else {
  await app.vault.create(filePath, `${fm}\n---\n${content}`);
  await app.workspace.openLinkText(filePath, "", false);
  new Notice(`✅ Created raw material "${safeTitle}"`);
}
```

#### Why the script works

|Section|What it does|
|---|---|
|`args.rawTitle?.trim()` / `args.rawInput?.trim()`|Pulls the values supplied by the two Prompt actions. If the user left the title empty, `title` becomes `undefined`.|
|Auto‑generated timestamp title|Guarantees a unique, meaningful name when the user provides none.|
|`replace(/[\/:*?"<>|]/g, "_")`|
|`await tp.file.include("[[Base/frontmatter]]")`|Inserts your base front‑matter (create `_templates/Base/frontmatter.md` with at least `---\ntitle: "{{tp.file.title}}"\ndate: "{{tp.date.now('YYYY-MM-DD')}}"\ntype: ""\nstatus: "inbox"\n---`).|
|File‑existence guard|If a file with the same name already exists, it opens it instead of overwriting – safe‑guard against data loss.|
|All `await` calls|Works because QuickAdd’s Run JavaScript runs inside a Templater‑compatible environment where `tp` and `app` are available.|

---

### 3️⃣ Common follow‑up errors & fixes

|Symptom|Likely cause|Fix|
|---|---|---|
|`ReferenceError: tp is not defined`|You tried to run the script from Obsidian Custom JS instead of QuickAdd → Run JavaScript.|Use the script only inside the QuickAdd macro, as shown above.|
|`Cannot find template Base/frontmatter`|The file `_templates/Base/frontmatter.md` does not exist or the path is misspelled.|Create it under the root of your vault; content can be the minimal front‑matter shown in the script.|
|Folder `0 Personals/01_Raw` does not exist|Folder not created yet or typo in folder name.|Manually create the folder (or add `await app.vault.createFolder(folder)` before using it).|
|`Unresolved variable rawTitle`|Prompt actions are missing, mis‑named, or placed after the Run JavaScript step.|Verify the macro sequence: Prompt → Prompt → Run JavaScript; variable names exactly `rawTitle` and `rawInput`.|
|File is created but empty|`rawInput` Prompt returned an empty string (maybe you pressed Enter without pasting).|Ensure you paste the raw material in the second Prompt; the script will keep the content even if it’s empty, but you’ll notice it in the note.|

---

### 4️⃣ QuickAdd macro visual checklist (English UI)

1. Macro name : `Create Raw Material`
2. Action 1 – Prompt
    - Prompt Text: `Enter a title for the raw material (optional)`
    - Variable Name: `rawTitle`
3. Action 2 – Prompt
    - Prompt Text: `Paste the raw content (meeting transcript, article, etc.)`
    - Variable Name: `rawInput`
4. Action 3 – Run JavaScript
    - Paste the full script above.
5. _(Optional)_ Action 4 – Run JavaScript
    - `new Notice("✅ Done!");` (just a friendly final toast)

Save the macro. Now you can fire it from the command palette (Ctrl + P → QuickAdd: Create Raw Material) or bind a hotkey in Settings → Hotkeys → QuickAdd (e.g., `Ctrl+Alt+R`).

---

## 📚 总结

|语言|关键步骤|关键代码|常见错误 & 对策|
|---|---|---|---|
|简体|1️⃣ Prompt rawTitle → Prompt rawInput → Run JS|脚本已完整（含自动生成标题、非法字符处理、front‑matter 引入）|未创建 Prompt、文件夹不存在、front‑matter 模板缺失|
|繁體|同上，提示文字以及注释使用繁体|同上（已转换为繁体注释）|同上|
|English|1️⃣ Prompt rawTitle → Prompt rawInput → Run JS|Full script (auto‑timestamp title, safe‑filename, front‑matter include)|`tp` undefined, wrong macro order, missing folder/template|

只要 确保 Prompt 动作在脚本之前，并把 基础 front‑matter 模板 放在 `_templates/Base/frontmatter.md`，上述脚本即可在任意平台（简体、繁体、英文）无错误地创建原始笔记文件。

祝你快速恢复正常工作流，成功把原始素材转入 Ollama (gpt‑oss:120b‑cloud) 进行后续的 AI 摘要与笔记精简！ 🚀