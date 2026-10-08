/** /camera-hardware — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {SpecGroup} from '@/components/blocks/SpecsAccordion'

const bookDemo = {label: 'Book a demo', href: '/book-a-demo'}
const buyNow = {label: 'Buy now', href: 'https://store.goiguide.com/', variant: 'secondary' as const, newTab: true}

export const cameraHardware = {
  meta: {
    title: 'iGUIDE Camera System: Elevate Your 3D Virtual Tours & Floor Plans | iGUIDE',
    description:
      'Get next-level 3D virtual tours with the iGUIDE Camera System. Easy and accurate floor plans & stunning visuals to digitize any space. Click to explore!',
    path: '/camera-hardware',
    ogImage: '/assets/iGUIDE-Meta-Thumbnail.png',
  },
  hero: {
    heading: 'iGUIDE PLANIX R1 Camera System',
    subheading: 'Capture immersive images and precise measurements with every scan.',
    ctas: [bookDemo, buyNow],
    image: {src: '/assets/Uploads/Camera_Hardware_Header_72dpi-1.jpg', alt: 'iGUIDE PLANIX R1 camera system capturing a home interior'},
  },
  logos: [
    {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
    {src: '/assets/Uploads/Scrolling-LogosLevco.png', alt: 'logo - Levco Builders'},
    {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
    {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: 'logo - PuroClean'},
  ],
  angle: {
    heading: 'Experience every angle',
    body: 'Use the iGUIDE PLANIX R1 camera system to accurately document spaces and create an iGUIDE in minutes. Each iGUIDE provides:',
    list: ['An immersive 3D tour', 'Accurate lidar measurement within 0.5%', 'ANSI-Z765-2021 2D floor plans', 'Comprehensive documentation'],
    ctas: [{label: 'Book a Demo', href: '/book-a-demo'}, buyNow],
    video: {src: 'https://www.youtube.com/embed/waROUizarks?autoplay=1&mute=1', title: 'iGUIDE PLANIX R1 camera system video'},
  },
  why: {
    heading: 'Why choose iGUIDE?',
    cards: [
      {title: 'Fast', text: '3D virtual tours and 2D floor plans.', icon: {src: '/assets/Uploads/Icons_Processing-Time__FitMaxWzYwLDYwXQ.png', alt: ''}},
      {title: 'Accurate', text: 'Measurement within 0.5%.', icon: {src: '/assets/Uploads/Icons_Accurate__FitMaxWzYwLDYwXQ.png', alt: ''}},
      {title: 'Reliable', text: 'Easy one-button capture.', icon: {src: '/assets/Uploads/Icons_Reliable__FitMaxWzYwLDYwXQ.png', alt: ''}},
      {title: 'Secure', text: 'You control your data.', icon: {src: '/assets/Uploads/Icons_Secure__FitMaxWzYwLDYwXQ.png', alt: ''}},
    ],
  },
  steps: {
    heading: 'As easy as 1-2-3',
    steps: [
      {title: 'Capture', body: 'Connect your iGUIDE PLANIX R1 Camera to your smart device, create a new project and start scanning the property.'},
      {title: 'Process', body: 'Upload your data to the iGUIDE Portal where your iGUIDE 3D virtual tour, schematic floor plan, DWG, RVT or ESX files will be available once ready.'},
      {title: 'Utilize', body: 'Easily share your files, post on social media or upload to your website. iGUIDE file formats integrate with smart devices and web platforms.'},
    ],
  },
  elevate: {
    heading: 'Elevate your workflow with PLANIX R1!',
    cards: [
      {title: 'Improved visuals', text: 'Capture stunning visuals with improved color and contrast.', icon: {src: '/assets/Uploads/Home-Images-Superior-navigation-icon__FitMaxWzYwLDYwXQ.png', alt: ''}},
      {title: 'Compact & rugged design', text: 'Explore the compact and rugged design that easily integrates with the gear you love.', icon: {src: '/assets/Uploads/noun-compact-6130284-009CDE__FitMaxWzYwLDYwXQ.png', alt: ''}},
      {title: 'Effortless precision', text: 'Intuitive and easy to use, delivering the precise, accurate data you trust from iGUIDE.', icon: {src: '/assets/Uploads/Icon-Property-Detail__FitMaxWzYwLDYwXQ.png', alt: ''}},
    ],
  },
  digitize: {heading: 'See how iGUIDE can digitize any space!', ctas: [bookDemo]},
  product: {
    heading: 'Explore the iGUIDE PLANIX camera systems',
    name: 'PLANIX R1',
    lead: 'Looking to create accurate floor plans and immersive 3D tours that are easy to navigate?',
    body: 'The iGUIDE PLANIX R1 camera system is for you! With a built-in time-of-flight lidar scanner, the camera’s accuracy exceeds commercial and residential industry standards.',
    quote: {text: 'iGUIDE’s new PLANIX R1 is a game-changer—faster, more capable, and essential to our success. It’s a clear winner!', by: 'Doug Logan, Fine Homes Photography'},
    stepsHeading: 'To capture a property, it’s a simple 3 step process:',
    steps: [
      ['Capture', 'Connect your iGUIDE PLANIX R1 camera system to your smart device via the iGUIDE PLANIX mobile app, create a new project and start scanning the property.'],
      ['Process', 'Upload your data to the iGUIDE Portal where your iGUIDE 3D virtual tour, schematic floor plan, DWG or ESX files will be available once ready.'],
      ['Utilize', 'Easily share your files, post on social media or upload to your website. iGUIDE file formats integrate with smart devices and web platforms.'],
    ] as [string, string][],
    extraHeading: 'Did we mention?',
    extra: {before: '', link: {label: 'iGUIDE Processing', href: '/pricing'}, after: ' is per project with no subscription fees!'},
    ctas: [
      buyNow,
      {label: 'Find a distributor', href: '/operator#globalpartners', variant: 'secondary' as const},
      {label: 'Recommended accessories', href: 'https://store.goiguide.com/pages/recommended-camera-accessories', variant: 'secondary' as const},
    ],
    image: {src: '/assets/Uploads/PLANIX_R1_Front_72dpi.png', alt: 'iGUIDE PLANIX R1 camera system, front view'},
    specs: [
      {
        heading: 'Performance',
        rows: [
          ['Measurement Range', 'Up to 40m (approx. 130′)'],
          ['Typical Measurement Uncertainty', '+/- 25mm up to max range (raw point cloud), typically +/- 10mm from camera to wall (minimum 60cm wall length)'],
          ['Laser Scanner Field of View', '360°'],
          ['360° Camera', 'Ricoh THETA X'],
          ['Resolution', '11,008 x 5,504 (60MP)'],
        ],
      },
      {
        heading: 'Mechanical',
        rows: [
          ['System Unit Weight (without cover)', '725g (1.76lb)'],
          ['System Unit Weight (with cover)', '986g (2.2lb)'],
          ['System Unit Dimensions (without cover)', 'W: 9.90cm (3.90") x D: 7.75 cm (3.05") x H: 28.89cm (11.375")'],
          ['System Unit Dimensions (with cover)', 'W: 9.90cm (3.90") x D: 7.75 cm (3.05") x H: 29.53cm (11.625")'],
          ['Shipping weight (with carrying case, without packaging)', '1,996g (4.4lb)'],
          ['Carrying Case Dimensions', 'W: 57.15cm (22.5") x D: 15.24cm (6") x H: 13.97cm (5.5")'],
          ['Tripod Mounting Thread', '1/4-20'],
        ],
      },
      {
        heading: 'Connectivity & System Control',
        rows: [
          ['Wi-Fi', 'Wi-Fi 802.11 2.4GHz/5GHz Access Point'],
          ['Survey App', 'iGUIDE PLANIX Mobile App'],
        ],
      },
      {
        heading: 'Environmental',
        rows: [
          ['Operating Temperature Range', '5-40°C (41-104°F)'],
          ['Storage Temperature Range', '-20-60°C (-4-140°F)'],
          ['Relative Humidity', '0-90%'],
          ['Maximum Altitude (operating)', '2,000 m'],
        ],
      },
      {
        heading: 'Electrical',
        rows: [
          ['System Battery', '12V Li-Ion battery, user-replaceable'],
          ['System Power Supply', 'Input: USB-C 100-240VAC, 50-60Hz, 1.0A; Output: 12VDC, 1.8A'],
          ['System Battery Performance', 'Up to 6 hours of typical operation'],
        ],
      },
    ] as SpecGroup[],
  },
  specialist: {
    heading: 'Meet with an iGUIDE Specialist',
    text: 'Ready to experience the power of iGUIDE? Schedule a personalized demo with an iGUIDE Specialist.',
    ctas: [bookDemo],
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {q: 'What is the resolution of the iGUIDE PLANIX R1?', a: '11,008 x 5,504px or roughly 60MP.'},
      {q: 'What’s the difference between the iGUIDE PLANIX R1 and PLANIX Pro?', a: 'PLANIX R1 is smaller, lighter, faster and higher resolution than the PLANIX Pro. It also has a System Shield cover to protect the lenses during transit.'},
      {q: 'Is the PLANIX R1 drop or waterproof?', a: 'No, although it’s meant to be more durable when placed in a bag and carried but should never be dropped or exposed to moisture.'},
      {q: 'Why does the PLANIX R1 camera come with a soft case instead of a hard case?', a: 'The PLANIX R1 was designed to be durable and doesn’t require a hard transport case. The included soft case was chosen for its versatility and ease of use.'},
      {q: 'How do I get my data from the PLANIX R1 camera to my computer?', a: 'When using PLANIX R1 all project data is stored on the smart device used for capture. Data can be transferred via a USB cable or wirelessly if your phone/computer supports it.'},
      {q: 'Can I submit data to the iGUIDE Portal from my smart device?', a: 'When using the PLANIX App on iOS or Android, the PLANIX R1 can submit data to the iGUIDE Portal directly from the smart device used for capture. The process is much faster than with PLANIX Pro because with PLANIX R1, processing occurs parallel with capture, eliminating the need to process export.'},
      {q: 'What type of smart device should I use to control PLANIX R1?', a: 'Almost any iOS or Android device of any size or shape can control the PLANIX R1. However, because the smart device is used to store project data it’s a good idea to use a device that has at least 16GB of storage.'},
      {
        q: 'What type of tripod should I use with the PLANIX R1 camera?',
        a: (
          <>
            <p>The PLANIX R1 is compatible with a wide variety of tripods. The following features are recommended:</p>
            <ul>
              <li>Ball head with integrated spirit level</li>
              <li>At least 10lb weight capacity</li>
              <li>Arca Swiss style quick release plate for easy set-up and take down</li>
              <li>Max height of 60” (153cm)</li>
            </ul>
          </>
        ),
      },
      {q: 'What do I need to do in the post-processing stage with iGUIDE?', a: 'iGUIDE proprietary software is used to process the data on your home computer. It automatically aligns and stitches panoramas for you. You can then make further changes and adjust colors if you wish.'},
      {q: 'How much time does post-processing take with iGUIDE?', a: 'Since the camera system uses auto white balance, auto exposure and auto alignment, most iGUIDE operators spend as little as 2-3 minutes in our post processing software “Stitch” before sending us the data. Additional time is needed for processing still images for the image gallery and will depend on your individual preferences and workflow.'},
      {
        q: 'How can I get an iGUIDE 3D virtual tour and floor plan without buying a camera?',
        a: (
          <p>
            We have a network of iGUIDE Service Operators available to help.{' '}
            <a href="https://ion.goiguide.com/">Visit our iGUIDE Service Operator map</a> to find one close to you.
          </p>
        ),
      },
      {q: 'What is the battery life of the iGUIDE PLANIX camera system?', a: 'The iGUIDE PLANIX camera system has a typical battery life of 7 hours.'},
      {q: 'Does iGUIDE PLANIX camera system have a warranty?', a: 'Yes. The warranty for the iGUIDE PLANIX camera system is one year for parts, materials and workmanship.'},
      {q: 'Can I edit my iGUIDE panoramas?', a: 'The camera images are saved as JPEGs and can be modified in any image-processing software (e.g. to edit your mirror reflections) prior to being automatically stitched into panoramas in Planitar proprietary software.'},
      {
        q: 'Where can I find iGUIDE training and support materials?',
        a: (
          <p>
            We have an online training library with videos, articles and step-by-step instructions hosted on our{' '}
            <a href="https://help.youriguide.com/">iGUIDE Help Center</a>.
          </p>
        ),
      },
      {q: 'Are there financing plans available?', a: 'Yes. We have partners with Bread Financial for U.S. purchases and RBC PayPlan in Canada. For more additional details visit our store financing page.'},
      {q: 'Does the iGUIDE PLANIX camera system perform in low light settings?', a: 'The iGUIDE PLANIX camera system performs well in low-light settings. The camera system can brighten darker spaces by utilizing its HDR (High Dynamic Range).'},
      {q: 'Can I return the iGUIDE PLANIX camera system?', a: 'Our return policy: Customer may return, at the expense of Customer, the first System ever purchased by Customer from Planitar within 30 days of the date of the original shipment provided that the System is in the original packaging and all shipping instructions provided by Planitar are followed. For clarity: (i) no returns are possible after the 30 day period; and (ii) this Return Policy does not apply to any subsequently purchased System or any System obtained through a trade-in program. If the System is returned within this timeframe and confirmed by Planitar to be in full working condition and not to be damaged, Planitar will provide a refund based upon the original payment method and paid amount. Customer agrees that the refund will exclude the following: (i) restocking fee equal to 15% of the original System price; (ii) original shipping costs to Customer, and (iii) cost of any repairs required to restore the System to full working condition, as deemed necessary by Planitar.'},
      {q: "Can I use my own 3D camera with iGUIDE's software?", a: 'No. iGUIDE technology is not compatible with third-party camera systems. Our proprietary iGUIDE PLANIX camera system is built and calibrated to accurately capture the data and information needed to generate iGUIDE 3D virtual tours, floor plans, and photos.'},
      {
        q: 'What can I use the iGUIDE PLANIX camera system for?',
        a: (
          <>
            <p>The iGUIDE PLANIX camera system is ideal for real estate, construction, insurance professionals and property managers who must capture high-quality images, floor plans and 3D tours of interior spaces.</p>
            <p>This system is specifically designed to streamline the creation process of comprehensive property documentation, allowing users to efficiently generate visual assets for marketing and informational purposes.</p>
            <p>With its advanced imaging capabilities and intuitive software integration, the iGUIDE PLANIX camera system facilitates the production of immersive virtual tours and detailed floor plans, enhancing the overall presentation and understanding of a property&apos;s layout and features.</p>
          </>
        ),
      },
    ],
  },
  testimonials: {
    heading: 'Trusted by industry professionals',
    quotes: [
      {quote: 'It used to take me over two-and-a-half hours to go into a home and just do measurements and manually insert them into floor plans. But, with iGUIDE, it was all so quick and easy. I have been able to grow my business by a whopping 375% using iGUIDE, and the cost of the camera has paid for itself a hundredfold, many times over!', logo: {src: '/assets/Uploads/Tetsimonial-Logo-Snap-Photo.png', alt: 'Snap Photo logo'}},
      {quote: 'By adding iGUIDE as a service, I had a well-rounded, complete solution to offer clients. So my capacity is at zero since I started offering iGUIDE.', logo: {src: '/assets/Uploads/scend-media.png', alt: 'Scend Media logo'}},
      {quote: "I made enough revenue to cover that in the first 10 weeks or something, it was crazy how quickly it paid for itself, and it's continued to generate a good degree of profit for me every single month since.", logo: {src: '/assets/Uploads/Tetsimonial-Logo-Nanaimo-Photo.png', alt: 'Nanaimo Photo logo'}},
      {quote: 'It [iGUIDE] was faster. It was lighter. It was smaller. It made more sense to me. The interface just made more sense to me.', logo: {src: '/assets/Uploads/Tetsimonial-Logo-Nashua-Video-Tours.png', alt: 'Nashua Video Tours logo'}},
    ],
  },
  hub: {
    heading: 'Discover our Knowledge Hub',
    cards: [
      {
        title: 'Planitar Launches Next-Gen PLANIX Camera: A Leap Forward in Space Capture Innovation',
        text: 'October 29, 2024 · Press releases, Featured stories',
        image: {src: '/assets/Uploads/PR_Header_Editorial_Image_1_300dpi-1__ScaleMaxWidthWzUzNV0.jpg', alt: ''},
        link: {label: 'Read more', href: '/news/planitar-launches-next-gen-planix-camera-a-leap-forward-in-space-capture-innovation'},
      },
      {
        title: 'iGUIDE PLANIX R1 Camera System - Technical Specifications',
        image: {src: '/assets/Uploads/2-3__ScaleMaxWidthWzUzNV0.png', alt: ''},
        link: {label: 'Download file', href: '/assets/Uploads/PLANIX_R1_Tech_Specs.pdf'},
      },
      {
        title: 'iGUIDE PLANIX R1 vs Pro: Comparison',
        image: {src: '/assets/Uploads/3-3__ScaleMaxWidthWzUzNV0.png', alt: ''},
        link: {label: 'Download file', href: '/assets/Uploads/PLANIX_PRO_R1_Tech_Specs_Comparison-1.pdf'},
      },
    ],
  },
  store: {
    heading: 'Store',
    text: 'Start taking control of your environments, digitally. Shop the iGUIDE store for latest products and pricing.',
    ctas: [{label: 'Shop now', href: 'https://store.goiguide.com/'}],
    image: {src: '/assets/Uploads/PLANIX_R1_Footer.png', alt: 'iGUIDE PLANIX R1 camera system'},
  },
}
