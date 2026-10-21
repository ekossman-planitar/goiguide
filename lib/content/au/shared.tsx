/** Pieces shared by the Australia pages (copy and links from the live AU pages, checked 2026-10-14). */
import type {Cta} from '@/components/blocks/types'
export {book} from '@/lib/content/solutions/shared'

export const AU_TERMS_PATH = '/au/immersive-campaign-terms-and-conditions'

/** Live: the AU photographer pages link straight to this Calendly event */
export const auDemo = (label: string): Cta => ({label, href: 'https://calendly.com/d/ctsc-x7b-xzg/iguide-demo', newTab: true})

export const rea = <a href="https://www.realestate.com.au/">realestate.com.au</a>

export const reaLogo = {src: '/assets/realestate_logo_h_rev_rgb.png', alt: 'realestate.com.au'}

export const launchVideo = {type: 'video' as const, src: '/assets/Australia/iGUIDE-Australia-Launch-Video.mp4', label: 'iGuide Australia launch video'}

export const danielNik = {
  quote: 'Without an immersive iGuide tour to allow buyers to deeply explore the home, a listing isn’t complete.',
  name: 'Daniel Nik',
  role: 'Director & Co-Founder',
  company: 'Logic Media',
  photo: {src: '/assets/Testimonial-Headshots/Daniel-Nik-Logic-Media.png', alt: 'photo - Daniel Nik'},
}
