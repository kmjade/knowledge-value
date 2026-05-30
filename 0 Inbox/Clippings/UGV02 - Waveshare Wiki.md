---
title: "UGV02 - Waveshare Wiki"
source: "https://www.waveshare.net/wiki/UGV02"
author:
published:
created: 2026-05-29
description:
tags:
  - "clippings"
---
[![UGV02](https://www.waveshare.net/w/upload/thumb/8/8c/UGV02-1.jpg/360px-UGV02-1.jpg)](https://www.waveshare.net/shop/UGV02.htm "UGV02")

<table><tbody><tr><td></td><td></td><th colspan="2" width="90%"><font>功能简介</font></th><td></td><td></td></tr><tr><td colspan="6"><table><tbody><tr><td><small><b>特性</b></small></td><td colspan="3"><small>UGV02 六轮四驱机器人底盘</small></td></tr><tr><td><small><b>接口</b></small></td><td><small><a href="https://www.waveshare.net/w/index.php?title=%E5%88%86%E7%B1%BB:TTL%E6%80%BB%E7%BA%BF%E8%88%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E6%8E%A5%E5%8F%A3%E6%8E%A5%E5%8F%A3&action=edit&redlink=1">TTL总线舵机控制接口</a></small></td><td><small><a href="https://www.waveshare.net/wiki/%E5%88%86%E7%B1%BB:I2C%E6%8E%A5%E5%8F%A3">I2C</a></small></td><td><small><a href="https://www.waveshare.net/wiki/%E5%88%86%E7%B1%BB:UART%E6%8E%A5%E5%8F%A3">UART</a></small></td></tr></tbody></table></td></tr></tbody></table>

## 产品介绍

UGV02 是一款具备超强的越野能力和抗震性能的六轮四驱移动机器人底盘，开源全部代码方便用户进行二次开发。支持扩展多种上位机（树莓派、Jetson Nano、地平线旭日X3等），上位机通过串口与 ESP32 下位机进行通信。

内置 3S 18650 锂电池 UPS 供电模块( 3 节 18650 锂电池串联)，支持为机器人提供持续能量来源的同时也支持给机器人充电。内置多功能机器人驱动板，可扩展总线舵机、PWM 舵机、SD 卡等功能，驱动板基于 ESP32，板载 WIFI 和蓝牙。

它采用了柔软的橡胶轮胎，极大减少了复杂地形冲击，并配有两条 1020 欧标型材扩展导轨，使其轻松满足重载、避震、越野等要求，为二次开发提供了更多的可行性。

## 产品特性

- 配有 203mm 间距的 1020 铝型材扩展导轨（包含船型螺母和螺丝）可灵活扩展多种外设；
- 采用柔软的橡胶轮胎，大幅度减少复杂地形对产品的冲击；
- 采用六轮四驱的驱动方式，拥有优秀的爬坡能力；
- 搭载交互设备 0.96inch OLED 屏幕；
- 带有充电接口和自动下载电路，你可以边充电边使用；
- UPS 供电模块板载 INA219 采集芯片，方便实时监控电池电压，充电电流；
- UPS 供电模块三节串联 18650 电池，7800mAh 大容量，输出电流更大，电机动力更强；
- UPS 供电模块还提供输出 5V 和 3.3V 用于扩展其它设备；
- UPS 供电模块板载锂电池保护电路，具有防过充、防过放、防过流和短路保护功能；
- 例程代码使用 Arduino IDE 开发，不需要手动配置编译环境，ESP32 开机自动建立 WIFI 热点，可使用手机（Android/iOS）或电脑（Linux/Windows/Mac）连接并登录到控制页面，只需安装基于 Chromium 内核的浏览器即可，不需要下载 app；
- 下位机 ESP32 可用于驱动直流电机、总线舵机，板载 OLED 屏幕接口、TF 卡槽、九轴 IMU 模块、WiFi 和蓝牙，即使不安装上位机也可以单独使用；
- 可扩展多种上位机,使用串口来传输 JSON 格式的数据来控制；
- 全部代码开源并提供丰富的开发文档和教程；
- 开源扩展平面图纸和底盘结构图纸，包括 3D 模型，方便进行二次开发；
- JSON 指令可通过串口、USB、HTTP、ESP-NOW 等方式下达；
- 绝大部分配置设置可由 JSON 指令实现，例如不需要连接 USB 线即可为产品配置 WIFI 连接。

## 产品固件更新

- 如果你的机器人开机时 OLED 屏幕上显示 UGV Rover Version:0.96 ，说明机器人产品上的驱动程序已经是新版的程序了，就不需要再执行本部分内容给产品进行更新了；
- 如果你的机器人开机时 OLED 屏幕上没有显示 UGV Rover Version:0.96，说明此时机器人产品上的驱动程序依旧是老版的程序，则需要执行本部分内容给产品进行更新；如果需要恢复出厂设置，也可以通过本部分内容进行。

我们提供 UGV02 的 ESP32 下载工具，使用这款工具，用户可以快速给产品更新固件或还原至出厂程序。

**1.** 首先，使用 USB 线连接机器人和你的电脑。（此步骤需要拆开机器人才能完成，拆开机器人后连接机器人驱动板中间那个的 USB 接口）。

**2.** 下载 UGV02 的 ESP32 下载工具： [UGV02 的 ESP32 下载工具](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV02_FACTORY_250226.zip "文件:UGV02 FACTORY 250226.zip") ，下载后解压缩，双击打开“flash\_download\_tool\_3.9.5.exe”程序。打开后，会弹出两个窗口，我们需要操作的是下载工具的 UI 界面，而另一个窗口作为终端来显示下载工具的工作状态。

**3.** 在“DOWNLOAD TOOL MODE”这个界面，Chip Type 选择为 ESP32，WorkMode 选择为 Factory，使用 Factory，调用二进制文件时才会使用相对路径，就不需要用户手动输入二进制文件路径，选择好后点击OK。

[![WAVEROVER下载工具.png](https://www.waveshare.net/w/upload/f/f5/WAVEROVER%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:WAVEROVER%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7.png)

**4.** 在这个软件界面中，保持“LockSettings”的勾选，右边代表的是可以同时给 8 个 UGV02 上传程序。点击“COM”，选择新出现的 COM（我这里新出现的 COM 为 COM3）；BAUD 是用于设置下载速度，越高速度越快，ESP32 最高可以使用 921600。

[![UGV02Factory.png](https://www.waveshare.net/w/upload/thumb/0/07/UGV02Factory.png/800px-UGV02Factory.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV02Factory.png)

**5.** 选择好后，点击 START 开始上传程序，上传完成后，“IDLE 等待”会变成“FINISH 完成”，完成后可以断开驱动板与电脑的 USB 连接，打开机器人产品的开关，通电后即可控制机器人。

[![UGV02Factory1.png](https://www.waveshare.net/w/upload/thumb/5/56/UGV02Factory1.png/800px-UGV02Factory1.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV02Factory1.png)

## 产品基础使用

### 使用前注意事项（必读！！）

**使用前请务必了解以下内容：**

1. 该产品出厂未安装锂电池，需要客户自行安装好 3 个 18650 锂电池才可以正常使用。海外版的客户需要自行购买 3 颗 18650 锂电池， 推荐使用 2200mA 或以上容量，放电倍率 4C 的 18650 锂电池。
2. 首次接上电池需注意电池模块上是否有 LED 灯亮，如果 LED 灯亮则表示电池的正负极接反，电池未接反不会有 LED 灯亮，请检查并确保电池未接反。电池接反的情况下禁止充电，否则有几率引起爆炸。
3. 该产品不能受到剧烈的撞击，且不防水、不防沙。

### 电池安装

**1.** 先将小车底盘的这 4 个黑色金属杯头内六角螺丝 M3\*6 拧下，见下图红圈处。

[![Ugv02battery.png](https://www.waveshare.net/w/upload/thumb/5/59/Ugv02battery.png/500px-Ugv02battery.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:Ugv02battery.png)

**2.** 接着将 3 颗 18650 锂电池放入至电池模块中。（注意：电池模块上有正负极标注，如果电池模块上 LED 灯亮则表示电池的正负极接反，电池未接反不会有 LED 灯亮）

[![Ugv02battery1.png](https://www.waveshare.net/w/upload/c/c9/Ugv02battery1.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:Ugv02battery1.png)

**3.** 放入后再用之前拆下的 4 个黑色金属杯头内六角螺丝 M3\*6 将底盘盖固定好即可。

**4.** 电池安装好后 首次使用需要先用配套的 12.6V 2A 充电器插入至机器人的充电接口处激活 UPS 电源模块 ，这样小车才有电源输出。

### 首次使用

[![UGV02-2.png](https://www.waveshare.net/w/upload/thumb/2/22/UGV02-2.png/600px-UGV02-2.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV02-2.png)

首次使用需要先使用配置的 12.6V 2A 充电器插入至机器人的电源接口中，打开电源开关后机器人会进行初始化，OLED 屏幕会显示初始化的一系列内容。

1. 机器人开机后 OLED 屏幕上显示内容含义如下：
	- 第一行内容表示此时 WiFi 处于 AP 模式下，机器人创建了一个热点，WiFi 热点名为 UGV；
		- 第二行表示 STA 模式处于关闭状态，当 WiFi 处于 STA 模式时，路由器会给机器人分配一个 IP 地址并显示出来；
		- 第三行的内容表明六轮四驱这一系列的统称型号名为 UGV Rover。
		- 第四行 U 表示机器人产品的电源电压；s 20 中 s 表示一个机器人类型的设置；第一个数字 2 表示机器人的主要类型为 UGV Rover，1 代表 RaspRover，3 代表 UGV Beast；第二个数字 0 表示无扩展模块，1 表示扩展模块为 RoArm-M2 系列机械臂，2 表示扩展模块为 Camera PT。
2. 开机后使用手机或电脑连接机器人的 WiFi：UGV，密码是 12345678，连接 WiFi 后打开谷歌浏览器，在网址栏中输入 192.168.4.1 打开 Web 端使用界面。接下来你就可以使用 Web 端的按键来控制机器人了，也可以在 Web 控制界面上向机器人发送 JSON 指令。

### 下位机 Web 端使用

[![UGV-web界面.png](https://www.waveshare.net/w/upload/thumb/e/ea/UGV-web%E7%95%8C%E9%9D%A2.png/600px-UGV-web%E7%95%8C%E9%9D%A2.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV-web%E7%95%8C%E9%9D%A2.png)

- 这个 Web 端界面会实时显示机器人的电压（VOLTAGE）、STA 模式下的 WIFI 信号强度（RSSI）、IP 和 MAC 地址等信息。
- 通过方向按键可以控制机器人运动，方向按键下面的 SLOW、MIDDLE、FAST 按键用来设置机器人的移动速度。
- 其它按键当机器人外接了其它扩展模块后起作用，例如：当扩展模块为摄像头云台时，可通过 UP、LEFT、RIGHT 以及 DOWN 去控制云台转动，IO4、IO5 和 OFF 控制 LED 灯的开关。

[![UGV-web界面1.png](https://www.waveshare.net/w/upload/thumb/2/29/UGV-web%E7%95%8C%E9%9D%A21.png/600px-UGV-web%E7%95%8C%E9%9D%A21.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV-web%E7%95%8C%E9%9D%A21.png)

- 在 FEEDBACK INFOMATION 这个窗口可以给机器人发送 JSON 指令，输入框以下部分就是具体的 JSON 指令，JSON 指令具体解释也可见 [JSON指令集](#JSON.E6.8C.87.E4.BB.A4.E9.9B.86) 。
- 网页端包含了“心跳检测”，打开网页端控制界面后，Web 端应用会与机器人进行连续通信，如果在机器人的运动过程中断开连接，机器人在短时间内会自动停止运动，避免危险。
- 此 Web 端应用是完全开源的，你可以通过更改开源例程里的 WebPage.h 来更改 Web 端应用的界面和功能。

## JSON 使用教程

### 什么是 JSON？

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，通常用于在不同系统之间传输和存储数据。JSON 最初起源于 JavaScript，但已成为一种独立于编程语言的数据格式，因此可以在各种编程语言中使用和解析。

以下是对机器人左右轮速度控制的 JSON 格式的指令案例：

```python
{"T":1,"L":0.5,"R":0.5}
```

对于这条指令的解释：

“T”代表该指令的类型，指令类型在下位机程序的头文件 json\_cmd.h 中定义。1 代表这条指令为 CMD\_SPEED\_CTRL (用来控制机器人左右轮速度）。

我们会在后续 [**【JSON 指令集】**](#JSON.E6.8C.87.E4.BB.A4.E9.9B.86) 中具体介绍每条指令的具体用法和注意事项，当你对每个功能有一定了解后，可参考 JSON 指令集来增加二次开发和使用效率。

### 为什么使用 JSON 指令与机器人进行交互？

由于机器人驱动板的板载资源比较多、例程功能丰富、同时兼顾方便扩展上位机，让上位机对于机器人的控制功能更加丰富和方便，所以我们使用 JSON 指令通信来与机器人进行交互，同样的，你也可以基于现有的框架对这些功能进行二次开发，让机器人的功能更适合你的使用需求。

### 支持 JSON 指令的通信方式

机器人可使用多种方式来进行 JSON 格式的指令交互。其中，有线的通信方式可以使用 RX/TX 引脚进行串口通信，或者通过 Type-C 接口接 USB 进行串口通信；无线的通信方式可以使用 HTTP 请求进行通信，或者使用 ESP-NOW 进行通信。你可以通过下面的例程来使用不同的方法发送 对应的 JSON 指令去控制机器人的各项功能。

机器人内置心跳函数：当3秒钟内没有新的移动控制指令下达，机器人会自动停止移动，所以当你通过上位机来控制机器人时，需要定时重复下达移动指令来让机器人连续移动。

#### 1\. 串口/USB 通信

**特性：** 有线连接，默认波特率@115200，双向通信，稳定、低延时；

**用途：** 方便使用 PC、树莓派、Jetson Orin Nano 等上位机来控制机器人；

**连接方式：**

- 通过机器人 40PIN 的 UART 接口与 树莓派、Jeston Nano、Jetson Orin Nano 进行连接
- 使用 USB 线将机器人的下位机驱动板的 USB 接口与上位机进行连接（此方法需要拆卸小车）

**Python 例程：** [serial\_simple\_ctrl.py](https://www.waveshare.net/w/upload/c/c9/Serial_simple_ctrl.zip) 。具体例程内容如下：

```python
import serial
import argparse
import threading

def read_serial():
    while True:
        data = ser.readline().decode('utf-8')
        if data:
            print(f"Received: {data}", end='')

def main():
    global ser
    parser = argparse.ArgumentParser(description='Serial JSON Communication')
    parser.add_argument('port', type=str, help='Serial port name (e.g., COM1 or /dev/ttyUSB0)')

    args = parser.parse_args()

    ser = serial.Serial(args.port, baudrate=115200, dsrdtr=None)
    ser.setRTS(False)
    ser.setDTR(False)

    serial_recv_thread = threading.Thread(target=read_serial)
    serial_recv_thread.daemon = True
    serial_recv_thread.start()

    try:
        while True:
            command = input("")
            ser.write(command.encode() + b'\n')
    except KeyboardInterrupt:
        pass
    finally:
        ser.close()

if __name__ == "__main__":
    main()
```

使用以下命令来运行串口通信程序，注意一定要加上机器人所接入的端口号。将 COM20 更换成机器人在 PC 中新插入的串口设备端口号，如果您使用的是树莓派、Jeston Orin Nano等设备，也要更改为相对应的端口名称。

```
python serial_simple_ctrl.py COM20
```

运行完成后，在这个界面中可以发送 JSON 格式的指令，也可以获取机器人的反馈信息，从而与机器人进行通信。

#### 2\. HTTP 请求通信

HTTP（Hypertext Transfer Protocol）是一种用于在 Web 上进行数据通信的协议。

**特性：** 基于 WIFI 模块实现的无线通信，请求-响应模型，灵活、简单。

**Python 例程：** 下载 [http\_simple\_ctrl.py](https://www.waveshare.net/w/upload/2/21/Http_simple_ctrl.zip) HTTP 请求通信例程，具体例程内容如下：

```python
import requests
import argparse

def main():
    parser = argparse.ArgumentParser(description='Http JSON Communication')
    parser.add_argument('ip', type=str, help='IP address: 192.168.10.104')

    args = parser.parse_args()

    ip_addr = args.ip

    try:
        while True:
            command = input("input your json cmd: ")
            url = "http://" + ip_addr + "/js?json=" + command
            response = requests.get(url)
            content = response.text
            print(content)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
```

在运行程序前您需要确认机器人的 ip 地址。确认机器人 ip 地址跟机器人所处的 WIFI 模式息息相关。

- 如果机器人 WIFI 模式仅处于 AP 模式，则 IP 地址为 192.168.4.1；
- 如果机器人 WIFI 模式处于 STA 模式，则可以在机器人 OLED 屏幕上的 ST 这行获得该机器人的 IP 地址。

使用以下命令来运行 HTTP 请求通信程序。命令中的 IP 地址要更改为您机器人的 IP 地址。

```
python http_simple_ctrl.py 192.168.4.1
```

注意：无论是哪一种模式下，机器人需要与运行该脚本的设备处于同一个局域网内。

#### 3\. ESP-NOW 通信

- 你可以控制机器人驱动板，让它通过 ESP-NOW 来向其它驱动板发送指令，ESP-NOW 具有免连接低延迟的特点，支持单播、组播和广播通信。
- 为方便测试，产品开机后的默认 ESP-NOW 模式即可接收 ESP-NOW 指令，如果你不希望产品被其它设备通过设备来控制可以使用 {"T":301,"mode":0} 指令来关闭 ESP-NOW 接收功能，后续也可以使用 {"T":301,"mode":3} 来恢复。
- 如果你需要产品每次开机自动设置为 {"T":301,"mode":0}，可以将该指令写入 boot.mission 文件，这样产品每次开机会自动关闭 ESP-NOW 指令接收功能，你可以使用这条命令将 {"T":301,"mode":0} 添加到 boot.mission：{"T":222,"name":"boot","step":"{\\"T\\":301,\\"mode\\":0}"}，后续如果你想取消这一设置可以直接删除 boot.mission 文件（删除后在下次开机时会自动新建）：{"T":203,"name":"boot.mission"}。

**ESP-NOW 使用准备工作**

- 以下使用 ESP-NOW 的教程中，接收端接收 JSON 指令的前提是你已经开启了 ESP-NOW 的指令接收功能（新产品的默认状态即可）。
- 以下功能涉及到的硬件为 General Driver for Robots 或 ROS Driver for Robots 等运行我们的下位机程序的 ESP32 设备。

**单播控制**

单播控制是点对点的控制方式，你可以通过一台设备来控制另一台设备。

- 用户需要获得被控制端的MAC地址，该地址通常会在OLED屏幕上有显示。
- 用户通过本教程介绍的方法，向控制端发送JSON指令，将被控制端的MAC地址添加到peer，例如：{"T":303,"mac":"CC:DB:A7:5C:1C:40"}，你需要将 mac 的值替换为你的从动端的 mac 地址。
- 如果你需要从peer中删除某个mac地址，可以使用 {"T":304,"mac":"CC:DB:A7:5C:1C:40"} 指令。
- 向被控制端发送 JSON 指令：{"T":306,"mac":"CC:DB:A7:5C:1C:40","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{"T":114,"led":255}"}
- 你可以将上面的 megs 中的 JSON 指令替换为其它指令，将 mac 的值替换为你的被控制端的 mac 地址，其余的值不要改动，那些值是用于其它功能的。

**广播控制**

广播控制是一对多的控制方式，你可以通过一台设备来同时控制多台设备。

- 用户不需要获得被控制端的MAC地址，该模式会向一定范围内的全部设备发送指令，广播控制的方法与单播控制的方法相同，只需要将单播控制中的 mac 值替换为广播地址即可：“FF:FF:FF:FF:FF:FF”
- 用户通过本教程介绍的方法，向控制端发送JSON指令，将广播地址添加到peer：{"T":303,"mac":"FF:FF:FF:FF:FF:FF"}
- 如果你需要从peer中删除广播mac地址，可以使用 {"T":304,"mac":"FF:FF:FF:FF:FF:FF"} 指令。
- 广播发送 JSON 指令：{"T":306,"mac":"FF:FF:FF:FF:FF:FF","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{"T":114,"led":255}"}
	- 你可以将上面的 megs 中的 JSON 指令替换为其它指令，其余的值不要改动，那些值是用于其它功能的。

**组播控制**

组播控制是一对多的控制方式，你可以通过一台设备来同时控制多台设备，与广播控制的区别是组播控制可以选择被控制的设备。

- 用户需要获得被控制端的MAC地址，该地址通常会在OLED屏幕上有显示。
- 用户通过本教程介绍的方法，向控制端发送JSON指令，将被控制端的MAC地址添加到peer，例如：{"T":303,"mac":"CC:DB:A7:5C:1C:40"}，{"T":304,"mac":"CC:DB:A7:5C:E5:FC"}，你需要将 mac 的值替换为你的从动端的 mac 地址，你可以添加多个被控制端的 mac 地址，但是建议不超过20个。
- 但是不要将广播地址“FF:FF:FF:FF:FF:FF”添加进去。
- 如果你需要从peer中删除广播mac地址，可以使用 {"T":304,"mac":"FF:FF:FF:FF:FF:FF"} 指令。
- 组播发送 JSON 指令：{"T":305,"dev":0,"b":0,"s":0,"e":1.57,"h":1.57,"cmd":1,"megs":"{"T":114,"led":255}"}
- 你可以将上面的 megs 中的 JSON 指令替换为其它指令，其余的值不要改动，那些值是用于其它功能的。

#### 4\. 通过 Web 应用下达 JSON 指令

- 开机后使用手机或电脑连接机器人的 WiFi：UGV，密码是 12345678，连接 WiFi 后打开谷歌浏览器，在网址栏中输入 192.168.4.1 打开Web端使用界面。
- 在 FEEDBACK INFOMATION 这个窗口可以给机器人发送 JSON 指令，窗口下面就是具体的 JSON 指令，关于指令的具体解释可以参考下方的 [**【JSON 指令集】**](#JSON.E6.8C.87.E4.BB.A4.E9.9B.86) 。

## JSON 指令集

### 底盘移动

#### 左右轮速度控制 - CMD\_SPEED\_CTRL

```cpp
{"T":1,"L":0.5,"R":0.5}
```
- L 为左侧轮速度，R 为右侧轮速度，速度取值范围为 -0.5 ~ +0.5，正值前进，负值后退
	- 该产品型号为 UGV02，采用的电机是有编码器的，速度值单位为 m/s（闭环速度控制）
- 推荐使用该指令对产品进行控制。

#### 左右侧电机PWM控制 - CMD\_PWM\_INPUT

```cpp
{"T":11,"L":164,"R":164}
```
- L 为左侧电机 PWM 值，R 为右侧电机 PWM 值，PWM 值取值范围为 -255 ~ +255, 正值前进，负值后退
- 由于直流减速电机的低速特性比较差，所以当 PWM 的绝对值过小时，电机可能不会转动
- 该指令仅用于调试使用，控制产品移动请使用上面的 CMD\_SPEED\_CTRL

#### ROS控制 - CMD\_ROS\_CTRL

```cpp
{"T":13,"X":0.1,"Z":0.3}
```
- X 值为移动线速度，单位 m/s，Z 值为转向角速度，单位为 rad/s
- 注意：该指令只适用于带编码器的 UGV01 和 UGV02

#### 设置电机 PID

```cpp
{"T":2,"P":200,"I":2500,"D":0,"L":255}
```
- P、I、D 三个值分别对应比例、积分、微分系数，L 值为 Windup Limits 预留接口，目前 UGV01 中使用的默认 PID 控制器用不到该参数，我们预留了该接口方便用户更换其它的 PID 控制器
- 注意：该指令不适用于无编码器的 WAVE ROVER

### OLED 屏幕设置

#### OLED 屏幕控制

```cpp
{"T":3,"lineNum":0,"Text":"putYourTextHere"}
```
- OLED屏幕显示内容设置，lineNum参数为行设置，可以为：0、1、2、3，共可以显示4行内容。每次设置一行内容，新的内容不会影响到其它行显示的内容，但是会替换掉这一行之前原有的内容。
- Text参数为内容设置，你可以在这里输入文字，文字会显示在对应行上
- 当使用这条命令后，OLED屏幕将不会再显示机器人的信息，而是会显示指令让他显示的内容

#### OLED 屏幕恢复

```cpp
{"T":-3}
```
- 指令类型为-3时，会将OLED屏幕重置为初始状态，显示机器人的信息

### 产品信息获取

#### 获取 IMU 数据

```cpp
{"T":126}
```
- 用于获取IMU信息，包括航向角、地磁场、加速度、姿态、温度等信息
```cpp
{"T":130}
```

#### 串口连续反馈

```cpp
//关闭（默认）
{"T":131,"cmd":0}
//开启
{"T":131,"cmd":1}
```
- 不开启该功能时，底盘信息反馈通过一问一答的方式来实现，用过上面的 CMD\_BASE\_FEEDBACK 之类来获取底盘信息反馈
- 开启该功能时，底盘会连续反馈信息，不要上位机发指令去问，适用于ROS系统

#### 串口回声开关

```cpp
//关闭（默认）
{"T":143,"cmd":0}
//开启
{"T":143,"cmd":1}
```
- 开启后，你所有发送给下位机的指令都会出现在串口反馈中

#### 串口回声开关

```cpp
//关闭（默认）
{"T":143,"cmd":0}
//开启
{"T":143,"cmd":1}
```
- 开启后，你所有发送给下位机的指令都会出现在串口反馈中

### IO4 IO5 控制

```cpp
{"T":132,"IO4":255,"IO5":255}
```
- 用于设置 IO4 IO5的 PWM

### 外接模块扩展

#### 设置外接模块类型

```cpp
{"T":4,"cmd":0}
```
- 0: Null - 1: RoArm-M2机械臂 - 3: Gimbal云台

#### 云台基础控制

```cpp
{"T":133,"X":45,"Y":45,"SPD":0,"ACC":0}
```
- 如果产品安装有云台，可通过这条指令进行控制，X 值为水平角度，正值向左，负值向右，Y 值为垂直角度，正值向上负值向下

#### 机械臂 JSON 指令控制

如果产品安装有机械臂，可以通过参考 [**RoArm-M2-S\_JSON 指令含义**](https://www.waveshare.net/wiki/RoArm-M2-S_JSON%E6%8C%87%E4%BB%A4%E5%90%AB%E4%B9%89 "RoArm-M2-S JSON指令含义") 来对机械臂进行控制。

## 产品硬件介绍

### 下位机驱动板板载接口

[![ROS-Driver-for-Robots-intro.png](https://www.waveshare.net/w/upload/thumb/1/16/ROS-Driver-for-Robots-intro.png/800px-ROS-Driver-for-Robots-intro.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:ROS-Driver-for-Robots-intro.png)

[![ROS-Driver-for-Robots-intro1.png](https://www.waveshare.net/w/upload/thumb/5/5f/ROS-Driver-for-Robots-intro1.png/800px-ROS-Driver-for-Robots-intro1.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:ROS-Driver-for-Robots-intro1.png)

### 电机参数

- 型号：JGB37-520 直流减速电机
- 空载电流：≤120MA
- 额定电压：12V
- 额定电流：≤1A
- 停转电流：2.3A
- 额定转矩：3.5kg.cm
- 堵转转矩：5.0kg.cm
- 空载转速：333RPM
- 额定转速：250RPM
- 减速比：1:30
- 电机尺寸：33\*55mm
- 输出轴尺寸：6\*15.5mm

## 上位机使用教程

### 树莓派上位机

本章节使用树莓派5和树莓派4B测试

- 树莓派的USB接口连接USB摄像头，推荐 IMX335 5MP USB Camera (B)
- 将树莓派安装到底盘上
- 制作镜像，下载上位机程序到树莓派中
	- [ugv\_rpi 下载链接](https://github.com/waveshareteam/ugv_rpi)
- cd ugv\_rpi/
- 为安装脚本添加可执行权限 sudo chmod +x setup.sh
- 为配置开机自动运行的脚本添加可执行权限 sudo chmod +x autorun.sh
- 国际用户：sudo./setup.sh
- 国内用户：sudo./setup.sh -i
- 等待安装完成后，配置开机自动运行：./autorun.sh （注意该指令不可以使用 sudo 运行）
- 配置 WIFI 相关功能（无网络时自动切换热点): cd ugv\_rpi/AccessPopup/
- 安装 AccessPopup，为安装脚本添加可执行权限：sudo chmod +x installconfig.sh
- 运行安装脚本: sudo./installconfig.sh
- 输入1，安装 AccessPopup，然后按任意键退出，输入9，回车，退出安装脚本
- 重启设备后，树莓派会自动运行产品上位机主程序

## FAQ

#### 问题：1.拆卸底盘时观察到只有前轮的两个电机亮灯，后轮的两个电机未亮灯，是正常的吗？

答：是正常的，后轮电机上的灯不亮是因为后轮电机的编码器数据未被读取。下位机驱动板的电机接口驱动两侧车轮，只读取前轮的编码器数据。

#### 问题：2.重新给产品上传程序后，连接WIFI出现密码错误或者其它连接不上的情况，该如何解决？

答：重新烧录过程序，要串口通信发 {"T":604} 这个指令清空 NVS 区之后，再关闭电源重新打开机器人电源开关，忘记 WIFI 重新进行连接。

#### 问题：3.使用下载工具或 Arduino IDE 给机器人通用驱动板上传程序时未出现新的 COM 口，是为什么？

答：首先先对照 [**下位机驱动板板载接口**](https://www.waveshare.net/wiki/UGV02#.E4.B8.8B.E4.BD.8D.E6.9C.BA.E9.A9.B1.E5.8A.A8.E6.9D.BF.E6.9D.BF.E8.BD.BD.E6.8E.A5.E5.8F.A3 "UGV02") 部分检查是不是插入序号⑥的 USB 接口，是的话接着看下电脑的设备管理器是否有新的 COM 口出现，若没有，则看下其它设备中是否有名字中带 CP2102 未识别的设备（如图） [![CP2102未识别.png](https://www.waveshare.net/w/upload/thumb/7/70/CP2102%E6%9C%AA%E8%AF%86%E5%88%AB.png/300px-CP2102%E6%9C%AA%E8%AF%86%E5%88%AB.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:CP2102%E6%9C%AA%E8%AF%86%E5%88%AB.png) ，有的话则是未安装驱动导致的，可点击安装 [**CP2102 串口驱动**](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:CP210x_USB_TO_UART.zip "文件:CP210x USB TO UART.zip") 。若其它设备中没有名字中带 CP2102 未识别的设备，则联系店铺客服返厂维修。

#### 问题：4.小车下位机驱动板上的 40Pin 扩展接口是否还引出了其它可用的 GPIO 引脚？

答：没有，40pin中只引出了 Uart 接口和 I2c 接口 [![企业微信截图 17730389551353.png](https://www.waveshare.net/w/upload/thumb/b/ba/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17730389551353.png/300px-%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17730389551353.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17730389551353.png) 。

## 技术支持

联系人：方工  
EMAIL：2355742825@qq.com  
QQ：2355742825  
微信：扫下方二维码添加  
[![QRCode YijunFang.png](https://www.waveshare.net/w/upload/thumb/0/0c/QRCode_YijunFang.png/200px-QRCode_YijunFang.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:QRCode_YijunFang.png)