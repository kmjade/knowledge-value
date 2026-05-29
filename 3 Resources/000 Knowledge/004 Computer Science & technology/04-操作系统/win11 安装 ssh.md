
防火墙记得先放行 22 端口，然后以管理员权限打开 powershell：

```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
cd C:\Windows\System32\OpenSSH
powershell -ExecutionPolicy Bypass -File .\install-sshd.ps1
Start-Service sshd
Set-Service sshd -StartupType Automatic
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH SSH Server" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22

```


如果上面方法不行，也可以用 winget 安装：  
先安装 winget：

```
# 1. 从 GitHub 下载最新版的 winget 安装包到当前目录
Invoke-WebRequest -Uri "https://github.com/microsoft/winget-cli/releases/latest/download/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle" -OutFile ".\winget.msixbundle"

# 2. 安装下载好的包
Add-AppxPackage ".\winget.msixbundle"

```


```
# ==========================================
# 第一部分：使用 winget 安装 OpenSSH
# ==========================================

# 1. 搜索包名（可选，用于确认）
winget search OpenSSH

# 2. 精准安装 OpenSSH Beta
winget install --id Microsoft.OpenSSH.Beta -e --source winget

# ==========================================
# 第二部分：SSH 服务端配置 
# (注：如果你的电脑只用来连接别人，不需要别人连你，此部分可跳过)
# ==========================================

# 3. 启动 SSH 服务
Start-Service sshd

# 4. 设置 SSH 服务为开机自启
Set-Service -Name sshd -StartupType 'Automatic'

# 5. 配置 Windows 防火墙，放行 22 端口入站连接
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
}

# ==========================================
# 第三部分：备选原生安装方式（如果不使用 winget）
# ==========================================

# 安装 Win11 内置 SSH 客户端
# Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# 安装 Win11 内置 SSH 服务端
# Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

```
