---
title: ESP32机器人控制项目
status: active
priority: high
tags: [project/robotics, esp32, motor-control, pid]
aliases: [ESP32机器人, 机器人控制项目]
created: 2026-02-20
modified: 2026-02-20
related:
  - [[ESP32例程集]]
  - [[机器人控制笔记]]
  - [[PID控制]]
---

# ESP32机器人控制项目

> 基于 ESP32-S3 的移动机器人控制系统，支持多种传感器、PID 速度控制和 ROS2 通信。

---

## 📋 项目概述

### 项目目标

开发一个功能完整的 ESP32 移动机器人控制系统，支持：
- 双电机差速驱动
- 编码器闭环速度控制
- IMU 姿态传感器
- WiFi 远程控制
- MicroROS ROS2 集成
- Web 控制界面

### 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    ESP32-S3 主控                      │
├─────────────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │  左电机驱动  │  │  右电机驱动  │  │   IMU   │  │
│  │   L298N     │  │   L298N     │  │ ICM42670P│  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───┘  │
│         │                 │                │         │  │
│  ┌──────┴──────┐   ┌──────┴──────┐   │         │  │
│  │  左编码器   │   │  右编码器   │   │         │  │
│  └──────────────┘   └──────────────┘   │         │  │
│                                    │         │  │
│  ┌─────────────────────────────────┴─────────┴──────┐  │
│  │              电源管理 (INA219 + BMS)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              WiFi / 蓝牙通信                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Web 控制服务器                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              MicroROS 客户端                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 硬件清单

### 主控

| 组件 | 规格 | 说明 |
| --- | --- | --- |
| 主控芯片 | ESP32-S3-WROOM-1 | Xtensa LX7 双核 240MHz |
| Flash | 16MB | 程序存储 |
| PSRAM | 8MB | 外部 RAM |
| 电源 | 5V/3A | USB-C 供电 |

### 电机驱动

| 组件 | 规格 | 说明 |
| --- | --- | --- |
| 电机驱动 | L298N | 双 H 桥，最大 2A/通道 |
| 电机 | JGB37-520 12V | 减速电机，减速比 1:30 |
| 编码器 | 增量编码器 | A/B 相，PPR 根据齿轮比 |

### 传感器

| 组件 | 接口 | 说明 |
| --- | --- | --- |
| IMU | I2C | ICM42670P 6轴姿态传感器 |
| 超声波 | GPIO | HC-SR04 距离测量 |
| 电压检测 | I2C | INA219 功率监测 |

### 通信模块

| 组件 | 接口 | 说明 |
| --- | --- | --- |
| WiFi | 内置 | ESP32-S3 内置 |
| 蓝牙 | 内置 | BLE 5.0 |
| UART | 外部 | 用于调试和上位机通信 |

---

## 📁 项目结构

```
esp32-robot-control/
├── main/                      # 主程序入口
│   └── main.cpp              # 主循环
├── components/
│   ├── motor_driver/          # 电机驱动模块
│   │   ├── motor_driver.hpp   # 电机驱动头文件
│   │   ├── motor_driver.cpp   # 电机驱动实现
│   │   ├── pid.hpp          # PID 控制器
│   │   └── pid.cpp          # PID 实现
│   ├── encoder/              # 编码器模块
│   │   ├── encoder.hpp       # 编码器头文件
│   │   └── encoder.cpp       # 编码器实现
│   ├── sensors/              # 传感器模块
│   │   ├── imu.hpp          # IMU 头文件
│   │   ├── imu.cpp          # IMU 实现
│   │   ├── ultrasonic.hpp   # 超声波头文件
│   │   └── ultrasonic.cpp   # 超声波实现
│   ├── power/                # 电源管理模块
│   │   ├── power_monitor.hpp
│   │   └── power_monitor.cpp
│   ├── communication/        # 通信模块
│   │   ├── uart_command.hpp
│   │   ├── uart_command.cpp
│   │   ├── wifi_server.hpp
│   │   └── wifi_server.cpp
│   └── microros/            # MicroROS 模块
│       ├── microros_node.hpp
│       └── microros_node.cpp
├── config/
│   ├── sdkconfig.h            # ESP-IDF 配置
│   └── robot_config.h         # 机器人参数配置
├── CMakeLists.txt             # 构建配置
└── README.md                  # 项目说明
```

---

## 💻 核心模块

### 1. 电机驱动模块

