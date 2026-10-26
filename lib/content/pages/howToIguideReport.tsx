/** /get-iguide/tools/how-to-iguide-report — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {EmailReportEmbed} from '@/components/pages/EmailReportEmbed'
import {html as reportEmail} from './emailSamples/iguideReport'

export const meta = {
  title: 'iGuide Reports: Overview, Details and Tools | iGuide',
  description: 'iGuide Reports offer many essential features and tools tailored for property viewing, sharing, management and marketing.',
  path: '/get-iguide/tools/how-to-iguide-report',
}

export const anchors = [
  {label: 'iGuide Report Overview', href: `${meta.path}#report`},
  {label: 'Explore the iGuide Report', href: `${meta.path}#experience`},
  {label: 'Additional detail', href: `${meta.path}#video`},
]

const yt = (src: string, title: string) => ({type: 'embed' as const, src, title})

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGuide Report',
    media: {type: 'image', image: {src: '/assets/Uploads/Reseller-How-to-Start.png', alt: 'iGuide Report'}},
  },
  {
    type: 'custom',
    id: 'report',
    heading: 'iGuide Report Overview',
    subheading:
      'Our iGuide Report, sent via email, offers many essential features and tools tailored for property viewing, management and marketing. With convenient links, downloadable resources and comprehensive property details such as room measurements and floor area information, sharing property information with partners, vendors and clients becomes effortless.',
    children: (
      <MediaView
        media={{type: 'image', image: {src: '/assets/17cc011157/iguide-report.png', alt: 'screenshot - iGuide Report with Descriptions'}}}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="rounded-2xl"
      />
    ),
  },
  {
    type: 'custom',
    id: 'experience',
    heading: 'Explore the iGuide Report',
    background: 'surface',
    children: (
      <EmailReportEmbed
        html={reportEmail}
        label="Sample iGuide Report email"
        className="mx-auto max-w-[680px] rounded-2xl bg-white shadow-card"
      />
    ),
  },
  {
    type: 'custom',
    id: 'video',
    heading: 'Explore additional details & tools',
    children: (
      <TabbedMedia
        label="iGuide Report tools"
        align="left"
        tabs={[
          {id: 'overview', label: 'Overview', media: yt('https://www.youtube.com/embed/91uSXWDW-EE', 'iGuide Report overview')},
          {
            id: 'feature-sheet',
            label: 'Feature Sheet Creator',
            media: yt('https://www.youtube.com/embed/TKHUyxB3cqE?si=ZGv07Qovqx-8O2Ra', 'iGuide Feature Sheet Creator'),
            title: 'Feature Sheet Creator',
            text: (
              <p>
                Provide listing agents with the convenience of the iGuide Feature Sheet creator, enabling them to create a listing brochure directly
                from an iGuide. Seamlessly integrate images, floor plans, and branding directly from the iGuide, providing customization to deliver a
                professional touch that resonates with their clients.
              </p>
            ),
          },
          {
            id: 'embedding',
            label: 'Embedding Tool',
            media: yt('https://www.youtube.com/embed/WtLzxWJQs64?si=ctsTYl11uyHZke4U', 'iGuide Embedding Tool'),
            title: 'Embedding Tool',
            text: (
              <p>
                The embedding tool allows users to create custom code that can be added to third-party websites. Embedding the iGuide directly into a
                website provides a contained interactive experience for the viewer, driving additional engagement and time on the page.
              </p>
            ),
          },
          {
            id: 'virtual-showing',
            label: 'Virtual Showing',
            media: yt('https://www.youtube.com/embed/VtvfYwgyeY4?si=d_EFhAL1gHTalxA0', 'iGuide Virtual Showing'),
            title: 'Virtual Showing',
            text: (
              <>
                <p>Explore an iGuide while others watch from a distance. Your movements will be shown on everyone&apos;s screens simultaneously.</p>
                <p className="mt-3">
                  Sharing actions is quicker and smoother than sharing your screen, leading to a better experience. Making your first Virtual Showing is
                  simple. Click the share button to access easy instructions.
                </p>
              </>
            ),
          },
          {
            id: 'photo-sphere',
            label: 'iGuide Photo Sphere',
            media: yt('https://www.youtube.com/embed/JON9JCL3y2k?si=Ldg_Fb2vSDQhW6Os', 'iGuide Photo Sphere'),
            title: 'iGuide Photo Sphere',
            text: <p>Effortlessly generate and download photospheres from the iGuide, perfect for versatile applications like social media sharing.</p>,
          },
        ]}
      />
    ),
  },
]
