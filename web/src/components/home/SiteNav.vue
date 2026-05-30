<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="site-nav">
    <div class="site-nav__inner">
      <nav class="site-nav__links" aria-label="站内导航">
        <RouterLink
          class="site-nav__link"
          :class="{ 'site-nav__link--active': route.name === 'home' }"
          to="/"
        >
          首页
        </RouterLink>
        <RouterLink
          class="site-nav__link"
          :class="{ 'site-nav__link--active': route.name === 'profile' }"
          to="/profile"
        >
          个人简介
        </RouterLink>
        <RouterLink
          class="site-nav__link"
          :class="{ 'site-nav__link--active': route.name === 'skills' }"
          to="/skills"
        >
          技术栈
        </RouterLink>
        <RouterLink
          class="site-nav__link"
          :class="{ 'site-nav__link--active': route.name === 'honors' }"
          to="/honors"
        >
          个人荣誉
        </RouterLink>
        <RouterLink class="site-nav__router" to="/blog">个人博客</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem clamp(1rem, 4vw, 2.5rem) 1.25rem;
}

.site-nav__inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 32, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.site-nav__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
}

.site-nav__link,
.site-nav__router {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.site-nav__link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.site-nav__link--active {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.site-nav__router {
  margin-left: 0.25rem;
  border: 1px solid rgba(255, 245, 120, 0.35);
  background: linear-gradient(
    105deg,
    rgba(235, 200, 60, 0.25),
    rgba(120, 220, 160, 0.2)
  );
  color: #fff;
}

.site-nav__router:hover {
  background: linear-gradient(
    105deg,
    rgba(235, 200, 60, 0.4),
    rgba(120, 220, 160, 0.35)
  );
  filter: brightness(1.06);
}

@media (min-width: 640px) {
  .site-nav__links {
    gap: 0.5rem;
  }
}
</style>
