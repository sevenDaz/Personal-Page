<script setup lang="ts">
import SiteNav from '../components/home/SiteNav.vue'
import { ref, onMounted } from 'vue'

const videoSrc = 'mp4/subaru_honor.mp4'

const currentSlide = ref(0)
const autoPlayInterval = ref()

const honors = [
  {
    id: 1,
    title: '泰迪杯数据挖掘挑战赛',
    image: 'images/honors/泰迪杯.jpg',
    description: '泰迪杯数据挖掘挑战赛三等奖'
  },
  {
    id: 2,
    title: '大学生创新创业训练计划',
    image: 'images/honors/大创结题证书.jpg',
    description: '大学生创新创业训练计划项目结题证书'
  },
  {
    id: 3,
    title: '创新创业标兵',
    image: 'images/honors/创新创业标兵.jpg',
    description: '创新创业标兵荣誉称号'
  },
  {
    id: 4,
    title: '微信小程序开发大赛',
    image: 'images/honors/微信小程序大赛.jpg',
    description: '微信小程序开发大赛三等奖'
  },
  {
    id: 5,
    title: '实验室成员',
    image: 'images/honors/实验室成员.jpg',
    description: '实验室优秀成员表彰'
  },
  {
    id: 6,
    title: '软件著作权',
    image: 'images/honors/软著-1.jpg',
    description: '基于深度学习的汉服识别系统软件著作权'
  },
  {
    id: 7,
    title: '软件著作权',
    image: 'images/honors/软著-2.jpg',
    description: '基于深度学习的多种诗歌展示平台软件著作权'
  },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % honors.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + honors.length) % honors.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(nextSlide, 3000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

onMounted(() => {
  startAutoPlay()
})
</script>

<template>
  <div class="home">
    <div class="video-bg" aria-hidden="true">
      <video
        class="video-bg__media"
        :src="videoSrc"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      />
      <div class="video-bg__overlay" />
    </div>

    <SiteNav />

    <main class="home__content">
      <div class="home-panel home-panel--center">
        <!-- Carousel Container -->
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <div class="carousel-slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div
                v-for="(honor, index) in honors"
                :key="honor.id"
                class="carousel-slide"
                :style="{
                  zIndex: currentSlide === index ? 3 :
                         currentSlide === (index - 1 + honors.length) % honors.length ? 2 :
                         currentSlide === (index + 1) % honors.length ? 2 : 1,
                  transform: `translateZ(${currentSlide === index ? 0 : -100}px)`,
                  opacity: currentSlide === index ? 1 :
                           currentSlide === (index - 1 + honors.length) % honors.length ? 0.7 :
                           currentSlide === (index + 1) % honors.length ? 0.7 : 0.3
                }"
              >
                <div class="carousel-card">
                  <img
                    :src="honor.image"
                    :alt="honor.title"
                    class="carousel-image"
                  />
                  <div class="carousel-caption">
                    <h3>{{ honor.title }}</h3>
                    <p>{{ honor.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Arrows -->
            <button class="carousel-arrow prev" @click="prevSlide">
              <span>&lt;</span>
            </button>
            <button class="carousel-arrow next" @click="nextSlide">
              <span>&gt;</span>
            </button>
          </div>

          <!-- Indicators -->
          <div class="carousel-indicators">
            <button
              v-for="(_, index) in honors"
              :key="index"
              class="indicator"
              :class="{ active: currentSlide === index }"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped src="../styles/pages/home.css"></style>

<style scoped>
.honors-title {
  font-size: clamp(2.5rem, 5vh, 3.5rem);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  text-align: center;
}

.honors-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.carousel-container {
  max-width: 1200px;
  width: 90%;
  margin: 4rem auto;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  perspective: 1200px;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-card {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  transform-style: preserve-3d;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.8s ease;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  padding: 2.5rem;
  transform: translateZ(0);
}

.carousel-caption h3 {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  transform: translateZ(0);
}

.carousel-caption p {
  font-size: 1.125rem;
  opacity: 0.95;
  line-height: 1.7;
  transform: translateZ(0);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.carousel-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.carousel-arrow.prev {
  left: 30px;
}

.carousel-arrow.next {
  right: 30px;
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .carousel-container {
    width: 95%;
    margin: 3rem auto;
    border-radius: 16px;
  }

  .carousel-wrapper {
    height: 500px;
  }

  .carousel-caption {
    padding: 2rem;
  }

  .carousel-caption h3 {
    font-size: 1.6rem;
  }

  .carousel-caption p {
    font-size: 1rem;
  }

  .carousel-arrow {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .carousel-arrow.prev {
    left: 20px;
  }

  .carousel-arrow.next {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    width: 100%;
    margin: 2.5rem 1rem;
    border-radius: 12px;
  }

  .carousel-wrapper {
    height: 400px;
  }

  .carousel-caption {
    padding: 1.5rem;
  }

  .carousel-caption h3 {
    font-size: 1.4rem;
  }

  .carousel-caption p {
    font-size: 0.9rem;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .carousel-arrow.prev {
    left: 15px;
  }

  .carousel-arrow.next {
    right: 15px;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    margin: 2rem 0.5rem;
  }

  .carousel-wrapper {
    height: 320px;
  }

  .carousel-caption {
    padding: 1rem;
  }

  .carousel-caption h3 {
    font-size: 1.2rem;
  }

  .carousel-caption p {
    font-size: 0.8rem;
  }

  .carousel-arrow {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .carousel-arrow.prev {
    left: 10px;
  }

  .carousel-arrow.next {
    right: 10px;
  }
}
</style>