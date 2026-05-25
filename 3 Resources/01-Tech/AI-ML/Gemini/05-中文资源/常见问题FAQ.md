---
title: 常见问题 FAQ
aliases:
  - Gemini FAQ
  - Gemini 常见问题
tags:
  - #topic/gemini
  - #type/faq
created: 2026-05-25
updated: 2026-05-25
---

# 常见问题 FAQ

## 访问相关

### Q: 国内如何访问 Gemini？

**A:** 有三种主要方式：
1. 使用镜像站（推荐）：[xsimplechat.com](https://xsimplechat.com)
2. 使用 API：在国内可直接调用
3. 使用代理：访问官网

详见 [[国内访问指南]]

### Q: 镜像站打不开怎么办？

**A:** 尝试以下步骤：
1. 切换其他镜像站
2. 清除浏览器缓存
3. 检查网络连接
4. 尝试其他浏览器

### Q: 需要付费吗？

**A:** Gemini 提供免费层：
- CLI：60次/分钟，1000次/天
- API：100次/天（使用 API Key）
- 付费可获取更高配额

---

## CLI 相关

### Q: 如何安装 Gemini CLI？

**A:** 三种安装方式：

```bash
# 方式一：npx（无需安装）
npx https://github.com/google-gemini/gemini-cli

# 方式二：npm 全局安装
npm install -g @google/gemini-cli

# 方式三：Homebrew（macOS/Linux）
brew install gemini-cli
```

详见 [[../02-CLI工具/安装与配置|安装与配置]]

### Q: CLI 安装失败怎么办？

**A:** 常见解决方案：

```bash
# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 清除缓存
npm cache clean --force

# 重新安装
npm install -g @google/gemini-cli
```

### Q: 如何在 CLI 中使用 API Key？

**A:**

```bash
# 设置环境变量
export GEMINI_API_KEY=your-api-key

# 启动 CLI
gemini
```

---

## API 相关

### Q: 如何获取 API Key？

**A:**
1. 访问 [AI Studio](https://aistudio.google.com/apikey)
2. 点击「Create API Key」
3. 选择或创建项目
4. 复制生成的 Key

### Q: API 调用报错怎么办？

**A:** 常见错误及解决方案：

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| 400 Bad Request | 请求格式错误 | 检查请求参数 |
| 401 Unauthorized | API Key 无效 | 检查 Key 是否正确 |
| 429 Too Many Requests | 配额超限 | 等待或升级配额 |
| 500 Internal Error | 服务器错误 | 稍后重试 |

### Q: 如何处理配额超限？

**A:**
1. 等待配额重置
2. 使用重试机制
3. 申请提升配额
4. 升级到付费账户

```python
from google.api_core import retry
from google.api_core.exceptions import ResourceExhausted

# 添加重试
retry_policy = {"retry": retry.Retry(maximum=10.0)}
```

---

## 模型相关

### Q: Gemini 3 Pro 和 2.5 Pro 有什么区别？

**A:** 主要区别：

| 特性 | Gemini 3 Pro | Gemini 2.5 Pro |
|------|--------------|----------------|
| 推理能力 | 卓越（+25-30%） | 优秀 |
| 响应速度 | 更快 | 较快 |
| 发布时间 | 2025年11月 | 2025年3月 |

详见 [[../03-模型能力/模型版本对比|模型版本对比]]

### Q: 应该选择哪个模型？

**A:**
- **Gemini 3 Pro**：需要最强推理能力
- **Gemini 2.5 Pro**：平衡性能和成本
- **Gemini 2.5 Flash**：快速响应，低成本

### Q: 支持哪些语言？

**A:** 支持 24+ 种语言，包括：
- 中文（简体/繁体）
- 英语
- 日语
- 韩语
- 等等

---

## 功能相关

### Q: 支持图片分析吗？

**A:** 支持。可以：
- 描述图片内容
- OCR 提取文字
- 分析图表
- 识别物体

详见 [[../03-模型能力/多模态能力|多模态能力]]

### Q: 支持视频分析吗？

**A:** 支持。可以：
- 上传视频文件
- 总结视频内容
- 分析关键事件
- 提取时间线

### Q: 上下文窗口有多大？

**A:** Gemini 2.5 Pro/3 Pro 支持 **100万 tokens**，可以处理：
- 超长文档
- 完整代码库
- 长时间对话

---

## 其他问题

### Q: Gemini 和 GPT 哪个更好？

**A:** 各有优势：

| 维度 | Gemini | GPT |
|------|--------|-----|
| 上下文 | 100万 tokens | 128K tokens |
| 多模态 | 全面 | 全面 |
| 免费额度 | 充足 | 有限 |
| 视频理解 | 支持 | 部分支持 |

详见 [[../01-快速入门/Gemini-vs-Claude-vs-GPT|模型对比]]

### Q: 数据安全吗？

**A:** 注意事项：
1. 不要在对话中透露敏感信息
2. 企业用户可使用 Vertex AI
3. 查看隐私政策了解数据处理

### Q: 如何报告问题？

**A:**
1. GitHub Issues：[gemini-cli](https://github.com/google-gemini/gemini-cli/issues)
2. AI Studio 反馈
3. 社区论坛

---

## 相关链接

- [[国内访问指南]]
- [[镜像站使用]]
- [[中文教程]]
- [[../README|Gemini 知识库导航]]
