import type {ComponentProps} from 'react'
import {CustomerStories} from '@/components/sections/CustomerStories'
import {resolveStories} from '@/lib/cmsLibrary'

/** Customer story cards whose quotes, people and logos can be edited in Sanity (Testimonials). */
export async function CmsCustomerStories({stories, ...props}: Readonly<ComponentProps<typeof CustomerStories>>) {
  const resolved = await resolveStories(stories)
  return resolved.length ? <CustomerStories {...props} stories={resolved} /> : null
}
