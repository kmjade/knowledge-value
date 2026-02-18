---
title: UGV01 使用教程
tags:
  - para/resource/tech
  - 技术/机器人
  - 技术/教程
  - Waveshare
status: active
aliases:
  - UGV01教程
  - 履带机器人使用指南
  - UGV01配置
cssclasses:
  - resource-note
created: 2026-02-19
---

# UGV01 使用教程

> [!info] 教程概述
> 本教程详细介绍UGV01机器人的基本使用方法、配置步骤和通信方式，帮助用户快速上手并进行二次开发。

## 🔧 固件更新

### 检查固件版本

**开机检查**：
1. 打开机器人电源开关
2. 查看OLED屏幕显示
3. 如果显示`Version:0.9`，说明已是新版，无需更新
4. 如果未显示版本号，需要进行更新

**恢复出厂设置**：
- 需要更新固件时也会进行出厂设置

### 更新步骤

#### 1. 准备工作

**硬件要求**：
- USB数据线
- 电脑（Windows/Linux/Mac）
- UGV01机器人

**软件要求**：
- ESP32下载工具

**下载ESP32下载工具**：
1. 访问UGV01产品页面
2. 下载ESP32下载工具压缩包
3. 解压缩到本地目录

#### 2. 连接设备

**连接步骤**：
1. 需要拆开机器人（小心操作）
2. 找到机器人驱动板中间的USB接口
3. 使用USB线连接机器人和电脑
4. 确保连接牢固

#### 3. 运行下载工具

**启动工具**：
1. 双击打开`flash_download_tool_3.9.5.exe`程序
2. 会弹出两个窗口：
   - UI界面：用于操作
   - 终端窗口：显示下载状态

**配置参数**：
```
Chip Type: ESP32
WorkMode: Factory
```

**选择Factory模式的原因**：
- 调用二进制文件时使用相对路径
- 不需要用户手动输入二进制文件路径

#### 4. 配置下载参数

**界面设置**：
1. 保持"LockSettings"的勾选
2. 点击"COM"选择新出现的COM端口（例如COM3）
3. 设置BAUD（波特率）：
   - 推荐值：921600（最快）
   - 如果不稳定可降低到460800或115200

**端口说明**：
- 右侧代表可以同时给8个UGV01上传程序
- 选择正确的COM端口至关重要

#### 5. 开始上传

**上传过程**：
1. 点击START开始上传程序
2. 观察终端窗口的进度信息
3. 等待上传完成
4. 完成后"IDLE 等待"会变成"FINISH 完成"

**完成步骤**：
1. 断开驱动板与电脑的USB连接
2. 重新组装机器人（如已拆卸）
3. 打开机器人产品的开关
4. 通电后即可控制机器人

---

## 🚀 基本使用

### 首次使用准备

> [!warning] 电池安全
> 海外版客户需要自行购买安装3个18650锂电池
> - 推荐使用高放电倍率的电池
> - 首次接上电池需注意LED灯是否亮
> - LED灯亮表示电池的正负极接反
> - 电池接反的情况下禁止充电，否则有几率引起爆炸

### 开机步骤

#### 1. 安装电池

**电池规格**：
- 类型：18650锂电池
- 数量：3节
- 连接方式：串联（3S）
- 容量：推荐7800mAh或更大

**安装步骤**：
1. 打开电池仓
2. 按照正负极标识安装3节18650电池
3. 检查LED指示灯
   - 灯亮：表示电池接反，需要重新安装
   - 灯不亮：表示电池安装正确
4. 关闭电池仓盖

#### 2. 开机启动

**启动步骤**：
1. 打开机器人电源开关
2. 等待系统启动（约2-3秒）
3. 观察OLED屏幕显示信息

#### 3. OLED屏幕信息

**屏幕显示内容**：

| 行数 | 显示内容 | 含义 |
|------|----------|------|
| **第一行** | `AP: UGV` | WiFi处于AP模式，热点名为UGV |
| **第二行** | `STA: Off` 或 `STA: 192.168.1.100` | STA模式状态，连接路由器后显示IP地址 |
| **第三行** | `MAC: XX:XX:XX:XX:XX:XX` | 设备的MAC地址（唯一，用于ESP-NOW通信） |
| **第四行** | `Voltage: 12.5V` | 机器人电源电压 |

**各信息说明**：
- **AP模式**：机器人作为WiFi热点，设备直接连接
- **STA模式**：机器人连接路由器，使用局域网IP访问
- **MAC地址**：用于ESP-NOW通信时的设备识别
- **电压信息**：实时显示电池电压，方便监控电量

### 充电说明

**充电规格**：
- 充电电压：12.6V
- 充电电流：2A
- 接口：DC充电接口