#### 引脚定义

```cpp
// motor_driver.hpp
#pragma once

#include "driver/mcpwm.h"
#include "driver/gpio.h"

namespace robot {

class MotorDriver {
public:
    // 电机引脚配置
    struct Config {
        // 左电机
        int left_pwm_a;      // GPIO
        int left_pwm_b;      // GPIO
        int left_dir;       // GPIO 方向

        // 右电机
        int right_pwm_a;     // GPIO
        int right_pwm_b;     // GPIO
        int right_dir;      // GPIO 方向

        int pwm_freq;        // PWM 频率 Hz
        int pwm_resolution;   // PWM 分辨率
    };

    MotorDriver(const Config& config);
    ~MotorDriver();

    // 速度控制 (-1.0 ~ 1.0)
    void setVelocity(float left_speed, float right_speed);

    // 停止
    void stop();

    // 使能/失能
    void enable(bool en);

private:
    Config config_;
    mcpwm_cmphandle_t pwm_handle_;

    void initPWM();
    void setMotorPWM(int motor, float speed);
};

} // namespace robot
```

#### PWM 速度控制

```cpp
// motor_driver.cpp
#include "motor_driver.hpp"
#include "esp_log.h"

namespace robot {

MotorDriver::MotorDriver(const Config& config) : config_(config) {
    initPWM();
}

void MotorDriver::initPWM() {
    // 配置 MCPWM 定时器
    mcpwm_timer_config_t timer_cfg = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = config_.pwm_resolution,
        .period_ticks = config_.pwm_resolution / config_.pwm_freq,
        .count_mode = MCPWM_UP_COUNTER_MODE,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_cfg, &pwm_handle_));

    // 配置 PWM 通道
    mcpwm_oper_handle_t operators[] = {
        {.gpio_num = static_cast<gpio_num_t>(config_.left_pwm_a)},
        {.gpio_num = static_cast<gpio_num_t>(config_.left_pwm_b)},
        {.gpio_num = static_cast<gpio_num_t>(config_.right_pwm_a)},
        {.gpio_num = static_cast<gpio_num_t>(config_.right_pwm_b)},
    };
    // ... 配置代码
}

void MotorDriver::setVelocity(float left_speed, float right_speed) {
    // 速度范围: -1.0 (全速后退) ~ 1.0 (全速前进)
    setMotorPWM(0, left_speed);   // 左电机
    setMotorPWM(1, right_speed);  // 右电机
}

void MotorDriver::setMotorPWM(int motor, float speed) {
    int gpio_a = (motor == 0) ? config_.left_pwm_a : config_.right_pwm_a;
    int gpio_b = (motor == 0) ? config_.left_pwm_b : config_.right_pwm_b;
    int dir_pin = (motor == 0) ? config_.left_dir : config_.right_dir;

    // 计算占空比
    int duty = abs(speed) * (config_.pwm_resolution / 100.0);
    duty = std::min(duty, config_.pwm_resolution);

    // 设置方向
    gpio_set_level(static_cast<gpio_num_t>(dir_pin), speed >= 0 ? 1 : 0);

    // 设置 PWM
    if (speed >= 0) {
        mcpwm_set_duty_in_us(pwm_handle_, motor * 2, duty);      // A 相
        mcpwm_set_duty_in_us(pwm_handle_, motor * 2 + 1, 0);  // B 相
    } else {
        mcpwm_set_duty_in_us(pwm_handle_, motor * 2, 0);      // A 相
        mcpwm_set_duty_in_us(pwm_handle_, motor * 2 + 1, duty);  // B 相
    }
}

void MotorDriver::stop() {
    setVelocity(0.0, 0.0);
}

} // namespace robot
```

---

### 2. 编码器模块

#### 编码器读取

```cpp
// encoder.hpp
#pragma once

#include "driver/gpio.h"
#include "driver/pcnt.h"

namespace robot {

class Encoder {
public:
    struct Config {
        int phase_a_gpio;    // A 相 GPIO
        int phase_b_gpio;    // B 相 GPIO
        int ppr;           // 每转脉冲数
        float wheel_diameter; // 轮直径 mm
        float gear_ratio;    // 减速比
    };

    Encoder(const Config& config, int unit);
    ~Encoder();

    // 重置计数
    void reset();

    // 获取当前速度 m/s
    float getSpeed();

    // 获取总距离 m
    float getDistance();

    // 获取脉冲计数
    int64_t getCount();

private:
    Config config_;
    pcnt_unit_handle_t pcnt_unit_;
    int64_t last_count_;
    int64_t total_count_;
    uint64_t last_update_time_;

    void initPCNT();
    void updateSpeed();
};

} // namespace robot
```

