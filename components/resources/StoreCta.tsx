import Image from 'next/image'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'

/**
 * "Store" banner shown under every blog post, as on the live site (its shared
 * call-to-action element, checked 2026-10-18), including the PLANIX R1 photo
 * that rises above the top edge on desktop. The old white logo image is
 * replaced by the new logo shown in white.
 */
const [IMG_W, IMG_H] = [619, 1282]

export function StoreCta() {
  return (
    <Container as="section" aria-label="iGuide Store" className="mt-20">
      <div
        className="store-cta relative flex min-h-[450px] flex-col justify-center rounded-2xl bg-primary bg-cover bg-center md:mt-12"
        style={{backgroundImage: 'url(/assets/Uploads/ImagesStore-CTA-v2.jpg)'}}
      >
        <div aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/80 from-25% to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/60 md:via-60% md:to-transparent md:to-75%" />
        <div className="relative px-8 py-12 text-white md:w-7/12 md:px-14">
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-baseline">
            <Image src="/iGUIDE-Logo.svg" alt="iGuide" width={1330} height={368} className="h-9 w-auto brightness-0 invert" />
            <h2 className="text-[32px] leading-tight font-semibold md:text-5xl">Store</h2>
          </div>
          <p className="mt-4 text-2xl leading-snug text-white/90">Start taking control of your environments, digitally. Shop the iGuide store for latest products and pricing.</p>
          <Button href="https://store.goiguide.com/" size="lg" variant="secondary" className="mt-8 border-white!">
            Shop now
          </Button>
        </div>
        {/* Camera: below the text on small screens; on desktop it sits on the right and pokes 3rem above the banner */}
        <div className="relative w-full md:absolute md:right-0 md:bottom-0 md:h-full md:w-1/2">
          <Image
            src="/assets/Uploads/PLANIX_R1_Footer.png"
            alt=""
            width={IMG_W}
            height={IMG_H}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="mx-auto h-auto max-h-[600px] w-auto md:absolute md:right-0 md:bottom-0 md:left-0 md:max-h-[calc(100%+3rem)]"
          />
        </div>
      </div>
    </Container>
  )
}
