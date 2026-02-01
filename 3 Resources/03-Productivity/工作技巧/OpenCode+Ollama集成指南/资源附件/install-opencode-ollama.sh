#!/bin/bash
# OpenCode + Ollama 一键安装脚本
# OpenCode + Ollama One-Click Installation Script
# 
# 此脚本将自动安装和配置完整的本地AI编程环境
# This script automatically installs and configures a complete local AI programming environment
#
# 作者: OpenCode本地模型集成项目
# 版本: 1.0.0
# 日期: 2026-01-15

set -e  # 遇到错误时退出

# ======== 颜色和样式定义 / Color and Style Definitions ========
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

BOLD='\033[1m'
UNDERLINE='\033[4m'

# ======== 打印函数 / Print Functions ========
print_header() {
    echo -e "${BLUE}${BOLD}🦙 OpenCode + Ollama 一键安装脚本${NC}"
    echo -e "${BLUE}======================================${NC}"
    echo ""
}

print_step() {
    echo -e "${CYAN}📍 步骤 $1: $2${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${PURPLE}ℹ️  $1${NC}"
}

# ======== 系统检测 / System Detection ========
detect_system() {
    print_step 1 "系统检测" "Detecting System Information"
    
    # 操作系统检测
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
        DISTRO=$(lsb_release -si 2>/dev/null || echo "Unknown")
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
        DISTRO=$(sw_vers -productVersion)
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        OS="windows"
        DISTRO="Windows"
    else
        print_error "不支持的操作系统: $OSTYPE"
        exit 1
    fi
    
    # 架构检测
    ARCH=$(uname -m)
    
    # 内存检测
    if [[ "$OS" == "linux" ]]; then
        TOTAL_MEM=$(free -g | awk '/^Mem:/{print $2}')
    elif [[ "$OS" == "macos" ]]; then
        TOTAL_MEM=$(sysctl -n hw.memsize | awk '{print int($1/1024/1024/1024)}')
    else
        TOTAL_MEM=16  # 默认值
    fi
    
    # GPU检测
    if command -v nvidia-smi &> /dev/null; then
        GPU_MEMORY=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits 2>/dev/null | head -1)
        HAS_GPU=true
    else
        GPU_MEMORY=0
        HAS_GPU=false
    fi
    
    # 显示系统信息
    echo "操作系统: $OS ($DISTRO)"
    echo "架构: $ARCH"
    echo "总内存: ${TOTAL_MEM}GB"
    echo "GPU内存: ${GPU_MEMORY}GB"
    echo "GPU可用: $HAS_GPU"
    echo ""
    
    # 硬件兼容性评估
    if [[ $TOTAL_MEM -lt 8 ]]; then
        print_warning "系统内存不足8GB，可能影响性能"
    fi
    
    if [[ $HAS_GPU == false ]]; then
        print_warning "未检测到GPU，将使用CPU模式（速度较慢）"
    fi
    
    print_success "系统检测完成"
}

# ======== 检查依赖 / Check Dependencies ========
check_dependencies() {
    print_step 2 "依赖检查" "Checking Dependencies"
    
    local missing_deps=()
    
    # 检查基础工具
    for cmd in curl git wget; do
        if ! command -v $cmd &> /dev/null; then
            missing_deps+=($cmd)
        fi
    done
    
    # 检查Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
    else
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_NODE="18.0.0"
        if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_NODE') ? 0 : 1)" 2>/dev/null; then
            print_warning "Node.js版本过低 ($NODE_VERSION)，建议升级到v18+"
            missing_deps+=("node-upgrade")
        fi
    fi
    
    # 检查Python（某些模型需要）
    if ! command -v python3 &> /dev/null; then
        print_info "未安装Python3，某些模型可能需要"
    fi
    
    # 报告缺失依赖
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        print_error "缺少以下依赖: ${missing_deps[*]}"
        print_info "请先安装缺失的依赖，然后重新运行此脚本"
        exit 1
    fi
    
    print_success "所有依赖已满足"
}

