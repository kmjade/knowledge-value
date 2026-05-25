---
tags:
  - opencode
  - ollama
  - local-ai
  - prompt
  - request
created: <% tp.file.creation_date() %>
---

# 🦙 OpenCode + Ollama 本地请求 / Local Request

## 📋 上下文資訊 / Context Information

> [!info] 当前檔案 / Current File
> - **路徑**: `<% tp.file.path %>`
> - **标题**: `<% tp.file.title %>`
> - **創建時間**: `<% tp.file.creation_date() %>`

<%*
// 获取檔案上下文
const ctx = await tp.user.getOpenCodeContext(tp);
if (ctx) {
-%>

### 🏷️ 標籤 / Tags
<% ctx.tags.map(t => `\`${t}\``).join(', ') %>

### 📝 前置元數據 / Frontmatter
```
<%*
    Object.entries(ctx.frontmatter).forEach(([key, value]) => {
        if (key !== 'tags') {
-%>
<% key %>: <% value %>
<%
        }
    });
-%>
```

### 📊 內容統計 / Content Statistics
| 指标 / Metric | 值 / Value |
|---------------|-----------|
| **字符数 / Characters** | `<% ctx.charCount %>` |
| **段落数 / Paragraphs** | `<% ctx.content.split('\n\n').length %>` |
| **連結数 / Links** | `<% ctx.links.length %>` |
| **别名数 / Aliases** | `<% ctx.aliases.length %>` |

### 📄 檔案預覽 / File Preview
<details>
# 查看

```text
# 查看
```
</details>

<%
} else {
-%>
> [!warning] 無法获取檔案上下文 / Cannot get file context
> 请确保在有效檔案中運行此模板 / Please ensure running this template in a valid file
<%
}
-%>

---

## 🤖 模型選擇 / Model Selection

<%*
// 檢查本地模型狀態
const modelStatus = await tp.user.checkLocalModels();
const task = await tp.user.selectTaskType(tp);

