---
type: web-capture
created: 2026-01-29
url: "{{url}}"
---

# 🔗 2026-01-29-本地開發閉環了  Ollama-GLM-Claude Code

> 2026-01-29 | [原文連結](https://mp.weixin.qq.com/s/g-TQmvQDn0HtMragFNgjEA)

---

## 📌 核心內容

Ollama 竟然也支持 Anthropic 协议了，这下 Claude Code 無处不在了。

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07UP7Lq7rn3OkqbHqIGMpCWVJYE9fqE7EwDiaSJYHU0kLuwVuNYfArF3A/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0)

# 版本

这不就完美閉環了啊。

**直接可以搭建一套完全開源本地運行的編程環境了。**

虽然，我们都知道这肯定是玩具，但是这玩具也太好玩了。

我们可以實現：

- 完全離線運行
    
- 完全免費
    
- 無限 token
    

# 配置

# 版本

快速驗證接口。

到底能不能用，我们先用一个小模型和 PS 腳本来快速驗證一下：

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

把這個儲存为 PowerShell 可以運行的 `claude-code-ollama-qwen3.ps1` 腳本。

# 查看

運行這個腳本的方式是，直接右键，使用 PowerShell 運行。

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07dichqib5p7wpjtDcpQajdcNTEXUhv5u0Y7NGTsRFXhr0picQm07Jo9G1w/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1)

首次打開自動下載模型：

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07icKohmHD5Cp3UmZ63rETZChic8YrYtyqNQeRrDtziaa2qMcBP0BiaftgeQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=2)

下載完成自動打開 Claude Code：

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07ktPlG2rZUXwibTcgw9Cm8SsQ0Kbd4zfPN2HytILt84iaU9Og3QgTH8Fw/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=3)

问一下他是谁，他说他是通用千问。

这就证明，我们已经可以通過 Anthropic 结构調用 Ollama 中的模型了。

開始切換 glm-4.7-flash:latest

因为 qwen3 模型比较小，而且对 Claude Code 支持不好，所以我们需要切換 glm-4.7-flash。

可以直接切換上面腳本中的名字，重新運行一次就可以了。

# 方法

先手動下載模型。

使用如下命令：

`ollama pull glm-4.7-flash   `

過程如下：

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07YgyMhhYic5N4bVibS5X0ozTzY3zrl9KXpf6Kvnqp1w6ic6iaaTlHczNCSQ/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=4)

然后打開 CC-Switch 新增新供应商。

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07AjFYz5IOib9XIlH0szibffeHlbA8k9fJA3o5E33QJGr9a7l0yG4XVKGg/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=5)

其中 API key 写：Ollama

请求地址：http://localhost:11434

然后主模型：glm-4.7-flash

# 配置

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07C0iaE9UW9COpITNummShib2h348zrMZzWEEfYXZNdIrLXRMI1KZVTd0w/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=6)

然后打開 Claude Code：

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_png/l2iaibBTjsfLkEWJ4yR7BVyVHGfickGlR07uNqD5oeIPGVnA5rL1Oew8icRq5g1sebnr7AJAjZ5oFlrGpib4WzadSpQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=7)

這個时候模型就切換到 glm-4.7-flash 了。

然后就可以让他干活了。

經過一番折腾，终于可以使用了。但是，最终只证明了一点：**理想很美好，现实很骨感。**

一个需求，思考了半个多小时，最后崩了~~我也，崩溃了！

当然，這個也是有积极意义的。

既然这条路已经跑通了，只要開源模型针对 Claude Code 優化一下，接下来就真的能玩了。

只有跑过这种模型，你才会發現 Opus 轻而易举完成那么多事情，是多么牛逼了。

---

## 💡 要點

- 要點 1
- 要點 2
- 要點 3

---

## 🏷️ 標籤

- #主題 #领域

---

## 🔗 相關

- [[]]
- [[]]

---

# 整理
