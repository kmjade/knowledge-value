---
type: web-capture
created: 2026-01-30
url: "{{url}}"
---

# 🔗 2026-01-30-Ollama一个命令运行Clawdbot，免费又方便！

> 2026-01-30 | [原文链接](https://mp.weixin.qq.com/s/B4KzgiBN60hJOz83cKk25w)

---

## 📌 核心内容

为了流程的完整性，我还是从安装 Clawdbot 开始，但是已经说过的就不展开说了。

## 1. 安装 Clawdbot

这一步我们已经搞定了。

就是运行这个命令：

`npm install -g clawdbot@latest   `

如果你 Node.js 也没装，那么可以用 PowerShell 运行：

`iwr -useb https://molt.bot/install.ps1 | iex   `

没有任何难度，都不用科学工具。

## 2. 启动配置

安装完之后，需要用 onboard 命令进行配置：

`clawdbot onboard --install-daemon   `

这个我们也在上一篇完成了，上次的命令没有带 --install-daemon，有了这个之后就可以让 🦞 在后台运行了。

这一步的关键就是配置模型和聊天工具。

因为我们后面会用羊驼，所以模型其实可以随便配啦，API key 随便写。

## 3. 运行 Clawdbot

接下来就是 Ollama 的部分了。

Ollama演示了两行命令。

一个是：

`ollama launch clawdbot   `

另一个是：

`ollama launch clawdbot --config   `

第一次使用 launch 不用带 config。

输入命令之后，会让你选择模型。

如果后面需要修改模型，就带上 config 命令。

这样可以重新配置模型。

Ollama 推荐模型是：

- `qwen3-coder`
    
- `glm-4.7`
    
- `gpt-oss:20b`
    
- `gpt-oss:120b`
    

但是，我只推荐 glm-4.7。

因为 qwen3 和 gpt-oss 对现代智能体工具调用支持应该是不太好的。而 glm-4.7 至少是针对性训练过，可以用的。

如果你本地配置比较好，就完全可以打造纯本地版 Clawdbot 了。当然大部分的设备还做不到，所以可以用 Ollama 内置的云端模型。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLmGXs7mR2qQpW2T2Yn8d8ETgS8EK4cOXpMWUvEkgEeu5GBKK5vTXmjwdfOl6CrTCib5u0dIA9tpqXQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

登录一下 Ollama，然后添加一下这个名字的模型就可以直接使用了。

另外，最好是设置一下上下文长度：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLmGXs7mR2qQpW2T2Yn8d8ETsVZhqgNSDibeKjaADwN6Qtn14Y9aOkA91qzgQWvEfgicgt9XzHuMmrog/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

把上下文长度拖动到 32K 或 64K。

## 测试一下

因为我们从 GLM4.7 官方模型，换成了 Ollama 里面的模型，所以需要来做一个简单的测试，看一看是否能完成同样的工作。

既然是对比测试，就提一个差不多的需求吧。让他帮我根据日期创建一个文件夹，然后写一篇 Ollama 运行 Clawdbot 的文章。
---

## 💡 要点

- 要点 1
- 要点 2
- 要点 3

---

## 🏷️ 标签

- #主题 #领域

---

## 🔗 相关

- [[]]
- [[]]

---

> 💡 **整理提示**: 定期回顾并融入 PARA 系统
