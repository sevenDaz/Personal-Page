<template>
  <div class="blog-list">
    <div class="blog-header">
      <h1 class="blog-title">博客文章</h1>
      <div class="blog-filters">
        <button
          v-for="category in categories"
          :key="category"
          :class="['filter-btn', { active: currentCategory === category }]"
          @click="setCurrentCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="blog-grid">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="blog-card"
        @click="goToPost(post.id)"
      >
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-category">{{ post.category }}</span>
            <span class="blog-date">{{ formatDate(post.date) }}</span>
          </div>
          <h2 class="blog-card-title">{{ post.title }}</h2>
          <p class="blog-card-excerpt">{{ post.excerpt }}</p>
          <div class="blog-card-tags">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="blog-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="blog-pagination" v-if="totalPages > 1">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="['page-btn', { active: currentPage === page }]"
        @click="setCurrentPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  file: string
}

const router = useRouter()

const posts = ref<BlogPost[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/markdown/posts.json')
    if (response.ok) {
      posts.value = await response.json()
    }
  } catch (error) {
    console.error('加载文章列表失败:', error)
  } finally {
    loading.value = false
  }
})

const currentCategory = ref('全部')
const currentPage = ref(1)
const postsPerPage = 6

const categories = computed(() => {
  const cats = new Set(posts.value.map(post => post.category))
  return ['全部', ...cats]
})

const filteredPosts = computed(() => {
  if (!posts.value) return []

  let filtered = [...posts.value]

  if (currentCategory.value !== '全部') {
    filtered = filtered.filter(post => post.category === currentCategory.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

const setCurrentCategory = (category: string) => {
  currentCategory.value = category
  currentPage.value = 1
}

const setCurrentPage = (page: number) => {
  currentPage.value = page
}

const goToPost = (postId: string) => {
  router.push(`/blog/${postId}`)
}

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
.blog-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  margin-bottom: 2rem;
  text-align: center;
}

.blog-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.blog-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.filter-btn:hover {
  background: #f5f5f5;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.blog-card-content {
  padding: 1.5rem;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.blog-category {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.blog-date {
  color: #888;
}

.blog-card-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
}

.blog-card-excerpt {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-tag {
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.blog-pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.page-btn:hover {
  background: #f5f5f5;
}

.page-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

@media (max-width: 768px) {
  .blog-list {
    padding: 1rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
