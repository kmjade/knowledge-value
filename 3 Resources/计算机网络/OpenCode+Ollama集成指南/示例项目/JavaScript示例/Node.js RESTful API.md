# JavaScript Node.js API项目示例
# JavaScript Node.js API Project Example

## 📋 项目描述 / Project Description

这是一个使用Node.js和Express构建的RESTful API项目，展示了如何使用OpenCode + Ollama进行JavaScript开发。

This is a RESTful API project built with Node.js and Express, demonstrating JavaScript development with OpenCode + Ollama.

## 🎯 学习目标 / Learning Objectives

- Node.js RESTful API开发
- Express框架应用
- MongoDB数据库集成
- JWT认证系统
- API文档生成
- 错误处理中间件
- 测试驱动开发

---

## 📁 项目结构 / Project Structure

```
nodejs-api/
├── src/
│   ├── controllers/          # 控制器
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── models/               # 数据模型
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/               # 路由定义
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/           # 中间件
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/               # 工具函数
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── logger.js
│   ├── config/              # 配置文件
│   │   ├── database.js
│   │   └── server.js
│   └── app.js               # 应用入口
├── tests/                   # 测试文件
│   ├── auth.test.js
│   ├── users.test.js
│   ├── posts.test.js
│   └── setup.js
├── docs/                    # 文档
│   ├── api.md
│   └── deployment.md
├── package.json             # 项目配置
├── .env.example            # 环境变量模板
├── .gitignore              # Git忽略文件
├── README.md               # 项目说明
└── ecosystem.config.js      # PM2配置
```

---

## 🐍 使用OpenCode + Ollama生成代码示例
# Code Generation Examples Using OpenCode + Ollama

### 示例1: 生成Express基础应用结构

**OpenCode提示词**:
```
创建一个Node.js Express RESTful API的基础结构，包含以下功能：
1. 用户注册和登录
2. JWT认证中间件
3. CRUD操作（用户和文章）
4. MongoDB数据库集成
5. 输入验证中间件
6. 全局错误处理
7. API文档生成
8. 测试用例
使用async/await语法和现代ES6+特性。
```

**预期输出**:
```javascript
// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

// 路由导入
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();

// 中间件设置
app.use(helmet()); // 安全头
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000'],
    credentials: true
}));

// 请求限制
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 限制每个IP 100个请求
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 数据库连接
mongoose.connect(config.database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => logger.info('MongoDB connected successfully'))
.catch(err => logger.error('MongoDB connection error:', err));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 健康检查
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404处理
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// 全局错误处理
app.use(errorHandler);

// 优雅关闭
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        logger.info('MongoDB connection closed');
        process.exit(0);
    });
});

module.exports = app;
```

### 示例2: 生成用户控制器

**OpenCode提示词**:
```
创建一个完整的用户控制器，包含：
1. 用户注册（邮箱验证、密码加密）
2. 用户登录（JWT生成）
3. 获取用户资料
4. 更新用户资料
5. 删除用户账户
6. 密码重置功能
7. 输入验证和错误处理
8. 安全最佳实践
```

