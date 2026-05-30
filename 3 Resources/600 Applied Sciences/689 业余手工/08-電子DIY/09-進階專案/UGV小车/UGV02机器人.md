---
title: UGV02机器人开发资源
status: active
priority: medium
tags: [knowledge/robotics, esp32, waveshare, ugv]
aliases: [UGV02, 六轮四驱机器人]
created: 2026-02-19
modified: 2026-02-19
source: https://www.waveshare.net/wiki/UGV02
related:
  - [[UGV01机器人]]
  - [[ESP32开发基础]]
  - [[机器人控制笔记]]
---

# UGV02机器人开发资源

> UGV02 是一款具备超强越野能力和抗震性能的六轮四驱移动机器人底盘，开源全部代码方便用户进行二次开发。

---

## 📋 产品介绍

### 核心特性

- ✅ **六轮四驱驱动方式** - 拥有优秀的爬坡能力
- ✅ **柔软橡胶轮胎** - 大幅减少复杂地形对产品的冲击
- ✅ **1020铝型材扩展导轨** - 203mm间距，可灵活扩展多种外设
- ✅ **UPS供电模块** - 3节18650电池串联，7800mAh大容量
- ✅ **电池保护电路** - 防过充、防过放、防过流和短路保护
- ✅ **多通信方式** - 支持串口、USB、HTTP、ESP-NOW
- ✅ **Web控制界面** - 无需下载APP，基于Chromium浏览器即可
- ✅ **全代码开源** - 提供丰富的开发文档和教程
- ✅ **扩展性强** - 支持树莓派、Jetson Nano、地平线旭日X3等上位机

### 技术规格

| 特性 | 描述 |
| --- | --- |
| 主控芯片 | ESP32 |
| 驱动方式 | 六轮四驱 |
| 通信接口 | TTL总线舵机、I2C、UART |
| 显示屏 | 0.96 inch OLED |
| 电池 | 3S 18650锂电池 UPS供电模块 |
| 充电接口 | 12.6V 2A充电器 |
| WiFi | AP/STA模式 |
| 蓝牙 | BLE 5.0 |
| IMU | 九轴姿态传感器 |

---

## 🛠️ 硬件组成

### 下位机驱动板

- ESP32 主控芯片
- IMU九轴姿态传感器
- TF卡槽
- OLED屏幕接口
- WiFi和蓝牙模块

### 扩展导轨

- 1020欧标型材扩展导轨
- 203mm间距
- 包含船型螺母和螺丝

### 电机参数

| 参数 | 值 |
| --- | --- |
| 型号 | JGB37-520 直流减速电机 |
| 额定电压 | 12V |
| 空载电流 | ≤120mA |
| 额定电流 | ≤1A |
| 停转电流 | 2.3A |
| 额定转矩 | 3.5kg.cm |
| 堵转转矩 | 5.0kg.cm |
| 空载转速 | 333RPM |
| 额定转速 | 250RPM |
| 减速比 | 1:30 |

---

## 🔌 固件更新

### 版本检查

开机时检查OLED屏幕：
- 显示 `UGV Rover Version:0.96` - 已是新版，无需更新
- 未显示版本号 - 需要更新固件

### 更新步骤

1. 使用USB线连接机器人驱动板中间的USB接口
2. 下载并运行 UGV02 的 ESP32 下载工具
3. 配置参数：
   - Chip Type: ESP32
   - WorkMode: Factory
   - COM: 选择新出现的COM口
   - BAUD: 921600（最高速度）
4. 点击START开始上传
5. 完成后断开USB连接，打开机器人开关

---

## 🔋 产品使用

### 使用前注意事项

1. **电池安装** - 产品出厂未安装锂电池，需自行安装3个18650锂电池
2. **极性检查** - 电池模块上有LED灯，亮表示电池正负极接反
   - 电池接反时禁止充电，否则可能引起爆炸
3. **防护说明** - 产品不防水、不防沙，避免剧烈撞击

### 电池安装

1. 拧下底盘4个黑色金属杯头内六角螺丝 M3*6
2. 放入3颗18650锂电池（注意正负极）
3. 用螺丝固定好底盘盖
4. 首次使用需要用充电器插入电源接口激活UPS模块

### 首次使用

1. 插入12.6V 2A充电器
2. 打开电源开关
3. 机器人初始化，OLED显示：

