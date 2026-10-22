/**
 * Marketing Catalogue (/support/marketing-catalogue). Files are hosted in HubSpot
 * (Files → Marketing Catalogue), from the list Evan's team exported on 2026-10-16.
 * Items with several versions (currency, orientation, commercial/residential) are
 * grouped into one card with a button per version.
 * Audience tags drive the "Who it's for" filter.
 */

export const MARKETING_CATALOGUE_SUPPORT_PATH = '/support/marketing-catalogue'
export const MARKETING_CATALOGUE_GETTING_STARTED_PATH = `${MARKETING_CATALOGUE_SUPPORT_PATH}/getting-started`
export const HELP_CENTER_URL = '/support'
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@iGUIDEtv'

export type CatalogueCategoryId = 'brochures' | 'one-pagers' | 'presentations' | 'ebooks' | 'checklists' | 'photos' | 'videos' | 'drawing-samples'
export type CatalogueAudience = 'real-estate' | 'commercial' | 'insurance' | 'australia'

export const catalogueCategories: {id: CatalogueCategoryId; label: string; description: string}[] = [
  {id: 'brochures', label: 'Brochures & flyers', description: 'Customizable templates: add your company logo and contact details.'},
  {id: 'one-pagers', label: 'One-pagers', description: 'Single-page overviews of iGuide services and pricing.'},
  {id: 'presentations', label: 'Presentations', description: 'Customizable decks to showcase iGuide packages and services. Update the pricing and contact slides before you present.'},
  {id: 'ebooks', label: 'eBooks', description: 'In-depth guides to help you grow your iGuide business.'},
  {id: 'checklists', label: 'Checklists', description: 'Share with clients before a scan so every capture goes smoothly.'},
  {id: 'photos', label: 'Photos', description: 'Industry-specific image collections (ZIP) to promote your iGuide services.'},
  {id: 'videos', label: 'Videos', description: 'Promo videos and social reels in landscape and portrait formats.'},
  {id: 'drawing-samples', label: 'Drawing samples', description: 'Sample CAD deliverables (ZIP) for commercial and residential projects.'},
]

export const catalogueAudiences: {id: CatalogueAudience; label: string}[] = [
  {id: 'real-estate', label: 'Real estate'},
  {id: 'commercial', label: 'Commercial & AEC'},
  {id: 'insurance', label: 'Insurance & restoration'},
  {id: 'australia', label: 'Australia'},
]

export type CatalogueCampaignId = 'site-plans' | 'agent-campaign' | 'australia-launch'

/** Campaign kits: the videos and one-pagers for one campaign, shown together when picked */
export const catalogueCampaigns: {id: CatalogueCampaignId; label: string; description: string; image: string}[] = [
  {
    id: 'site-plans',
    label: 'Site Plans + Branded Property Overviews',
    description: 'Videos and one-pagers to promote Site Plans and Branded Property Overviews to agents.',
    image: '/assets/marketing-catalogue/video-site-plans-pool.webp',
  },
  {
    id: 'agent-campaign',
    label: 'Agent campaign: Sell smarter. Sell faster.',
    description:
      'Our Back to the Future–inspired campaign showing agents how iGuide helps them step into the future of real estate marketing with speed, precision and powerful visuals.',
    image: '/assets/marketing-catalogue/video-agent-listings-with-iguide-sell-39-faster-than-photos-alone.webp',
  },
  {
    id: 'australia-launch',
    label: 'iGuide Australia launch',
    description: 'Launch videos and an agent one-pager for listings on realestate.com.au.',
    image: '/assets/marketing-catalogue/au-complete-listing.webp',
  },
]

