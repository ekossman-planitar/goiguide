import {
  Aperture,
  Building2,
  Camera,
  ClipboardList,
  Layers,
  LayoutDashboard,
  Map,
  Rocket,
  Rotate3d,
  Ruler,
  ScanLine,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react'

/**
 * Help Center homepage cards.
 * Row 1: the Zendesk categories (names, descriptions and order come from Zendesk; icons here).
 * Row 2: "Explore by product", a curated list pointing at Zendesk sections
 * (Evan, 2026-10-20). Section names and URLs come from Zendesk; the short
 * descriptions are new copy.
 */

/** Icon per Zendesk category id; new categories fall back to a book */
export const categoryIcons: Record<number, LucideIcon> = {
  27462998868498: Rocket, // Getting Started with iGUIDE
  27801109616146: ScanLine, // Capturing & Processing Your iGUIDE
  27801120402450: Map, // Working with iGUIDE Tours & Floor Plans
  27801149402642: ClipboardList, // Managing Your Projects & Deliverables
  27801181528210: Ruler, // Accuracy, Standards & Outputs
  27801200307602: Building2, // Industry-Specific Workflows
}
export {BookOpen as defaultCategoryIcon} from 'lucide-react'

export const productCards: {label: string; sectionId: number; description: string; icon: LucideIcon}[] = [
  {label: 'PLANIX R1', sectionId: 27463239830802, description: 'Set up, use and care for the R1 camera', icon: Camera},
  {label: 'PLANIX Pro', sectionId: 27463251271826, description: 'Everything about the PLANIX Pro camera', icon: Aperture},
  {label: 'PLANIX App', sectionId: 27515091395730, description: 'Capture on site with your phone or tablet', icon: Smartphone},
  {label: 'Survey', sectionId: 27515775360402, description: 'Plan and check your scan positions', icon: ScanLine},
  {label: 'Stitch', sectionId: 27539332492178, description: 'Align and prepare your scan data', icon: Layers},
  {label: 'iGuide Portal', sectionId: 27593216213906, description: 'Manage iGuides, orders and your account', icon: LayoutDashboard},
  {label: '3D Tours', sectionId: 27619007918866, description: 'Explore and share the iGuide 3D tour', icon: Rotate3d},
  {label: 'iGuide Operator Network', sectionId: 38823415166482, description: 'Find work and get hired through ION', icon: Users},
]

/** Zendesk section whose articles feed the "Product updates" spotlight */
export const SPOTLIGHT_SECTION_ID = 28174159801746 // Updates and Resources
