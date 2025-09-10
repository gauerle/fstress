import FlexSearch from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, normalizeRelativeURLs, resolveRelative } from "../../util/path"

interface Item {
  id: number
  slug: FullSlug
  title: string
  content: string
  tags: string[]
}

type SearchType = "basic" | "tags"
let searchType: SearchType = "basic"
let currentSearchTerm: string = ""
const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
let index = new FlexSearch.Document<Item>({
  charset: "latin:extra",
  encode: encoder,
  document: {
    id: "id",
    tag: "tags",
    index: [
      {
        field: "title",
        tokenize: "forward",
      },
      {
        field: "content",
        tokenize: "forward",
      },
      {
        field: "tags",
        tokenize: "forward",
      },
    ],
  },
})

const p = new DOMParser()
const fetchContentCache: Map<FullSlug, Element[]> = new Map()
const contextWindowWords = 30
const numSearchResults = 8
const numTagResults = 5

const tokenizeTerm = (term: string) => {
  const tokens = term.split(/\s+/).filter((t) => t.trim() !== "")
  const tokenLen = tokens.length
  if (tokenLen > 1) {
    for (let i = 1; i < tokenLen; i++) {
      tokens.push(tokens.slice(0, i + 1).join(" "))
    }
  }
  return tokens.sort((a, b) => b.length - a.length)
}

function highlight(searchTerm: string, text: string, trim?: boolean) {
  const tokenizedTerms = tokenizeTerm(searchTerm)
  let tokenizedText = text.split(/\s+/).filter((t) => t !== "")

  let startIndex = 0
  let endIndex = tokenizedText.length - 1
  if (trim) {
    const includesCheck = (tok: string) =>
      tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()))
    const occurrencesIndices = tokenizedText.map(includesCheck)

    let bestSum = 0
    let bestIndex = 0
    for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
      const window = occurrencesIndices.slice(i, i + contextWindowWords)
      const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0)
      if (windowSum >= bestSum) {
        bestSum = windowSum
        bestIndex = i
      }
    }

    startIndex = Math.max(bestIndex - contextWindowWords, 0)
    endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1)
    tokenizedText = tokenizedText.slice(startIndex, endIndex)
  }

  const slice = tokenizedText
    .map((tok) => {
      for (const searchTok of tokenizedTerms) {
        if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
          const regex = new RegExp(searchTok.toLowerCase(), "gi")
          return tok.replace(regex, `<span class="highlight">$&</span>`)
        }
      }
      return tok
    })
    .join(" ")

  return `${startIndex === 0 ? "" : "..."}${slice}${
    endIndex === tokenizedText.length - 1 ? "" : "..."
  }`
}

function highlightTags(term: string, tags: string[]) {
  if (!tags || searchType !== "tags") {
    return []
  }

  return tags
    .map((tag) => {
      if (tag.toLowerCase().includes(term.toLowerCase())) {
        return `<li><p class="match-tag">#${tag}</p></li>`
      } else {
        return `<li><p>#${tag}</p></li>`
      }
    })
    .slice(0, numTagResults)
}

