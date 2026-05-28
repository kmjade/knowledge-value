
### 1、报错详情：

> **Error:** Claude Code native binary not found at C:\Users\EDY\AppData\Roaming\npm\claude. Please ensure Claude Code is installed via native installer or specify a valid path with options.pathToClaudeCodeExecutable.

![](https://i-blog.csdnimg.cn/direct/c43ef510c4ad42b581fae81d2da2e9c4.png)

### 2、报错原因

1. Claude Code安装后，可执行文件不是传统意义上的 `cli.js`
2. 插件默认寻找的路径 `C:\Users\me\AppData\Roaming\npm\claude` 不存在
3. 实际入口文件是 `claude.exe`，位于npm全局模块的 `bin` 目录下

### 3、解决方案

3.1、找到Claude Code安装路径

3.1.1、获取npm的全局路径

> npm root -g

![](https://i-blog.csdnimg.cn/direct/8c7b3ffb9ec544ccb56c2dd1e9c51a77.png)

3.1.2、找到将路径复制到文件导航栏，找到@anthropic-ai文件夹，然后获取claude.exe路径

![](https://i-blog.csdnimg.cn/direct/bf4be013f1ee4b4992d45fe5bdebfbd0.png)

 

![](https://i-blog.csdnimg.cn/direct/b8b8ccae991f4aabace525cc386dbd3c.png)

3.2、将claude的.exe路径复制到obsidian的claudian配置中

![](https://i-blog.csdnimg.cn/direct/f67c9247ad3b4c1ea118faf07cfeff04.png)