**充电步骤**：
1. 使用配套的12.6V 2A电源
2. 插入机器人产品上的电源接口
3. 机器人支持边充电边放电
4. 充电时可正常使用

**充电注意事项**：
- 确保电池安装正确（LED灯不亮）
- 使用原装或规格匹配的充电器
- 避免过度充电或过度放电
- 长期不用时建议每3个月充电一次

---

## 🌐 Web端控制

### 连接WiFi

**AP模式连接（默认）**：

| 参数 | 值 |
|------|-----|
| WiFi名称 | UGV |
| WiFi密码 | 12345678 |

**连接步骤**：
1. 打开手机或电脑的WiFi设置
2. 查找名为"UGV"的WiFi热点
3. 选择并连接该WiFi
4. 输入密码：12345678
5. 等待连接成功

### 打开Web控制界面

**访问步骤**：
1. 连接WiFi成功后
2. 打开谷歌浏览器（或基于Chromium的浏览器）
3. 在地址栏输入：`192.168.4.1`
4. 按回车键，等待加载
5. Web端控制界面将自动打开

### Web端界面功能

#### 实时信息显示

**显示内容**：
- 机器人电压
- STA模式下的WiFi信号强度
- 航向角
- IP地址
- MAC地址

#### 方向控制按键

**控制按键**：
```
    ↑ 前进
← 左  下  右 右
    ↓ 后退
```

**速度选择**：
- **SLOW** - 慢速
- **MIDDLE** - 中速
- **FAST** - 快速

#### JSON指令输入

**FEEDBACK INFORMATION窗口**：
- 可以给机器人发送JSON指令
- 下方显示具体的JSON指令列表
- 点击指令可自动填入输入窗口

**指令发送步骤**：
1. 在JSON指令列表中找到需要的指令
2. 点击指令下方的INPUT按钮
3. 指令会自动填写在JSON指令输入窗口中
4. 点击SEND发送指令
5. 等待机器人执行并反馈结果

#### 心跳检测

**功能说明**：
- Web端应用包含"心跳检测"功能
- 打开网页端控制界面后，与机器人进行连续通信
- 如果机器人在运动过程中断开连接
- 机器人会在短时间内自动停止运动
- 避免危险情况发生

**安全保障**：
- 防止控制中断导致机器人失控
- 提供安全保护机制
- 适合远程控制场景

#### 自定义界面

**开源特性**：
- Web端应用完全开源
- 可以通过更改开源程序中的`WebPage.h`
- 修改Web端应用的界面和功能
- 满足个性化需求

---

## 🔗 连接到已知WiFi

### 配置步骤

#### 1. 找到WiFi配置指令

在Web端界面下面的JSON指令列表中：
- 找到名称为`CMD_WIFI_APSTA`的指令
- 点击该指令下方的INPUT按钮

#### 2. 修改指令内容

**指令模板**：
```json
{"T":404,"ap_ssid":"UGV","ap_password":"12345678","sta_ssid":"your_ssid","sta_password":"password"}
```

**修改步骤**：
1. 将`your_ssid`替换为您已知WIFI的名称
2. 将`password`替换为您已知WIFI的密码
3. 注意不要删除双引号
4. 确保JSON格式正确

**示例**：
```json
{"T":404,"ap_ssid":"UGV","ap_password":"12345678","sta_ssid":"MyHomeWiFi","sta_password":"wifi123"}
```

#### 3. 发送配置指令

**发送步骤**：
1. 确认指令修改正确
2. 点击SEND发送指令
3. 等待机器人进行连接
4. 观察OLED屏幕上的STA行显示

#### 4. 验证连接

**成功标志**：
- OLED屏幕上STA行会显示路由器分配给机器人的IP地址
- 例如：`STA: 192.168.1.100`

**连接特性**：
- 连接成功后，机器人会自动保存这个WIFI配置
- 后续除了要更换连接的已知WIFI，否则不需要再进行配置
- 机器人在开机后会自动连接到该已知WIFI

### 使用STA模式

#### 局域网访问

**访问方式**：
1. 确保机器人和控制设备在同一局域网内
2. 在控制设备上打开谷歌浏览器
3. 访问STA模式的IP地址（例如：192.168.1.100）
4. 打开机器人的Web端控制页面

#### Python脚本控制

**HTTP请求示例**：

```python
import requests

# 机器人IP地址
ip_addr = "192.168.1.100"

# 发送JSON指令
command = '{"T":1,"L":0.3,"R":0.3}'
url = f"http://{ip_addr}/js?json={command}"
response = requests.get(url)
print(response.text)
```

**完整示例脚本**：

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
            url = f"http://{ip_addr}/js?json={command}"
            response = requests.get(url)
            content = response.text
            print(content)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