async function setupInlineSearch(container: Element, currentSlug: FullSlug, data: ContentIndex) {
  const searchBar = container.querySelector(".search-bar-inline") as HTMLInputElement
  const resultsContainer = container.querySelector(".search-results-inline") as HTMLElement
  const resultsList = container.querySelector(".results-list") as HTMLElement
  const previewPane = container.querySelector(".preview-pane") as HTMLElement | null
  
  if (!searchBar || !resultsContainer || !resultsList) return

  const enablePreview = resultsContainer.dataset.preview === "true"
  const idDataMap = Object.keys(data) as FullSlug[]
  
  // Hide results initially
  resultsContainer.style.display = "none"

  function clearSearch() {
    searchBar.value = ""
    removeAllChildren(resultsList)
    if (previewPane) {
      removeAllChildren(previewPane)
    }
    resultsContainer.style.display = "none"
    searchType = "basic"
  }

  function resolveUrl(slug: FullSlug): URL {
    return new URL(resolveRelative(currentSlug, slug), location.toString())
  }

  const formatForDisplay = (term: string, id: number) => {
    const slug = idDataMap[id]
    // Extract filename from slug (last part of the path, without extension)
    const filename = slug.split('/').pop()?.replace(/\.(md|markdown)$/i, '') || slug
    return {
      id,
      slug,
      title: searchType === "tags" ? filename : highlight(term, filename),
      content: highlight(term, data[slug].content ?? "", true),
      tags: highlightTags(term.substring(1), data[slug].tags),
    }
  }

  const resultToHTML = ({ slug, title, content, tags }: Item) => {
    const htmlTags = tags.length > 0 ? `<ul class="tags">${tags.join("")}</ul>` : ``
    const itemTile = document.createElement("a")
    itemTile.classList.add("result-card")
    itemTile.id = slug
    itemTile.href = resolveUrl(slug).toString()
    itemTile.innerHTML = `
      <h3 class="card-title">${title}</h3>
      ${htmlTags}
      <p class="card-description">${content}</p>
    `
    
    itemTile.addEventListener("click", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      clearSearch()
    })

    if (enablePreview && previewPane) {
      itemTile.addEventListener("mouseenter", async () => {
        await displayPreview(slug)
      })
    }

    return itemTile
  }

  async function fetchContent(slug: FullSlug): Promise<Element[]> {
    if (fetchContentCache.has(slug)) {
      return fetchContentCache.get(slug) as Element[]
    }

    const targetUrl = resolveUrl(slug).toString()
    const contents = await fetch(targetUrl)
      .then((res) => res.text())
      .then((contents) => {
        if (contents === undefined) {
          throw new Error(`Could not fetch ${targetUrl}`)
        }
        const html = p.parseFromString(contents ?? "", "text/html")
        normalizeRelativeURLs(html, targetUrl)
        return [...html.getElementsByClassName("popover-hint")]
      })

    fetchContentCache.set(slug, contents)
    return contents
  }

  async function displayPreview(slug: FullSlug) {
    if (!enablePreview || !previewPane) return
    
    const contents = await fetchContent(slug)
    const innerContent = contents.flatMap((el) => [...el.children])
    
    removeAllChildren(previewPane)
    previewPane.append(...innerContent)
    
    // Highlight search terms in preview
    const highlights = [...previewPane.getElementsByClassName("highlight")]
    if (highlights.length > 0) {
      highlights[0].scrollIntoView({ block: "start" })
    }
  }

  async function displayResults(finalResults: Item[]) {
    removeAllChildren(resultsList)
    
    if (finalResults.length === 0) {
      resultsList.innerHTML = `<div class="no-results">
        <p>No results found</p>
      </div>`
      if (previewPane) {
        removeAllChildren(previewPane)
      }
    } else {
      resultsList.append(...finalResults.map(resultToHTML))
      
      // Auto-display preview for first result
      if (enablePreview && previewPane && finalResults.length > 0) {
        const firstResult = resultsList.firstElementChild as HTMLElement
        firstResult.classList.add("focus")
        await displayPreview(finalResults[0].slug)
      }
    }
    
    resultsContainer.style.display = finalResults.length > 0 || searchBar.value.trim() !== "" ? "block" : "none"
  }

  async function onType(e: Event) {
    currentSearchTerm = (e.target as HTMLInputElement).value
    
    if (currentSearchTerm === "") {
      clearSearch()
      return
    }
    
    searchType = currentSearchTerm.startsWith("#") ? "tags" : "basic"
    
    let searchResults: FlexSearch.SimpleDocumentSearchResultSetUnit[]
    if (searchType === "tags") {
      currentSearchTerm = currentSearchTerm.substring(1).trim()
      const separatorIndex = currentSearchTerm.indexOf(" ")
      if (separatorIndex != -1) {
        const tag = currentSearchTerm.substring(0, separatorIndex)
        const query = currentSearchTerm.substring(separatorIndex + 1).trim()
        searchResults = await index.searchAsync({
          query: query,
          limit: Math.max(numSearchResults, 10000),
          index: ["title", "content"],
          tag: tag,
        })
        for (let searchResult of searchResults) {
          searchResult.result = searchResult.result.slice(0, numSearchResults)
        }
        searchType = "basic"
        currentSearchTerm = query
      } else {
        searchResults = await index.searchAsync({
          query: currentSearchTerm,
          limit: numSearchResults,
          index: ["tags"],
        })
      }
    } else {
      searchResults = await index.searchAsync({
        query: currentSearchTerm,
        limit: numSearchResults,
        index: ["title", "content"],
      })
    }

    const getByField = (field: string): number[] => {
      const results = searchResults.filter((x) => x.field === field)
      return results.length === 0 ? [] : ([...results[0].result] as number[])
    }

    const allIds: Set<number> = new Set([
      ...getByField("title"),
      ...getByField("content"),
      ...getByField("tags"),
    ])
    const finalResults = [...allIds].map((id) => formatForDisplay(currentSearchTerm, id))
    await displayResults(finalResults)
  }

  // Keyboard shortcuts
  async function shortcutHandler(e: KeyboardEvent) {
    // Ctrl/Cmd + K to focus search
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      searchBar.focus()
      return
    }
    
    // Escape to clear search when focused
    if (e.key === "Escape" && document.activeElement === searchBar) {
      clearSearch()
      searchBar.blur()
    }
  }

  // Click outside to close results
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!container.contains(target)) {
      clearSearch()
    }
  }

  // Event listeners
  searchBar.addEventListener("input", onType)
  document.addEventListener("keydown", shortcutHandler)
  document.addEventListener("click", handleClickOutside)
  
  // Cleanup
  window.addCleanup(() => {
    searchBar.removeEventListener("input", onType)
    document.removeEventListener("keydown", shortcutHandler)
    document.removeEventListener("click", handleClickOutside)
  })
  
  await fillDocument(data)
}

let indexPopulated = false
async function fillDocument(data: ContentIndex) {
  if (indexPopulated) return
  let id = 0
  const promises: Array<Promise<unknown>> = []
  for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
    promises.push(
      index.addAsync(id++, {
        id,
        slug: slug as FullSlug,
        title: fileData.title,
        content: fileData.content,
        tags: fileData.tags,
      }),
    )
  }
  await Promise.all(promises)
  indexPopulated = true
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url
  const data = await fetchData
  const searchContainers = document.getElementsByClassName("search-inline-container")
  for (const container of searchContainers) {
    await setupInlineSearch(container, currentSlug, data)
  }
})