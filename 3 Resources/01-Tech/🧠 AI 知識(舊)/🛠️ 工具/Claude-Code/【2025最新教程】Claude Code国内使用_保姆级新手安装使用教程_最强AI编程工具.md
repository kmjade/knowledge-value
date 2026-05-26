
# 教程

## 什么是 Claude Code

Claude Code 是 Anthropic 推出的一个 agentic 编码工具 (agentic coding tool)，可以在命令行（terminal）中運行，或者整合在一些支持终端的 IDE 中，借助 Claude 的语言模型能力来辅助写代碼、重构、除錯、維護、理解代碼库等。

# 教程

### **Claude Code特點**

```mipsasm
•	能理解整个代碼库的上下文，不只是单个檔案； 

•	支持自然语言命令 —— 用 “说”的方式让它做事情，比如 “帮我重构這個函数”、“让這個模块更高效”、“在這個地方加測試” 等； 

•	可以执行命令／運行 shell 或 bash 命令并把輸出作为上下文之一； 

•	支持專案记忆（persistent project context），比如通過 CLAUDE.md 檔案提供專案的风格、结构、常用腳本等，这样 Claude 在後續操作里就能“记得”这些规则。
```

### **🚀 主要功能**

- **智能代碼生成** - 快速生成高品質代碼
# 分析
- **除錯助手** - 智能發現和修復代碼問題
- **文檔生成** - 自動生成代碼文檔
- **命令行整合** - 無缝整合到開發流程

## ⭐**神马中转API专属功能**

神马中转API（api.whatai.cc）所有LLM 模型均支持在 Claude code 中使用

# 教程

# 教程

## **📦 安裝步骤**

# 配置

#### **1. 安裝 Node.js**

# 版本

##### **安裝 Homebrew (mac推荐)**

如果尚未安裝 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### **2. 安裝 Node.js**

使用 Homebrew：

```mipsasm
brew install node
```

#### **2. 安裝 Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

# 配置

##### **获取 Auth Token (參考新增令牌文檔**

# 方法

```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-xxx"' >> ~/.bash_profile echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.bash_profile source ~/.bash_profile
```

# 方法

```bash
echo 'export ANTHROPIC_AUTH_TOKEN="sk-xxx"' >> ~/.zshrc echo 'export ANTHROPIC_BASE_URL="https://api.whatai.cc"' >> ~/.zshrc source ~/.zshrc
```

**注意：** 永久設置后需要重启终端才能生效。

#### **4. 啟動使用 Claude Code**

```bash
# 进入專案目錄
cd your-project-folder

# 啟動 Claude Code
claude
```

**首次啟動后需要先進行主題的選擇等操作：**

- • 選擇喜欢的主題（回车）
- • 確認安全须知（回车）
# 配置
- • 信任工作目錄（回车）
- • 開始編程！🚀

# 配置

# 管理

#### **1. 安裝 Node.js**

# 版本

下載后双击安裝，之后一直点击下一步。安裝完成後，打開 CMD 視窗，执行命令驗證安裝：

```undefined
node -v
```

# 配置

```bash
setx NPM_CONFIG_IGNORE_SCRIPTS true
```

3、安裝 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

# 配置

# 方法

a. 右键点击 “此电脑” → 選擇 “属性”

b. 点击 “高级系統設置”

c. 在 “系統属性” 視窗中点击 “環境变量”

重要：在 “系統变量” 部分点击 “新建”（多人共享电脑可選擇 “使用者变量”）

d. 新增以下两个变量：

变量名：ANTHROPIC_AUTH_TOKEN，变量值：sk-xxx

变量名：ANTHROPIC_BASE_URL，变量值：https://api.whatai.cc

e. 点击 “確定” 儲存

# 方法

```PowerShell
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-xxx", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.whatai.cc", "User")
```

# 方法

CMD

```bash
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://api.whatai.cc"
```

# 配置

# 方法

找到 settings.json 檔案，如果没有请創建

```css
C:\Users\{user}\.claude\settings.json
```

