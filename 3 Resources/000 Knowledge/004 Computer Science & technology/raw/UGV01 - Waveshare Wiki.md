---
title: "UGV01 - Waveshare Wiki"
source: "https://www.waveshare.net/wiki/UGV01"
author:
published:
created: 2026-05-29
description:
tags:
  - "clippings"
---
[![UGV01](https://www.waveshare.net/w/upload/thumb/d/d2/UGV01-WIKI-MAIN-S.png/360px-UGV01-WIKI-MAIN-S.png)](https://www.waveshare.net/shop/UGV01.htm "UGV01")

<table><tbody><tr><td></td><td></td><th colspan="2" width="90%"><font>功能简介</font></th><td></td><td></td></tr><tr><td colspan="6"><table><tbody><tr><td><small><b>特性</b></small></td><td colspan="3"><small>UGV01履带机器人</small></td></tr><tr><td><small><b>接口</b></small></td><td><small><a href="https://www.waveshare.net/w/index.php?title=%E5%88%86%E7%B1%BB:TTL%E6%80%BB%E7%BA%BF%E8%88%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E6%8E%A5%E5%8F%A3%E6%8E%A5%E5%8F%A3&action=edit&redlink=1">TTL总线舵机控制接口</a></small></td><td><small><a href="https://www.waveshare.net/wiki/%E5%88%86%E7%B1%BB:IIC%E6%8E%A5%E5%8F%A3">IIC</a></small></td><td><small><a href="https://www.waveshare.net/wiki/%E5%88%86%E7%B1%BB:UART%E6%8E%A5%E5%8F%A3">UART</a></small></td></tr></tbody></table></td></tr></tbody></table>

## 产品介绍

UGV01产品是一款具备超强的越野通过能力和抗震性能、开源全部代码可二次开发的移动机器人履带底盘。支持扩展多种上位机（树莓派、Jetson Nano、地平线旭日X3等），上位机通过串口与ESP32下位机进行通信，电机带有编码器可以获得速度反馈来进行速度闭环控制。  
  
内置3S 18650锂电池UPS供电模块(3节18650锂电池串联)，为机器人提供持续能量来源的同时支持边充电边放电。内置多功能机器人驱动板，可扩展总线舵机、PWM舵机、SD卡等功能，驱动板基于ESP32，板载WIFI和蓝牙。  
  
它采用了多独立悬挂系统，极大减少了复杂地形冲击，并配有两条1020欧标型材扩展导轨，使其轻松满足重载、避震、越野等要求，为二次开发提供了更多的可行性。

## 产品特性

- 采用多独立悬挂系统，每侧配有四个独立悬挂，大幅度减少复杂地形冲击。
- 重负载爬坡时，悬挂收缩，后轮会提供格外支撑，拥有优秀的爬坡能力。
- 电机带有编码器，可以获得速度反馈来进行速度闭环控制。
- 搭载交互设备0.96inch OLED屏幕。
- 带有充电接口和自动下载电路，你可以边充电边使用。
- UPS供电模块板载INA219采集芯片，方便实时监控电池电压，充电电流。
- UPS供电模块三节串联18650电池，7800mAh大容量，输出电流更大，电机动力更强。
- UPS供电模块还提供输出5V和3.3V用于扩展其它设备。
- UPS供电模块板载锂电池保护电路，具有防过充、防过放、防过流和短路保护功能。
- 例程代码使用Arduino IDE开发，不需要手动配置编译环境，ESP32开机自动建立WIFI热点，可使用手机（Android/iOS）或电脑（Linux/Windows/Mac）连接并登录到控制页面，只需安装基于Chromium的浏览器即可，不需要下载app。
- 下位机ESP32可用于驱动直流电机、总线舵机，板载OLED屏幕接口、TF卡槽、九轴IMU模块、WiFi和蓝牙，即使不安装上位机也可以单独使用。
- 可扩展多种上位机；
- 全部代码开源并提供丰富的开发文档和教程；
- JSON 指令可通过串口、USB、HTTP、ESP-NOW 等方式下达；
- 绝大部分配置设置可由 JSON 指令实现，例如不需要连接 USB 线即可为产品配置 WIFI 连接。

## 产品固件更新

- 如果你的机器人开机时 OLED 屏幕上显示 Version:0.9 ，说明机器人产品上的驱动程序已经是新版的程序了，就不需要再执行本部分内容给产品进行更新了。
- 如果你的机器人开机时 OLED 屏幕上没有显示 Version:0.9，说明此时机器人产品上的驱动程序依旧是老版的程序，则需要执行本部分内容给产品进行更新；如果需要恢复出厂设置，也可以通过本部分内容进行。

我们提供 UGV01 的 ESP32 下载工具，使用这款工具，用户可以快速给产品更新固件或还原至出厂程序。

**1.** 首先，使用 USB 线连接机器人和你的电脑。（此步骤需要拆开机器人才能完成，拆开机器人后连接机器人驱动板中间那个的 USB 接口）。

**2.** 下载 UGV01 的 ESP32 下载工具： [UGV01 的 ESP32 下载工具](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01_FACTORY.zip "文件:UGV01 FACTORY.zip") ，下载后解压缩，双击打开“flash\_download\_tool\_3.9.5.exe”程序。打开后，会弹出两个窗口，我们需要操作的是下载工具的UI界面，而另一个窗口作为终端来显示下载工具的工作状态。

**3.** 在“DOWNLOAD TOOL MODE”这个界面，Chip Type 选择为 ESP32，WorkMode 选择为 Factory，使用 Factory，调用二进制文件时才会使用相对路径，就不需要用户手动输入二进制文件路径，选择好后点击OK。

[![WAVEROVER下载工具.png](https://www.waveshare.net/w/upload/f/f5/WAVEROVER%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:WAVEROVER%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7.png)

**4.** 在这个软件界面中，保持“LockSettings”的勾选，右边代表的是可以同时给 8 个 UGV01 上传程序。点击“COM”，选择新出现的 COM（我这里新出现的 COM 为 COM3）；BAUD 是用于设置下载速度，越高速度越快，ESP32 最高可以使用 921600。

[![UGV01下载工具1.png](https://www.waveshare.net/w/upload/thumb/3/3a/UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B71.png/800px-UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B71.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B71.png)

**5.** 选择好后，点击 START 开始上传程序，上传完成后，“IDLE 等待”会变成“FINISH 完成”，完成后可以断开驱动板与电脑的 USB 连接，打开机器人产品的开关，通电后即可控制机器人。

[![UGV01下载工具2.png](https://www.waveshare.net/w/upload/thumb/4/49/UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B72.png/800px-UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B72.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B72.png)

## 产品使用教程

**注意：购买海外版的客户需要自行购买安装3个18650锂电池才可以正常使用，推荐使用高放电倍率的电池。首次接上电池需注意LED灯是否亮，如果LED灯亮则表示电池的正负极接反，请检查并确保电池未接反。电池接反的情况下禁止充电，否则有几率引起爆炸。**

### 基本使用

1. 打开机器人产品上的电源开关，通电后即可控制机器人。机器人内部电源没电后，需要使用配套的 12.6V 2A 电源插入机器人产品上的电源接口给其进行充电，支持边充边放。
2. 机器人开机后 OLED 屏幕上显示内容含义如下：
	- 第一行内容表示此时 WiFi 处于 AP 模式下，WiFi 热点名为 UGV；
		- 第二行表示 STA 模式处于关闭状态，当 WiFi 处于 STA 模式时，路由器会分配一个 IP 地址并显示出来；
		- 第三行的内容为本设备的 MAC 地址，该地址是唯一的，用于 ESP-NOW 通信。
		- 第四行表示机器人产品的电源电压。
3. 开机后使用手机或电脑连接机器人的 WiFi：UGV，密码是 12345678，连接 WiFi 后打开谷歌浏览器，在网址栏中输入 192.168.4.1 打开Web端使用界面。接下来你就可以使用 Web 端的功能来控制机器人了，可以在这个页面上向机器人发送 JSON 指令。

[![WR-web界面.png](https://www.waveshare.net/w/upload/thumb/5/59/WR-web%E7%95%8C%E9%9D%A2.png/600px-WR-web%E7%95%8C%E9%9D%A2.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:WR-web%E7%95%8C%E9%9D%A2.png)

- 这个 Web 端界面会实时显示机器人的电压、STA 模式下的 WIFI 信号强度、航向角、IP和MAC地址等信息。
- 通过方向按键可以控制机器人运动，方向按键下面的 SLOW、MIDDLE、FAST 按键用来选择机器人的移动速度。
- 在 FEEDBACK INFOMATION 这个窗口可以给机器人发送 JSON 指令，下面就是具体的 JSON 指令。
- 网页端包含了“心跳检测”，打开网页端控制界面后，Web端应用会与机器人进行连续通信，如果在机器人的运动过程中断开连接，机器人在短时间内会自动停止运动，避免危险。
- 此 Web 端应用是完全开源的，你可以通过更改开源程序里的 WebPage.h 来更改 Web 端应用的界面和功能。

### 连接到已知WIFI

- 在 Web 端界面下面的 JSON 指令列表找到一条名称为 **CMD\_WIFI\_APSTA** 的指令。可以点击这条指令下方的 INPUT 按钮，这条指令会被自动填写在 JSON 指令输入窗口中；

[![WR-APSTA.png](https://www.waveshare.net/w/upload/thumb/f/fc/WR-APSTA.png/700px-WR-APSTA.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:WR-APSTA.png)

- 在 JSON 指令输入窗口中会显示该指令的具体内容为：{"T":404,"ap\_ssid":"UGV","ap\_password":"12345678","sta\_ssid":"your\_ssid","sta\_password":"password"}
	- 该指令中的 your\_ssid 替换为您已知 WIFI 的名称；password 替换为您已知 WIFI 的密码。注意不要删除双引号。
		- 更改好后，点击 SEND，等待机器人进行连接。如果机器人连接该已知 WIFI 成功，OLED 屏幕上 ST 这行会显示路由器分配给机器人的 IP 地址。
		- 一旦连接成功后，机器人会自动保存这个 WIFI 配置，后续除了要更换连接的已知 WIFI，否则不需要再进行以上的步骤进行设置。机器人在开机后会自动连接到该已知 WIFI。
- 可以在同一局域网内的其它设备上打开谷歌浏览器来访问 ST 模式的 IP 地址来访问机器人的 Web 端控制页面；也可以通过简单的 Python 脚本发送 http 请求通过 JSON 指令来控制机器人。

## JSON 指令使用教程

### 什么是 JSON？

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。易于人阅读和编写，可以在多种语言之间进行数据交换。同时也易于机器解析和生成。

### 为什么使用 JSON 指令与机器人进行交互？

由于机器人驱动板的板载资源比较多、例程功能丰富、同时兼顾方便扩展上位机，让上位机对于机器人的控制功能更加丰富和方便，所以我们使用 JSON 指令通信来与机器人进行交互，同样的，你也可以基于现有的框架对这些功能进行二次开发，让机器人的功能更适合你的使用需求。

### JSON 指令的通信方式

- 你可以使用下面的例程来通过不同的方法发送 JSON 指令控制机器人的各项功能
- 机器人内置心跳函数：当3秒钟内没有新的移动控制指令下达，机器人会自动停止移动，所以当你通过上位机来控制机器人时，需要定时重复下达移动指令来让机器人连续移动

#### 使用 Web 应用下达 JSON 指令

- 开机后使用手机或电脑连接机器人的 WiFi：UGV，密码是 12345678，连接 WiFi 后打开谷歌浏览器，在网址栏中输入 192.168.4.1 打开Web端使用界面。
- 在 FEEDBACK INFOMATION 这个窗口可以给机器人发送 JSON 指令，窗口下面就是具体的 JSON 指令，关于指令的具体解释可以参考下方的 [**【JSON 指令集】**](#JSON.E6.8C.87.E4.BB.A4.E9.9B.86) 。

#### 使用 Python 脚本通过 HTTP 下达 JSON 指令

- 点击 HTTP 请求通信的 [http\_simple\_ctrl.py](https://www.waveshare.net/w/upload/2/21/Http_simple_ctrl.zip) 例程下载。具体例程内容如下：
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

- 如果机器人 WIFI 模式仅处于 AP 模式，则 IP 地址为192.168.4.1；
- 如果机器人 WIFI 模式处于 STA 模式，则可以在机械臂的OLED屏幕上获得该机械臂的 IP 地址。

使用以下命令来运行 HTTP 请求通信程序。命令中的 IP 地址要更改为您机器人的 IP 地址。

```
python http_simple_ctrl.py 192.168.4.1
```

注意：无论是哪一种模式下，机器人需要与该脚本运行的设备处于同一个局域网内。

#### 使用 ESP-NOW 下达 JSON 指令

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

#### 使用 GPIO 或 USB 串口下达 JSON 指令

你可以使用 PC、树莓派、Jeston Nano、Jetson Orin Nano 等上位机通过串口与 ESP32 下位机进行通信。串口连接有以下两种方法：

- 通过 40PIN 的 UART 接口将机器人与 树莓派、Jeston Nano、Jetson Orin Nano 进行连接
- 通过 USB 线将机器人的下位机驱动板的 USB接口与上位机进行连接（此方法需要拆卸小车）
- 点击串口通信的 [serial\_simple\_ctrl.py](https://www.waveshare.net/w/upload/c/c9/Serial_simple_ctrl.zip) 例程下载。具体例程内容如下：
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

使用以下命令来运行串口通信程序，注意一定要加上机械臂所接入的端口号。将 COM20 更换成机械臂在 PC 中新插入的串口设备端口号，如果您使用的是树莓派、Jeston Orin Nano等设备，也要更改为相对应的端口名称。

```
python http_simple_ctrl.py 192.168.4.1
```

运行完成后，在这个界面中可以发送 JSON 格式的指令，也可以获取机器人的反馈信息，从而与机器人进行通信。

## JSON 指令集

### 底盘移动

#### 左右轮速度控制 - CMD\_SPEED\_CTRL

```cpp
{"T":1,"L":0.5,"R":0.5}
```
- L 为左侧轮速度，R 为右侧轮速度，速度取值范围为 -0.5 ~ +0.5，正值前进，负值后退
	- 该产品型号为 UGV01，采用的电机是有编码器的，速度值单位为 m/s（闭环速度控制）
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
- 注意：该指令不适用于带编码器的 WAVE ROVER

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

## 产品硬件介绍

### 驱动板General Driver for Robots各模块使用

- [序章 安装Arduino IDE](https://www.waveshare.net/wiki/%E5%BA%8F%E7%AB%A0_%E5%AE%89%E8%A3%85Arduino_IDE "序章 安装Arduino IDE")
- [教程一 带编码器电机控制例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E4%B8%80_%E5%B8%A6%E7%BC%96%E7%A0%81%E5%99%A8%E7%94%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E4%BE%8B%E7%A8%8B "教程一 带编码器电机控制例程")
- [教程二 无编码器电机控制例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E4%BA%8C_%E6%97%A0%E7%BC%96%E7%A0%81%E5%99%A8%E7%94%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E4%BE%8B%E7%A8%8B "教程二 无编码器电机控制例程")
- [教程三 ST3215总线舵机控制例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E4%B8%89_ST3215%E6%80%BB%E7%BA%BF%E8%88%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E4%BE%8B%E7%A8%8B "教程三 ST3215总线舵机控制例程")
- [教程四 PWM舵机控制例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E5%9B%9B_PWM%E8%88%B5%E6%9C%BA%E6%8E%A7%E5%88%B6%E4%BE%8B%E7%A8%8B "教程四 PWM舵机控制例程")
- [教程五 IMU数据读取例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E4%BA%94_IMU%E6%95%B0%E6%8D%AE%E8%AF%BB%E5%8F%96%E4%BE%8B%E7%A8%8B "教程五 IMU数据读取例程")
- [教程六 SD卡读取例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E5%85%AD_SD%E5%8D%A1%E8%AF%BB%E5%8F%96%E4%BE%8B%E7%A8%8B "教程六 SD卡读取例程")
- [教程七 INA219电压电流监测例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E4%B8%83_INA219%E7%94%B5%E5%8E%8B%E7%94%B5%E6%B5%81%E7%9B%91%E6%B5%8B%E4%BE%8B%E7%A8%8B "教程七 INA219电压电流监测例程")
- [教程八 OLED屏幕控制例程](https://www.waveshare.net/wiki/%E6%95%99%E7%A8%8B%E5%85%AB_OLED%E5%B1%8F%E5%B9%95%E6%8E%A7%E5%88%B6%E4%BE%8B%E7%A8%8B "教程八 OLED屏幕控制例程")

## 资料

## 开源例程

- [UGV01开源例程](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01_BASE.zip "文件:UGV01 BASE.zip")

## 机器人尺寸图纸和扩展平台图纸

- [DXF图纸](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01-BASE-STR_DXF.zip "文件:UGV01-BASE-STR DXF.zip")
- [PDF图纸](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01-BASE-STR_PDF.zip "文件:UGV01-BASE-STR PDF.zip")

## 机器人模型

- [UGV01 STL模型](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:UGV01-BASE-STL.zip "文件:UGV01-BASE-STL.zip")

## 技术支持

联系人：方工  
EMAIL：2355742825@qq.com  
QQ：2355742825  
微信：扫下方二维码添加  
[![QRCode YijunFang.png](https://www.waveshare.net/w/upload/thumb/0/0c/QRCode_YijunFang.png/200px-QRCode_YijunFang.png)](https://www.waveshare.net/wiki/%E6%96%87%E4%BB%B6:QRCode_YijunFang.png)