**预期输出**:
```javascript
// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const emailService = require('../utils/emailService');

// 用户注册
exports.register = async (req, res) => {
    try {
        // 验证输入
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { username, email, password } = req.body;

        // 检查用户是否已存在
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'Email or username already registered'
            });
        }

        // 密码加密
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 创建验证令牌
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // 创建新用户
        const user = new User({
            username,
            email,
            password: hashedPassword,
            emailVerificationToken,
            isEmailVerified: false
        });

        await user.save();

        // 发送验证邮件
        await emailService.sendVerificationEmail(email, emailVerificationToken);

        logger.info(`New user registered: ${email}`);

        res.status(201).json({
            message: 'User registered successfully. Please check your email for verification.',
            userId: user._id
        });

    } catch (error) {
        logger.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to register user'
        });
    }
};

// 用户登录
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { email, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email }).select('+password +emailVerificationToken');
        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }

        // 检查邮箱是否验证
        if (!user.isEmailVerified) {
            return res.status(403).json({
                error: 'Email not verified',
                message: 'Please verify your email before logging in'
            });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }

        // 生成JWT令牌
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN || '24h',
                issuer: 'your-app-name'
            }
        );

        // 更新最后登录时间
        user.lastLoginAt = new Date();
        await user.save();

        logger.info(`User logged in: ${email}`);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to login user'
        });
    }
};

// 获取用户资料
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password -emailVerificationToken');

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                bio: user.bio,
                website: user.website,
                location: user.location,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                lastLoginAt: user.lastLoginAt
            }
        });

    } catch (error) {
        logger.error('Get profile error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to get user profile'
        });
    }
};

// 更新用户资料
exports.updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const userId = req.user.userId;
        const updates = req.body;

        // 过滤允许更新的字段
        const allowedUpdates = ['username', 'avatar', 'bio', 'website', 'location'];
        const filteredUpdates = {};
        
        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key) && updates[key] !== undefined) {
                filteredUpdates[key] = updates[key];
            }
        });

        // 检查用户名是否已被占用
        if (filteredUpdates.username) {
            const existingUser = await User.findOne({
                _id: { $ne: userId },
                username: filteredUpdates.username
            });

            if (existingUser) {
                return res.status(409).json({
                    error: 'Username already taken',
                    message: 'This username is already in use'
                });
            }
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { ...filteredUpdates, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).select('-password -emailVerificationToken');

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        logger.info(`User profile updated: ${user.email}`);

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                bio: user.bio,
                website: user.website,
                location: user.location,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        logger.error('Update profile error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to update profile'
        });
    }
};

// 删除用户账户
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { password, confirmation } = req.body;

        // 验证确认信息
        if (confirmation !== 'DELETE_ACCOUNT') {
            return res.status(400).json({
                error: 'Invalid confirmation',
                message: 'Please provide correct confirmation phrase'
            });
        }

        const user = await User.findById(userId).select('+password');
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid password',
                message: 'Password is required to delete account'
            });
        }

        // 删除用户（软删除或硬删除）
        await User.findByIdAndDelete(userId);

        logger.info(`User account deleted: ${user.email}`);

        res.status(200).json({
            message: 'Account deleted successfully'
        });

    } catch (error) {
        logger.error('Delete account error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to delete account'
        });
    }
};
```

### 示例3: 生成认证中间件

**OpenCode提示词**:
```
创建一个JWT认证中间件，包含：
1. 令牌验证
2. 用户信息加载
3. 令牌刷新机制
4. 权限检查
5. 错误处理
6. 安全最佳实践
7. 性能优化
8. 可配置性
```

