---
title: Unix 網路與 IPC — Unix Networking & IPC
aliases: [Unix Network, Berkeley Sockets, Unix IPC, TCP/IP Unix]
tags: [DDC/004.451, unix, os, network, ipc]
created: 2026-05-30
updated: 2026-05-30
---

# Unix 網路與 IPC — Unix Networking & IPC

> Berkeley Sockets API 定義了現代網路程式設計的標準。加上管道、訊息佇列和共享記憶體，Unix 提供了完整的進程間通訊工具集。

## Berkeley Sockets API

1983 年，4.2BSD 首次整合完整的 TCP/IP 協議棧和 Sockets API，成為網際網路程式設計的基石。核心系統呼叫：

### Server 端流程
```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);  // 建立 socket
bind(sockfd, &addr, sizeof(addr));              // 綁定地址和埠
listen(sockfd, 5);                               // 開始監聽
int client = accept(sockfd, NULL, NULL);         // 接受連線
read(client, buf, size);                         // 讀取資料
write(client, buf, size);                        // 寫入資料
close(client);                                   // 關閉連線
```

### Client 端流程
```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);  // 建立 socket
connect(sockfd, &addr, sizeof(addr));            // 連線到伺服器
write(sockfd, data, len);                        // 發送資料
read(sockfd, buf, size);                         // 接收資料
close(sockfd);                                   // 關閉
```

### Socket 類型

| 類型 | 協定 | 特性 |
|------|------|------|
| `SOCK_STREAM` | TCP | 可靠、連線導向、有序 |
| `SOCK_DGRAM` | UDP | 不可靠、無連線、保留邊界 |
| `SOCK_RAW` | RAW | 直接存取 IP 層 |
| `AF_UNIX` | Local | 本機進程間通訊（Unix Domain Socket） |

### Socket 位址族

| AF_ 常數 | 用途 |
|-----------|------|
| `AF_INET` | IPv4 |
| `AF_INET6` | IPv6 |
| `AF_UNIX` | 本機 Unix Domain Socket |
| `AF_NETLINK` | 核心-使用者空間通訊 |

## TCP/IP 網路棧在 Unix 中的演進

1. **4.1aBSD (1982)**：第一個 TCP/IP 實作雛形
2. **4.2BSD (1983)**：完整 TCP/IP 棧 + Sockets API，成為事實標準
3. **System V STREAMS**：AT&T 的替代方案，TLI (Transport Layer Interface)
4. **SVR4**：同時支援 Sockets 和 STREAMS/TLI

最終 BSD Sockets 成為公認標準，所有現代系統（Linux, Windows Winsock, macOS）都沿用此 API。

## 管道 Pipes

### 匿名管道 Anonymous Pipe
最簡單的 IPC 機制，shell 中用 `|` 表示：

```c
int fd[2];
pipe(fd);  // fd[0] 讀端, fd[1] 寫端
if (fork() == 0) {
    close(fd[0]);
    dup2(fd[1], STDOUT_FILENO);  // 標準輸出重導向到管道
    execlp("ls", "ls", NULL);
}
```

### 命名管道 FIFO (Named Pipe)
通過檔案系統中的特殊節點進行通訊，允許無親緣關係的進程通訊：

```bash
mkfifo /tmp/myfifo
echo "data" > /tmp/myfifo &    # 寫入端 (阻塞直到有讀取端)
cat /tmp/myfifo                # 讀取端
```

## System V IPC

System V 引入了三種 IPC 機制，使用 key 而非檔案描述符：

### 訊息佇列 Message Queues
```c
int msgid = msgget(key, IPC_CREAT | 0666);   // 建立/取得佇列
msgsnd(msgid, &msg, size, 0);                // 發送訊息
msgrcv(msgid, &msg, size, type, 0);          // 接收訊息 (可選 type)
msgctl(msgid, IPC_RMID, NULL);               // 刪除佇列
```

### 共享記憶體 Shared Memory
最快的 IPC 方式，多個進程直接映射同一實體記憶體區域：
```c
int shmid = shmget(key, size, IPC_CREAT | 0666);  // 建立共享記憶體
void *ptr = shmat(shmid, NULL, 0);                 // 附加到進程位址空間
// ... 讀寫 ptr ...
shmdt(ptr);                                        // 分離
shmctl(shmid, IPC_RMID, NULL);                     // 刪除
```

### 號誌 Semaphores
用於同步和互斥，保護共享資源：
```c
int semid = semget(key, 1, IPC_CREAT | 0666);  // 建立號誌集
struct sembuf op = {0, -1, 0};                 // P 操作 (wait)
semop(semid, &op, 1);
// ... 臨界區 Critical Section ...
op.sem_op = 1;                                  // V 操作 (signal)
semop(semid, &op, 1);
```

## IPC 機制對比

| 機制 | 速度 | 範圍 | 持久性 | 同步 |
|------|:----:|------|:------:|:----:|
| Pipe/FIFO | 中 | 本機 | 串流 | 內建 |
| Message Queue | 中 | 本機 | 核心 | 內建 |
| Shared Memory | **最快** | 本機 | 核心 | 需額外機制 |
| Semaphores | 快 | 本機 | 核心 | 設計目的 |
| Unix Domain Socket | 快 | 本機 | 串流/資料包 | 內建 |
| TCP Socket | 慢 | 網路 | 串流 | 內建 |

---

> "The Sockets API is one of the most successful and enduring designs in computing history." — W. Richard Stevens, UNIX Network Programming
