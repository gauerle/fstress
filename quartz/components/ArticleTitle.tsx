import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  let title = fileData.slug === "index" && fileData.frontmatter?.title
    ? fileData.frontmatter.title
    : fileData.slug?.split('/').pop() || fileData.slug
  
  // Convert hyphens back to spaces for display
  if (title && fileData.slug !== "index") {
    title = title.replace(/-/g, ' ')
  }
  
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