# ======== 安装OpenCode / Install OpenCode ========
install_opencode() {
    print_step 3 "安装OpenCode" "Installing OpenCode"
    
    if command -v opencode &> /dev/null; then
        OPENCODE_VERSION=$(opencode --version 2>/dev/null | head -1)
        print_success "OpenCode已安装 (版本: $OPENCODE_VERSION)"
        read -p "是否要更新到最新版本? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return
        fi
    fi
    
    print_info "正在安装OpenCode..."
    
    # 方法1: 官方安装脚本（推荐）
    if curl -fsSL https://opencode.ai/install | bash; then
        print_success "OpenCode安装成功"
    else
        print_warning "官方安装失败，尝试npm安装..."
        
        # 方法2: npm安装
        if npm install -g @opencode-ai/cli; then
            print_success "OpenCode通过npm安装成功"
        else
            print_error "OpenCode安装失败"
            exit 1
        fi
    fi
    
    # 验证安装
    if command -v opencode &> /dev/null; then
        OPENCODE_VERSION=$(opencode --version 2>/dev/null | head -1)
        print_success "OpenCode验证成功 (版本: $OPENCODE_VERSION)"
    else
        print_error "OpenCode安装验证失败"
        exit 1
    fi
}

# ======== 安装Ollama / Install Ollama ========
install_ollama() {
    print_step 4 "安装Ollama" "Installing Ollama"
    
    if command -v ollama &> /dev/null; then
        OLLAMA_VERSION=$(ollama --version 2>/dev/null)
        print_success "Ollama已安装 (版本: $OLLAMA_VERSION)"
        read -p "是否要更新到最新版本? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return
        fi
    fi
    
    print_info "正在安装Ollama..."
    
    # 根据操作系统选择安装方式
    if [[ "$OS" == "linux" ]] || [[ "$OS" == "macos" ]]; then
        if curl -fsSL https://ollama.ai/install.sh | sh; then
            print_success "Ollama安装成功"
        else
            print_error "Ollama安装失败"
            exit 1
        fi
    elif [[ "$OS" == "windows" ]]; then
        print_info "Windows用户请手动安装Ollama:"
        print_info "1. 访问 https://ollama.ai/download"
        print_info "2. 下载Windows版本"
        print_info "3. 运行安装程序"
        
        read -p "安装完成后按回车继续..." -r
        echo
        
        if ! command -v ollama &> /dev/null; then
            print_error "Ollama未正确安装"
            exit 1
        fi
    fi
    
    # 验证安装
    OLLAMA_VERSION=$(ollama --version 2>/dev/null)
    print_success "Ollama验证成功 (版本: $OLLAMA_VERSION)"
}

# ======== 配置Ollama / Configure Ollama ========
configure_ollama() {
    print_step 5 "配置Ollama" "Configuring Ollama"
    
    # 创建配置目录
    OLLAMA_CONFIG_DIR="$HOME/.ollama"
    mkdir -p "$OLLAMA_CONFIG_DIR"
    
    # 设置环境变量
    print_info "配置Ollama环境变量..."
    
    cat >> "$HOME/.bashrc" << EOF

# OpenCode + Ollama 环境变量
export OLLAMA_HOST=0.0.0.0:11434
export OLLAMA_ORIGINS=*
export OLLAMA_KEEP_ALIVE=24h
export OLLAMA_MAX_LOADED_MODELS=2

# 性能优化
if [ -n "\$GPU_MEMORY" ]; then
    export OLLAMA_GPU_MEMORY_FRACTION=0.8
fi
export OLLAMA_NUM_PARALLEL=4
EOF
    
    # 根据shell类型更新配置文件
    if [[ "$SHELL" == *"zsh"* ]]; then
        sed 's/\.bashrc/\.zshrc/g' "$HOME/.bashrc" > "$HOME/.zshrc.tmp"
        mv "$HOME/.zshrc.tmp" "$HOME/.zshrc"
    fi
    
    print_success "Ollama环境变量配置完成"
}

