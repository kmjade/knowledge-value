# JavaScript Node.js API專案示例
# JavaScript Node.js API Project Example

## 📋 專案描述 / Project Description

这是一个使用Node.js和Express構建的RESTful API專案，展示了如何使用OpenCode + Ollama進行JavaScript開發。

This is a RESTful API project built with Node.js and Express, demonstrating JavaScript development with OpenCode + Ollama.

## 🎯 學習目標 / Learning Objectives

- Node.js RESTful API開發
- Express框架應用程式
- MongoDB資料庫整合
- JWT认证系統
- API文檔生成
- 错误處理中间件
- 測試驅動程式開發

---

## 📁 專案结构 / Project Structure

```
nodejs-api/
├── src/
│   ├── controllers/          # 控制器
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── models/               # 數據模型
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
# 配置
│   │   ├── database.js
│   │   └── server.js
│   └── app.js               # 應用程式入口
├── tests/                   # 測試檔案
│   ├── auth.test.js
│   ├── users.test.js
│   ├── posts.test.js
│   └── setup.js
├── docs/                    # 文檔
│   ├── api.md
│   └── deployment.md
# 配置
├── .env.example            # 環境变量模板
├── .gitignore              # Git忽略檔案
├── README.md               # 專案說明
# 配置
```

---

## 🐍 使用OpenCode + Ollama生成代碼示例
# Code Generation Examples Using OpenCode + Ollama

### 示例1: 生成Express基礎應用程式结构

**OpenCode提示词**:
```
創建一个Node.js Express RESTful API的基礎结构，包含以下功能：
1. 使用者註冊和登入
2. JWT认证中间件
3. CRUD操作（使用者和文章）
4. MongoDB資料庫整合
5. 輸入驗證中间件
6. 全局错误處理
7. API文檔生成
8. 測試用例
使用async/await语法和现代ES6+特性。
```

**预期輸出**:
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

// 中间件設置
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

// 資料庫連接
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

// 健康檢查
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404處理
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// 全局错误處理
app.use(errorHandler);

// 优雅關閉
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        logger.info('MongoDB connection closed');
        process.exit(0);
    });
});

module.exports = app;
```

### 示例2: 生成使用者控制器

**OpenCode提示词**:
```
創建一个完整的使用者控制器，包含：
1. 使用者註冊（邮箱驗證、密碼加密）
2. 使用者登入（JWT生成）
3. 获取使用者资料
# 更新
5. 刪除使用者帳戶
6. 密碼重置功能
7. 輸入驗證和错误處理
8. 安全最佳實踐
```

**预期輸出**:
```javascript
// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const emailService = require('../utils/emailService');

// 使用者註冊
exports.register = async (req, res) => {
    try {
        // 驗證輸入
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { username, email, password } = req.body;

        // 檢查使用者是否已存在
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'Email or username already registered'
            });
        }

        // 密碼加密
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 創建驗證令牌
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // 創建新使用者
        const user = new User({
            username,
            email,
            password: hashedPassword,
            emailVerificationToken,
            isEmailVerified: false
        });

        await user.save();

        // 發送驗證電子郵件
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

// 使用者登入
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

        // 尋找使用者
        const user = await User.findOne({ email }).select('+password +emailVerificationToken');
        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid email or password'
            });
        }

        // 檢查邮箱是否驗證
        if (!user.isEmailVerified) {
            return res.status(403).json({
                error: 'Email not verified',
                message: 'Please verify your email before logging in'
            });
        }

        // 驗證密碼
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

# 更新
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

// 获取使用者资料
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

# 更新
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

# 更新
        const allowedUpdates = ['username', 'avatar', 'bio', 'website', 'location'];
        const filteredUpdates = {};
        
        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key) && updates[key] !== undefined) {
                filteredUpdates[key] = updates[key];
            }
        });

        // 檢查使用者名是否已被占用
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

// 刪除使用者帳戶
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { password, confirmation } = req.body;

        // 驗證確認資訊
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

        // 驗證密碼
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid password',
                message: 'Password is required to delete account'
            });
        }

        // 刪除使用者（软刪除或硬刪除）
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
創建一个JWT认证中间件，包含：
1. 令牌驗證
2. 使用者資訊加载
3. 令牌刷新機制
4. 权限檢查
5. 错误處理
6. 安全最佳實踐
7. 效能優化
# 配置
```

**预期輸出**:
```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const config = require('../config');

// JWT令牌驗證中间件
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

        // 驗證令牌
        const decoded = jwt.verify(token, config.jwt.secret);
        
        // 檢查令牌是否在黑名单中（如果實現了令牌撤銷）
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({
                error: 'Token has been revoked',
                message: 'Please login again'
            });
        }

        // 加载使用者資訊
        const user = await User.findById(decoded.userId).select('-password -emailVerificationToken');
        if (!user) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'User not found'
            });
        }

        // 檢查使用者是否被禁用
        if (user.status === 'disabled') {
            return res.status(403).json({
                error: 'Account disabled',
                message: 'Your account has been disabled'
            });
        }

        // 将使用者資訊新增到请求对象
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

