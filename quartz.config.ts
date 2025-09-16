import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "gauerle",
    pageTitleSuffix: " · gauerle",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.gauerle.me",
    ignorePatterns: ["Templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#575057",  // Your medium purple-gray
          dark: "#262626",      // Your dark gray
          secondary: "#655799", // Your purple
          tertiary: "#786F61",  // Your brownish gray
          highlight: "rgba(181, 169, 147, 0.15)", // Tan highlight
          textHighlight: "#B5A99388", // Tan with transparency
        },
        darkMode: {
          light: "#242424",     // Your darkest gray
          lightgray: "#343134", // Your dark gray
          gray: "#575057",      // Your medium purple-gray
          darkgray: "#c5b8a1",  // Your tan
          dark: "#ebebec",
          secondary: "#a386f9", // Your purple
          tertiary: "#B5A993",  // Your tan
          highlight: "rgba(101, 87, 153, 0.15)", // Purple highlight for dark mode
          textHighlight: "#65579955", // Purple with transparency
        },
      },
    },
    
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest", // or "absolute" or "relative"
        prettyLinks: true,
        openLinksInNewTab: false,
        lazyLoad: true,
        externalLinkIcon: true,
      }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
      Plugin.AliasRedirects(),
    ],
  },
}

export default config