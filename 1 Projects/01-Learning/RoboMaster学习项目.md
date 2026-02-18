---
title: RoboMaster 学习项目
tags:
  - para/project/learning
  - 技术/机器人
  - 技术/编程
status: active
priority: high
due: 2026-03-31
aliases:
  - RoboMaster学习
  - 机甲大师学习项目
  - RoboMaster EP学习
cssclasses:
  - project-note
created: 2026-02-19
---

# RoboMaster 学习项目

> [!info] 项目概述
> 学习和使用RoboMaster EP教育机器人的编程与开发，掌握Python SDK、拓展模块使用和多机控制技术。

## 📋 项目目标

- [x] 了解RoboMaster EP教育机器人基础功能
- [ ] 完成Python SDK环境配置与安装
- [ ] 掌握机器人基础控制（底盘、云台、发射器）
- [ ] 学习拓展模块使用（机械臂、传感器、舵机）
- [ ] 实现多机编队控制
- [ ] 开发自定义应用场景

## 📅 时间规划

| 阶段 | 任务 | 截止日期 | 状态 |
|------|------|----------|------|
| 第一阶段 | 环境搭建与基础学习 | 2026-02-25 | 进行中 |
| 第二阶段 | SDK API深入学习 | 2026-03-05 | 待开始 |
| 第三阶段 | 拓展模块实践 | 2026-03-15 | 待开始 |
| 第四阶段 | 多机控制与进阶 | 2026-03-31 | 待开始 |

## 🎯 学习内容

### 基础知识

RoboMaster EP教育拓展套装在RoboMaster S1教育机器人的基础上延展出丰富的拓展性，配有完善的课程内容及全新RoboMaster青少年专属赛事。

#### 机器人形态

> [!note] 机器人类型
> RoboMaster EP教育套装可以组装出**步兵机器人**或**工程机器人**。

**步兵机器人**：
- 外观与常规版本S1较为接近
- 软硬件上进行了升级
- 增加了许多新部件
- 极大提升了拓展能力
- 可通过传感器转接模块接入第三方传感器

**工程机器人**：
- 基于S1做了较大改动
- 采用并联机械臂代替云台结构
- 保留了图传系统
- 机械臂末端装配机械夹爪
- 可执行更复杂的任务

### 编程方式

本网站提供了多种编程方式：

1. **官方App编程**
   - Scratch编程
   - Python编程（内置环境）

2. **Python SDK**
   - 基于Python语言实现
   - 适用于RoboMaster EP和Tello Edu等系列产品
   - 提供丰富的API接口：运动控制、飞行控制、智能识别、灯效设置、数据推送、视频流和音频流

3. **明文SDK**
   - 第三方平台与EP建立连接后使用
   - 可使用C++、C#、Python或其他语言
   - 适用于更复杂的二次开发

### 环境要求

#### Windows
- Windows 10 64位
- Python 3.6.6至3.8.9版本
- 64位python.exe
- 可选：VC库环境、VC build tools

#### Ubuntu
- Ubuntu 16.04 64位
- Python 3.7.8

#### macOS
- 支持 macOS X平台

## 🔗 相关资源

- [[RoboMaster SDK技术文档]] - SDK详细使用指南
- [[RoboMaster拓展模块说明]] - 机械臂、传感器等模块文档
- [[RoboMaster明文SDK与协议]] - 明文SDK协议文档
- [[RoboMaster API参考]] - 完整API索引

## 📚 学习进度

### 第一阶段：环境搭建与基础学习

- [x] 阅读官方文档
- [ ] 安装Python环境
- [ ] 安装RoboMaster SDK
- [ ] 连接机器人
- [ ] 运行第一个示例程序

### 第二阶段：SDK API深入学习

- [ ] 查询类接口使用
- [ ] 设置类接口使用
- [ ] 动作类接口使用
- [ ] 多媒体接口使用

### 第三阶段：拓展模块实践

- [ ] 机械臂与机械爪控制
- [ ] 舵机控制
- [ ] 红外深度传感器使用
- [ ] 传感器转接模块使用

### 第四阶段：多机控制与进阶

- [ ] 多机编队控制
- [ ] 多机API使用
- [ ] 实际应用场景开发

## 📝 学习笔记

### 连接方式

RoboMaster EP可通过以下方式与PC建立连接：

1. **WIFI连接**
   - 直连模式
   - 路由器模式

2. **USB连接**

3. **UART连接**

### SDK安装命令

```bash
# 安装RoboMaster SDK
pip install robomaster

# 使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple robomaster

# 升级SDK
pip install --upgrade robomaster
```

## 🔗 外部链接

- [RoboMaster Developer Guide](https://robomaster-dev.readthedocs.io/zh-cn/latest/index.html)
- [RoboMaster SDK GitHub](https://github.com/dji-sdk/RoboMaster-SDK)

## 💡 下一步行动

1. 在Windows上安装Python 3.7.8（64位）
2. 安装RoboMaster SDK
3. 连接EP机器人
4. 运行第一个Python程序

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/project/learning #技术/机器人 #技术/编程
