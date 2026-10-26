import {GLOBAL_SITE_HREF} from './geo'
import {
  Aperture,
  BookOpen,
  Building2,
  CalendarDays,
  Camera,
  CirclePlay,
  ClipboardList,
  Download,
  DraftingCompass,
  FileText,
  HardHat,
  House,
  Images,
  LayoutDashboard,
  LifeBuoy,
  Map,
  Megaphone,
  MessagesSquare,
  MessageSquareQuote,
  Newspaper,
  PenLine,
  PenTool,
  Plug,
  Presentation,
  Rotate3d,
  Ruler,
  Search,
  ShieldCheck,
  UserSearch,
  type LucideIcon,
} from 'lucide-react'

/**
 * Main navigation (hard-coded for the demo).
 * Sub-link labels and URLs are copied from the live goiguide.com nav (checked 2026-10-06).
 * Descriptions are new draft copy, about 6 words each.
 */
export type NavLink = {label: string; href: string; description: string; icon: LucideIcon}

export type NavItem = {
  label: string
  /** Where the top-level item links to (also the mega menu's left-column link). */
  href: string
  /** Mega menu: left column intro + overview link, right column sub-links. */
  menu?: {
    description: string
    overviewLabel: string
    links: NavLink[]
  }
}

export const mainNav: NavItem[] = [
  {
    label: 'Solutions',
    // New /solutions overview (live: the top-level link went to Floor Plans)
    href: '/solutions',
    menu: {
      description: 'Everything you get from a single iGuide scan.',
      overviewLabel: 'Explore solutions',
      links: [
        {label: 'Floor Plans', href: '/iguide/floor-plans', description: 'Accurate, measured plans from every scan', icon: Ruler},
        {label: '3D Virtual Tours', href: '/iguide/3d-virtual-tours', description: 'Immersive walkthroughs anyone can explore online', icon: Rotate3d},
        {label: 'CAD Deliverables', href: '/iguide/cad-deliverables', description: 'Editable DWG, RVT and ESX files', icon: PenTool},
        {label: 'Xactimate Sketches', href: '/iguide/xactimate-sketches', description: 'Insurance-ready sketches for faster claims', icon: ClipboardList},
        {label: 'Site Plans', href: '/iguide/site-plans', description: 'Exterior site layouts for residential listings', icon: Map},
        {label: 'Integrations', href: '/iguide/integrations', description: 'Connect iGuide to the tools you use', icon: Plug},
        {label: 'Capture Hardware', href: '/camera-hardware', description: 'PLANIX cameras built for fast capture', icon: Camera},
        {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/', description: 'Hire a trained pro near you', icon: UserSearch},
      ],
    },
  },
  {
    label: 'Industries',
    // New URL: no Industries overview page exists on the live site yet
    href: '/industries',
    menu: {
      description: 'iGuide for every team that needs to measure, document and share spaces.',
      overviewLabel: 'Explore industries',
      links: [
        {label: 'Residential Real Estate', href: '/residential-real-estate', description: 'Win listings with floor plans and tours', icon: House},
        {label: 'Real Estate Photography', href: '/real-estate-photography', description: 'Add high-value deliverables to every shoot', icon: Aperture},
        {label: 'Architecture & Remodeling', href: '/architecture-engineering-construction', description: 'Measured existing conditions without the tape', icon: DraftingCompass},
        {label: 'Design & Construction', href: '/design-construction', description: 'Accurate as-builts to plan every project', icon: HardHat},
        {label: 'Insurance & Restoration', href: '/insurance-restoration', description: 'Document losses and speed up claims', icon: ShieldCheck},
        {label: 'Forensic Investigation', href: '/forensic-investigation', description: 'Preserve scenes with precise, measurable records', icon: Search},
        {label: 'Facility Management', href: '/facility-management', description: 'Keep space data current across buildings', icon: Building2},
      ],
    },
  },
  {
    label: 'Resources',
    href: '/resource-center',
    menu: {
      description: 'Guides, stories and tools to get more out of iGuide.',
      overviewLabel: 'Visit the Resource Center',
      links: [
        {label: 'Customer Stories', href: '/customer-stories', description: 'See how teams succeed with iGuide', icon: MessageSquareQuote},
        {label: 'Blog', href: '/blogs', description: 'Tips, trends and product updates', icon: PenLine},
        {label: 'Webinars', href: '/webinars', description: 'Live and on-demand expert sessions', icon: Presentation},
        {label: 'Events', href: '/events', description: 'Trade shows, webinars and workshops', icon: CalendarDays},
        {label: 'Videos', href: '/video', description: 'Watch iGuide in action', icon: CirclePlay},
        {label: 'Brochures', href: '/brochures', description: 'Product overviews to download and share', icon: BookOpen},
        {label: 'News', href: '/news', description: 'Company announcements and press releases', icon: Newspaper},
        {label: 'White Papers & eBooks', href: '/white-papers-and-ebooks', description: 'In-depth guides and industry research', icon: FileText},
        {label: 'iGuide Gallery', href: '/resources-and-media/iguide-gallery', description: 'Explore sample tours and floor plans', icon: Images},
      ],
    },
  },
  {
    label: 'Support',
    href: '/support',
    menu: {
      description: 'Help, training and tools for iGuide customers.',
      overviewLabel: 'Visit the Help Center',
      links: [
        {label: 'Training & Support', href: '/support', description: 'Help articles and training for customers', icon: LifeBuoy},
        {label: 'Client Portal', href: 'https://manage.youriguide.com/', description: 'Manage your iGuides, orders and account', icon: LayoutDashboard},
        {label: 'Forum', href: 'https://forum.goiguide.com/', description: 'Ask questions and learn from peers', icon: MessagesSquare},
        {
          label: 'Marketing Catalogue',
          href: '/support/marketing-catalogue',
          description: 'Materials to promote your iGuide services',
          icon: Megaphone,
        },
        {label: 'Downloads', href: '/downloads', description: 'Software and files for your workflow', icon: Download},
        {label: 'iGuide Gallery', href: '/resources-and-media/iguide-gallery', description: 'Explore sample tours and floor plans', icon: Images},
      ],
    },
  },
  {label: 'Pricing', href: '/pricing'},
]

export const headerButtons = {
  findPro: {label: 'Find a Pro', href: 'https://ion.goiguide.com/'},
  shop: {label: 'Shop now', href: 'https://store.goiguide.com/products/iguide-planix-r1'},
}

/**
 * Australia section (/au): its own top navigation. Mega menus are optional,
 * so these are plain links for now.
 */
export const auNav: NavItem[] = [
  {label: 'For agents', href: '/au/residential-real-estate'},
  {label: 'For photographers', href: '/au/real-estate-photography'},
  // Stops Australian visitors being sent back to /au from the global homepage
  {label: 'Global site', href: GLOBAL_SITE_HREF},
]
