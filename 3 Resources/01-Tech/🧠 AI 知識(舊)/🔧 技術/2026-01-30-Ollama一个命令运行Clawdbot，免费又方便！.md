---
type: web-capture
created: 2026-01-30
url: "{{url}}"
---

# 🔗 2026-01-30-Ollama一个命令運行Clawdbot，免費又方便！

> 2026-01-30 | [原文連結](https://mp.weixin.qq.com/s/B4KzgiBN60hJOz83cKk25w)

---

## 📌 核心內容

为了流程的完整性，我还是从安裝 Clawdbot 開始，但是已经说过的就不展开说了。

## 1. 安裝 Clawdbot

这一步我们已经搞定了。

就是運行這個命令：

`npm install -g clawdbot@latest   `

如果你 Node.js 也没装，那么可以用 PowerShell 運行：

`iwr -useb https://molt.bot/install.ps1 | iex   `

没有任何难度，都不用科學工具。

# 配置

# 配置

`clawdbot onboard --install-daemon   `

這個我们也在上一篇完成了，上次的命令没有带 --install-daemon，有了這個之后就可以让 🦞 在后台運行了。

# 配置

因为我们后面会用羊驼，所以模型其实可以随便配啦，API key 随便写。

## 3. 運行 Clawdbot

接下来就是 Ollama 的部分了。

Ollama演示了两行命令。

一个是：

`ollama launch clawdbot   `

另一个是：

`ollama launch clawdbot --config   `

第一次使用 launch 不用带 config。

輸入命令之后，会让你選擇模型。

# 修改

# 配置

Ollama 推荐模型是：

- `qwen3-coder`
    
- `glm-4.7`
    
- `gpt-oss:20b`
    
- `gpt-oss:120b`
    

但是，我只推荐 glm-4.7。

因为 qwen3 和 gpt-oss 对现代智能体工具調用支持應該是不太好的。而 glm-4.7 至少是针对性訓練过，可以用的。

# 配置

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLmGXs7mR2qQpW2T2Yn8d8ETgS8EK4cOXpMWUvEkgEeu5GBKK5vTXmjwdfOl6CrTCib5u0dIA9tpqXQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

登入一下 Ollama，然后新增一下這個名字的模型就可以直接使用了。

另外，最好是設置一下上下文长度：

![圖片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/l2iaibBTjsfLmGXs7mR2qQpW2T2Yn8d8ETsVZhqgNSDibeKjaADwN6Qtn14Y9aOkA91qzgQWvEfgicgt9XzHuMmrog/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

把上下文长度拖动到 32K 或 64K。

## 測試一下

因为我们从 GLM4.7 官方模型，换成了 Ollama 里面的模型，所以需要来做一个简单的測試，看一看是否能完成同样的工作。

既然是對比測試，就提一个差不多的需求吧。让他帮我根据日期創建一个資料夾，然后写一篇 Ollama 運行 Clawdbot 的文章。
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
