<template>
  <div class="hero-video-container">
    <!-- Video Background -->
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="@/assets/video/beach.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content using PrimeVue Card -->
    <Card class="hero-content-card">
      <template #content>
        <div class="hero-content">
          <!-- Main Title -->
          <h1 class="hero-title">
            Keep Your Family Safe
          </h1>
          
          <!-- Subtitle -->
          <p class="hero-subtitle">
            Real-time water quality updates for Dromana Beach
          </p>
          
          <!-- CTA Button using PrimeVue Button -->
          <Button
            @click="scrollToDashboard"
            label="Get Started"
            class="hero-button"
            size="large"
          />
        </div>
      </template>
    </Card>

    <!-- Scroll Down Arrow using PrimeVue Button -->
    <Button
      @click="scrollToDashboard"
      icon="pi pi-arrow-down"
      class="hero-scroll-button"
      text
      rounded
      size="large"
      aria-label="Scroll to dashboard"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps<{
  dashboardRef: any
  featuresRef?: any
}>()

const scrollToDashboard = () => {
  // 优先滚动到 Dashboard，如果没有则滚动到 Features
  if (props.dashboardRef?.value) {
    props.dashboardRef.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  } else if (props.featuresRef?.value) {
    props.featuresRef.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const scrollToFeatures = () => {
  if (props.featuresRef?.value) {
    props.featuresRef.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.hero-video-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  /* 严格限制在视口内 */
  max-height: 100vh;
  max-width: 100vw;
  min-height: 100vh;
  min-width: 100vw;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  /* 严格限制视频尺寸 */
  max-width: 100vw;
  max-height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.hero-content-card {
  position: relative;
  z-index: 3;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  max-width: 800px;
  margin: 0 20px;
  max-height: 100vh;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-button {
  background: white !important;
  color: #2563eb !important;
  border: none !important;
  font-weight: 600 !important;
  padding: 12px 32px !important;
  font-size: 1.1rem !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

.hero-button:hover {
  transform: scale(1.05) !important;
  transition: transform 0.2s ease !important;
}

.hero-scroll-button {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: white !important;
  font-size: 1.5rem !important;
  animation: bounce 2s infinite;
}

.hero-scroll-button:hover {
  transform: translateX(-50%) scale(1.1) !important;
  transition: transform 0.2s ease !important;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* 响应式设计 - 简化版本 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-button {
    padding: 10px 24px !important;
    font-size: 1rem !important;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
  
  .hero-content {
    padding: 0 0.75rem;
  }
  
  .hero-button {
    padding: 8px 20px !important;
    font-size: 0.9rem !important;
  }
  
  .hero-scroll-button {
    bottom: 1rem;
    font-size: 1.25rem !important;
  }
}

/* 横屏模式优化 */
@media (orientation: landscape) and (max-height: 600px) {
  .hero-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .hero-button {
    padding: 8px 20px !important;
    font-size: 0.9rem !important;
  }
  
  .hero-scroll-button {
    bottom: 1rem;
  }
}
</style>
