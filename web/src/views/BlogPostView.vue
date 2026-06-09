<template>
  <div class="blog-post-page">
    <SiteNav />

    <main class="blog-content">
      <div class="blog-container">
        <BlogPost />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '../components/home/SiteNav.vue'
import BlogPost from '../components/blog/BlogPost.vue'
</script>

<style scoped>
.blog-post-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.blog-content {
  padding: 2rem 0;
}

.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>