#### PCNT 配置

```cpp
// encoder.cpp
#include "encoder.hpp"
#include "esp_log.h"

namespace robot {

Encoder::Encoder(const Config& config, int unit)
    : config_(config), last_count_(0), total_count_(0) {

    pcnt_config_t pcnt_config = {
        .high_limit = config.ppr * config.gear_ratio,
        .low_limit = -config.ppr * config.gear_ratio,
        .flags = PCNT_UNIT_MODE_INCREASE,
        .channel = PCNT_CHANNEL_0,
    };

    ESP_ERROR_CHECK(pcnt_new_unit(&pcnt_config, &pcnt_unit_));
    initPCNT();
}

void Encoder::initPCNT() {
    // 配置 GPIO 为编码器输入
    gpio_set_direction(static_cast<gpio_num_t>(config_.phase_a_gpio), GPIO_MODE_INPUT);
    gpio_set_direction(static_cast<gpio_num_t>(config_.phase_b_gpio), GPIO_MODE_INPUT);

    // 配置 PCNT 计数通道
    pcnt_counter_config_t counter_config = {
        .low_limit = -config_.ppr * config_.gear_ratio,
        .high_limit = config_.ppr * config_.gear_ratio,
        .flags = PCNT_COUNT_DIS_EN | PCNT_COUNT_NEG_EN,
    };

    pcnt_unit_config(&pcnt_unit_, &counter_config);
    pcnt_counter_pause(pcnt_unit_);
    pcnt_counter_clear(pcnt_unit_);
    pcnt_counter_resume(pcnt_unit_);
}

float Encoder::getSpeed() {
    int64_t current_count = getCount();
    int64_t delta = current_count - last_count_;
    last_count_ = current_count;

    // 计算脉冲/秒
    uint64_t current_time = esp_timer_get_time();
    float dt = (current_time - last_update_time_) / 1000000.0f;  // 转换为秒
    last_update_time_ = current_time;

    float pulses_per_sec = abs(delta) / dt;

    // 转换为线速度 m/s
    // 线速度 = 脉冲/秒 * 轮周长 / (PPR * 减速比)
    float wheel_circumference = M_PI * config_.wheel_diameter;
    float speed = (pulses_per_sec * wheel_circumference) /
                (config_.ppr * config_.gear_ratio * 1000.0f);  // mm/s -> m/s

    return speed;
}

} // namespace robot
```

---

### 3. PID 控制模块

```cpp
// pid.hpp
#pragma once

namespace robot {

class PIDController {
public:
    struct Config {
        float kp;  // 比例系数
        float ki;  // 积分系数
        float kd;  // 微分系数
        float output_min;  // 输出最小值
        float output_max;  // 输出最大值
        float integral_limit;  // 积分限幅
    };

    PIDController(const Config& config);
    ~PIDController() = default;

    // 重置 PID 状态
    void reset();

    // 计算 PID 输出
    float compute(float setpoint, float input, float dt);

    // 设置目标值
    void setSetpoint(float setpoint) { setpoint_ = setpoint; }

private:
    Config config_;
    float setpoint_;
    float last_input_;
    float integral_;
    uint64_t last_time_;
};

} // namespace robot
```

#### PID 实现

```cpp
// pid.cpp
#include "pid.hpp"
#include "esp_log.h"
#include <algorithm>

namespace robot {

PIDController::PIDController(const Config& config)
    : config_(config), setpoint_(0), last_input_(0), integral_(0) {
    reset();
}

void PIDController::reset() {
    setpoint_ = 0;
    last_input_ = 0;
    integral_ = 0;
    last_time_ = esp_timer_get_time();
}

float PIDController::compute(float setpoint, float input, float dt) {
    // 计算误差
    float error = setpoint - input;

    // 积分项（带抗饱和）
    integral_ += error * dt;
    integral_ = std::clamp(integral_, -config_.integral_limit, config_.integral_limit);

    // 微分项
    float derivative = (error - last_input_) / dt;
    last_input_ = error;

    // PID 输出
    float output = (config_.kp * error) +
                  (config_.ki * integral_) +
                  (config_.kd * derivative);

    // 输出限幅
    return std::clamp(output, config_.output_min, config_.output_max);
}

} // namespace robot
```