export type CatalogueFile = {label: string; href: string; format: string}
export type CatalogueAsset = {
  id: string
  title: string
  category: CatalogueCategoryId
  audiences: CatalogueAudience[]
  /** Sub-heading inside a category (videos) */
  group?: string
  note?: string
  /** One short line under the title */
  description?: string
  /** Campaign kit this belongs to (see catalogueCampaigns) */
  campaign?: CatalogueCampaignId
  /** Preview image (from the original Zendesk catalogue) */
  image?: {src: string; width: number; height: number}
  /** YouTube video shown with a play button instead of downloads */
  youtubeId?: string
  files: CatalogueFile[]
}

export const catalogueAssets: CatalogueAsset[] = [
  {
    id: "re-agent-brochure",
    description: "Leave-behind for agent meetings that shows what iGuide adds to their listings.",
    image: {src: "/assets/marketing-catalogue/re-agent-brochure.webp", width: 960, height: 633},
    title: "Real Estate Agent Brochure",
    category: "brochures",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/PDF-REP-Real-Estate-Agent-Brochure.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "listing-flyer-2024",
    description: "Hand to agents to show how an iGuide listing stands out from photos alone.",
    image: {src: "/assets/marketing-catalogue/listing-flyer-2024.webp", width: 960, height: 617},
    title: "2024 Real Estate Agent Listing Flyer",
    category: "brochures",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/PDF-2024-Listing-Flyer-Real-Estate-Agents.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "listing-brochure",
    description: "Editable brochure files you can brand with your logo and contact details.",
    image: {src: "/assets/marketing-catalogue/listing-brochure.webp", width: 960, height: 790},
    title: "iGuide Listing Brochure",
    category: "brochures",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/iGUIDE_Listing_Brochure.zip",
        format: "ZIP"
      }
    ],
    note: "Editable files (ZIP)"
  },
  {
    id: "cad-commercial",
    description: "Quote commercial CAD work with clear deliverables and pricing.",
    image: {src: "/assets/marketing-catalogue/cad-commercial.webp", width: 960, height: 640},
    title: "Commercial CAD Solutions",
    category: "one-pagers",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "CAD $ pricing",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/iGUIDE_CAD_Solutions_Commercial_CAD.pdf",
        format: "PDF"
      },
      {
        label: "USD $ pricing",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/iGUIDE_CAD_Solutions_Commercial_USD.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "cad-residential",
    description: "Quote residential CAD work with clear deliverables and pricing.",
    image: {src: "/assets/marketing-catalogue/cad-residential.webp", width: 960, height: 640},
    title: "Residential CAD Solutions",
    category: "one-pagers",
    audiences: [
      "commercial",
      "real-estate"
    ],
    files: [
      {
        label: "CAD $ pricing",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/iGUIDE_CAD_Solutions_Residential_CAD.pdf",
        format: "PDF"
      },
      {
        label: "USD $ pricing",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/iGUIDE_CAD_Solutions_Residential_USD.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "site-plans-photographers",
    description: "Pitch Site Plans as an add-on to grow your value per shoot.",
    campaign: "site-plans",
    image: {src: "/assets/marketing-catalogue/site-plans-photographers.webp", width: 960, height: 640},
    title: "Site Plans for Real Estate Photographers & Media Companies",
    category: "one-pagers",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/1-PAGER-REAL-ESTATE-PHOTOGRAPHERS-MEDIA-COMPANIES.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "site-plans-agents",
    description: "Show agents how Site Plans add exterior context to their listings.",
    campaign: "site-plans",
    image: {src: "/assets/marketing-catalogue/site-plans-agents.webp", width: 960, height: 640},
    title: "Site Plans for Real Estate Agents",
    category: "one-pagers",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/1-PAGER-REAL-ESTATE-AGENTS.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "au-complete-listing",
    description: "Show Australian agents how iGuide completes their realestate.com.au listing.",
    campaign: "australia-launch",
    image: {src: "/assets/marketing-catalogue/au-complete-listing.webp", width: 960, height: 392},
    title: "Complete Your Listing on realestate.com.au",
    category: "one-pagers",
    audiences: [
      "australia",
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/One-Pagers/Complete%20the%20listing%20w%20iGUIDE_1%20Pager.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "pres-residential",
    description: "Ready-made deck for pitching iGuide services to agents and brokerages.",
    image: {src: "/assets/marketing-catalogue/pres-residential.webp", width: 960, height: 455},
    title: "iGuide Residential Services Introduction 2024",
    category: "presentations",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Presentations/iGUIDE-Residential-Services_Introduction_2024.pptx",
        format: "PPTX"
      }
    ]
  },
  {
    id: "pres-commercial",
    description: "Ready-made deck for pitching iGuide to property managers and AEC firms.",
    image: {src: "/assets/marketing-catalogue/pres-commercial.webp", width: 960, height: 455},
    title: "iGuide Commercial Services Introduction 2024",
    category: "presentations",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Presentations/iGUIDE-Commercial-Services_Introduction-2024.pptx",
        format: "PPTX"
      }
    ]
  },
  {
    id: "pres-measurements",
    description: "Explain measurement standards and accuracy in your next office presentation.",
    image: {src: "/assets/marketing-catalogue/pres-measurements.webp", width: 960, height: 468},
    title: "iGuide Property Measurements Presentation",
    category: "presentations",
    audiences: [
      "real-estate",
      "commercial"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Presentations/iGUIDE%20-%20Property%20Measurements%20Presentation.pptx",
        format: "PPTX"
      }
    ]
  },
  {
    id: "ebook-revenue",
    description: "Ideas for new services that boost your income per property.",
    image: {src: "/assets/marketing-catalogue/ebook-revenue.webp", width: 960, height: 749},
    title: "7 Extra Revenue Streams with iGuide",
    category: "ebooks",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/eBooks/Extra%20revenue%20streams%20with%20iGUIDE.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "checklist-staging",
    description: "Send to sellers before a shoot so every room is ready to capture.",
    image: {src: "/assets/marketing-catalogue/checklist-staging.webp", width: 960, height: 799},
    title: "iGuide Staging Checklist",
    category: "checklists",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Checklists/iGUIDE-Staging-Checklist.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "checklist-walkthrough",
    description: "Use on site so nothing gets missed during a capture.",
    image: {src: "/assets/marketing-catalogue/checklist-walkthrough.webp", width: 960, height: 746},
    title: "iGuide Walkthrough Checklist",
    category: "checklists",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Checklists/iGUIDE-Walkthrough-Checklist.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "checklist-elevations",
    description: "Check site requirements before capturing for elevation drawings.",
    image: {src: "/assets/marketing-catalogue/checklist-elevations.webp", width: 960, height: 711},
    title: "Advanced Capture Requirements for Elevation Drawings",
    category: "checklists",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Checklists/Advanced-Capture-Requirements.pdf",
        format: "PDF"
      }
    ]
  },
  {
    id: "photos-rre",
    description: "Residential imagery for your website, social posts and ads.",
    image: {src: "/assets/marketing-catalogue/photos-rre.webp", width: 960, height: 640},
    title: "Residential Real Estate Photos",
    category: "photos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Photos/iGUIDE_RRE_photos.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "photos-r1",
    description: "Product shots of the PLANIX R1 for your website and promotions.",
    image: {src: "/assets/marketing-catalogue/photos-r1.webp", width: 960, height: 811},
    title: "PLANIX R1 Photos",
    category: "photos",
    audiences: [
      "real-estate",
      "commercial",
      "insurance"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Photos/PLANIX-R1-Photos.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "photos-pro",
    description: "Product shots of the PLANIX Pro camera for your website and promotions.",
    image: {src: "/assets/marketing-catalogue/photos-pro.webp", width: 960, height: 502},
    title: "PLANIX Pro Camera Photos",
    category: "photos",
    audiences: [
      "real-estate",
      "commercial",
      "insurance"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Photos/iGUIDE_PLANIX_Pro_Camera_photos.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "photos-irc",
    description: "Insurance and restoration imagery for pitching adjusters and contractors.",
    image: {src: "/assets/marketing-catalogue/photos-irc.webp", width: 960, height: 639},
    title: "Insurance & Restoration Photos",
    category: "photos",
    audiences: [
      "insurance"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Photos/iGUIDE_IRC_photos.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "photos-ae",
    description: "Architecture and engineering imagery for pitching AEC clients.",
    image: {src: "/assets/marketing-catalogue/photos-ae.webp", width: 960, height: 571},
    title: "Architecture & Engineering Photos",
    category: "photos",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Photos/iGUIDE-CAD-Solutions-Hero-Images.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "yt-agent-campaign",
    description: "Share with agents to show how iGuide helps them sell faster.",
    campaign: "agent-campaign",
    title: "iGuide Agent Campaign: Sell Smarter. Sell Faster.",
    category: "videos",
    audiences: ["real-estate"],
    group: "Watch on YouTube",
    youtubeId: "QCyljwHFQK8",
    files: [
      {
        label: "Watch on YouTube",
        href: "https://www.youtube.com/watch?v=QCyljwHFQK8",
        format: "YOUTUBE"
      }
    ]
  },
  {
    id: "yt-au-launch",
    description: "Introduce iGuide to Australian agents and vendors.",
    campaign: "australia-launch",
    title: "iGuide Australia Launch",
    category: "videos",
    audiences: ["australia"],
    group: "Watch on YouTube",
    youtubeId: "E-7EWWJbPFg",
    files: [
      {
        label: "Watch on YouTube",
        href: "https://www.youtube.com/watch?v=E-7EWWJbPFg",
        format: "YOUTUBE"
      }
    ]
  },
  {
    id: "yt-planix-r1-launch",
    description: "Introduce the PLANIX R1 camera to clients and prospects.",
    title: "PLANIX R1 Launch Video",
    category: "videos",
    audiences: ["real-estate", "commercial", "insurance"],
    group: "Watch on YouTube",
    youtubeId: "q4CSPezTrPM",
    files: [
      {
        label: "Watch on YouTube",
        href: "https://www.youtube.com/watch?v=q4CSPezTrPM",
        format: "YOUTUBE"
      }
    ]
  },
  {
    id: "yt-planix-r1-capture",
    description: "Show clients how a capture works, start to finish.",
    title: "PLANIX R1 Capture Process",
    category: "videos",
    audiences: ["real-estate", "commercial", "insurance"],
    group: "Watch on YouTube",
    youtubeId: "0PycOakdKGQ",
    files: [
      {
        label: "Watch on YouTube",
        href: "https://www.youtube.com/watch?v=0PycOakdKGQ",
        format: "YOUTUBE"
      }
    ]
  },
  {
    id: "video-site-plans",
    description: "Post to social to promote Site Plans to agents.",
    campaign: "site-plans",
    image: {src: "/assets/marketing-catalogue/video-site-plans.webp", width: 960, height: 811},
    title: "Site Plans",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Landscape",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_BPO_Partner%20Version_Landscape.mp4",
        format: "MP4"
      },
      {
        label: "Portrait",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_BPO_Partner%20Version_Portrait.mp4",
        format: "MP4"
      },
      {
        label: "Portrait cutdown",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_BPO_Partner%20Version_Portrait_Cutdown.mp4",
        format: "MP4"
      }
    ],
    group: "Site Plans"
  },
  {
    id: "video-site-plans-pool",
    description: "Post to social to show how Site Plans present outdoor spaces.",
    campaign: "site-plans",
    image: {src: "/assets/marketing-catalogue/video-site-plans-pool.webp", width: 960, height: 811},
    title: "Site Plans: Home & Pool",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Landscape",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_BPO_Partner_Version_Landscape(home_with_pool).mp4",
        format: "MP4"
      },
      {
        label: "Portrait",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_BPO_Partner%20Version_Portrait(home_with_pool).mp4",
        format: "MP4"
      },
      {
        label: "Portrait cutdown",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE_SP_Partner_Version_Portrait_Cut(home_with_pool).mp4",
        format: "MP4"
      }
    ],
    group: "Site Plans"
  },
  {
    id: "video-agent-listings-with-iguide-sell-39-faster-than-photos-alone",
    description: "Short reel with a headline stat agents remember.",
    campaign: "agent-campaign",
    image: {src: "/assets/marketing-catalogue/video-agent-listings-with-iguide-sell-39-faster-than-photos-alone.webp", width: 960, height: 541},
    title: "Listings with iGuide Sell 39% Faster Than Photos Alone",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/Agent-Reel-Listings-with-iGUIDE-sell-39-percent-faster-than-photos-alone.mov",
        format: "MOV"
      }
    ],
    group: "Agent campaign reels"
  },
  {
    id: "video-agent-get-a-listing-do-over-with-iguide",
    description: "Short reel for agents whose listings need a refresh.",
    campaign: "agent-campaign",
    image: {src: "/assets/marketing-catalogue/video-agent-get-a-listing-do-over-with-iguide.webp", width: 960, height: 540},
    title: "Get a Listing Do-over with iGuide",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/Agent-Reel-Get-a-listing-do-over-with-iGUIDE.mov",
        format: "MOV"
      }
    ],
    group: "Agent campaign reels"
  },
  {
    id: "video-agent-start-harnessing-the-power-of-iguide",
    description: "Short reel that introduces iGuide to agents.",
    campaign: "agent-campaign",
    image: {src: "/assets/marketing-catalogue/video-agent-start-harnessing-the-power-of-iguide.webp", width: 960, height: 536},
    title: "Start Harnessing the Power of iGuide",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/Agent-Reel-Start-harnessing-the-power-of-iGUIDE.mov",
        format: "MOV"
      }
    ],
    group: "Agent campaign reels"
  },
  {
    id: "video-agent-r1-montage",
    description: "Quick PLANIX R1 montage for social posts.",
    campaign: "agent-campaign",
    image: {src: "/assets/marketing-catalogue/video-agent-r1-montage.webp", width: 800, height: 450},
    title: "R1 Montage",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/Agent-Reel-R1-montage.mov",
        format: "MOV"
      }
    ],
    group: "Agent campaign reels"
  },
  {
    id: "video-2d-furniture",
    description: "Instagram reel showing 2D furniture and objects, ready to post.",
    image: {src: "/assets/marketing-catalogue/video-2d-furniture.webp", width: 679, height: 960},
    title: "iGuide 2D Furniture & Objects Reel",
    category: "videos",
    audiences: [
      "real-estate"
    ],
    files: [
      {
        label: "Download",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE-2D-Furniture-and-Objects-IG-reel.mp4",
        format: "MP4"
      }
    ],
    group: "Product reels"
  },
  {
    id: "video-au-launch",
    description: "Launch videos for Australian social channels, in every format.",
    campaign: "australia-launch",
    title: "iGuide Australia Launch",
    category: "videos",
    audiences: [
      "australia"
    ],
    files: [
      {
        label: "Horizontal",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE%20AU%20Brand%20Launch%20Video.mp4",
        format: "MP4"
      },
      {
        label: "Vertical",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE%20AU%20Brand%20Launch%20Video%20-%20Vertical.mp4",
        format: "MP4"
      },
      {
        label: "Cutdown",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Videos/iGUIDE%20AU%20Brand%20Launch%20-%20Cutdown.mp4",
        format: "MP4"
      }
    ],
    group: "Australia"
  },
  {
    id: "drawing-advanced-drawing-package",
    description: "Show clients the full CAD package before they order.",
    image: {src: "/assets/marketing-catalogue/drawing-advanced-drawing-package.webp", width: 960, height: 768},
    title: "Advanced Drawing Package",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-Advanced-Drawing-Package.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-Advanced-Drawing-Package.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "drawing-floor-plans",
    description: "Sample CAD floor plans to share with prospective clients.",
    image: {src: "/assets/marketing-catalogue/drawing-floor-plans.webp", width: 960, height: 640},
    title: "Floor Plans",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-Floor-Plans.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-Floor-Plans.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "drawing-3d-model",
    description: "Sample 3D model to show what clients receive.",
    image: {src: "/assets/marketing-catalogue/drawing-3d-model.webp", width: 960, height: 640},
    title: "3D Model",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-3D-Model.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-3D-Model.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "drawing-exterior-elevations",
    description: "Sample exterior elevations to share with design and AEC clients.",
    image: {src: "/assets/marketing-catalogue/drawing-exterior-elevations.webp", width: 960, height: 640},
    title: "Exterior Elevations",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-Exterior-Elevations.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-Exterior-Elevations.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "drawing-reflected-ceiling-plans",
    description: "Sample reflected ceiling plans for fit-out and renovation clients.",
    image: {src: "/assets/marketing-catalogue/drawing-reflected-ceiling-plans.webp", width: 960, height: 640},
    title: "Reflected Ceiling Plans",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-Reflected-Ceiling-Plans.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-Reflected-Ceiling-Plans.zip",
        format: "ZIP"
      }
    ]
  },
  {
    id: "drawing-roof-plans",
    description: "Sample roof plans for roofing, solar and AEC clients.",
    image: {src: "/assets/marketing-catalogue/drawing-roof-plans.webp", width: 960, height: 640},
    title: "Roof Plans",
    category: "drawing-samples",
    audiences: [
      "commercial"
    ],
    files: [
      {
        label: "Commercial",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Commercial/Commercial-Roof-Plans.zip",
        format: "ZIP"
      },
      {
        label: "Residential",
        href: "https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Drawing%20Package%20Samples/Residential/Residential-Roof-Plans.zip",
        format: "ZIP"
      }
    ]
  }
]

