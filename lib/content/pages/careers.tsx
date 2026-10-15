/** /careers — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {BambooHrJobs} from '@/components/pages/BambooHrJobs'

export const meta = {
  title: 'Join Planitar: Lead the Way in PropTech Innovation | iGUIDE',
  description: "Join Planitar's team and lead PropTech innovation. Transform industries with cutting-edge tech. Start your journey today!",
  path: '/careers',
}

const deptImage = (src: string, alt: string) => ({type: 'image' as const, image: {src, alt, width: 1600, height: 800}})

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Careers at Planitar',
    subheading: 'Be at the forefront of property technology innovation',
    // Live hero background (/assets/Uploads/Careers-ImagesHeader.png) is not in /public; first department image used instead
    media: deptImage('/assets/Uploads/Careers-ImagesFull-wdith-image.png', ''),
  },
  {
    type: 'split',
    id: 'why-planitar',
    heading: 'Why work at Planitar?',
    body: (
      <>
        <p>With humble roots as a start-up in the Waterloo region, Planitar Inc. has become a global leader in the 3D tour and floor plan space.</p>
        <p>
          By leveraging state-of-the-art technologies like AI, lidar scanning, and 360° imagery, Planitar has taken iGUIDE to every corner of the
          world in a short time span.
        </p>
        <p>
          If you want to be a part of an exciting company with a modern, futuristic scope, look no further than Planitar! Join Planitar today and
          enjoy our hybrid work model, flexible hours, friendly people, open-door policy plus so much more.
        </p>
        <p>
          Planitar Inc. is an up-and-coming company with an upward trajectory that offers you, the employee, all the space you need to grow.
        </p>
      </>
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/Careers-ImagesImage-1.png', alt: '', width: 900, height: 760}},
  },
  {
    type: 'split',
    id: 'office',
    heading: 'Our office',
    body: (
      <>
        <p>
          In the center of Southern Ontario’s bustling tech corridor in Waterloo is Planitar Inc. headquarters. Our beautiful, chic office in the
          heart of the region’s tech hub sports a modern, open-floor design with a large, bright atrium cafeteria at its core with a fully stocked
          kitchen with tons of healthy snacks.
        </p>
        <p>
          Did we mention we’re dog-friendly? Our forward-thinking office has a wellness room and plenty of games for our employees’ enjoyment
          including a big-screen TV with an Xbox.
        </p>
        <p>As Planitar continues to grow, our office provides our team with the perfect environment to grow with it.</p>
      </>
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/Careers-ImagesImage-2-Temp.png', alt: '', width: 900, height: 760}},
    mediaSide: 'left',
    background: 'surface',
  },
  {
    type: 'featureTabs',
    id: 'departments',
    heading: 'Explore positions at Planitar by department',
    label: 'Departments at Planitar',
    items: [
      {
        id: 'drafting-operations',
        title: 'Drafting & Operations',
        text: (
          <p>
            Create the products iGUIDE is famous for. Draft spaces to produce iGUIDE’s world-renowned floor plans and sketches with
            industry-leading accuracy and attention to detail. Work with high-profile software integrations such as Xactimate, AutoCAD, and Revit.
            Leverage automated sequences and artificial intelligence to optimize workflows and provide our customers with the services they seek.
          </p>
        ),
        media: deptImage('/assets/Uploads/Careers-ImagesFull-wdith-image.png', ''),
      },
      {
        id: 'research-development',
        title: 'Research & Development',
        text: (
          <p>
            Have a hand in the development of our cutting-edge technology. Planitar’s ever-evolving hardware and software products provide
            tech-minded individuals with the canvas to dream and to dream BIG.
          </p>
        ),
        media: deptImage('/assets/Uploads/Careers-Images-Research-Dev.png', ''),
      },
      {
        id: 'sales-marketing',
        title: 'Sales & Marketing',
        text: (
          <p>
            Bring iGUIDE to the world with our Sales &amp; Marketing department. Take part in delivering riveting marketing materials to our broad
            range of audiences or interact firsthand with soon-to-be customers as a Sales team member.
          </p>
        ),
        media: deptImage('/assets/Uploads/Careers-Images-Sales-Marketing.png', ''),
      },
      {
        id: 'client-success',
        title: 'Client Success',
        text: (
          <p>
            Join the front lines of our public-facing Product Support department. Become an iGUIDE expert and assist our growing client base with
            friendly and informative customer service along every step of their journey.
          </p>
        ),
        media: deptImage('/assets/Uploads/Careers-Images-Client-Success.png', ''),
      },
    ],
  },
  {
    // id "apply" is linked from /about ("View open positions" → /careers#apply), as on live
    type: 'custom',
    id: 'apply',
    heading: 'Current positions',
    background: 'surface',
    children: <BambooHrJobs />,
  },
  {
    type: 'cards',
    id: 'knowledge-hub',
    heading: 'Discover our Knowledge Hub',
    align: 'center',
    columns: 3,
    cards: [
      {
        title: 'Best practices for creating floor plans and 3D virtual tours with iGUIDE',
        media: {
          type: 'image',
          image: {src: '/assets/Uploads/Best-practices-floor-plans-and-3D-virtual-tours__ScaleMaxWidthWzUzNV0.png', alt: '', width: 535, height: 285},
        },
        text: (
          <>
            <p>
              Creating floor plans and 3D virtual tours has become essential for real estate professionals in today’s digital age. These assets
              provide potential buyers with an immersive experience, allowing them to explore properties from the comfort of their own homes. One of
              the most popular platforms for creating these virtual tours is iGUIDE.
            </p>
            <p className="text-sm font-semibold text-gray-400">Residential Real Estate, Real Estate Photography</p>
          </>
        ),
        link: {label: 'Read more', href: '/blogs/best-practices-for-creating-floor-plans-and-3d-virtual-tours-with-iguide'},
      },
      {
        title: 'iGUIDE for Real Estate Agents',
        media: {
          type: 'image',
          image: {src: '/assets/Uploads/Brochure-TNs-iGUIDE-for-Real-Estate-Agents__ScaleMaxWidthWzUzNV0.png', alt: '', width: 535, height: 268},
        },
        text: <p className="text-sm font-semibold text-gray-400">Residential Real Estate, Real Estate Photography</p>,
        link: {label: 'Download file', href: '/assets/Uploads/brochures/iGUIDE_for_Real_Estate_Agents_Brochure.pdf', newTab: true},
      },
      {
        title: 'The Deft Group is revolutionizing property assessments with iGUIDE',
        media: {
          type: 'image',
          image: {
            src: '/assets/Customer-Stories-Updates-Aug-2025/Customer-Case-Study-Header-Deft-Dec-13__ScaleMaxWidthWzUzNV0.png',
            alt: 'logo - Deft Group',
            width: 400,
            height: 226,
          },
        },
        text: (
          <>
            <p>
              Jeremiah Kiefer of The Deft Group uses iGUIDE to complete insurance property assessments in a third of the time, cutting costs and
              building client trust with accurate, repeatable data.
            </p>
            <p className="text-sm font-semibold text-gray-400">Insurance &amp; Restoration</p>
          </>
        ),
        link: {label: 'Read more', href: '/customer-stories/the-deft-group-case-study'},
      },
    ],
  },
]
