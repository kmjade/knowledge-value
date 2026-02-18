---
title: ROS2基础概念
status: active
priority: medium
tags: [knowledge/ros, robotics, distributed-system]
aliases: [ROS2教程, Robot Operating System 2]
created: 2026-02-19
---

# ROS2基础概念

> ROS2 (Robot Operating System 2) 是一个用于机器人应用的中间件框架，提供了硬件抽象、设备驱动、库函数、可视化器、消息传递、软件包管理等功能。

---

## 📋 概述

### ROS2 vs ROS1

| 特性 | ROS1 | ROS2 |
|------|------|------|
| 通信机制 | TCP/UDP | DDS (Data Distribution Service) |
| 平台支持 | Linux为主 | Windows、Linux、macOS、RTOS |
| 实时性 | 有限 | 支持实时系统 |
| 安全性 | 无 | 内置安全特性 |
| 架构 | Master-Slave | 分布式、无中心节点 |

### 核心概念
- **节点 (Node)**: 执行计算的进程
- **话题 (Topic)**: 节点间异步通信的发布/订阅机制
- **服务 (Service)**: 节点间同步通信的请求/响应机制
- **动作 (Action)**: 长时间运行的任务通信机制
- **消息 (Message)**: 节点间传输的数据结构
- **参数 (Parameter)**: 节点的配置值

---

## 🏗️ 架构组件

### DDS中间件

ROS2使用DDS作为通信中间件，支持多种DDS实现：

| DDS实现 | 特点 | 适用场景 |
|---------|------|----------|
| FastDDS | 高性能，C++实现 | 工业应用 |
| CycloneDDS | 轻量级，开源 | 资源受限系统 |
| Connext DDS | 商业版，功能完整 | 企业级应用 |

### 通信模型

```
┌─────────────┐                 ┌─────────────┐
│   Node A    │                 │   Node B    │
│             │                 │             │
│  Publisher  │ ──────────────▶ │  Subscriber │
└─────────────┘    Topic       └─────────────┘
       │                            │
       ▼                            ▼
   Publish Data                  Receive Data
```

---

## 💬 话题通信 (Topics)

### 发布/订阅模式

```python
# 发布方 (Publisher)
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class PublisherNode(Node):
    def __init__(self):
        super().__init__('publisher')
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS2!'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: {msg.data}')

rclpy.init()
node = PublisherNode()
rclpy.spin(node)
node.destroy_node()
rclpy.shutdown()
```

```python
# 订阅方 (Subscriber)
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SubscriberNode(Node):
    def __init__(self):
        super().__init__('subscriber')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10
        )

    def listener_callback(self, msg):
        self.get_logger().info(f'Heard: {msg.data}')

rclpy.init()
node = SubscriberNode()
rclpy.spin(node)
node.destroy_node()
rclpy.shutdown()
```

### 话题命令

```bash
# 列出所有话题
ros2 topic list

# 查看话题信息
ros2 topic info /chatter

# 查看话题消息类型
ros2 topic echo /chatter

# 发布消息到话题
ros2 topic pub /chatter std_msgs/String "data: 'Hello'"

# 查看话题频率
ros2 topic hz /chatter

# 查看话题带宽
ros2 topic bw /chatter
```

---

## 🎯 服务通信 (Services)

### 请求/响应模式

```python
# 服务端 (Server)
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class ServiceServer(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: {request.a} + {request.b}')
        return response

rclpy.init()
node = ServiceServer()
rclpy.spin(node)
```

```python
# 客户端 (Client)
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts
import sys

class ServiceClient(Node):
    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

rclpy.init()
node = ServiceClient()
response = node.send_request(int(sys.argv[1]), int(sys.argv[2]))
node.get_logger().info(f'Result: {response.sum}')
```

### 服务命令

```bash
# 列出所有服务
ros2 service list

# 查看服务信息
ros2 service info /add_two_ints

# 调用服务
ros2 service call /add_two_ints example_interfaces/srv/AddTwoInts "{a: 1, b: 2}"

# 查看服务类型
ros2 service type /add_two_ints

# 列出服务接口
ros2 interface list
```

---

## 🎬 动作通信 (Actions)

### 长时间任务通信

```python
# 动作服务端
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from action_tutorials_interfaces.action import Fibonacci

class FibonacciActionServer(Node):
    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    async def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            feedback_msg.partial_sequence.append(
                feedback_msg.partial_sequence[i] + feedback_msg.partial_sequence[i-1])
            self.get_logger().info(f'Feedback: {feedback_msg.partial_sequence}')
            goal_handle.publish_feedback(feedback_msg)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        return result

rclpy.init()
node = FibonacciActionServer()
rclpy.spin(node)
```

