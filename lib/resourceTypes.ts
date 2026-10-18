/**
 * The content types shown in the Resource Center. Shared by Sanity Studio
 * (document types), the site (filters, card labels, URLs) and the live-content
 * import script.
 *
 * `basePath` is the type's listing page (the Resource Center pre-filtered to
 * that type, e.g. /blogs) and the parent of its detail pages (/blogs/<slug>).
 * `tab` values are the live site's /resource-center?tab=… links (any
 * capitalisation); proxy.ts permanently redirects those to `basePath`.
 * `feedPath` is the live Silverstripe holder page the import script reads cards from.
 * `categories` are the live holder's category filters (slug → label), kept so
 * existing ?category= links keep working.
 * `hidden` types have pages but no Resource Center filter (eBooks duplicate white papers on live).
 */
export const resourceTypes = [
  {
    name: 'blogPost',
    singular: 'Blog post',
    label: 'Blog',
    tab: 'blog',
    basePath: '/blogs',
    feedPath: '/blogs',
    linkLabel: 'Read more',
    categories: {
      'residential-real-estate': 'Residential Real Estate',
      'real-estate-photography': 'Real Estate Photography',
      'architecture-and-remodeling': 'Architecture & Remodeling',
      'insurance-and-restoration': 'Insurance & Restoration',
      'facility-management': 'Facility Management',
      'design-and-construction': 'Design & Construction',
    },
  },
  {
    name: 'whitePaper',
    singular: 'White paper / eBook',
    label: 'White Papers & eBooks',
    tab: 'white-papers',
    basePath: '/white-papers-and-ebooks',
    feedPath: '/white-papers-and-ebooks',
    linkLabel: 'Read more',
    categories: {},
  },
  {
    name: 'customerStory',
    singular: 'Customer story',
    label: 'Customer Stories',
    tab: 'customer-stories',
    basePath: '/customer-stories',
    feedPath: '/customer-stories',
    linkLabel: 'Read story',
    categories: {
      'residential-real-estate': 'Residential Real Estate',
      'real-estate-photography': 'Real Estate Photography',
      'architecture-and-remodeling': 'Architecture & Remodeling',
      'insurance-and-restoration': 'Insurance & Restoration',
      'design-and-construction': 'Design & Construction',
    },
  },
  {
    name: 'brochure',
    singular: 'Brochure',
    label: 'Brochures',
    tab: 'Brochures',
    basePath: '/brochures',
    feedPath: '/brochures',
    linkLabel: 'View brochure',
    categories: {
      'residential-real-estate': 'Residential Real Estate',
      'real-estate-photography': 'Real Estate Photography',
      'architecture-and-remodeling': 'Architecture & Remodeling',
      'commercial-design': 'Commercial Design',
      'insurance-and-restoration': 'Insurance & Restoration',
      'facility-management': 'Facility Management',
    },
  },
  {
    name: 'video',
    singular: 'Video',
    label: 'Videos',
    tab: 'Videos',
    basePath: '/video',
    feedPath: '/video',
    linkLabel: 'Watch video',
    categories: {
      'residential-real-estate': 'Residential Real Estate',
      'real-estate-photography': 'Real Estate Photography',
      'architecture-and-remodeling': 'Architecture & Remodeling',
      'insurance-and-restoration': 'Insurance & Restoration',
      'facility-management': 'Facility Management',
    },
  },
  {
    name: 'webinar',
    singular: 'Webinar',
    label: 'Webinars',
    tab: 'webinars',
    basePath: '/webinars',
    feedPath: '/webinars',
    linkLabel: 'Watch webinar',
    categories: {'iguide-solutions': 'iGuide Solutions', 'q-and-a': 'Q&A', masterclass: 'Masterclass'},
  },
  {
    name: 'newsArticle',
    singular: 'News article',
    label: 'News',
    tab: 'news',
    basePath: '/news',
    feedPath: '/news',
    linkLabel: 'Read more',
    categories: {'press-releases': 'Press releases', 'in-the-media': 'In the media', 'featured-stories': 'Featured stories'},
  },
  {
    name: 'galleryItem',
    singular: 'Gallery tour',
    label: 'iGuide Gallery',
    tab: 'iguide-gallery',
    basePath: '/resources-and-media/iguide-gallery',
    feedPath: '/resources-and-media/iguide-gallery',
    linkLabel: 'View tour',
    categories: {
      'iguide-offering': 'iGuide Offering',
      residential: 'Residential',
      'architecture-and-remodeling': 'Architecture & Remodeling',
      'insurance-and-restoration': 'Insurance & Restoration',
      'commercial-and-retail': 'Commercial & Retail',
      'tourism-and-unique-spaces': 'Tourism & Unique Spaces',
      rental: 'Rental',
      'cad-floor-plans-and-drawing-packages': 'CAD Floor Plans & Drawing Packages',
      'site-plans': 'Site Plans',
      drones: 'Drones',
    },
  },
  {
    name: 'ebook',
    singular: 'eBook',
    label: 'eBooks',
    tab: 'ebooks',
    basePath: '/ebooks',
    feedPath: '/ebooks',
    linkLabel: 'Read more',
    categories: {},
    hidden: true,
  },
] as const

export type ResourceTypeName = (typeof resourceTypes)[number]['name']
export type ResourceTypeConfig = (typeof resourceTypes)[number]

export const resourceTypeNames = resourceTypes.map((t) => t.name) as ResourceTypeName[]

/** Types with a Resource Center filter */
export const listedResourceTypes = resourceTypes.filter((t) => !('hidden' in t && t.hidden))

export function getResourceType(name: string): ResourceTypeConfig | undefined {
  return resourceTypes.find((t) => t.name === name)
}

export function getResourceTypeByPath(basePath: string): ResourceTypeConfig | undefined {
  return resourceTypes.find((t) => t.basePath === basePath)
}

/** Live ?tab= value (any capitalisation) → resource type */
export function getResourceTypeByTab(tab: string | null): ResourceTypeConfig | undefined {
  if (!tab) return undefined
  return resourceTypes.find((t) => t.tab.toLowerCase() === tab.toLowerCase())
}

/** Label for a category slug of a type, or the slug itself if unknown */
export function categoryLabel(type: ResourceTypeConfig | undefined, slug: string): string {
  const categories = (type?.categories ?? {}) as Record<string, string>
  return categories[slug] ?? slug
}

export const RESOURCE_CENTER_PATH = '/resource-center'

/** Page title for the Resource Center (live title) or one of its listing URLs (new) */
export function resourceCenterTitle(config?: ResourceTypeConfig) {
  return config ? `${config.label} | iGuide Resource Center` : 'iGuide Resource Center | Blog, Videos, Webinars & Stories | iGuide'
}

/** Gallery items are tours, not dated posts: no date on the card. */
export const undatedTypes: ReadonlySet<string> = new Set(['galleryItem'])

/**
 * How a card/entry opens, from the live CMS "LinkOption":
 * page = the entry's own page, external = another site, video = YouTube/Vimeo,
 * download = a file (PDF, ZIP…), tour = an iGuide tour.
 */
export const linkTypes = ['page', 'external', 'video', 'download', 'tour'] as const
export type LinkType = (typeof linkTypes)[number]
