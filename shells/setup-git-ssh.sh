#!/bin/bash
# ==========================================
# 🔧 GitHub + Gitee SSH 自动配置脚本（中文版）
# 自动生成 SSH 密钥、配置 SSH、本地 Git 用户信息，
# 并在检测到 Git 仓库时自动添加远程仓库。
# ==========================================

echo "===================================="
echo "🚀 正在配置 GitHub 与 Gitee SSH 登录..."
echo "===================================="

SSH_DIR="$HOME/.ssh"
mkdir -p "$SSH_DIR"

# ------------------------------------------
# 生成 SSH 密钥的函数
# ------------------------------------------
generate_key() {
  local service=$1
  local email=$2
  local keyfile=$3

  if [ ! -f "$keyfile" ]; then
    echo "👉 正在生成 $service SSH 密钥..."
    ssh-keygen -t ed25519 -C "$email" -f "$keyfile" -N ""
  else
    echo "✅ $service SSH 密钥已存在：$keyfile"
  fi
}

read -p "请输入你的 GitHub 用户名: " GH_USER
read -p "请输入你的 GitHub 邮箱: " GH_EMAIL
read -p "请输入你的 Gitee 用户名: " GITEE_USER
read -p "请输入你的 Gitee 邮箱: " GITEE_EMAIL

GH_KEY="$SSH_DIR/id_github"
GITEE_KEY="$SSH_DIR/id_gitee"

generate_key "GitHub" "$GH_EMAIL" "$GH_KEY"
generate_key "Gitee" "$GITEE_EMAIL" "$GITEE_KEY"

# ------------------------------------------
# 配置本地 Git 用户信息（仓库级）
# ------------------------------------------
echo
echo "===================================="
echo "🧩 正在配置本地 Git 用户信息（仅当前仓库）..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git config user.name "$GH_USER"
  git config user.email "$GH_EMAIL"
  echo "✅ 已设置 user.name: $(git config user.name)"
  echo "✅ 已设置 user.email: $(git config user.email)"
else
  echo "⚠️ 当前目录不是 Git 仓库，跳过本地 Git 用户设置。"
fi

# ------------------------------------------
# SSH 配置文件
# ------------------------------------------
CONFIG_FILE="$SSH_DIR/config"
echo
echo "👉 正在更新 SSH 配置文件：$CONFIG_FILE"

sed -i '/Host github.com/,+3d' "$CONFIG_FILE" 2>/dev/null
sed -i '/Host gitee.com/,+3d' "$CONFIG_FILE" 2>/dev/null

cat <<EOF >> "$CONFIG_FILE"
Host github.com
  HostName github.com
  User git
  IdentityFile $GH_KEY

Host gitee.com
  HostName gitee.com
  User git
  IdentityFile $GITEE_KEY
EOF

chmod 600 "$CONFIG_FILE"
chmod 600 "$SSH_DIR"/*

echo
echo "===================================="
echo "📋 请手动将以下公钥添加到对应网站："
echo "------------------------------------"
echo "GitHub 公钥路径：$GH_KEY.pub"
echo "🔗 链接：https://github.com/settings/keys"
echo
echo "Gitee 公钥路径：$GITEE_KEY.pub"
echo "🔗 链接：https://gitee.com/profile/sshkeys"
echo "===================================="
echo

echo "⏳ 正在测试 GitHub 连接..."
ssh -T git@github.com 2>&1 | grep -q "successfully" && echo "✅ GitHub SSH 连接成功！" || echo "⚠️ GitHub 连接失败（可能未添加公钥）"

echo "⏳ 正在测试 Gitee 连接..."
ssh -T git@gitee.com 2>&1 | grep -q "successfully" && echo "✅ Gitee SSH 连接成功！" || echo "⚠️ Gitee 连接失败（可能未添加公钥）"

# ------------------------------------------
# 自动添加远程仓库（如果在 Git 项目中）
# ------------------------------------------
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo
  echo "===================================="
  echo "🧩 检测到当前目录为 Git 仓库"
  echo "开始检测远程配置..."
  echo "===================================="

  GH_REPO_SSH="git@github.com:smirk9581/vureact-official-documentation.git"
  GITEE_REPO_SSH="git@gitee.com:Ryan-Zhong/vureact-official-documentation.git"

  if git remote -v | grep -q github.com; then
    echo "✅ 已配置 GitHub 远程仓库"
  else
    echo "👉 添加 GitHub 远程仓库：$GH_REPO_SSH"
    git remote add github "$GH_REPO_SSH" 2>/dev/null || echo "⚠️ 远程名 github 已存在"
  fi

  if git remote -v | grep -q gitee.com; then
    echo "✅ 已配置 Gitee 远程仓库"
  else
    echo "👉 添加 Gitee 远程仓库：$GITEE_REPO_SSH"
    git remote add gitee "$GITEE_REPO_SSH" 2>/dev/null || echo "⚠️ 远程名 gitee 已存在"
  fi

  echo
  echo "🎯 现在你可以执行以下命令推送："
  echo "   git push github main"
  echo "   git push gitee main"
else
  echo "⚠️ 当前目录不是 Git 项目，跳过远程配置。"
fi

echo
echo "===================================="
echo "🎉 SSH 与仓库配置完成！"
echo "===================================="

read -p "按 Enter 键关闭窗口..."
