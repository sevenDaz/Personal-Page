<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = [
  {
    value: '个人简介',
    label: '个人价值在于参与生产',
    route: '/profile'
  },
  {
    value: '技术栈',
    label: '个人技能与其熟练度',
    route: '/skills'
  },
  {
    value: '个人荣誉',
    label: '学校中的"小打小闹"',
    route: '/honors'
  }
]

const handleCardClick = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="stat-cards" role="list" aria-label="个人数据概览">
    <article
      v-for="item in stats"
      :key="item.label"
      class="stat-card"
      role="listitem"
      @click="handleCardClick(item.route)"
      :aria-label="`跳转到${item.value}页面`"
      tabindex="0"
    >
      <p class="stat-card__value">{{ item.value }}</p>
      <hr class="stat-card__divider" aria-hidden="true" />
      <p class="stat-card__label">{{ item.label }}</p>
    </article>
  </div>
</template> 

<style scoped>
@import '../../styles/home/stat-cards.css';
</style>
