/** /csc/csc2018 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {competitionDescription, cscAnchors, cscBlocks, tourVideoLinks} from './cscShared'

export const meta = {
  title: '2018 CSC Student Design Challenge | iGUIDE',
  description:
    'Explore the Construction Specifications Canada (CSC) Student Design Competition entry for 2018, 48 Ontario St. N., Kitchener, Ontario.',
  path: '/csc/csc2018',
}

export const anchors = cscAnchors(meta.path)

const plans = {width: 623, height: 974}

export const blocks: Block[] = cscBlocks({
  path: meta.path,
  hero: {
    heading: '2018 CSC Student Design Challenge',
    subheading: '48 Ontario',
    banner: {src: '/assets/Uploads/img_003.jpg', alt: '48 Ontario Street North, Kitchener'},
  },
  // Live loads this tour with youriguide.com/js/embedded.js (url //youriguide.com/embed/48ontario?autostart=1, bgcolor FFFFFF)
  tour: {
    src: 'https://youriguide.com/embed/48ontario?autostart=1&bgcolor=FFFFFF',
    title: 'iGUIDE tour of 48 Ontario Street North',
    links: tourVideoLinks('Learn how to use advanced measurement'),
  },
  winner: {
    team: 'House of Tech & Blues',
    school: {label: 'UWaterloo', href: 'https://uwaterloo.ca/'},
    // Same image file as the 2020 page on live
    image: {src: '/assets/2020_csc_winner.jpg', alt: 'Winning submission', width: 1431, height: 430},
  },
  downloads: [
    {title: 'PDF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_pdf.png', alt: 'PDF floor plans', ...plans}, href: '/assets/csc/Ontario.pdf'},
    {title: 'DXF Floor Plans', icon: {src: '/assets/Uploads/floor_plans_dfx2.png', alt: 'DXF floor plans', ...plans}, href: '/assets/csc/Ontario_DXF.zip'},
    {title: 'SVG Floor Plans', icon: {src: '/assets/Uploads/floor_plans_svg.png', alt: 'SVG floor plans', ...plans}, href: '/assets/csc/Ontario_SVG.zip'},
  ],
  map: {
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.4579814534513!2d-80.49220368469705!3d43.45103497912873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf4f2c2019e43%3A0x16e1c3915af6ca24!2s48+Ontario+St+N%2C+Kitchener%2C+ON+N2H+4Y4!5e0!3m2!1sen!2sca!4v1551284953150',
    title: 'Map of 48 Ontario St N, Kitchener',
  },
  photos: {image: {src: '/assets/csc/Screenshot-2024-07-16-at-1.09.53AM.png', alt: 'Property photos of 48 Ontario Street North', width: 1946, height: 1582}},
  about: {
    description: [
      'Established in 2010, Voisin Capital is a developer of commercial real estate and proponent of adaptive reuse projects. It has led the selection, acquisition, financing, redevelopment, and leasing of more than 700,000 sf of space including Catalyst137, the world’s largest hardware technology innovation hub. Voisin Capital was founded by Frank Voisin, a third-generation real estate developer. Frank has a law degree and an MBA from the University of Western Ontario and is a past CFA charterholder.',
      'In the heart of Kitchener\'s Cultural District stands an iconic heritage building at 48 Ontario Street North known as the "Legion Building" and the "Birthplace of Kitchener Blues." In 2018, it will be restored and reimagined as a multi-use development inspired by the desires of today\'s top office tenants.',
    ],
    developer: {image: {src: '/assets/48ontario-1.jpg', alt: 'Voisin Capital', width: 1923, height: 671}, href: 'https://voisincapital.com/'},
  },
  competition: {
    // Live shows the 1655 Dupont image here (same file as the 2019 page)
    website: {src: '/assets/csc/1655-Dupont.jpg', alt: 'CSC Student Design Challenge website', width: 1431, height: 430},
    description: <p>{competitionDescription}</p>,
    ctas: [{label: 'Download competition instructions', href: '/assets/csc/2018_Design_Challenge_Documents.pdf', newTab: true}],
    image: {src: '/assets/csc/2018_csc_instructions_image-800x661.jpg', alt: '2018 CSC Design Challenge instructions', width: 800, height: 661},
  },
})
