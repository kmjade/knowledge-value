---
title: M5Stack硬件开发资源
status: active
priority: medium
tags: [knowledge/iot, m5stack, esp32, modular]
aliases: [M5Stack, 模块化开发板, ESP32 IoT开发]
created: 2026-02-19
modified: 2026-02-19
source: https://github.com/m5stack/M5_Hardware
related:
  - [[ESP32开发基础]]
  - [[机器人控制笔记]]
---

# M5Stack硬件开发资源

> M5Stack 是基于 ESP32 的模块化快速 IoT 开发套件，提供可堆叠的模块和友好的 IDE，支持快速原型开发、STEM 教育、工程和机械应用。

---

## 📋 平台概述

### 核心特性

- ✅ **模块化设计** - 可堆叠的模块系统，灵活组合
- ✅ **ESP32 核心** - 基于 ESP32/ESP32-S3 的主控芯片
- ✅ **用户友好 IDE** - 支持 UIFlow、Arduino、PlatformIO
- ✅ **开源硬件** - 硬件设计文件开源，支持二次开发
- ✅ **丰富生态** - Core、Atom、Stamp、Unit、Module 等系列
- ✅ **快速开发** - 模块化连接，无需焊接

### 技术特点

| 特性 | 说明 |
| --- | --- |
| 主控芯片 | ESP32 / ESP32-S3 / ESP32-C6 / ESP32-H2 |
| 开发环境 | UIFlow、Arduino IDE、PlatformIO |
| 通信接口 | I2C、UART、SPI、GPIO |
| 无线通信 | WiFi、蓝牙、LoRa、Thread |
| 电源 | USB-C 供电，支持锂电 |

---

## 🖥️ 产品系列

### Core 系列

核心控制板系列，提供完整的嵌入式控制解决方案。

| 产品 | 芯片 | 特点 |
| --- | --- | --- |
| Core | ESP32 | 经典核心板 |
| Core2 | ESP32 | 触屏显示 |
| Core3 | ESP32-S3 | 升级性能 |
| CoreS | ESP32-S3 | 紧凑设计 |
| CoreInk | ESP32 | 电子墨水屏 |
| CoreFire | ESP32-S3 | 高性能 |

### Stamp 系列

邮票孔式开发板，适合嵌入式集成。

| 产品 | 芯片 | 特点 |
| --- | --- | --- |
| StampPico | ESP32-P4 | 超小尺寸 |
| StampS3 | ESP32-S3 | Stamp 接口 |
| M5Stack Stamp | ESP32 | 标准邮票孔 |

### Atom 系列

紧凑型控制板，适合小空间应用。

| 产品 | 芯片 | 特点 |
| --- | --- | --- |
| Atom | ESP32 | 基础原子 |
| Atom Lite | ESP32 | 轻量版 |
| Atom Matrix | ESP32 | LED 矩阵 |
| Atom S3 | ESP32-S3 | 升级版本 |

### Unit 系列

各种传感器和功能单元模块。

**环境传感器：**
- 温湿度传感器
- 气压传感器
- 光照传感器
- 环境质量传感器

**显示与输入：**
- OLED 显示单元
- 触摸按键单元
- 旋转编码器

**运动控制：**
- 电机驱动单元
- 舵机控制单元
- 步进电机单元

**通信模块：**
- LoRa 单元
- GPS 单元
- CAN 总线单元

**电源模块：**
- 电源管理单元
- 电池充放电单元
- PoE 模块

### Module 系列

更复杂的功能模块。

| 类型 | 产品 |
| --- | --- |
| GPS | GPS 模块 |
| LoRa | LoRa 通信模块 |
| CAN | CAN 总线模块 |
| Power | 电源模块 |
| Proto | 原型开发板 |

### Card 系列

基于 ESP32 的开发卡产品。

### AI 产品

**AI 计算盒系列：**
- AI Pyramid Computing Box Pro 8GB (AX8850)
- AI Pyramid Computing Box 4GB (AX8850)
- AI-8850 LLM Accelerator M.2 Kit 8GB (AX8850)

---

## 🛠️ 硬件设计资源

### GitHub 硬件仓库

