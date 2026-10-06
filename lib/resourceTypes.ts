/**
 * The content types shown in the Resource Center. Shared by Sanity Studio
 * (document types) and the site (filters, card labels, URLs).
 *
 * `tab` values match the live goiguide.com/resource-center?tab=… links
 * (including their capitalisation) so existing links keep working.
 * `basePath` is where each type's detail pages live. Only /blogs has a page
 * template so far; the rest are placeholders to confirm against the live crawl.
 */
export const resourceTypes = [
  {name: 'blogPost', singular: 'Blog post', label: 'Blog', tab: 'blog', basePath: '/blogs', linkLabel: 'Read more'},
  {name: 'whitePaper', singular: 'White paper / eBook', label: 'White Papers & eBooks', tab: 'white-papers', basePath: '/white-papers-and-ebooks', linkLabel: 'Read more'},
  {name: 'customerStory', singular: 'Customer story', label: 'Customer Stories', tab: 'customer-stories', basePath: '/customer-stories', linkLabel: 'Read story'},
  {name: 'brochure', singular: 'Brochure', label: 'Brochures', tab: 'Brochures', basePath: '/brochures', linkLabel: 'View brochure'},
  {name: 'video', singular: 'Video', label: 'Videos', tab: 'Videos', basePath: '/video', linkLabel: 'Watch video'},
  {name: 'webinar', singular: 'Webinar', label: 'Webinars', tab: 'webinars', basePath: '/webinars', linkLabel: 'Watch webinar'},
  {name: 'newsArticle', singular: 'News article', label: 'News', tab: 'news', basePath: '/news', linkLabel: 'Read more'},
  {name: 'galleryItem', singular: 'Gallery tour', label: 'iGUIDE Gallery', tab: 'gallery', basePath: '/resources-and-media/iguide-gallery', linkLabel: 'View tour'},
] as const

export type ResourceTypeName = (typeof resourceTypes)[number]['name']
export type ResourceTypeConfig = (typeof resourceTypes)[number]

export const resourceTypeNames = resourceTypes.map((t) => t.name) as ResourceTypeName[]

export function getResourceType(name: string): ResourceTypeConfig | undefined {
  return resourceTypes.find((t) => t.name === name)
}

/** Gallery items are tours, not dated posts: no date on the card. */
export const undatedTypes: ReadonlySet<string> = new Set(['galleryItem'])
