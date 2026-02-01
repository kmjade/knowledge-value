---
type: web-capture
created: 2026-01-29
url: "{{url}}"
---

# 🔗 2026-01-29-本地开发闭环了  Ollama-GLM-Claude Code

> 2026-01-29 | [原文链接](https://mp.weixin.qq.com/s/g-TQmvQDn0HtMragFNgjEA)

---

## 📌 核心内容

Ollama 竟然也支持 Anthropic 协议了，这下 Claude Code 无处不在了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07UP7Lq7rn3OkqbHqIGMpCWVJYE9fqE7EwDiaSJYHU0kLuwVuNYfArF3A/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0)

Ollama 0.15 版本一次性支持了 Claude Code、Codex、opencode、droid。最近他们还上新了 GLM-4.7-flash。

这不就完美闭环了啊。

**直接可以搭建一套完全开源本地运行的编程环境了。**

虽然，我们都知道这肯定是玩具，但是这玩具也太好玩了。

我们可以实现：

- 完全离线运行
    
- 完全免费
    
- 无限 token
    

这不是爽翻天。今天赶紧跟着官方教材来配置一下，运行看看，效果如何。其实我好几天前就开始尝试了，但是由于版本还没到位，一直失败。今天终于被我跑通了。

首先安装 Ollama v0.15.0，一定要这个版本，比这个小的版本都不行，我是浪费了一天时间，才确认这个事情。

快速验证接口。

到底能不能用，我们先用一个小模型和 PS 脚本来快速验证一下：

```PowerShell
# Configure Claude Code to use local Ollama (Anthropic-compatible API)   
$env:ANTHROPIC_AUTH_TOKEN = "ollama"   
$env:ANTHROPIC_BASE_URL  = "http://localhost:11434"   
$env:ANTHROPIC_API_KEY   = "ollama"         
# Optional: run Claude Code (uncomment to use)   
$model = "qwen3:latest"   
$modelExists = (ollama list | Select-String -SimpleMatch $model)   
if (-not $modelExists) {
       Write-Host "Model '$model' not found locally. Pulling via Ollama..."
       ollama pull $model   
}   
claude --model $model      
```

把这个保存为 PowerShell 可以运行的 `claude-code-ollama-qwen3.ps1` 脚本。

这个脚本的逻辑是，首先查看 Ollama 中是否有 qwen3:latest 这个模型，如果没有的话，使用命令去下载，下载完成之后，就启用 Claude Code。

运行这个脚本的方式是，直接右键，使用 PowerShell 运行。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07dichqib5p7wpjtDcpQajdcNTEXUhv5u0Y7NGTsRFXhr0picQm07Jo9G1w/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1)

首次打开自动下载模型：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07icKohmHD5Cp3UmZ63rETZChic8YrYtyqNQeRrDtziaa2qMcBP0BiaftgeQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=2)

下载完成自动打开 Claude Code：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07ktPlG2rZUXwibTcgw9Cm8SsQ0Kbd4zfPN2HytILt84iaU9Og3QgTH8Fw/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=3)

问一下他是谁，他说他是通用千问。

这就证明，我们已经可以通过 Anthropic 结构调用 Ollama 中的模型了。

开始切换 glm-4.7-flash:latest

因为 qwen3 模型比较小，而且对 Claude Code 支持不好，所以我们需要切换 glm-4.7-flash。

可以直接切换上面脚本中的名字，重新运行一次就可以了。

也可以用另外一种方法，使用 CC-Switch。

先手动下载模型。

使用如下命令：

`ollama pull glm-4.7-flash   `

过程如下：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07YgyMhhYic5N4bVibS5X0ozTzY3zrl9KXpf6Kvnqp1w6ic6iaaTlHczNCSQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=4)

然后打开 CC-Switch 添加新供应商。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07AjFYz5IOib9XIlH0szibffeHlbA8k9fJA3o5E33QJGr9a7l0yG4XVKGg/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=5)

其中 API key 写：Ollama

请求地址：http://localhost:11434

然后主模型：glm-4.7-flash

然后启用这个配置：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07C0iaE9UW9COpITNummShib2h348zrMZzWEEfYXZNdIrLXRMI1KZVTd0w/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=6)

然后打开 Claude Code：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07uNqD5oeIPGVnA5rL1Oew8icRq5g1sebnr7AJAjZ5oFlrGpib4WzadSpQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=7)

这个时候模型就切换到 glm-4.7-flash 了。

然后就可以让他干活了。

经过一番折腾，终于可以使用了。但是，最终只证明了一点：**理想很美好，现实很骨感。**

一个需求，思考了半个多小时，最后崩了~~我也，崩溃了！

当然，这个也是有积极意义的。

既然这条路已经跑通了，只要开源模型针对 Claude Code 优化一下，接下来就真的能玩了。

只有跑过这种模型，你才会发现 Opus 轻而易举完成那么多事情，是多么牛逼了。

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
