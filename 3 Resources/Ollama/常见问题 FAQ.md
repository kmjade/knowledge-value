---
title: 常见问题 FAQ
tags: [ollama, faq]
---

# 常见问题 FAQ

## 1. Ollama 为什么无法启动？
- **检查端口冲突**：默认 11434 端口是否被占用？使用 `netstat -ano | find "11434"` 查看。
- **权限问题**：在 Windows 上以管理员身份运行终端。
- **配置错误**：确认 `~/.oll模型/config.yaml` 中的 `host`/`port` 正确。

## 2. 模型下载很慢或中断？
- **网络代理**：检查是否有全局代理，必要时设置 `HTTPS_PROXY` 环境变量。
- **镜像源**：官方提供 `OLLAMA_MIRROR` 环境变量，可指向国内镜像（如 `https://ollama-mirror.com`）。
- **磁盘空间**：确保有足够的可用空间（模型大小通常在数 GB）。

## 3. 调用 API 返回错误 500？
- **模型名称错误**：确认请求体中的 `model` 与已下载模型列表一致（`ollama list`）。
- **JSON 格式**：使用有效的 JSON 且字段名正确（`model`, `prompt`, `stream` 等）。
- **日志检查**：查看 `ollama serve` 控制台输出，定位具体异常信息。

## 4. 如何在 Obsidian 中切换本地模型？
1. 打开 **AI Assistant** 插件设置。
2. 在 **模型列表** 中选择已下载的模型（如 `llama2`）。
3. 保存设置并重启插件。

## 5. 本地模型卡顿，响应慢？
- **CPU 限制**：确认未对进程做 CPU 限额。可以通过任务管理器提升优先级。
- **GPU 加速**：若 GPU 支持，安装对应的驱动并在 `config.yaml` 中启用 `gpu: true`。
- **模型大小**：使用更小的模型（2‑7 B）或开启 **量化**（`quantize: true`）以降低内存占用。

## 6. 如何导出模型的日志或推理统计？
- Ollama 提供 `ollama stats` 命令，可实时查看当前模型的 **tokens/秒、内存使用** 等信息。
- 将输出重定向到文件：`ollama stats > stats.log`，随后在 Obsidian 中使用 `[[stats.log]]` 进行分析。

> 📌 **提示**：将常见问题记录到此页面后，可在 Obsidian 中使用 **搜索** 或 **Dataview** 进行快速检索。
