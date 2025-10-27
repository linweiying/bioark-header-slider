# 部署指南 (Deployment Guide)

本文档详细说明如何将 BioArk Header Slider 项目部署到线上环境。

## 📋 目录

- [Vercel 部署（推荐）](#vercel-部署推荐)
- [Netlify 部署](#netlify-部署)
- [传统服务器部署](#传统服务器部署)
- [常见问题](#常见问题)

## 🚀 Vercel 部署（推荐）

Vercel 是最适合 Vite 项目的部署平台，提供免费的 HTTPS、CDN 加速和自动部署。

### 方式一：通过 Vercel CLI（命令行）

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

按提示选择登录方式（GitHub、GitLab、Bitbucket 或 Email）。

#### 3. 部署项目

在项目根目录运行：

```bash
vercel
```

首次部署时会询问一些配置问题：

- **Set up and deploy?** → Yes
- **Which scope?** → 选择你的账户
- **Link to existing project?** → No
- **What's your project's name?** → bioark-header-slider（或自定义）
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

部署成功后，会得到一个临时预览链接。

#### 4. 生产部署

```bash
vercel --prod
```

这会将项目部署到生产环境，获得正式的域名。

### 方式二：通过 Vercel 网站（图形界面）

#### 1. 准备 GitHub 仓库

首先确保你的代码已推送到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/bioark-header-slider.git
git push -u origin main
```

#### 2. 导入项目到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 点击右上角 "Sign Up" 或 "Login"（建议使用 GitHub 登录）
3. 登录后点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 授权 Vercel 访问你的 GitHub 仓库
6. 找到 `bioark-header-slider` 仓库，点击 "Import"

#### 3. 配置项目（自动检测）

Vercel 会自动检测到这是一个 Vite 项目，并自动配置：

- **Framework Preset**: Vite
- **Build Command**: `vite build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

如果检测不正确，可以手动设置这些参数。

#### 4. 部署

点击 "Deploy" 按钮，等待构建完成（通常 1-2 分钟）。

#### 5. 获取预览链接

部署成功后，你会看到：

- **Production URL**: `https://bioark-header-slider.vercel.app`（你的正式域名）
- **Preview URLs**: 每次 Git 推送都会生成预览链接

### 自动部署

配置完成后，每次推送代码到 GitHub 的 `main` 分支，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update slider content"
git push
```

## 🌐 Netlify 部署

### 方式一：通过 Netlify CLI

#### 1. 安装 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. 登录

```bash
netlify login
```

#### 3. 初始化项目

```bash
netlify init
```

按提示配置：

- **Build command**: `npm run build`
- **Publish directory**: `dist`

#### 4. 部署

```bash
netlify deploy --prod
```

### 方式二：通过 Netlify 网站

1. 访问 [Netlify](https://netlify.com)
2. 登录并点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 并授权
4. 选择 `bioark-header-slider` 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点击 "Deploy site"

## 🖥️ 传统服务器部署

如果你有自己的服务器（如 VPS、云服务器），可以手动部署。

### 1. 构建生产版本

在本地或 CI/CD 环境中运行：

```bash
npm run build
```

生成的 `dist` 目录包含所有静态文件。

### 2. 上传到服务器

使用 FTP、SFTP 或 SCP 将 `dist` 目录上传到服务器：

```bash
scp -r dist/* user@your-server.com:/var/www/html/
```

### 3. 配置 Web 服务器

#### Nginx 配置示例

创建配置文件 `/etc/nginx/sites-available/bioark-slider`：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用站点并重启 Nginx：

```bash
sudo ln -s /etc/nginx/sites-available/bioark-slider /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Apache 配置示例

创建 `.htaccess` 文件在 `dist` 目录：

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## 🔒 HTTPS 配置

### Vercel/Netlify

自动提供免费的 SSL 证书（Let's Encrypt），无需配置。

### 传统服务器

使用 Certbot 获取免费的 Let's Encrypt 证书：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 性能优化建议

### 1. 图片优化

- 使用 WebP 格式（带 JPEG/PNG 后备）
- 启用图片懒加载
- 使用 CDN 托管大图片

### 2. 代码分割

Vite 已经自动进行代码分割，但可以进一步优化：

```typescript
// 动态导入
const HeaderSlider = defineAsyncComponent(() => 
  import('./components/HeaderSlider.vue')
);
```

### 3. CDN 加速

在 Vercel/Netlify 中，静态资源自动通过全球 CDN 分发。

对于自建服务器，可以使用：
- Cloudflare CDN（免费）
- AWS CloudFront
- 阿里云 CDN

## 🐛 常见问题

### Q1: 部署后页面空白？

**A**: 检查构建是否成功，查看浏览器控制台错误。常见原因：
- 静态资源路径错误
- TypeScript 编译错误
- API 请求跨域问题

### Q2: 图片加载失败？

**A**: 检查图片 URL 是否正确，确保使用 HTTPS 链接。可以将图片放到 `/public` 目录。

### Q3: Vercel 部署失败？

**A**: 查看构建日志，常见原因：
- Node.js 版本不兼容（在 `package.json` 中指定版本）
- 依赖安装失败（清除 `node_modules` 重新安装）

```json
{
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### Q4: 如何自定义域名？

**Vercel**:
1. 在项目设置中点击 "Domains"
2. 添加你的域名
3. 在域名 DNS 设置中添加 CNAME 记录指向 Vercel

**Netlify**:
1. 在站点设置中点击 "Domain settings"
2. 点击 "Add custom domain"
3. 按提示配置 DNS

### Q5: 如何回滚到之前的版本？

**Vercel**:
- 在 Dashboard 的 "Deployments" 页面找到之前的部署
- 点击 "..." → "Promote to Production"

**Netlify**:
- 在 "Deploys" 页面找到历史部署
- 点击 "Publish deploy"

## 📞 获取帮助

- **Vercel 文档**: https://vercel.com/docs
- **Netlify 文档**: https://docs.netlify.com
- **Vite 文档**: https://vitejs.dev/guide/

## ✅ 部署检查清单

部署前确认：

- [ ] 所有功能在本地测试通过
- [ ] 生产构建成功 (`npm run build`)
- [ ] 图片资源可访问
- [ ] TypeScript 无编译错误
- [ ] 响应式布局在各设备测试通过
- [ ] 代码已推送到 GitHub
- [ ] README 和文档已更新

部署后验证：

- [ ] 网站可以正常访问
- [ ] 轮播功能正常工作
- [ ] 移动端触摸滑动正常
- [ ] 图片正常加载
- [ ] 页面性能良好（使用 Lighthouse 测试）
- [ ] HTTPS 证书有效

---

**🎉 恭喜！你的项目已成功部署！**

