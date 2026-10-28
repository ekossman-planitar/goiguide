/**
 * Content for /about-preview/leadership (draft, Evan 2026-10-27). Bios from the "Meet the Leaders" copy doc in the new
 * format. Quick fire and "most used app" are left out (Evan). Photos and LinkedIn links are the ones on the live /about page.
 * Jessica Creces: title, photo, LinkedIn and what she leads at iGuide are still to be confirmed.
 */
import type {Leader} from '@/components/about/LeadershipGrid'

export const meta = {
  title: 'Meet our leaders | iGuide',
  description: 'Meet the leadership team steering iGuide into its next chapter.',
  path: '/about-preview/leadership',
}

export const leaders: Leader[] = [
  {
    name: 'Jarrad Morden',
    title: 'CEO',
    photo: {src: '/assets/about-jarrad-image.png', alt: 'Jarrad Morden'},
    linkedin: 'https://www.linkedin.com/in/jarradmorden',
    short:
      'Jarrad leads iGuide with a simple goal: make visual floor plans the universal language of property. Since joining in 2020, he’s led operations, drafting, support and sales as VP of Operations and then COO/CSO, before stepping up to CEO in 2025. Before iGuide, he spent over two decades leading teams in industrial metrology, automation and robotics at NDI, Nikon Metrology and Virtek, so getting measurements right has been his thing for a long time.',
    human: 'An engineer with a kinesiology degree and patents in laser projection. He can measure your room and your stride.',
  },
  {
    name: 'Skylar Lawrence-LeBel',
    title: 'VP, Growth',
    photo: {src: '/assets/about-skylar-image.png', alt: 'Skylar Lawrence-LeBel'},
    linkedin: 'https://www.linkedin.com/in/skylarlebel',
    short:
      'Skylar leads marketing, product and growth at iGuide, making sure what we build, how we sell it and how customers experience it all pull in the same direction. He helped support REA Group’s majority acquisition of the company. Before iGuide, he led marketing at robotics scale-up Avidbots through its global expansion and $70M USD Series C, after years at top Canadian agencies creating award-winning work for brands like BMW, CIBC and Coca-Cola.',
    human: 'A former competitive golfer who still sneaks onto the course whenever two kids and two Chihuahuas allow it.',
  },
  {
    name: 'Michael Brown',
    title: 'VP, Engineering',
    photo: {src: '/assets/about-mb-image.png', alt: 'Michael Brown'},
    linkedin: 'https://www.linkedin.com/in/michael-brown-3b09ba96/',
    short:
      'Michael leads the engineering and product teams behind everything iGuide captures and delivers, from 3D tours to floor plans and measurements. Before iGuide, he was VP of Technology at Auvik, where he designed a platform handling data from millions of devices, and before that he spent 13 years at BlackBerry building everything from secure email to one of the first social apps on mobile. He’s an inventor on more than 100 issued patents, which comes in handy when the job is turning big ideas into products people rely on.',
    human: 'Holds a master’s in quantum computing and led the build of Facebook for BlackBerry, so he’s watched a few futures arrive.',
  },
  {
    name: 'Matt Ignor',
    title: 'VP, Operations',
    photo: {src: '/assets/about-mi.png', alt: 'Matt Ignor'},
    linkedin: 'https://www.linkedin.com/in/mattignor/',
    short:
      'Matt runs operations at iGuide, making sure every camera, capture and deliverable reaches customers on time and done right. He joined in 2026 from Miovision, where he spent 11 years working his way up from hardware lead to VP of Operations, leading a 100+ person team that delivered to more than 50 countries. Before that, he helped design BlackBerry smartphones, including the Bold and the Q10.',
    human: 'Started out as a tool maker apprentice working to tight tolerances, which turns out to be great training for iGuide.',
  },
  {
    name: 'Jessica Creces',
    // Title, photo and LinkedIn to confirm
    short:
      'Jessica brings more than 25 years of experience growing technology and media businesses, with leadership roles at BlackBerry, D2L, Christie Digital and RBC, and most recently as SVP of Retail & Media at Creative Realities. She’s known for turning data into sharp strategy and building partnerships that deliver real value.',
    human: 'A computer scientist turned tech strategist, so yes, she’ll want to see the data.',
  },
]

/** "As seen in" press and events come from Sanity (As seen in, under Logos). Shown as placeholder tiles until some are added. */
export type PressItem = {_id: string; name: string; kind?: string; url: string; logo: string; dims?: {width: number; height: number}}