**预期输出**:
```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const config = require('../config');

// JWT令牌验证中间件
const authenticateToken = (req, res, next) => {
    try {
        // 获取令牌
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : null;

        if (!token) {
            return res.status(401).json({
                error: 'Access token required',
                message: 'No token provided in authorization header'
            });
        }

        // 验证令牌
        const decoded = jwt.verify(token, config.jwt.secret);
        
        // 检查令牌是否在黑名单中（如果实现了令牌撤销）
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({
                error: 'Token has been revoked',
                message: 'Please login again'
            });
        }

        // 加载用户信息
        const user = await User.findById(decoded.userId).select('-password -emailVerificationToken');
        if (!user) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'User not found'
            });
        }

        // 检查用户是否被禁用
        if (user.status === 'disabled') {
            return res.status(403).json({
                error: 'Account disabled',
                message: 'Your account has been disabled'
            });
        }

        // 将用户信息添加到请求对象
        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Token is invalid or expired'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Token has expired, please login again'
            });
        }

        logger.error('Auth middleware error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Authentication failed'
        });
    }
};

// 可选权限检查中间件
const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'Please login to access this resource'
            });
        }

        if (!req.user.permissions || !req.user.permissions.includes(permission)) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                message: `Permission '${permission}' is required to access this resource`
            });
        }

        next();
    };
};

// 可选角色检查中间件
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'Please login to access this resource'
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                error: 'Insufficient role',
                message: `Role '${role}' is required to access this resource`
            });
        }

        next();
    };
};

// 令牌刷新中间件
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                error: 'Refresh token required',
                message: 'Refresh token is required'
            });
        }

        // 验证刷新令牌
        const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
        
        // 检查刷新令牌是否有效
        const user = await User.findById(decoded.userId).select('-password -emailVerificationToken');
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                error: 'Invalid refresh token',
                message: 'Refresh token is invalid or expired'
            });
        }

        // 生成新的访问令牌
        const newAccessToken = jwt.sign(
            { userId: user._id },
            config.jwt.secret,
            { expiresIn: '15m' }
        );

        // 生成新的刷新令牌
        const newRefreshToken = jwt.sign(
            { userId: user._id },
            config.jwt.refreshSecret,
            { expiresIn: '7d' }
        );

        // 更新用户的刷新令牌
        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: '15m'
        });

    } catch (error) {
        logger.error('Refresh token error:', error);
        res.status(401).json({
            error: 'Invalid refresh token',
            message: 'Refresh token is invalid or expired'
        });
    }
};

// 令牌黑名单（简单实现）
const tokenBlacklist = new Set();

// 撤销令牌
const revokeToken = (req, res) => {
    try {
        const token = req.token;
        
        if (!token) {
            return res.status(400).json({
                error: 'Token required',
                message: 'No token provided to revoke'
            });
        }

        // 将令牌添加到黑名单
        tokenBlacklist.add(token);

        // 可选：从数据库中删除刷新令牌
        if (req.user) {
            req.user.refreshToken = null;
            req.user.save();
        }

        res.status(200).json({
            message: 'Token revoked successfully'
        });

    } catch (error) {
        logger.error('Revoke token error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to revoke token'
        });
    }
};

module.exports = {
    authenticateToken,
    requirePermission,
    requireRole,
    refreshToken,
    revokeToken,
    tokenBlacklist
};
```

---

## 🧪 测试用例生成示例
# Test Case Generation Examples

### 使用OpenCode生成集成测试

**OpenCode提示词**:
```
为Node.js Express API创建全面的Jest测试套件，包含：
1. 用户注册和登录测试
2. JWT认证中间件测试
3. CRUD操作测试
4. 错误处理测试
5. 边界条件测试
6. 安全性测试
7. 性能测试
8. 测试数据和清理
使用现代测试最佳实践和Mock技术。
```

**预期输出**:
```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const { setupTestDB, cleanupTestDB } = require('./setup');

describe('Authentication Endpoints', () => {
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await cleanupTestDB();
    });

    beforeEach(async () => {
        // 清理用户集合
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('userId');
            expect(response.body.message).toContain('registered successfully');

            // 验证用户是否保存到数据库
            const savedUser = await User.findOne({ email: userData.email });
            expect(savedUser).toBeTruthy();
            expect(savedUser.username).toBe(userData.username);
            expect(savedUser.email).toBe(userData.email);
            expect(savedUser.password).not.toBe(userData.password); // 密码应该被加密
            expect(savedUser.isEmailVerified).toBe(false);
        });

        it('should not register user with invalid email', async () => {
            const userData = {
                username: 'testuser',
                email: 'invalid-email',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Validation failed');
        });

        it('should not register user with weak password', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: '123' // 弱密码
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should not register user with existing email', async () => {
            // 先创建一个用户
            const existingUser = new User({
                username: 'existing',
                email: 'existing@example.com',
                password: 'password123'
            });
            await existingUser.save();

            const userData = {
                username: 'testuser',
                email: 'existing@example.com', // 重复邮箱
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(409);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        let testUser;

        beforeEach(async () => {
            // 创建测试用户
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('password123', 12);
            
            testUser = new User({
                username: 'loginuser',
                email: 'login@example.com',
                password: hashedPassword,
                isEmailVerified: true
            });
            await testUser.save();
        });

        it('should login user successfully with valid credentials', async () => {
            const loginData = {
                email: 'login@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user.email).toBe(loginData.email);
            expect(response.body.user.username).toBe(testUser.username);
        });

        it('should not login user with invalid email', async () => {
            const loginData = {
                email: 'wrong@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Authentication failed');
        });

        it('should not login user with invalid password', async () => {
            const loginData = {
                email: 'login@example.com',
                password: 'wrongpassword'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Authentication failed');
        });

        it('should not login user with missing fields', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com' }) // 缺少密码
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Validation failed');
        });
    });

    describe('Token Validation', () => {
        let token;

        beforeEach(async () => {
            // 登录获取token
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });
            
            token = loginResponse.body.token;
        });

        it('should access protected route with valid token', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('user');
        });

        it('should not access protected route with invalid token', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', 'Bearer invalidtoken')
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Invalid token');
        });

        it('should not access protected route without token', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('required');
        });
    });
});
```

