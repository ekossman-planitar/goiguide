/**
 * Camera usage agreement texts a landing page "Agreement" section can show.
 * Ids and labels only (the Studio imports this); the legal text itself is
 * first-party HTML in lib/content/legal/ (copied from live, not edited by hand without
 * sign-off), loaded on the site by agreementHtml().
 */
export const agreementTexts = [
  {value: 'cameraAgreement', title: 'iGuide Camera Usage Agreement (resellers and partners, English)'},
  {value: 'cameraAgreementUsed', title: 'Used iGuide Camera Usage Agreement (English)'},
  {value: 'cameraAgreementItalian', title: 'Contratto di utilizzo della fotocamera iGuide (Italian, GEC Software)'},
] as const

export type AgreementTextId = (typeof agreementTexts)[number]['value']

export const agreementTextOptions = agreementTexts.map((t) => ({title: t.title, value: t.value}))
