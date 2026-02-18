---
title: 旭日X3派Python开发指南
tags:
  - para/resource/tech
  - 技术/AI
  - 技术/Python
  - 地平线
  - 旭日X3
  - API文档
status: active
aliases:
  - 旭日X3 Python API
  - X3派Python开发
  - 旭日X3编程指南
cssclasses:
  - resource-note
created: 2026-02-19
---

# 旭日X3派Python开发指南

> [!info] 指南概述
> 本指南详细介绍旭日X3派的Python开发API，包括模型推理、多媒体接口和40PIN功能的使用方法和示例代码。

## 📚 4.1 模型推理接口说明

### 4.1.1 概要介绍

旭日X3派提供完整的Python模型推理接口，支持多种预训练模型：

**支持的模型**：
- 图像分类：Mobilenet v1
- 目标检测：YOLOv3、YOLOv5、fcos
- 图像分割：unet

**核心特性**：
- 基于BPU的AI推理加速
- 支持多种模型格式
- 简单易用的API设计
- 高性能推理

### 4.1.2 Model对象

#### 初始化

```python
import hobot_dnn

# 初始化模型
model = hobot_dnn.Model("model_name")

# 示例
model_mobilenet = hobot_dnn.Model("mobilenet_v1")
model_yolo = hobot_dnn.Model("yolov5")
```

#### 4.1.2.1 inputs

**功能**：获取模型输入张量信息

```python
inputs = model.inputs
print(inputs)
# 输出模型输入的形状、数据类型等信息
```

#### 4.1.2.2 outputs

**功能**：获取模型输出张量信息

```python
outputs = model.outputs
print(outputs)
# 输出模型输出的形状、数据类型等信息
```

#### 4.1.2.3 forward

**功能**：执行模型推理

**参数**：
- `input_data`：输入数据（numpy数组或PIL图像）

**返回**：
- 模型推理结果（numpy数组列表）

**示例**：
```python
import hobot_dnn
import numpy as np
from PIL import Image

# 加载模型
model = hobot_dnn.Model("mobilenet_v1")

# 准备输入数据
image = Image.open("test.jpg")
input_data = np.array(image)

# 执行推理
outputs = model.forward(input_data)

# 处理结果
class_id = outputs[0].argmax()
confidence = outputs[0][class_id]
print(f"Class ID: {class_id}, Confidence: {confidence}")
```

### 4.1.3 示例代码

#### 图像分类示例（Mobilenet v1）

```python
import hobot_dnn
import hobot_vio
import cv2
import numpy as np

# 初始化摄像头
cam = hobot_vio.Camera()
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 加载Mobilenet v1模型
model = hobot_dnn.Model("mobilenet_v1")

# 读取类别标签
with open("synset_words.txt", "r") as f:
    labels = f.readlines()

# 获取图像
image = cam.get_img()

# 预处理
image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
image = cv2.resize(image, (224, 224))
image = image.astype(np.float32)
image = image / 255.0
image = image.transpose(2, 0, 1)

# 模型推理
outputs = model.forward(image)

# 解析结果
class_id = outputs[0].argmax()
confidence = outputs[0][class_id]
label = labels[class_id].strip()

print(f"类别: {label}")
print(f"置信度: {confidence:.2f}")

# 关闭摄像头
cam.close_cam()
```

#### 目标检测示例（YOLOv5）

```python
import hobot_dnn
import hobot_vio
import cv2
import numpy as np

# 初始化摄像头
cam = hobot_vio.Camera()
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 加载YOLOv5模型
model = hobot_dnn.Model("yolov5s")

# 获取图像
image = cam.get_img()

# 预处理
image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
image = cv2.resize(image, (640, 640))
image = image.astype(np.float32)
image = image / 255.0
image = image.transpose(2, 0, 1)
image = np.expand_dims(image, axis=0)

# 模型推理
outputs = model.forward(image)

# 后处理
# YOLOv5输出格式: [batch, num_classes, num_boxes]
# 需要根据模型输出进行解析
detections = outputs[0]

# 绘制检测结果
for detection in detections:
    if detection[4] > 0.5:  # 置信度阈值
        x1, y1, x2, y2 = detection[:4]
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)

# 显示结果
cv2.imshow("Detection", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 关闭摄像头
cam.close_cam()
```

## 📸 4.2 多媒体接口说明

### 4.2.1 概要介绍

旭日X3派提供完整的多媒体处理接口，包括：

- **Camera对象** - 摄像头采集
- **Encoder对象** - 视频编码
- **Decoder对象** - 视频解码
- **Display对象** - 显示输出

### 4.2.2 Camera对象

#### 4.2.2.1 open_cam

**功能**：打开摄像头

