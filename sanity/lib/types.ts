import type {PortableTextBlock} from 'next-sanity'

export type Link = {label?: string; href?: string}

export type HeroMediaData = {
  mediaType?: 'image' | 'video'
  image?: {
    alt?: string
    hotspot?: {x: number; y: number}
    crop?: unknown
    asset?: {
      _id: string
      url: string
      metadata?: {lqip?: string; dimensions?: {width: number; height: number}}
    }
  }
  videoSrc?: string | null
  posterSrc?: string | null
}

export type HeroData = {
  eyebrow?: Link | null
  heading?: string
  subheading?: string
  cta?: Link | null
  secondaryCta?: Link | null
  media?: HeroMediaData | null
}

export type LogoItem = {_id: string; name: string; src: string}

export type HomePageData = {
  hero?: HeroData | null
  logoCarousel?: {heading?: string; logos?: LogoItem[] | null} | null
} | null

export type Announcement = {
  _id: string
  message: string
  link?: Link | null
  startAt?: string | null
  endAt?: string | null
}

export type SanityImage = {
  alt?: string
  caption?: string
  hotspot?: {x: number; y: number}
  crop?: unknown
  asset?: {_id: string; url: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
}

export type ResourceCardData = {
  _id: string
  _type: string
  title: string
  slug?: string | null
  publishedAt?: string | null
  excerpt?: string | null
  externalUrl?: string | null
  /** Legacy gallery field; queries return it as externalUrl */
  tourUrl?: string | null
  categories?: string[] | null
  linkType?: 'page' | 'external' | 'video' | 'download' | 'tour' | null
  featuredImage?: SanityImage | null
}

export type Author = {
  name: string
  role?: string | null
  bio?: string | null
  linkedin?: string | null
  photo?: SanityImage | null
}

export type Seo = {
  metaTitle?: string | null
  metaDescription?: string | null
  noIndex?: boolean | null
  ogImage?: SanityImage | null
}

export type CtaLink = {label?: string | null; href?: string | null}

export type ResourceDetailData =
  | (ResourceCardData & {
      _updatedAt: string
      headerVideoUrl?: string | null
      customerName?: string | null
      customerLocation?: string | null
      eventDateText?: string | null
      eventCta?: CtaLink | null
      newsCta?: CtaLink | null
      body?: PortableTextBlock[] | null
      author?: Author | null
      seo?: Seo | null
      related?: ResourceCardData[] | null
    })
  | null

/** @deprecated use ResourceDetailData */
export type BlogPostData = ResourceDetailData

export type CatalogueItemData = {
  _id: string
  title: string
  catalogue: string
  slug?: string | null
  fileUrl?: string | null
  publishedAt?: string | null
  thumbnail?: SanityImage | null
}
