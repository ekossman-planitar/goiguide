/** /csc/csc2019 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {competitionDescription, cscAnchors, cscBlocks, pastCompetitions, tourVideoLinks} from './cscShared'

export const meta = {
  title: 'CSC Student Design Challenge 2019 | iGUIDE',
  description: 'Construction Specifications Canada (CSC) Student Design Challenge 2019',
  path: '/csc/csc2019',
}

export const anchors = cscAnchors(meta.path)

const plans = {width: 623, height: 974}

export const blocks: Block[] = cscBlocks({
  path: meta.path,
  hero: {
    heading: '2019 CSC Student Design Challenge',
    subheading: '1655 Dupont',
    banner: {src: '/assets/Uploads/csc_2019_banner.jpeg', alt: '1655 Dupont Street, Toronto'},
  },
  tour: {
    src: 'https://youriguide.com/embed/1655_dupont_st_toronto_on?autostart=1&?unbranded=1&bgcolor=FFFFFF',
    title: 'iGUIDE tour of 1655 Dupont Street',
    links: tourVideoLinks('Learn how to use advanced measurements'),
  },
  downloads: [
    {title: 'PDF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_pdf.png', alt: 'PDF floor plans', ...plans}, href: '/assets/csc/Dupont.pdf'},
    {title: 'DXF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_dfx2.png', alt: 'DXF floor plans', ...plans}, href: '/assets/csc/Dupont_DXF.zip'},
    {title: 'SVG Floor Plans', icon: {src: '/assets/Uploads/floor_plans_svg.png', alt: 'SVG floor plans', ...plans}, href: '/assets/csc/Dupont_svg.zip'},
  ],
  map: {
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1443.1108657570596!2d-79.45617241774261!3d43.66435816113211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b343d9e19e23f%3A0x13491514c38be4f5!2s1655+Dupont+St%2C+Toronto%2C+ON+M6P+3S9!5e0!3m2!1sen!2sca!4v1550852169689',
    title: 'Map of 1655 Dupont St, Toronto',
  },
  photos: {image: {src: '/assets/csc/Screenshot-2024-07-16-at-1.10.15AM.png', alt: 'Property photos of 1655 Dupont Street', width: 1948, height: 1590}},
  about: {
    description: [
      'TAS is an unconventional impact company that uses real estate as a tool to drive profit and purpose. We are tackling climate change, broadening affordability and equity, and building social capital to create neighbourhoods– and ultimately cities – where people thrive and belong.',
      'We champion conversation and collaboration to push the boundaries of innovation and explore what is possible. We are an industry leader in impact-driven ground-up development and asset management.',
      'We manage a best-in-class private equity platform focused on the belief that profit is foundational, but not the only goal. As land use developers, we recognize the longstanding history of the lands on which we operate, and that Indigenous Peoples have cared for these lands since time immemorial.',
      'Our Reconciliation Action Plan reflects our current understanding of how we can best contribute to the important work of reconciliation and have the greatest impact.',
    ],
    developer: {image: {src: '/assets/csc/ras_buildr_2.jpg', alt: 'TAS', width: 1431, height: 430}, href: 'https://tasimpact.ca/portfolio/'},
  },
  competition: {
    website: {src: '/assets/csc/1655-Dupont.jpg', alt: 'CSC Student Design Challenge website', width: 1431, height: 430},
    description: <p>{competitionDescription}</p>,
    ctas: [{label: 'Download competition instructions', href: '/assets/csc/2019_Design_Challenge_Documents.pdf'}],
    image: {src: '/assets/csc/2019-csc-cover.jpg', alt: '2019 CSC Design Challenge instructions', width: 600, height: 496},
  },
  past: pastCompetitions,
})
