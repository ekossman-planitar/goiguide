/** Pieces shared by the /compare/* pages (checked against the live pages 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import type {Img} from '@/components/blocks/types'
import {FormDialogButton} from '@/components/pages/FormDialogButton'
import {Button} from '@/components/ui/Button'

/** Inline hero form on every compare page (live submit label is changed to "Let's chat about iGUIDE" by a page script) */
export const compareHeroFormId = '51daa83c-c4d0-4527-9255-881d29543aab'
/** Form in the "Get in touch" pop-up behind the closing "Let’s chat about iGUIDE" button */
export const getInTouchFormId = 'ab373579-0755-4f0f-a53c-a04f1ff89266'

export const logosHeading = 'Top industry professionals trust iGUIDE as their go-to solution'

/**
 * 15-logo band on the Matterport, Zillow, manual-measurement and CubiCasa pages.
 * The LooOK INside logo file differs per page on live, so it is passed in.
 * "logo - Mapply" really points at Scrolling-LogosLevco.png.png on live.
 */
export const compareLogos = (lookInside: Img): Img[] => [
  {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: 'logo - Keller Williams'},
  {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: 'logo - Royal LePage'},
  {src: '/assets/Uploads/Scrolling-LogosLevco.png', alt: 'logo - Levco Builders'},
  {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: 'logo - RE/MAX'},
  {src: '/assets/Uploads/compass.png', alt: 'logo - Compass Realty'},
  {src: '/assets/Uploads/Scrolling-LogosLevco.png.png', alt: 'logo - Mapply'},
  {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
  {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
  {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: 'logo - Visual Advantage'},
  {src: '/assets/Uploads/leading_image-v2.png', alt: 'logo - Leading Image'},
  {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: 'logo - Grindley Williams'},
  lookInside,
  {src: '/assets/Uploads/Scrolling-LogosColonial-Claims.png', alt: 'logo - Colonial Claims'},
  {src: '/assets/Uploads/Scrolling-LogosNoontide.png', alt: 'logo - Noontide'},
  {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
]

export const lookInsideV2: Img = {src: '/assets/Uploads/look-v2.png', alt: 'logo - LooOK INside'}

export const comparePlanixImage: Img = {src: '/assets/iguide-vs-competitors-planix-r1.png', alt: 'photo - PLANIX R1 Camera System'}

/** "Trusted by professionals" items: title + one line each */
export function ProList({items}: {items: {title: string; text: string}[]}) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-2">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Closing section: "Let’s chat about iGUIDE" (id gsbtn, opens the Get in touch form)
 * and a second button (id fapbtn). IDs kept from live for GTM.
 */
export function closingCta({heading, text, secondary}: {heading: string; text?: string; secondary: {label: string; href: string}}): Block {
  return {
    type: 'custom',
    id: 'get-in-touch',
    background: 'sky',
    children: (
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">{heading}</h2>
        {text && <p className="mt-5 text-xl leading-[30px] text-muted">{text}</p>}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <FormDialogButton id="gsbtn" label="Let’s chat about iGUIDE" title="Get in touch" formId={getInTouchFormId} />
          <Button id="fapbtn" href={secondary.href} variant="secondary" size="lg" newTab>
            {secondary.label}
          </Button>
        </div>
      </div>
    ),
  }
}
