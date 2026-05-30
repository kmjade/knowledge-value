---
title: 发布IMU数据话题
status: active
priority: medium
tags: [esp32/examples, microros/publisher]
aliases: [发布IMU数据话题, IMU话题发布]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706347434/发布IMU数据话题.html
related:
  - [[MicroROS机器人控制板]]
  - [[发布话题]]
  - [[读取IMU数据]]
---

# 发布IMU数据话题

> 学习ESP32-microROS组件，接入ROS2环境，发布IMU数据话题。

---

## 目录

- [实验目的](#一实验目的)
- [硬件连接](#二硬件连接)
- [核心代码解析](#三核心代码解析)
- [编译下载烧录固件](#四编译下载烧录固件)
- [实验效果](#五实验效果)

---

## 一、实验目的

学习ESP32-microROS组件，接入ROS2环境，发布IMU数据话题。

---

## 二、硬件连接

如下图所示，microROS控制板集成了IMU六轴姿态传感器和ESP32-S3-WROOM核心模组，自带无线WiFi功能，ESP32-S3核心模组需要连接天线，还需要把type-C数据线连接电脑与microROS控制板作为烧录固件功能。

![image-20240118115029925](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240118115029925.png)

---

## 三、核心代码解析

程序源码对应的虚拟机路径为：

```
~/esp/Samples/microros_samples/imu_publisher
```

由于本次使用到IMU六轴姿态传感器ICM42670P，而在之前例程已经做过了ICM42670P的组件，所以需要把ICM42670P的组件复制到项目的components目录下。在程序开始的地方调用Icm42670p_Init初始化ICM42670P。

![image-20240118115651183](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240118115651183.png)

初始化发布IMU信息，frame_id设置为"imu_frame"，然后根据ROS_NAMESPACE是否为空来决定是否加ROS_NAMESPACE前缀。

```c
void imu_ros_init(void)
{
   msg_imu.angular_velocity.x = 0;
   msg_imu.angular_velocity.y = 0;
   msg_imu.angular_velocity.z = 0;

   msg_imu.linear_acceleration.x = 0;
   msg_imu.linear_acceleration.y = 0;
   msg_imu.linear_acceleration.z = 0;

   msg_imu.orientation.x = 0;
   msg_imu.orientation.y = 0;
   msg_imu.orientation.z = 0;
   msg_imu.orientation.w = 1;

   char* content_frame_id = "imu_frame";
   int len_namespace = strlen(ROS_NAMESPACE);
   int len_frame_id_max = len_namespace + strlen(content_frame_id) + 2;

   // ESP_LOGI(TAG, "imu frame len:%d", len_frame_id_max);

   char* frame_id = malloc(len_frame_id_max);

   if (len_namespace == 0)
   {
       // ROS命名空间为空字符
       // The ROS namespace is empty characters
       sprintf(frame_id, "%s", content_frame_id);
   }
   else
   {
       // 拼接命名空间和frame id
       // Concatenate the namespace and frame id
       sprintf(frame_id, "%s/%s", ROS_NAMESPACE, content_frame_id);
   }

   msg_imu.header.frame_id = micro_ros_string_utilities_set(msg_imu.header.frame_id, frame_id);
   free(frame_id);
}
```

新建一个IMU更新数据的任务，每10毫秒更新一次IMU的数据。

```c
void imu_update_data_task(void *arg)
{
   int16_t gyro_raw[3] = {0};
   int16_t accel_raw[3] = {0};
   float imu_accel_g[3] = {0};
   float imu_gyro_dps[3] = {0};

   while (1)
   {
       Icm42670p_Get_Gyro_RawData(gyro_raw);
       Icm42670p_Get_Accel_RawData(accel_raw);
       Icm42670p_Get_Accel_g(imu_accel_g);
       Icm42670p_Get_Gyro_dps(imu_gyro_dps);

       msg_imu.angular_velocity.x = imu_gyro_dps[0];
       msg_imu.angular_velocity.y = imu_gyro_dps[1];
       msg_imu.angular_velocity.z = imu_gyro_dps[2];

       msg_imu.linear_acceleration.x = imu_accel_g[0];
       msg_imu.linear_acceleration.y = imu_accel_g[1];
       msg_imu.linear_acceleration.z = imu_accel_g[2];

       vTaskDelay(pdMS_TO_TICKS(10));
   }
   vTaskDelete(NULL);
}
```

从IDF配置工具里获取要连接的WiFi名称和密码。

```c
#define ESP_WIFI_SSID     CONFIG_ESP_WIFI_SSID
#define ESP_WIFI_PASS     CONFIG_ESP_WIFI_PASSWORD
#define ESP_MAXIMUM_RETRY  CONFIG_ESP_MAXIMUM_RETRY
```

`uros_network_interface_initialize`函数会根据IDF中的WiFi配置来连接WiFi热点。

```c
ESP_ERROR_CHECK(uros_network_interface_initialize());
```

再从IDF配置工具里获取ROS_NAMESPACE、ROS_DOMAIN_ID、ROS_AGENT_IP和ROS_AGENT_PORT。

```c
#define ROS_NAMESPACE     CONFIG_MICRO_ROS_NAMESPACE
#define ROS_DOMAIN_ID    CONFIG_MICRO_ROS_DOMAIN_ID
#define ROS_AGENT_IP     CONFIG_MICRO_ROS_AGENT_IP
#define ROS_AGENT_PORT   CONFIG_MICRO_ROS_AGENT_PORT
```

初始化microROS的配置，其中ROS_DOMAIN_ID，ROS_AGENT_IP和ROS_AGENT_PORT根据实际需求在IDF配置工具中修改。

```c
    rcl_allocator_t allocator = rcl_get_default_allocator();
    rclc_support_t support;

    // 创建rcl初始化选项
    // Create init_options.
    rcl_init_options_t init_options = rcl_get_zero_initialized_init_options();

    RCCHECK(rcl_init_options_init(&init_options, allocator));

    // 修改ROS域ID
    // change ros domain id
    RCCHECK(rcl_init_options_set_domain_id(&init_options, ROS_DOMAIN_ID));

    // 初始化rmw选项
    // Initialize the rmw options
    rmw_init_options_t *rmw_options = rcl_init_options_get_rmw_init_options(&init_options);

    // 设置静态代理IP和端口
    // Setup static agent IP and port
    RCCHECK(rmw_uros_options_set_udp_address(ROS_AGENT_IP, ROS_AGENT_PORT, rmw_options));
```

尝试连接代理，连接成功才进入下一步，如果连接代理不成功则一直处于连接状态。

```c
   while (1)
   {
       ESP_LOGI(TAG, "Connecting agent: %s:%s", ROS_AGENT_IP, ROS_AGENT_PORT);
       state_agent = rclc_support_init_with_options(&support, 0, NULL, &init_options, &allocator);

       if (state_agent == ESP_OK)
       {
           ESP_LOGI(TAG, "Connected agent: %s:%s", ROS_AGENT_IP, ROS_AGENT_PORT);
           break;
       }
       vTaskDelay(pdMS_TO_TICKS(500));
   }
```

创建节点"imu_publisher"，其中ROS_NAMESPACE默认为空，可根据实际在IDF配置工具中修改。

```c
    rcl_node_t node;
    RCCHECK(rclc_node_init_default(&node, "imu_publisher", ROS_NAMESPACE, &support));
```

创建发布者"imu"，需要指定发布者的信息为sensor_msgs/msg/Imu类型。

```c
   RCCHECK(rclc_publisher_init_default(
        &publisher_imu,
        &node,
        ROSIDL_GET_MSG_TYPE_SUPPORT(sensor_msgs, msg, Imu),
        "imu"));
```

创建发布者的定时器，发布频率为20HZ。

```c
   const unsigned int timer_timeout = 50;
   RCCHECK(rclc_timer_init_default(
        &timer_imu,
        &support,
        RCL_MS_TO_NS(timer_timeout),
        timer_imu_callback));
```

创建执行者，其中三个参数为执行者控制的数量，要大于或等于添加到执行者的订阅者和发布者数量。并添加发布者的定时器到执行者。

```c
   rclc_executor_t executor;
   int handle_num = 1;
   RCCHECK(rclc_executor_init(&executor, &support.context, handle_num, &allocator));
   RCCHECK(rclc_executor_add_timer(&executor, &timer_imu));
```

IMU的定时器回调函数主要功能是将Imu数据发送出去。

```c
void timer_imu_callback(rcl_timer_t *timer, int64_t last_call_time)
{
   RCLC_UNUSED(last_call_time);

   if (timer != NULL)
   {
       struct timespec time_stamp = get_timespec();
       msg_imu.header.stamp.sec = time_stamp.tv_sec;
       msg_imu.header.stamp.nanosec = time_stamp.tv_nsec;
       RCSOFTCHECK(rcl_publish(&publisher_imu, &msg_imu, NULL));
   }
}
```

在循环中调用rclc_executor_spin_some来让microros正常工作起来。

```c
    while (1)
   {
       rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100));
       usleep(1000);
   }
```

---

## 四、编译下载烧录固件

使用Type-C数据线连接虚拟机/电脑与microROS控制板，如果系统弹窗选择连接到虚拟机上。

激活ESP-IDF开发环境，注意每次打开新终端都需要先激活ESP-IDF开发环境才可以编译固件。

```bash
source ~/esp/esp-idf/export.sh
```

进入项目目录：

```bash
cd ~/esp/Samples/microros_samples/imu_publisher
```

打开ESP-IDF的配置工具。

```bash
idf.py menuconfig
```

打开micro-ROS Settings，在micro-ROS Agent IP填入代理主机的IP地址，在micro-ROS Agent Port填入代理主机的端口号。

![image-20240116194035834](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240116194035834.png)

依次打开micro-ROS Settings->WiFi Configuration，在WiFi SSID和WiFi Password这两栏填入自家的WiFi名称和密码。

![image-20240116193354397](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240116193354397.png)

打开micro-ROS example-app settings，Ros domain id of the micro-ROS默认为20，如果局域网内有多用户同时使用的情况，可修改参数以避免冲突。Ros namespace of the micro-ROS默认为空，正常情况下可以不修改，如果修改非空字符（10个字符以内），则会在节点和话题前加上namespace参数。

![image-20240116195328563](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240116195328563.png)

修改后按S保存，再按Q退出配置工具。

编译、烧录、打开串口模拟器。

```bash
idf.py build flash monitor
```

如果需要退出串口模拟器，请按**Ctrl+]**。

---

## 五、实验效果

开机后，ESP32尝试连接WiFi热点，再尝试连接代理IP和端口。

如果虚拟机/电脑终端没有打开代理，请输入以下命令开启代理，如果代理已经启动，则无需再启动代理。

```bash
docker run -it --rm -v /dev:/dev -v /dev/shm:/dev/shm --privileged --net=host microros/micro-ros-agent:humble udp4 --port 8090 -v4
```

![image-20240117151035412](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240117151035412.png)

连接成功后创建一个节点和一个发布者。

![image-20240117113138240](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240117113138240.png)

此时可以在虚拟机/电脑另开一个终端，查看/imu_publisher节点。

```bash
ros2 node list
ros2 node info /imu_publisher
```

![image-20240118120913760](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240118120913760.png)

订阅/imu话题的数据：

```bash
ros2 topic echo /imu
```

按Ctrl+C结束命令。

![image-20240118121024379](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240118121024379.png)

查看/imu话题的频率，大约为20hz则为正常。

```bash
ros2 topic hz /imu
```

按Ctrl+C结束命令。

![image-20240118121205192](https://www.yahboom.com/public/upload/upload-html/1706347434/image-20240118121205192.png)

---

## 相关文档

- [[读取IMU数据]] - IMU传感器读取
- [[发布速度话题]] - 速度数据发布
- [[发布雷达数据话题]] - 雷达数据发布
