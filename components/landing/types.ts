/** Shapes of landing page content as returned by LANDING_PAGE_QUERY (and the /landing-templates samples). */
export type LpImage = {alt?: string; asset?: {url: string; metadata?: {dimensions?: {width: number; height: number}}}; _preview?: string} | null
export type LpButton = {label: string; action?: 'form' | 'demo' | 'url'; url?: string}
export type LpMedia = {kind?: 'image' | 'tour' | 'youtube' | 'video'; url?: string; title?: string; image?: LpImage} | null
export type LpLogo = {name: string; url?: string; dims?: {width: number; height: number}}
export type LpQuote = {
  quote: string
  detail?: string
  name?: string
  role?: string
  company?: string
  link?: {label?: string; href?: string}
  photo?: {alt?: string; asset?: {url: string}} | string
  logo?: LpLogo | null
}

export type LpSection = {_key: string; _type: string; [field: string]: unknown}

export type LandingPageData = {
  _id?: string
  title?: string
  path: string
  seoTitle?: string
  metaDescription?: string
  shareImage?: string
  layout?: string
  chrome?: 'landing' | 'site' | null
  floatingBookButton?: boolean | null
  headerButton?: LpButton | null
  sections: LpSection[]
}