**参数**：
- `camera_id`：摄像头ID
  - `hobot_vio.CAMERA_USB_ID` - USB摄像头
  - `hobot_vio.CAMERA_MIPI_ID` - MIPI CSI摄像头

**示例**：
```python
import hobot_vio

cam = hobot_vio.Camera()

# 打开USB摄像头
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 打开MIPI CSI摄像头
cam.open_cam(hobot_vio.CAMERA_MIPI_ID)
```

#### 4.2.2.2 open_vps

**功能**：打开VPS（Video Processing Service）

**参数**：
- `width`：输出宽度
- `height`：输出高度
- `format`：输出格式

**示例**：
```python
import hobot_vio

cam = hobot_vio.Camera()

# 打开VPS
cam.open_vps(width=640, height=480)
```

#### 4.2.2.3 get_img

**功能**：获取一帧图像

**返回**：
- 图像数据（numpy数组，RGB格式）

**示例**：
```python
import hobot_vio
import cv2

cam = hobot_vio.Camera()
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 获取图像
image = cam.get_img()

# 显示图像
cv2.imshow("Camera", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

cam.close_cam()
```

#### 4.2.2.4 set_img

**功能**：设置图像数据

**参数**：
- `image`：图像数据

**示例**：
```python
import hobot_vio

cam = hobot_vio.Camera()

# 设置图像
cam.set_img(processed_image)
```

#### 4.2.2.5 close_cam

**功能**：关闭摄像头

**示例**：
```python
import hobot_vio

cam = hobot_vio.Camera()
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 使用摄像头...

# 关闭摄像头
cam.close_cam()
```

### 4.2.3 Encoder对象

#### 4.2.3.1 encode

**功能**：编码一帧图像

**参数**：
- `image`：图像数据

**返回**：
- 编码后的数据

**示例**：
```python
import hobot_vio

encoder = hobot_vio.Encoder()
encoder.encode(image)
```

#### 4.2.3.2 encode_file

**功能**：将图像编码到文件

**参数**：
- `image`：图像数据
- `filename`：输出文件名

**示例**：
```python
import hobot_vio

encoder = hobot_vio.Encoder()
encoder.encode_file(image, "output.jpg")
```

#### 4.2.3.3 get_img

**功能**：获取编码后的图像数据

**返回**：
- 图像数据

**示例**：
```python
import hobot_vio

encoder = hobot_vio.Encoder()
encoder.encode(image)
encoded_img = encoder.get_img()
```

#### 4.2.3.4 close

**功能**：关闭编码器

**示例**：
```python
import hobot_vio

encoder = hobot_vio.Encoder()
# 使用编码器...
encoder.close()
```

### 4.2.4 Decoder对象

#### 4.2.4.1 decode

**功能**：解码视频数据

**参数**：
- `data`：视频数据

**返回**：
- 解码后的图像数据

**示例**：
```python
import hobot_vio

decoder = hobot_vio.Decoder()
image = decoder.decode(video_data)
```

#### 4.2.4.2 get_img

**功能**：获取解码后的图像

**返回**：
- 图像数据

**示例**：
```python
import hobot_vio

decoder = hobot_vio.Decoder()
decoder.decode(video_data)
image = decoder.get_img()
```

#### 4.2.4.3 set_img

**功能**：设置图像数据

**参数**：
- `image`：图像数据

**示例**：
```python
import hobot_vio

decoder = hobot_vio.Decoder()
decoder.set_img(image)
```

#### 4.2.4.4 close

**功能**：关闭解码器

**示例**：
```python
import hobot_vio

decoder = hobot_vio.Decoder()
# 使用解码器...
decoder.close()
```

### 4.2.5 Display对象

#### 4.2.5.1 display

**功能**：显示图像

**参数**：
- `image`：图像数据

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.display(image)
```

#### 4.2.5.2 set_img

**功能**：设置图像数据

**参数**：
- `image`：图像数据

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.set_img(image)
```

#### 4.2.5.3 set_graph_rect

**功能**：绘制矩形

**参数**：
- `x1`、`y1`：左上角坐标
- `x2`、`y2`：右下角坐标
- `color`：颜色（BGR格式）
- `thickness`：线宽

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.set_graph_rect(100, 100, 200, 200, (0, 255, 0), 2)
```

#### 4.2.5.4 set_graph_word

**功能**：绘制文字

**参数**：
- `text`：文字内容
- `x`、`y`：位置坐标
- `color`：颜色（BGR格式）
- `scale`：字体大小
- `thickness`：线宽

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.set_graph_word("Hello World", 100, 100, (255, 255, 255), 1.0, 2)
```

#### 4.2.5.5 close

**功能**：关闭显示模块

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
# 使用显示模块...
display.close()
```

#### 4.2.5.6 bind接口

**功能**：绑定显示输出到HDMI

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.bind()
```

#### 4.2.5.7 unbind接口