| 行号 | 显示内容 | 含义 |
| --- | --- | --- |
| 第一行 | AP: UGV | WiFi热点名称 |
| 第二行 | STA: OFF | STA模式状态 |
| 第三行 | UGV Rover | 产品型号 |
| 第四行 | U: 12.5V | 电源电压；s 20表示机器人类型设置 |

4. 连接WiFi：UGV，密码：12345678
5. 浏览器访问：192.168.4.1

---

## 📱 Web控制界面

### 界面功能

- **实时信息显示** - 电压(VOLTAGE)、WiFi信号强度(RSSI)、IP、MAC地址
- **方向控制** - 方向按键控制机器人运动
- **速度设置** - SLOW、MIDDLE、FAST 三档速度
- **扩展控制** - 云台控制、LED灯开关等
- **JSON指令** - 通过FEEDBACK INFOMATION窗口发送JSON指令

### 心跳检测

Web端应用与机器人连续通信，运动过程中断开连接会自动停止，确保安全。

---

## 💻 JSON指令通信

### JSON指令格式

```json
{
  "T": 1,
  "L": 0.5,
  "R": 0.5
}
```

- `T` - 指令类型
- 其他参数根据指令类型而定

### 心跳机制

3秒内没有新的移动控制指令，机器人会自动停止移动。

---

## 🔗 通信方式

### 1. 串口/USB通信

**特性**: 有线连接，默认波特率115200，双向通信，稳定、低延时

**连接方式**:
- 通过40PIN UART接口与树莓派、Jetson连接
- USB线连接驱动板USB接口（需拆卸小车）

**Python例程**:
```python
import serial
import threading

def read_serial():
    while True:
        data = ser.readline().decode('utf-8')
        if data:
            print(f"Received: {data}", end='')

ser = serial.Serial('COM20', baudrate=115200)
ser.setRTS(False)
ser.setDTR(False)

thread = threading.Thread(target=read_serial)
thread.daemon = True
thread.start()

# 发送JSON指令
command = '{"T":1,"L":0.5,"R":0.5}'
ser.write(command.encode() + b'\n')
```

### 2. HTTP请求通信

**特性**: 基于WIFI模块实现的无线通信，请求-响应模型，灵活、简单

**Python例程**:
```python
import requests

url = "http://192.168.4.1/js?json=" + command
response = requests.get(url)
print(response.text)
```

**IP地址**:
- AP模式: 192.168.4.1
- STA模式: 查看OLED屏幕STA行显示的IP

### 3. ESP-NOW通信

**特性**: 免连接低延迟，支持单播、组播和广播通信

**单播控制**:
```json
// 添加peer
{"T":303,"mac":"CC:DB:A7:5C:1C:40"}

// 发送指令
{"T":306,"mac":"CC:DB:A7:5C:1C:40","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

**广播控制**:
```json
// 使用广播地址
{"T":303,"mac":"FF:FF:FF:FF:FF:FF"}

