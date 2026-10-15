/** /get-iguide/tools/how-to-iguide-report — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {EmailReportEmbed} from '@/components/pages/EmailReportEmbed'
import {html as reportEmail} from './emailSamples/iguideReport'

export const meta = {
  title: 'iGUIDE Reports: Overview, Details and Tools | iGUIDE',
  description: 'iGUIDE Reports offer many essential features and tools tailored for property viewing, sharing, management and marketing.',
  path: '/get-iguide/tools/how-to-iguide-report',
}

export const anchors = [
  {label: 'iGUIDE Report Overview', href: `${meta.path}#report`},
  {label: 'Explore the iGUIDE Report', href: `${meta.path}#experience`},
  {label: 'Additional detail', href: `${meta.path}#video`},
]

const yt = (src: string, title: string) => ({type: 'embed' as const, src, title})

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGUIDE Report',
    media: {type: 'image', image: {src: '/assets/Uploads/Reseller-How-to-Start.png', alt: 'iGUIDE Report'}},
  },
  {
    type: 'custom',
    id: 'report',
    heading: 'iGUIDE Report Overview',
    subheading:
      'Our iGUIDE Report, sent via email, offers many essential features and tools tailored for property viewing, management and marketing. With convenient links, downloadable resources and comprehensive property details such as room measurements and floor area information, sharing property information with partners, vendors and clients becomes effortless.',
    children: (
      <MediaView
        media={{type: 'image', image: {src: '/assets/17cc011157/iguide-report.png', alt: 'screenshot - iGUIDE Report with Descriptions'}}}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="rounded-2xl"
      />
    ),
  },
  {
    type: 'custom',
    id: 'experience',
    heading: 'Explore the iGUIDE Report',
    background: 'surface',
    children: (
      <EmailReportEmbed
        html={reportEmail}
        label="Sample iGUIDE Report email"
        className="mx-auto max-w-[680px] rounded-2xl bg-white shadow-[0_8px_32px_rgba(20,24,28,0.12)]"
      />
    ),
  },
  {
    type: 'custom',
    id: 'video',
    heading: 'Explore additional details & tools',
    children: (
      <TabbedMedia
        label="iGUIDE Report tools"
        align="left"
        tabs={[
          {id: 'overview', label: 'Overview', media: yt('https://www.youtube.com/embed/91uSXWDW-EE', 'iGUIDE Report overview')},
          {
            id: 'feature-sheet',
            label: 'Feature Sheet Creator',
            media: yt('https://www.youtube.com/embed/TKHUyxB3cqE?si=ZGv07Qovqx-8O2Ra', 'iGUIDE Feature Sheet Creator'),
            title: 'Feature Sheet Creator',
            text: (
              <p>
                Provide listing agents with the convenience of the iGUIDE Feature Sheet creator, enabling them to create a listing brochure directly
                from an iGUIDE. Seamlessly integrate images, floor plans, and branding directly from the iGUIDE, providing customization to deliver a
                professional touch that resonates with their clients.
              </p>
            ),
          },
          {
            id: 'embedding',
            label: 'Embedding Tool',
            media: yt('https://www.youtube.com/embed/WtLzxWJQs64?si=ctsTYl11uyHZke4U', 'iGUIDE Embedding Tool'),
            title: 'Embedding Tool',
            text: (
              <p>
                The embedding tool allows users to create custom code that can be added to third-party websites. Embedding the iGUIDE directly into a
                website provides a contained interactive experience for the viewer, driving additional engagement and time on the page.
              </p>
            ),
          },
          {
            id: 'virtual-showing',
            label: 'Virtual Showing',
            media: yt('https://www.youtube.com/embed/VtvfYwgyeY4?si=d_EFhAL1gHTalxA0', 'iGUIDE Virtual Showing'),
            title: 'Virtual Showing',
            text: (
              <>
                <p>Explore an iGUIDE while others watch from a distance. Your movements will be shown on everyone&apos;s screens simultaneously.</p>
                <p className="mt-3">
                  Sharing actions is quicker and smoother than sharing your screen, leading to a better experience. Making your first Virtual Showing is
                  simple. Click the share button to access easy instructions.
                </p>
              </>
            ),
          },
          {
            id: 'photo-sphere',
            label: 'iGUIDE Photo Sphere',
            media: yt('https://www.youtube.com/embed/JON9JCL3y2k?si=Ldg_Fb2vSDQhW6Os', 'iGUIDE Photo Sphere'),
            title: 'iGUIDE Photo Sphere',
            text: <p>Effortlessly generate and download photospheres from the iGUIDE, perfect for versatile applications like social media sharing.</p>,
          },
        ]}
      />
    ),
  },
]
