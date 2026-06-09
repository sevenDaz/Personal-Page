<template>
  <div class="markdown-content" v-html="renderedContent" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const props = defineProps<{
  content: string
}>()

const renderedContent = ref('')

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    const langLabel = lang && hljs.getLanguage(lang)
      ? `<div class="code-header"><span class="code-lang">${lang}</span></div><code class="hljs">${hljs.highlight(str, { language: lang }).value}</code>`
      : `<code>${md.utils.escapeHtml(str)}</code>`
    // 返回不带 <pre> 的内容，markdown-it 会自动包裹 <pre>
    return langLabel
  }
})

const render = () => {
  renderedContent.value = md.render(props.content)
}

onMounted(render)

watch(() => props.content, render)
</script>

<style>
/* ===== Notion 柔和风格 Markdown 样式 ===== */
/* 注意：不使用 scoped，因为 v-html 内容不受 scoped 影响 */

.markdown-content {
  font-size: 1rem;
  line-height: 1.75;
  color: #4a4a4a;
  word-break: break-word;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', sans-serif;
}

/* --- 标题 --- */
.markdown-content h1 {
  display: none; /* 文章标题已在 BlogPost 中渲染 */
}

.markdown-content h2 {
  font-size: 1.375rem;
  font-weight: 600;
  color: #444;
  margin-top: 2.25rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid #eae9e6;
}

.markdown-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
  margin-top: 1.75rem;
  margin-bottom: 0.4rem;
}

.markdown-content h4 {
  font-size: 1.05rem;
  font-weight: 600;
  color: #444;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
}

.markdown-content h5,
.markdown-content h6 {
  font-size: 1rem;
  font-weight: 600;
  color: #787774;
  margin-top: 1.25rem;
  margin-bottom: 0.25rem;
}

/* --- 段落 --- */
.markdown-content p {
  margin: 0.6rem 0;
}

/* --- 链接 --- */
.markdown-content a {
  color: #5a8ab5;
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-content a:hover {
  color: #3d7aaa;
  text-decoration: underline;
}

/* --- 行内代码 --- */
.markdown-content code {
  font-family: 'SFMono-Regular', 'Menlo', 'Consolas', monospace;
  font-size: 0.875em;
  padding: 0.15em 0.4em;
  background: #f0efec;
  border-radius: 4px;
  color: #c0564f;
}

/* --- 代码块容器 --- */
.markdown-content pre {
  margin: 0.85rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #faf9f7;
  border: 1px solid #eae9e6;
}

/* 代码块内 code（覆盖行内 code 样式） */
.markdown-content pre code {
  display: block;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #4a4a4a;
  font-size: 0.85rem;
  line-height: 1.65;
  overflow-x: auto;
}

/* 高亮代码块（有语言标注的） */
.markdown-content pre .hljs {
  background: #282c34;
  color: #abb2bf;
}

/* 代码块语言标签头 */
.markdown-content .code-header {
  display: flex;
  align-items: center;
  padding: 0.35rem 1rem;
  background: #edece9;
  border-bottom: 1px solid #eae9e6;
}

.markdown-content .hljs + .code-header,
.markdown-content .code-header:has(+ code.hljs) {
  background: #21252b;
  border-color: #333842;
}

.markdown-content pre:has(code.hljs) .code-header {
  background: #21252b;
  border-color: #333842;
}

.markdown-content .code-lang {
  font-family: 'SFMono-Regular', 'Menlo', 'Consolas', monospace;
  font-size: 0.7rem;
  color: #9e9d99;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.markdown-content pre:has(code.hljs) .code-lang {
  color: #636d83;
}

/* --- 引用块 --- */
.markdown-content blockquote {
  margin: 0.85rem 0;
  padding: 0.5rem 1rem;
  border-left: 3px solid #b8c4ce;
  background: #faf9f7;
  color: #6b6b67;
  border-radius: 0 6px 6px 0;
}

.markdown-content blockquote p {
  margin: 0.3rem 0;
}

/* --- 列表 --- */
.markdown-content ul,
.markdown-content ol {
  padding-left: 1.5rem;
  margin: 0.6rem 0;
}

.markdown-content li {
  margin-bottom: 0.3rem;
  line-height: 1.7;
}

.markdown-content li > ul,
.markdown-content li > ol {
  margin: 0.2rem 0;
}

/* --- 表格 --- */
.markdown-content table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0.85rem 0;
  border: 1px solid #eae9e6;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content th {
  background: #f5f4f1;
  font-weight: 600;
  color: #444;
  text-align: left;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid #eae9e6;
}

.markdown-content td {
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid #eae9e6;
}

.markdown-content tr:last-child td {
  border-bottom: none;
}

.markdown-content tr:nth-child(even) td {
  background: #fcfbf9;
}

/* --- 图片 --- */
.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 0.85rem 0;
}

/* --- 分割线 --- */
.markdown-content hr {
  border: none;
  height: 1px;
  background: #eae9e6;
  margin: 2rem 0;
}

/* --- 加粗/斜体 --- */
.markdown-content strong {
  font-weight: 600;
  color: #3a3a3a;
}

.markdown-content em {
  font-style: italic;
  color: #5a5a5a;
}

/* --- 删除线 --- */
.markdown-content del {
  color: #9e9d99;
}
</style>
