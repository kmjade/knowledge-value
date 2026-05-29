---
title: roborts_detection 装甲板检测
aliases:
  - RoboRTS Detection
  - 装甲板识别
  - 目标检测
para: resource
domain:
  - "[[RoboMaster]]"
  - "[[ROS]]"
tags:
  - para/resource/tech
  - topic/robomaster
  - topic/ros
  - topic/computer-vision
  - type/tutorial
created: 2026-05-23
modified: 2026-05-23
source: https://robomaster.github.io/RoboRTS-Tutorial/#/sdk_docs/roborts_detection
---

# roborts_detection 装甲板检测

> [!summary] 概述
> roborts_detection 实现装甲板视觉检测与跟踪，使用约束集检测方法和 PnP 算法进行姿态估计。

---

## 功能说明

### 核心功能

- 装甲板识别与定位
- PnP 姿态解算
- 目标跟踪
- 弹道模型补偿

### 检测流程

```
原始图像
    │
    ▼
┌─────────────┐
│  预处理     │ ─── 颜色空间转换、阈值分割
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  约束集检测  │ ─── 灯条匹配、装甲板筛选
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PnP 解算   │ ─── 3D 姿态估计
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  弹道补偿   │ ─── 预瞄点计算
└─────────────┘
```

---

## 约束集检测

### 灯条检测

```cpp
// 灯条检测流程
std::vector<cv::RotatedRect> DetectLightBars(const cv::Mat& image) {
    // 1. 颜色分割
    cv::Mat hsv, binary;
    cv::cvtColor(image, hsv, cv::COLOR_BGR2HSV);
    cv::inRange(hsv, color_lower, color_upper, binary);
    
    // 2. 轮廓提取
    std::vector<std::vector<cv::Point>> contours;
    cv::findContours(binary, contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);
    
    // 3. 灯条拟合
    std::vector<cv::RotatedRect> light_bars;
    for (const auto& contour : contours) {
        cv::RotatedRect rect = cv::minAreaRect(contour);
        // 长宽比约束
        if (IsLightBar(rect)) {
            light_bars.push_back(rect);
        }
    }
    return light_bars;
}
```

### 灯条约束条件

| 约束 | 条件 | 说明 |
|------|------|------|
| 长宽比 | 2.5 < ratio < 10 | 灯条形状特征 |
| 面积 | area > min_area | 过滤噪声 |
| 倾斜角 | abs(angle) < 30° | 灯条接近垂直 |

### 装甲板匹配

```cpp
// 装甲板匹配
std::vector<Armor> MatchArmors(const std::vector<cv::RotatedRect>& lights) {
    std::vector<Armor> armors;
    
    for (size_t i = 0; i < lights.size(); i++) {
        for (size_t j = i + 1; j < lights.size(); j++) {
            // 检查是否构成装甲板
            if (IsArmor(lights[i], lights[j])) {
                Armor armor;
                armor.left_light = lights[i];
                armor.right_light = lights[j];
                armor.center = (lights[i].center + lights[j].center) / 2;
                armors.push_back(armor);
            }
        }
    }
    return armors;
}
```

### 装甲板约束条件

| 约束 | 条件 | 说明 |
|------|------|------|
| 高度差 | abs(h1 - h2) < threshold | 灯条高度相近 |
| 角度差 | abs(angle1 - angle2) < threshold | 灯条平行 |
| 宽高比 | 1.5 < ratio < 4.0 | 装甲板比例 |
| 中心高度 | abs(cy1 - cy2) < threshold | 灯条中心对齐 |

---

## PnP 姿态解算

### 3D 模型定义

```cpp
// 装甲板 3D 点 (单位: 米)
std::vector<cv::Point3f> armor_points = {
    {-0.065, 0.025, 0},   // 左上
    {-0.065, -0.025, 0},  // 左下
    {0.065, -0.025, 0},   // 右下
    {0.065, 0.025, 0}     // 右上
};
```

### PnP 求解

```cpp
// PnP 解算
bool SolvePnP(const Armor& armor, cv::Mat& rvec, cv::Mat& tvec) {
    // 2D 图像点
    std::vector<cv::Point2f> image_points = GetArmorCorners(armor);
    
    // 相机内参
    cv::Mat camera_matrix = (cv::Mat_<double>(3, 3) <<
        fx, 0, cx,
        0, fy, cy,
        0, 0, 1);
    
    // 畸变系数
    cv::Mat dist_coeffs = (cv::Mat_<double>(1, 5) <<
        k1, k2, p1, p2, k3);
    
    // PnP 求解
    bool success = cv::solvePnP(
        armor_points,      // 3D 点
        image_points,      // 2D 点
        camera_matrix,     // 内参
        dist_coeffs,       // 畸变
        rvec, tvec,        // 输出
        false,             // 使用初始值
        cv::SOLVEPNP_ITERATIVE
    );
    
    return success;
}
```

