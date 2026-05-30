---
title: 大疆A型板使用经验分享（一）——A型板使用入门
aliases:
  - DJI A型开发板入门
  - RoboMaster A型板使用教程
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[DJI]]"
  - "[[STM32]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/stm32
  - topic/embedded
  - type/tutorial
created: 2026-05-24
modified: 2026-05-24
source: https://blog.csdn.net/weixin_43361652/article/details/112814237
author: Cascatrix
---

# 大疆A型板使用经验分享（一）——A型板使用入门

> [!summary] 概述
> 本文分享了大疆A型开发板的使用经验，包括硬件配置（电源接口、电池、电池架、中心板连接）和软件配置（STM32 CubeMX + HAL库 + Keil5 开发环境搭建）。

---

## 写在前面

这半年有幸得到了一些资金支持，决定尝试用大疆的配件做一些有意义的东西。但是真正开始使用的时候却遇到了很多问题，大疆的产品从硬件到软件方面都有很多让人迷惑的行为，而同时网上的参考资料也很少，这些都让我在前期使用的时候摸不着头脑。后期虽然这些问题都得到了解决，但也浪费了大量时间。于是打算把我们使用的经历和相关代码做一个分享，以便后续其他人的使用。如有错误，希望指正。

---

## 一、硬件部分介绍

### A型开发板概述

这里使用的是大疆提供的 A 型开发板。使用大疆产品有个缺点便是大疆的接口都是配套产品而非通用产品，一旦使用了大疆的产品，大多数接口都不可替代，让你不得不继续购买大疆的产品。而大疆的产品价格又远高于通用产品的价格，这恐怕就是不会用大疆配件做产品的原因。

### 电源系统配置

仅仅有一个 A 型开发板事实上是无法做什么事情的（除了点灯和蜂鸣器...），通过 J-link 或是 ST-link 和 USB 所提供的电压仅能达到 3.3V，而 A 型板的 PWM 接口高电平为 5V，更不要说电机的驱动电压 12V 了。

#### 电源输入接口

A 型板的电源输入接口如下图所示：

