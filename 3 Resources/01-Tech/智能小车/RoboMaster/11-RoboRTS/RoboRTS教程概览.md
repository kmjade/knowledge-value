---
title: RoboRTS 教程概览
aliases:
  - RoboRTS Tutorial
  - RoboMaster AI 机器人平台
  - RoboRTS 机器人实时系统
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/robotics
  - topic/autonomous
  - type/moc
created: 2026-05-23
modified: 2026-05-23
source: https://github.com/RoboMaster/RoboRTS-Tutorial
---

# RoboRTS 教程概览

> [!info] 概述
> RoboMaster 2019 AI 机器人平台完整教程，基于 ROS 的自主移动机器人系统，涵盖感知、定位、决策、规划、控制全栈技术。

---

## 项目信息

| 项目 | 说明 |
|------|------|
| **项目名称** | RoboRTS (RoboMaster Real-Time System) |
| **GitHub** | https://github.com/RoboMaster/RoboRTS-Tutorial |
| **在线文档** | https://robomaster.github.io/RoboRTS-Tutorial/ |
| **Stars** | 89+ |
| **开发语言** | C++ |
| **框架** | ROS (Robot Operating System) |
| **适用赛事** | ICRA 2019 RoboMaster AI Challenge |

---

## 系统架构

### 双层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    上位机层 (Manifold 2/Jetson)              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ 定位    │ │ 感知    │ │ 决策    │ │ 规划    │ │ 追踪  │ │
│  │AMCL    │ │Detection│ │Decision │ │Planning │ │Tracking│ │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └────────┘ │
│                         ROS 生态                             │
├─────────────────────────────────────────────────────────────┤
│                      串口通信 (921600 bps)                   │
├─────────────────────────────────────────────────────────────┤
│                    底层控制层 (STM32F427)                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ 底盘    │ │ 云台    │ │ 发射    │ │ 传感器  │           │
│  │Chassis │ │ Gimbal  │ │ Shooter │ │ Sensor  │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                        RTOS                                  │
└─────────────────────────────────────────────────────────────┘
```

### 数据流

```
传感器 → 感知 → 定位 → 决策 → 规划 → 控制 → 执行器
  │        │       │       │       │       │
