---
title: 安装ESP32-microros组件
status: active
priority: medium
tags: [esp32/examples, development/microros]
aliases: [microros组件安装, ESP32 microROS安装]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346676/%E5%AE%89%E8%A3%85ESP32-microros%E7%BB%84%E4%BB%B6.html
related:
  - [[MicroROS机器人控制板]]
  - [[开发环境搭建]]
---

# 安装ESP32-microros组件

> 本节介绍如何安装ESP32的micro-ROS组件。

---

> **注意**: 由于micro_ros组件托管在GitHub上，下载文件可能因网络问题而失败。配套的虚拟机已经下载并编译好microros组件，非必要情况可不需重新安装ESP32-microros组件。

---

## ⬇️ 下载microros组件

下载microros组件到~/esp/Samples/extra_component，这里以下载humble版本为例.

```bash
mkdir -p ~/esp/Samples/extra_components
cd ~/esp/Samples/extra_components
git clone -b humble https://github.com/micro-ROS/micro_ros_espidf_component.git
cd micro_ros_espidf_component
```

micro_ros组件源码地址：[https://github.com/micro-ROS/micro_ros_espidf_component](https://github.com/micro-ROS/micro_ros_espidf_component)

---

## 🔧 激活ESP-IDF开发环境

在终端运行以下命令

```bash
source ~/esp/esp-idf/export.sh
```

> **注意**: 每次打开新终端都需要先激活ESP-IDF开发环境才可以编译ESP-IDF的工程。

---

## 📦 安装依赖

在终端运行以下命令

```bash
pip3 install catkin_pkg lark-parser empy colcon-common-extensions
```

> **注意**: 一定要先激活ESP-IDF开发环境后才运行以上的命令。

---

## ⚙️ 修改microros配置

默认的microros配置只支持1个节点，2个发布者，2个订阅者，1个服务，1个客户端，1个历史记录。

如果觉得不够用的情况，可以修改microros配置。如果现在不修改，后续使用不满足需求需要重新编译时，可输入以下命令清除microros编译生成的文件，再重新执行编译生成microros静态库。

```bash
cd ~/esp/Samples/extra_components/micro_ros_espidf_component/examples/int32_publisher
idf.py clean-microros
```

修改micro_ros_espidf_component目录下的colcon.meta文件，找到"rmw_microxrcedds"栏，然后根据实际修改。为了方便使用，将发布者、订阅者、历史记录都修改为3。

> **注意**: 由于单片机性能有限，刚好满足需求就可以了，避免资源浪费和影响通讯速度。

```json
"rmw_microxrcedds": {
    "cmake-args": [
        "-DRMW_UXRCE_XML_BUFFER_LENGTH=400",
        "-DRMW_UXRCE_TRANSPORT=udp",
        "-DRMW_UXRCE_MAX_NODES=1",
        "-DRMW_UXRCE_MAX_PUBLISHERS=3",
        "-DRMW_UXRCE_MAX_SUBSCRIPTIONS=3",
        "-DRMW_UXRCE_MAX_SERVICES=1",
        "-DRMW_UXRCE_MAX_CLIENTS=1",
        "-DRMW_UXRCE_MAX_HISTORY=3"
    ]
}
```

---

## 🔨 编译生成microros静态库

接着在终端运行以下命令。

```bash
cd ~/esp/Samples/extra_components/micro_ros_espidf_component/examples/int32_publisher
idf.py set-target esp32s3
```

编译完成后提示"Configuring done"和"Generating done"。

此时系统会自动下载需要的文件，并编译生成libmicroros.a静态库。

```bash
ls ../../*.a
```

---

## 💡 如何使用

编译生成了libmicroros.a静态库后则表示组装安装完成，接下来使用只需要把extra_components添加到项目的外部组件上即可。

在项目的根CMakeLists.txt文件中添加以下内容，其中"../../extra_components"根据实际路径替换。

```cmake
set (EXTRA_COMPONENT_DIRS "../../extra_components")
```

如果有需要修改microros的编译参数，可运行以下命令清除microros的缓存，然后重新编译生成libmicroros.a静态库就可以。

```bash
idf.py clean-microros
```

---

## 🔗 相关文档

- [[开发环境搭建]] - 开发环境搭建
- [[安装和启动microROS代理]] - microROS代理启动