---

## 🚀 部署和配置示例
# Deployment and Configuration Examples

### 使用OpenCode生成Docker配置

**OpenCode提示词**:
```
为Node.js Express API创建完整的Docker部署配置，包含：
1. 多阶段构建优化
2. 生产环境配置
3. 安全最佳实践
4. 健康检查
5. 日志管理
6. 环境变量管理
7. 负载均衡
8. 监控集成
使用Docker Compose编排多个服务。
```

**预期输出**:
```dockerfile
# Dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine AS production

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# 复制构建产物和依赖
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# 设置权限
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# 启动应用
CMD ["node", "dist/app.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    container_name: nodejs-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/production
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  mongo:
    image: mongo:6
    container_name: nodejs-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
      - MONGO_INITDB_DATABASE=production
    volumes:
      - mongo-data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: nodejs-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nodejs-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
    networks:
      - app-network

volumes:
  mongo-data:
  redis-data:
  logs:

networks:
  app-network:
    driver: bridge
```

---

## 📊 性能优化和监控
# Performance Optimization and Monitoring

### 使用OpenCode生成监控配置

**OpenCode提示词**:
```
为Node.js API创建完整的性能监控和优化配置，包含：
1. PM2进程管理
2. 日志收集和分析
3. 性能指标收集
4. 错误追踪
5. 健康检查端点
6. 缓存策略
7. 负载测试
8. 监控仪表板
使用现代DevOps最佳实践。
```

---

## 📚 学习要点总结 / Learning Points Summary

### Node.js核心概念
- 事件驱动架构
- 异步编程模式
- 模块系统
- 包管理和依赖
- 错误处理机制

### Express框架特性
- 路由和中间件
- 请求响应处理
- 模板引擎集成
- 静态文件服务
- 安全中间件

### 数据库集成
- MongoDB连接和操作
- Mongoose ODM使用
- 数据模型设计
- 查询优化
- 迁移管理

### 认证和安全
- JWT令牌认证
- 密码加密和验证
- 输入验证和清理
- CORS配置
- 安全头设置

### API设计最佳实践
- RESTful设计原则
- HTTP状态码正确使用
- API版本控制
- 文档生成
- 错误响应标准化

### 测试和质量保证
- 单元测试编写
- 集成测试设计
- Mock和Stub使用
- 代码覆盖率检查
- 持续集成流程

### 部署和运维
- 容器化技术
- 环境配置管理
- 负载均衡配置
- 监控和日志收集
- 性能优化技巧

---

> [!tip] 💡 最佳实践建议 / Best Practice Tips
> 
> 1. **使用TypeScript**增强代码质量和开发体验
> 2. **实施CI/CD**自动化测试和部署流程
> 3. **监控和日志**建立完善的可观测性体系
> 4. **安全编码**遵循OWASP安全指南
> 5. **性能优化**使用缓存和数据库索引
> 6. **版本控制**使用语义化版本和Git工作流
> 7. **文档维护**保持API文档的及时更新
> 8. **测试覆盖**确保关键功能的测试覆盖率

---

*这个示例展示了如何使用OpenCode + Ollama进行完整的Node.js API开发*