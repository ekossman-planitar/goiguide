/** /downloads — copy, file links and version notes from the live page (checked 2026-10-07). */

export const heading = 'Software & Documentation Downloads'

export const meta = {
  title: 'iGUIDE Downloads: Key resources and information to help you grow your business | iGUIDE',
  description:
    'Need to grow your business? iGUIDE Downloads offers essential resources and tips. Start expanding today with our expert advice!',
  path: '/downloads',
}

export type FileLink = {label: string; action: string; href: string}
export type ProductDownloads = {id: string; name: string; files: FileLink[]; note?: string}

export const stitch = {
  version: '6.15.1',
  pc: '/assets/downloads/Stitch_Setup64_6_15_1.exe',
  mac: '/assets/downloads/Stitch_6_15_1.dmg',
  requirements: 'Stitch System requirements: MacOS 12+ or Windows 10+.',
}

/** Live element ids kept as anchors (e.g. /downloads#stitch) */
export const products: ProductDownloads[] = [
  {
    id: 'e1351',
    name: 'iGUIDE PLANIX R1',
    files: [
      {label: 'Camera Manual', action: 'Download', href: '/assets/PLANIX-R1-Assets/PLANIX-R1-Manual-v1.1.pdf'},
      {label: 'Quick Start Guide', action: 'Download', href: '/assets/PLANIX-R1-Assets/PLANIX_R1_QSG.pdf'},
      {label: 'Tech Specs', action: 'Download', href: '/assets/PLANIX-R1-Assets/PLANIX_R1_Tech_Specs.pdf'},
    ],
  },
  {
    id: 'e166',
    name: 'iGUIDE PLANIX',
    files: [
      {label: 'Latest Firmware', action: 'Download v2.1.8', href: '/assets/downloads/fw6_update.7z'},
      {label: 'Camera Manual', action: 'Download', href: '/assets/downloads/iGUIDE-PLANIX-Instruction-Manual.pdf'},
      {label: 'Sample Data', action: 'Download', href: '/assets/downloads/PLANIX_SAMPLE_DATA.zip'},
      {label: 'Theta Z1 Firmware Update Process', action: 'Update Instructions', href: 'https://support.ricoh360.com/tags/z1-update?apps=ricoh360-app'},
    ],
  },
  {
    id: 'e167',
    name: 'IMS-5',
    files: [
      {label: 'Latest Firmware', action: 'Download', href: '/assets/downloads/fw_update.7z'},
      {label: 'Camera Manual', action: 'Download', href: '/assets/downloads/iGUIDE-IMS-5-Camera-System-Documentation-1.22.pdf'},
      {label: 'Sample Data', action: 'Download', href: '/assets/downloads/Stitch_Sample_Data.zip'},
    ],
  },
  {
    id: 'stitch',
    name: 'Stitch',
    files: [
      {label: 'Stitch for PC', action: `Download v${stitch.version}`, href: stitch.pc},
      {label: 'Stitch for Mac', action: `Download v${stitch.version}`, href: stitch.mac},
    ],
    note: stitch.requirements,
  },
  {
    id: 'e1467',
    name: 'iGUIDE PLANIX Mobile App',
    files: [
      {label: 'iOS App', action: 'Download', href: 'https://apps.apple.com/ca/app/iguide-planix/id6450938233'},
      {label: 'Android App', action: 'Download', href: 'https://play.google.com/store/apps/details?id=com.planitar.iguide&hl=en_CA&pli=1'},
    ],
    note: 'Mobile system requirements: Android 8+ or iOS 15.1+.',
  },
]

