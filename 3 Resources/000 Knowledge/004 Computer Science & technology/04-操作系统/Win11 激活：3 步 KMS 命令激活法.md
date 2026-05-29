
### 步骤 1：打开开始菜单

点击电脑左下角的**开始菜单图标**（由四个小方块组成的标识），开启开始菜单界面。

![](https://pic4.zhimg.com/v2-3a795897a534fcfd1796589bf01d2ea9_1440w.jpg)

开始菜单图标

**🔹 操作后界面展示**

![](https://pic4.zhimg.com/v2-c925827abd6794cae7534d9ccb1c6d71_1440w.jpg)

步骤 2：启动管理员权限的[命令提示符](https://zhida.zhihu.com/search?content_id=266540491&content_type=Article&match_order=1&q=%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzgwOTY0MjMsInEiOiLlkb3ku6Tmj5DnpLrnrKYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNjY1NDA0OTEsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1my2dM-8PIrq3KR9z3ClwVRbSWiJaIW5kDejzkXaHLE&zhida_source=entity) 在开始菜单搜索栏输入 **“cmd”**，系统将快速匹配出 “命令提示符” 程序。 右键点击 “命令提示符”，选择 **“以管理员身份运行”**（该操作是 KMS 命令成功执行的权限基础，务必完成）。

![](https://pic3.zhimg.com/v2-1dc0e288889b2ef1ef7ab2287fcb654c_1440w.jpg)

🔹 操作后界面展示

![](https://pic3.zhimg.com/v2-0001c206747c5ebd75d26c6b66268d20_1440w.jpg)

### 步骤 3：安装 [KMS 客户端密钥](https://zhida.zhihu.com/search?content_id=266540491&content_type=Article&match_order=1&q=KMS+%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AF%86%E9%92%A5&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzgwOTY0MjMsInEiOiJLTVMg5a6i5oi356uv5a-G6ZKlIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjY2NTQwNDkxLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.MCCs7uso4Wp__OO4nQOQexYfNI1HC8NIpgYXWuPyboA&zhida_source=entity)

在管理员权限的命令提示符窗口中，输入以下命令并按回车键执行

```genshitext
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX 
```

![](https://pic1.zhimg.com/v2-0f26fc67aa93794e16947fa1701a2798_1440w.jpg)

🔹 操作后界面展示

![](https://pic4.zhimg.com/v2-e55e790c15eaa415427191afe60e3b47_1440w.jpg)

### 步骤 4：指定 [KMS 服务器地址](https://zhida.zhihu.com/search?content_id=266540491&content_type=Article&match_order=1&q=KMS+%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9C%B0%E5%9D%80&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzgwOTY0MjMsInEiOiJLTVMg5pyN5Yqh5Zmo5Zyw5Z2AIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjY2NTQwNDkxLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.HXpX57n3NM6WqWIfLqVUT71FZBzqJPrfkm_YR6qW8Sw&zhida_source=entity)

在管理员权限的命令提示符窗口中，输入以下命令并按回车键执行：

```text
slmgr /skms kms.0t.net.cn
```

![](https://pic4.zhimg.com/v2-a78819252a6ea4ae346161bd858a42dd_1440w.jpg)

🔹 操作后界面展示

![](https://pic3.zhimg.com/v2-f92b87f7f44dd184cff96cc6838c01a0_1440w.jpg)

### 步骤 5：执行激活命令

在管理员权限的命令提示符窗口中，输入以下命令并按回车键执行：

```text
slmgr /ato
```

![](https://pic4.zhimg.com/v2-49b468077f25932dcdbec7b11dd43cfb_1440w.jpg)

🔹 操作后界面展示  

![](https://pic4.zhimg.com/v2-bf6df116947723cdfb512ea57045cfa9_1440w.jpg)

### 总结

完成上述全部步骤后，系统激活流程圆满结束。

---

## 老手快速指令（直接复制执行）

```genshitext

slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX 
slmgr /skms kms.0t.net.cn
slmgr /ato
```

依次粘贴到管理员模式的命令提示符中，每句回车，全程无需额外操作。

---

### 关键注意事项

- 必须以管理员身份运行命令提示符，否则会因权限不足导致激活失败。
- KMS 服务器为公开地址，若出现连接失败，可稍后重试或更换其他公开 KMS 服务器地址。
- 激活成功后，可通过 “设置 - 系统 - 激活” 路径验证激活状态。
