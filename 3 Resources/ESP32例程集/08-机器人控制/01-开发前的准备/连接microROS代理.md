---
title: 连接microROS代理
status: active
priority: medium
tags: [esp32/examples, robot-control/setup]
aliases: [连接microROS代理, 代理连接]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1708329272/连接microROS代理.html
related:
  - [[MicroROS机器人控制板]]
  - [[开发前的准备]]
  - [[机器人信息发布]]
---

# 连接microROS代理

> 连接microROS代理并与机器人通信。

---

## 一、开启代理

如果是使用出厂的虚拟机系统，可以在终端输入：

```bash
sh ~/start_agent_computer.sh
```

如果使用第三方虚拟机系统，则需要先安装docker开发环境，并打开终端输入：

```bash
docker run -it --rm -v /dev:/dev -v /dev/shm:/dev/shm --privileged --net=host microros/micro-ros-agent:humble udp4 --port 8090 -v4
```

---

## 二、连接代理

打开小车电源开关，自动连接代理，连接成功如下图所示：

![img](https://www.yahboom.com/public/upload/upload-html/1708329272/3bcf8f24-e94f-4076-95c5-0e11d55a7b0d.png)

> **注意**：如果未连接成功，请检查确认机器人的配置参数，是否能够正常连接到局域网，代理IP地址和端口号是否对应。

---

## 三、测试ROS节点

打开ROS2终端环境，输入以下命令查看/YB_Car_Node节点名称：

```bash
ros2 node list
```

![image-20240116115744689](https://www.yahboom.com/public/upload/upload-html/1708329272/image-20240116115744689.png)

如果搜索不到/YB_Car_Node节点，请检查确认虚拟机/电脑上.bashrc文件的ROS DOMAIN ID与microROS控制板上配置的一致才可以搜索到节点信息。

![image-20240116121146817](https://www.yahboom.com/public/upload/upload-html/1708329272/image-20240116121146817.png)

![image-20240116120703840](https://www.yahboom.com/public/upload/upload-html/1708329272/image-20240116120703840.png)

---

## 相关文档

- [[烧录出厂固件]] - 固件烧录
- [[microROS控制板配置参数]] - 配置说明
- [[机器人信息发布]] - 信息查询与控制