**功能**：解除绑定

**示例**：
```python
import hobot_vio

display = hobot_vio.Display()
display.unbind()
```

### 4.2.6 接口使用示例代码

#### 完整的多媒体处理示例

```python
import hobot_vio
import hobot_dnn
import cv2

# 初始化摄像头
cam = hobot_vio.Camera()
cam.open_cam(hobot_vio.CAMERA_USB_ID)

# 初始化显示模块
display = hobot_vio.Display()
display.bind()

# 加载模型
model = hobot_dnn.Model("mobilenet_v1")

# 处理循环
while True:
    # 获取图像
    image = cam.get_img()
    
    # 预处理
    image_processed = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    image_processed = cv2.resize(image_processed, (224, 224))
    image_processed = image_processed.astype(np.float32) / 255.0
    image_processed = image_processed.transpose(2, 0, 1)
    
    # 模型推理
    outputs = model.forward(image_processed)
    
    # 解析结果
    class_id = outputs[0].argmax()
    confidence = outputs[0][class_id]
    
    # 绘制结果
    result_text = f"Class: {class_id}, Conf: {confidence:.2f}"
    display.set_graph_word(result_text, 10, 10, (0, 255, 0), 1.0, 2)
    
    # 显示
    display.display(image)
    
    # 按'q'退出
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 清理资源
cam.close_cam()
display.close()
display.unbind()
```

## 🔌 4.3 40PIN功能使用

### 4.3.1 管脚复用关系配置

部分GPIO引脚支持多种功能复用，需要配置管脚功能模式。

### 4.3.2 40PIN管脚定义

40PIN接口包含多种功能引脚：

| 功能 | 引脚范围 | 说明 |
|------|----------|------|
| **GPIO** | 多个 | 通用输入输出 |
| **I2C** | 2个引脚 | I2C_SDA、I2C_SCL |
| **SPI** | 4个引脚 | SPI_MOSI、SPI_MISO、SPI_SCLK、SPI_CS |
| **UART** | 2个引脚 | UART_TX、UART_RX |
| **PWM** | 多个 | 脉冲宽度调制输出 |
| **5V** | 2个 | 5V电源输出 |
| **3.3V** | 2个 | 3.3V电源输出 |
| **GND** | 多个 | 地线 |

### 4.3.3 使用GPIO功能

#### 4.3.3.1 设置引脚编码方式

```python
import hobot_gpio as gpio

# 使用物理引脚编号（推荐）
gpio.set_mode(gpio.BOARD)

# 或使用BCM编号
gpio.set_mode(gpio.BCM)
```

#### 4.3.3.2 警告信息

使用GPIO时注意：
- 不要超过电压限制（3.3V）
- 不要超过电流限制
- 不要短路

#### 4.3.3.3 管脚配置

```python
import hobot_gpio as gpio

# 配置为输出
gpio.setup(12, gpio.OUT)

# 配置为输入
gpio.setup(11, gpio.IN)

# 配置初始值（输出）
gpio.setup(12, gpio.OUT, initial=gpio.LOW)
```

#### 4.3.3.4 输入操作

```python
import hobot_gpio as gpio

# 配置为输入
gpio.setup(11, gpio.IN)

# 读取状态
value = gpio.input(11)

if value == gpio.HIGH:
    print("高电平")
elif value == gpio.LOW:
    print("低电平")
```

#### 4.3.3.5 输出操作

```python
import hobot_gpio as gpio

# 配置为输出
gpio.setup(12, gpio.OUT)

# 输出高电平
gpio.output(12, gpio.HIGH)

# 输出低电平
gpio.output(12, gpio.LOW)

# 切换状态
gpio.output(12, not gpio.input(12))
```

#### 4.3.3.6 清理管脚占用

```python
import hobot_gpio as gpio

# 清理所有GPIO
gpio.cleanup()

# 或清理特定管脚
# （部分实现可能不支持）
```

#### 4.3.3.7 查看管脚状态

```python
import hobot_gpio as gpio

# 查看管脚配置状态
# （具体API可能因实现而异）
```

#### 4.3.3.8 边沿检测与中断

##### wait_for_edge()函数

**功能**：等待边沿事件

**参数**：
- `channel`：管脚号
- `edge`：边沿类型（gpio.RISING、gpio.FALLING、gpio.BOTH）
- `timeout`：超时时间（毫秒，可选）

**返回**：
- 检测到边沿时返回管脚号
- 超时时返回None

**示例**：
```python
import hobot_gpio as gpio
import time

gpio.setup(11, gpio.IN)

# 等待上升沿
channel = gpio.wait_for_edge(11, gpio.RISING)
if channel is not None:
    print("检测到上升沿")
```

##### event_detected()函数

**功能**：检测边沿事件并执行回调函数