設置 API 資訊，儲存

```json
{
    "env": {
      "ANTHROPIC_MODEL": "claude-sonnet-4-20250514",
      "ANTHROPIC_SMALL_FAST_MODEL": "claude-sonnet-4-20250514",
      "ANTHROPIC_BASE_URL": "https://api.whatai.cc",
      "ANTHROPIC_AUTH_TOKEN": "sk-AG2"
    }
  }
```

```mipsasm
setx SHELL "C:\Program Files\Git\bin\bash.exe" #这里要换成你的路徑， 
# 如果不知道，可以执行 where git 找一下 
```

5、新增 npm 環境变量

```php
C:\Users\y.xie\.npm-global # 新增Windows環境变量，同样要設置为你的路徑，在npm安裝包里面
# 如果不知道，可以执行 npm config get prefix 找一下
```

将其新增到 Windows 的環境变量（PATH），關閉并重新打開你的终端視窗（CMD / PowerShell / Git Bash），使設置生效。

# 配置

7、重启開發環境

8、enjoy!!

```bash
# 进入專案目錄
cd your-project-folder

# 啟動 Claude Code
claude
```

### **🎯 常用命令**

- `claude` - 啟動交互模式
- `claude "task"` - 運行一次性任務
- `claude commit` - 創建 Git 提交
# 顯示
- `/clear` - 清除对话歷史
- `/review` - 请求代碼審查

### **💡 使用示例**

```bash
# 代碼生成
> 请帮我写一个 Python 函数，用于計算斐波那契数列

# 代碼審查
claude "review this code for potential bugs"

# 自動提交
claude commit
```

### **切換模型**

使用 Claude Code 命令：

```bash
/model [model id]
```

默认模型为`Sonnet 4`，你可以用效果更好的`Opus 4`：

**opus**

```bash
/model opus
```

或者，换成其他 claude 模型：

**sonnet 3.7**

**sonnet 3.5**

```bash
/model claude-3-7-sonnet-20250219
```

**Kimi K2 支持**啟動 Claude Code 之后，只需要運行指令

```bash
/model moonshotai/kimi-k2-instruct
```

其他 LLM 模型均支持使用，比如 Openai、Gemini、Qwen、Doubao

### **⚠️ 重要提示**

# 配置
2. **令牌分组**：在 本站 創建令牌时，建議選擇 “企业分组 官转分组”
3. **網路連接**：确保網路連接稳定，工具需要与 API 伺服器通訊
4. **專案目錄**：建議在具体專案目錄下使用，以獲得更好的上下文理解

### **🔧 高级功能**

- **IDE 整合** - 支持 Cursor 等 IDE 整合
- **MCP 伺服器** - 擴展 Agent 能力
- **CI/CD 整合** - 自動化代碼審查流程
- **團隊規範** - 通過CLAUDE.md檔案定义團隊規範

## Claude Code 能做什么：功能列表

下面是 Claude Code 在实际開發中能帮你做的事情，列出来比较全，也分几类：

|类别|功能|
|---|---|
|代碼生成|新建模块/組件/API/資料庫模型|
|重构優化|改变量名、優化效能、清理废代碼|
|除錯修復|定位 bug、写单元測試、解決依赖冲突|
# 指南
|跨语言转换|Python ↔ JS / Go / Java 等|
|代碼審查|檢查安全性、效能、风格一致性|
# 配置
|理解專案|帮助快速熟悉陌生/遗留代碼库|

---

# 教程

## 一、快速專案初始化与脚手架生成

### 1.1 創建全棧應用程式脚手架

#### 使用場景

# 配置

#### 操作步骤

```bash
# 在终端中打開目標目錄，然后啟動 Claude
claude
```

#### Prompt 示例

```markdown
请帮我創建一个全棧應用程式的專案结构，要求：
1. 后端：Node.js + Express + TypeScript + Prisma ORM
2. 前端：React + TypeScript + Vite + TailwindCSS
# 配置
# 配置
# 配置
6. 包含完整的 README.md

專案名称：task-manager
# 配置
```

