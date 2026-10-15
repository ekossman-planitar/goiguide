/** /get-iguide/tools/how-to-iguide-analytics — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {EmailReportEmbed} from '@/components/pages/EmailReportEmbed'
import {html as analyticsEmail} from './emailSamples/iguideAnalyticsReport'

export const meta = {
  title: 'iGUIDE Analytics Overview | iGUIDE',
  description:
    'The iGUIDE Analytics Overview shows users how to gain in-depth insights into your iGUIDE’s performance and offers strategic insights into viewer behavior.',
  path: '/get-iguide/tools/how-to-iguide-analytics',
}

export const anchors = [
  {label: 'iGUIDE Analytics Overview', href: `${meta.path}#analytics`},
  {label: 'Additional detail', href: `${meta.path}#video`},
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGUIDE Analytics',
    media: {type: 'image', image: {src: '/assets/Uploads/agent-analytics-meeting-v2.jpg', alt: 'iGUIDE Analytics'}},
  },
  {
    type: 'custom',
    id: 'analytics',
    heading: 'iGUIDE Analytics Overview',
    subheading:
      'Gain in-depth insights into your iGUIDE’s performance by monitoring traffic sources, understanding customer behavior (first-time or returning users) and analyzing browsing duration. These aspects offer a holistic view of iGUIDE accessibility, audience demographics and content placement effectiveness.',
    // Annotated sample report (1200 × 2900 canvas scaled to fit); below 768px the live markup swaps in a screenshot
    children: <EmailReportEmbed html={analyticsEmail} label="Annotated sample iGUIDE Analytics report" scaleHeight={2900} />,
  },
  {
    type: 'custom',
    id: 'video',
    heading: 'An introduction to iGUIDE Analytics',
    children: (
      <MediaView media={{type: 'embed', src: 'https://www.youtube.com/embed/o3IttKzWM_0?si=ML04sKKYwITfTZ_h', title: 'An introduction to iGUIDE Analytics'}} />
    ),
  },
]
