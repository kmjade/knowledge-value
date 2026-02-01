# OpenCode 模板集成说明

> OpenCode Templater 模板集成文档

## 概述

本集成方案实现了从 Obsidian 中一键调用 OpenCode 本地模型，无需手动复制命令到终端。

## 文件结构

```
_templates/
├── opencode/
│   ├── 一键调用.md          # 完整功能模板
│   ├── 快速调用.md          # 简化模板
│   └── README.md            # 本文件
└── scripts/
    └── opencode.js          # OpenCode 执行核心脚本
```

## 安装步骤

### 1. 配置 Templater 插件

在 Obsidian 中：

1. 进入 `设置 → 社区插件 → Templater`
2. 启用以下设置：
   - **Enable System Commands** (启用系统命令): `true`
   - **User Scripts Folder** (用户脚本文件夹): `_templates/scripts`
3. 重启 Obsidian 使配置生效

### 2. 验证配置

```bash
# 检查 Templater 配置文件
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

## 使用方法

### 方法一：一键调用（推荐）

1. 在 Obsidian 中打开或创建一个笔记
2. 按 `Ctrl+E` (或配置的快捷键) 打开 Templater 命令面板
3. 选择 `OpenCode: 一键调用` 模板
4. 按照提示选择：
   - 任务类型（代码分析、生成、重构等）
   - 本地模型
   - 是否使用当前文件内容作为上下文
   - 输入您的指令
5. 等待执行完成，结果自动显示在笔记中

### 方法二：快速调用

适用于不需要选择模型和任务类型的快速查询：

1. 打开 Templater 命令面板
2. 选择 `OpenCode: 快速调用` 模板
3. 直接输入指令
4. 使用默认模型 (qwen2.5:7b) 执行

### 方法三：仅生成命令

如果需要在终端中手动执行：

1. 选择相应模板
2. 完成选择流程
3. 将生成的命令复制到终端执行

## 可用功能

### 支持的任务类型

| 类型 | 图标 | 说明 | 推荐模型 |
|------|------|------|----------|
| 代码分析 | 🔍 | 分析代码结构、查找问题 | qwen2.5:7b |
| 代码生成 | ✏️ | 根据需求生成新代码 | qwen2.5-coder:7b |
| 代码重构 | 🛠️ | 优化和改进现有代码 | qwen2.5-coder:14b |
| 文档生成 | 📝 | 生成代码文档和注释 | qwen2.5:7b |
| 代码审查 | 🔍 | 审查代码质量 | mistral-nemo:12b |
| 调试辅助 | 🐛 | 帮助定位和修复 bug | qwen2.5-coder:7b |
| 翻译 | 🌐 | 在不同语言间翻译 | qwen2.5:7b |
| 总结 | 📋 | 总结长文本内容 | qwen2.5:3b |
| 问答 | 💡 | 回答问题、提供解释 | qwen2.5:7b |
| 创意写作 | 🎨 | 创作文本内容 | qwen2.5:14b |

### 推荐模型

| 模型 | 大小 | 特点 | 适用场景 |
|------|------|------|----------|
| qwen2.5:3b | ~2GB | 最快、最轻 | 快速问答、总结 |
| qwen2.5:7b | ~4GB | 平衡性能 | 日常任务、通用 |
| qwen2.5:14b | ~8GB | 高质量 | 复杂任务、深度分析 |
| qwen2.5-coder:7b | ~4GB | 编程专用 | 代码生成、调试 |
| qwen2.5-coder:14b | ~8GB | 高级编程 | 复杂重构、代码审查 |

## 故障排除

### 问题 1: "child_process 模块不可用"

**原因**: Templater 未启用系统命令

**解决方案**:
1. 打开 Templater 插件设置
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

# 测试连接
curl http://localhost:11434/api/tags
```

### 问题 3: "模型未找到"

**原因**: 指定的模型未下载

**解决方案**:
```bash
# 查看可用模型
ollama list

# 下载缺失的模型
ollama pull qwen2.5:7b
ollama pull qwen2.5-coder:7b
```

### 问题 4: "执行超时"

**原因**: 任务太复杂或模型太大

**解决方案**:
1. 使用更小的模型（如 qwen2.5:3b）
2. 减少输入内容长度
3. 修改脚本中的 `commandTimeout` 参数

### 问题 5: 输出被截断

**原因**: 输出超过命令缓冲区大小

**解决方案**:
1. 在 `opencode.js` 中增加 `maxBuffer` 值
2. 分块处理任务
3. 使用输出文件模式

## 高级配置

### 修改默认超时时间

编辑 `_templates/scripts/opencode.js`:

```javascript
const OPENCODE_CONFIG = {
    defaultModel: 'qwen2.5:7b',
    ollamaEndpoint: 'http://localhost:11434',
    commandTimeout: 300000,  // 修改此值（毫秒）
    verbose: true
};
```

### 添加自定义模型预设

编辑 `_templates/opencode/快速调用.md`:

```javascript
// 使用自定义模型
<% await tp.user.quickExecute(tp, 'generation', 'custom-model-name') %>
```

### 禁用详细日志

编辑 `_templates/scripts/opencode.js`:

```javascript
const OPENCODE_CONFIG = {
    // ...
    verbose: false  // 设置为 false 禁用日志
};
```

## 快捷键设置

可以为模板设置快捷键以便快速访问：

1. 打开 Templater 插件设置
2. 找到 `Keyboard Shortcuts` 部分
3. 为 `OpenCode: 一键调用` 设置快捷键（如 `Ctrl+Shift+O`）

## 相关资源

- [OpenCode 官方文档](https://opencode.ai/docs)
- [Ollama 模型库](https://ollama.ai/library)
- [Templater 插件文档](https://silentvoid13.github.io/Templater/)
- [[OpenCode本地模型集成指南]] - OpenCode 集成完整指南

## 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2026-01-30 | 初始版本，实现一键调用功能 |

---

*如有问题或建议，请参考故障排除部分或查阅相关文档。*