# ======== 选择和下载模型 / Select and Download Models ========
download_models() {
    print_step 6 "模型选择与下载" "Model Selection and Download"
    
    # 推荐模型列表
    local models=(
        "qwen2.5-coder:7b:Qwen2.5-Coder 7B (推荐):编程专用:8GB:平衡"
        "qwen2.5-coder:14b:Qwen2.5-Coder 14B (高性能):编程专用:16GB:高性能"
        "qwen2.5:7b:Qwen2.5 7B (通用):通用对话:8GB:平衡"
        "qwen2.5:3b:Qwen2.5 3B (轻量):基础任务:4GB:快速"
        "mistral-nemo:12b:Mistral-Nemo 12B (推理):强推理能力:12GB:分析"
    )
    
    # 根据硬件过滤模型
    local available_models=()
    for model_info in "${models[@]}"; do
        IFS=':' read -r model_id model_name model_desc gpu_req perf <<< "$model_info"
        
        if [[ $gpu_req -le $GPU_MEMORY ]] || [[ $gpu_req -eq 0 ]]; then
            available_models+=("$model_id:$model_name:$model_desc:$gpu_req:$perf")
        fi
    done
    
    # 显示可选模型
    echo "可用模型（基于您的硬件配置）:"
    echo ""
    
    local i=1
    for model_info in "${available_models[@]}"; do
        IFS=':' read -r model_id model_name model_desc gpu_req perf <<< "$model_info"
        echo "$i) $model_name"
        echo "   描述: $model_desc"
        echo "   GPU需求: ${gpu_req}GB"
        echo "   性能: $perf"
        echo ""
        ((i++))
    done
    
    # 用户选择
    read -p "请选择要下载的模型 (1-${i}): " -n 1 -r
    echo
    
    if [[ $REPLY -ge 1 ]] && [[ $REPLY -lt $i ]]; then
        selected_model_info="${available_models[$((REPLY-1))]}"
        IFS=':' read -r selected_model_id selected_model_name model_desc gpu_req perf <<< "$selected_model_info"
        
        print_info "选择模型: $selected_model_name"
        print_info "开始下载..."
        
        # 下载模型
        if ollama pull "$selected_model_id"; then
            print_success "模型下载成功"
            SELECTED_MODEL="$selected_model_id"
            SELECTED_MODEL_NAME="$selected_model_name"
        else
            print_error "模型下载失败"
            exit 1
        fi
    else
        print_error "无效选择"
        exit 1
    fi
}

# ======== 配置OpenCode / Configure OpenCode ========
configure_opencode() {
    print_step 7 "配置OpenCode" "Configuring OpenCode"
    
    # 创建配置目录
    OPENCODE_CONFIG_DIR="$HOME/.config/opencode"
    mkdir -p "$OPENCODE_CONFIG_DIR"
    
    # 生成配置文件
    local config_file="$OPENCODE_CONFIG_DIR/opencode.json"
    
    cat > "$config_file" << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "ollama/$SELECTED_MODEL",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (Local)",
      "options": {
        "baseURL": "http://localhost:11434/v1",
        "timeout": 120000,
        "maxRetries": 3,
        "headers": {
          "Connection": "keep-alive"
        }
      },
      "models": {
        "$SELECTED_MODEL": {
          "name": "$SELECTED_MODEL_NAME (Local)",
          "options": {
            "temperature": $([ "$perf" == "高性能" ] && echo "0.05" || echo "0.1"),
            "top_p": 0.9,
            "extraBody": {
              "num_ctx": 8192,
              "num_batch": 512,
              "repeat_penalty": 1.1
            }
          },
          "limit": {
            "context": 8192,
            "output": 4096
          }
        }
      }
    }
  },
  "tools": {
    "timeout": 60000,
    "maxParallel": 3
  }
}
EOF
    
    print_success "OpenCode配置文件已生成: $config_file"
}

# ======== 启动服务 / Start Services ========
start_services() {
    print_step 8 "启动服务" "Starting Services"
    
    # 启动Ollama服务
    print_info "启动Ollama服务..."
    ollama serve &
    OLLAMA_PID=$!
    
    # 等待服务启动
    print_info "等待Ollama服务启动..."
    for i in {1..30}; do
        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
            print_success "Ollama服务启动成功"
            break
        fi
        sleep 1
    done
    
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        print_error "Ollama服务启动失败"
        kill $OLLAMA_PID 2>/dev/null
        exit 1
    fi
    
    # 验证模型
    print_info "验证模型可用性..."
    if ollama list | grep -q "$SELECTED_MODEL"; then
        print_success "模型验证成功"
    else
        print_error "模型不可用"
        kill $OLLAMA_PID 2>/dev/null
        exit 1
    fi
}

