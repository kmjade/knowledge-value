---
tags:
  - opencode
  - ollama
  - use-cases
  - workflow
  - guide
created: 2026-01-15
---

# OpenCode 实际应用场景与工作流

## 🎨 场景 1: 基础代码生成

### 示例请求
```
创建一个 Python 函数，用于计算斐波那契数列的前 n 项，包含错误处理和性能优化
```

### 预期输出
```python
def fibonacci(n):
    """
    计算斐波那契数列的前 n 项

    Args:
        n (int): 要计算的项数

    Returns:
        list: 斐波那契数列

    Raises:
        ValueError: 当 n 不是正整数时
    """
    if not isinstance(n, int) or n <= 0:
        raise ValueError("n 必须是正整数")

    if n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])

    return fib_sequence
```

## 🔄 场景 2: 代码重构

### 工作流
1. 打开需要重构的文件
2. 使用 OpenCode 读取文件内容
3. 指定重构要求

### 示例请求
```
重构这段代码，要求：
1. 提取重复代码为函数
2. 改进错误处理
3. 新增类型提示
4. 优化算法性能
```

### 重构检查清单
- [ ] 消除代码重复
- [ ] 改进命名规范
- [ ] 添加类型注解
- [ ] 优化算法复杂度
- [ ] 增强错误处理
- [ ] 添加文档字符串

## 📚 场景 3: 项目级代码理解

### 代码分析工作流
```bash
# 分析项目结构
opencode run "分析这个项目的架构和主要模块，生成项目概览"

# 生成项目文档
opencode run "为这个项目生成 README 文档，包括安装说明和使用示例"

# 理解复杂逻辑
opencode run "解释这个模块的工作原理，画出数据流图"
```

### 项目理解输出模板
```markdown
# 项目概览

## 架构设计
- [架构描述]

## 核心模块
| 模块 | 功能 | 依赖 |
|------|------|------|
| ... | ... | ... |

## 数据流
[数据流图]

## 待优化项
- [ ] 列出需要改进的地方
```

## ⚡ 场景 4: 批处理自动化

### 批量代码审查脚本
```bash
#!/bin/bash
# 批量代码审查脚本

for file in $(find . -name "*.py" -type f | head -10); do
    echo "审查文件: $file"
    opencode run "审查这个 Python 文件的代码品质，指出潜在问题" "$file"
    echo "---"
done
```

### 批量文档生成
```bash
#!/bin/bash
# 批量生成文档

for file in $(find src -name "*.js" -type f); do
    output="docs/$(basename $file .js).md"
    opencode run "为这个文件生成 API 文档" "$file" > "$output"
done
```

### 批量测试用例生成
```bash
#!/bin/bash
# 批量生成测试

for module in $(ls src/modules); do
    test_file="tests/$(basename $module .py)_test.py"
    opencode run "为 $module 生成完整的单元测试" > "$test_file"
done
```

## 🔍 场景 5: 代码审查与质量检查

### 审查维度
| 维度 | 检查项 | 严重程度 |
|------|--------|----------|
| **安全性** | SQL注入、XSS、权限问题 | 🔴 高 |
| **性能** | 算法复杂度、内存泄漏 | 🟠 中 |
| **可读性** | 命名规范、代码格式 | 🟡 低 |
| **测试覆盖** | 单元测试、边界测试 | 🟠 中 |

### 审查工作流
```bash
# 安全性审查
opencode run "审查这段代码的安全漏洞，特别关注：SQL注入、XSS、权限绕过"

# 性能审查
opencode run "分析代码性能，找出瓶颈和优化建议"

# 代码风格审查
opencode run "按照 PEP8 规范检查代码风格"
```

## 🐛 场景 6: 调试与问题排查

### 调试工作流
```bash
# 步骤 1: 问题描述
opencode run "分析这个错误信息，找出可能的原因"

# 步骤 2: 代码审查
opencode run "审查相关代码，找出问题所在"

# 步骤 3: 生成修复方案
opencode run "提供修复建议和代码示例"

# 步骤 4: 验证
opencode run "生成测试用例来验证修复"
```

### 常见错误类型
- [ ] 类型错误
- [ ] 空指针引用
- [ ] 数组越界
- [ ] 并发问题
- [ ] 内存泄漏

## 🚀 场景 7: 新功能开发

### 开发流程
```mermaid
graph LR
    A[需求分析] --> B[设计架构]
    B --> C[代码生成]
    C --> D[测试编写]
    D --> E[代码审查]
    E --> F[文档生成]
```

### 功能开发模板
```bash
# 1. 理解需求
opencode run "分析需求文档，拆解功能点"

# 2. 生成代码
opencode run "实现这些功能点，包含完整的错误处理"

# 3. 生成测试
opencode run "为这些功能生成测试用例"

# 4. 生成文档
opencode run "生成 API 文档和使用示例"
```

## 🔄 场景 8: 技术栈迁移

### 迁移检查清单
- [ ] 分析现有代码结构
- [ ] 识别依赖关系
- [ ] 生成迁移映射表
- [ ] 批量转换代码
- [ ] 生成测试验证

### 迁移脚本示例
```bash
#!/bin/bash
# Python 2 到 Python 3 迁移

for file in $(find . -name "*.py"); do
    opencode run "将这段 Python 2 代码迁移到 Python 3" "$file" > "${file}.new"
done
```

## 📊 场景 9: 代码度量与分析

### 度量维度
```bash
# 代码复杂度分析
opencode run "计算每个函数的圈复杂度，标出需要重构的函数"

# 代码重复检测
opencode run "找出重复的代码块，建议提取为公共函数"

# 依赖关系分析
opencode run "分析模块间的依赖关系，生成依赖图"
```

## 🎓 场景 10: 教学与学习

### 学习工作流
```bash
# 代码解释
opencode run "解释这段代码的工作原理，适合初学者理解"

# 生成教程
opencode run "为这个功能创建一个教程，包含理论、示例和练习"

# 代码对比
opencode run "对比两种实现方式的优缺点"
```

## 🔗 相关文档

- [[OpenCode快速开始]] - 基础安装配置
- [[OpenCode模型选择与配置]] - 模型选择指南
- [[OpenCode高级应用]] - 多模型协作与自定义技能

## 💡 最佳实践

1. **明确需求** - 清晰描述你想要的结果
2. **分步执行** - 复杂任务分解为多个小步骤
3. **验证结果** - 每步完成后验证输出质量
4. **迭代优化** - 根据结果调整提示词
5. **积累模板** - 保存常用的工作流和提示词
