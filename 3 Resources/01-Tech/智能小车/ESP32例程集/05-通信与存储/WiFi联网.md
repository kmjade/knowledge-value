---
title: WiFi联网
status: active
priority: medium
tags: [esp32/examples, wifi, communication]
aliases: [WiFi联网, WiFi连接]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346941/WiFi%E8%81%94%E7%BD%91.html
related:
  - [[MicroROS机器人控制板]]
  - [[蓝牙通讯]]
---

# WiFi联网

> 使用microROS控制板的ESP32S3核心模组，学习ESP32连接WiFi的功能。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

使用microROS控制板的ESP32S3核心模组，学习ESP32连接WiFi的功能。

---

## 二、硬件连接

如下图所示，microROS控制板集成了ESP32-S3-WROOM核心模组，自带无线WiFi功能，ESP32-S3核心模组需要连接天线，还需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240112174901940](https://www.yahboom.com/public/upload/upload-html/1706346941/image-20240112174901940.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/wifi_sta
```

### WiFi初始化

首先，从IDF配置工具里获取要连接的WiFi名称和密码。

```c
#define EXAMPLE_ESP_WIFI_SSID     CONFIG_ESP_WIFI_SSID
#define EXAMPLE_ESP_WIFI_PASS     CONFIG_ESP_WIFI_PASSWORD
#define EXAMPLE_ESP_MAXIMUM_RETRY  CONFIG_ESP_MAXIMUM_RETRY
```

初始化WiFi为STA模式，并且配置要连接的WiFi热点名称、密码等。

```c
void wifi_init_sta(void)
{
    s_wifi_event_group = xEventGroupCreate();
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();

    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;

    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
            ESP_EVENT_ANY_ID,
            &event_handler,
            NULL,
            &instance_any_id));

    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
            IP_EVENT_STA_GOT_IP,
            &event_handler,
            NULL,
            &instance_got_ip));

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = EXAMPLE_ESP_WIFI_SSID,
            .password = EXAMPLE_ESP_WIFI_PASS,
        },
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA) );
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config) );
    ESP_ERROR_CHECK(esp_wifi_start() );
    ESP_LOGI(TAG, "wifi_init_sta finished.");

    /* Waiting until either connection is established (WIFI_CONNECTED_BIT) or connection failed for the maximum
     * number of re-tries (WIFI_FAIL_BIT). The bits are set by event_handler() (see above) */
    EventBits_t bits = xEventGroupWaitBits(s_wifi_event_group,
            WIFI_CONNECTED_BIT | WIFI_FAIL_BIT,
            pdFALSE,
            pdFALSE,
            portMAX_DELAY);

    /* xEventGroupWaitBits() returns the bits before the call returned, hence we can test which event actually
     * happened. */

    if (bits & WIFI_CONNECTED_BIT) {
        ESP_LOGI(TAG, "connected to ap SSID:%s password:%s",
                EXAMPLE_ESP_WIFI_SSID, EXAMPLE_ESP_WIFI_PASS);
    } else if (bits & WIFI_FAIL_BIT) {
        ESP_LOGI(TAG, "Failed to connect to SSID:%s, password:%s",
                EXAMPLE_ESP_WIFI_SSID, EXAMPLE_ESP_WIFI_PASS);
    } else {
        ESP_LOGE(TAG, "UNEXPECTED EVENT");
    }
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
cd ~/esp/Samples/esp32_samples/wifi_sta
```

打开ESP-IDF的配置工具。

打开Example Configuration，在WiFi SSID和WiFi Password这两栏填入自家的WiFi名称和密码。

![image-20240115162027559](https://www.yahboom.com/public/upload/upload-html/1706346941/image-20240115162027559.png)

修改后按S保存，再按Q退出配置工具。

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词，并尝试连接WiFi热点，如下图所示连接成功会打印出连接成功的热点名称和密码。

![image-20240115161717576](https://www.yahboom.com/public/upload/upload-html/1706346941/image-20240115161717576.png)

如果尝试连接失败超过一定次数，则会报失败并终止连接。

![image-20240115164120570](https://www.yahboom.com/public/upload/upload-html/1706346941/image-20240115164120570.png)

---

## 🔗 相关文档

- [[蓝牙通讯]] - 蓝牙通讯
- [[串口通讯]] - 串口通讯
