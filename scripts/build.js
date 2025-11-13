import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const md = new MarkdownIt()

// 扫描所有 markdown 文件
async function generateRoutes() {
  const contentDir = path.join(__dirname, '../src/content')
  const files = await glob('**/*.md', { cwd: contentDir })

  const routes = {}

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    // 解析 frontmatter 和内容
    const { data: frontmatter, content: markdownContent } = matter(content)

    // 转换为 HTML
    const html = md.render(markdownContent)

    // 生成路由路径
    const route = '/' + file.replace(/\.md$/, '').replace(/\/index$/, '')

    routes[route] = {
      html,
      frontmatter,
      path: route,
    }
  }

  return routes
}

// 生成静态 HTML 文件
async function build() {
  const routes = await generateRoutes()
  const distDir = path.join(__dirname, '../dist')

  // 确保 dist 目录存在
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  // 生成 routes.json 供客户端使用
  fs.writeFileSync(path.join(distDir, 'routes.json'), JSON.stringify(routes, null, 2))

  // 为每个路由生成 HTML 文件
  for (const [route, data] of Object.entries(routes)) {
    const routePath = route === '/' ? '/index' : route
    const htmlPath = path.join(distDir, routePath + '.html')

    // 确保目录存在
    const dir = path.dirname(htmlPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // 生成完整的 HTML
    const html = generateHTML(data)
    fs.writeFileSync(htmlPath, html)
  }

  console.log('✅ SSG build completed!')
  console.log(`Generated ${Object.keys(routes).length} pages`)
}

function generateHTML(data) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.frontmatter.title || 'My SSG Site'}</title>
  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <nav>
    <a href="/">首页</a> |
    <a href="/about">关于</a>
  </nav>
  <main>
    ${data.html}
  </main>
</body>
</html>`
}

build().catch(console.error)