/** "Other Downloads" list */
export const otherDownloads: {file: string; href: string; description: string; uploaded: string}[] = [
  {file: 'Stitch_Setup64_6_15_1.exe', href: '/assets/downloads/Stitch_Setup64_6_15_1.exe', description: 'Stitch v6.15.1 for Windows (64bit)', uploaded: 'July 17, 2026'},
  {file: 'Stitch_Setup64_6_14_8.exe', href: '/assets/downloads/Stitch_Setup64_6_14_8.exe', description: 'Stitch v6.14.8 for Windows (64bit) – OLD', uploaded: 'June 16, 2026'},
  {file: 'Stitch_6_15_1.dmg', href: '/assets/downloads/Stitch_6_15_1.dmg', description: 'Stitch v6.15.1 for MacOS 12', uploaded: 'July 17, 2026'},
  {file: 'Stitch_6_14_8.dmg', href: '/assets/downloads/Stitch_6_14_8.dmg', description: 'Stitch v6.14.8 for MacOS 12 – OLD', uploaded: 'June 16, 2026'},
  {file: 'Stitch_Setup32_6_9_1.exe', href: '/assets/downloads/Stitch_Setup32_6_9_1.exe', description: 'Stitch v6.9.1 for Windows (32bit) – OLD', uploaded: 'October 12, 2021'},
  {file: 'iGUIDE PLANIX Instruction Manual.pdf', href: '/assets/downloads/iGUIDE-PLANIX-Instruction-Manual.pdf', description: 'v1.7', uploaded: 'June 2, 2023'},
  {file: 'iGUIDE IMS-5 Camera System Documentation 1.22.pdf', href: '/assets/downloads/iGUIDE-IMS-5-Camera-System-Documentation-1.22.pdf', description: 'v1.22', uploaded: 'January 6, 2020'},
  {file: 'iGUIDE PLANIX Quick Start GUIDE.pdf', href: '/assets/downloads/iGUIDE-Planix-Quick-Start-Guide.pdf', description: '', uploaded: 'May 5, 2023'},
  {file: 'iGUIDE IMS-5 Quick Start GUIDE.pdf', href: '/assets/downloads/iGUIDE_Quick_Start_Guide.pdf', description: '', uploaded: 'December 8, 2020'},
  {file: 'fw6_update.7z', href: '/assets/downloads/fw6_update.7z', description: 'iGUIDE PLANIX System Firmware v2.1.8', uploaded: 'October 6, 2026'},
  {file: 'fw_update.7z', href: '/assets/downloads/fw_update.7z', description: 'IMS-5 System Firmware v1.4.138', uploaded: 'October 8, 2020'},
  {file: 'Stitch_Sample_Data.zip', href: '/assets/downloads/Stitch_Sample_Data.zip', description: 'Sample Stitch Data – Model Home 1', uploaded: 'April 17, 2020'},
]

export type Release = {version: string; groups: {title?: string; items: string[]}[]}

