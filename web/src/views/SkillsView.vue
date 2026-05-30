<script setup lang="ts">
import SkillsSection from '../components/home/SkillsSection.vue'
import SiteNav from '../components/home/SiteNav.vue'
import ExperienceCard from '../components/home/ExperienceCard.vue'
</script>

<template>
  <div class="home">
    <div class="background-container" aria-hidden="true">
      <div class="background-image" />
    </div>

    <SiteNav />

    <main class="home__content">
      <div class="skills-container">
        <div class="skills-column">
          <ExperienceCard />
        </div>
        <div class="skills-column">
          <SkillsSection />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped src="../styles/pages/home.css"></style>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/gif/dark_soul_skill.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.skills-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.skills-column {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
}
</style>
