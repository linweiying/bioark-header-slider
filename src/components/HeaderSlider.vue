<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import type { SlideItem, SliderConfig } from '../types/slider';

// 轮播数据
const slides = ref<SlideItem[]>([
  {
    id: 1,
    title: '创新生物技术',
    subtitle: 'Innovative Biotechnology',
    description: '致力于推动生命科学和生物技术的创新发展，为人类健康提供前沿解决方案',
    backgroundImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80',
    backgroundPosition: 'center'
  },
  {
    id: 2,
    title: '精准医疗',
    subtitle: 'Precision Medicine',
    description: '结合基因组学和大数据分析，为患者提供个性化的精准治疗方案',
    backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80',
    backgroundPosition: 'center'
  },
  {
    id: 3,
    title: '智能研发平台',
    subtitle: 'Intelligent R&D Platform',
    description: '利用人工智能和机器学习技术，加速新药研发和临床试验进程',
    backgroundImage: 'https://images.unsplash.com/photo-1582719366820-c4e84c18c0ca?w=1920&q=80',
    backgroundPosition: 'center'
  },
  {
    id: 4,
    title: '全球合作伙伴',
    subtitle: 'Global Partnership',
    description: '与国际顶尖科研机构和医疗企业紧密合作，共同推进生物医药事业发展',
    backgroundImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80',
    backgroundPosition: 'center'
  }
]);

// 轮播配置
const config = ref<SliderConfig>({
  autoPlay: true,
  interval: 5000,
  transitionDuration: 800,
  pauseOnHover: true
});

// 当前激活的幻灯片索引
const currentIndex = ref(0);
// 是否正在过渡
const isTransitioning = ref(false);
// 自动播放定时器
let autoPlayTimer: number | null = null;
// 是否暂停自动播放
const isPaused = ref(false);

// 当前幻灯片
const currentSlide = computed(() => slides.value[currentIndex.value]);

// 切换到指定索引
const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentIndex.value) return;
  
  isTransitioning.value = true;
  currentIndex.value = index;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, config.value.transitionDuration);
  
  resetAutoPlay();
};

// 下一张
const nextSlide = () => {
  const nextIndex = (currentIndex.value + 1) % slides.value.length;
  goToSlide(nextIndex);
};

// 上一张
const prevSlide = () => {
  const prevIndex = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  goToSlide(prevIndex);
};

// 开始自动播放
const startAutoPlay = () => {
  if (!config.value.autoPlay || isPaused.value) return;
  
  stopAutoPlay();
  autoPlayTimer = window.setInterval(() => {
    nextSlide();
  }, config.value.interval);
};

// 停止自动播放
const stopAutoPlay = () => {
  if (autoPlayTimer !== null) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

// 重置自动播放
const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

// 鼠标进入暂停
const handleMouseEnter = () => {
  if (config.value.pauseOnHover) {
    isPaused.value = true;
    stopAutoPlay();
  }
};

// 鼠标离开继续
const handleMouseLeave = () => {
  if (config.value.pauseOnHover) {
    isPaused.value = false;
    startAutoPlay();
  }
};

// 触摸支持
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e: TouchEvent) => {
  const touch = e.changedTouches[0];
  if (touch) {
    touchStartX = touch.screenX;
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  const touch = e.changedTouches[0];
  if (touch) {
    touchEndX = touch.screenX;
    handleSwipe();
  }
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

// 生命周期
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div 
    class="header-slider"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 背景图片层 -->
    <div class="slider-backgrounds">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="slider-background"
        :class="{ active: index === currentIndex }"
        :style="{
          backgroundImage: `url(${slide.backgroundImage})`,
          backgroundPosition: slide.backgroundPosition || 'center'
        }"
      />
    </div>

    <!-- 遮罩层 -->
    <div class="slider-overlay" />

    <!-- 内容层 -->
    <div class="slider-content">
      <div class="content-wrapper">
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentSlide" :key="currentSlide.id" class="slide-text">
            <p class="slide-subtitle">{{ currentSlide.subtitle }}</p>
            <h1 class="slide-title">{{ currentSlide.title }}</h1>
            <p class="slide-description">{{ currentSlide.description }}</p>
            <div class="slide-actions">
              <button class="btn-primary">了解更多</button>
              <button class="btn-secondary">联系我们</button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 左右切换按钮 -->
    <button 
      class="slider-control slider-control-prev" 
      @click="prevSlide"
      aria-label="上一张"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button 
      class="slider-control slider-control-next" 
      @click="nextSlide"
      aria-label="下一张"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- 导航指示器 -->
    <div class="slider-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`切换到第 ${index + 1} 张`"
      />
    </div>
  </div>
</template>

<style scoped>
/* CSS 变量 */
:root {
  --primary-color: #0066cc;
  --secondary-color: #00cc99;
  --text-light: #ffffff;
  --text-dark: #333333;
  --overlay-color: rgba(0, 0, 0, 0.4);
  --transition-duration: 0.8s;
}

/* 主容器 */
.header-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 背景图片层 */
.slider-backgrounds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity var(--transition-duration) ease-in-out;
  will-change: opacity;
}

.slider-background.active {
  opacity: 1;
  z-index: 1;
}

/* 遮罩层 */
.slider-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-color);
  z-index: 2;
}

/* 内容层 */
.slider-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: var(--text-light);
}

/* 文本内容 */
.slide-text {
  animation: fadeInUp 0.8s ease-out;
}

.slide-subtitle {
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0.9;
  font-weight: 300;
}

.slide-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-description {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 按钮 */
.slide-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.slide-actions button {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: var(--primary-color);
  color: var(--text-light);
}

.btn-primary:hover {
  background: #0052a3;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 102, 204, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--text-light);
}

.btn-secondary:hover {
  background: var(--text-light);
  color: var(--text-dark);
  transform: translateY(-2px);
}

/* 切换按钮 */
.slider-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.slider-control:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.slider-control-prev {
  left: 3%;
}

.slider-control-next {
  right: 3%;
}

/* 导航指示器 */
.slider-indicators {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  gap: 1rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.indicator.active {
  background: var(--text-light);
  border-color: var(--text-light);
  width: 40px;
  border-radius: 6px;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .slide-title {
    font-size: 3rem;
  }
  
  .slide-description {
    font-size: 1.1rem;
  }
  
  .slider-control {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .header-slider {
    height: 100vh;
  }
  
  .slide-subtitle {
    font-size: 0.9rem;
  }
  
  .slide-title {
    font-size: 2.2rem;
  }
  
  .slide-description {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .slide-actions button {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
  }
  
  .slider-control {
    width: 45px;
    height: 45px;
  }
  
  .slider-control-prev {
    left: 2%;
  }
  
  .slider-control-next {
    right: 2%;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .indicator.active {
    width: 30px;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 1.8rem;
  }
  
  .slide-description {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
  
  .slide-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .slide-actions button {
    width: 100%;
    max-width: 280px;
  }
  
  .slider-control {
    width: 40px;
    height: 40px;
  }
}
</style>