**参数**：
- `channel`：管脚号
- `edge`：边沿类型
- `callback`：回调函数

**示例**：
```python
import hobot_gpio as gpio

def my_callback(channel):
    print(f"检测到边沿事件，管脚: {channel}")

gpio.setup(11, gpio.IN)
gpio.add_event_detect(11, gpio.RISING, callback=my_callback)

# 主循环
while True:
    pass
```

##### 检测到边沿事件时运行回调函数

```python
import hobot_gpio as gpio

def my_callback(channel):
    print(f"边沿事件，管脚: {channel}")
    # 执行其他操作...

gpio.setup(11, gpio.IN)
gpio.add_event_detect(11, gpio.RISING, callback=my_callback)
```

##### 关闭中断

```python
import hobot_gpio as gpio

# 移除事件检测
gpio.remove_event_detect(11)
```

#### 4.3.3.9 测试例程

```python
import hobot_gpio as gpio
import time

# LED闪烁示例
LED_PIN = 12

gpio.set_mode(gpio.BOARD)
gpio.setup(LED_PIN, gpio.OUT)

try:
    while True:
        gpio.output(LED_PIN, gpio.HIGH)
        time.sleep(0.5)
        gpio.output(LED_PIN, gpio.LOW)
        time.sleep(0.5)
except KeyboardInterrupt:
    pass
finally:
    gpio.cleanup()
```

### 4.3.4 使用PWM

```python
import hobot_pwm as pwm

# 初始化PWM
pwm_obj = pwm.PWM(channel=0, frequency=50)

# 设置占空比（0-100）
pwm_obj.start(50)  # 50%占空比

# 调整占空比
pwm_obj.ChangeDutyCycle(75)  # 75%占空比

# 调整频率
pwm_obj.ChangeFrequency(100)  # 100Hz

# 停止PWM
pwm_obj.stop()
```

### 4.3.5 使用串口

```python
import hobot_uart as uart

# 初始化串口
uart_obj = uart.UART(port="/dev/ttyS1", baudrate=115200)

# 写入数据
uart_obj.write(b"Hello World\n")

# 读取数据
data = uart_obj.read(10)  # 读取10个字节
print(data)

# 读取一行
line = uart_obj.readline()
print(line)

# 关闭串口
uart_obj.close()
```

### 4.3.6 使用I2C

```python
import hobot_i2c as i2c

# 初始化I2C
i2c_obj = i2c.I2C(bus=1, address=0x48)

# 写入数据
i2c_obj.write_byte(0x01, 0x02)

# 读取数据
data = i2c_obj.read_byte(0x01)
print(f"读取的数据: 0x{data:02X}")

# 写入多个字节
i2c_obj.write_i2c_block_data(0x00, [0x01, 0x02, 0x03])

# 读取多个字节
data = i2c_obj.read_i2c_block_data(0x00, 3)
print(f"读取的数据: {data}")

# 关闭I2C
i2c_obj.close()
```

### 4.3.7 使用SPI

```python
import hobot_spi as spi

# 初始化SPI
spi_obj = spi.SPI(bus=0, device=0, max_speed_hz=1000000)

# 写入数据
spi_obj.writebytes([0x01, 0x02, 0x03])

# 读取数据
data = spi_obj.readbytes(3)
print(f"读取的数据: {data}")

# 写入并读取数据
data = spi_obj.xfer2([0x01, 0x02, 0x03])
print(f"返回的数据: {data}")

# 关闭SPI
spi_obj.close()
```

## 🔗 相关资源

- [[旭日X3派学习项目]] - 当前学习项目
- [[旭日X3派快速开始教程]] - 系统安装和快速体验
- [[旭日X3派算法工具链指南]] - 模型转换和部署

## 🌐 官方资源

- [旭日X3派开发者文档](https://developer.d-robotics.cc/api/v1/fileData/documents_pi/index.html#)
- [地平线官网](https://www.horizon.ai/)

## 💡 开发建议

> [!tip] Python开发
> 1. 使用虚拟环境管理Python依赖
> 2. 优先使用Python API进行开发
> 3. 熟悉多媒体接口的使用
> 4. 合理使用40PIN功能
> 5. 注意资源管理和清理

> [!tip] 性能优化
> 1. 使用硬件加速的多媒体接口
> 2. 合理使用模型批处理
> 3. 避免频繁的内存分配和释放
> 4. 使用异步处理提高效率

> [!warning] 注意事项
> - GPIO引脚电压和电流限制
> - 注意摄像头分辨率和帧率的限制
> - 合理管理模型和图像内存
> - 及时释放资源避免内存泄漏

---
**创建时间**: 2026-02-19
**最后更新**: 2026-02-19
**标签**: #para/resource/tech #技术/AI #技术/Python #地平线 #旭日X3 #API文档
