import type {PortableTextBlock} from 'next-sanity'
import type {Attendance, EventType} from '@/lib/events'
import type {SanityImage} from '@/sanity/lib/types'

export type EventCardData = {
  _id: string
  title: string
  slug: string
  eventType?: EventType | null
  categories?: string[] | null
  attendance?: Attendance | null
  timeZone?: string | null
  startAt: string
  endAt?: string | null
  allDay?: boolean | null
  venue?: string | null
  city?: string | null
  region?: string | null
  country?: string | null
  booth?: string | null
  price?: string | null
  shortDescription?: string | null
  featuredImage?: SanityImage | null
}

export type EventDetailData = EventCardData & {
  _updatedAt: string
  address?: string | null
  eventUrl?: string | null
  eventUrlLabel?: string | null
  registrationUrl?: string | null
  hubspotFormId?: string | null
  formHeading?: string | null
  speakers?: {name: string; role?: string | null; linkedin?: string | null; photo?: SanityImage | null}[] | null
  sessions?:
    | {
        _key: string
        title: string
        format?: string | null
        startAt?: string | null
        endAt?: string | null
        stage?: string | null
        description?: string | null
        presenters?: string[] | null
      }[]
    | null
  faq?: {_key: string; question: string; answer: string}[] | null
  body?: PortableTextBlock[] | null
  seo?: {metaTitle?: string | null; metaDescription?: string | null; noIndex?: boolean | null; ogImage?: SanityImage | null} | null
  more?: EventCardData[] | null
}

/** "Metro Toronto Convention Centre, Toronto, ON" or "Online" */
export function eventPlace(e: EventCardData, withVenue = true): string {
  const place = [withVenue ? e.venue : null, e.city, e.region].filter(Boolean).join(', ')
  if (e.attendance === 'online') return 'Online'
  if (e.attendance === 'hybrid') return place ? `${place} + online` : 'In person + online'
  return place
}