---

### 4. 速度闭环控制

```cpp
// velocity_controller.hpp
#pragma once

#include "motor_driver.hpp"
#include "encoder.hpp"
#include "pid.hpp"

namespace robot {

class VelocityController {
public:
    VelocityController(MotorDriver& motor, Encoder& encoder);

    // 设置目标速度 m/s
    void setTargetVelocity(float left_target, float right_target);

    // 控制循环（周期调用）
    void update();

    // 使能/失能
    void enable(bool en) { enabled_ = en; }

private:
    MotorDriver& motor_;
    Encoder& encoder_;
    PIDController left_pid_;
    PIDController right_pid_;
    bool enabled_;

    static constexpr float CONTROL_FREQ = 50.0f;  // 50Hz 控制频率
    static constexpr float DT = 1.0f / CONTROL_FREQ;
};

} // namespace robot
```

```cpp
// velocity_controller.cpp
#include "velocity_controller.hpp"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"

namespace robot {

VelocityController::VelocityController(MotorDriver& motor, Encoder& encoder)
    : motor_(motor), encoder_(encoder), enabled_(false) {

    // PID 参数配置（根据电机特性调整）
    PIDController::Config pid_config = {
        .kp = 0.5f,        // 比例增益
        .ki = 0.1f,        // 积分增益
        .kd = 0.01f,       // 微分增益
        .output_min = -1.0f,
        .output_max = 1.0f,
        .integral_limit = 2.0f
    };

    left_pid_ = PIDController(pid_config);
    right_pid_ = PIDController(pid_config);
}

void VelocityController::setTargetVelocity(float left_target, float right_target) {
    left_pid_.setSetpoint(left_target);
    right_pid_.setSetpoint(right_target);
}

void VelocityController::update() {
    if (!enabled_) return;

    // 获取当前速度
    float left_speed = encoder_[0].getSpeed();
    float right_speed = encoder_[1].getSpeed();

    // 计算 PID 输出
    float left_output = left_pid_.compute(
        left_pid_.getSetpoint(), left_speed, DT);
    float right_output = right_pid_.compute(
        right_pid_.getSetpoint(), right_speed, DT);

    // 应用到电机
    motor_.setVelocity(left_output, right_output);
}

} // namespace robot
```

---

### 5. IMU 传感器模块

```cpp
// imu.hpp
#pragma once

#include "driver/i2c.h"

namespace robot {

struct IMUData {
    // 姿态角 (弧度)
    float roll;
    float pitch;
    float yaw;

    // 加速度 (m/s²)
    float acc_x;
    float acc_y;
    float acc_z;

    // 角速度 (rad/s)
    float gyro_x;
    float gyro_y;
    float gyro_z;

    uint64_t timestamp;
};

class IMU {
public:
    IMU(i2c_port_t port, uint8_t addr);
    ~IMU();

    bool init();
    bool read(IMUData& data);

    // 校准
    void calibrate();

private:
    i2c_port_t i2c_port_;
    uint8_t device_addr_;
    IMUData offset_;
    bool initialized_;
};

} // namespace robot
```

```cpp
// imu.cpp
#include "imu.hpp"
#include "esp_log.h"

namespace robot {

// ICM42670P 寄存器地址
constexpr uint8_t REG_WHO_AM_I        = 0x00;
constexpr uint8_t REG_BANK_SEL          = 0x7F;
constexpr uint8_t REG_TEMP_OUT_L       = 0x1D;
// ... 其他寄存器定义

bool IMU::init() {
    // 检查设备 ID
    uint8_t who_am_i = 0;
    i2c_master_write_to_device(i2c_port_, device_addr_,
        REG_WHO_AM_I, &who_am_i, 1, 100 / portTICK_PERIOD_MS);

    if (who_am_i != 0x47) {  // ICM42670P 设备 ID
        ESP_LOGE(TAG, "IMU not detected! WHO_AM_I = 0x%02X", who_am_i);
        return false;
    }

    // 配置 IMU
    uint8_t bank_sel = 0;
    i2c_master_write_to_device(i2c_port_, device_addr_,
        REG_BANK_SEL, &bank_sel, 1, 100 / portTICK_PERIOD_MS);

    // ... 其他初始化代码

    initialized_ = true;
    return true;
}

bool IMU::read(IMUData& data) {
    if (!initialized_) return false;

    // 读取加速度数据
    uint8_t acc_data[6];
    i2c_master_read_from_device(i2c_port_, device_addr_,
        REG_TEMP_OUT_L, acc_data, 6, 100 / portTICK_PERIOD_MS);

    // 解析加速度 (16位)
    int16_t acc_x_raw = (acc_data[1] << 8) | acc_data[0];
    int16_t acc_y_raw = (acc_data[3] << 8) | acc_data[2];
    int16_t acc_z_raw = (acc_data[5] << 8) | acc_data[4];

    data.acc_x = acc_x_raw * 2048.0f / 32768.0f;  // 转换为 m/s²
    data.acc_y = acc_y_raw * 2048.0f / 32768.0f;
    data.acc_z = acc_z_raw * 2048.0f / 32768.0f;

    // 读取陀螺仪数据
    // ... 类似的读取和转换

    // 读取温度数据并计算姿态
    // ... 姿态解算代码

    data.timestamp = esp_timer_get_time();
    return true;
}

} // namespace robot
```