---

## 📦 消息定义

### 自定义消息类型

#### 创建消息包
```bash
# 创建包
ros2 pkg create --build-type ament_cmake my_interfaces

# 创建消息
cd my_interfaces/msg
touch CustomMessage.msg
```

#### 定义消息格式
```text
# CustomMessage.msg
string id
float64 value
bool flag
```

#### 配置CMakeLists.txt
```cmake
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/CustomMessage.msg"
)

ament_export_dependencies(rosidl_default_generators)
```

#### 配置package.xml
```xml
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_interfaces</exec_depend>

<member_of_group>rosidl_interface_packages</member_of_group>
```

### 使用自定义消息
```python
from my_interfaces.msg import CustomMessage

msg = CustomMessage()
msg.id = "node_01"
msg.value = 42.0
msg.flag = True
```

---

## ⚙️ 参数系统

### 参数配置

```python
# 声明参数
node.declare_parameter('param_name', 'default_value')

# 获取参数
value = node.get_parameter('param_name').value

# 设置参数
node.set_parameters([rclpy.parameter.Parameter('param_name', value='new_value')])
```

### 参数文件 (YAML)

```yaml
# params.yaml
my_node:
  ros__parameters:
    param1: value1
    param2: 42
    param3: true
```

### 加载参数文件
```bash
ros2 run my_package my_node --ros-args --params-file params.yaml
```

### 参数命令
```bash
# 列出节点参数
ros2 param list /node_name

# 获取参数值
ros2 param get /node_name param_name

# 设置参数值
ros2 param set /node_name param_name new_value

# 导出参数
ros2 param dump /node_name params.yaml

# 加载参数
ros2 param load /node_name params.yaml
```

---

## 🔧 工作空间与包

### 工作空间结构
```
ros2_ws/
├── build/           # 编译输出
├── install/         # 安装结果
├── log/            # 构建日志
└── src/            # 源代码
    └── my_package/  # 功能包
```

### 创建功能包
```bash
cd ros2_ws/src
ros2 pkg create --build-type ament_python my_package
ros2 pkg create --build-type ament_cmake my_cpp_package
```

### 编译工作空间
```bash
cd ros2_ws
colcon build --symlink-install

# 编译特定包
colcon build --packages-select my_package

# 允许未声明的依赖
colcon build --cmake-args -DCMAKE_BUILD_TYPE=Release
```

### 源环境
```bash
source install/setup.bash
```

---

## 🚀 Launch文件

### Python Launch文件

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_package',
            executable='my_node',
            name='my_node',
            parameters=[{'param_name': 'param_value'}],
            output='screen'
        )
    ])
```

### XML Launch文件

```xml
<launch>
  <node pkg="my_package" exec="my_node" name="my_node" output="screen">
    <param name="param_name" value="param_value"/>
  </node>
</launch>
```

### 运行Launch文件
```bash
ros2 launch my_package my_launch_file.py
ros2 launch my_package my_launch_file.xml
```

---

## 📊 可视化工具

### Rviz2

```bash
ros2 run rviz2 rviz2
```

**功能**:
- 3D可视化
- 点云显示
- 机器人模型
- TF坐标变换

### Rqt工具箱

```bash
rqt
```

**功能**:
- 图形化节点可视化
- 话题/服务/动作监控
- 参数配置
- 数据可视化

---

## 📚 ROS2课程

> ROS2完整学习路径，从基础概念到高级应用

### 基础篇

| 课程 | 描述 |
| --- | --- |
| [[ESP32例程集/07-ROS2课程/01-基础篇/ROS2简介]] | ROS2概述与特性 |
| [[ESP32例程集/07-ROS2课程/01-基础篇/ROS2安装Humble]] | Humble版本安装 |
| [[ESP32例程集/07-ROS2课程/01-基础篇/ROS2集成开发环境搭建]] | 开发环境配置 |

---

## 🔗 相关资源

### 官方文档
- [ROS2官方文档](https://docs.ros.org/en/humble/)
- [ROS2教程](https://docs.ros.org/en/humble/Tutorials.html)
- [ROS2概念](https://docs.ros.org/en/humble/Concepts/Basic.html)

### 相关笔记
- [[MicroROS-Board学习项目]] - 学习项目
- [[机器人控制笔记]] - 机器人控制实践
- [[ESP32开发基础]] - 嵌入式开发

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
