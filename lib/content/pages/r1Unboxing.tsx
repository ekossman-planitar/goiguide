/** /r1-unboxing — copy and video from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'

export const meta = {
  title: 'R1 Unboxing Social Contest Rules & Regulations | iGuide',
  // NEW description (live had none)
  description:
    'Rules and regulations for the iGuide PLANIX R1 unboxing social contest on Instagram (contest period November 14, 2024 to November 29, 2024).',
  path: '/r1-unboxing',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    // Live page has no h1 (its only heading is the h2 "Rules & Regulations:"); the h1 uses the live page title
    heading: 'R1 Unboxing Social Contest Rules & Regulations',
    extra: (
      <>
        <h2 className="text-xl font-semibold text-ink">Rules &amp; Regulations:</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-body marker:font-semibold marker:text-primary">
          <li>Eligibility: Anyone who purchased the PLANIX R1.</li>
          <li>Record a short video of you unboxing your brand-new PLANIX R1 and share it to your Instagram story.</li>
          <li>Tag @go_iguide</li>
          <li>
            That&apos;s it! 3 winners will be randomly selected and will receive a PLANIX R1 branded hoodie PLUS 3 free iGuide Standards (up to 3000
            sqft each). iGuides must be redeemed within 90 days of receiving them.
          </li>
          <li>Contest period: November 14, 2024 to November 29, 2024.</li>
          <li>Winners will be contacted via email on December 2, 2024.</li>
        </ol>
      </>
    ),
    media: {type: 'video', src: '/assets/Uploads/Unbox-contest-revised-vid.mp4', label: 'PLANIX R1 unboxing contest video'},
  },
]
