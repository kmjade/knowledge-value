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

## 📋 上下文信息 / Context Information

> [!info] 当前文件 / Current File
> - **路径**: `<% tp.file.path %>`
> - **标题**: `<% tp.file.title %>`
> - **创建时间**: `<% tp.file.creation_date() %>`

<%*
// 获取文件上下文
const ctx = await tp.user.getOpenCodeContext(tp);
if (ctx) {
-%>

### 🏷️ 标签 / Tags
<% ctx.tags.map(t => `\`${t}\``).join(', ') %>

### 📝 前置元数据 / Frontmatter
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

### 📊 内容统计 / Content Statistics
| 指标 / Metric | 值 / Value |
|---------------|-----------|
| **字符数 / Characters** | `<% ctx.charCount %>` |
| **段落数 / Paragraphs** | `<% ctx.content.split('\n\n').length %>` |
| **链接数 / Links** | `<% ctx.links.length %>` |
| **别名数 / Aliases** | `<% ctx.aliases.length %>` |

### 📄 文件预览 / File Preview
<details>
<summary>点击查看完整内容 / Click to view full content</summary>

```text
<% ctx.content.substring(0, 1000) %><% ctx.content.length > 1000 ? '\n\n...(内容已截断，完整内容请查看原文件)' : '' %>
```
</details>

<%
} else {
-%>
> [!warning] 无法获取文件上下文 / Cannot get file context
> 请确保在有效文件中运行此模板 / Please ensure running this template in a valid file
<%
}
-%>

---

## 🤖 模型选择 / Model Selection

<%*
// 检查本地模型状态
const modelStatus = await tp.user.checkLocalModels();
const task = await tp.user.selectTaskType(tp);

