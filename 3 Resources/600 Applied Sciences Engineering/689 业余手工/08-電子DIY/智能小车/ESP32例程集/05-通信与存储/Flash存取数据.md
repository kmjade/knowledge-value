---
title: Flash存取数据
status: active
priority: medium
tags: [esp32/examples, flash, storage]
aliases: [Flash存储, NVS存储]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346896/Flash%E5%AD%98%E5%8F%96%E6%95%B0%E6%8D%AE.html
related:
  - [[MicroROS机器人控制板]]
  - [[自定义分区表]]
---

# Flash存取数据

> 使用microROS控制板的flash存储功能，学习ESP32的数据掉电保存的功能。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

使用microROS控制板的flash存储功能，学习ESP32的数据掉电保存的功能。

---

## 二、硬件连接

如下图所示，microROS控制板集成了ESP32-S3-WROOM-1U-N4R2核心模组，不仅有内部空间，还有额外4MB FLASH程序空间，以及2MB PSRAM内存空间，只需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240112174901940](https://www.yahboom.com/public/upload/upload-html/1706346896/image-20240112174901940.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/flash
```

### 初始化Flash

初始化flash芯片，由于ESP32-S3内部已经预留好flash芯片的引脚，在使用ESP32-S3-WROOM核心模组时，无需单独配置flash芯片引脚。

```c
void Flash_Init(void)
{
    // Initialize NVS
    esp_err_t err = nvs_flash_init();

    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        // NVS partition was truncated and needs to be erased
        // Retry nvs_flash_init
        ESP_ERROR_CHECK(nvs_flash_erase());
        err = nvs_flash_init();
    }

    ESP_ERROR_CHECK(err);
}
```

### Flash数据读写

flash芯片存储的类型有多种，通过不同的key来区分不同的数据位置。这里以从flash读取一个int32类型的数据为例。

```c
esp_err_t Flash_Read_Data_Int32(const char* key, int32_t* out_value)
{
    nvs_handle_t my_handle;
    int32_t read_value = 0;
    esp_err_t err = ESP_OK;

    err = nvs_open(STORAGE_NAMESPACE, NVS_READONLY, &my_handle);
    if (err != ESP_OK) return err;

    err = nvs_get_i32(my_handle, key, &read_value);

    if (err == ESP_OK) {
        *out_value = read_value;
    }
    else {
        *out_value = 0;
    }

    nvs_close(my_handle);
    return err;
}
```

写入一个int32类型的数据到flash芯片。

```c
esp_err_t Flash_Write_Data_Int32(const char* key, int32_t value)
{
    nvs_handle_t my_handle;
    esp_err_t err = ESP_FAIL;
    int32_t read_value = 0;

    err = nvs_open(STORAGE_NAMESPACE, NVS_READWRITE, &my_handle);
    if (err != ESP_OK) return err;

    err = nvs_set_i32(my_handle, key, value);

    // 写入数据后必须调用nvs_commit提交写入闪存。
    // After writing data, you must call nvs commit to write to flash.
    if (err == ESP_OK) err = nvs_commit(my_handle);

    if (err == ESP_OK) err = nvs_get_i32(my_handle, key, &read_value);

    if (err == ESP_OK && value != read_value) err = ESP_FAIL;

    nvs_close(my_handle);
    return err;
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
cd ~/esp/Samples/esp32_samples/flash
```

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词。

![image-20240112182437932](https://www.yahboom.com/public/upload/upload-html/1706346896/image-20240112182437932.png)

然后滑动鼠标滚轮向上查看打印的系统信息，可以看到数据成功写入flash。

---

## 🔗 相关文档

- [[自定义分区表]] - 分区表配置
- [[WiFi联网]] - WiFi网络连接
