/** Pieces shared by several industry pages (checked against the live pages 2026-10-07). */
import type {Deliverable} from '@/components/blocks/DeliverableCards'
import type {Cta, Img} from '@/components/blocks/types'

export {book} from '@/lib/content/solutions/shared'

export const findPro: Cta = {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/'}
export const shopCameras: Cta = {label: 'Shop cameras', href: 'https://store.goiguide.com/', variant: 'secondary'}

/** Live iGUIDE tour embeds append these flags */
export const tour = (url: string) => `${url}${url.includes('?') ? '&' : '?'}__avoid-embed-load__&nosplash`

export const realEstateLogos: Img[] = [
  {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: 'logo - RE/MAX'},
  {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: 'logo - Keller Williams'},
  {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: 'logo - Royal LePage'},
  {src: '/assets/Uploads/loookinside-logo.png', alt: 'logo - LooOK INside'},
  {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
  {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
  {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: 'logo - Visual Advantage'},
]

export const ircLogos: Img[] = [
  {src: '/assets/noblesville-fire-department.png', alt: 'logo - Noblesville Fire Department'},
  {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
  {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: 'logo - Grindley Williams Engineering'},
  {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: 'logo - PuroClean'},
  {src: '/assets/Uploads/compass.png', alt: 'logo - Compass Building Services'},
  {src: '/assets/Icons/all-seasons-adjusting-logo.png', alt: 'logo - All Seasons Adjusting'},
  {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
  {src: '/assets/Uploads/Scrolling-LogosColonial-Claims.png', alt: 'Colonial Claims'},
]

/* Package cards used on the Real Estate, Photography and Forensic pages */
export const instantPackage: Deliverable = {
  title: 'iGUIDE Instant (US Only)',
  image: {src: '/assets/Uploads/Pricing-iGUIDE-Instant-updated-v2__ScaleMaxWidthWzMwMF0.png', alt: 'iGUIDE Instant', width: 300, height: 225},
  includesLabel: 'Includes:',
  includes: ['Available in minutes', '120 days hosting', '3D virtual walkthrough', 'Online interactive black and white iGUIDE floor plan'],
  cta: {label: 'Try Instant demo', href: 'https://youriguide.com/87n9g_150_chattel_st_middletown_ny', newTab: true},
}

export const standardPackage: Deliverable = {
  title: 'iGUIDE Standard',
  image: {src: '/assets/Standard_Pricing__FitMaxWzkzMCwzMzZd.png', alt: 'iGUIDE Standard', width: 930, height: 336},
  includesLabel: 'Includes:',
  includes: [
    '3D virtual walkthrough',
    'Color-coded floor plans',
    'Lead generation tool',
    'Property measurement standard',
    'Floorplanner export',
    'Downloadable offline file',
    'ANSI-Z765 / RMS compliant 2D square footage calculations',
    'One-year hosting package',
  ],
  cta: {label: 'Explore Standard tour', href: 'https://youriguide.com/150_chattel_st_middletown_ny', newTab: true},
}

export const premiumPackage: Deliverable = {
  title: 'iGUIDE Premium',
  image: {src: '/assets/Premium_Pricing.png', alt: 'iGUIDE Premium', width: 930, height: 336},
  includesLabel: 'Includes:',
  includes: ['Everything in our iGUIDE Standard package', 'Enhanced detailed floor plans with objects, fixtures and appliances', 'VR compatible'],
  cta: {label: 'Explore Premium tour', href: 'https://youriguide.com/100_chattel_st_haverhill_ma', newTab: true},
}
