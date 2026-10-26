/** /csc/csc2021 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {competitionDescription, cscAnchors, cscBlocks, pastCompetitions, tourVideoLinks} from './cscShared'

export const meta = {
  title: 'CSC Student Design Challenge 2021 | iGuide',
  description: 'Construction Specifications Canada (CSC) Student Design Challenge 2021',
  path: '/csc/csc2021',
}

export const anchors = cscAnchors(meta.path)

const plans = {width: 623, height: 858}

export const blocks: Block[] = cscBlocks({
  path: meta.path,
  hero: {
    heading: '2021 CSC Student Design Challenge',
    subheading: '498 Eagle',
    banner: {src: '/assets/Uploads/498Eagle_banner.jpg', alt: '498 Eagle Street North, Cambridge'},
  },
  tour: {
    src: 'https://youriguide.com/embed/498_eagle_st_n_cambridge_on?unbranded=1&autostart=1&bgcolor=FFFFFF',
    title: 'iGuide tour of 498 Eagle Street North',
    links: tourVideoLinks('Measurement guide'),
  },
  downloads: [
    {title: 'PDF Floor Plans', icon: {src: '/assets/csc/pdf_icon.png', alt: 'PDF floor plans', ...plans}, href: '/assets/csc/Woollen_Mills_PDF.pdf'},
    // "DXG" is the live heading text (the file is DXF)
    {title: 'DXG Floor Plans', icon: {src: '/assets/csc/dxf_icon.png', alt: 'DXF floor plans', ...plans}, href: '/assets/csc/Woollen_Mills_DXF.zip'},
    {title: 'SVG Floor Plans', icon: {src: '/assets/csc/svg_icon.png', alt: 'SVG floor plans', ...plans}, href: '/assets/csc/Woollen_Mills_SVG.zip'},
  ],
  map: {
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1449.3646288389205!2d-80.35871044155209!3d43.40358799478271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b898cd85f18a9%3A0x537fec32fc793297!2s498%20Eagle%20St%20N%2C%20Cambridge%2C%20ON%20N3H%201C2%2C%20Canada!5e0!3m2!1sen!2sus!4v1605650693553!5m2!1sen!2sus',
    title: 'Map of 498 Eagle St N, Cambridge',
  },
  photos: {image: {src: '/assets/csc/Screenshot-2024-07-16-at-1.12.04AM.png', alt: 'Property photos of 498 Eagle Street North', width: 1952, height: 1592}},
  about: {
    description: [
      'Forge & Foster is committed to generating positive social and economic value for communities, tenants, investors, and other stakeholders through commercial real estate projects in Hamilton and across Southern Ontario. We bring vitality to cities as a leading value-add commercial real estate investment management company.',
      'Originally a textile and dry goods import hub, the property is best known for its second use as one of the leading Canadian wool mills.',
      'The Woollen Mills will remain at the forefront of industry in the area. Our focus is to recreate the property as an innovation district that provides a variety of spaces to young companies and entrepreneurs who are changing the shape of their respective industries.',
      'With office and flex space, as well as massive potential for future developments, Woollen Mills is the perfect home for tenants like innovators moving out of their garage, or thriving organizations looking to customize a standalone four storey office for their next headquarters.',
    ],
    renderings: {src: '/assets/csc/Screenshot-2024-07-16-at-1.47.51AM.png', alt: 'Developer renderings', width: 2180, height: 1768},
    developer: {image: {src: '/assets/csc/forge_foster_developer.jpg', alt: 'Forge & Foster', width: 1431, height: 430}},
  },
  competition: {
    website: {src: '/assets/csc/csc_2021.jpg', alt: 'CSC Student Design Challenge website', width: 1200, height: 361},
    description: <p>{competitionDescription}</p>,
    ctas: [{label: 'Get instructions', href: '/assets/csc/2021_Design_Challenge_Documents.pdf'}],
    image: {src: '/assets/csc/csc_instructions_2021.jpg', alt: '2021 CSC Design Challenge instructions', width: 800, height: 661},
  },
  past: pastCompetitions,
})
