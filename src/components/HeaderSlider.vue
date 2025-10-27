<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  image: string
  title: string
  description: string
}

const slides = ref<Slide[]>([
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    title: '生物科技创新',
    description: '引领未来生命科学研究与技术发展'
  },
  {
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=1080&fit=crop',
    title: '精密仪器设备',
    description: '提供高精度实验室解决方案'
  },
  {
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&h=1080&fit=crop',
    title: '专业技术团队',
    description: '由业界顶尖专家组成的研发团队'
  },
  {
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&h=1080&fit=crop',
    title: '全球合作网络',
    description: '与世界领先机构建立战略合作伙伴关系'
  }
])

const currentIndex = ref(0)
let autoplayTimer: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayTimer = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="header-slider" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="slider-container">
      <!-- 背景图片层 -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['slide-background', { active: currentIndex === index }]"
        :style="{ backgroundImage: `url(${slide.image})` }"
      ></div>

      <!-- 文字信息层 -->
      <div class="slide-content">
        <transition name="slide-fade" mode="out-in">
          <div v-if="slides[currentIndex]" :key="currentIndex" class="content-wrapper">
            <h1>{{ slides[currentIndex].title }}</h1>
            <p>{{ slides[currentIndex].description }}</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- 控制按钮 -->
    <button class="nav-btn prev-btn" @click="prevSlide" aria-label="上一张">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button class="nav-btn next-btn" @click="nextSlide" aria-label="下一张">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- 指示点 -->
    <div class="indicators">
      <span
        v-for="(_, index) in slides"
        :key="index"
        :class="['indicator-dot', { active: currentIndex === index }]"
        @click="goToSlide(index)"
        :aria-label="`切换到第 ${index + 1} 张`"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.header-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 背景图片层 */
.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide-background.active {
  opacity: 1;
}

/* 添加深色遮罩以提高文字可读性 */
.slide-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

/* 文字信息层 */
.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 10;
  width: 90%;
  max-width: 1200px;
}

.content-wrapper {
  padding: 20px;
}

.content-wrapper h1 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

.content-wrapper p {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
}

/* 文字切换动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 30px;
}

.next-btn {
  right: 30px;
}

/* 指示点 */
.indicators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 20;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.indicator-dot.active {
  background: #fff;
  width: 36px;
  border-radius: 6px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-wrapper h1 {
    font-size: 3rem;
  }

  .content-wrapper p {
    font-size: 1.2rem;
  }

  .nav-btn {
    width: 45px;
    height: 45px;
  }

  .prev-btn {
    left: 20px;
  }

  .next-btn {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .header-slider {
    height: 70vh;
  }

  .content-wrapper h1 {
    font-size: 2rem;
  }

  .content-wrapper p {
    font-size: 1rem;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .prev-btn {
    left: 15px;
  }

  .next-btn {
    right: 15px;
  }

  .indicators {
    bottom: 30px;
    gap: 8px;
  }

  .indicator-dot {
    width: 10px;
    height: 10px;
  }

  .indicator-dot.active {
    width: 28px;
  }
}

@media (max-width: 480px) {
  .header-slider {
    height: 60vh;
  }

  .content-wrapper h1 {
    font-size: 1.5rem;
  }

  .content-wrapper p {
    font-size: 0.9rem;
  }

  .nav-btn {
    width: 35px;
    height: 35px;
  }

  .nav-btn svg {
    width: 18px;
    height: 18px;
  }

  .prev-btn {
    left: 10px;
  }

  .next-btn {
    right: 10px;
  }

  .indicators {
    bottom: 20px;
  }
}
</style>

