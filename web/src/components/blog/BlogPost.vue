<template>
  <article class="blog-post">
    <!-- 加载状态 -->
    <div v-if="!post.content" class="blog-post-loading">
      <div class="loading-line long"></div>
      <div class="loading-line medium"></div>
      <div class="loading-line short"></div>
    </div>

    <template v-else>
      <!-- 文章元信息 -->
      <div class="blog-post-meta">
        <span class="blog-post-category">{{ post.category }}</span>
        <span class="blog-post-dot">·</span>
        <span class="blog-post-date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- 文章标题 -->
      <h1 class="blog-post-title">{{ post.title }}</h1>

      <!-- 标签 -->
      <div class="blog-post-tags" v-if="post.tags.length">
        <span v-for="tag in post.tags" :key="tag" class="blog-post-tag">{{ tag }}</span>
      </div>

      <!-- 文章内容 -->
      <div class="blog-post-body">
        <MarkdownRenderer :content="post.content" />
      </div>

      <!-- 底部返回 -->
      <footer class="blog-post-footer">
        <router-link to="/blog" class="blog-post-back">
          ← 返回博客列表
        </router-link>
      </footer>
    </template>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownRenderer from './MarkdownRenderer.vue'
import { useRoute } from 'vue-router'

interface PostMeta {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  file: string
}

interface PostData extends PostMeta {
  content: string
}

const route = useRoute()
const postId = route.params.id as string
const baseUrl = import.meta.env.BASE_URL

const post = ref<PostData>({
  id: '',
  title: '',
  excerpt: '',
  date: '',
  category: '',
  tags: [],
  file: '',
  content: ''
})

onMounted(async () => {
  try {
    const indexRes = await fetch(`${baseUrl}markdown/posts.json`)
    if (!indexRes.ok) throw new Error('加载文章索引失败')
    const posts: PostMeta[] = await indexRes.json()

    const postMeta = posts.find(p => p.id === postId)
    if (!postMeta) {
      post.value = {
        id: '',
        title: '文章不存在',
        excerpt: '',
        date: '',
        category: '',
        tags: [],
        file: '',
        content: '抱歉，您请求的文章不存在。'
      }
      return
    }

    post.value = { ...postMeta, content: '' }

    const filePath = postMeta.file.split('/').map(encodeURIComponent).join('/')
    const contentRes = await fetch(`${baseUrl}markdown/${filePath}`)
    if (contentRes.ok) {
      let text = await contentRes.text()
      text = text.replace(/^---[\s\S]*?---\s*/, '')
      post.value.content = text
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    post.value.content = '加载文章时出错，请稍后重试。'
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-post {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
}

/* 加载骨架屏 */
.blog-post-loading {
  padding: 2rem 0;
}

.loading-line {
  height: 16px;
  border-radius: 4px;
  background: #eae9e6;
  margin-bottom: 1rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-line.long { width: 70%; }
.loading-line.medium { width: 50%; }
.loading-line.short { width: 30%; }

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* 元信息 */
.blog-post-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: #a0a09c;
  margin-bottom: 0.6rem;
}

.blog-post-dot {
  color: #ccc;
}

.blog-post-category {
  background: #efeee9;
  color: #7a7975;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.blog-post-date {
  color: #a0a09c;
}

/* 标题 */
.blog-post-title {
  font-size: 2rem;
  font-weight: 700;
  color: #3a3a3a;
  line-height: 1.35;
  margin: 0.5rem 0 1rem;
  letter-spacing: -0.01em;
}

/* 标签 */
.blog-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eae9e6;
}

.blog-post-tag {
  font-size: 0.75rem;
  color: #8a8885;
  background: #f5f4f1;
  border: 1px solid #eae9e6;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.blog-post-tag:hover {
  border-color: #ccc;
}

/* 内容区 */
.blog-post-body {
  margin-bottom: 3rem;
}

/* 底部 */
.blog-post-footer {
  padding-top: 1.5rem;
  border-top: 1px solid #eae9e6;
}

.blog-post-back {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  color: #a0a09c;
  text-decoration: none;
  transition: color 0.2s;
}

.blog-post-back:hover {
  color: #5a8ab5;
}

@media (max-width: 768px) {
  .blog-post {
    padding: 2rem 1rem 1.5rem;
  }

  .blog-post-title {
    font-size: 1.6rem;
  }
}
</style>
