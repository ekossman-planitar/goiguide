/** /get-iguide/tools/how-to-iguide-photos-report — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {EmailReportEmbed} from '@/components/pages/EmailReportEmbed'
import {html as photosReportEmail} from './emailSamples/iguidePhotosReport'

export const meta = {
  title: 'iGUIDE Photos Report | iGUIDE',
  // NEW description (live had none)
  description:
    'See what is in the iGUIDE Photos Report email: virtual tour links, image gallery downloads, the Feature Sheet Creator and the Embedding Tool for sharing property photos.',
  path: '/get-iguide/tools/how-to-iguide-photos-report',
}

export const anchors = [
  {label: 'iGUIDE Photos Report Overview', href: `${meta.path}#report`},
  {label: 'Explore the iGUIDE Photos Report', href: `${meta.path}#experience`},
  {label: 'Additional detail', href: `${meta.path}#video`},
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGUIDE Photos Report',
    media: {type: 'image', image: {src: '/assets/Uploads/Reseller-How-to-Start.png', alt: 'iGUIDE Photos Report'}},
  },
  {
    type: 'custom',
    id: 'report',
    heading: 'iGUIDE Photos Report Overview',
    subheading:
      'Our iGUIDE Photos Report, sent via email, offers many essential features and tools tailored for property viewing, management, and marketing. With convenient links and downloadable resources, sharing property information with partners, vendors, and clients becomes effortless.',
    children: (
      <MediaView
        media={{type: 'image', image: {src: '/assets/iguide-photos-report.png', alt: 'screenshot - iGUIDE Photos Report'}}}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="rounded-2xl"
      />
    ),
  },
  {
    type: 'custom',
    id: 'experience',
    heading: 'Explore the iGUIDE Photos Report',
    background: 'surface',
    children: (
      <EmailReportEmbed
        html={photosReportEmail}
        label="Sample iGUIDE Photos Report email"
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
        label="iGUIDE Photos Report tools"
        align="left"
        tabs={[
          {id: 'overview', label: 'Overview', media: {type: 'embed', src: 'https://www.youtube.com/embed/ER5Z2z0TZCI', title: 'iGUIDE Photos Report overview'}},
          {
            id: 'embedding',
            label: 'Embedding Tool',
            media: {type: 'embed', src: 'https://www.youtube.com/embed/WtLzxWJQs64?si=ctsTYl11uyHZke4U', title: 'iGUIDE Embedding Tool'},
            title: 'Embedding Tool',
            text: (
              <p>
                The embedding tool allows users to create custom code that can be added to third-party websites. Embedding the iGUIDE directly into a
                website provides a contained interactive experience for the viewer, driving additional engagement and time on the page.
              </p>
            ),
          },
        ]}
      />
    ),
  },
]
