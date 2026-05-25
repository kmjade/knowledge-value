---
title: 驱动PWM舵机
status: active
priority: medium
tags: [esp32/examples, pwm, servo]
aliases: [舵机控制, PWM舵机]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346792/%E9%A9%B1%E5%8A%A8PWM%E8%88%B5%E6%9C%BA.html
related:
  - [[MicroROS机器人控制板]]
  - [[ESP32开发基础]]
---

# 驱动PWM舵机

> 使用microROS控制板的PWM输出，学习ESP32如何控制PWM舵机。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

使用microROS控制板的PWM输出，学习ESP32如何控制PWM舵机。

---

## 二、硬件连接

如下图所示，microROS控制板集成了PWM舵机控制接口，但是需要额外连接PWM舵机，PWM舵机需自备，还需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240111142618969](https://www.yahboom.com/public/upload/upload-html/1706346792/image-20240111142618969.png)

PWM舵机口下方为S1,上方为S2，请根据丝印连接，棕色线连接GND，红色线连接5V，黄色线连接S1/S2。

![image-20240111143813069](https://www.yahboom.com/public/upload/upload-html/1706346792/image-20240111143813069.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/pwm_servo
```

由于舵机S1与S2的初始化方式差别不大，只是舵机S1对应硬件GPIO8，舵机S2对应硬件GPIO21的区别。以下以舵机S1为例解释说明。

首先初始化舵机S1的GPIO为PWM输出，频率为50HZ，使用定时器组1来当做PWM输出时钟。

```c
static void Servo_S1_Init(void)
{
    mcpwm_timer_handle_t timer = NULL;

    mcpwm_timer_config_t timer_config = {
        .group_id = SERVO_TIMER_GROUP_ID,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = SERVO_TIMEBASE_RESOLUTION_HZ,
        .period_ticks = SERVO_TIMEBASE_PERIOD,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };

    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &timer));

    mcpwm_oper_handle_t oper = NULL;

    mcpwm_operator_config_t operator_config = {
        .group_id = SERVO_TIMER_GROUP_ID, // operator must be in same group to timer
    };

    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &oper));
    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(oper, timer));

    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };

    ESP_ERROR_CHECK(mcpwm_new_comparator(oper, &comparator_config, &comparator_S1));

    mcpwm_gen_handle_t generator = NULL;

    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = SERVO_GPIO_S1,
    };

    ESP_ERROR_CHECK(mcpwm_new_generator(oper, &generator_config, &generator));

    uint32_t cmp1 = Servo_S1_Angle_To_Compare(SERVO_S1_DEF_ANGLE);
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator_S1, cmp1));

    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_timer_event(generator,
              MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH)));

    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_compare_event(generator,
              MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, comparator_S1, MCPWM_GEN_ACTION_LOW)));

    ESP_ERROR_CHECK(mcpwm_timer_enable(timer));
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(timer, MCPWM_TIMER_START_NO_STOP));
}
```

### 将舵机S1的输入角度转化成PWM占空比数值

```c
static uint32_t Servo_S1_Angle_To_Compare(int8_t angle)
{
    if (angle > SERVO_S1_MAX_ANGLE) angle = SERVO_S1_MAX_ANGLE;
    if (angle < SERVO_S1_MIN_ANGLE) angle = SERVO_S1_MIN_ANGLE;

    int cmp = ((int)angle - SERVO_MIN_HD_ANGLE) * (SERVO_MAX_PULSEWIDTH_US - SERVO_MIN_PULSEWIDTH_US) / (SERVO_MAX_HD_ANGLE - SERVO_MIN_HD_ANGLE) + SERVO_MIN_PULSEWIDTH_US;

    return (uint32_t)cmp;
}
```

其中舵机脉冲的最大值和最小值、舵机控制范围的最大值和最小值，根据PWM舵机控制特性，保持以下数值不变即可。

```c
#define SERVO_MIN_PULSEWIDTH_US       500     // Minimum pulse width in microsecond
#define SERVO_MAX_PULSEWIDTH_US       2500    // Maximum pulse width in microsecond
#define SERVO_MIN_HD_ANGLE           -90     // Minimum Angle of Servo
#define SERVO_MAX_HD_ANGLE           90      // Maximum Angle of Servo
```

![image-20240119191623110](https://www.yahboom.com/public/upload/upload-html/1706346792/image-20240119191623110.png)

### 控制舵机角度

可根据输入的舵机ID来区分控制，再将角度数值转化成PWM占空比脉冲数值传输给ESP32的mcpwm模块，从而输出不同占空比的方波来驱动舵机转动。

```c
void Servo_Set_Angle(servo_id_t servo_id, int8_t angle)
{
    int8_t angle_servo = 0;

    if (servo_id == SERVO_ID_S1)
    {
        angle_servo = -angle;
        ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator_S1, Servo_S1_Angle_To_Compare(angle_servo)));
        return;
    }

    if (servo_id == SERVO_ID_S2)
    {
        angle_servo = angle;
        ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator_S2, Servo_S2_Angle_To_Compare(angle_servo)));
        return;
    }
}
```

在app_main里调用Servo_Init函数初始化舵机，然后在循环中每1000毫秒改变一下舵机S1的角度，从而实现舵机来回摆动。

```c
void app_main(void)
{
    printf("hello yahboom\n");
    ESP_LOGI(TAG, "Nice to meet you!");

    Servo_Init();
    vTaskDelay(pdMS_TO_TICKS(1000));

    while (1)
    {
        ESP_LOGI(TAG, "Servo_Set_Angle:-90");
        Servo_Set_Angle(SERVO_ID_S1, -90);
        vTaskDelay(pdMS_TO_TICKS(1000));

        ESP_LOGI(TAG, "Servo_Set_Angle:90");
        Servo_Set_Angle(SERVO_ID_S1, 90);
        vTaskDelay(pdMS_TO_TICKS(1000));
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
cd ~/esp/Samples/esp32_samples/pwm_servo
```

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词。并且每秒改变舵机S1的角度，从-90转动到90，再从90转动到-90，一直持续运行，从而实现舵机反复转动的功能。

---

## 🔗 相关文档

- [[驱动电机]] - 电机控制实验
- [[ESP32开发基础]] - ESP32基础教程
