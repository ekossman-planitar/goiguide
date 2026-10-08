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
}
export type Media =
  | {type: 'image'; image: Img; priority?: boolean}
  | {type: 'video'; src: string; poster?: string; label: string}
  | {type: 'embed'; src: string; title: string; aspect?: string}

export type RichText = ReactNode