---

### 6. UART 命令模块

```cpp
// uart_command.hpp
#pragma once

#include <string>
#include "driver/uart.h"

namespace robot {

enum class CommandType : uint8_t {
    VELOCITY = 0x01,      // 速度控制
    STOP = 0x02,          // 停止
    RESET_ODOM = 0x03,    // 重置里程计
    GET_STATUS = 0x04,     // 获取状态
    SET_PID = 0x05,       // 设置 PID 参数
};

struct Command {
    CommandType type;
    float param1;
    float param2;
    uint8_t checksum;
};

class UARTCommand {
public:
    UARTCommand(uart_port_t port, int tx_pin, int rx_pin);
    ~UARTCommand();

    bool init();
    bool sendCommand(const Command& cmd);
    bool receiveCommand(Command& cmd, uint32_t timeout_ms);

private:
    uart_port_t uart_port_;
    int tx_pin_;
    int rx_pin_;
    uint8_t rx_buffer_[256];
    size_t rx_len_;

    uint8_t calculateChecksum(const Command& cmd);
};

} // namespace robot
```

```cpp
// uart_command.cpp
#include "uart_command.hpp"
#include "esp_log.h"

namespace robot {

bool UARTCommand::init() {
    uart_config_t uart_config = {
        .baud_rate = 115200,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
        .source_clk = UART_SCLK_DEFAULT,
    };

    ESP_ERROR_CHECK(uart_driver_install(&uart_config,
        256, 0, 0, &uart_port_));
    ESP_ERROR_CHECK(uart_param_config(uart_port_));
    ESP_ERROR_CHECK(uart_set_pin(uart_port_, tx_pin_, rx_pin_));

    return true;
}

bool UARTCommand::sendCommand(const Command& cmd) {
    uint8_t buffer[16];
    buffer[0] = static_cast<uint8_t>(cmd.type);
    memcpy(&buffer[1], &cmd.param1, 4);  // float (4 bytes)
    memcpy(&buffer[5], &cmd.param2, 4);
    buffer[9] = calculateChecksum(cmd);

    int bytes_written = uart_write_bytes(uart_port_, buffer, 10, 100 / portTICK_PERIOD_MS);
    return bytes_written == 10;
}

bool UARTCommand::receiveCommand(Command& cmd, uint32_t timeout_ms) {
    size_t bytes_read = uart_read_bytes(uart_port_, rx_buffer_, 256, timeout_ms);
    if (bytes_read != 10) return false;

    cmd.type = static_cast<CommandType>(rx_buffer_[0]);
    memcpy(&cmd.param1, &rx_buffer_[1], 4);
    memcpy(&cmd.param2, &rx_buffer_[5], 4);

    // 验证校验和
    uint8_t calculated_checksum = 0;
    for (int i = 0; i < 9; i++) {
        calculated_checksum += rx_buffer_[i];
    }
    return calculated_checksum == rx_buffer_[9];
}

uint8_t UARTCommand::calculateChecksum(const Command& cmd) {
    uint8_t sum = static_cast<uint8_t>(cmd.type);
    const uint8_t* p1 = reinterpret_cast<const uint8_t*>(&cmd.param1);
    const uint8_t* p2 = reinterpret_cast<const uint8_t*>(&cmd.param2);
    for (int i = 0; i < 4; i++) {
        sum += p1[i];
        sum += p2[i];
    }
    return ~sum;  // 取反作为校验和
}

} // namespace robot
```

