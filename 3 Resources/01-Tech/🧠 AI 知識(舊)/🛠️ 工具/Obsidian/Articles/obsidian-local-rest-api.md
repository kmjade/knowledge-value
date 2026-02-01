
# 整理

**通用說明**:
*   **`{path}`**: 表示从 Vault 根目錄開始的**相对路徑**，例如 `My Notes/My First Note.md`。
*   **认证**: 所有示例中的 `YOUR_API_KEY` 都需要替换为您在外掛中获取的实际 API Key。

---

### Vault (檔案与目錄操作)

| Method | Endpoint | Description | Parameters | Example Call |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/vault/` | 获取 Vault 中所有的檔案和資料夾列表。 | **無** | `curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/vault/` |
| `GET` | `/vault/{path}` | 讀取指定路徑的檔案內容。 | **Path**: `{path}` - 檔案的完整相对路徑。 | `curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/vault/My%20Folder/My%20Note.md` |
| `POST` | `/vault/{path}` | 創建一个新檔案或完全覆盖一个已存在的檔案。 | **Path**: `{path}`<br>**Body**: 檔案的原始文本內容 (Raw Text)。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: text/plain" -d "# New Note" http://127.0.0.1:27123/vault/NewNote.md` |
| `PATCH` | `/vault/{path}` | 在现有檔案內容的开头或结尾追加文本。 | **Path**: `{path}`<br>**Body**: JSON 对象，包含 `action` (`"append"` 或 `"prepend"`) 和 `data` (要新增的文本)。 | `curl -X PATCH -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"action": "append", "data": "\n\n## Appended Content"}' http://127.0.0.1:27123/vault/ExistingNote.md` |
| `DELETE` | `/vault/{path}` | 刪除指定路徑的檔案或空的資料夾。 | **Path**: `{path}` - 要刪除的檔案或資料夾的相对路徑。 | `curl -X DELETE -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/vault/NoteToDelete.md` |

---

### Commands (命令面板操作)

| Method | Endpoint | Description | Parameters | Example Call |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/commands/` | 获取 Obsidian 中所有可用的命令及其 ID。 | **無** | `curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/commands/` |
| `POST` | `/commands/{command-id}` | 执行一个指定的命令。 | **Path**: `{command-id}` - 从 `/commands/` 接口获取的命令 ID。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/commands/app%3Aopen-settings` |

---

### Periodic Notes (周期性筆記)

# 配置

| Method | Endpoint | Description | Parameters | Example Call |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/periodic/` | 获取所有类型的周期性筆記列表。 | **Query**: `?type=` 可选值为 `daily`, `weekly`, `monthly`, `quarterly`, `yearly`。 | `curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/periodic/?type=daily` |
| `POST` | `/periodic/daily/` | 創建或打開今天的日报。 | **Body** (可选): JSON 对象，如 `{"data": "# My Content"}`，用于寫入內容。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/periodic/daily/` |
| `GET` | `/periodic/daily/{date}` | 获取指定日期的日报內容。 | **Path**: `{date}` - 日期，格式为 `YYYY-MM-DD`。 | `curl -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/periodic/daily/2025-10-01` |
| `POST` | `/periodic/weekly/` | 創建或打開本周的周报。 | **Body** (可选): JSON 对象，用于寫入內容。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" http://127.0.0.1:27123/periodic/weekly/` |

*(注：`monthly`, `quarterly`, `yearly` 的操作与 `daily` 和 `weekly` 类似，此处不再赘述。)*

---

### Search (搜尋)

| Method | Endpoint | Description | Parameters | Example Call |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/search/` | 在 Vault 中执行一次搜尋查詢。 | **Body**: JSON 对象，至少包含 `query` 字段。其他可选字段如 `tag`, `path` 等。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"query": "n8n integration"}' http://127.0.0.1:27123/search/` |

---

### Dataview (Dataview 外掛交互)

# 配置

| Method | Endpoint     | Description       | Parameters                                         | Example Call                                                                                                                                                     |
| :----- | :----------- | :---------------- | :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/dataview/` | 执行一次 Dataview 查詢。 | **Body**: JSON 对象，包含 `query` 字段，內容为 Dataview 查詢语句。 | `curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"query": "LIST FROM #project"}' http://127.0.0.1:27123/dataview/` |