// 若不存在对应md文件, 原则上路由不会访问到此, 因此不需要在此处理
<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { type INotes, type IMarkdown, parseAsNotes } from '../content/frontmatter.ts'

import MarkdownIt from 'markdown-it'
import mathjax3 from 'markdown-it-mathjax3'
import mermaid from 'mermaid-it-markdown'

const route = useRoute()
const src: string = route.meta.markdown_src as string

// lazy 加载 markdown
const modules = import.meta.glob('../content/**/*.md', { as: 'raw' })

const md = new MarkdownIt().use(mathjax3).use(mermaid)
const htmlContent = ref('')

// 自定义frontmatter接口, 必须自己清楚对应结构
const frontMatter: Ref<INotes> = ref({
  title: '',
  aliased: [],
  tags: [],
  categories: []
})


onMounted(async () => {


  const moduleLoader = modules[src]
  if (!moduleLoader) {
    throw new Error('Failed to load markdown file')
  }

  const raw_markdown = await moduleLoader()
  const prased_markdown: IMarkdown = parseAsNotes(raw_markdown)

  frontMatter.value = prased_markdown.fm as INotes
  htmlContent.value = md.render(prased_markdown.cxt)

})
</script>

<template>
  <div v-html="htmlContent"></div>
</template>


<style scoped>
.markdown-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
}

.error h1 {
  font-size: 72px;
  margin: 0;
  color: #999;
}

.page-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.meta {
  color: #666;
  font-size: 0.9em;
  margin: 10px 0;
}

.tags {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 0.85em;
  color: #333;
}

/* Markdown 样式 */
.markdown-body {
  line-height: 1.6;
  color: #333;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.markdown-body :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.markdown-body :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.markdown-body :deep(pre) {
  background: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-body :deep(code) {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  color: #666;
  margin: 16px 0;
}

.markdown-body :deep(a) {
  color: #0969da;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 2em;
}

.markdown-body :deep(li) {
  margin: 0.5em 0;
}
</style>