---

### 7. Web 控制界面

```cpp
// wifi_server.hpp
#pragma once

#include "esp_http_server.h"
#include "mdns.h"

namespace robot {

class WebServer {
public:
    WebServer();
    ~WebServer();

    bool start(const char* ssid, const char* password);
    void stop();

private:
    httpd_handle_t server_;

    // URI 处理器
    void registerHandlers();
    void handleRoot(httpd_req_t* req);
    void handleControl(httpd_req_t* req);
    void handleStatus(httpd_req_t* req);
    void handleSetPID(httpd_req_t* req);

    // 生成 JSON 响应
    void sendJSON(httpd_req_t* req, const char* json);
};

} // namespace robot
```

```cpp
// wifi_server.cpp
#include "wifi_server.hpp"
#include "esp_log.h"
#include "cJSON.h"

namespace robot {

// 静态 HTML 页面
static const char index_html[] = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <title>ESP32 Robot Control</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial; margin: 20px; }
        .control { display: flex; gap: 10px; margin: 20px 0; }
        .btn { padding: 10px 20px; font-size: 16px; cursor: pointer; }
        .btn.up { background: #4CAF50; color: white; }
        .btn.down { background: #f44336; color: white; }
        .btn.stop { background: #ff9800; color: white; }
        .status { padding: 10px; background: #e0e0e0; }
    </style>
</head>
<body>
    <h1>ESP32 Robot Control</h1>
    <div class="status" id="status">Status: Connected</div>

    <div class="control">
        <button class="btn up" onmousedown="sendCmd('UP')" onmouseup="sendCmd('STOP')">↑</button>
    </div>
    <div class="control">
        <button class="btn up" onmousedown="sendCmd('LEFT')" onmouseup="sendCmd('STOP')">←</button>
        <button class="btn stop" onclick="sendCmd('STOP')">STOP</button>
        <button class="btn up" onmousedown="sendCmd('RIGHT')" onmouseup="sendCmd('STOP')">→</button>
    </div>
    <div class="control">
        <button class="btn down" onmousedown="sendCmd('DOWN')" onmouseup="sendCmd('STOP')">↓</button>
    </div>

    <h2>Speed: <span id="speed">0.00</span> m/s</h2>
    <h2>Battery: <span id="battery">0.00</span> V</h2>

    <script>
        function sendCmd(cmd) {
            fetch('/control?cmd=' + cmd).then(r => r.json());
        }
        setInterval(updateStatus, 500);
        function updateStatus() {
            fetch('/status').then(r => r.json()).then(data => {
                document.getElementById('speed').innerText = data.speed.toFixed(2);
                document.getElementById('battery').innerText = data.battery.toFixed(2);
            });
        }
    </script>
</body>
</html>
)rawliteral";

void WebServer::registerHandlers() {
    httpd_uri_t uri_get = {
        .uri = "/",
        .method = HTTP_GET,
        .handler = handleRoot,
        .user_ctx = this
    };

    httpd_uri_t uri_control = {
        .uri = "/control",
        .method = HTTP_GET,
        .handler = handleControl,
        .user_ctx = this
    };

    httpd_uri_t uri_status = {
        .uri = "/status",
        .method = HTTP_GET,
        .handler = handleStatus,
        .user_ctx = this
    };

    httpd_register_uri_handler(server_, &uri_get);
    httpd_register_uri_handler(server_, &uri_control);
    httpd_register_uri_handler(server_, &uri_status);
}

esp_err_t WebServer::handleRoot(httpd_req_t* req) {
    httpd_resp_sendstr(req, HTTPD_200, "text/html", index_html);
    return ESP_OK;
}

esp_err_t WebServer::handleControl(httpd_req_t* req) {
    // 解析 URL 参数
    char cmd_str[32];
    size_t buf_len = httpd_req_get_url_query_len(req);

    if (httpd_req_get_url_query_str(req, cmd_str, buf_len) == ESP_OK) {
        // 处理控制命令
        // ... 命令处理逻辑
    }

    sendJSON(req, R"({"status":"ok"})");
    return ESP_OK;
}

esp_err_t WebServer::handleStatus(httpd_req_t* req) {
    // 获取机器人状态
    float speed = /* 从速度控制器获取 */;
    float battery = /* 从电源模块获取 */;

    char response[128];
    snprintf(response, sizeof(response),
        R"({"speed":%.2f,"battery":%.2f})",
        speed, battery);

    sendJSON(req, response);
    return ESP_OK;
}

} // namespace robot
```

