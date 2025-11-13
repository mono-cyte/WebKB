import MDPage from '../components/MDPage.vue'

const markdownFiles = import.meta.glob(['../content/**/*.md'], {
  eager: false,
  as: 'raw',
})

function genMarkdownRoutes(src: string = 'content', dst: string = '/') {
  return Object.keys(markdownFiles).map((path) => {
    // 将文件路径转换为路由路径
    // 期望: content/**/*.md -> /**/*.md

    // 基本路由路径转换
    const route = path.replace(`../${src}`, `${dst}`).replace('.md', '')
    const encoded_route = encodeURI(route)

    // 可额外配置路由逻辑

    return {
      path: route,
      alias: [
        route,
        `${route}.md`, // 防止使用 .md 访问url
        encoded_route, // 非 ascii 路径支持
        `${encoded_route}.md`,
      ],
      name: `markdown-${path}`,
      component: MDPage,

      meta: {
        // 路由 meta 参数, 组件 meta.* 可获取
        markdown_src: path,
      },
    }
  })
}

export const routes = [...genMarkdownRoutes()]
