<script setup lang="ts">
import SiteNav from '../components/home/SiteNav.vue'
import BlogList from '../components/blog/BlogList.vue'
</script>

<template>
  <div class="blog-page">
    <SiteNav />

    <main class="blog-content">
      <div class="blog-container">
        <BlogList />
      </div>
    </main>
  </div>
  <!-- 备案号 -->
  <div class="备案号">
  <a href="https://beian.miit.gov.cn/" target="_blank" class="备案号-link">
    黔ICP备2021010099号-3
  </a>
</div>
</template>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.blog-content {
  padding: 2rem 0;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 备案号样式 */
.备案号 {
  margin-top: 3rem;
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.85rem;
}

.备案号-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.备案号-link:hover {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
