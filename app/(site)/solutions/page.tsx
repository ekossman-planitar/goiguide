import Image from 'next/image'
import {Camera, Cloud, Share2} from 'lucide-react'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {book} from '@/lib/content/solutions/shared'
import {pageMetadata} from '@/lib/pageMetadata'

/**
 * NEW PAGE (no live equivalent): overview of every iGuide solution, linked from
 * the "Solutions" nav item. Copy is first draft for Evan to iterate on.
 */
export const metadata = pageMetadata({
  title: 'iGuide Solutions: Floor Plans, 3D Tours, CAD & More | iGuide',
  description:
    'One iGuide scan delivers accurate floor plans, 3D virtual tours, CAD files, Xactimate sketches and site plans. Explore every iGuide solution.',
  path: '/solutions',
})

type Deliverable = {
  title: string
  href: string
  description: string
  bestFor: string[]
  image: {src: string; alt: string; width: number; height: number}
}

const deliverables: Deliverable[] = [
  {
    title: 'Floor Plans',
    href: '/iguide/floor-plans',
    description: 'Accurate, measured floor plans with every scan, from branded schematic PDFs to CAD and ESX exports.',
    bestFor: ['Real estate', 'Photographers', 'Insurance'],
    image: {src: '/assets/schematic-pdf-floorplan.png', alt: 'iGuide schematic floor plan with room dimensions', width: 2160, height: 1668},
  },
  {
    title: '3D Virtual Tours',
    href: '/iguide/3d-virtual-tours',
    description: 'Immersive walkthroughs anyone can explore online, with measurements built in.',
    bestFor: ['Real estate', 'Photographers', 'Facilities'],
    image: {src: '/assets/Uploads/Best-practices-floor-plans-and-3D-virtual-tours__ScaleMaxWidthWzY1OF0.png', alt: 'iGuide 3D virtual tour and floor plan on a desktop and laptop', width: 658, height: 350},
  },
  {
    title: 'CAD Deliverables',
    href: '/iguide/cad-deliverables',
    description: 'Editable DWG, DXF, RVT and PDF drawings from one site visit, ready in days, not weeks.',
    bestFor: ['Architecture', 'Design & construction', 'Facilities'],
    image: {src: '/assets/CS0001-Premium-Floor-Plans.png', alt: 'iGuide CAD floor plan drawing of a commercial space', width: 3001, height: 2000},
  },
  {
    title: 'Xactimate Sketches',
    href: '/iguide/xactimate-sketches',
    description: 'Insurance-ready ESX sketches with an integrated 3D walkthrough for faster claims.',
    bestFor: ['Insurance & restoration', 'Forensic investigation'],
    image: {src: '/assets/Xactimate_72dpi.jpg', alt: 'Adjuster reviewing an iGuide Xactimate sketch and 3D tour', width: 1682, height: 1121},
  },
  {
    title: 'Site Plans',
    href: '/iguide/site-plans',
    description: 'Exterior property layouts that complete the listing, inside and out.',
    bestFor: ['Real estate', 'Photographers'],
    image: {src: '/assets/Site_Plans_Add-On.jpg', alt: 'iGuide site plan showing a home, yard and pool', width: 3001, height: 2000},
  },
]

const steps = [
  {icon: Camera, title: 'Capture', text: 'Scan the property once with the PLANIX R1 camera, or hire a trained iGuide Pro.'},
  {icon: Cloud, title: 'Process', text: 'iGuide turns the scan into measurements, plans and an interactive tour.'},
  {icon: Share2, title: 'Deliver', text: 'Share, download or publish everything to the tools and portals you already use.'},
]

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-12 lg:pt-12 lg:pb-[60px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <h1 className="text-balance text-[40px] leading-[normal] font-semibold text-ink md:text-[56px]">One scan. Every deliverable.</h1>
            <p className="mt-6 text-xl leading-[30px] text-muted">
              Floor plans, 3D virtual tours, CAD files, Xactimate sketches and site plans, all from a single iGuide capture.
            </p>
            <CtaButtons className="mt-8" ctas={[book(), {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/', variant: 'secondary'}]} />
          </div>
          <div className="min-w-0">
            <Image
              src="/assets/Chirs_R1_Living_Room.png"
              alt="iGuide operator scanning a living room with the PLANIX R1 camera"
              width={1080}
              height={1283}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="mx-auto h-auto max-h-[520px] w-auto rounded-2xl object-cover"
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="how-heading">
        <Container>
          <h2 id="how-heading" className="text-center text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
            How iGuide works
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({icon: Icon, title, text}, i) => (
              <li key={title} className="relative rounded-2xl bg-white p-8 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                  <Icon aria-hidden width={24} height={24} />
                </span>
                <p className="mt-5 text-sm font-semibold tracking-wide text-muted uppercase">Step {i + 1}</p>
                <h3 className="mt-1 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-base leading-6 text-body">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-16 lg:py-20" aria-labelledby="deliverables-heading">
        <Container>
          <div className="max-w-3xl">
            <h2 id="deliverables-heading" className="text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
              What you get from every scan
            </h2>
            <p className="mt-4 text-xl leading-[30px] text-muted">Pick the deliverables your workflow needs. Add more any time from the same capture.</p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {deliverables.map((d, i) => (
              <li key={d.href} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <SmartLink
                  href={d.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:border-primary-hover"
                >
                  <div className={`relative overflow-hidden bg-surface ${i < 2 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      fill
                      sizes={i < 2 ? '(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-semibold text-ink group-hover:text-primary-hover">{d.title}</h3>
                    <p className="mt-2 flex-1 text-base leading-6 text-body">{d.description}</p>
                    <p className="sr-only">Popular with:</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {d.bestFor.map((b) => (
                        <li key={b} className="rounded-full bg-surface px-3 py-1 text-sm text-ink">
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
                      Learn more
                      <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </SmartLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Capture & connect */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="platform-heading">
        <Container>
          <h2 id="platform-heading" className="text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
            Built to capture. Made to connect.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                title: 'PLANIX R1 capture hardware',
                text: 'The camera behind every iGuide: immersive imagery and precise LiDAR measurements in one scan.',
                href: '/camera-hardware',
                link: 'Explore the hardware',
                image: {src: '/assets/Homepage-PLANIX-R1.jpg', alt: 'iGuide PLANIX R1 camera', width: 1094, height: 1258},
              },
              {
                title: 'Integrations',
                text: 'Capture once, publish everywhere. iGuide connects with MLS systems, listing portals and the software you use.',
                href: '/iguide/integrations',
                link: 'See integrations',
                image: {src: '/assets/integrations-hub-new.png', alt: 'iGuide connected to Zillow, Realtor.com, Flexmls and other platforms', width: 2464, height: 1280},
              },
            ].map((c) => (
              <SmartLink
                key={c.href}
                href={c.href}
                className="group grid items-center gap-6 rounded-2xl bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] sm:grid-cols-[1fr_200px] md:p-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-ink group-hover:text-primary-hover">{c.title}</h3>
                  <p className="mt-3 text-base leading-6 text-body">{c.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
                    {c.link}
                    <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="200px" className="mx-auto h-40 w-auto object-contain" />
              </SmartLink>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        heading="Not sure which solution fits?"
        text="Talk to a product expert about your projects and the deliverables you need."
        ctas={[book(), {label: 'Shop PLANIX R1', href: 'https://store.goiguide.com/products/iguide-planix-r1', variant: 'secondary'}]}
      />
    </>
  )
}
