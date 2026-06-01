---
title: "[传统界面路由器] 如何远程管理二级路由器？ - TP-LINK 服务支持"
source: "https://service.tp-link.com.cn/detail_article_3846.html"
author:
published:
created: 2026-06-01
description:
tags:
  - "clippings"
---
#### \[传统界面路由器\] 如何远程管理二级路由器？

**应用介绍**

局域网中使用多个路由器并采用了 LAN-WAN 级联的方式来组网，如下图：

![](https://service.tp-link.com.cn/pages/imageuploadfolder/201706/20170608163613_9500.png?image_process=resize,w_1920&x-oss-process=image/interlace,1)

如果需要在外网远程登录管理二级路由器，可通过远端 WEB 管理 + 端口映射的方法实现需求，本文介绍传统界面路由器 LAN-WAN 级联的情况下，从外网远程登陆和管理二级路由器的方法。

**注意：** 如果是LAN-LAN级联，只需将二级路由视为一台电脑或者服务器，在一级路由器中设置虚拟服务器即可。

**设置方法**

1.**二级路由器** **WAN** **口设置静态** **IP**

修改二级路由器的 WAN 口上网方式为静态 IP （注意：如不会设置二级路由器，请点击参考文档： [\[传统界面\] 路由器 LAN-WAN 级联的设置方法](http://service.tp-link.com.cn/detail_article_3716.html) ）如下图：

![](https://service.tp-link.com.cn/pages/imageuploadfolder/201706/20170608163646_2230.png?image_process=resize,w_1920&x-oss-process=image/interlace,1)

注意：二级路由器设置静态 IP 之前，需修改二级路由器和主路由器 LAN 口 IP 在不同网段，假如主路由器的 LAN 口 IP 都是 192.168.1.1 ，建议修改二级路由器 LAN 口 IP 为 192.168.2.1 ，设置方法：登陆二级路由器管理界面，点击 “ 网络参数 ”>“LAN 口设置 ” ， IP 地址改为 192.168.2.1 ，点击 “ 保存 ” 。如下图：

![](https://service.tp-link.com.cn/static/blank.gif)

2.**开启远程** **WEB** **管理**

登录二级路由器管理界面，点击 “ 安全功能 ” \>“ 远端 WEB 管理 ” ， “WEB 管理端口 ” 改为 9090 ， “ 远端 WEB 管理 IP 地址 ” 输入： 255.255.255.255 ，点击确定，即允许外网所有电脑远程管理路由器，如下图：

![](https://service.tp-link.com.cn/static/blank.gif)

**注意** ：

1 、 WEB 管理端口建议不要设置为常用端口，如 80,443 等，避免冲突。

2 、修改管理端口后，内网电脑使用 http://IP:端口（如 http://192.168.2.1:9090 ）管理。

3.**在主路由器中设置虚拟服务器**

在主路由器中设置虚拟服务器，将二级路由器 WAN 口的 IP 地址（本例为 192.168.1.2 ）以及远端 WEB 管理中设置的端口号（本例为 9090 ）映射到外网。设置方法如下：

登陆主路由器管理界面，点击 “ 转发规则 ” \> “ 虚拟服务器 ” ，如下图：

![](https://service.tp-link.com.cn/static/blank.gif)

点击 “ 添加新条目 ” ， “ 外部端口号 ” 、 “ 内部端口号 ” 都输入 9090 ， “IP 地址 ” 输入 192.168.1.2 ， “ 状态 ” 选择 “ 生效 ” ，点击 “ 保存 ” ，如下图：

![](https://service.tp-link.com.cn/static/blank.gif)

**注意：**

1 、外部端口号可自定义设置外网访问的端口（可与内部端口不同），但不能与其他常用端口或其他虚拟服务器映射的端口冲突；

**2** **、** 部分传统界面的路由器，只有内部端口，没有外端端口的设置。

4.**远程管理路由器**

外网电脑可以通过您前端主路由器的 WAN 口 IP 和您虚拟服务器中设置的外部端口号 **http://WAN** **口** **IP:****端口** 远程登录和管理路由器：

![](https://service.tp-link.com.cn/static/blank.gif)

**注意：** 如果您前端主路由器 WAN 口 IP 地址是变化的，您需要在主路由器上登录 DDNS 动态域名，然后通过 **http://** **域名****:****端口** 远程管理二级路由器。