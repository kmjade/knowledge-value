---
tags:
  - opencode
  - ollama
  - best-practices
  - security
  - guide
created: 2026-01-15
---

# OpenCode 最佳实践总结

## 🎯 核心原则

### 1. 选择合适的模型

根据硬件和需求平衡性能与质量：
- 低配置（8GB GPU）: Qwen2.5:3B
- 中配置（16GB GPU）: Qwen2.5-Coder:7B
- 高配置（24GB+ GPU）: Qwen2.5-Coder:14B

### 2. 优化上下文窗口

避免不必要的内存浪费：
- 简单查询: 2K-4K tokens
- 代码生成: 4K-8K tokens
- 项目分析: 16K+ tokens

### 3. 启用 GPU 加速

最大化硬件性能：
- NVIDIA: 确保 CUDA 驱动正确
- Apple Silicon: 启用 Metal 加速
- 监控 GPU 使用率

## 🛡️ 安全最佳实践

### 1. 本地运行

确保数据不离开本地网络：
```bash
# 检查 Ollama 仅监听本地
export OLLAMA_HOST=127.0.0.1:11434

# 或在内网使用（需配置防火墙）
export OLLAMA_HOST=0.0.0.0:11434
```

### 2. 访问控制

限制外部访问：
```bash
# 配置防火墙
sudo ufw allow from 192.168.1.0/24 to any port 11434
sudo ufw deny 11434
```

### 3. 网络隔离

在受限环境中运行敏感项目：
```bash
# 离线模式（完全断网）
systemctl stop network

# 或使用本地网络
sudo iptables -A INPUT -s 192.168.1.0/24 -p tcp --dport 11434 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 11434 -j DROP
```

### 4. 数据加密

敏感数据额外保护：
```bash
# 加密模型存储
openssl enc -aes-256-cbc -in models/ -out models.enc

# 使用密钥管理
export OLLAMA_API_KEY=$(pass show opencode/api-key)
```

## ⚡ 性能最佳实践

### 1. 量化模型

在质量和速度间找到平衡：
```bash
# 推荐量化级别
FP16  - 最高质量（基准）
INT8  - 轻微质量损失，+20-30% 速度
INT4  - 明显质量损失，+50-80% 速度
```

### 2. 批处理优化

合理设置并发数：
```bash
# 根据硬件调整
export OLLAMA_MAX_QUEUE=256    # 队列大小
export OLLAMA_NUM_BATCH=128     # 批处理大小
export OLLAMA_NUM_GPU=32        # GPU 层数
```

### 3. 缓存策略

重用常见查询结果：
```javascript
// 实现查询缓存
const cache = new Map();
function cachedQuery(key, queryFn) {
    if (cache.has(key)) {
        return cache.get(key);
    }
    const result = queryFn();
    cache.set(key, result);
    return result;
}
```

### 4. 资源监控

持续监控和优化资源使用：
```bash
# 定期监控脚本
watch -n 5 'nvidia-smi && free -h'
```

## 🔧 维护最佳实践

### 1. 定期更新

保持软件最新版本：
```bash
# 更新 Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 更新 OpenCode
npm update -g @opencode-ai/cli

# 更新模型
ollama pull qwen2.5-coder:7b
```

### 2. 日志记录

保持详细的使用日志：
```bash
# 启用详细日志
export DEBUG=opencode:*
export OLLAMA_DEBUG=1

# 日志轮转配置
logrotate -f /etc/logrotate.d/ollama
```

### 3. 定期清理

清理不用的模型和缓存：
```bash
# 列出所有模型
ollama list

# 删除不用的模型
ollama rm qwen2.5:1.5b

# 清理缓存
rm -rf ~/.ollama/cache/*
```

### 4. 备份策略

重要配置和模型备份：
```bash
#!/bin/bash
# 备份脚本
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup/opencode-$DATE"

mkdir -p $BACKUP_DIR

# 备份配置
cp ~/.config/opencode/*.json $BACKUP_DIR/

# 备份模型（可选）
# tar -czf $BACKUP_DIR/models.tar.gz ~/.ollama/models/

# 保留最近7天的备份
find /backup -name "opencode-*" -mtime +7 -exec rm -rf {} \;
```

