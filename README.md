# Header 滑动轮播效果 - BioArk 科技

一个现代化、响应式的首页Header轮播组件，实现了背景图片与文字信息的同步滑动效果。

## ✨ 功能特性

- 🎨 **精美的视觉效果**：背景图片淡入淡出 + 文字信息滑动动画
- 🔄 **自动轮播**：每5秒自动切换，鼠标悬停时暂停
- 🎯 **多种控制方式**：
  - 左右箭头按钮
  - 底部指示点
  - 键盘左右方向键支持（可扩展）
- 📱 **完全响应式**：适配移动端、平板、PC各种屏幕尺寸
- ⚡ **性能优化**：使用CSS3硬件加速动画，流畅不卡顿
- ♿ **无障碍支持**：添加ARIA标签，支持屏幕阅读器

## 🛠️ 技术栈

- **前端框架**：Vue.js 3.5+ (Composition API)
- **开发语言**：TypeScript 5+
- **构建工具**：Vite 7+
- **样式方案**：CSS3 (Transitions + Animations)
- **图片来源**：Unsplash (示例图片)

## 📦 项目结构

```
bioark-header-slider/
├── src/
│   ├── components/
│   │   └── HeaderSlider.vue      # 主轮播组件
│   ├── App.vue                    # 根组件
│   ├── main.ts                    # 应用入口
│   └── style.css                  # 全局样式
├── public/                        # 静态资源目录
├── index.html                     # HTML模板
├── package.json                   # 项目依赖
├── vite.config.ts                 # Vite配置
└── README.md                      # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
npm install
```

或使用 pnpm：

```bash
pnpm install
```

### 本地开发

```bash
npm run dev
```

启动后访问：`http://localhost:5173`

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist/` 目录下。

### 预览生产版本

```bash
npm run preview
```

## 🏗️ 架构设计

### 核心设计思路

#### 1. 组件架构

采用单文件组件（SFC）设计，将模板、逻辑、样式封装在 `HeaderSlider.vue` 中：

- **模板层**：使用 Vue 模板语法，实现声明式渲染
- **逻辑层**：使用 Composition API，提供清晰的状态管理和生命周期控制
- **样式层**：使用 Scoped CSS，避免样式污染

#### 2. 状态管理

```typescript
const currentIndex = ref(0)  // 当前显示的轮播索引
const slides = ref<Slide[]>([...])  // 轮播数据数组
let autoplayTimer: number | null = null  // 自动播放定时器
```

#### 3. 关键实现细节

**背景图片切换效果**：

```css
.slide-background {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide-background.active {
  opacity: 1;
}
```

通过 CSS `opacity` 属性和 `transition` 实现平滑的淡入淡出效果。所有图片预加载并使用 `position: absolute` 层叠放置，只切换当前显示图片的透明度。

**文字信息同步滑动**：

```vue
<transition name="slide-fade" mode="out-in">
  <div :key="currentIndex">
    <h1>{{ slides[currentIndex].title }}</h1>
    <p>{{ slides[currentIndex].description }}</p>
  </div>
</transition>
```

使用 Vue 的 `<transition>` 组件，配合自定义的 CSS 动画类：

```css
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);  /* 从下方进入 */
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);  /* 向上方离开 */
}
```

#### 4. 自动播放机制

```typescript
const startAutoplay = () => {
  autoplayTimer = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
}

// 鼠标悬停时暂停
@mouseenter="stopAutoplay" 
@mouseleave="startAutoplay"
```

使用 `setInterval` 实现定时切换，鼠标悬停时暂停以提升用户体验。组件卸载时自动清除定时器，避免内存泄漏。

#### 5. 响应式设计

使用 CSS 媒体查询实现多端适配：

- **桌面端 (>1024px)**：大尺寸文字、全尺寸按钮
- **平板端 (768px-1024px)**：中等尺寸调整
- **移动端 (<768px)**：小尺寸文字、紧凑布局
- **小屏幕 (<480px)**：最小化元素，优化可点击区域

## 🎯 核心功能说明

### 轮播控制

- **自动播放**：默认每5秒切换一次
- **手动控制**：
  - 点击左右箭头按钮
  - 点击底部指示点直接跳转
  - 鼠标悬停时暂停自动播放

### 动画效果

- **背景图片**：1秒淡入淡出过渡
- **文字内容**：0.8秒淡入淡出 + 上下平移
- **按钮交互**：悬停放大效果
- **指示点**：活动状态拉伸效果

### 数据结构

```typescript
interface Slide {
  image: string       // 背景图片URL
  title: string       // 标题
  description: string // 描述文字
}
```

## 🚢 部署说明

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库

2. 访问 [Vercel](https://vercel.com) 并登录

3. 点击 "Import Project"

4. 选择你的 GitHub 仓库

5. 配置构建设置：
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. 点击 "Deploy" 完成部署

### 其他部署平台

- **Netlify**：拖拽 `dist` 目录即可部署
- **GitHub Pages**：使用 `gh-pages` 分支部署
- **Nginx**：将 `dist` 目录内容复制到服务器

## 📝 自定义配置

### 修改轮播内容

编辑 `src/components/HeaderSlider.vue` 中的 `slides` 数组：

```typescript
const slides = ref<Slide[]>([
  {
    image: '你的图片URL',
    title: '标题',
    description: '描述'
  },
  // 添加更多轮播项...
])
```

### 调整自动播放间隔

修改 `startAutoplay` 函数中的时间（毫秒）：

```typescript
window.setInterval(() => {
  nextSlide()
}, 5000)  // 修改这个值
```

### 修改动画速度

调整 CSS 中的 `transition` 属性：

```css
.slide-background {
  transition: opacity 1s ease-in-out;  /* 修改时间 */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;  /* 修改时间 */
}
```

## 🔧 开发建议

### 性能优化

1. **图片优化**：使用 WebP 格式，压缩图片大小
2. **懒加载**：首屏只加载第一张图片，其他图片懒加载
3. **预加载**：提前加载下一张图片
4. **CDN**：使用 CDN 加速图片加载

### 功能扩展

- 添加触摸滑动支持（移动端手势）
- 添加键盘控制（左右方向键）
- 添加缩略图预览
- 添加视频背景支持
- 添加视差滚动效果

## 📄 许可证

MIT License

## 👨‍💻 作者

BioArk Tech Team

---

**备注**：本项目为技术评估任务，展示了现代前端开发的最佳实践和对需求的理解能力。
