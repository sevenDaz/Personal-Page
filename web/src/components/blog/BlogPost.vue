<template>
  <div class="blog-post">
    <div class="blog-post-header">
      <div class="blog-post-meta">
        <span class="blog-category">{{ post.category }}</span>
        <span class="blog-date">{{ formatDate(post.date) }}</span>
        <span class="blog-views">阅读量: {{ post.views }}</span>
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

    <div class="blog-post-content">
      <MarkdownRenderer :content="post.content" />
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
import { ref, computed, onMounted } from 'vue'
import MarkdownRenderer from './MarkdownRenderer.vue'
import { useRoute } from 'vue-router'

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  category: '技术' | '生活'
  tags: string[]
  views: number
  likes: number
  excerpt?: string
}

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

const route = useRoute()
const postId = route.params.id as string

// 辅助函数：解析 frontmatter
const parseFrontmatter = (content: string) => {
  const match = content.match(/^---[\s\S]*?---/)
  if (!match) return {}

  const frontmatterContent = match[0].replace(/^---\s*/, '').replace(/\s*---$/, '')
  const lines = frontmatterContent.split('\n')
  const result: any = {}

  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      try {
        result[key.trim()] = JSON.parse(value)
      } catch {
        result[key.trim()] = value
      }
    }
  })

  return result
}

// 辅助函数：从文件加载内容
const fetchFileContent = async (filePath: string) => {
  try {
    const response = await fetch(filePath)
    if (!response.ok) throw new Error('文件加载失败')
    return await response.text()
  } catch (error) {
    console.error('加载文件失败:', error)
    return ''
  }
}

// 从文件系统加载文章内容
const loadPostContent = async (postId: string) => {
  try {
    const posts = await loadPosts()
    const post = posts.find(p => p.id === postId)
    if (!post) return null

    const categoryPath = `public/markdown/${post.category}`
    const content = await fetchFileContent(`${categoryPath}/${postId}.md`)

    // 解析 frontmatter
    const frontmatter = parseFrontmatter(content)
    const bodyContent = content.replace(/^---[\s\S]*?---/, '')

    return {
      ...post,
      content: bodyContent,
      title: frontmatter.title || post.title,
      date: frontmatter.date || post.date,
      tags: frontmatter.tags || post.tags,
      views: post.views,
      likes: post.likes
    }
  } catch (error) {
    console.error('加载文章内容失败:', error)
    return null
  }
}

// 从文件系统加载文章列表
const loadPosts = async () => {
  const postsData: BlogPost[] = []

  try {
    // 获取所有分类
    const categories = ['技术', '生活']

    for (const category of categories) {
      // 读取分类文件夹
      const categoryPath = `public/markdown/${category}`
      const files = await fetchFiles(categoryPath)

      for (const file of files) {
        const content = await fetchFileContent(categoryPath + '/' + file)

        // 解析 frontmatter
        const frontmatter = parseFrontmatter(content)
        const bodyContent = content.replace(/^---[\s\S]*?---/, '')

        postsData.push({
          id: file.replace('.md', ''),
          title: frontmatter.title || extractTitle(bodyContent),
          excerpt: frontmatter.excerpt || extractExcerpt(bodyContent),
          content: bodyContent,
          date: frontmatter.date || extractDate(bodyContent) || '2024-01-01',
          category: frontmatter.category || category,
          tags: frontmatter.tags || extractTags(bodyContent) || [],
          views: 0,
          likes: 0
        })
      }
    }

    return postsData
  } catch (error) {
    console.error('加载文章失败:', error)
    return []
  }
}

// 辅助函数：提取标题
const extractTitle = (content: string) => {
  const match = content.match(/^# (.+)/m)
  return match ? match[1] : '无标题'
}

// 辅助函数：提取摘要
const extractExcerpt = (content: string) => {
  const lines = content.split('\n')
  let excerpt = ''
  let inContent = false

  for (const line of lines) {
    if (line.startsWith('# ')) continue // 跳过标题
    if (line.trim() === '') continue // 跳过空行

    if (!inContent) {
      excerpt = line.trim()
      inContent = true
      break
    }
  }

  return excerpt || '暂无摘要'
}

// 辅助函数：提取日期
const extractDate = (content: string) => {
  const datePatterns = [
    /(\d{4}-\d{2}-\d{2})/, // YYYY-MM-DD
    /(\d{4}年\d{1,2}月\d{1,2}日)/, // 中文日期
    /(\d{1,2}\/\d{1,2}\/\d{4})/ // MM/DD/YYYY
  ]

  for (const pattern of datePatterns) {
    const match = content.match(pattern)
    if (match) return match[1]
  }

  return null
}

// 辅助函数：提取标签
const extractTags = (content: string) => {
  const tagPattern = /tags:\s*\[([^\]]+)\]/
  const match = content.match(tagPattern)
  if (match) {
    return match[0].split(',').map(tag => tag.trim().replace(/['"]/g, ''))
  }
  return []
}

// 辅助函数：获取文件列表
const fetchFiles = async (directory: string) => {
  try {
    const response = await fetch(`${directory}/`)
    const text = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const links = doc.querySelectorAll('a')

    const files: string[] = []
    links.forEach(link => {
      const href = link.getAttribute('href')
      if (href && href.endsWith('.md')) {
        files.push(href)
      }
    })

    return files
  } catch (error) {
    console.error('获取文件列表失败:', error)
    return []
  }
}

// 初始化文章数据
const posts = ref<BlogPost[]>([])
const post = ref<BlogPost>({
  id: '',
  title: '文章不存在',
  content: '抱歉，您请求的文章不存在。',
  date: '',
  category: '技术',
  tags: [],
  views: 0,
  likes: 0,
  excerpt: ''
})

// 加载文章数据
onMounted(async () => {
  try {
    // 加载文章列表
    posts.value = await loadPosts()

    // 加载当前文章内容
    const fullPost = await loadPostContent(postId)
    if (fullPost) {
      post.value = fullPost
    }
  } catch (error) {
    console.error('加载文章数据失败:', error)
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

.blog-views {
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