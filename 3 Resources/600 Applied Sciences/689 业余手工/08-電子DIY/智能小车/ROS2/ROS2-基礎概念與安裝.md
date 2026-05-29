---
title: ROS2基礎概念與安裝
tags: [智能小车, ROS2, 入門, Humble]
created: 2026-05-29
aliases: [ROS2 Basics, ROS2 Installation, ROS2 入门]
---

# ROS2 基礎概念與安裝 ROS2 Basics & Installation

> ROS2 (Robot Operating System 2) 是機器人開發的標準框架——Node、Topic、Service、Action 四大核心概念，一次搞懂。

## ROS1 vs ROS2

| 特性 | ROS1 | ROS2 |
|------|------|------|
| 發布年份 | 2007 | 2017 |
| 中間件 | 自定義 (TCP/UDP) | **DDS** (Data Distribution Service) |
| 操作系統 | Linux only | Linux / Windows / macOS |
| 實時性 | 弱 | 強（支援 real-time） |
| 多機器人 | 需要 roscore | 自帶發現機制 |
| Python | 2.7 | **3.x** |
| 當前版本 | Noetic (最後一版) | **Humble** (LTS) |
| 適用 | 舊專案 | **所有新專案** |

> 💡 OriginBot / RDK X3 使用 **ROS2 Humble** (Ubuntu 22.04)。

## 核心概念 Core Concepts

### Node (節點)

```
一個 Node = 一個可執行程序
每個 Node 執行一個獨立的任務
例：camera_node（攝像頭驅動）、motor_node（馬達控制）
```

```bash
# 運行一個 Node
ros2 run <package> <executable>
ros2 run demo_nodes_cpp talker
```

### Topic (主題)

```
Node 之間通過 Topic 通信
Publisher → Topic → Subscriber

Topic 名稱例：
  /cmd_vel     — 速度控制指令
  /scan        — 雷射雷達數據
  /image_raw   — 攝像頭影像
  /odom        — 里程計數據
```

```bash
# 查看所有 Topic
ros2 topic list

# 查看 Topic 內容
ros2 topic echo /cmd_vel

# 查看 Topic 訊息類型
ros2 topic info /cmd_vel
```

### Message (訊息類型)

```bash
# 常用訊息類型：
geometry_msgs/msg/Twist      # 線速度 + 角速度（控制小車）
sensor_msgs/msg/LaserScan    # 雷射雷達數據
sensor_msgs/msg/Image        # 攝像頭影像
nav_msgs/msg/Odometry        # 里程計
std_msgs/msg/String          # 純文字
```

### Service (服務)

```
同步的請求-回應模式
Client → Request → Server → Response
用於：獲取感測器參數、觸發一次性操作
```

### Action (動作)

```
異步的長時間任務
Client → Goal → Server → Feedback → ... → Result
用於：導航到目標點（Nav2 的核心）
```

## 安裝 ROS2 Installation

### RDK X3（已預裝）

```bash
# TROS 已包含 ROS2 Humble
source /opt/tros/humble/setup.bash
ros2 --version
```

### PC 端安裝（Ubuntu 22.04）

```bash
# 設置 locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# 添加 ROS2 源
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安裝 ROS2 Humble 桌面版
sudo apt update
sudo apt install ros-humble-desktop
```

## Workspace 工作空間

### 建立 Workspace

```bash
# 創建工作空間
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws

# 編譯（即使是空的也要先編譯一次）
colcon build --symlink-install

# 載入環境
source install/setup.bash
```

### 目錄結構

```
~/ros2_ws/
├── src/                  # 源碼（Package）
│   ├── my_package/
│   │   ├── CMakeLists.txt       # C++ 編譯配置
│   │   ├── package.xml           # Package 元數據
│   │   ├── include/              # C++ 頭文件
│   │   └── src/                  # C++ 源碼
│   └── my_python_pkg/
│       ├── package.xml
│       ├── setup.py
│       └── my_python_pkg/        # Python 源碼
├── build/                # 編譯中間文件
├── install/              # 安裝目錄
└── log/                  # 編譯日誌
```

## 第一個 Package

### Python Package

```bash
# 創建 Package
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_first_pkg

cd ~/ros2_ws
colcon build --packages-select my_first_pkg
source install/setup.bash

# 運行
ros2 run my_first_pkg <node_name>
```

### 最小 Publisher (Python)

```python
# my_first_pkg/publisher.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.count = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS2: {self.count}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.count += 1

def main():
    rclpy.init()
    node = MinimalPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```

### 最小 Subscriber (Python)

```python
# my_first_pkg/subscriber.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String, 'topic', self.callback, 10)

    def callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main():
    rclpy.init()
    node = MinimalSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```

## 常用命令速查 Quick Reference

```bash
# 節點
ros2 node list                  # 列出所有 Node
ros2 node info /node_name       # Node 詳細資訊

# Topic
ros2 topic list                 # 列出所有 Topic
ros2 topic echo /topic          # 即時查看 Topic 內容
ros2 topic pub /topic type "{}" # 發布訊息
ros2 topic hz /topic            # 查看發布頻率

# Package
ros2 pkg list                   # 列出已安裝 Package
ros2 pkg create --build-type ament_python my_pkg  # 創建 Package

# 編譯
colcon build                    # 編譯所有 Package
colcon build --packages-select pkg1  # 只編譯指定 Package
colcon build --symlink-install  # 符號鏈接安裝（開發用）

# Launch
ros2 launch pkg file.launch.py  # 啟動 Launch 文件

# 調試
ros2 run rqt_graph rqt_graph    # 圖形化 Node-Topic 關係
rqt                             # 圖形化工具箱
rviz2                           # 3D 可視化
```

## 相關資源

- [[ROS2-Twist控制與里程計|ROS2 Twist 控制與里程計]]
- [[ROS2-感測器整合|ROS2 感測器整合]]
- [[RDK-TROS機器人開發|TROS 機器人開發]]
- [[OriginBot-軟體環境搭建|OriginBot 環境搭建]]
