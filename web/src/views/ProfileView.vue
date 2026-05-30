<script setup lang="ts">
import SiteNav from '../components/home/SiteNav.vue'
import AboutCard from '../components/home/AboutCard.vue'
import ExperienceCard from '../components/home/ExperienceCard.vue'
import TagsCard from '../components/home/PersonalCard.vue'
import HobbiesCard from '../components/home/HobbiesCard.vue'

const videoSrc = 'mp4/saber_profile.mp4'
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
      <div class="profile-panel">
        <div class="profile-grid">
          <div class="profile-left">
            <AboutCard />
          </div>
          <div class="profile-right">
            <TagsCard />
            <HobbiesCard />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped src="../styles/pages/home.css"></style>

<style scoped>
.profile-panel {
  min-height: 100vh;
  padding: clamp(1.5rem, 6vh, 3rem) 0;
}

.profile-grid {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: clamp(3rem, 5vh, 4rem);
  align-items: start;
}

.profile-left {
  position: sticky;
  /* top: clamp(4rem, 12vh, 6rem); */
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
}

.profile-right {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
  flex-grow: 1;
}

/* Override the hidden scrollbar for profile-right */
.profile-right::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.profile-right::-webkit-scrollbar-track {
  background: transparent;
}

.profile-right::-webkit-scrollbar-thumb {
  background: transparent;
}

.profile-right::-webkit-scrollbar-thumb:hover {
  background: transparent;
}

@media (max-width: 1200px) {
  .profile-grid {
    grid-template-columns: 1fr;
    max-width: 90rem;
  }

  .profile-left {
    position: relative;
    height: auto;
    max-height: none;
  }

  .profile-right {
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .profile-panel {
    padding: clamp(2rem, 8vh, 4rem) 0;
  }

  .profile-grid {
    gap: 2rem;
    max-width: 100%;
  }

  .profile-right {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .profile-panel {
    padding: 1.5rem 0;
  }
}
</style>
