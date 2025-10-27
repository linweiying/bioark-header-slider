# 快速部署指南 🚀

## ✅ 已完成

- [x] Git 仓库已初始化
- [x] 代码已提交到本地仓库
- [x] Vercel CLI 已安装
- [x] README 和架构文档已完成

## 📝 下一步：部署到 GitHub 和 Vercel

### 方案一：GitHub + Vercel 自动部署（推荐）

#### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - Repository name: `bioark-header-slider`
   - Description: `响应式 Header 轮播组件 - Vue 3 + TypeScript`
   - 选择 Public 或 Private
   - **不要勾选** "Initialize this repository with a README"
3. 点击 "Create repository"

#### 步骤 2：推送代码到 GitHub

复制 GitHub 提供的命令，或使用以下命令（替换 YOUR_USERNAME）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/bioark-header-slider.git
git push -u origin main
```

#### 步骤 3：部署到 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账户登录
3. 点击 "Add New..." → "Project"
4. 选择 `bioark-header-slider` 仓库
5. 点击 "Import"
6. Vercel 自动检测配置，直接点击 "Deploy"
7. 等待 1-2 分钟，获得预览链接！

---

### 方案二：使用 Vercel CLI 直接部署（更快）

在项目目录运行以下命令：

```bash
# 登录 Vercel（会打开浏览器）
vercel login

# 部署到生产环境
vercel --prod
```

按照提示操作：
- Set up and deploy? → Y
- Which scope? → 选择你的账户
- Link to existing project? → N
- What's your project's name? → bioark-header-slider
- In which directory is your code located? → ./
- Want to override the settings? → N

完成后会自动获得预览链接！

---

## 🎯 预期结果

完成部署后你会获得：

✅ **GitHub 仓库链接**: `https://github.com/YOUR_USERNAME/bioark-header-slider`

✅ **README 文档**: 已包含启动方法和架构思路

✅ **Vercel 预览网址**: `https://bioark-header-slider.vercel.app`（或类似）

---

## 💡 快速测试命令

部署前，先在本地测试：

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产版本
npm run preview
```

---

## 📞 需要帮助？

遇到问题请查看：
- [GitHub 设置指南](./GITHUB_SETUP.md)
- [详细部署文档](./DEPLOYMENT.md)
- [项目 README](./README.md)

