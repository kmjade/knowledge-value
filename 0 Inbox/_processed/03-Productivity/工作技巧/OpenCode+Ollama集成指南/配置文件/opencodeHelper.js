/**
 * OpenCode + Ollama Helper for Obsidian
 * 本地AI模型集成助手脚本
 * 
 * 此脚本提供与OpenCode和Ollama集成的辅助功能
 * 适用于Templater环境和QuickAdd宏
 * 
 * @version 1.0.0
 * @author OpenCode本地模型集成项目
 */

// ======== 核心函数 / Core Functions ========

/**
 * 获取当前文件的OpenCode上下文信息
 * @param {Object} tp - Templater实例
 * @returns {Object} 文件上下文对象
 */
async function getOpenCodeContext(tp) {
    try {
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile) {
            throw new Error('没有活动文件');
        }

        const content = await app.vault.read(activeFile);
        const metadata = app.metadataCache.getFileCache(activeFile);
        const frontmatter = metadata?.frontmatter || {};

        return {
            title: activeFile.basename,
            path: activeFile.path,
            folder: activeFile.folder?.path || '',
            content,
            frontmatter,
            tags: frontmatter?.tags || [],
            links: metadata?.links?.map(l => l.link) || [],
            aliases: frontmatter?.aliases || [],
            created: frontmatter?.created || tp.date.now('YYYY-MM-DD'),
            wordCount: content.split(/\s+/).length,
            charCount: content.length
        };
    } catch (error) {
        console.error('获取文件上下文失败:', error);
        return null;
    }
}

/**
 * 检查本地模型状态和可用性
 * @returns {Object} 模型状态信息
 */
async function checkLocalModels() {
    try {
        // 尝试连接Ollama服务
        const response = await fetch('http://localhost:11434/api/tags');
        
        if (!response.ok) {
            throw new Error('Ollama服务不可用');
        }

        const data = await response.json();
        const models = data.models || [];

        return {
            status: 'available',
            service: 'ollama',
            endpoint: 'http://localhost:11434',
            models: models.map(model => ({
                name: model.name,
                size: model.size,
                modified: model.modified_at,
                digest: model.digest.substring(0, 12) // 短摘要
            })),
            totalModels: models.length
        };
    } catch (error) {
        console.warn('模型检查失败:', error.message);
        return {
            status: 'unavailable',
            error: error.message,
            models: []
        };
    }
}

/**
 * 根据任务类型和硬件配置推荐最佳模型
 * @param {string} taskType - 任务类型
 * @param {boolean} requiresTools - 是否需要工具使用
 * @param {Object} hardwareInfo - 硬件信息
 * @returns {string} 推荐的模型名称
 */
function recommendModel(taskType, requiresTools = false, hardwareInfo = {}) {
    const { gpuMemory = 8, systemMemory = 16 } = hardwareInfo;
    
    // 工具使用必须选择支持函数调用的模型
    const toolModels = [
        'qwen2.5-coder:7b',
        'qwen2.5-coder:14b', 
        'deepseek-coder:6.7b',
        'deepseek-coder:16b'
    ];
    
    // 任务类型映射
    const taskModelMap = {
        'code-generation': requiresTools ? 'qwen2.5-coder:7b' : 'qwen2.5:7b',
        'code-review': requiresTools ? 'qwen2.5-coder:7b' : 'mistral-nemo:12b',
        'documentation': requiresTools ? 'qwen2.5-coder:7b' : 'qwen2.5:7b',
        'debugging': 'qwen2.5-coder:7b',
        'refactoring': 'qwen2.5-coder:14b',
        'analysis': 'mistral-nemo:12b',
        'translation': 'qwen2.5:3b',
        'summarization': 'qwen2.5:7b'
    };
    
    // 硬件限制的模型选择
    const hardwareModels = {
        4: ['qwen2.5:3b', 'qwen2.5:1.5b'],      // 4GB GPU
        8: ['qwen2.5:7b', 'qwen2.5-coder:7b'],  // 8GB GPU
        16: ['qwen2.5:14b', 'qwen2.5-coder:14b'], // 16GB GPU
        24: ['qwen2.5:32b', 'qwen2.5-coder:32b']  // 24GB+ GPU
    };
    
    let recommendedModel = taskModelMap[taskType] || 'qwen2.5:7b';
    
    // 如果需要工具使用，确保选择支持工具的模型
    if (requiresTools && !toolModels.some(model => recommendedModel.includes(model.split(':')[0]))) {
        recommendedModel = gpuMemory >= 8 ? 'qwen2.5-coder:7b' : 'qwen2.5:3b';
    }
    
    // 根据硬件限制调整
    const supportedModels = hardwareModels[gpuMemory] || hardwareModels[8];
    if (!supportedModels.some(model => recommendedModel.includes(model.split(':')[0]))) {
        recommendedModel = supportedModels[0];
    }
    
    return recommendedModel;
}