#### 预期輸出结构

```css
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── README.md
```

### 1.2 生成 API 端点与文檔

#### Prompt 示例

```markdown
基于以下數據模型，生成完整的 RESTful API：

模型：
- User (id, email, name, role, createdAt, updatedAt)
- Task (id, title, description, status, priority, assigneeId, createdAt, updatedAt)
- Comment (id, taskId, userId, content, createdAt)

要求：
1. 为每个模型生成完整的 CRUD 端点
2. 包含身份驗證中间件（JWT）
3. 包含輸入驗證（使用 Joi 或 Zod）
# 排序
5. 生成 OpenAPI/Swagger 文檔
6. 包含示例请求和響應

輸出格式：完整的 routes 檔案和 controller 檔案
```

---

## 二、智能代碼重构与優化

# 分析

#### 使用場景

# 分析

#### Prompt 示例

```markdown
# 分析

[貼上你的代碼]

# 分析
1. 不必要的重渲染
2. 記憶體泄漏风险
3. 大列表渲染優化
4. 异步操作優化
5. Bundle size 優化

輸出：
# 排序
- 每个問題的具体優化方案
- 優化后的完整代碼
- 效能提升预期
```

### 2.2 代碼现代化升級

#### Prompt 示例

```markdown
将以下 JavaScript 代碼升級为现代 TypeScript，要求：
1. 新增完整的类型定义
2. 使用 ES6+ 特性（async/await、解构、模板字符串等）
3. 改进错误處理
4. 新增 JSDoc 注释
5. 遵循 TypeScript 最佳實踐

[貼上旧代碼]

额外要求：
- 保持向后相容
- 列出所有破坏性变更
# 指南
```

---

## 三、測試代碼生成与覆盖率提升

### 3.1 生成完整測試套件

#### Prompt 示例

```markdown
为以下模块生成完整的測試套件：

[貼上你的代碼模块]

測試要求：
1. 单元測試（Jest/Vitest）
2. 整合測試
3. 边界条件測試
4. 错误場景測試
5. Mock 外部依赖
6. 測試覆盖率目標：>90%

輸出：
- 完整的測試檔案
- 測試用例說明表格
- Mock 數據生成函数
# 配置
```

### 3.2 E2E 測試腳本生成

#### Prompt 示例

```markdown
基于以下使用者流程生成 Playwright E2E 測試：

使用者流程：
1. 使用者访问登入页
2. 輸入邮箱和密碼
3. 点击登入
4. 跳转到儀表板
5. 創建新任務
6. 編輯任務狀態
7. 刪除任務
8. 登出

要求：
- 使用 Page Object Model
- 包含断言驗證
- 處理异步操作
- 新增截图功能
- 支持多瀏覽器測試
```

---

## 四、資料庫操作与遷移

### 4.1 資料庫 Schema 設計与優化

#### Prompt 示例

```markdown
設計一个电商系統的資料庫 schema，要求：

业务需求：
# 管理
# 管理
- 訂單系統（狀態流转）
# 管理
- 支付記錄
- 評價系統

技術要求：
1. 使用 PostgreSQL
2. 考虑索引優化
3. 考虑數據分区
4. 包含触发器和儲存過程
5. 生成 Prisma schema
6. 生成 SQL 遷移腳本
7. 包含种子數據腳本

輸出格式：
- ER 图描述
- SQL DDL 语句
- Prisma schema
- 索引優化建議
```

### 4.2 數據遷移腳本生成

#### Prompt 示例

```css
生成數據遷移腳本，将 MongoDB 數據遷移到 PostgreSQL：

MongoDB 集合结构：
{
  users: { _id, email, profile: { name, avatar }, posts: [postIds] },
  posts: { _id, userId, title, content, tags: [], comments: [{}] }
}

目標 PostgreSQL 结构：
- users 表
- profiles 表（1对1）
- posts 表
- tags 表
- post_tags 关联表
- comments 表

要求：
1. 處理數據类型转换
2. 處理关联关系
3. 包含回滚腳本
4. 批量處理大數據量
5. 错误處理和日志
# 顯示
```

