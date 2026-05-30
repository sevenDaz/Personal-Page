<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="blog">
    <header class="blog__header">
      <RouterLink class="blog__back" to="/">← 返回主页</RouterLink>
      <h1 class="blog__title">个人博客</h1>
      <p class="blog__intro">骨架页面：稍后在此接入文章列表与详情路由。</p>
    </header>
    <main class="blog__main">
      <article class="blog__card">
        <h2>占位文章标题</h2>
        <p>这是一篇示例卡片。你可以在 <code>BlogView.vue</code> 中替换为真实列表或 Markdown 渲染。</p>
      </article>
      <article class="blog__card">
        <h2>占位文章标题（二）</h2>
        <p>可考虑增加 <code>/blog/:slug</code> 路由以展示文章详情。</p>
      </article>
    </main>
  </div>
</template>

<style scoped src="../styles/pages/blog.css"></style>