/**
 * 检查模型的工具使用支持
 * @param {string} modelName - 模型名称
 * @returns {boolean} 是否支持工具使用
 */
function supportsToolUsage(modelName) {
    const toolSupportedModels = [
        'qwen2.5-coder',
        'deepseek-coder',
        'gpt-oss',
        'codellama'
    ];
    
    return toolSupportedModels.some(prefix => 
        modelName.toLowerCase().includes(prefix.toLowerCase())
    );
}

/**
 * 生成OpenCode执行命令
 * @param {string} task - 任务描述
 * @param {string} model - 模型名称
 * @param {Object} options - 额外选项
 * @returns {string} 完整的OpenCode命令
 */
function generateOpenCodeCommand(task, model, options = {}) {
    const {
        noThink = false,
        batch = false,
        timeout = 120,
        filePath = null
    } = options;
    
    let command = `opencode run "${task}" --model ollama/${model}`;
    
    if (noThink) {
        command += ' --no-think';
    }
    
    if (batch) {
        command += ' --batch';
    }
    
    if (timeout !== 120) {
        command += ` --timeout ${timeout}`;
    }
    
    if (filePath) {
        command += ` "${filePath}"`;
    }
    
    return command;
}

/**
 * 内容分块处理（处理大文件）
 * @param {string} content - 文件内容
 * @param {number} maxTokens - 最大令牌数
 * @returns {Array} 分块后的内容数组
 */
function chunkContent(content, maxTokens = 4000) {
    // 简单的令牌估算（平均1个token≈4个字符）
    const estimatedTokens = content.length / 4;
    
    if (estimatedTokens <= maxTokens) {
        return [content];
    }
    
    const chunks = [];
    const chunkSize = maxTokens * 4;
    
    // 按段落分块，尽量保持语义完整性
    const paragraphs = content.split('\n\n');
    let currentChunk = '';
    let currentSize = 0;
    
    for (const paragraph of paragraphs) {
        const paragraphSize = paragraph.length + 2; // +2 for \n\n
        
        if (currentSize + paragraphSize <= chunkSize) {
            currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
            currentSize += paragraphSize;
        } else {
            if (currentChunk) {
                chunks.push(currentChunk);
                currentChunk = paragraph;
                currentSize = paragraphSize;
            } else {
                // 单个段落太大，强制分割
                for (let i = 0; i < paragraph.length; i += chunkSize) {
                    chunks.push(paragraph.slice(i, i + chunkSize));
                }
                currentChunk = '';
                currentSize = 0;
            }
        }
    }
    
    if (currentChunk) {
        chunks.push(currentChunk);
    }
    
    return chunks;
}

/**
 * 验证OpenCode配置
 * @param {Object} config - 配置对象
 * @returns {Object} 验证结果
 */
