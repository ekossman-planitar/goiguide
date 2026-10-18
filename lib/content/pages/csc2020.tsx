/** /csc/csc2020 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {competitionDescription, cscAnchors, cscBlocks, pastCompetitions, tourVideoLinks} from './cscShared'

export const meta = {
  title: 'CSC Student Design Challenge 2020 | iGuide',
  description: 'Construction Specifications Canada (CSC) Student Design Challenge 2020',
  path: '/csc/csc2020',
}

export const anchors = cscAnchors(meta.path)

const plans = {width: 623, height: 974}

export const blocks: Block[] = cscBlocks({
  path: meta.path,
  hero: {
    heading: '2020 CSC Student Design Challenge',
    subheading: '321 Courtland',
    banner: {src: '/assets/Uploads/csc_2020_banner.jpg', alt: '321 Courtland Avenue East, Kitchener'},
  },
  tour: {
    src: 'https://youriguide.com/embed/321_courtland_ave_e_kitchener_on?autostart=1&?unbranded=1&bgcolor=FFFFFF',
    title: 'iGuide tour of 321 Courtland Avenue East',
    links: tourVideoLinks('Learn how to use advanced measurement'),
  },
  winner: {
    team: 'OKO',
    school: {label: 'Conestoga College, Bachelor of Interior Design Program', href: 'https://www.conestogac.on.ca/'},
    image: {src: '/assets/2020_csc_winner.jpg', alt: 'Winning submission', width: 1431, height: 430},
  },
  downloads: [
    {title: 'PDF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_pdf.png', alt: 'PDF floor plans', ...plans}, href: '/assets/csc/321_Courtland.pdf', newTab: true},
    {title: 'DXF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_dfx2.png', alt: 'DXF floor plans', ...plans}, href: '/assets/csc/321_Courtland_DXF.zip', newTab: true},
    {title: 'SVG Floor Plans', icon: {src: '/assets/Uploads/floor_plans_svg.png', alt: 'SVG floor plans', ...plans}, href: '/assets/csc/321_Courtland_SVG.zip', newTab: true},
  ],
  map: {
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.054827473507!2d-80.48236928406223!3d43.438570879129244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf4e71e757215%3A0x6510a0c1acd1146b!2s321%20Courtland%20Ave%20E%2C%20Kitchener%2C%20ON%20N2G%202W1!5e0!3m2!1sen!2sca!4v1567093979798!5m2!1sen!2sca',
    title: 'Map of 321 Courtland Ave E, Kitchener',
  },
  photos: {image: {src: '/assets/Screenshot-2024-06-16-at-11.24.20PM.png', alt: 'Property photos of 321 Courtland Avenue East', width: 1962, height: 1602}},
  about: {
    description: [
      'Auburn Developments is redeveloping the former Schneider’s site to be a true mixed-use addition to the neighbourhood, including a range of low, mid and high-rise housing options; street-fronting retail spaces; and opportunities for a diversity of space for different employment uses.',
      'The non-residential uses will include retaining and repurposing some of the existing buildings on the site to create distinct, vibrant commercial spaces. Public streets will extend onto the site in a fashion that connects the existing neighbourhood fabric and breaks up the large site into smaller development blocks with a tree-lined public realm accommodating walking and cycling through the site.',
    ],
    renderings: {src: '/assets/Screenshot-2024-06-16-at-11.08.30PM.png', alt: 'Developer renderings', width: 2456, height: 1336},
    developer: {image: {src: '/assets/auburn_developer.jpg', alt: 'Auburn Developments', width: 1431, height: 430}, href: 'http://www.auburndev.com/neighbourhoods/the-metz/'},
  },
  competition: {
    website: {src: '/assets/csc_2020.jpg', alt: 'CSC Student Design Challenge website', width: 1200, height: 361},
    description: <p>{competitionDescription}</p>,
    ctas: [{label: 'Download competition instructions', href: '/assets/csc/2020_Design_Challenge_Documents.pdf', newTab: true}],
    image: {src: '/assets/Uploads/csc_instructions.jpg', alt: '2020 CSC Design Challenge instructions', width: 845, height: 698},
  },
  past: pastCompetitions,
})
