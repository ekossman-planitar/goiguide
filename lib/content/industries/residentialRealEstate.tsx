/** /residential-real-estate — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {findPro, instantPackage, premiumPackage, realEstateLogos, standardPackage, tour} from './shared'

export const meta = {
  title: 'iGUIDE for Agents | The competitive edge in real estate | iGUIDE',
  description:
    'iGUIDE helps agents stand out with immersive 360° tours, accurate floor plans and data-driven tools that make listings more marketable and memorable.',
  path: '/residential-real-estate',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'The listing tool that gives agents a competitive edge',
    subheading:
      'From accurate floor plans to immersive 360° visuals, iGUIDE provides everything you need to market, sell and stand out in a competitive real estate market.',
    ctas: [
      findPro,
      {label: 'Download real estate brochure', href: '/assets/Uploads/brochures/iGUIDE_for_Real_Estate_Agents_Brochure.pdf', variant: 'secondary'},
    ],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/100_chattel_st_haverhill_ma?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF'),
      title: 'iGUIDE 3D tour of 100 Chattel St, Haverhill MA',
    },
  },
  {type: 'logos', heading: 'Trusted by thousands of real estate professionals worldwide', logos: realEstateLogos},
  {
    type: 'cards',
    id: 'benefits',
    heading: 'iGUIDE 3D virtual tours and floor plans help close sales',
    subheading:
      'Generate more leads, save valuable time and reduce costs by showcasing every property with immersive 3D tours, Site Plans and Branded Property Overviews.',
    cards: [
      {
        title: 'Generate leads',
        text: 'Gather feedback and qualified leads through immersive tours, Site Plans and Branded Property Overviews.',
        icon: {src: '/assets/Capture_qualified_leads.png', alt: 'icon - maginet'},
      },
      {
        title: 'Save time',
        text: 'Deliver property details in one platform with floor plans, Site Plans, dimensions and square footage.',
        icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'},
      },
      {
        title: 'Increase exposure',
        text: 'Stand out. Properties listed with iGUIDE receive more online exposure and attract a larger pool of potential buyers.',
        icon: {src: '/assets/forensics.svg', alt: 'icon - Photos'},
      },
      {
        title: 'Reduce costs',
        text: 'iGUIDE is a cost-effective way to deliver immersive tours, Site Plans and branded listing assets.',
        icon: {src: '/assets/Icons/tag.png', alt: 'icon - tag'},
      },
    ],
  },
  {
    type: 'quote',
    quote: {
      quote:
        'iGUIDE brought a unique convenience and comfort to our buyer’s search experience. Before seeing a property in person, they’re able to explore it virtually… understand the layout and space, take measurements and determine if it meets their needs.',
      name: 'Rachel Morgan',
      role: 'Broker & Co-founder',
      company: 'Morgan Wasley Group',
      photo: {src: '/assets/rachel_morgab.png', alt: 'photo - Rachel Morgan'},
    },
  },
  {
    type: 'split',
    heading: 'Tours show the home. Context shows the property.',
    body: <p>Interior tours show the home. Site Plans show how the home sits on the property, clearly and upfront.</p>,
    listHeading: 'What Site Plans add to the listing:',
    list: [
      'Shows how interior and exterior spaces connect',
      'Reduces buyer guesswork and follow-up questions',
      'Makes listings feel transparent, credible and complete',
    ],
    after: <p>When everything comes from one capture, buyers trust what they’re seeing and agents spend less time explaining.</p>,
    ctas: [
      {label: 'Hire an iGUIDE Pro to capture a Site Plan for you', href: 'https://ion.goiguide.com/'},
      {
        label: 'Download Site Plans & Branded Property Overview brochure',
        href: '/assets/brochures/1-PAGER-REAL-ESTATE-PHOTOGRAPHERS-MEDIA-COMPANIES.pdf',
        variant: 'secondary',
      },
    ],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&minfp=1&autostart=1&bgcolor=FFFFFF'),
      title: 'iGUIDE tour with Site Plan of 334 South Lake Shore Drive, Thousand Oaks',
      aspect: 'aspect-[4/3]',
    },
  },
  {
    type: 'featureTabs',
    id: 'deliverables',
    background: 'surface',
    heading: 'All-in-one property listing tool',
    subheading:
      'Homes with iGUIDE sell 39% faster than those with photos alone. iGUIDE gives buyers the confidence to act—before stepping inside the property.',
    label: 'iGUIDE listing features',
    items: [
      {
        id: 'branded-overviews',
        title: 'Put your brand on every listing—without extra work.',
        text: (
          <p>
            Branded Property Overviews turn your iGUIDE deliverables into a polished, client-ready presentation. Your branding stays front and
            center while buyers get a clear, professional overview of the property—inside and out.
          </p>
        ),
        link: {label: 'Download Branded Property Overview sample', href: '/assets/brochures/Branded_Floor_Plans_Final.pdf'},
        media: {type: 'image', image: {src: '/assets/Branded-Property-Overviews-Small.png', alt: 'photo - Branded Property Overview'}},
      },
      {
        id: 'visual-overview',
        title: 'A visual overview of the property',
        text: (
          <p>
            With each iGUIDE 3D Tour you’ll receive an accurate floor plan of the space whether it’s digital and used to navigate the tour or
            downloadable in a variety of file formats.
          </p>
        ),
        link: {label: 'Learn more', href: '/iguide/3d-virtual-tours'},
        media: {type: 'image', image: {src: '/assets/Uploads/Industries-Real-Estate-Lower-Image-1.png', alt: 'iGUIDE'}},
      },
      {
        id: 'floor-plans',
        title: 'Precise floor plans in an instant',
        text: (
          <p>
            Capture floor plans and 3D virtual tours in a single visit using the iGUIDE Camera System. It’s fast, accurate and provides flexible
            file types. Quickly create precise floor plans with area calculations that adhere to the ANSI-Z765-2021 and RECA RMS 2017 standards.
          </p>
        ),
        link: {label: 'Learn more', href: '/iguide/floor-plans'},
        media: {type: 'image', image: {src: '/assets/tablet.png', alt: 'iGUIDE'}},
      },
      {
        id: 'insights',
        title: 'Access important customer insights',
        text: (
          <p>
            Get a complete understanding of how your customers are finding each iGUIDE, who your visitors are and how long they’re staying. Once
            you’ve got this data, be sure to share these powerful insights.
          </p>
        ),
        link: {label: 'Learn more', href: '/get-iguide/tools/how-to-iguide-analytics'},
        media: {type: 'image', image: {src: '/assets/Uploads/Industries-Real-Estate-Lower-Image-3.png', alt: 'iGUIDE'}},
      },
      {
        id: 'flexmls',
        title: 'Flexmls integration for seamless listing management',
        text: (
          <p>
            With iGUIDE’s Flexmls integration, you can upload your Virtual Tour and automatically populate room details when creating or editing a
            listing—saving time, boosting visibility, and enhancing the buyer experience.
          </p>
        ),
        media: {type: 'image', image: {src: '/assets/Sample-Files/IGUIDE_Detailed.gif', alt: 'iGUIDE'}},
      },
    ],
  },
  {
    type: 'packages',
    id: 'packages',
    heading: 'Find the right fit for your next listing',
    subheading: 'See and compare what you get with each type of iGUIDE.',
    items: [instantPackage, standardPackage, premiumPackage],
  },
  {
    type: 'quotes',
    background: 'surface',
    heading: 'See how iGUIDE helps real estate professionals win more listings',
    link: {label: 'View all real estate customer stories', href: '/customer-stories?category=residential-real-estate'},
    quotes: [
      {
        quote:
          'iGUIDE is a crucial piece in our listing process — it gives us accurate square footage, helps buyers get a real feel for a home before stepping inside, and delivers an end product we’re always happy with.',
        name: 'Jim Gordon',
        role: 'Broker',
        company: 'Agent Gordon Team',
        media: {type: 'embed', src: 'https://www.youtube.com/embed/W3jqzsXLh2g', title: 'Jim Gordon, Agent Gordon Team, on iGUIDE'},
      },
      {
        quote:
          'iGUIDE gives buyers a comprehensive view of the home, provides me with accurate room measurements, and adds an important layer of safety and peace of mind for my clients.',
        name: 'Sarah Middleton',
        role: 'Real Estate Broker',
        company: 'Royal LePage',
        media: {type: 'embed', src: 'https://www.youtube.com/embed/r29fCSwLuIw', title: 'Sarah Middleton, Royal LePage, on iGUIDE'},
      },
      {
        quote:
          'Today’s sellers want sophisticated marketing solutions. iGUIDE fills the gap by giving us 3D tour and floor plans that buyers expect — and it’s incredibly simple to add to our listings.',
        name: 'Marty Fraser',
        role: 'Real Estate Agent',
        company: 'Bosley Real Estate Ltd.',
        media: {type: 'embed', src: 'https://www.youtube.com/embed/jDGitq0F6UI', title: 'Marty Fraser, Bosley Real Estate, on iGUIDE'},
      },
    ],
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'How does iGUIDE help buyers understand the full property, inside and out?',
        a: (
          <>
            <p>
              iGUIDE helps buyers understand more than just the interior of a home. In addition to immersive walkthroughs and floor plans, Site
              Plans show how the home sits on the property and how interior and exterior spaces connect, giving buyers the context they need
              upfront.
            </p>
            <p>By providing a clearer picture of the full property, iGUIDE helps reduce guesswork and supports more confident buyer decisions.</p>
          </>
        ),
      },
      {
        q: 'How does iGUIDE support agent branding in real estate listings?',
        a: (
          <>
            <p>
              iGUIDE supports agent branding through Branded Property Overviews, which present floor plans in a polished, agent-branded format.
              This helps agents deliver a consistent, professional listing experience while reinforcing their brand across every property they
              market.
            </p>
            <p>Branded Property Overviews are designed for presentation and clarity, complementing other iGUIDE listing assets generated from the same capture.</p>
          </>
        ),
      },
      {
        q: 'What is iGUIDE and how does it work?',
        a: 'iGUIDE is a comprehensive real estate platform that creates immersive 3D tours, floor plans and property measurement data. It consists of a specialized camera and software that work together to capture and process images of a property. The iGUIDE camera is placed in multiple locations within the property to capture 360-degree images, which are then stitched together to create a virtual tour, floor plan and photos.',
      },
      {
        q: 'How does iGUIDE benefit real estate agents?',
        a: 'iGUIDE helps real estate agents showcase properties more effectively by providing immersive 3D tours and accurate floor plans. This enables agents to attract more qualified buyers and streamline the selling process.',
      },
      {
        q: 'What are the advantages of using iGUIDE for home sellers?',
        a: 'For home sellers, iGUIDE offers a competitive edge by presenting their properties in a visually engaging and informative manner. The detailed 3D tours and floor plans can captivate potential buyers and lead to quicker sales.',
      },
      {
        q: 'Can iGUIDE be integrated with real estate listing websites?',
        a: 'iGUIDE can be seamlessly integrated with various real estate listing websites, enhancing property listings with interactive 3D tours and comprehensive visual content. This integration maximizes the exposure of properties to potential buyers.',
      },
      {
        q: 'Can iGUIDE be accessed by potential buyers remotely?',
        a: 'Yes, iGUIDE allows potential buyers to virtually explore properties from anywhere, providing a convenient and immersive experience without the need for physical visits. This is especially useful for out-of-town or busy buyers.',
      },
      {
        q: 'How does iGUIDE help in setting realistic buyer expectations?',
        a: "iGUIDE's detailed measurements and floor plans help set realistic buyer expectations by providing an accurate portrayal of the property's layout and dimensions. This reduces the likelihood of misunderstandings or disappointments during in-person viewings.",
      },
      {
        q: 'Is iGUIDE compatible with mobile devices?',
        a: 'Yes, iGUIDE is optimized for mobile devices, allowing users to access 3D tours, floor plans and photos on smartphones and tablets. This flexibility enables potential buyers to engage with property listings on the go.',
      },
    ],
  },
  {type: 'cta', heading: 'Find an iGUIDE Service Provider in your area', ctas: [findPro]},
]
