---
title: PID控制电机速度
status: active
priority: medium
tags: [esp32/examples, pid, motor]
aliases: [PID速度控制, 电机PID]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706346832/PID%E6%8E%A7%E5%88%B6%E7%94%B5%E6%9C%BA%E9%80%9F%E5%BA%A6.html
related:
  - [[MicroROS机器人控制板]]
  - [[驱动电机]]
---

# PID控制电机速度

> 使用microROS控制板的编码电机接口，学习ESP32如何使用电机编码器脉冲数量结合PID算法，从而控制电机转动的速度。

---

## 📋 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

使用microROS控制板的编码电机接口，学习ESP32如何使用电机编码器脉冲数量结合PID算法，从而控制电机转动的速度。

---

## 二、硬件连接

如下图所示，microROS控制板集成了四路编码器电机控制接口，需要额外连接编码器电机，电机控制接口支持310电机，还需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240111152814048](https://www.yahboom.com/public/upload/upload-html/1706346832/image-20240111152814048.png)

四路电机接口分别对应名称为:左前轮->Motor1，左后轮->Motor2，右前轮->Motor3，右后轮->Motor4。

![image-20240111155522592](https://www.yahboom.com/public/upload/upload-html/1706346832/image-20240111155522592.png)

电机接口线序，在microROS控制板背面有详细线序丝印，这里以Motor1为例，M1+和M1-是控制电机转动的接口，GND和VCC是编码器的供电电路，H1A和H1B为编码器脉冲检测引脚。

![image-20240111160116671](https://www.yahboom.com/public/upload/upload-html/1706346832/image-20240111160116671.png)

> **注意**: 如果是使用亚博智能配套的310电机和电机线，白色线壳端连接到microROS控制板上的接口，黑色线壳端连接到310电机接口。

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/esp32_samples/pid_speed
```

由于需要使用到PID算法组件，所以在电机里导入pid_ctrl组件。

```yaml
dependencies:
  pid_ctrl: "^0.1.1"
```

由于PID算法需要用到编码器和PWM电机，所以需要将编码器和PWM电机的组件复制到components目录下。然后初始化电机的同时初始化编码器和PWM电机，并打开电机的任务。

```c
void Motor_Init(void)
{
    Encoder_Init();
    PwmMotor_Init();
    xTaskCreatePinnedToCore(Motor_Task, "Motor_Task", 10*1024, NULL, 10, NULL, 1);
}
```

### PID参数设置

电机任务开始后，将PID相关参数保存起来，控制电机使用的是增量式PID算法。其中默认PID参数如下：

```c
pid_runtime_param.kp = 1.0;
pid_runtime_param.ki = 0.2;
pid_runtime_param.kd = 0.2;
```

如果需要更新PID参数，可以调用Motor_Update_PID_Parm函数来微调PID参数。

```c
void Motor_Update_PID_Parm(float pid_p, float pid_i, float pid_d)
{
    pid_runtime_param.kp = pid_p;
    pid_runtime_param.ki = pid_i;
    pid_runtime_param.kd = pid_d;

    for (int i = 0; i < MOTOR_MAX_NUM; i++)
    {
        pid_update_parameters(pid_motor[i], &pid_runtime_param);
    }
}
```

### 设置电机速度

设置电机的速度，单位为m/s，正数为向前转，负数为向后转。由于电机速度限制，speed的输入范围为-1.0~1.0m/s。

```c
void Motor_Set_Speed(float speed_m1, float speed_m2, float speed_m3, float speed_m4)
{
    static float speed_m[MOTOR_MAX_NUM] = {0};

    speed_m[0] = Motor_Limit_Speed(speed_m1);
    speed_m[1] = Motor_Limit_Speed(speed_m2);
    speed_m[2] = Motor_Limit_Speed(speed_m3);
    speed_m[3] = Motor_Limit_Speed(speed_m4);

    for (int i = 0; i < MOTOR_MAX_NUM; i++)
    {
        // 速度转化成10毫秒编码器目标数量
        speed_count[i] = speed_m[i] / (MOTOR_WHEEL_CIRCLE/MOTOR_ENCODER_CIRCLE/MOTOR_PID_PERIOD);
        pid_target[i] = (float)speed_count[i];
    }

    pid_enable = 1;
}
```

### PID控制

PID算法根据当前编码器的数据和上一次编码器的数据，将偏差计算后输出电机的PWM脉冲值，从而控制电机按照设定的速度转动。

```c
static void Motor_PID_Ctrl(void)
{
    static int last_count[MOTOR_MAX_NUM] = {0};
    static int cur_count[MOTOR_MAX_NUM] = {0};
    static float real_pulse[MOTOR_MAX_NUM] = {0};
    static float new_speed[MOTOR_MAX_NUM] = {0};

    for (int i = 0; i < MOTOR_MAX_NUM; i++)
    {
        cur_count[i] = Encoder_Get_Count(ENCODER_ID_M1 + i);
        real_pulse[i] = cur_count[i] - last_count[i];
        last_count[i] = cur_count[i];
        read_speed[i] = real_pulse[i] * (MOTOR_WHEEL_CIRCLE/MOTOR_ENCODER_CIRCLE/MOTOR_PID_PERIOD);

        if (pid_enable)
        {
            pid_compute(pid_motor[i], pid_target[i] - real_pulse[i], &new_speed[i]);
            PwmMotor_Set_Speed(MOTOR_ID_M1 + i, (int)new_speed[i]);
            new_pid_output[i] = new_speed[i];
        }
    }
}
```

---

## 四、编译下载烧录固件

> **注意**: 由于烧录完固件后，连接的电机会转动，请先将小车架空，避免小车在桌面乱动。

使用Type-C数据线连接虚拟机/电脑与microROS控制板，如果系统弹窗选择连接到虚拟机上。

激活ESP-IDF开发环境，注意每次打开新终端都需要先激活ESP-IDF开发环境才可以编译固件。

```bash
source ~/esp/esp-idf/export.sh
```

进入项目目录

```bash
cd ~/esp/Samples/esp32_samples/pid_speed
```

编译、烧录、打开串口模拟器

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

串口模拟器打印"hello yahboom"欢迎词。此时会每间隔100毫秒打印一次四路电机速度。并且电机开始按照预设的速度转动，`Motor_Set_Speed(0.5, 0.5, -0.30, -0.30)`为调节速度的函数，可根据实际需求调节电机运动速度。理论上电机转动速度与实际设置会存在一定误差，如果读取的速度和设置的速度差别不大，则表示电机正常。电机转动5秒后自动停止，如需要让电机再次运动，请按一下microROS控制板的复位按键。

![image-20240112141142752](https://www.yahboom.com/public/upload/upload-html/1706346832/image-20240112141142752.png)

---

## 🔗 相关文档

- [[驱动电机]] - 电机驱动实验
- [[读取电机编码器数据]] - 编码器读取
