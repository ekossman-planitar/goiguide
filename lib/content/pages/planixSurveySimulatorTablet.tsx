/** /get-iguide/tools/planix-survey-simulator-tablet — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {HeroColumns} from '@/components/pages/HeroColumns'
import {SimulatorFrame} from '@/components/pages/SimulatorFrame'

export const meta = {
  title: 'Tablet Survey Simulator | iGUIDE',
  // NEW description (live had none)
  description:
    'Try the iGUIDE PLANIX experience online: look at panoramas and manipulate data in an interactive survey simulator sized like a typical tablet.',
  path: '/get-iguide/tools/planix-survey-simulator-tablet',
}

export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      // Live page has no h1; its heading is this h2
      <HeroColumns
        heading="Tablet Survey Simulator v1.1.1.1"
        aside={<SimulatorFrame src="https://d392iulwvs68wl.cloudfront.net/" title="iGUIDE PLANIX survey simulator (tablet)" device="tablet" />}
      >
        <p>
          This interactive simulator was designed to give you an opportunity to try out the iGUIDE PLANIX experience online. You can look at
          panoramas and manipulate data as though you were using the real thing. This version is meant to resemble the aspect ratio of a typical
          tablet.{' '}
          {/* Link target copied from live (legacy v1 host) */}
          <a href="https://v1.goiguide.com/planix-survey-simulator" className="text-primary underline underline-offset-2">
            Click here
          </a>{' '}
          to see a version that more closely resembles the experience of using a smartphone.
        </p>
      </HeroColumns>
    ),
  },
]
