/**
 * Sample iGuide emails the landing page "Sample report" section can show.
 * Ids and labels only (the Studio imports this); the HTML is loaded on the
 * site by reportSampleHtml() from lib/landingPages/reportSamples/<id>.ts.
 */
export const reportSamples = [
  {value: 'reportCommercial', title: 'iGuide Report: commercial (525 New Dundee Road, Kitchener)'},
  {value: 'reportIrc', title: 'iGuide Report: insurance (1121 Sample Road, Kitchener)'},
  {value: 'reportResidential', title: 'iGuide Report: residential (2002 Summey Ave, Charlotte)'},
  {value: 'analyticsResidential', title: 'iGuide Analytics: residential (2002 Summey Ave, Charlotte)'},
] as const

export type ReportSampleId = (typeof reportSamples)[number]['value']

export const reportSampleOptions = reportSamples.map((s) => ({title: s.title, value: s.value}))

/** Screen reader label for each sample */
export const reportSampleLabel = (id: string) => reportSamples.find((s) => s.value === id)?.title ?? 'Sample iGuide email'
