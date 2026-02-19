---
title: ROS2简介
status: active
priority: medium
tags: [esp32/examples, ros2/basics]
aliases: [ROS2简介, ROS2概述]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706343978/ROS2简介.html
related:
  - [[MicroROS机器人控制板]]
  - [[ROS2基础概念]]
  - [[ROS2安装Humble]]
---

# ROS2简介

> ROS2是第二代的Robot Operating System，是ROS1的升级版本。

---

## 1 ROS2概述

ROS2是第二代的Robot Operating System，ROS1的升级版本，解决了ROS1存在的一些问题。ROS2最早出现的版本Arden是在2017年，随着版本的迭代，不断地更新与优化，现如今已经有了稳定的版本。与ROS1相比，Linux版本与ROS2版本的选择也是有关系的，两者对应的版本如下：

| ROS2版本 | Ubuntu版本 |
| --- | --- |
| Foxy | Ubuntu 20.04 |
| Galactic | Ubuntu 20.04 |
| Humble | Ubuntu 22.04 |

根据自己的Linux版本，下载对应的ROS2版本，本产品课程以Humble版本为基础。

---

## 2 ROS2特性

### 2.1 ROS2全面支持三种平台

- Ubuntu
- Mac OS X
- Windows 10

### 2.2 实现了分布式架构

取消Master中央节点，实现节点的分布式发现，发布/订阅，请求/响应通讯。

### 2.3 支持实时

### 2.4 使用新版本的编程语言

- C++11
- Python3.5+

### 2.5 使用了新的编译系统Ament（ROS为Catkin）

### 2.6 ROS1可以通过rosbridge和ROS 2通信

---

## 3 ROS2与ROS1的区别

### 3.1 平台

ROS1目前来说仅支持在Linux系统中运行使用，常见的是在Ubuntu中搭建使用。而ROS2目前在Ubuntu、Windows甚至嵌入式开发板上都可以搭建使用，平台更加广泛。

### 3.2 语言

- **C++**
    - ROS1的核心是C++03，而ROS2广泛使用C++11。

- **Python**
    - ROS1的Python使用版本是Python2，而ROS2使用的Python版本至少是3.5以上，Foxy使用的Python版本是3.8。

### 3.3 中间件

ROS1启动前需要开启roscore，这个master掌握所有的节点之间的通讯，而ROS2则没有，只有一个抽象的中间件接口，通过该接口进行传输数据。目前，此接口的所有实现都基于DDS标准。这使得ROS 2能够提供各种优质的Qos服务策略，从而改善不同网络的通信。

![image-20230427150532854](https://www.yahboom.com/public/upload/upload-html/1706343978/image-20230427150532854.png)

### 3.4 编译命令

ROS1的编译命令是catkin_make，而ROS2的编译命令使用colcon build命令。

---

## 相关文档

- [[ROS2安装Humble]] - ROS2安装步骤
- [[ROS2集成开发环境搭建]] - 开发环境配置
- [[ROS2基础概念]] - ROS2核心概念