/**
 * Getting started: demo tours operators can embed on their own website before
 * they have a property of their own to show. Tours already used as demos on
 * goiguide.com, shown unbranded (no agent or operator name and photo). Used on
 * /support/marketing-catalogue/getting-started. Confirm with product which tours
 * may be shared before launch.
 */
export const catalogueDemoTours: {id: string; label: string; description: string; src: string}[] = [
  {
    id: 'residential',
    label: 'Residential home with Site Plan',
    description: 'A single-family home with interior tour, floor plans and Site Plan.',
    src: 'https://youriguide.com/embed/334_south_lake_shore_drive_thousand_oaks?unbranded=1&autostart=1&bgcolor=FFFFFF',
  },
  {
    id: 'insurance',
    label: 'Insurance & restoration sample',
    description: 'A sample property documented for a claim.',
    src: 'https://youriguide.com/embed/urwkb_1121_sample_road_kitchener_on?unbranded=1&autostart=1&bgcolor=FFFFFF',
  },
  {
    id: 'commercial',
    label: 'Commercial facility',
    description: 'A commercial building captured for facility documentation.',
    src: 'https://youriguide.com/embed/v4H2RMIUYYJDD1?unbranded=1&autostart=1&bgcolor=FFFFFF',
  },
]

/** Getting started: the starter downloads (asset IDs above) for each step */
export const catalogueStarterKit: {title: string; text: string; assetIds: string[]; links?: {label: string; href: string}[]}[] = [
  {
    title: 'Prepare your first clients',
    text: 'Send the staging checklist before a shoot and use the walkthrough checklist on site.',
    assetIds: ['checklist-staging', 'checklist-walkthrough'],
  },
  {
    title: 'Start promoting your services',
    text: 'Leave a brochure with agents and use our photos on your website and social channels.',
    assetIds: ['re-agent-brochure', 'photos-rre'],
    links: [{label: 'iGuide Branding Guide', href: '/support/articles/28224993459730-iGUIDE-Branding-Guide'}],
  },
]