---

## 五、API 整合与除錯

### 5.1 生成 API 客户端

#### Prompt 示例

```markdown
基于以下 OpenAPI 規範生成 TypeScript API 客户端：

[貼上 OpenAPI JSON/YAML]

要求：
1. 完整的类型定义
2. 支持请求拦截器
3. 自動重试機制
4. 错误處理封装
5. 支持取消请求
6. 缓存機制
7. 生成使用示例

技術棧：Axios + TypeScript
```

### 5.2 Mock Server 生成

#### Prompt 示例

```markdown
基于以下 API 規範創建 Mock Server：

API 列表：
- GET /api/users（分页）
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id
- GET /api/users/:id/posts

要求：
1. 使用 Express + Faker.js
2. 支持動態數據生成
3. 模拟延遲和错误
4. 支持 WebSocket
5. 數據持久化（JSON 檔案）
6. 支持場景切換
# 配置
```

---

## 六、除錯与問題定位

# 分析

#### Prompt 示例

```markdown
# 分析

错误資訊：
[貼上完整的错误堆棧]

相關代碼：
[貼上相關代碼片段]

環境資訊：
- Node.js version: 18.x
- Framework: Next.js 14
- Database: PostgreSQL 15

要求：
1. 解釋错误原因
2. 提供多种解決方案
3. 推荐最佳方案
4. 提供修復后的代碼
5. 如何避免类似問題
```

### 6.2 效能問題诊断

#### Prompt 示例

```markdown
诊断以下效能問題：

症状：
- API 響應時間从 100ms 增加到 2s
- 資料庫查詢缓慢
- 記憶體使用持續增长

提供的資訊：
[慢查詢日志]
[相關代碼]
[效能監控數據]

请提供：
# 分析
2. 優化方案（短期/长期）
# 修改
4. 效能監控建議
5. 预防措施
```

---

## 七、文檔生成与維護

### 7.1 生成專案文檔

#### Prompt 示例

```markdown
为專案生成完整文檔：

專案结构：
[貼上專案树形结构]

要求生成：
1. README.md（專案介紹、快速開始、架構說明）
2. API 文檔（端点說明、请求示例、響應格式）
# 配置
# 指南
# 指南

格式要求：
- Markdown 格式
- 包含目錄
- 包含示例代碼
- 包含架構图（Mermaid）
```

### 7.2 代碼注释生成

#### Prompt 示例

```markdown
为以下代碼新增詳細注释：

[貼上代碼]

注释要求：
1. JSDoc/TSDoc 格式
2. 函数說明（目的、参数、返回值、异常）
3. 复杂逻辑說明
4. 算法時間/空間复杂度
5. 使用示例
6. 注意事項
7. TODO 和 FIXME 標記
```

---

# 配置

# 工作流

#### Prompt 示例

```markdown
# 配置

專案資訊：
- 前端：React + TypeScript
- 后端：Node.js + TypeScript
- 資料庫：PostgreSQL
# 部署

要求：
1. PR 檢查（lint、test、build）
# 部署
# 部署
# 管理
5. 并行执行優化
6. 缓存優化
7. 通知機制（Slack）

生成：
- .github/workflows/ci.yml
- .github/workflows/deploy.yml
# 部署
```

---

## 九、代碼審查与安全扫描

### 9.1 安全漏洞扫描

#### Prompt 示例

```markdown
对以下代碼進行安全審查：

[貼上代碼]

檢查项：
1. SQL 注入
2. XSS 攻击
3. CSRF 攻击
4. 敏感資訊泄露
5. 不安全的依赖
6. 权限驗證漏洞
7. 加密問題
8. 輸入驗證

輸出：
- 漏洞列表（按严重等级）
- 修復方案
- 修復后的代碼
- 安全最佳實踐建議
```

# 教程

免责声明：本內容来自平台创作者，博客园系資訊發佈平台，仅提供資訊儲存空間服务。