相机/激光  装甲板  AMCL   行为树   A*/DWA  电机
```

---

## ROS 包结构

| 包名 | 功能 | 文档 |
|------|------|------|
| `roborts` | 元包 | - |
| `roborts_base` | 底层通信接口 | [[roborts_base]] |
| `roborts_camera` | 相机驱动 | [[roborts_camera]] |
| `roborts_common` | 通用工具库 | - |
| `roborts_decision` | 决策框架 | [[roborts_decision]] |
| `roborts_detection` | 视觉算法 | [[roborts_detection]] |
| `roborts_localization` | 定位系统 | [[roborts_localization]] |
| `roborts_costmap` | 代价地图 | [[roborts_planning]] |
| `roborts_msgs` | 自定义消息 | - |
| `roborts_planning` | 运动规划 | [[roborts_planning]] |
| `roborts_bringup` | 启动包 | [[roborts_bringup]] |
| `roborts_tracking` | 视觉追踪 | - |

---

## 教程目录

### 一、概述

| 章节 | 说明 | 文档 |
|------|------|------|
| RoboRTS 介绍 | 平台概述 | [[roborts]] |
| 硬件规格 | 详细硬件参数 | [[hardware_specifications]] |
| 软件框架 | 软件架构说明 | [[software_framework]] |
| 相关资源 | 文档与代码仓库 | [[resources]] |

### 二、快速入门

| 章节 | 说明 | 文档 |
|------|------|------|
| Manifold 2 配置 | 机载电脑环境配置 | [[setup_on_manifold2]] |
| 快速测试 | 系统测试指南 | [[quick_test]] |

### 三、开发指南

| 章节 | 说明 | 文档 |
|------|------|------|
| 前置知识 | C++、CMake、ROS 基础 | [[pre_requisites]] |
| 代码规范 | 编码风格与规范 | [[code_style]] |
| 文档预览 | 本地文档搭建 | [[docs_preview]] |

### 四、SDK 文档

| 章节 | 说明 | 文档 |
|------|------|------|
| 架构概览 | 系统架构详解 | [[architecture]] |
| roborts_base | 底层通信 | [[roborts_base]] |
| roborts_camera | 相机驱动 | [[roborts_camera]] |
| roborts_detection | 装甲板检测 | [[roborts_detection]] |
| roborts_localization | AMCL 定位 | [[roborts_localization]] |
| roborts_decision | 行为树决策 | [[roborts_decision]] |
| roborts_planning | 运动规划 | [[roborts_planning]] |
| roborts_bringup | 系统启动 | [[roborts_bringup]] |

---

## 硬件平台

### 开发板

| 组件 | 型号 |
|------|------|
| **主控** | STM32F427 (RoboMaster 开发板 A 型) |
| **机载电脑** | DJI Manifold 2 / Intel NUC / Jetson TX1/TX2/Xavier |

### 电机系统

| 电机 | 型号 | 用途 |
|------|------|------|
| 底盘电机 | M3508 P19 | 麦轮驱动 |
| 云台电机 | GM6020 | Pitch/Yaw |
| 供弹电机 | M2006 P36 | 弹仓供弹 |
| 发射电机 | DJI Snail 2305 | 摩擦轮 |

### 传感器

| 传感器 | 用途 |
|------|------|
| 相机 | 视觉识别 |
| 激光雷达 | 环境感知 |
| IMU | 姿态测量 |
| UWB | 室内定位 |

### 性能参数

| 参数 | 值 |
|------|-----|
| 最大前进速度 | 3 m/s |
| 最大横向速度 | 2 m/s |
| 云台俯仰范围 | -20° ~ 20° |
| 云台偏航范围 | -90° ~ 90° |
| 最大射速 | 10 发/秒 |
| 弹丸初速 | 25 m/s |

---

## 技术栈

### 编程语言

| 语言 | 用途 |
|------|------|
| **C++** | 主要开发语言 |
| **Python** | ROS 脚本 |
| **CMake** | 构建系统 |

### 框架与库

| 框架/库 | 用途 |
|---------|------|
| **ROS** | 机器人操作系统 |
| **Eigen3** | 线性代数 |
| **OpenCV** | 图像处理 |
| **Glog** | 日志系统 |
| **Protobuf** | 参数配置 |

### 核心算法

| 算法 | 模块 |
|------|------|
| AMCL | 定位 |
| 粒子滤波 | 定位 |
| A*/Dijkstra | 全局规划 |
| DWA/TEB | 局部规划 |
| 行为树 | 决策 |
| PnP | 姿态估计 |
| 约束集检测 | 装甲板识别 |

---

## 快速开始

### 环境准备

```bash
# 安装 ROS (Ubuntu 18.04 + Melodic)
sudo apt install ros-melodic-desktop-full

# 克隆代码
git clone https://github.com/RoboMaster/RoboRTS.git
git clone https://github.com/RoboMaster/RoboRTS-Firmware.git
```

### 编译运行

```bash
# 编译 RoboRTS
cd RoboRTS
catkin_make

# 启动机器人
roslaunch roborts_bringup roborts.launch
```

---

## 代码仓库

| 仓库 | 说明 | 链接 |
|------|------|------|
| **RoboRTS** | ROS 上位机代码 | [GitHub](https://github.com/RoboMaster/RoboRTS) |
| **RoboRTS-Firmware** | STM32 底层代码 | [GitHub](https://github.com/RoboMaster/RoboRTS-Firmware) |
| **RoboRTS-Tutorial** | 教程文档 | [GitHub](https://github.com/RoboMaster/RoboRTS-Tutorial) |

---

## 学习资源

### 推荐书籍

| 书籍 | 说明 |
|------|------|
| 《C++ Primer》 | C++ 基础 |
| 《Probabilistic Robotics》 | 概率机器人 |
| 《A Gentle Introduction to ROS》 | ROS 入门 |

### 在线课程

| 课程 | 平台 |
|------|------|
| Artificial Intelligence for Robotics | Udacity |

### 相关文章

- [从 RoboMaster AI 挑战赛到移动机器人系统的入坑指南](https://zhuanlan.zhihu.com/p/44117460)

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[../RoboMaster开发指南]] | **RoboRTS 教程概览** | [[architecture]] |

---

## 相关链接

- [[../RoboMaster开发指南]] - RoboMaster 知识库主页
- [[../10-开发板C型示例/开发板C型示例概览]] - 开发板 C 型教程
- [RoboRTS GitHub](https://github.com/RoboMaster/RoboRTS)
- [在线文档](https://robomaster.github.io/RoboRTS-Tutorial/)
