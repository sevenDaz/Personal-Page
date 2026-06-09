<template>
  <div class="blog-post">
    <div class="blog-post-header">
      <div class="blog-post-meta">
        <span class="blog-category">{{ post.category }}</span>
        <span class="blog-date">{{ formatDate(post.date) }}</span>
      </div>
      <h1 class="blog-post-title">{{ post.title }}</h1>
      <div class="blog-post-tags">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="blog-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="blog-post-content" v-if="post.content">
      <MarkdownRenderer :content="post.content" />
    </div>
    <div class="blog-post-loading" v-else>
      <p>加载中...</p>
    </div>

    <div class="blog-post-footer">
      <div class="blog-post-actions">
        <button class="action-btn like-btn">
          <span class="icon">❤️</span>
          <span>{{ post.likes }}</span>
        </button>
        <button class="action-btn share-btn">
          <span class="icon">🔗</span>
          <span>分享</span>
        </button>
        <button class="action-btn comment-btn">
          <span class="icon">💬</span>
          <span>评论</span>
        </button>
      </div>

      <div class="blog-post-comments" v-if="showComments">
        <h3 class="comments-title">评论区</h3>
        <div class="comment-form">
          <textarea
            v-model="newComment"
            placeholder="写下你的想法..."
            rows="3"
          ></textarea>
          <button @click="submitComment" class="submit-btn">发布评论</button>
        </div>
        <div class="comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment-item"
          >
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.date) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 备案号 -->
    <div class="备案号">
      <a href="https://beian.miit.gov.cn/" target="_blank" class="备案号-link">
        黔ICP备2021010099号-3
      </a>
    </div>
  </div>
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
  likes: number
}

interface Comment {
  id: string
  author: string
  content: string
  date: string
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
  content: '',
  likes: 0
})

onMounted(async () => {
  try {
    // 1. 从索引文件获取文章元信息
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
        content: '抱歉，您请求的文章不存在。',
        likes: 0
      }
      return
    }

    // 2. 填充元信息
    post.value = { ...postMeta, content: '', likes: 0 }

    // 3. 加载 markdown 文件内容
    const filePath = postMeta.file.split('/').map(encodeURIComponent).join('/')
    const contentRes = await fetch(`${baseUrl}markdown/${filePath}`)
    if (contentRes.ok) {
      let text = await contentRes.text()
      // 去掉 frontmatter
      text = text.replace(/^---[\s\S]*?---\s*/, '')
      post.value.content = text
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    post.value.content = '加载文章时出错，请稍后重试。'
  }
})

const showComments = ref(true)
const newComment = ref('')
const comments = ref<Comment[]>([
  {
    id: '1',
    author: '张三',
    content: '写得很好，很有帮助！',
    date: '2024-01-16'
  },
  {
    id: '2',
    author: '李四',
    content: '期待更多这样的文章！',
    date: '2024-01-15'
  }
])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.unshift({
      id: Date.now().toString(),
      author: '访客',
      content: newComment.value,
      date: new Date().toISOString()
    })
    newComment.value = ''
  }
}
</script>

<style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.blog-post-meta {
  display: flex;
  gap: 1rem;
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

.blog-post-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.blog-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.blog-tag {
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.blog-post-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
}

.blog-post-loading {
  text-align: center;
  padding: 2rem;
  color: #888;
}

.blog-post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.blog-post-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #f5f5f5;
}

.action-btn.like-btn {
  color: #ef4444;
}

.action-btn.like-btn:hover {
  background: #fef2f2;
}

.action-btn.share-btn {
  color: #3b82f6;
}

.action-btn.share-btn:hover {
  background: #eff6ff;
}

.action-btn.comment-btn {
  color: #10b981;
}

.action-btn.comment-btn:hover {
  background: #ecfdf5;
}

.blog-post-comments {
  margin-top: 2rem;
}

.comments-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-form textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #2563eb;
}

.comments-list {
  margin-top: 1.5rem;
}

.comment-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-content {
  line-height: 1.6;
  color: #333;
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

@media (max-width: 768px) {
  .blog-post {
    padding: 1rem;
  }

  .blog-post-title {
    font-size: 1.75rem;
  }
}
</style>