[GitHub - m5stack/M5_Hardware](https://github.com/m5stack/M5_Hardware)

包含以下资源：

#### KiCAD 库

M5Stack KiCad 元件库，用于 KiCad 版本 7。

**目录结构：**
```
KiCAD/
├── M5KiCad/
│   ├── M5KiCad.3d/          # 3D 模型文件
│   ├── M5KiCad.pretty/         # 封装库
│   ├── My_Symbols.kicad_sym    # 符号库
│   └── README.md
└── Projects/
    └── ExtPortForCore2_doc/
```

**3D 模型使用：**

1. 打开 `Preferences` → `Configure Paths...`
2. 创建新变量：
   - Name: `KICAD_M5STACK`
   - Path: `/path/to/M5KiCad`
3. KiCad 将自动加载 3D 模型

#### PCB 文件

**Atomic 系列：**
- Atomic-Type-A.PcbDoc
- Atomic-Type-A.dxf
- Atomic-Type-A.step
- Atomic_V1.0.PcbDoc

**Unit 系列：**
- UNIT-TYPE-A.PcbDoc / .step / .dxf
- UNIT-TYPE-B.PcbDoc / .step / .dxf
- UNIT-TYPE-C.PcbDoc / .step / .dxf

**Module 系列：**
- Module-Type-A.PcbDoc / .step / .dxf
- Module-Type-B.PcbDoc / .step / .dxf
- Bus Module.PcbDoc
- PROTO_254.PcbDoc

#### 结构文件

**STL 3D 打印文件：**
- BackOfHatAndC.STL
- Base26_main.stl
- Frame_M5Stack-20210506.stl
- M5-Atomic-3D.stp
- M5StickC+Joys.STL
- PROTO.stl
- Rockercap.STL
- core.stl
- stick-co.stl / stick-t.stl / stick_plus.stl

**DXF 工程图文件：**
- BaseX_DB9_01.dwg / .dxf
- FACE_BLANK.dwg
- M5数码量角器-2D.dxf
- Oscilloscope_Case.dwg

**STEP CAD 模型文件：**
- Base26_main.stp
- M5-数码量角器3D.stp
- watch_bottom.stp

#### 原理图

- Base26_DMX_V1.0_Main.pdf
- DMX-sub_V1.0.pdf

---

## 💻 开发环境

### UIFlow

M5Stack 官方的可视化编程环境。

**特点：**
- 拖拽式积木编程
- 基于浏览器，无需安装
- 支持直接下载到设备
- 适合初学者和 STEM 教育

### Arduino IDE

使用 Arduino IDE 进行开发。

**设置步骤：**
1. 添加 M5Stack 开发板 URL
2. 安装 M5Stack 开发板包
3. 选择对应开发板
4. 编写并上传代码

### PlatformIO

VS Code 集成开发环境。

**特点：**
- 代码智能补全
- 自动构建和上传
- 支持多种框架
- 团队协作友好

---

## 🔧 硬件开发指南

### KiCad 设计流程

1. **安装 KiCad**
   - 下载 [KiCad EDA](https://kicad.org/)
   - 安装版本 7 或更高

2. **配置 M5Stack 库**
   - 设置环境变量 `KICAD_M5STACK`
   - 指向 `KiCAD/M5KiCad` 目录

3. **创建项目**
   - 使用 M5Stack 符号和封装
   - 引用 3D 模型进行可视化

4. **导出文件**
   - 导出 Gerber 用于生产
   - 导出 BOM 用于采购

### 模块扩展开发

#### Atomic 扩展

Atomic 系列模块使用 Type-A 接口，包含：
- 电源引脚
- I2C 总线
- GPIO 引脚

#### Unit 扩展

Unit 系列模块使用标准接口：
- Type-A：基础传感器单元
- Type-B：高级功能单元
- Type-C：特殊功能单元

#### Chain 系列

新推出的 Chain 系列提供更灵活的扩展方式：
- ChainBUS (STM32G031)
- Chain ToF (VL53L0)
- Chain Mount Brick
- Chain Encoder
- Chain Mechanical Key Button
- Chain Joystick
- Chain Dual Key (ESP32-S3)

---

## 📚 文档资源

### 官方文档

- [M5Stack 文档中心](https://docs.m5stack.com/) - 产品参考文档
- [GitHub 仓库](https://github.com/m5stack) - 固件、示例和硬件规格
- [M5Stack 官方商店](https://shop.m5stack.com/) - 产品列表和购买

### 文档内容

- **快速开始** - 入门指南
- **硬件规格** - 数据手册、引脚定义
- **教程** - 电路图和原理图
- **示例** - Arduino/PlatformIO 示例代码
- **UIFlow 指南** - 可视化编程教程
- **产品手册** - 组装说明

---

## 🎯 学习路径

### 入门路径

1. 选择合适的 Core 产品
2. 使用 UIFlow 进行可视化编程
3. 学习 Arduino 基础
4. 尝试简单的 Unit 模块

### 进阶路径

1. 掌握 PlatformIO 开发
2. 学习多个模块的组合使用
3. 理解硬件接口协议（I2C、UART、SPI）
4. 开发自定义应用

### 高阶路径

1. 使用 KiCad 设计自定义 PCB
2. 学习 ESP32 深度开发
3. 研究通信协议和系统集成
4. 开发商业级产品

---

## 🔗 相关资源

### 官方链接

- [M5Stack 官网](https://www.m5stack.com/)
- [M5Stack 商店](https://shop.m5stack.com/)
- [M5Stack 文档](https://docs.m5stack.com/)
- [M5Stack GitHub](https://github.com/m5stack)

### GitHub 仓库

- [M5Stack Hardware](https://github.com/m5stack/M5_Hardware) - 硬件设计文件
- [M5Stack Firmware](https://github.com/m5stack/M5Stack) - 固件代码
- [M5Stack UIFlow](https://github.com/m5stack/M5Stack_UIFlow) - UIFlow 源码

### 社区资源

- [M5Stack 论坛](https://community.m5stack.com/)
- [官方教程](https://docs.m5stack.com/tutorials)
- [示例代码](https://github.com/m5stack/M5_Examples)

---

## 🛒 产品分类索引

### 按用途分类

| 用途 | 推荐产品 |
| --- | --- |
| 快速原型 | Core 系列 + Unit 系列 |
| 嵌入式集成 | Stamp 系列 |
| 小空间应用 | Atom 系列 |
| AI 应用 | AI Pyramid Computing Box |
| 通信 | LoRa Unit / GPS Unit / CAN Module |
| 显示 | CoreInk / OLED Unit |
| 传感器 | 温湿度单元 / 环境质量单元 |
| 运动控制 | 电机驱动单元 / 舵机控制 |

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
