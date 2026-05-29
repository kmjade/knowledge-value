
[Claude Code 安装配置完整指南：Windows/Mac/Linux 全平台 + 国内 API 配置 - 知乎](https://zhuanlan.zhihu.com/p/2013750250721014697)

---

### 📑 目录

- [一、前言](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E4%B8%80%E5%89%8D%E8%A8%80)
- [二、前置要求](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E4%BA%8C%E5%89%8D%E7%BD%AE%E8%A6%81%E6%B1%82)
- [三、Windows 安装步骤](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E4%B8%89%20windows-%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4)
- [四、macOS 安装步骤](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E5%9B%9B%20macos-%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4)
- [五、Linux 安装步骤](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E4%BA%94%20linux-%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4)
- [六、配置文件详解](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E5%85%AD%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%A6%E8%A7%A3)
- [七、验证安装](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E4%B8%83%E9%AA%8C%E8%AF%81%E5%AE%89%E8%A3%85)
- [八、常见问题](https://zhuanlan.zhihu.com/p/2013750250721014697/edit#%E5%85%AB%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

---

### 一、前言

Claude Code 是 Anthropic 推出的命令行 AI 编程助手，可以直接在终端中与 Claude 对话、编写代码、执行命令。但由于网络限制，国内用户直接使用官方 API 会遇到连接问题。本文将详细介绍如何在三大主流操作系统上安装配置 Claude Code，并使用国内 API 代理实现稳定访问。

> **💡 本文亮点：**  

- 完整的 Windows/Mac/Linux 安装教程
- 支持国内大模型 API 配置方案
- 常见问题解决方案汇总

### 二、前置要求

### 系统要求

|系统|最低要求|推荐配置|
|---|---|---|
|Windows|Windows 10|Windows 11 + PowerShell 7|
|macOS|macOS 11.0+|macOS 12.0+ + [Homebrew](https://zhida.zhihu.com/search?content_id=271127647&content_type=Article&match_order=1&q=Homebrew&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzczOTEwMDcsInEiOiJIb21lYnJldyIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI3MTEyNzY0NywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.aljAWArZARhS_APlV4vDRIPkJHWWReMFxV5467p7jpU&zhida_source=entity)|
|Linux|Ubuntu 20.04+|Ubuntu 22.04+ / Debian 11+|

### 软件依赖

- **[Node.js](https://zhida.zhihu.com/search?content_id=271127647&content_type=Article&match_order=1&q=Node.js&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzczOTEwMDcsInEiOiJOb2RlLmpzIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjcxMTI3NjQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.uASlxRGW0H55q3lu0Y7hlFtSEeQGBb40kCRbbT1_1Ag&zhida_source=entity)**：版本 18 或更高（必须）
- **npm**：随 Node.js 一起安装
- **Git**：可选，推荐安装

**📌 验证 Node.js 版本：**

```text
node --version 
# 输出示例：v20.11.0 
```

### 三、Windows 安装步骤

### [WSL2](https://zhida.zhihu.com/search?content_id=271127647&content_type=Article&match_order=1&q=WSL2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzczOTEwMDcsInEiOiJXU0wyIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjcxMTI3NjQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.S-6lkkAat0_d4-w8jFlm-gSulEHRH0DrgpiZ33ut5Ks&zhida_source=entity) 安装（Windows 用户强烈推荐）

✅ 为什么推荐 WSL2？

- 与 Linux/macOS 一致的安装体验
- 避免 Windows 路径和权限问题
- 更好的终端兼容性
- 官方文档推荐方式

📋 安装步骤 安装 WSL2

## PowerShell（管理员）运行

```text
wsl –install
```

## 重启电脑

打开 WSL 终端

```text
wsl 
```

安装 Node.js

## 使用 NVM（推荐）

```text
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash source ~/.bashrc 
nvm install –lts
```

## 或使用 apt

```text
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - 
sudo apt-get install -y nodejs 
```

安装 Claude Code

```text
npm install -g @anthropic-ai/claude-code 

npm install -g @anthropic-ai/claude-code --registry=https://registry.npmjs.org/
```

验证安装

```text
claude –version
```

### 四、macOS 安装步骤

### Step 1：安装 Homebrew（如未安装）

```text
# 访问 https://brew.sh 获取安装命令
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2：安装 Node.js

```text
brew install node
node --version
```

### Step 3：安装 Claude Code CLI

```text
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com/
```

### Step 4：创建配置文件

```text
# 创建配置目录
mkdir -p ~/.claude

# 创建 settings.json
cat > ~/.claude/settings.json << 'EOF'
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的_API_KEY",
    "ANTHROPIC_BASE_URL": "你的_URL",
    "ANTHROPIC_MODEL": "模型名称，在你申请的大模型上面就可以看到"
  }
}
EOF

# 创建 .claude.json
cat > ~/.claude.json << 'EOF'
{
  "hasCompletedOnboarding": true
}
EOF

echo "配置完成！"
```

### 五、Linux 安装步骤

### Step 1：安装 Node.js

```text
# 使用 NodeSource 仓库安装 LTS 版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### Step 2：安装 Claude Code CLI

```text
npm install -g @anthropic-ai/claude-code
```

### Step 3：创建配置文件

```text
# 创建配置目录
mkdir -p ~/.claude

# 创建 settings.json
cat > ~/.claude/settings.json << 'EOF'
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的_API_KEY",
    "ANTHROPIC_BASE_URL": "你的_URL",
    "ANTHROPIC_MODEL": "模型名称，在你申请的大模型上面就可以看到"
  }
}
EOF

# 创建 .claude.json
cat > ~/.claude.json << 'EOF'
{
  "hasCompletedOnboarding": true
}
EOF
```

### 六、配置文件详解

### ~/.claude/settings.json 配置说明

```text
{
  "env": {
    // API 密钥：
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxxxxxxxxxx",
    // API 基础 URL
    "ANTHROPIC_BASE_URL": "你的_URL",
    // 模型名称
    "ANTHROPIC_MODEL": "模型名称，在你申请的大模型上面就可以看到"
  }
}
```

> **🔑 获取 API KEY：**  
>   
> 这个配置以国内阿里云配置为例，但也可以是其它平台或者国外

```text
{    
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxxxxxxxxxx",
        "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
        "ANTHROPIC_MODEL": "qwen3.5-plus"
    }
}
```

### ～/.claude.json 配置说明

```text
{
  // 跳过官方登录流程，直接使用 API KEY 认证
  "hasCompletedOnboarding": true
}
```

### 七、验证安装

完成配置后，重新打开终端/PowerShell，运行：

```text
claude
```

首次运行会提示授权，输入 `yes` 确认：

```text
? Claude Code would like to read and run commands in this directory.
  Do you approve? (Y/n) yes
```

进入交互界面后，输入测试消息：

```text
> 您好！请简单介绍一下自己。

你好！我是 Claude，一个 AI 编程助手。我可以帮助你：
- 编写和调试代码
- 解释代码逻辑
- 执行终端命令
- 分析项目结构
...
```

> ✅ 如果正常回复，说明配置成功！

### 八、常见问题

### Q1：无法连接到 Anthropic 服务

**错误信息：**

```text
Error: Failed to connect to Anthropic API
```

**解决方案：**

确保 `~/.claude.json` 文件中包含：

```text
{
  "hasCompletedOnboarding": true
}
```

### Q2：无效的 API 密钥

**错误信息：**

```text
401 {"error":"Invalid API key"}
```

**解决方案：**

- 检查 `ANTHROPIC_AUTH_TOKEN` 是否正确
- 确保没有多余的空格或引号
- 在 平台重新生成 API KEY

### Q3：PowerShell 禁止运行脚本（Windows）

**错误信息：**

```text
cannot be loaded because running scripts is disabled on this system.
```

**解决方案：**

```text
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

### Q4：npm 安装速度慢

**解决方案：**

```text
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com/

# 或使用安装时指定
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com/
```

### Q5：Node.js 版本过低

**解决方案：**

```text
# macOS (使用 Homebrew)
brew update
brew upgrade node

# Linux (使用 nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Windows：重新下载新版 Node.js 安装
```

### 总结

通过以上步骤，你可以在 Windows、macOS 或 Linux 系统上成功安装配置 Claude Code，并使用国内 API 代理服务。整个安装过程大约需要 10-15 分钟，配置完成后即可在终端中享受 AI 编程助手的便利。

查看官方文档：[code.claude.com/docs](https://link.zhihu.com/?target=https%3A//code.claude.com/docs)