---

### 8. MicroROS 集成

```cpp
// microros_node.hpp
#pragma once

#include <micro_ros.hpp>
#include "motor_driver.hpp"

namespace robot {

class MicroROSNode {
public:
    MicroROSNode();
    ~MicroROSNode();

    bool init(const char* agent_ip, uint16_t agent_port);
    void spin();
    void publishVelocity();
    void publishOdom();

private:
    rclc_support_t support_;
    rclc_executor_t executor_;
    rcl_publisher_t cmd_vel_publisher_;
    rcl_subscription_t cmd_vel_subscription_;

    // 发布器
    void createPublishers();
    // 订阅器
    void createSubscriptions();
};

} // namespace robot
```

---

## 📝 主程序

```cpp
// main.cpp
#include <esp_log.h>
#include <freertos/FreeRTOS.h>

#include "motor_driver.hpp"
#include "encoder.hpp"
#include "pid.hpp"
#include "velocity_controller.hpp"
#include "imu.hpp"
#include "wifi_server.hpp"
#include "microros_node.hpp"

using namespace robot;

// 硬件配置
static const MotorDriver::Config MOTOR_CONFIG = {
    // 左电机
    .left_pwm_a = GPIO_NUM_12,
    .left_pwm_b = GPIO_NUM_13,
    .left_dir = GPIO_NUM_14,
    // 右电机
    .right_pwm_a = GPIO_NUM_15,
    .right_pwm_b = GPIO_NUM_16,
    .right_dir = GPIO_NUM_17,
    // PWM 配置
    .pwm_freq = 20000,
    .pwm_resolution = 10000,
};

static const Encoder::Config ENCODER_CONFIG[] = {
    {
        .phase_a_gpio = GPIO_NUM_18,
        .phase_b_gpio = GPIO_NUM_19,
        .ppr = 11,
        .wheel_diameter = 65.0f,
        .gear_ratio = 30.0f,
    },
    {
        .phase_a_gpio = GPIO_NUM_20,
        .phase_b_gpio = GPIO_NUM_21,
        .ppr = 11,
        .wheel_diameter = 65.0f,
        .gear_ratio = 30.0f,
    }
};

// 全局对象
static MotorDriver* g_motor = nullptr;
static Encoder* g_encoders[2] = {nullptr, nullptr};
static VelocityController* g_velocity_ctrl = nullptr;
static IMU* g_imu = nullptr;
static WebServer* g_web_server = nullptr;
static MicroROSNode* g_microros = nullptr;

// 控制任务
static TaskHandle_t control_task_handle = nullptr;

// 控制循环
void control_loop(void* pvParameters) {
    const TickType_t delay_ticks = pdMS_TO_TICKS(1000 / VelocityController::CONTROL_FREQ);

    while (true) {
        g_velocity_ctrl->update();
        vTaskDelay(delay_ticks);
    }
}

// IMU 更新任务
void imu_task(void* pvParameters) {
    IMUData imu_data;

    while (true) {
        if (g_imu->read(imu_data)) {
            ESP_LOGI(TAG, "Roll: %.2f, Pitch: %.2f, Yaw: %.2f",
                imu_data.roll, imu_data.pitch, imu_data.yaw);
        }
        vTaskDelay(pdMS_TO_TICKS(50));  // 20Hz
    }
}

extern "C" void app_main() {
    ESP_LOGI(TAG, "ESP32 Robot Control Starting...");

    // 初始化 NVS
    esp_err_t ret = nvs_flash_init();
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "NVS init failed: %s", esp_err_to_name(ret));
    }

    // 初始化电机驱动
    g_motor = new MotorDriver(MOTOR_CONFIG);
    ESP_LOGI(TAG, "Motor driver initialized");

    // 初始化编码器
    g_encoders[0] = new Encoder(ENCODER_CONFIG[0], PCNT_UNIT_0);
    g_encoders[1] = new Encoder(ENCODER_CONFIG[1], PCNT_UNIT_1);
    ESP_LOGI(TAG, "Encoders initialized");

    // 初始化速度控制器
    g_velocity_ctrl = new VelocityController(*g_motor, *g_encoders[0], *g_encoders[1]);
    ESP_LOGI(TAG, "Velocity controller initialized");

    // 初始化 IMU
    g_imu = new IMU(I2C_NUM_0, 0x68);
    if (!g_imu->init()) {
        ESP_LOGW(TAG, "IMU init failed, continuing without IMU");
    }
    g_imu->calibrate();

    // 初始化 Web 服务器
    g_web_server = new WebServer();
    g_web_server->start("ESP32_Robot", "12345678");
    ESP_LOGI(TAG, "Web server started");

    // 初始化 MicroROS
    g_microros = new MicroROSNode();
    g_microros->init("192.168.1.10", 8888);
    ESP_LOGI(TAG, "MicroROS initialized");

    // 启动控制任务
    xTaskCreate(control_loop, "control", 4096, nullptr, 5, &control_task_handle, 5);

    // 启动 IMU 任务
    xTaskCreate(imu_task, "imu", 4096, nullptr, 5, nullptr, 5);

    ESP_LOGI(TAG, "System ready!");
    vTaskDelete(NULL);
}
```

