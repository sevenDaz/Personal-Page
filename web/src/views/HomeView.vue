<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'
import ProfileSection from '../components/home/ProfileSection.vue'
import SiteNav from '../components/home/SiteNav.vue'
import StatCards from '../components/home/StatCards.vue'

const videoSrc = `${import.meta.env.BASE_URL}mp4/Fall_Ember.loop.mp4`
const shouldLoadVideo = ref(false)

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setTimeout(() => { shouldLoadVideo.value = true }, 250)
  }
})
</script>

<template>
  <div class="home">
    <div class="video-bg" aria-hidden="true">
      <video
        class="video-bg__media"
        v-if="shouldLoadVideo"
        :src="videoSrc"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      />
      <div class="video-bg__overlay" />
    </div>

    <SiteNav />

    <main class="home__content">
      <div id="home" class="home-panel">
        <div class="home-intro">
          <ProfileSection />
          <div class="home-intro__main">
            <HeroSection />
            <StatCards />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped src="../styles/pages/home.css"></style>