// 可选权限檢查中间件
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

// 可选角色檢查中间件
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

        // 驗證刷新令牌
        const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
        
        // 檢查刷新令牌是否有效
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

# 更新
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

// 令牌黑名单（简单實現）
const tokenBlacklist = new Set();

// 撤銷令牌
const revokeToken = (req, res) => {
    try {
        const token = req.token;
        
        if (!token) {
            return res.status(400).json({
                error: 'Token required',
                message: 'No token provided to revoke'
            });
        }

        // 将令牌新增到黑名单
        tokenBlacklist.add(token);

        // 可选：从資料庫中刪除刷新令牌
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

## 🧪 測試用例生成示例
# Test Case Generation Examples

### 使用OpenCode生成整合測試

**OpenCode提示词**:
```
为Node.js Express API創建全面的Jest測試套件，包含：
1. 使用者註冊和登入測試
2. JWT认证中间件測試
3. CRUD操作測試
4. 错误處理測試
5. 边界条件測試
6. 安全性測試
7. 效能測試
8. 測試數據和清理
使用现代測試最佳實踐和Mock技術。
```

**预期輸出**:
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
        // 清理使用者集合
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

            // 驗證使用者是否儲存到資料庫
            const savedUser = await User.findOne({ email: userData.email });
            expect(savedUser).toBeTruthy();
            expect(savedUser.username).toBe(userData.username);
            expect(savedUser.email).toBe(userData.email);
            expect(savedUser.password).not.toBe(userData.password); // 密碼應該被加密
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
                password: '123' // 弱密碼
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should not register user with existing email', async () => {
            // 先創建一个使用者
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
            // 創建測試使用者
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
                .send({ email: 'test@example.com' }) // 缺少密碼
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Validation failed');
        });
    });

    describe('Token Validation', () => {
        let token;

        beforeEach(async () => {
            // 登入获取token
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

# 配置
# Deployment and Configuration Examples

# 配置

**OpenCode提示词**:
```
# 配置
1. 多階段構建優化
# 配置
3. 安全最佳實踐
4. 健康檢查
# 管理
# 管理
7. 负载均衡
8. 監控整合
使用Docker Compose编排多個服务。
```

**预期輸出**:
```dockerfile
# Dockerfile
# 構建階段
FROM node:18-alpine AS builder

WORKDIR /app

# 複製package檔案
COPY package*.json ./

# 安裝依赖
RUN npm ci --only=production

# 複製原始碼
COPY . .

# 構建應用程式
RUN npm run build

# 生产階段
FROM node:18-alpine AS production

# 創建非root使用者
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# 複製構建产物和依赖
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# 設置权限
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# 啟動應用程式
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

## 📊 效能優化和監控
# Performance Optimization and Monitoring

# 配置

**OpenCode提示词**:
```
# 配置
# 管理
# 分析
3. 效能指标收集
4. 错误追踪
5. 健康檢查端点
6. 缓存策略
7. 负载測試
8. 監控儀表板
使用现代DevOps最佳實踐。
```

---

## 📚 學習要點總結 / Learning Points Summary

### Node.js核心概念
- 事件驅動程式架構
- 异步編程模式
- 模块系統
# 管理
- 错误處理機制

### Express框架特性
- 路由和中间件
- 请求響應處理
- 模板引擎整合
- 静态檔案服务
- 安全中间件

### 資料庫整合
- MongoDB連接和操作
- Mongoose ODM使用
- 數據模型設計
- 查詢優化
# 管理

### 认证和安全
- JWT令牌认证
- 密碼加密和驗證
- 輸入驗證和清理
# 配置
- 安全头設置

### API設計最佳實踐
- RESTful設計原則
- HTTP狀態码正确使用
# 版本
- 文檔生成
- 错误響應標準化

### 測試和品質保证
- 单元測試編寫
- 整合測試設計
- Mock和Stub使用
- 代碼覆盖率檢查
- 持續整合流程

# 部署
- 容器化技術
# 管理
# 配置
- 監控和日志收集
- 效能優化技巧

---

> [!tip] 💡 最佳實踐建議 / Best Practice Tips
> 
> 1. **使用TypeScript**增强代碼品質和開發體驗
# 部署
> 3. **監控和日志**建立完善的可观测性体系
# 指南
> 5. **效能優化**使用缓存和資料庫索引
# 工作流
# 更新
> 8. **測試覆盖**确保關鍵功能的測試覆盖率

---

*這個示例展示了如何使用OpenCode + Ollama進行完整的Node.js API開發*