/** /download-iguide-planix-app — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'

export const meta = {
  title: 'iGuide PLANIX Mobile App | iGuide',
  // NEW description (live had none)
  description:
    'Download the iGuide PLANIX mobile app for iOS and Android to pair, control and capture with your iGuide PLANIX camera system and upload projects to the iGuide Portal.',
  path: '/download-iguide-planix-app',
}

const stores = [
  {
    href: 'https://play.google.com/store/apps/details?id=com.planitar.iguide&hl=en&gl=US',
    image: {src: '/assets/Mobile-App_Google-Play_300x100__ResizedImageWzIwNyw2OV0.png', alt: 'Google Play', width: 207, height: 69},
  },
  {
    href: 'https://apps.apple.com/us/app/iguide-planix/id6450938233',
    image: {src: '/assets/Mobile-App_App-Store_300x100__ResizedImageWzIwMiw2OF0.png', alt: 'App Store', width: 202, height: 68},
  },
]

/** Lead-in shown above the h1 (an h3 on live). */
export const eyebrow = 'A new way to capture:'

export const blocks: Block[] = [
  {
    type: 'hero',
    // Live page has no h1: its heading is the h2 below an h3 "A new way to capture:" lead-in
    heading: 'Meet the iGuide PLANIX mobile app',
    subheading: 'The iGuide PLANIX mobile app is your key to unlocking the easier way to capture with your iGuide PLANIX camera system.',
    extra: (
      <>
        <p>With quick pair, intuitive controls, easy capture and prompt project upload to the iGuide Portal, it’s a match made in heaven.</p>
        <p className="mt-4">Elevate your capture experience today. Download now!</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {stores.map((s) => (
            <SmartLink key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block">
              <FallbackImage
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                className="h-[68px] w-auto"
                fallback={<span className="inline-block rounded-lg border border-line px-4 py-3 font-semibold text-ink">{s.image.alt}</span>}
              />
            </SmartLink>
          ))}
        </div>
      </>
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/Mobile_App_Lander_Image_x1600.png', alt: 'iGuide PLANIX mobile app on a smartphone', width: 1600, height: 1153}},
  },
]
