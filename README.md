# BioArk Header Slider

仿照 BioArk Tech 官网实现的响应式 Header 轮播组件。

## 功能

- 自动轮播切换（5秒间隔）
- 左右箭头手动控制
- 底部指示器导航
- 移动端触摸滑动
- 背景和文字内容同步切换
- 响应式设计

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite

## 安装运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 项目结构

```
src/
├── components/
│   └── HeaderSlider.vue    # 核心轮播组件
├── types/
│   └── slider.ts           # TS 类型定义
├── App.vue
└── main.ts
```

## 实现思路

### 组件设计

采用分层设计：
- 背景层：多个 div 叠加，通过 opacity 控制显示
- 遮罩层：半透明遮罩提升文字可读性
- 内容层：标题、描述等文字信息
- 控制层：箭头按钮和指示器

### 轮播逻辑

使用 `setInterval` 实现自动播放，通过修改 `currentIndex` 触发 Vue 响应式更新，背景层通过 CSS transition 实现淡入淡出效果。

### 响应式

使用 CSS Media Queries 实现多端适配：
- 桌面端 (>1024px)
- 平板端 (768-1024px)  
- 移动端 (<768px)

## 部署

推送到 GitHub 后可直接部署到 Vercel。

## License

MIT
