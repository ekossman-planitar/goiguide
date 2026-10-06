import {
  Aperture,
  BookOpen,
  Building2,
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
    // Live site: the "Solutions" top-level link goes to Floor Plans
    href: '/iguide/floor-plans',
    menu: {
      description: 'Everything you get from a single iGUIDE scan.',
      overviewLabel: 'Explore solutions',
      links: [
        {label: 'Floor Plans', href: '/iguide/floor-plans', description: 'Accurate, measured plans from every scan', icon: Ruler},
        {label: '3D Virtual Tours', href: '/iguide/3d-virtual-tours', description: 'Immersive walkthroughs anyone can explore online', icon: Rotate3d},
        {label: 'CAD Deliverables', href: '/iguide/cad-deliverables', description: 'Editable DWG, RVT and ESX files', icon: PenTool},
        {label: 'Xactimate Sketches', href: '/iguide/xactimate-sketches', description: 'Insurance-ready sketches for faster claims', icon: ClipboardList},
        {label: 'Site Plans', href: '/iguide/site-plans', description: 'Exterior site layouts for residential listings', icon: Map},
        {label: 'Integrations', href: '/iguide/integrations', description: 'Connect iGUIDE to the tools you use', icon: Plug},
        {label: 'Capture Hardware', href: '/camera-hardware', description: 'PLANIX cameras built for fast capture', icon: Camera},
        {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/', description: 'Hire a trained pro near you', icon: UserSearch},
      ],
    },
  },
  {
    label: 'Industries',
    // New URL: no Industries overview page exists on the live site yet
    href: '/industries',
    menu: {
      description: 'iGUIDE for every team that needs to measure, document and share spaces.',
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
      description: 'Guides, stories and tools to get more out of iGUIDE.',
      overviewLabel: 'Visit the Resource Center',
      links: [
        {label: 'Customer Stories', href: '/customer-stories', description: 'See how teams succeed with iGUIDE', icon: MessageSquareQuote},
        {label: 'Blog', href: '/blogs', description: 'Tips, trends and product updates', icon: PenLine},
        {label: 'Webinars', href: '/webinars', description: 'Live and on-demand expert sessions', icon: Presentation},
        {label: 'Videos', href: '/video', description: 'Watch iGUIDE in action', icon: CirclePlay},
        {label: 'Brochures', href: '/brochures', description: 'Product overviews to download and share', icon: BookOpen},
        {label: 'News', href: '/news', description: 'Company announcements and press releases', icon: Newspaper},
        {label: 'White Papers & eBooks', href: '/white-papers-and-ebooks', description: 'In-depth guides and industry research', icon: FileText},
        {label: 'iGUIDE Gallery', href: '/resources-and-media/iguide-gallery', description: 'Explore sample tours and floor plans', icon: Images},
      ],
    },
  },
  {
    label: 'Support',
    href: 'https://help.youriguide.com',
    menu: {
      description: 'Help, training and tools for iGUIDE customers.',
      overviewLabel: 'Visit the Help Center',
      links: [
        {label: 'Training & Support', href: 'https://help.youriguide.com', description: 'Help articles and training for customers', icon: LifeBuoy},
        {label: 'Client Portal', href: 'https://manage.youriguide.com/', description: 'Manage your iGUIDEs, orders and account', icon: LayoutDashboard},
        {label: 'Forum', href: 'https://forum.goiguide.com/', description: 'Ask questions and learn from peers', icon: MessagesSquare},
        {
          label: 'Marketing Catalogue',
          href: 'https://help.youriguide.com/hc/en-us/articles/28225392683154-iGUIDE-Marketing-Catalogue',
          description: 'Materials to promote your iGUIDE services',
          icon: Megaphone,
        },
        {label: 'Downloads', href: '/downloads', description: 'Software and files for your workflow', icon: Download},
        {label: 'iGUIDE Gallery', href: '/resources-and-media/iguide-gallery', description: 'Explore sample tours and floor plans', icon: Images},
      ],
    },
  },
  {label: 'Pricing', href: '/pricing'},
]

export const headerButtons = {
  findPro: {label: 'Find a pro', href: 'https://ion.goiguide.com/'},
  shop: {label: 'Shop Now', href: 'https://store.goiguide.com/'},
}
