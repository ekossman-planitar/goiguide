import type {ComponentProps} from 'react'
import {Testimonials} from '@/components/blocks/Testimonials'
import {resolveQuotes} from '@/lib/cmsLibrary'

/** Testimonials whose text, people and photos can be edited in Sanity (Testimonials). */
export async function CmsTestimonials({quotes, ...props}: Readonly<ComponentProps<typeof Testimonials>>) {
  const resolved = await resolveQuotes(quotes)
  return resolved.length ? <Testimonials {...props} quotes={resolved} /> : null
}