```

**运行脚本**：
```bash
python http_simple_ctrl.py 192.168.1.100
```

**注意**：
- 无论AP模式还是STA模式，机器人需要与脚本运行的设备处于同一个局域网内
- AP模式下IP地址为：192.168.4.1
- STA模式下IP地址在OLED屏幕上显示

---

## 📡 多种通信方式

### HTTP通信

**特点**：
- 基于Web协议
- 易于使用和调试
- 适合远程控制
- 支持多种编程语言

**使用场景**：
- Web端控制
- 远程监控
- 移动设备控制
- 云平台集成

**示例代码**：
```python
import requests

url = "http://192.168.4.1/js?json={\"T\":1,\"L\":0.3,\"R\":0.3}"
response = requests.get(url)
print(response.text)
```

---

### 串口通信

**连接方式**：
1. **40PIN UART接口** - 连接树莓派、Jetson Nano等
2. **USB接口** - 通过USB线连接（需要拆卸小车）

**串口配置**：
- 波特率：115200
- 数据位：8
- 停止位：1
- 校验位：None

**Python示例脚本**：

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

**运行脚本**：
```bash
# Windows
python serial_simple_ctrl.py COM20

# Linux
python serial_simple_ctrl.py /dev/ttyUSB0
```

---

### ESP-NOW通信

**特点**：
- 免连接
- 低延迟
- 支持单播、组播和广播
- 适合多机协同

**准备工作**：
- 确保ESP-NOW接收功能已开启（新产品默认开启）
- 获取目标设备的MAC地址（在OLED屏幕上显示）

**控制模式**：

#### 单播控制（点对点）

```python
# 添加peer
{"T":303,"mac":"CC:DB:A7:5C:1C:40"}

# 发送指令
{"T":306,"mac":"CC:DB:A7:5C:1C:40","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

#### 广播控制（一对多）

```python
# 添加广播地址
{"T":303,"mac":"FF:FF:FF:FF:FF:FF"}

# 发送指令
{"T":306,"mac":"FF:FF:FF:FF:FF:FF","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

#### 组播控制（可选择的多对多）

```python
# 添加多个peer
{"T":303,"mac":"CC:DB:A7:5C:1C:40"}
{"T":303,"mac":"CC:DB:A7:5C:E5:FC"}

# 组播发送
{"T":305,"dev":0,"b":0,"s":0,"e":1.57,"h":1.57,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

---

## 🍓 树莓派上位机

### 安装步骤

#### 1. 硬件准备

- 树莓派4B或5
- USB摄像头（推荐IMX335 5MP USB Camera）
- 树莓派需要安装在底盘上

#### 2. 下载上位机程序

**下载链接**：
- ugv_rpi下载链接（从UGV01产品页面获取）

**安装步骤**：
```bash
cd ugv_rpi/

# 添加可执行权限
sudo chmod +x setup.sh
sudo chmod +x autorun.sh

# 国际用户
sudo ./setup.sh

# 国内用户
sudo ./setup.sh -i
```

#### 3. 配置开机自动运行

```bash
./autorun.sh
```

**注意**：
- 该指令不可以使用sudo运行

#### 4. 配置WiFi功能

```bash
cd ugv_rpi/AccessPopup/

# 安装AccessPopup
sudo chmod +x installconfig.sh
sudo ./installconfig.sh

# 输入1，安装AccessPopup
# 然后按任意键退出，输入9，回车，退出安装脚本
```

#### 5. 重启测试

```bash
sudo reboot
```

重启后，树莓派会自动运行产品上位机主程序。

---

## 🔗 相关资源

- [[UGV01学习项目]] - 当前学习项目
- [[UGV01产品介绍]] - 详细产品规格和特性
- [[UGV01 JSON指令集]] - 完整指令参考文档
- [[UGV01通信方式]] - HTTP、串口、ESP-NOW详解

## 🌐 官方资源

- [UGV01产品页面](https://www.waveshare.net/wiki/UGV01)
- [Waveshare官网](https://www.waveshare.net/)

## 💡 使用建议

> [!tip] 首次使用
> 1. 检查固件版本
> 2. 正确安装电池
> 3. 连接Web端测试基本功能
> 4. 配置WiFi以便后续使用

> [!tip] 调试技巧
> 1. 使用OLED屏幕查看状态
> 2. 开启串口回声查看指令
> 3. 使用Web端JSON指令测试
> 4. 逐步增加功能复杂度

> [!warning] 安全注意
> - 电池接反禁止充电
> - 机器人运动时注意安全
> - 心跳断开会自动停止
> - 长期不用要定期充电

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/机器人 #技术/教程 #Waveshare
