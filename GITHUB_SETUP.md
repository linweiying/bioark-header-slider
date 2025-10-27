# GitHub 仓库设置和部署指南

## 📦 第一步：初始化 Git 仓库

在项目根目录运行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 创建首次提交
git commit -m "feat: 实现 BioArk Header Slider 轮播组件"

# 设置主分支名称为 main
git branch -M main
```

## 🌐 第二步：创建 GitHub 仓库

### 方式一：通过 GitHub 网站

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `bioark-header-slider`
   - **Description**: "响应式 Header 轮播组件 - Vue 3 + TypeScript + Vite"
   - **Visibility**: Public（公开）或 Private（私有）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

### 方式二：通过 GitHub CLI

如果已安装 [GitHub CLI](https://cli.github.com/)：

```bash
gh repo create bioark-header-slider --public --source=. --remote=origin --push
```

## 🚀 第三步：推送代码到 GitHub

如果是通过网站创建的仓库，运行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/bioark-header-slider.git

# 推送代码
git push -u origin main
```

## 🌟 第四步：部署到 Vercel

### 自动部署（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账户登录
3. 点击 "Add New..." → "Project"
4. 在 "Import Git Repository" 中找到 `bioark-header-slider`
5. 点击 "Import"
6. Vercel 会自动检测配置（Vite 框架）
7. 点击 "Deploy" 开始部署
8. 等待 1-2 分钟，部署完成！

### 手动部署

或者使用 Vercel CLI：

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel

# 登录 Vercel
vercel login

# 部署到生产环境
vercel --prod
```

## 🔗 获取预览链接

部署成功后，你会得到类似这样的链接：

- **生产环境**: `https://bioark-header-slider.vercel.app`
- **预览环境**: `https://bioark-header-slider-xxx.vercel.app`

## 📝 后续更新

每次修改代码后：

```bash
# 添加修改的文件
git add .

# 创建提交
git commit -m "描述你的修改"

# 推送到 GitHub
git push
```

推送后，Vercel 会自动重新部署（如果配置了自动部署）。

## 🎯 完整示例

假设你的 GitHub 用户名是 `zhangsan`：

```bash
# 1. 初始化和提交
git init
git add .
git commit -m "feat: 实现 BioArk Header Slider 轮播组件"
git branch -M main

# 2. 连接到 GitHub
git remote add origin https://github.com/zhangsan/bioark-header-slider.git
git push -u origin main

# 3. 部署到 Vercel
vercel --prod
```

## ✅ 验证部署成功

访问你的 Vercel 预览链接，确认：

- [ ] 页面可以正常访问
- [ ] Header 轮播正常工作
- [ ] 背景图片正常加载
- [ ] 文本内容同步切换
- [ ] 左右箭头按钮可用
- [ ] 底部指示器可用
- [ ] 移动端触摸滑动正常
- [ ] 响应式布局适配各种屏幕

## 🐛 常见问题

### 问题 1: git push 失败

```
error: failed to push some refs
```

**解决方案**：

```bash
git pull --rebase origin main
git push -u origin main
```

### 问题 2: GitHub 权限错误

```
Permission denied (publickey)
```

**解决方案**：配置 SSH 密钥或使用 HTTPS + Personal Access Token

使用 HTTPS：
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/bioark-header-slider.git
```

### 问题 3: Vercel 构建失败

查看构建日志，通常是依赖问题。解决方案：

```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install

# 测试本地构建
npm run build

# 如果本地成功，推送到 GitHub
git add package-lock.json
git commit -m "chore: update dependencies"
git push
```

## 📚 相关资源

- [Git 文档](https://git-scm.com/doc)
- [GitHub 文档](https://docs.github.com/)
- [Vercel 文档](https://vercel.com/docs)
- [项目 README](./README.md)
- [部署指南](./DEPLOYMENT.md)

---

**🎉 完成！你的项目已成功上线！**