# ======== 测试集成 / Test Integration ========
test_integration() {
    print_step 9 "测试集成" "Testing Integration"
    
    print_info "执行OpenCode测试..."
    
    # 创建测试脚本
    cat > /tmp/opencode_test.sh << 'EOF'
#!/bin/bash
echo "🧪 OpenCode集成测试"
echo "====================="

# 测试命令
test_command="创建一个Python函数，计算斐波那契数列"
echo "测试命令: $test_command"
echo ""

# 执行测试
if timeout 60 opencode run "$test_command" --model ollama/$SELECTED_MODEL > /tmp/test_output.txt 2>&1; then
    echo "✅ 测试成功"
    echo ""
    echo "输出内容:"
    cat /tmp/test_output.txt
else
    echo "❌ 测试失败或超时"
    if [ -f /tmp/test_output.txt ]; then
        echo "错误信息:"
        cat /tmp/test_output.txt
    fi
fi
EOF
    
    chmod +x /tmp/opencode_test.sh
    /tmp/opencode_test.sh
    
    # 清理
    rm -f /tmp/opencode_test.sh /tmp/test_output.txt
}

# ======== 完成总结 / Completion Summary ========
completion_summary() {
    print_step 10 "安装完成" "Installation Complete"
    
    echo ""
    echo -e "${GREEN}${BOLD}🎉 OpenCode + Ollama 安装成功！${NC}"
    echo ""
    echo -e "${BLUE}安装信息总结:${NC}"
    echo "=================="
    echo "安装模型: $SELECTED_MODEL_NAME"
    echo "模型ID: $SELECTED_MODEL"
    echo "配置文件: $HOME/.config/opencode/opencode.json"
    echo "Ollama服务: http://localhost:11434"
    echo ""
    
    echo -e "${CYAN}后续使用步骤:${NC}"
    echo "==============="
    echo "1. 重新加载shell配置:"
    echo "   source ~/.bashrc  # 或 source ~/.zshrc"
    echo ""
    echo "2. 启动Ollama服务（如果未启动）:"
    echo "   ollama serve"
    echo ""
    echo "3. 启动OpenCode:"
    echo "   opencode"
    echo ""
    echo "4. 选择本地模型:"
    echo "   /models"
    echo ""
    echo "5. 开始使用:"
    echo "   输入您的编程需求"
    echo ""
    
    echo -e "${YELLOW}重要提醒:${NC}"
    echo "============="
    echo "- Ollama服务已后台运行 (PID: $OLLAMA_PID)"
    echo "- 配置文件位置: $HOME/.config/opencode/opencode.json"
    echo "- 如需停止Ollama: kill $OLLAMA_PID"
    echo "- 如需重启Ollama: ollama serve"
    echo ""
    
    echo -e "${PURPLE}获取帮助:${NC}"
    echo "==========="
    echo "- 官方文档: https://opencode.ai/docs"
    echo "- 社区支持: https://opencode.ai/discord"
    echo "- 故障排除: 查看配置文件中的日志"
    echo ""
}

# ======== 主程序 / Main Program ========
main() {
    print_header
    
    # 检查是否以root运行
    if [[ $EUID -eq 0 ]]; then
        print_warning "不建议以root用户运行此脚本"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # 执行安装步骤
    detect_system
    check_dependencies
    install_opencode
    install_ollama
    configure_ollama
    download_models
    configure_opencode
    start_services
    test_integration
    completion_summary
    
    print_success "安装脚本执行完成！"
}

# ======== 错误处理 / Error Handling ========
trap 'print_error "脚本执行中断，正在清理..."; kill $OLLAMA_PID 2>/dev/null; exit 1' INT TERM

# 运行主程序
main "$@"