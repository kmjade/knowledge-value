---
title: 安装和启动microROS代理
status: active
priority: medium
tags: [esp32/examples, development/microros]
aliases: [microROS代理启动, 启动代理]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346689/%E5%AE%89%E8%A3%85%E5%92%8C%E5%90%AF%E5%8A%A8microros%E4%BB%A3%E7%90%86.html
related:
  - [[MicroROS机器人控制板]]
  - [[安装ESP32-microros组件]]
---

# 安装和启动microROS代理

> 本节介绍如何启动microROS代理，它是ESP32与ROS2之间的通信桥梁。

---

> **说明**: 同个系统可以同时安装Docker启动方式和源码启动方式两种，但是启动的时候只能选择其中一种启动方式。一般情况下使用docker启动方式简单方便，推荐使用Docker启动方式。

---

## 🐳 Docker启动microros代理

本次启动microros代理为通过docker启动方式，所以需要先搭建好系统的docker才可以。出厂系统已经搭建好相关docker环境，可直接运行即可。

### Docker启动WIFI代理

```bash
docker run -it --rm -v /dev:/dev -v /dev/shm:/dev/shm --privileged --net=host microros/micro-ros-agent:humble udp4 --port 8090 -v4
```

其中，--port 8090为网络端口号，-v4为LOG打印等级，数值越高打印越多。可以根据实际情况做出修改。

如果需要结束代理，请在终端按**Ctrl+C**退出代理。

> **注意**: 不可以直接关闭终端，否则docker会在后台继续运行。

如果单片机多次启动重连代理，导致ROS2搜索出来多个相同的节点，实际不影响使用，按Ctrl+C结束代理后再复位单片机重新连接代理即可。

### Docker启动串口代理

```bash
docker run -it --rm -v /dev:/dev -v /dev/shm:/dev/shm --privileged --net=host microros/micro-ros-agent:humble serial --dev /dev/ttyUSB0 -b 921600 -v4
```

其中，--dev /dev/ttyUSB0为串口设备号，-b 921600为波特率。可以根据实际情况做出修改。

如果需要结束代理，请在终端按**Ctrl+C**退出代理。

> **注意**: 不可以直接关闭终端，否则docker会在后台继续运行。

### 代理启动失败的情况

microROS代理只能在一个终端开启，如果已经有终端在后台开启microROS代理，再次开启代理就会报错，请先在原来的代理终端按Ctrl+C退出代理后再运行代理。

如果因为直接关闭终端导致下一次启动代理失败的情况，可重启虚拟机/电脑解决，或者手动结束docker解决。

手动结束docker的方法：

请先查询出当前docker进行号，并结束当前代理docker进程。

```bash
docker ps -a | grep microros/micro-ros-agent
docker stop xxxxxxxxxx
```

---

## 📦 源码启动microros代理

### 安装tinyxml2依赖

在终端输入以下命令安装tinyxml2

```bash
cd ~/
git clone https://github.com/leethomason/tinyxml2.git
cd tinyxml2
mkdir build
cd build
sudo cmake ..
sudo make
sudo make install
```

### 安装python3-rosdep工具

在终端输入以下命令安装rosdep工具，已经安装过可跳过。

```bash
sudo apt install python3-rosdep
```

### 编译micro_ros_setup环境

激活ROS2环境变量，这里以humble版本为例，如果已激活可以跳过激活步骤。

```bash
source /opt/ros/humble/setup.bash
```

在用户目录下创建并进入工作空间uros_ws

```bash
mkdir ~/uros_ws && cd ~/uros_ws
mkdir src
```

下载micro_ros_setup文件到src文件夹

```bash
git clone -b $ROS_DISTRO https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
```

初始化rosdep

```bash
sudo rosdep init
```

如果出现网络问题，请加上-E参数

```bash
sudo -E rosdep init
```

如果以上步骤都报错，还是无法初始化rosdep，可以在/etc/ros/rosdep/sources.list.d/目录下新建20-default.list文件，并添加以下内容，然后进入下一步。

```yaml
# os-specific listings first
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/osx-homebrew.yaml osx

# generic
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/base.yaml
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/python.yaml
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/ruby.yaml

gbpdistro https://raw.githubusercontent.com/ros/rosdistro/master/releases/fuerte.yaml fuerte
```

更新rosdep和安装相关驱动包

```bash
rosdep update && rosdep install --from-paths src --ignore-src -y
```

编译工作空间

```bash
colcon build
```

激活micro_ros_setup环境

```bash
source install/local_setup.bash
```

### 编译micro_ros_agent环境

```bash
ros2 run micro_ros_setup create_agent_ws.sh
ros2 run micro_ros_setup build_agent.sh
```

如果在执行build_agent.sh编译时出现报错，请再次执行编译。

### 源码启动microros代理

激活micro_ros_agent代理环境

```bash
source ~/uros_ws/install/local_setup.sh
```

#### ROS2源码启动WIFI代理

```bash
ros2 run micro_ros_agent micro_ros_agent udp4 --port 8090 -v4
```

其中，--port 8090为网络端口号，-v4为LOG打印等级，数值越高打印越多。可以根据实际情况做出修改。

如果需要结束代理，请在终端按**Ctrl+C**退出代理。

#### ROS2源码启动串口代理

```bash
ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB0 -b 921600 -v4
```

其中，--dev /dev/ttyUSB0为串口设备号，-b 921600为波特率。可以根据实际情况做出修改。

如果需要结束代理，请在终端按**Ctrl+C**退出代理。

---

## 🔗 相关文档

- [[安装ESP32-microros组件]] - microROS组件安装
- [[开发环境搭建]] - 开发环境搭建