export const stitchHistory: Release[] = [
  {
    version: 'v6.15.1',
    groups: [
      {
        items: [
          'Fix: Recover tags saved at an invalid position (pointing up) by re-reading them from the scan on load;',
          'Add: Create, edit, and remove tags directly from the scan tree, with an icon picker;',
          'Add: Display tags in the editor and pano stripe;',
          'Fix: Improved handling of tags with missing or invalid position data;',
          'Fix: No longer crashes when importing a scan whose scan.json is empty or missing position data;',
          'Fix: No longer crashes when loading projects that contain tags;',
        ],
      },
    ],
  },
  {
    version: 'v6.14.6',
    groups: [
      {
        items: [
          'Fix issue where projects processed in older Stitch versions would sometimes fail to load;',
          'Fix issue where projects may fail to load if a scan is corrupt;',
          'Fix crash when scan folders are moved;',
          'Fix rare crash when property load fails;',
          'Fix issue with Take Picture dialog on Windows 11 for ARM (MS Surface);',
        ],
      },
    ],
  },
  {
    version: 'v6.14.3',
    groups: [
      {
        items: [
          'Fixed a rare issue with a missing DLL in Windows 11;',
          'Added messaging when folder permissions are set to read only;',
          'Added user pano support for images up to 20000 x 10000 pixels;',
        ],
      },
    ],
  },
  {
    version: 'v6.14.1',
    groups: [
      {
        items: [
          'New! Support for Macs with M Processors - users with ARM-based Macs should now see faster performance;',
          'Improved handling for projects with partial data;',
          'Fixed mouse drifting when zooming in/out the map;',
          'Fixed issue with tags when opening project from tar file;',
          'Continued bug fixes including better image scaling on unusual monitor sizes and better image handling for Planix Pro projects;',
        ],
      },
    ],
  },
  {
    version: 'v6.13.13',
    groups: [
      {
        items: [
          'Resolved a crash when loading panoramas that are not in a 2:1 aspect ratio;',
          'Fixed an issue with imagery not updating when a project is re-imported;',
          'Fixed an issue with partial scans being enabled by default for IMS5 projects;',
          'Eliminated duplicated error messages when loading a project;',
          'Fixed a rare visual glitch in some setups with high DPI monitor and font scaling enabled;',
        ],
      },
    ],
  },
  {version: 'v6.13.12', groups: [{items: ['Fix issue with enabled partial panos in IMS5;', 'Improve error message for R1 projects;', 'Report tags on export;']}]},
  {
    version: 'v6.13.11',
    groups: [
      {
        items: [
          'Add support for projects created by R1 cameras',
          'Support for importing and editing previously exported tar files',
          'Improved image post-processing & color correction for PLANIX Pro projects',
          'Support for editing color and alignment of user-added panos',
        ],
      },
    ],
  },
  {
    version: 'v6.12.0',
    groups: [
      {items: ['Add support for Tags and image assets;', 'Improve export performance;', 'Reduce application size;', 'Fix an issue involving PLANIX firmware updates via Stitch;']},
    ],
  },
  {
    version: 'v6.11.3',
    groups: [
      {items: ['Improve support for HDPI monitors;', 'Add support for future functionality in Survey;', 'Fix limit in the maximum size of dxf exporter;', 'Other minor bug fixes;']},
    ],
  },
  {version: 'v6.11.1', groups: [{items: ['Fix some notifications not showing up;']}]},
  {
    version: 'v6.11.0',
    groups: [{items: ['Performance improvement on export;', 'Improve error checking dialog;', 'Check when loading invalid directory;', 'Internal improvements;']}],
  },
  {
    version: 'v6.10.0',
    groups: [{items: ['Internal improvements;', 'Fix a visual glitch with Adjust and Align Panos dialog on MacOS 12 (Monterey);', 'Drop Win32 support;']}],
  },
  {
    version: 'v6.9.1',
    groups: [
      {
        items: [
          'Warn that drafters will not set initial pano anymore;',
          'Improve auto-arrange scans when compass is off;',
          'Prevent exporting with overlapping scans;',
          'Remove multiple selection from Load Project dialog;',
        ],
      },
    ],
  },
  {
    version: 'v6.9.0',
    groups: [
      {
        items: [
          'Add support for iGUIDE Radix;',
          'Stop exporting the maps (drafters will not have access to it anymore);',
          'Prevent exporting empty floors and empty projects;',
          'Fix crash in some right-click menu actions for map scans;',
        ],
      },
    ],
  },
  {version: 'v6.8.1', groups: [{items: ['Fix issue in exported project file;', 'Improve error detection when aligning lens center;']}]},
  {
    version: 'v6.8.0',
    groups: [
      {
        items: [
          'Drops compatibility for Mac OS 10.11 and older;',
          'Add an option to open Create iGUIDE page on the portal and locate export file;',
          'Add color equalization to IMS-6;',
          'Add purples/greens slider to Adjust Panoramas dialog;',
          'Add confirmation dialog and progress bar when Pasting to All in Adjust Panoramas dialog;',
          'Add support for per scan private notes and hidden flag (when supported by Survey);',
          'Fix a Map related issue when importing from IMS-5;',
          'Fix a rare crash when adjusting for verticals in IMS-6;',
          'Fix a rare crash when blending;',
          'Fix a crash when reimporting a pano followed by an undo operation;',
          'Improve bounding box detection for rotated laser data;',
          'Internal changes to support future portal functionality;',
          'Rename “Reverse camera rotation” to “Reverse shooting order”;',
        ],
      },
    ],
  },
  {version: 'v6.7.2', groups: [{items: ['Removes debug code and speeds up export;']}]},
  {version: 'v6.7.1', groups: [{items: ['Fixes a bug when adding a user pano;']}]},
  {
    version: 'v6.7.0',
    groups: [
      {
        items: [
          'Add support for PLANIX camera;',
          'Set undefined floor grade as above grade on importing;',
          'Add blending to preview image;',
          'Fix an issue that would prevent fisheye thumbnails from being displayed in Survey after importing into Stitch;',
          'Fix a bug that would cause auto-arrange to crash;',
        ],
      },
    ],
  },
  {
    version: 'v6.5.5',
    groups: [{items: ['Fixed a rare issue where a project could be imported with some scan positions reset to zero;', 'Adds support for vertical measurement;']}],
  },
  {
    version: 'v6.5.3',
    groups: [
      {
        items: [
          'Fixed crash affecting some systems when loading projects with empty folder;',
          'Improved check for USB flash disk;',
          'Added new check for free space on loading project;',
        ],
      },
    ],
  },
  {
    version: 'v6.5.2',
    groups: [
      {
        items: [
          'Greatly improves image sharpness and make it adjustable via Settings menu;',
          'Add ability to hide/show multiple selected scans in iGUIDE;',
          'Add an option to manually check for updates (useful for those who import from Survey when offline);',
          'Fix a bug that prevented saved initial pano from being remembered on reloading;',
          'Increase reliability when processing corrupted image files; Warn when lens may need calibration;',
        ],
      },
    ],
  },
  {
    version: 'v6.5.1',
    groups: [
      {
        items: [
          'Fix an issue where cached photo spheres from old Stitch were not being properly cleared;',
          'Fix a glitch where the mouse cursor could “jump” far away when pressing Shift and right/middle clicking at the same time;',
          'Fix a bug that would prevent Stitch from auto-updating near midnight;',
          'Fix a glitch on MacOS when opening the photo sphere viewer;',
        ],
      },
    ],
  },
  {
    version: 'v6.5.0',
    groups: [
      {
        title: 'Major Changes:',
        items: [
          'Image export format changed from pano (cubic) tiles to photo sphere (equirectangular projection) with option to export photo spheres now removed;',
          'Moved photo sphere branding from Stitch Export Settings to the iGUIDE Portal;',
          'Increased number of pixels in each image by a factor of 3x, resulting in sharper images;',
          'Substantial improvement in image blending quality;',
          'Setting above/below grade status per floor is now required before exporting;',
          'Added an option to update firmware and System File (system.cfg) via Wi-Fi;',
          'Introduced an option for lens to laser scanner calibration after aligning lens center;',
          'Added Pano Preview button in the “Align Pano and Adjust Color” window;',
          'Changed Presets behavior to be relative instead of absolute (sliders placed at the origin will not override settings anymore). You may need to adjust your current presets;',
          'Added option to apply Presets on import, after automatic color adjustments;',
        ],
      },
      {
        title: 'Minor Changes:',
        items: [
          'Added Hints button to menu bar;',
          'Adjust partial panos for color and verticals;',
          'Add “Yes to all” in “Arrange all scans” dialog;',
          'Remove some advanced (mostly unused) options from Settings;',
          'Improved image quality of User Panos (remove visible seam);',
          'Improved Load Project dialog by allowing project selection from inside the project folder;',
          'Fixed auto-update window opening on the wrong monitor;',
          'Introduced a check for newer system file versions on the portal;',
          'Optimized “Align Lens Center in System File” feature;',
          'Fix rare bug when loading property;',
          'Adjust verticals when aligning using features or color in “Align Pano and Adjust Color” window;',
          'Remove project backup on closing;',
          'Fix wrong mouse cursor in “Add notes” mode;',
        ],
      },
    ],
  },
  {
    version: 'v6.4.3',
    groups: [
      {
        items: [
          '30% faster importing time;',
          'Improve performance of fisheye vertical alignment;',
          'Improve cross compatibility of .tar between Windows and Mac;',
          'Fix a bug where in certain cases it would show an error in the first attempt to export;',
        ],
      },
    ],
  },
  {
    version: 'v6.4.2',
    groups: [{items: ['Export survey log file;', 'Reduce the number of warnings when trying to load corrupted fisheye images;', 'Fix position of messages in a multi-monitor setup;']}],
  },
  {
    version: 'v6.4.1',
    groups: [
      {
        items: [
          'Preserve expanded/collapsed state of items in project tree view;',
          'Improve arrangement of disconnected scan groups;',
          'Disable/Enable in iGUIDE renamed to Hide/Show in iGUIDE;',
          'Fix issue with User Pano in Adjust Pano dialog;',
          'Fix auto arrange dialog opening in another monitor;',
        ],
      },
    ],
  },
  {
    version: 'v6.4.0',
    groups: [
      {
        items: [
          'Add auto arrange scans (IMS-5);',
          'Add ability to set initial direction for each pano;',
          'Add N and P shortcuts to go to next/previous scan;',
          'Add ability to Delete selected scans;',
          'Add Repair System File button in Support tab to re calibrate lens centre in bumped cameras (IMS-5);',
          'Add a warning if all floors are disabled;',
          'Remove Rotate Floor mode;',
          'Faster exporting times;',
          'Hide notifications when clicking outside;',
          'Improve support for extended characters in file paths;',
          'Improve handling of corrupted house.dat file (IMS-4);',
          'Improve reordering items in project tree view;',
          'Fix issue with rubber band selection;',
        ],
      },
    ],
  },
]