// 广播发送指令
{"T":306,"mac":"FF:FF:FF:FF:FF:FF","dev":0,"b":0,"s":0,"e":0,"h":0,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

**组播控制**:
```json
// 添加多个peer（不超过20个）
{"T":303,"mac":"CC:DB:A7:5C:1C:40"}
{"T":303,"mac":"CC:DB:A7:5C:E5:FC"}

// 组播发送指令
{"T":305,"dev":0,"b":0,"s":0,"e":1.57,"h":1.57,"cmd":1,"megs":"{\"T\":114,\"led\":255}"}
```

**ESP-NOW控制**:
```json
// 关闭ESP-NOW接收
{"T":301,"mode":0}

// 恢复ESP-NOW接收
{"T":301,"mode":3}
```

---

## 📋 JSON指令集

### 底盘移动

#### 左右轮速度控制 - CMD_SPEED_CTRL

```json
{"T":1,"L":0.5,"R":0.5}
```

- `L` - 左侧轮速度，取值范围 -0.5 ~ +0.5，正值前进，负值后退
- `R` - 右侧轮速度，取值范围 -0.5 ~ +0.5
- **推荐使用该指令对产品进行控制**

#### 左右侧电机PWM控制 - CMD_PWM_INPUT

```json
{"T":11,"L":164,"R":164}
```

- `L` - 左侧电机PWM值，取值范围 -255 ~ +255
- `R` - 右侧电机PWM值，取值范围 -255 ~ +255
- 仅用于调试，控制产品移动请使用CMD_SPEED_CTRL

#### ROS控制 - CMD_ROS_CTRL

```json
{"T":13,"X":0.1,"Z":0.3}
```

- `X` - 移动线速度，单位 m/s
- `Z` - 转向角速度，单位 rad/s
- 仅适用于带编码器的UGV01和UGV02

#### 设置电机PID

```json
{"T":2,"P":200,"I":2500,"D":0,"L":255}
```

- `P` - 比例系数
- `I` - 积分系数
- `D` - 微分系数
- `L` - Windup Limits预留接口

---

### OLED屏幕设置

#### OLED屏幕控制

```json
{"T":3,"lineNum":0,"Text":"putYourTextHere"}
```

- `lineNum` - 行设置，范围 0~3
- `Text` - 显示内容

#### OLED屏幕恢复

```json
{"T":-3}
```

将OLED屏幕重置为初始状态

---

### 产品信息获取

#### 获取IMU数据

```json
{"T":126}
```

获取IMU信息，包括航向角、地磁场、加速度、姿态、温度等信息

#### 获取底盘信息反馈 - CMD_BASE_FEEDBACK

```json
{"T":130}
```

#### 串口连续反馈

```json
// 关闭（默认）
{"T":131,"cmd":0}
// 开启
{"T":131,"cmd":1}
```

---

### IO控制

#### IO4 IO5控制

```json
{"T":132,"IO4":255,"IO5":255}
```

用于设置IO4 IO5的PWM

---

### 外接模块扩展

#### 设置外接模块类型

```json
{"T":4,"cmd":0}
```

- 0: Null
- 1: RoArm-M2机械臂
- 3: Gimbal云台

#### 云台基础控制

```json
{"T":133,"X":45,"Y":45,"SPD":0,"ACC":0}
```

- `X` - 水平角度，正值向左，负值向右
- `Y` - 垂直角度，正值向上，负值向下

---

### 文件操作

#### 添加任务到boot.mission

```json
{"T":222,"name":"boot","step":"{\"T\":301,\"mode\":0}"}
```

#### 删除文件

```json
{"T":203,"name":"boot.mission"}
```

---

## 🖥️ 上位机使用教程

### 树莓派上位机

**环境**: 树莓派5 / 树莓派4B

**硬件**:
- USB摄像头（推荐IMX335 5MP USB Camera B）
- 将树莓派安装到底盘上

**安装步骤**:
```bash
# 下载上位机程序
cd ugv_rpi/

# 添加执行权限
sudo chmod +x setup.sh
sudo chmod +x autorun.sh

# 安装（国际用户）
sudo ./setup.sh

# 安装（国内用户）
sudo ./setup.sh -i

# 配置开机自动运行
./autorun.sh
```

**WIFI配置**:
```bash
cd ugv_rpi/AccessPopup/
sudo chmod +x installconfig.sh
sudo ./installconfig.sh
# 输入1安装，输入9退出
```

---

## 🔧 扩展模块

### 支持的扩展模块

| 模块 | 说明 |
| --- | --- |
| RoArm-M2 | 机械臂 |
| Gimbal | 云台 |
| Camera PT | 摄像头云台 |

---

## 📚 开发资源

- [UGV02 Wiki 完整文档](https://www.waveshare.net/wiki/UGV02)
- [UGV01 开发资源](https://www.waveshare.net/wiki/UGV01)

---

## 🎓 学习路径建议

### 入门路径

1. 了解机器人硬件组成
2. 学习基础控制命令
3. 使用Web界面进行初步控制
4. 熟悉JSON指令格式

### 进阶路径

1. 使用串口/USB通信控制
2. 学习ESP-NOW多机控制
3. 集成树莓派上位机
4. 开发自定义功能

---

## 💡 UGV02 vs UGV01

| 特性 | UGV01 | UGV02 |
| --- | --- | --- |
| 驱动方式 | 四轮履带 | 六轮四驱 |
| 轮胎类型 | 履带 | 橡胶轮胎 |
| 越野方式 | 多独立悬挂 | 柔软轮胎减震 |
| 扩展导轨 | - | 1020铝型材 |
| 适用场景 | 复杂地形越野 | 重载、越野 |

---

*分类: 3 Resources*
*创建时间: 2026-02-19*