if (modelStatus.status === 'unavailable') {
-%>

> [!danger] Ollama服务不可用 / Ollama Service Unavailable
> 
> **错误信息**: `<% modelStatus.error %>`
> 
> **解决方法**:
> 1. 启动Ollama服务: `ollama serve`
> 2. 检查端口11434是否被占用
> 3. 验证Ollama安装: `ollama --version`

<%
} else {
    // 显示可用模型
    const availableModels = modelStatus.models.map(m => m.name);
    const selectedModel = await tp.system.suggester(
        availableModels,
        availableModels,
        false,
        '选择本地模型 / Select local model:'
    );
    
    const recommendedModel = tp.user.recommendModel(task.type, task.requiresTools);
    const modelCapabilities = tp.user.getModelCapabilities(selectedModel);
-%>

### 🎯 任务信息 / Task Information
| 项目 / Item | 值 / Value |
|-----------|-----------|
| **任务类型 / Task Type** | `<% task.name %>` |
| **需要工具使用 / Requires Tools** | `<% task.requiresTools ? '是 ✅' : '否 ❌' %>` |
| **推荐模型 / Recommended Model** | `<% recommendedModel %>` |
| **选择模型 / Selected Model** | `<% selectedModel %>` |

### 🔍 模型能力 / Model Capabilities
<%*
const capabilities = [
    { name: '工具调用 / Tool Usage', value: modelCapabilities.tools },
    { name: '上下文窗口 / Context Window', value: modelCapabilities.context + ' tokens' },
    { name: '质量等级 / Quality Level', value: modelCapabilities.quality }
];
-%>
<% capabilities.forEach(cap => { -%>
- **<% cap.name %>**: `<% cap.value ? '✅ ' + cap.value : '❌ 不支持' %>`
<% }); -%>

<%*
if (task.requiresTools && !modelCapabilities.tools) {
-%>
> [!warning] ⚠️ 模型不支持工具调用 / Model Doesn't Support Tools
> 当前选择的模型不支持文件修改操作。请更换为支持工具调用的模型：
> - **qwen2.5-coder:7b** - 推荐选择
> - **qwen2.5-coder:14b** - 高性能选择
> - **deepseek-coder:6.7b** - 备选方案

<%
}
-%>

---
## 💬 指令输入 / Instructions

<%*
// 用户指令输入
const userPrompt = await tp.system.prompt(
    "请输入具体指令（支持中文/英文） / Enter your instructions (Chinese/English supported):",
    task.type === 'generation' ? "生成[具体描述]..." : "分析/处理[具体任务]...",
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
<summary>点击复制命令 / Click to copy command</summary>

```bash
<% command %>
```

**命令解析 / Command Analysis**:
<%*
const commandParts = [
    { name: '基础命令', value: 'opencode run' },
    { name: '任务描述', value: `"${userPrompt}"` },
    { name: '模型选择', value: `--model ollama/${selectedModel}` }
];

if (task.type === 'generation') {
    commandParts.push({ name: '思考模式', value: '--no-think' });
}

if (modelCapabilities.context > 16000) {
    commandParts.push({ name: '超时时间', value: '--timeout 300' });
}
-%>
<% commandParts.forEach(part => { -%>
- **<% part.name %>**: `<% part.value %>`
<% }); -%>
</details>

---

## ⚡ 性能预期 / Performance Expectations

<%*
// 根据模型和任务估算性能
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

| 模型 / Model | 预期时间 / Expected Time | 质量 / Quality | 适用场景 / Use Case |
|---------------|------------------------|---------------|-------------------|
| **<% selectedModel %>** | ~<% estimatedTime %>秒 | `<% modelCapabilities.quality %>` | `<% task.type.includes('generation') ? '代码生成' : task.type.includes('review') ? '代码审查' : '分析任务' %>` |

> [!tip] 💡 性能提示 / Performance Tips
> - **首次运行**可能较慢（模型加载时间）
> - **大上下文**任务需要更多时间
> - **工具调用**会额外增加处理时间
> - **GPU使用**会显著提升速度

---

## 📤 执行步骤 / Execution Steps

> [!important] 本地执行步骤 / Local Execution Steps
> 
> ### 🔧 准备检查 / Preparation Check
> - [ ] **Ollama服务运行**: `ollama serve`
> - [ ] **模型可用**: `ollama list | grep <% selectedModel.split(':')[0] %>`
> - [ ] **端口可用**: `curl -s http://localhost:11434/api/tags`
> - [ ] **内存充足**: `free -h` 或检查活动监视器
> 
> ### 🚀 执行命令 / Execute Command
> 1. 复制上面生成的命令 / Copy the command above
> 2. 在终端中执行 / Run in terminal
> 3. 等待处理完成 / Wait for completion
> 4. 观察输出结果 / Monitor output
> 
> ### 📋 结果记录 / Record Results
> - [ ] 成功完成 / Successfully completed
> - [ ] 部分成功 / Partially successful  
> - [ ] 需要重试 / Need to retry

---

## 📊 输出结果 / Output Results

> [!note] 📤 结果粘贴区 / Result Paste Area
> 在此粘贴OpenCode的返回结果 / Paste OpenCode response here

<details>
<summary>结果模板 / Result Template</summary>

### ✅ 执行状态 / Execution Status
- **开始时间**: 
- **结束时间**: 
- **总耗时**: 
- **成功度**: 

### 📝 AI输出 / AI Output
```
[在此粘贴OpenCode的返回结果 / Paste OpenCode response here]
```

### 🔍 结果分析 / Result Analysis
- **输出质量**: 
- **是否满足需求**: 
- **需要改进的地方**: 

### 🔄 后续行动 / Next Actions
- [ ] 需要进一步修改
- [ ] 生成相关文档
- [ ] 进行测试验证
- [ ] 集成到项目中

</details>

---

## 🔧 故障排除 / Troubleshooting

<details>
<summary>常见问题及解决方案 / Common Issues & Solutions</summary>

### ❌ 问题1: 模型未找到
**症状**: `Error: model not found`
**解决方案**:
```bash
# 检查可用模型
ollama list

# 下载缺失模型
ollama pull <% selectedModel %>

# 验证下载
ollama show <% selectedModel %>
```

### ❌ 问题2: 连接Ollama失败
**症状**: `Error: connection refused`
**解决方案**:
```bash
# 重启Ollama服务
pkill ollama && ollama serve &

# 检查端口占用
netstat -an | grep 11434

# 测试连接
curl http://localhost:11434/api/tags
```

### ❌ 问题3: 内存不足
**症状**: `Error: out of memory` 或系统卡顿
**解决方案**:
- 使用更小的模型（如qwen2.5:3b）
- 减少并发任务
- 关闭其他占用内存的程序
- 重启系统清理内存

### ❌ 问题4: 响应过慢
**症状**: 处理时间过长（>5分钟）
**解决方案**:
- 检查GPU是否被使用：`nvidia-smi`
- 使用量化模型
- 减少上下文窗口大小
- 使用更快的模型

</details>

---

## 🔗 相关资源 / Related Resources

### 📖 文档链接 / Documentation Links
- **[OpenCode官方文档](https://opencode.ai/docs)** - 完整使用指南
- **[Ollama模型库](https://ollama.ai/library)** - 可用模型列表
- **[模型配置指南](opencode.json)** - 配置文件说明

### 🛠️ 快速命令 / Quick Commands
```bash
# 检查模型状态
ollama list

# 查看模型信息
ollama show <% selectedModel %>

# 测试OpenCode连接
opencode --version

# 查看可用模型
opencode models
```

### 📚 学习资源 / Learning Resources
- **[本地AI教程](https://github.com/imagewize/ollama-opencode-setup)** - 详细设置教程
- **[模型性能对比](https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard)** - 模型排行榜
- **[OpenCode社区](https://opencode.ai/discord)** - 用户交流社区

---

## 📝 更新日志 / Changelog

| 版本 / Version | 日期 / Date | 更新内容 / Changes |
|---------------|-------------|-------------------|
| v1.0.0 | 2026-01-15 | 初始版本 / Initial version |

---

> [!success] 🎉 模板使用成功 / Template Used Successfully
> 您已成功创建OpenCode本地请求文档！现在可以：
> 1. 复制上面的OpenCode命令
> 2. 在终端中执行
> 3. 将结果粘贴到"输出结果"区域
> 4. 根据结果进行后续操作

*此模板基于OpenCode + Ollama最佳实践开发 / This template is based on OpenCode + Ollama best practices*