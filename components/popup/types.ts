import type {PortableTextBlock} from 'next-sanity'
import type {PopupTargeting} from '@/lib/popup/rules'

export type PopupData = PopupTargeting & {
  _id: string
  name?: string | null
  layout?: 'image' | 'split' | null
  image?: {
    alt?: string | null
    hotspot?: unknown
    crop?: unknown
    asset?: {_id: string; url: string; metadata?: {dimensions?: {width: number; height: number}}} | null
  } | null
  imageLink?: string | null
  imageSide?: 'left' | 'right' | null
  title?: string | null
  description?: PortableTextBlock[] | null
  countdown?: {endsAt?: string | null; label?: string | null; hidePopupWhenDone?: boolean | null} | null
  button?: {label?: string | null; href?: string | null; openBooking?: boolean | null; newTab?: boolean | null; background?: string | null; textColour?: string | null} | null
  backgroundColour?: string | null
  textColour?: string | null
  highlightColour?: string | null
  startAt?: string | null
  endAt?: string | null
  trigger?: 'delay' | 'scroll' | 'exit' | null
  delaySeconds?: number | null
  scrollPercent?: number | null
  frequency?: 'never' | 'days' | 'session' | null
  frequencyDays?: number | null
}
