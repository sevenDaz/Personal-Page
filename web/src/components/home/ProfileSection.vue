<script setup lang="ts">
import { RouterLink } from 'vue-router'

const profileRows = [
  { label: '毕业院校', value: '中南民族大学' },
  { label: '所在城市', value: '湖北 武汉' },
  { label: '年级', value: '24届毕业生' },
]
</script>

<template>
  <aside class="profile-card" aria-labelledby="profile-title">
    <img class="profile-card__avatar" src="/images/avater.jpg" alt="头像" />

    <h2 id="profile-title" class="profile-card__name">LyflatW</h2>
    <p class="profile-card__tagline">一个傻逼，刚开始准备练级</p>

    <hr class="profile-card__divider" />

    <nav class="profile-card__social" aria-label="社交链接">
      <a href="#" class="profile-card__social-link" aria-label="GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      </a>
      <a href="#" class="profile-card__social-link" aria-label="邮箱">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
          />
        </svg>
      </a>
      <a href="#" class="profile-card__social-link" aria-label="微信">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.5 3C4.91 3 2 5.46 2 8.5c0 1.77.92 3.33 2.36 4.38L3.5 15l2.47-.82A7.4 7.4 0 0 0 8.5 14c3.59 0 6.5-2.46 6.5-5.5S12.09 3 8.5 3Zm-2 4.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm7.5 2.5c-3.04 0-5.5 2.1-5.5 4.69 0 1.46.78 2.77 2 3.66L15 19l1.66-1.1c.55.15 1.13.23 1.74.23 3.04 0 5.5-2.1 5.5-4.69S19.54 10 14.5 10Zm-2.5 3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75Zm5 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75Z"
          />
        </svg>
      </a>
    </nav>

    <hr class="profile-card__divider" />

    <dl class="profile-card__details">
      <div v-for="row in profileRows" :key="row.label" class="profile-card__detail-row">
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </div>
    </dl>

    <hr class="profile-card__divider" />

    <RouterLink class="profile-card__contact" to="/skills">
      联系我
    </RouterLink>
  </aside>
</template>

<style scoped>
@import '../../styles/home/profile-section.css';
</style>