if (modelStatus.status === 'unavailable') {
-%>

> [!danger] Ollama服务不可用 / Ollama Service Unavailable
> 
> **错误資訊**: `<% modelStatus.error %>`
> 
# 方法
> 1. 啟動Ollama服务: `ollama serve`
> 2. 檢查端口11434是否被占用
> 3. 驗證Ollama安裝: `ollama --version`

<%
} else {
# 顯示
    const availableModels = modelStatus.models.map(m => m.name);
    const selectedModel = await tp.system.suggester(
        availableModels,
        availableModels,
        false,
        '選擇本地模型 / Select local model:'
    );
    
    const recommendedModel = tp.user.recommendModel(task.type, task.requiresTools);
    const modelCapabilities = tp.user.getModelCapabilities(selectedModel);
-%>

### 🎯 任務資訊 / Task Information
| 專案 / Item | 值 / Value |
|-----------|-----------|
| **任務类型 / Task Type** | `<% task.name %>` |
| **需要工具使用 / Requires Tools** | `<% task.requiresTools ? '是 ✅' : '否 ❌' %>` |
| **推荐模型 / Recommended Model** | `<% recommendedModel %>` |
| **選擇模型 / Selected Model** | `<% selectedModel %>` |

### 🔍 模型能力 / Model Capabilities
<%*
const capabilities = [
    { name: '工具調用 / Tool Usage', value: modelCapabilities.tools },
    { name: '上下文視窗 / Context Window', value: modelCapabilities.context + ' tokens' },
    { name: '品質等级 / Quality Level', value: modelCapabilities.quality }
];
-%>
<% capabilities.forEach(cap => { -%>
- **<% cap.name %>**: `<% cap.value ? '✅ ' + cap.value : '❌ 不支持' %>`
<% }); -%>

<%*
if (task.requiresTools && !modelCapabilities.tools) {
-%>
> [!warning] ⚠️ 模型不支持工具調用 / Model Doesn't Support Tools
# 修改
> - **qwen2.5-coder:7b** - 推荐選擇
> - **qwen2.5-coder:14b** - 高效能選擇
> - **deepseek-coder:6.7b** - 备选方案

<%
}
-%>

---
## 💬 指令輸入 / Instructions

<%*
// 使用者指令輸入
const userPrompt = await tp.system.prompt(
    "请輸入具体指令（支持中文/英文） / Enter your instructions (Chinese/English supported):",
# 分析
    true
);

const command = tp.user.generateOpenCodeCommand(userPrompt, selectedModel, {
    noThink: task.type === 'generation' || task.type === 'refactoring',
    timeout: modelCapabilities.context > 16000 ? 300 : 120
});
-%>

### 📝 您的指令 / Your Instructions
```text
<% userPrompt %>
```

### 🚀 OpenCode 命令 / OpenCode Command
<details>
<summary>点击複製命令 / Click to copy command</summary>

```bash
<% command %>
```

**命令解析 / Command Analysis**:
<%*
const commandParts = [
    { name: '基礎命令', value: 'opencode run' },
    { name: '任務描述', value: `"${userPrompt}"` },
    { name: '模型選擇', value: `--model ollama/${selectedModel}` }
];

if (task.type === 'generation') {
    commandParts.push({ name: '思考模式', value: '--no-think' });
}

if (modelCapabilities.context > 16000) {
    commandParts.push({ name: '超时時間', value: '--timeout 300' });
}
-%>
<% commandParts.forEach(part => { -%>
- **<% part.name %>**: `<% part.value %>`
<% }); -%>
</details>

---

## ⚡ 效能预期 / Performance Expectations

<%*
// 根据模型和任務估算效能
const performanceMap = {
    'qwen2.5-coder:14b': { min: '8-15', avg: '12', max: '20' },
    'qwen2.5-coder:7b': { min: '15-25', avg: '20', max: '35' },
    'qwen2.5:7b': { min: '20-35', avg: '28', max: '45' },
    'qwen2.5:3b': { min: '30-60', avg: '45', max: '80' },
    'mistral-nemo:12b': { min: '15-30', avg: '22', max: '40' }
};

const perf = performanceMap[selectedModel] || { min: '10-20', avg: '15', max: '30' };
const estimatedTime = task.requiresTools ? (parseInt(perf.avg) * 1.5) : perf.avg;
-%>

| 模型 / Model | 预期時間 / Expected Time | 品質 / Quality | 适用場景 / Use Case |
|---------------|------------------------|---------------|-------------------|
# 分析

> [!tip] 💡 效能提示 / Performance Tips
> - **首次運行**可能较慢（模型加载時間）
> - **大上下文**任務需要更多時間
> - **工具調用**会额外增加處理時間
> - **GPU使用**会显著提升速度

---

## 📤 执行步骤 / Execution Steps

> [!important] 本地执行步骤 / Local Execution Steps
> 
> ### 🔧 准备檢查 / Preparation Check
> - [ ] **Ollama服务運行**: `ollama serve`
> - [ ] **模型可用**: `ollama list | grep <% selectedModel.split(':')[0] %>`
> - [ ] **端口可用**: `curl -s http://localhost:11434/api/tags`
> - [ ] **記憶體充足**: `free -h` 或檢查活动监视器
> 
> ### 🚀 执行命令 / Execute Command
> 1. 複製上面生成的命令 / Copy the command above
> 2. 在终端中执行 / Run in terminal
> 3. 等待處理完成 / Wait for completion
> 4. 观察輸出結果 / Monitor output
> 
> ### 📋 結果記錄 / Record Results
> - [ ] 成功完成 / Successfully completed
> - [ ] 部分成功 / Partially successful  
> - [ ] 需要重试 / Need to retry

---

## 📊 輸出結果 / Output Results

> [!note] 📤 結果貼上区 / Result Paste Area
> 在此貼上OpenCode的返回結果 / Paste OpenCode response here

<details>
<summary>結果模板 / Result Template</summary>

### ✅ 执行狀態 / Execution Status
- **開始時間**: 
- **結束時間**: 
- **总耗时**: 
- **成功度**: 

### 📝 AI輸出 / AI Output
```
[在此貼上OpenCode的返回結果 / Paste OpenCode response here]
```

# 分析
- **輸出品質**: 
- **是否满足需求**: 
- **需要改进的地方**: 

### 🔄 後續行动 / Next Actions
# 修改
- [ ] 生成相關文檔
- [ ] 進行測試驗證
- [ ] 整合到專案中

</details>

---

## 🔧 故障排除 / Troubleshooting

<details>
<summary>常见問題及解決方案 / Common Issues & Solutions</summary>

### ❌ 問題1: 模型未找到
**症状**: `Error: model not found`
**解決方案**:
```bash
# 檢查可用模型
ollama list

# 下載缺失模型
ollama pull <% selectedModel %>

# 驗證下載
ollama show <% selectedModel %>
```

### ❌ 問題2: 連接Ollama失败
**症状**: `Error: connection refused`
**解決方案**:
```bash
# 重启Ollama服务
pkill ollama && ollama serve &

# 檢查端口占用
netstat -an | grep 11434

# 測試連接
curl http://localhost:11434/api/tags
```

### ❌ 問題3: 記憶體不足
**症状**: `Error: out of memory` 或系統卡顿
**解決方案**:
- 使用更小的模型（如qwen2.5:3b）
- 减少并发任務
- 關閉其他占用記憶體的程式
- 重启系統清理記憶體

### ❌ 問題4: 響應过慢
**症状**: 處理時間过长（>5分钟）
**解決方案**:
- 檢查GPU是否被使用：`nvidia-smi`
- 使用量化模型
- 减少上下文視窗大小
- 使用更快的模型

</details>

---

## 🔗 相關資源 / Related Resources

### 📖 文檔連結 / Documentation Links
# 指南
- **[Ollama模型库](https://ollama.ai/library)** - 可用模型列表
# 指南

### 🛠️ 快速命令 / Quick Commands
```bash
# 檢查模型狀態
ollama list

# 查看
ollama show <% selectedModel %>

# 測試OpenCode連接
opencode --version

# 查看
opencode models
```

### 📚 學習資源 / Learning Resources
# 教程
- **[模型效能對比](https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard)** - 模型排行榜
- **[OpenCode社區](https://opencode.ai/discord)** - 使用者交流社區

---

# 更新

# 更新
|---------------|-------------|-------------------|
# 版本

---

> [!success] 🎉 模板使用成功 / Template Used Successfully
> 您已成功創建OpenCode本地请求文檔！现在可以：
> 1. 複製上面的OpenCode命令
> 2. 在终端中执行
> 3. 将結果貼上到"輸出結果"区域
> 4. 根据結果進行後續操作

*此模板基于OpenCode + Ollama最佳實踐開發 / This template is based on OpenCode + Ollama best practices*