function validateConfig(config) {
    const errors = [];
    const warnings = [];
    
    // 检查必需字段
    if (!config.model) {
        errors.push('缺少默认模型配置');
    }
    
    if (!config.provider || !config.provider.ollama) {
        errors.push('缺少Ollama提供者配置');
    }
    
    const ollamaConfig = config.provider?.ollama;
    
    if (ollamaConfig) {
        // 检查baseURL
        if (!ollamaConfig.options?.baseURL) {
            errors.push('缺少Ollama服务URL配置');
        }
        
        // 检查模型配置
        if (!ollamaConfig.models || Object.keys(ollamaConfig.models).length === 0) {
            warnings.push('没有配置任何模型');
        }
        
        // 检查超时设置
        if (ollamaConfig.options?.timeout && ollamaConfig.options.timeout < 30000) {
            warnings.push('超时时间过短，建议至少30秒');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors,
        warnings,
        config: ollamaConfig
    };
}

// ======== Templater集成函数 / Templater Integration ========

/**
 * 在Templater中使用：显示模型选择对话框
 * @param {Object} tp - Templater实例
 * @returns {string} 选择的模型
 */
async function selectModel(tp) {
    const modelStatus = await checkLocalModels();
    
    if (modelStatus.status === 'unavailable') {
        await tp.system.prompt(
            'Ollama服务不可用。请确保Ollama正在运行：\nollama serve',
            '错误',
            true
        );
        return null;
    }
    
    const modelNames = modelStatus.models.map(m => m.name);
    
    return await tp.system.suggester(
        modelNames,
        modelNames,
        false,
        '选择本地模型 / Select local model:'
    );
}

/**
 * 在Templater中使用：选择任务类型
 * @param {Object} tp - Templater实例
 * @returns {Object} 任务信息
 */
async function selectTaskType(tp) {
    const taskTypes = [
        '🔍 代码分析 - Code Analysis',
        '✏️ 代码生成 - Code Generation', 
        '🛠️ 代码重构 - Code Refactoring',
        '📝 文档生成 - Documentation',
        '🔍 代码审查 - Code Review',
        '🐛 调试辅助 - Debug Assistance',
        '🌐 翻译 - Translation',
        '📋 总结 - Summarization'
    ];
    
    const taskValues = [
        'analysis', 'generation', 'refactoring', 'documentation', 
        'review', 'debugging', 'translation', 'summarization'
    ];
    
    const selectedTask = await tp.system.suggester(
        taskTypes,
        taskValues,
        false,
        '选择任务类型 / Select task type:'
    );
    
    const requiresTools = ['generation', 'refactoring', 'debugging'].includes(selectedTask);
    
    return {
        type: selectedTask,
        requiresTools,
        name: taskTypes[taskValues.indexOf(selectedTask)]
    };
}

/**
 * 在Templater中使用：生成完整的请求模板
 * @param {Object} tp - Templater实例
 * @returns {string} 格式化的请求内容
 */
async function generateRequestTemplate(tp) {
    const ctx = await getOpenCodeContext(tp);
    const task = await selectTaskType(tp);
    const model = await selectModel(tp);
    
    if (!ctx || !task || !model) {
        return '模板生成失败，请重试。';
    }
    
    const recommendedModel = recommendModel(task.type, task.requiresTools);
    const command = generateOpenCodeCommand('根据上下文处理任务', model, {
        noThink: task.type === 'generation'
    });
    
    return `
# OpenCode 本地模型请求

## 📋 上下文信息
- **文件**: ${ctx.path}
- **标签**: ${ctx.tags.join(', ')}
- **创建时间**: ${ctx.created}
- **字数**: ${ctx.wordCount}

## 🎯 任务信息
- **类型**: ${task.name}
- **需要工具**: ${task.requiresTools ? '是' : '否'}
- **推荐模型**: ${recommendedModel}
- **选择模型**: ${model}

## 💬 OpenCode 命令
\`\`\`bash
${command}
\`\`\`

## 📤 执行结果
> [!note] 在此粘贴OpenCode的返回结果
`;
}

// ======== QuickAdd宏函数 / QuickAdd Macro Functions ========

/**
 * QuickAdd宏：检查模型状态
 * @returns {string} 状态信息
 */
async function quickCheckModels() {
    const status = await checkLocalModels();
    
    if (status.status === 'unavailable') {
        return `❌ Ollama服务不可用\n错误: ${status.error}`;
    }
    
    let result = `✅ Ollama服务运行正常\n`;
    result += `📊 可用模型数量: ${status.totalModels}\n\n`;
    result += `📋 可用模型:\n`;
    
    status.models.forEach((model, index) => {
        result += `${index + 1}. ${model.name} (${model.size ? Math.round(model.size / 1024 / 1024 / 1024) + 'GB' : 'Unknown'})\n`;
    });
    
    return result;
}

/**
 * QuickAdd宏：生成配置检查报告
 * @returns {string} 配置检查结果
 */
async function quickConfigCheck() {
    try {
        // 这里可以读取实际的配置文件
        const configPath = require('os').homedir() + '/.config/opencode/opencode.json';
        
        // 模拟配置检查
        const mockConfig = {
            model: 'ollama/qwen2.5-coder:7b',
            provider: { ollama: { options: { baseURL: 'http://localhost:11434/v1' } } }
        };
        
        const validation = validateConfig(mockConfig);
        
        let result = validation.valid ? '✅ 配置有效\n\n' : '❌ 配置有误\n\n';
        
        if (validation.errors.length > 0) {
            result += '🚨 错误:\n';
            validation.errors.forEach(error => {
                result += `  - ${error}\n`;
            });
        }
        
        if (validation.warnings.length > 0) {
            result += '⚠️ 警告:\n';
            validation.warnings.forEach(warning => {
                result += `  - ${warning}\n`;
            });
        }
        
        return result;
    } catch (error) {
        return `❌ 配置检查失败: ${error.message}`;
    }
}

// ======== 导出接口 / Export Interface ========

module.exports = {
    // 核心功能
    getOpenCodeContext,
    checkLocalModels,
    recommendModel,
    supportsToolUsage,
    generateOpenCodeCommand,
    chunkContent,
    validateConfig,
    
    // Templater集成
    selectModel,
    selectTaskType,
    generateRequestTemplate,
    
    // QuickAdd宏
    quickCheckModels,
    quickConfigCheck,
    
    // 工具函数
    formatFileSize: (bytes) => {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    getModelCapabilities: (modelName) => {
        const capabilities = {
            'qwen2.5-coder:7b': { tools: true, context: 8192, quality: 'high' },
            'qwen2.5-coder:14b': { tools: true, context: 8192, quality: 'very-high' },
            'qwen2.5:3b': { tools: false, context: 8192, quality: 'medium' },
            'qwen2.5:7b': { tools: false, context: 8192, quality: 'high' },
            'mistral-nemo:12b': { tools: false, context: 32768, quality: 'very-high' }
        };
        
        return capabilities[modelName] || { tools: false, context: 4096, quality: 'unknown' };
    }
};

console.log('OpenCode + Ollama Helper loaded successfully');