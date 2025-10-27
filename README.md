# BioArk Header Slider

一个仿照 BioArk Tech 网站实现的响应式 Header 轮播组件，展示了现代化的前端开发技术和最佳实践。

## ✨ 功能特性

### 核心功能
- 🎯 **全屏 Header 轮播**：支持多张背景图片自动轮播切换
- 🎨 **同步内容切换**：背景图片和文本内容（标题、副标题、描述）同步切换，带平滑过渡动画
- 🎮 **多种交互方式**：
  - 自动播放（可配置间隔时间）
  - 左右箭头按钮手动切换
  - 底部圆点指示器点击切换
  - 触摸滑动支持（移动端）
  - 鼠标悬停暂停自动播放

### 技术亮点
- ⚡ **Vue 3 + TypeScript**：使用最新的 Composition API 和类型安全
- 📱 **响应式设计**：完美适配桌面、平板、移动端各种屏幕尺寸
- 🎭 **丰富动画效果**：
  - 背景图片淡入淡出过渡
  - 文本内容滑动淡入动画
  - 交互元素悬停效果
- 🎨 **CSS 变量**：易于定制的主题配色系统
- 🚀 **性能优化**：使用 will-change 和 backdrop-filter 提升性能

## 🛠️ 技术栈

- **前端框架**：Vue 3.5
- **开发语言**：TypeScript 5.9
- **构建工具**：Vite 7.1
- **样式方案**：Scoped CSS + CSS Variables
- **部署平台**：Vercel

## 📦 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

启动本地开发服务器（支持热重载）：

```bash
npm run dev
```

访问 `http://localhost:5173` 即可预览项目。

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 📁 项目架构

```
bioark-header-slider/
├── src/
│   ├── components/
│   │   └── HeaderSlider.vue      # 核心轮播组件
│   ├── types/
│   │   └── slider.ts             # TypeScript 类型定义
│   ├── App.vue                   # 应用主入口
│   ├── main.ts                   # Vue 应用启动文件
│   └── style.css                 # 全局样式
├── public/                        # 静态资源
├── index.html                     # HTML 模板
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── package.json                   # 项目依赖
├── README.md                      # 项目文档
└── DEPLOYMENT.md                  # 部署指南
```

## 🏗️ 架构设计

### 组件结构

**HeaderSlider.vue** 是核心组件，采用单文件组件（SFC）结构：

1. **Script 部分**（TypeScript + Composition API）
   - 使用 `ref` 和 `computed` 管理响应式状态
   - 实现自动播放、手动切换、触摸支持等交互逻辑
   - 生命周期钩子管理定时器资源

2. **Template 部分**（HTML）
   - 背景图片层：多个 div 叠加，通过 opacity 控制显示
   - 遮罩层：半透明黑色遮罩提升文本可读性
   - 内容层：动态展示标题、副标题、描述和按钮
   - 控制层：左右箭头、底部指示器

3. **Style 部分**（Scoped CSS）
   - CSS 变量实现主题配置
   - Flexbox 和定位实现布局
   - CSS transitions 和 animations 实现动画
   - Media queries 实现响应式设计

### 数据流

```
用户交互 → 更新 currentIndex → 触发 Vue 响应式更新
    ↓
背景图 active class 变化 → CSS transition 过渡
    ↓
文本内容切换 → Vue transition 动画
```

### 状态管理

使用 Vue 3 Composition API 的 ref 和 computed：

- `currentIndex`：当前激活的幻灯片索引
- `isTransitioning`：是否正在过渡（防止快速切换）
- `isPaused`：是否暂停自动播放
- `currentSlide`：计算属性，返回当前幻灯片数据

### 交互逻辑

1. **自动播放**：使用 `setInterval` 定时器，每 5 秒自动切换
2. **手动控制**：点击箭头或指示器调用 `goToSlide()` 方法
3. **悬停暂停**：鼠标进入时清除定时器，离开时重新启动
4. **触摸支持**：监听 `touchstart` 和 `touchend` 事件，计算滑动方向

## 🎨 自定义配置

### 修改轮播内容

编辑 `src/components/HeaderSlider.vue` 中的 `slides` 数组：

```typescript
const slides = ref<SlideItem[]>([
  {
    id: 1,
    title: '你的标题',
    subtitle: 'Your Subtitle',
    description: '你的描述文本',
    backgroundImage: '图片URL',
    backgroundPosition: 'center'
  },
  // 添加更多幻灯片...
]);
```

### 修改轮播配置

编辑 `config` 对象：

```typescript
const config = ref<SliderConfig>({
  autoPlay: true,           // 是否自动播放
  interval: 5000,           // 自动播放间隔（毫秒）
  transitionDuration: 800,  // 过渡动画时长（毫秒）
  pauseOnHover: true        // 鼠标悬停时是否暂停
});
```

### 修改主题颜色

编辑 `src/style.css` 中的 CSS 变量：

```css
:root {
  --primary-color: #0066cc;      /* 主色调 */
  --secondary-color: #00cc99;    /* 辅助色 */
  --text-light: #ffffff;         /* 浅色文字 */
  --text-dark: #333333;          /* 深色文字 */
  --overlay-color: rgba(0, 0, 0, 0.4);  /* 遮罩颜色 */
  --transition-duration: 0.8s;   /* 过渡时长 */
}
```

## 📱 响应式断点

- **桌面端**（> 1024px）：全尺寸显示，大字体
- **平板端**（768px - 1024px）：适度缩放，调整间距
- **移动端**（< 768px）：垂直布局优化，按钮全宽
- **小屏幕**（< 480px）：进一步压缩字体，按钮竖排

## 🚀 部署说明

详细的部署步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project" 导入 GitHub 仓库
4. Vercel 会自动检测 Vite 项目并配置构建命令
5. 点击 "Deploy" 即可完成部署

## 📄 开源协议

MIT License

## 👨‍💻 作者

此项目作为技术评估任务开发，展示前端开发能力和对现代 Web 技术的理解。

## 🙏 致谢

- 灵感来源：[BioArk Tech](https://www.bioarktech.com/)
- 图片来源：[Unsplash](https://unsplash.com/)
- 框架支持：Vue.js、Vite、TypeScript
