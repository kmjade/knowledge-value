---
title: 读取IMU数据
status: active
priority: medium
tags: [esp32/examples, imu, sensor]
aliases: [IMU读取, 姿态传感器]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346862/%E8%AF%BB%E5%8F%96IMU%E6%95%B0%E6%8D%AE.html
related:
  - [[MicroROS机器人控制板]]
  - [[ESP32开发基础]]
---

# 读取IMU数据

> 使用microROS控制板的IMU姿态传感器芯片，学习ESP32通过I2C接口读取IMU设备数据的功能。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

使用microROS控制板的IMU姿态传感器芯片，学习ESP32通过I2C接口读取IMU设备数据的功能。

---

## 二、硬件连接

如下图所示，microROS控制板集成了IMU姿态传感器芯片，不需要额外连接外部设备，只需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240112142258274](https://www.yahboom.com/public/upload/upload-html/1706346862/image-20240112142258274.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/read_imu
```

### I2C初始化

IMU传感器芯片使用的是ICM42670P芯片，ICM42670P芯片采用I2C通讯方式传输数据，所以需要先初始化ESP32为I2C主机，I2C_MASTER_GPIO_SDA对应硬件GPIO40，I2C_MASTER_GPIO_SCL对应硬件GPIO39，I2C设置通讯频率为400KHz。

```c
void I2C_Master_Init(void)
{
    ESP_LOGI(TAG, "Init I2C master:SCL->GPIO%d, SDA->GPIO%d", I2C_MASTER_GPIO_SCL, I2C_MASTER_GPIO_SDA);

    i2c_port_t i2c_master_port = I2C_MASTER_NUM;
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_MASTER_GPIO_SDA,
        .scl_io_num = I2C_MASTER_GPIO_SCL,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = I2C_MASTER_FREQ_HZ,
    };

    i2c_param_config(i2c_master_port, &conf);
    ESP_ERROR_CHECK(i2c_driver_install(i2c_master_port, conf.mode, I2C_MASTER_RX_BUF_DISABLE, I2C_MASTER_TX_BUF_DISABLE, 0));
}
```

### I2C读写函数

```c
esp_err_t I2C_Master_Read(uint8_t addr, uint8_t reg, uint16_t len, uint8_t* data)
{
    return i2c_master_write_read_device(I2C_MASTER_NUM, addr, &reg, 1, data, len, I2C_MASTER_TIMEOUT_MS / portTICK_PERIOD_MS);
}

uint8_t I2C_Master_Read_Byte(uint8_t addr, uint8_t reg)
{
    uint8_t data = 0;
    i2c_master_write_read_device(I2C_MASTER_NUM, addr, &reg, 1, &data, 1, I2C_MASTER_TIMEOUT_MS / portTICK_PERIOD_MS);
    return data;
}

esp_err_t I2C_Master_Write(uint8_t addr, uint8_t reg, uint16_t len, uint8_t* data)
{
    int ret;
    uint8_t *buf = (uint8_t *)malloc(len+1);
    buf[0] = reg;
    for (int i = 0; i < len; i++)
    {
        buf[i+1] = data[i];
    }
    ret = i2c_master_write_to_device(I2C_MASTER_NUM, addr, buf, len+1, I2C_MASTER_TIMEOUT_MS / portTICK_PERIOD_MS);
    free(buf);
    return ret;
}
```

### IMU数据获取

获取ICM42670P的加速度计缩放后的数据。

```c
void Icm42670p_Get_Accel_g(float accel_g[3])
{
    accel_g[0] = icm_accel_g[0];
    accel_g[1] = icm_accel_g[1];
    accel_g[2] = icm_accel_g[2];
}
```

获取ICM42670P的陀螺仪缩放后的数据。

```c
void Icm42670p_Get_Gyro_dps(float gyro_dps[3])
{
    gyro_dps[0] = icm_gyro_dps[0];
    gyro_dps[1] = icm_gyro_dps[1];
    gyro_dps[2] = icm_gyro_dps[2];
}
```

---

## 四、编译下载烧录固件

使用Type-C数据线连接虚拟机/电脑与microROS控制板，如果系统弹窗选择连接到虚拟机上。

激活ESP-IDF开发环境，注意每次打开新终端都需要先激活ESP-IDF开发环境才可以编译固件。

```bash
source ~/esp/esp-idf/export.sh
```

进入项目目录

```bash
cd ~/esp/Samples/esp32_samples/read_imu
```

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词。并且每200毫秒打印加速度计和陀螺仪缩放后的数据。此时摇动microROS控制板，可以看到数据会有变化。

![image-20240112161838285](https://www.yahboom.com/public/upload/upload-html/1706346862/image-20240112161838285.png)

---

## 🔗 相关文档

- [[读取雷达数据]] - 雷达数据读取
- [[ESP32开发基础]] - ESP32基础教程
