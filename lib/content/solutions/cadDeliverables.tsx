/** /iguide/cad-deliverables — copy, links and asset paths from the live page (checked 2026-10-07). */
import {book} from './shared'

export const cadDeliverables = {
  meta: {
    title: 'Accurate CAD Deliverables for Design & Construction | iGUIDE',
    description:
      'Get LiDAR-accurate CAD drawings in DWG, DXF, and PDF — LOD 200, AIA standard layers, delivered in days. One site visit. No manual measurement. No return visits.',
    path: '/iguide/cad-deliverables',
    ogImage: '/assets/Solutions_Site-Plans.png',
  },
  hero: {
    heading: 'Accurate CAD deliverables for design and construction workflows',
    subheading: 'One site visit. LiDAR-accurate measurements. CAD outputs in DWG, DXF and PDF. Ready in days, not weeks.',
    ctas: [book()],
    embed: {
      src: 'https://gmail5402658.autodesk360.com/shares/public/SH286ddQT78850c0d8a4f364a8df23636f9e?mode=embed',
      title: 'Interactive CAD drawing sample (Autodesk viewer)',
    },
  },
  logos: {
    heading: 'Trusted by thousands of professionals worldwide',
    items: [
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-MC3-Design.png', alt: 'logo - MC3 Design'},
      {src: '/assets/make-it-right.svg', alt: 'logo - Make it Right'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-UCGC.png', alt: 'logo - UCGC'},
      {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'logo - BarBurrito'},
      {src: '/assets/Uploads/Scrolling-LogosLevco.png', alt: 'logo - Levco Builders'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-CS-Construction.png', alt: 'logo - CS Construction'},
      {src: '/assets/Pizza-Pizza-Logo.png', alt: 'logo - Pizza Pizza'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Harder-Build-Construction.png', alt: 'logo - Harder Build Construction'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Hills-Group.png', alt: 'logo - Hills Group'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Levitech-Acrchitects-Builders.png', alt: 'logo - Levitch Associates Inc.'},
      {src: '/assets/Uploads/CCS-Logo.png', alt: 'logo - CCS'},
      {src: '/assets/Uploads/RJM-Logo.png', alt: 'logo - RMJ'},
      {src: '/assets/Uploads/Sheffield-Homes-logo-v3.png', alt: 'logo - Sheffield Homes'},
      {src: '/assets/Uploads/Max-Returns-44.png', alt: 'logo - Max Returns Real Estate Investments'},
      {src: '/assets/Uploads/Tetsimonial-Logo-Master-Trades-Group.png', alt: 'logo - Master Trades Group'},
    ],
  },
  standards: {
    heading: 'Built to the standards your projects already require',
    body: 'Accurate from capture to drawing. No manual measurement. No return visits.',
    list: [
      'LOD 200 drawings with proper wall thicknesses and exterior spaces records',
      'AIA standard layers with labels, dimensions, and area totals',
      'Lidar-captured point cloud data for accurate drawings',
      'Fast delivery in days, not weeks',
    ],
    image: {src: '/assets/plotted-cropped.png', alt: 'CAD drawing', width: 960, height: 755},
  },
  adp: {
    heading: 'Available CAD deliverables and drawing outputs',
    subheading: 'Projects differ. So should your deliverables.',
    body: 'Start with the Advanced Drawing Package. Add only what your project needs.',
    listHeading: 'Every Advanced Drawing Package includes:',
    list: ['Plotted Drawings (PDF)', '3D Virtual Walkthrough', 'CAD Floor Plans (DWG)', 'LiDAR Point Cloud (DXF)'],
    cta: {
      label: 'Download drawing sample',
      href: 'https://planitar.sharepoint.com/:u:/s/iGUIDE-Resources-and-Assets/IQACZgIxsrJoT4e2YjfPZd-cAbpG2iksX_yaT9Ra9e3__ro?e=fgij9z',
      variant: 'secondary' as const,
    },
    image: {src: '/assets/Uploads/Advanced_Drawing_Package_Commercial-v2.png', alt: 'image - Advanced Drawing Package'},
  },
  addOns: {
    heading: 'Available add-ons',
    subheading: 'Add the specific drawings your team needs. Get exactly what fits your project.',
    tabs: [
      {
        id: 'cad-floor-plan',
        label: 'CAD Floor Plan',
        image: {src: '/assets/CS0001-Premium-Floor-Plans.png', alt: 'image - CAD Floor Plans'},
        title: 'CAD Floor Plan (DWG)',
        text: 'Drafted floor plan in DWG format with LOD 200 detail. Includes AIA standard layers, annotations and LiDAR point cloud data (DXF). Annotations are only included with iGUIDE Premium or Advanced Drawing Packages.',
      },
      {
        id: 'roof-plan',
        label: 'Roof Plan',
        image: {src: '/assets/CS0001-Roof-Plan.png', alt: 'image - Roof Plan'},
        title: 'Roof Plan',
        text: 'Drafted roof plan in DWG format. Includes slopes and roof edges of the primary structure. Requires iGUIDE Premium or Advanced Drawing Package.',
      },
      {
        id: 'exterior-elevations',
        label: 'Exterior Elevations',
        image: {src: '/assets/CS0001-Exterior-Elevations.png', alt: 'image - Exterior Elevations'},
        title: 'Exterior Elevations',
        text: 'Drafted exterior elevation drawings in DWG format, including front, rear and side building façades. Requires iGUIDE Premium or Advanced Drawing Package.',
      },
      {
        id: 'reflected-ceiling-plan',
        label: 'Reflected Ceiling Plan',
        image: {src: '/assets/RS0001-Reflected-Ceiling-Plans.png', alt: 'image - Reflected Ceiling Plan'},
        title: 'Reflected Ceiling Plan',
        text: 'Drafted reflected ceiling plan (DWG format) with elements like bulkheads, lighting and ceiling height indicators. Requires iGUIDE Premium or Advanced Drawing Package.',
      },
      {
        id: '3d-model',
        label: '3D Model',
        image: {src: '/assets/CS0001-3DModel-DWG.png', alt: 'image - 3D Model'},
        title: '3D Model',
        text: '3D model of drafted floors (Revit or DWG). Includes walls, doors, windows and basic structural elements. Requires iGUIDE Premium or Advanced Drawing Package.',
      },
    ],
  },
  testimonial: {
    quote: 'With iGUIDE, we kicked off new projects 50% faster and never had to go back to site.',
    name: 'John McKenna',
    role: 'Owner & Architect',
    company: 'MC3 Design',
    media: {
      type: 'embed' as const,
      src: 'https://www.youtube.com/embed/6VXKsBK0DnE?si=ld9xiZMbHFehmFWt&autoplay=1&mute=1&loop=1&playlist=6VXKsBK0DnE&controls=1&playsinline=1',
      title: 'MC3 Design customer story video',
    },
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {q: 'What types of buildings does iGUIDE support for CAD deliverables?', a: 'iGUIDE CAD deliverables are available for residential, commercial and mixed-use buildings. The system works well for projects up to mid-size commercial, including retail fit-outs, multi-unit dwellings, office interiors and renovation projects.'},
      {q: 'How accurate are iGUIDE CAD drawings?', a: 'iGUIDE CAD drawings are built from lidar-captured point cloud data with 0.5 percent or less typical distance measurement uncertainty. Measurements meet Alberta RMS and ANSI Z765-2013 standards, making them reliable for design, permitting and cost estimation.'},
      {q: 'What CAD deliverables does iGUIDE provide for design and construction projects?', a: "Every iGUIDE Advanced Drawing Package includes CAD floor plans (DWG), a LiDAR point cloud (DXF), plotted PDF drawings and a 3D virtual walkthrough. Add-ons such as Elevations, Ceiling Plans, Roof Plans and a 3D model (DWG or RVT) are available to match your project's scope."},
      {q: 'Can iGUIDE CAD files be used for permits, design and estimating?', a: "Yes. iGUIDE CAD files are drawn to LOD 200 with AIA-compliant layers, room labels and dimensions. They're suited for pre-design, tenant improvements, as-built documentation, permit submissions and cost estimation."},
      {q: 'How do I order iGUIDE CAD deliverables?', a: 'You can get iGUIDE CAD deliverables two ways: scan the property yourself with a PLANIX R1 camera system, or hire a local iGUIDE Operator through the ION Directory. Deliverables are ordered at processing and returned as project-ready files.'},
      {q: 'How is iGUIDE CAD pricing structured?', a: 'iGUIDE CAD deliverables are priced per project with no subscriptions or ongoing fees. You pay for the data you need and retain full ownership of all files. Visit the iGUIDE pricing page for current package and add-on pricing.'},
    ],
  },
  // "Starting designing" is the live wording
  cta: {heading: 'Starting designing sooner with accurate CAD drawings', ctas: [book('Book a 15-minute walkthrough')]},
}