## 📊 工作流最佳实践

### 1. 提示词工程

编写清晰有效的提示词：

**❌ 不好的提示词:**
```
帮我写个函数
```

**✅ 好的提示词:**
```
创建一个 Python 函数，用于计算斐波那契数列的前 n 项。
要求：
1. 包含完整的类型注解
2. 添加文档字符串说明参数和返回值
3. 实现错误处理
4. 使用迭代算法优化性能
5. 包含单元测试示例
```

### 2. 迭代开发

分步骤完成复杂任务：
```bash
# 步骤 1: 生成基础代码
opencode run "生成基础代码结构"

# 步骤 2: 添加功能
opencode run "添加 X 功能"

# 步骤 3: 优化性能
opencode run "优化代码性能"

# 步骤 4: 生成测试
opencode run "生成测试用例"

# 步骤 5: 生成文档
opencode run "生成 API 文档"
```

### 3. 代码审查

建立审查检查清单：
- [ ] 代码符合项目规范
- [ ] 包含必要的错误处理
- [ ] 性能满足要求
- [ ] 安全性经过验证
- [ ] 测试覆盖充分
- [ ] 文档完整清晰

### 4. 版本控制

正确管理 AI 生成的代码：
```bash
# 创建有意义的提交信息
git add .
git commit -m "feat: 实现用户认证功能

- 添加 JWT token 认证
- 实现密码加密
- 生成 API 文档
AI 辅助: OpenCode + Qwen2.5-Coder"
```

## 🎓 学习最佳实践

### 1. 从简单开始

先掌握基础功能：
1. 基础代码生成
2. 简单的代码审查
3. 文档生成

### 2. 逐步深入

然后学习高级功能：
1. 自定义技能开发
2. 多模型协作
3. CI/CD 集成

### 3. 持续实验

不断尝试新方法：
- 不同的提示词策略
- 各种模型组合
- 性能优化技巧

### 4. 记录经验

积累可复用的知识：
```markdown
# 提示词模板库

## 代码生成模板
[复用的提示词]

## 代码审查模板
[检查清单]

## 性能优化模板
[优化策略]
```

## 🔗 团队协作最佳实践

### 1. 统一配置

团队成员使用相同配置：
```bash
# 共享配置文件
git clone git@github.com:team/opencode-config.git ~/.config/opencode
```

### 2. 文档共享

维护团队知识库：
- 常用提示词集合
- 模型选择指南
- 故障排除手册

### 3. 定期同步

定期同步使用经验：
- 周会分享使用技巧
- 维护最佳实践文档
- 收集团队反馈

## 📈 监控与改进

### 关键指标

定期跟踪这些指标：

| 指标 | 目标 | 测量方法 |
|------|------|----------|
| **响应时间** | < 5s | `time opencode run ...` |
| **代码质量** | > 80% | 人工审查评分 |
| **效率提升** | > 50% | 时间对比 |
| **资源使用** | < 80% | 系统监控 |

### 持续改进

基于指标优化：
- 分析瓶颈
- 调整配置
- 优化工作流

## ✅ 检查清单

### 新项目启动
- [ ] 确定模型选择
- [ ] 配置环境变量
- [ ] 设置监控
- [ ] 建立备份策略

### 日常使用
- [ ] 检查资源使用
- [ ] 清理缓存
- [ ] 更新软件
- [ ] 记录经验

### 问题排查
- [ ] 查看日志
- [ ] 检查配置
- [ ] 测试连接
- [ ] 参考文档

## 🔗 相关文档

- [[OpenCode快速开始]] - 基础安装配置
- [[OpenCode性能优化]] - 性能调优技巧
- [[OpenCode故障排除]] - 问题解决指南

## 📚 外部资源

- [OpenCode Best Practices](https://opencode.ai/docs/best-practices)
- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/README.md)
- [AI Safety Guidelines](https://www.deeplearning.ai/ai-safety/)
