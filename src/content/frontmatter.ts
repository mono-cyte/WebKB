import y from 'js-yaml'

interface IFrontmatter {}

export interface INotes extends IFrontmatter {
  title: string
  aliased: string[]
  tags: string[]
  categories: string[]
}

export interface IMarkdown {
  fm: IFrontmatter
  cxt: string
}

const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/

export function parseAsNotes(content: string): IMarkdown {
  const match = content.match(frontMatterRegex) as RegExpMatchArray // 假如按照格式书写, 一定能匹配到

  const data = y.load(match[1] as string) as INotes
  const markdownContent = match[2] as string
  return { fm: data, cxt: markdownContent }
}
