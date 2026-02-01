# OpenCode 模板集成说明

# 文檔

## 概述

本集成方案实现了从 Obsidian 中一键调用 OpenCode 本地模型，无需手动复制命令到终端。

# 檔案

```
_templates/
├── opencode/
│   ├── 一键调用.md          # 完整功能模板
│   ├── 快速调用.md          # 简化模板
# 檔案
└── scripts/
    └── opencode.js          # OpenCode 执行核心脚本
```

# 安裝

# 配置

在 Obsidian 中：

# 設置
# 設置
# 系統
# 檔案
# 配置

# 配置

```bash
# 檔案
# .obsidian/plugins/templater-obsidian/data.json
# 应包含:
# "enable_system_commands": true
# "user_scripts_folder": "_templates/scripts"
```

### 3. 确保环境准备就绪

```bash
# 检查 Ollama 服务
curl http://localhost:11434/api/tags

# 检查 OpenCode
opencode --version

# 检查可用模型
ollama list
```

# 方法

# 方法

# 筆記
# 配置
3. 选择 `OpenCode: 一键调用` 模板
4. 按照提示选择：
# 分析
   - 本地模型
# 檔案
# 輸入
# 筆記

# 方法

# 查詢

1. 打开 Templater 命令面板
2. 选择 `OpenCode: 快速调用` 模板
# 輸入
4. 使用默认模型 (qwen2.5:7b) 执行

# 方法

如果需要在终端中手动执行：

1. 选择相应模板
2. 完成选择流程
3. 将生成的命令复制到终端执行

## 可用功能

### 支持的任务类型

| 类型 | 图标 | 说明 | 推荐模型 |
|------|------|------|----------|
# 分析
| 代码生成 | ✏️ | 根据需求生成新代码 | qwen2.5-coder:7b |
# 優化
# 文檔
| 代码审查 | 🔍 | 审查代码质量 | mistral-nemo:12b |
# 除錯
| 翻译 | 🌐 | 在不同语言间翻译 | qwen2.5:7b |
| 总结 | 📋 | 总结长文本内容 | qwen2.5:3b |
| 问答 | 💡 | 回答问题、提供解释 | qwen2.5:7b |
| 创意写作 | 🎨 | 创作文本内容 | qwen2.5:14b |

### 推荐模型

# 場景
|------|------|------|----------|
| qwen2.5:3b | ~2GB | 最快、最轻 | 快速问答、总结 |
# 效能
# 分析
# 除錯
| qwen2.5-coder:14b | ~8GB | 高级编程 | 复杂重构、代码审查 |

## 故障排除

### 问题 1: "child_process 模块不可用"

# 系統

**解决方案**:
# 設置
2. 勾选 `Enable System Commands`
3. 重启 Obsidian

### 问题 2: "Ollama 服务不可用"

**原因**: Ollama 未运行或端口被占用

**解决方案**:
```bash
# 启动 Ollama 服务
ollama serve

# 检查端口
netstat -an | grep 11434  # Linux/Mac
netstat -an | findstr 11434  # Windows

# 測試
curl http://localhost:11434/api/tags
```

### 问题 3: "模型未找到"

# 下載

**解决方案**:
```bash
# 查看
ollama list

# 下載
ollama pull qwen2.5:7b
ollama pull qwen2.5-coder:7b
```

### 问题 4: "执行超时"

**原因**: 任务太复杂或模型太大

**解决方案**:
1. 使用更小的模型（如 qwen2.5:3b）
# 輸入
# 修改

# 輸出

# 輸出

**解决方案**:
1. 在 `opencode.js` 中增加 `maxBuffer` 值
2. 分块处理任务
# 檔案

# 配置

# 修改

# 編輯

```javascript
const OPENCODE_CONFIG = {
    defaultModel: 'qwen2.5:7b',
    ollamaEndpoint: 'http://localhost:11434',
# 修改
    verbose: true
};
```

# 新增

# 編輯

```javascript
// 使用自定义模型
<% await tp.user.quickExecute(tp, 'generation', 'custom-model-name') %>
```

### 禁用详细日志

# 編輯

```javascript
const OPENCODE_CONFIG = {
    // ...
# 設置
};
```

# 設置

# 設置

# 設置
2. 找到 `Keyboard Shortcuts` 部分
# 設置

# 資源

# 文檔
- [Ollama 模型库](https://ollama.ai/library)
# 文檔
# 指南

# 更新

# 更新
|------|------|----------|
# 版本

---

# 文檔