### 姿态转换

```cpp
// 旋转向量转欧拉角
void RvecToEuler(const cv::Mat& rvec, float& roll, float& pitch, float& yaw) {
    cv::Mat R;
    cv::Rodrigues(rvec, R);
    
    // 旋转矩阵转欧拉角
    pitch = std::atan2(-R.at<double>(2, 0), 
        std::sqrt(R.at<double>(2,1) * R.at<double>(2,1) + 
                  R.at<double>(2,2) * R.at<double>(2,2)));
    yaw = std::atan2(R.at<double>(2, 1), R.at<double>(2, 2));
    roll = std::atan2(R.at<double>(1, 0), R.at<double>(0, 0));
}
```

---

## 弹道模型

### 抛物线模型

```cpp
// 弹道补偿
struct ProjectileModel {
    float velocity;        // 弹丸初速 (m/s)
    float gravity = 9.8f;  // 重力加速度
    float air_resist;      // 空气阻力系数
    
    // 计算落点
    cv::Point3f CalculateLandingPoint(
        const cv::Point3f& target,
        float pitch_angle
    ) {
        float distance = std::sqrt(target.x * target.x + target.y * target.y);
        float height = target.z;
        
        // 抛物线运动方程
        float t = distance / (velocity * std::cos(pitch_angle));
        float drop = 0.5 * gravity * t * t;
        
        // 补偿高度
        float compensated_height = height + drop;
        
        return cv::Point3f(target.x, target.y, compensated_height);
    }
};
```

### 预瞄点计算

```cpp
// 预瞄点计算
cv::Point2f CalculateAimPoint(const Armor& armor, float bullet_speed) {
    // 获取目标位置
    cv::Mat rvec, tvec;
    SolvePnP(armor, rvec, tvec);
    
    // 弹道补偿
    float distance = std::sqrt(
        tvec.at<double>(0) * tvec.at<double>(0) +
        tvec.at<double>(1) * tvec.at<double>(1) +
        tvec.at<double>(2) * tvec.at<double>(2)
    );
    
    float flight_time = distance / bullet_speed;
    float gravity_drop = 0.5 * 9.8f * flight_time * flight_time;
    
    // 补偿后的瞄准点
    cv::Point2f aim_point(
        armor.center.x,
        armor.center.y + gravity_drop * pixels_per_meter
    );
    
    return aim_point;
}
```

---

## Actionlib 接口

### Action 定义

```
# Goal
uint8_t mode  # 检测模式
---
# Result
geometry_msgs/PoseStamped target_pose  # 目标位姿
float64 distance                        # 距离
---
# Feedback
uint8_t status         # 状态
geometry_msgs/Point target_position  # 目标位置
```

### Action Server

```cpp
class DetectionActionServer {
public:
    void ExecuteCallback(const roborts_msgs::DetectionGoalConstPtr& goal) {
        ros::Rate rate(30);
        
        while (ros::ok()) {
            // 检测装甲板
            std::vector<Armor> armors = DetectArmors();
            
            if (!armors.empty()) {
                // 选择最优目标
                Armor target = SelectTarget(armors);
                
                // 发布反馈
                feedback_.target_position = target.center;
                as_.publishFeedback(feedback_);
                
                // 检查是否完成
                if (goal->mode == SINGLE_SHOT) {
                    result_.target_pose = target.pose;
                    as_.setSucceeded(result_);
                    return;
                }
            }
            
            rate.sleep();
        }
    }
};
```

---

## ROS 接口

### 发布的话题

| 话题 | 消息类型 | 频率 | 说明 |
|------|----------|------|------|
| `/armor_info` | roborts_msgs/ArmorInfo | 30 Hz | 装甲板信息 |
| `/target_pose` | geometry_msgs/PoseStamped | 30 Hz | 目标位姿 |

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `detection_threshold` | int | 100 | 检测阈值 |
| `armor_width` | double | 0.13 | 装甲板宽度 |
| `armor_height` | double | 0.055 | 装甲板高度 |
| `bullet_speed` | double | 25.0 | 弹丸速度 |

---

## 相关链接

- [[RoboRTS教程概览]] - 返回概览
- [[architecture]] - 系统架构
- [[roborts_decision]] - 决策模块
- [弹道模型 PDF](https://robomaster.github.io/RoboRTS-Tutorial/pdf/projectile_model.pdf)