![电源输入接口](https://i-blog.csdnimg.cn/blog_migrate/51817110af9545e540cebccdb75409c7.png)

从这个电源引脚就可以看出来大疆的接口属于自定义接口。

#### 完整电源配置

这个接口的供电绝非买一块电池那么简单。当你购买电池之后会发现电池根本没有接口和这个黄色的接口相连，于是乎，此时还需要一个电池架与电池相连：

![电池架连接](https://i-blog.csdnimg.cn/blog_migrate/608814add3f69ba5ae6cc310a49a334a.jpeg)

![电池架实物](https://i-blog.csdnimg.cn/blog_migrate/8697a45faae491a00f27d2e1c031229f.jpeg)

但是这样接出来的电源也无法和 A 型板上的电源线相连接，因此还需要一块中心板来进行分压：

![中心板分压](https://i-blog.csdnimg.cn/blog_migrate/e17a3e58c593981bd0ae49697e71b224.png)

#### 完整硬件配置

只有这些硬件都配备完成后，A 型板方可实现相关功能，为各个引脚提供足够的电平：

![完整硬件配置](https://i-blog.csdnimg.cn/blog_migrate/d5ab9aef1f2bf21cd77b16db359a18c7.jpeg)

### 硬件组成总结

| 组件 | 说明 |
|------|------|
| **A型开发板** | 主控板，STM32F427IIH6 芯片 |
| **电池** | 供电电源 |
| **电池架** | 电池与中心板的连接 |
| **中心板** | 分压和驱动功能 |
| **下载器** | J-Link、ST-Link 或其他调试器 |

### 注意事项

> [!warning] 重要提醒
> 通过上面的介绍可以看出，大疆的配件十分繁琐，并且价格比较高昂，因此除比赛外尽量不要尝试采用大疆配件制作相关产品，尽管其产品后期使用比较方便，且不用担心电压功率是否匹配等相关问题。

---

## 二、接口配置相关介绍

### 开发环境

由于大疆 A 型板使用的是 **STM32F427IIH6** 芯片，因此可以直接使用 STM32 的图形化界面对接口进行设置，CubeMX 配合 HAL 库使得对 STM32 芯片的配置更加方便，极大地减少了代码量。

| 软件 | 说明 |
|------|------|
| **Keil MDK-ARM 5** | 集成开发环境 |
| **STM32 CubeMX** | 图形化配置工具 |
| **HAL 库** | 硬件抽象层库 |

### STM32 CubeMX 配置步骤

#### 1. 新建项目

打开 STM32 CubeMX，新建一个项目：

![新建项目](https://i-blog.csdnimg.cn/blog_migrate/e4adec28ccbf670412d06295391276c9.png)

#### 2. 选择单片机型号

选择 **STM32F427IIH6** 芯片：

![选择芯片](https://i-blog.csdnimg.cn/blog_migrate/c6071f87bd8e03cda6af4c8c5160cb54.png)

#### 3. 引脚配置

在图形界面中对引脚进行相关设定：

![引脚配置](https://i-blog.csdnimg.cn/blog_migrate/8d23cf00f64a5cb71aab069e8fb3bb99.png)

#### 4. 时钟树配置

对时钟树进行设置，时钟频率将决定工作时间，影响 PWM、CAN、UART 等通讯速率：

![时钟配置](https://i-blog.csdnimg.cn/blog_migrate/136a38d2c75edb876618f83157db6190.png)

#### 5. 生成代码

配置无误后便可生成所需的 Keil project，此处应当注意 IDE 的选择应当选择为 **MDK-ARM V5**：

![生成代码](https://i-blog.csdnimg.cn/blog_migrate/6a4a64f2504b9a6d5f2d5df0a8e348f0.png)

Generate code 加载完成后 open project 即可。

### Keil5 项目配置

CubeMX 生成的 Keil 项目是基于 HAL 库所建立的，因此不必从零开始对单片机的各个引脚进行设定，HAL 库提供大量丰富的函数，减少了工作量。

#### 下载器配置

根据所选择下载器进行配置：

![下载器配置](https://i-blog.csdnimg.cn/blog_migrate/6b22289904e86afc7e1204a62135afe6.png)

确认配置无误：

![确认配置](https://i-blog.csdnimg.cn/blog_migrate/7556b44fab0b16d17459aa7353bbbf69.png)

#### 生成 HEX 文件

一定要生成 HEX 文件：

![生成HEX](https://i-blog.csdnimg.cn/blog_migrate/e6b36799bf8e9b735827d3f3008c5249.png)

#### 调试器设置

根据所选 Link 进行配置，选择完成后点击 Settings：

![调试器设置](https://i-blog.csdnimg.cn/blog_migrate/20d09e1e49ffb399a43d0244f1f4d3bd.png)

根据所选接口配置，如果无误，右侧将显示连接板子的型号，说明连接成功：

![连接成功](https://i-blog.csdnimg.cn/blog_migrate/c629affbcdb6912e572d8b260f767585.png)

#### 下载程序

如果代码和配置都没有问题，编译成功后下载即可，烧录成功将会提示：

![烧录成功](https://i-blog.csdnimg.cn/blog_migrate/b89aa4f2c6697aef261a8a55cd4e70f1.png)

---

## 三、总结

### 优点

| 优点 | 说明 |
|------|------|
| **功能强大** | 配件功能完善，性能优异 |
| **使用安全** | 设计规范，安全性高 |
| **方便快捷** | 后期使用方便，无需担心电压功率匹配问题 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **价格高昂** | 产品价格远高于通用产品 |
| **配件繁多** | 需要购买多个配套组件 |
| **接口专用** | 接口为自定义接口，不可替代 |

### 建议

> [!tip] 使用建议
> 总而言之，大疆的配件在功能上还是很强大的，使用起来安全性也比较高，但因为其价格高昂，配件繁多，并不适合用作比赛以外的其他产品，在选择使用时也应当多加斟酌。

---

## 相关链接

- [[开发板示例概览]] - 开发板示例索引
- [[开发板C型示例概览]] - C 型开发板示例
- [STM32 CubeMX 安装包](https://download.csdn.net/download/weixin_43361652/14900372)
- [Keil5 安装包](https://download.csdn.net/download/weixin_43361652/14913125)
- [原文链接](https://blog.csdn.net/weixin_43361652/article/details/112814237)

---

## 系列文章

本文是大疆 A 型板使用经验分享系列的第一篇：

| 序号 | 文章 | 说明 |
|------|------|------|
| 1 | **A型板使用入门**（本文） | 硬件配置与开发环境搭建 |
| 2 | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] | 原理图与引脚配置 |

---

## 导航

| 上一章 | 当前章 | 下一章 |
|--------|--------|--------|
| [[开发板示例概览]] | **A 型板使用入门** | [[大疆A型板使用经验分享（2）——A型板原理图和引脚图]] |
