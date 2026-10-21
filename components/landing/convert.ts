import type {Cta, Img, Media} from '@/components/blocks/types'
import {book} from '@/lib/content/solutions/shared'
import type {LpButton, LpImage, LpMedia} from './types'

/** Sanity (or sample) image → site Img. Returns undefined when there's no file. */
export function lpImg(image: LpImage | undefined, fallbackAlt = ''): Img | undefined {
  if (!image) return undefined
  const src = image.asset?.url ?? image._preview
  if (!src) return undefined
  const dims = image.asset?.metadata?.dimensions
  return {src, alt: image.alt ?? fallbackAlt, width: dims?.width, height: dims?.height}
}

/** YouTube watch/short links → embed URL */
export function youtubeEmbed(url: string) {
  const id = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(url)?.[1]
  return id ? `https://www.youtube.com/embed/${id}` : url
}

/** iGuide tour links → embed URL with the live site's flags */
export function tourEmbed(url: string) {
  const u = url.includes('/embed/') ? url : url.replace(/youriguide\.com\//, 'youriguide.com/embed/')
  return `${u}${u.includes('?') ? '&' : '?'}autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash`
}

export function lpMedia(media: LpMedia | undefined): Media | undefined {
  if (!media?.kind) return undefined
  if (media.kind === 'image') {
    const image = lpImg(media.image)
    return image ? {type: 'image', image} : undefined
  }
  if (!media.url) return undefined
  if (media.kind === 'video') return {type: 'video', src: media.url, label: media.title ?? 'Video'}
  if (media.kind === 'youtube') return {type: 'embed', src: youtubeEmbed(media.url), title: media.title ?? 'Video'}
  return {type: 'embed', src: tourEmbed(media.url), title: media.title ?? 'iGuide 3D virtual tour'}
}

/** Landing page button → site button. "demo" keeps the openCalendly class GTM listens for. */
export function lpCta(button: LpButton, secondary = false): Cta {
  const variant = secondary ? ('secondary' as const) : undefined
  if (button.action === 'demo') return {...book(button.label), variant}
  if (button.action === 'url' && button.url) return {label: button.label, href: button.url, newTab: true, variant}
  return {label: button.label, href: '#form', variant}
}

export const lpCtas = (buttons: unknown) => ((buttons as LpButton[] | undefined) ?? []).filter((b) => b?.label).map((b, i) => lpCta(b, i > 0))
