import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    const frontmatter = fileData.frontmatter

    const researchFields = [
      'title', 'authors', 'year', 'citekey', 'design', 'units', 'samplesize',
      'countries', 'theories', 'analyses', 'scales', 'hypotheses',
      'keyfindings', 'quality', 'focus', 'tags'
    ]
    
    const getPropertyType = (key: string, value: any): string => {
      if (key === 'tags') return 'tags'
      if (key === 'year' || key === 'samplesize') return 'number'
      if (Array.isArray(value)) return 'list'
      if (typeof value === 'number') return 'number'
      return 'text'
    }

    const formatValue = (key: string, value: any): JSX.Element | string => {
      if (key === 'tags') {
        if (!value || (Array.isArray(value) && value.length === 0)) return 'Empty'
        const tags = Array.isArray(value) ? value : [value]
        return (
          <div class="property-tags-list">
            {tags.map(tag => (
              <a href={`/tags/${tag}`} class="tag-link">#{tag}</a>
            ))}
          </div>
        )
      }
      if (Array.isArray(value)) {
        const filtered = value.filter(v => v)
        if (filtered.length === 0) return 'Empty'
        return (
          <ul class="property-list">
            {filtered.map(item => <li dangerouslySetInnerHTML={{ __html: String(item) }}/>)}
          </ul>
        )
      }
      if (value === '' || value === null || value === undefined) return 'Empty'
      return String(value)
    }

    const displayProps = frontmatter ? researchFields
      .filter(key => key in frontmatter || key === 'tags')
      .map(key => ({
        key,
        value: frontmatter[key],
        type: getPropertyType(key, frontmatter[key]),
        formatted: formatValue(key, frontmatter[key])
      })) : []

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }

      if (options.showReadingTime) {
        const { minutes } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <>
          <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
            {segments}
          </p>
          {displayProps.length > 0 && (
            <details class="properties-section">
              <summary>Properties</summary>
              <div class="research-metadata">
                {displayProps.map(({ key, type, formatted }) => (
                  <div class="metadata-property">
                    <dt>
                      <span class={`property-icon property-${type}`}></span>
                      {key}
                    </dt>
                    <dd>{formatted}</dd>
                  </div>
                ))}
              </div>
            </details>
          )}
        </>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor