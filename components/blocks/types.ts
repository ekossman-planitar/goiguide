import type {ReactNode} from 'react'

/** Shared shapes for page-building blocks. Image paths mirror the live site's /assets/ URLs. */
export type Img = {src: string; alt: string; width?: number; height?: number}
export type Cta = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
  /** Keeps the live site's class (e.g. openCalendly) so existing GTM triggers keep matching */
  className?: string
  newTab?: boolean
  /** Opens this HubSpot form in a pop-up instead of following href (live: lightbox form buttons) */
  form?: {id: string; title: string}
}
export type Media =
  | {type: 'image'; image: Img; priority?: boolean}
  | {type: 'video'; src: string; poster?: string; label: string; /** Talking video with sound: player controls, no autoplay or loop */ controls?: boolean}
  | {type: 'embed'; src: string; title: string; aspect?: string}

export type RichText = ReactNode
