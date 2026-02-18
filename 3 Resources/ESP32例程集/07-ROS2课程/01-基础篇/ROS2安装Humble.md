---
title: ROS2安装Humble
status: active
priority: medium
tags: [esp32/examples, ros2/installation]
aliases: [ROS2安装Humble, ROS2安装]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706344024/ROS2安装Humble.html
related:
  - [[MicroROS机器人控制板]]
  - [[ROS2简介]]
  - [[ROS2集成开发环境搭建]]
---

# ROS2安装Humble

> ROS2-Humble对应的ubuntu系统是22.04。

---

## 1、设置语言环境

请先检查本地语言环境是否支持UTF-8编码，可调用如下指令检查并设置UTF-8编码：

```bash
locale  # 检查是否支持 UTF-8

sudo apt update && sudo apt install locales

sudo locale-gen en_US en_US.UTF-8

sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8

export LANG=en_US.UTF-8

locale  # 验证设置是否成功
```

> **注意**：语言环境可以不同，但必须支持UTF-8编码。

---

## 2、设置软件源

启动Ubuntu universe存储库：

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
```

将ROS 2 apt存储库添加到系统，用apt授权我们的GPG密钥：

```bash
sudo apt update && sudo apt install curl gnupg lsb-release -y

sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

将存储库添加到源列表：

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

---

## 3、安装Humble

首先更新apt存储库缓存：

```bash
sudo apt update
```

然后升级已安装的软件（ROS2软件包建立在经常更新的Ubuntu系统上，在安装新软件包之前请确保您的系统是最新的）：

```bash
sudo apt upgrade
```

安装桌面版ROS2（建议），包含：ROS、RViz、示例与教程，安装命令如下：

```bash
sudo apt install ros-humble-desktop python3-argcomplete
```

安装colcon构建工具：

```bash
sudo apt install python3-colcon-common-extensions
```

---

## 4、配置环境

终端下，执行ROS2程序时，需要调用如下命令配置环境：

```bash
source /opt/ros/humble/setup.bash
```

每次新开终端时，都得执行上述命令，或者也可以执行如下命令，将配置环境指令写入 `~/.bashrc` 文件，那么每次新启动终端时，不需要在手动配置环境：

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
```

到目前为止，ROS2就已经安装且配置完毕了。

---

## 5、关于卸载

ROS2安装完毕之后，如果想卸载ROS2，可以执行如下命令：

```bash
sudo apt remove ~nros-humble-* && sudo apt autoremove
```

还可以再删除ROS2对应的存储库：

```bash
sudo rm /etc/apt/sources.list.d/ros2.list
sudo apt update
sudo apt autoremove
sudo apt upgrade
```

---

## 相关文档

- [[ROS2简介]] - ROS2概述
- [[ROS2集成开发环境搭建]] - 开发环境配置
- [[ROS2工作空间]] - 工作空间管理
