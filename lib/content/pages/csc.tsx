/** /csc — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {cscAnchors, cscBlocks, pastCompetitions, tourVideoLinks} from './cscShared'

export const meta = {
  title: 'CSC Student Design Challenge 2025 | iGuide',
  description: 'Construction Specifications Canada (CSC) Student Design Challenge 2025',
  path: '/csc',
}

const register = {label: 'Register now', href: 'https://www.karelo.com/register.php?BID=611&BT=10&Ev=23031', newTab: true}

export const anchors = cscAnchors(meta.path)

export const blocks: Block[] = cscBlocks({
  path: meta.path,
  hero: {
    heading: '2026 CSC Student Design Challenge',
    subheading: '50 Grand Avenue South',
    banner: {src: '/assets/Uploads/2023-csc.jpg', alt: 'CSC Student Design Challenge banner'},
    ctas: [register],
  },
  tour: {
    src: 'https://iguideradix.com/embed/50_grand_ave_s_cambridge_on?unbranded=1&bgcolor=FFFFFF',
    title: 'iGuide tour of 50 Grand Avenue South',
    links: [
      ...tourVideoLinks('Learn how to use advanced measurement.'),
      {label: 'Vertical Measurements', href: 'https://share.vidyard.com/watch/PU6x61tafD5Wj3hCRi15HA', variant: 'secondary', newTab: true},
    ],
  },
  downloads: [
    {title: 'PDF Floor Plans', icon: {src: '/assets/Uploads/PDF.png', alt: 'PDF floor plans', width: 565, height: 1077}, href: '/assets/csc/50_Grand_Ave_PDF.pdf', newTab: true},
    {title: 'DWG Floor Plans', icon: {src: '/assets/Uploads/DWG.png', alt: 'DWG floor plans', width: 565, height: 1077}, href: '/assets/csc/50_Grand_Ave_DWG.zip', newTab: true},
    {title: 'RVT Floor Plans', icon: {src: '/assets/Uploads/RVT-v2.png', alt: 'RVT floor plans', width: 565, height: 1077}, href: '/assets/csc/50_Grand_Ave_RVT.zip', newTab: true},
  ],
  map: {
    src: 'https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1450.3914881029298!2d-80.31792!3d43.36065!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDIxJzM4LjMiTiA4MMKwMTknMDQuNSJX!5e0!3m2!1sen!2sus!4v1668462197346!5m2!1sen!2sus',
    title: 'Map of 50 Grand Avenue South',
  },
  photos: {
    image: {src: '/assets/Screenshot-2024-07-14-at-10.43.56AM.png', alt: 'Property photos of 50 Grand Avenue South', width: 1952, height: 1592},
    download: {label: 'Download photos', href: '/assets/csc/50-Grand-Avenue-South-Photos.zip'},
  },
  about: {
    description: [
      'Founded in 2010, HIP Developments has always approached real estate development with a broad vision. We believe that it is our job to build more than real estate. It is our job to help build cities – especially in Waterloo Region.',
      'Cities are the habitat of the human spirit – small-scale enough to feel connected in and big enough to be a force of change the world. For those reasons, cities are growing in importance as society struggles with upheaval. As we lose faith in big, national institutions, the idea of better communities has become the new faith.',
      'City building is a collaborative effort by all sectors of society, and HIP accepts its role in this passionately. Yes, we build condominiums, but we also build public squares that encourage people to engage in play with perfect strangers. We commission art installations that reconnect citizens to our community’s stories. We roll up our sleeves and lead debate about community identity that can unite us all. We develop ways for kids to learn about Waterloo Region’s amazing lineage of creative problem-solving. We call these things our joy experiments because they have the potential bring us together in celebration.',
      'So, when we say we are “Building More Than Real Estate,” we mean we are active builders of the bridges that will turn Waterloo Region into a community worthy of everyone’s faith.',
    ],
    developer: {image: {src: '/assets/hp.jpg', alt: 'HIP Developments', width: 3707, height: 1675}, href: 'https://www.hipdevelopments.com/'},
  },
  competition: {
    website: {src: '/assets/CSC_website.png', alt: 'CSC Student Design Challenge website', width: 1920, height: 578},
    description: (
      <>
        <p>
          <a href="https://www.cscdesignchallenge.ca" target="_blank" rel="noopener noreferrer">
            Construction Specifications Canada (CSC)
          </a>{' '}
          Grand Valley and Toronto Chapters proudly present the 11th annual Student Design Competition open to all current post-secondary school
          students in Ontario with an interest in construction-related activities including architecture, landscape architecture, engineering,
          interior design, construction management, innovative products, and manufacturing. Entries can be submitted by individuals, or by teams
          consisting of up to 4 people.
        </p>
        <p>Competition Submission Deadline: Midnight, Monday, May 18, 2026</p>
      </>
    ),
    ctas: [
      register,
      {label: 'Download Competition Instructions', href: '/assets/csc/CSC-Student-Design-Challenge-2026-Documents.pdf', newTab: true},
    ],
    image: {src: '/assets/Uploads/csc2026.jpg', alt: '2026 CSC Student Design Challenge', width: 800, height: 661},
  },
  past: pastCompetitions,
})
