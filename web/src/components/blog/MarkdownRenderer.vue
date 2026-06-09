<template>
  <div class="markdown-content">
    <div v-html="renderedContent" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const props = defineProps<{
  content: string
}>()

const renderedContent = ref('')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用外部 highlight.js
  }
})

onMounted(() => {
  renderedContent.value = md.render(props.content)
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.markdown-content h1 { font-size: 2.5rem; }
.markdown-content h2 { font-size: 2rem; }
.markdown-content h3 { font-size: 1.75rem; }
.markdown-content h4 { font-size: 1.5rem; }
.markdown-content h5 { font-size: 1.25rem; }
.markdown-content h6 { font-size: 1rem; }

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-content a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.markdown-content blockquote {
  margin: 1.5em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #e5e7eb;
  background-color: #f9fafb;
  color: #6b7280;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: #f3f4f6;
  border-radius: 3px;
}

.markdown-content pre {
  padding: 1rem;
  overflow: auto;
  background-color: #1f2937;
  border-radius: 0.5rem;
}

.markdown-content pre code {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.markdown-content th,
.markdown-content td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.markdown-content th {
  background-color: #f9fafb;
  font-weight: 600;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.markdown-content hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  margin: 2rem 0;
}
</style>