---

## 🔧 CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)

set(PROJECT_NAME "esp32-robot-control")
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(${PROJECT_NAME})

# 组件目录
EXTRA_COMPONENT_DIRS = "components"

# 主程序
idf_component_register(SRCS "main" "." "${COMPONENT_SRCS}" "${COMPONENT_REQUIRES}")

# 组件依赖
idf_component_register(SRCS "motor_driver" "components/motor_driver"
    REQUIRES driver "motor_driver")
idf_component_register(SRCS "encoder" "components/encoder"
    REQUIRES driver "encoder")
idf_component_register(SRCS "sensors" "components/sensors"
    REQUIRES driver "sensors")
```

---

## 🔧 配置文件

### robot_config.h

```cpp
#pragma once

namespace robot::config {

// 轮子参数
constexpr float WHEEL_DIAMETER = 65.0f;      // mm
constexpr float WHEEL_BASE = 150.0f;          // mm
constexpr int PPR = 11;                       // 每转脉冲数
constexpr float GEAR_RATIO = 30.0f;            // 减速比

// 电机参数
constexpr float MAX_VELOCITY = 0.5f;          // m/s
constexpr float MIN_VELOCITY = -0.5f;         // m/s

// PID 参数
constexpr float KP = 0.5f;
constexpr float KI = 0.1f;
constexpr float KD = 0.01f;

// 通信参数
constexpr int UART_BAUDRATE = 115200;
constexpr int WEB_SERVER_PORT = 80;

// MicroROS 参数
constexpr int ROS_DOMAIN_ID = 0;
constexpr char* AGENT_IP = "192.168.1.10";
constexpr int AGENT_PORT = 8888;

// 电池参数
constexpr float BATTERY_MIN_VOLTAGE = 10.8f;  // 3S 最低电压
constexpr float BATTERY_MAX_VOLTAGE = 12.6f;  // 3S 满电电压

} // namespace robot::config
```

---

## 🚀 编译与烧录

### 环境准备

```bash
# 设置 ESP-IDF 环境
source ~/esp/esp-idf/export.sh

# 设置目标芯片
idf.py set-target esp32s3
```

### 编译

```bash
# 编译项目
idf.py build
```

### 烧录

```bash
# 烧录到开发板
idf.py -p COM3 flash

# 监控输出
idf.py -p COM3 monitor
```

---

## 🧪 测试与调试

### 单元测试

- [ ] 电机正反转测试
- [ ] 编码器计数测试
- [ ] PID 闭环响应测试
- [ ] IMU 数据读取测试
- [ ] Web 控制界面测试
- [ ] UART 通信测试

### 系统测试

- [ ] 直线行驶测试
- [ ] 原地转向测试
- [ ] 速度跟随测试
- [ ] 里程计精度测试
- [ ] MicroROS 发布测试

---

## 📚 参考资源

- [[ESP32例程集]] - ESP32 开发例程
- [[机器人控制笔记]] - 机器人控制理论
- [[PID控制]] - PID 算法原理
- [ESP32-IDF 文档](https://docs.espressif.com/projects/esp-idf/)
- [MicroROS 文档](https://micro.ros.org/docs/esp32/)

---

*项目状态: 进行中*
*创建时间: 2026-02-20*
