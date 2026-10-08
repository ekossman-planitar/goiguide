/** /iguide/integrations — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {LogoCard} from '@/components/blocks/LogoCards'

const card = (name: string, logo: string, alt: string, text: string, href: string): LogoCard => ({name, text, href, logo: {src: logo, alt}})

const flexmls = '/assets/Uploads/flexmls-logo_1.jpg'
const reau = '/assets/Uploads/realestate_au_1.png'
const realtorCom = '/assets/Uploads/Integrations-and-PartnershipsRealtor_com.png'
const zillow = '/assets/Uploads/Integrations-and-Partnershipszillow.png'

export const integrations = {
  meta: {
    title: 'iGUIDE Integrations: Publish to MLS, Zillow & More | iGUIDE',
    description:
      'Capture once, publish everywhere. iGUIDE tours and floor plans publish automatically to MLS systems, Zillow, REALTOR.ca, rental portals and the tools you use.',
    path: '/iguide/integrations',
    ogImage: '/assets/iGUIDE-Meta-Thumbnail.png',
  },
  hero: {
    heading: 'Integrations',
    subheading: 'Capture once, publish everywhere. iGUIDE connects with the MLS systems, listing portals and software you already use.',
    image: {src: '/assets/integrations-hub-new.png', alt: 'goiguide integrations and partnerships'},
  },
  featured: {
    heading: 'Featured integrations',
    subheading: 'The platforms our customers rely on most.',
    items: [
      card('Flexmls', flexmls, 'Flexmls logo', 'Publish iGUIDE tours through the Flexmls Platform. Your tour becomes part of listing entry, not a separate upload.', 'https://www.flexmls.com'),
      card('realestate.com.au', reau, 'realestate.com.au logo', "Your iGUIDE tour appears with your listing on realestate.com.au, Australia's number one property site, so buyers can explore the home before an inspection.", 'https://www.realestate.com.au/'),
      card('realtor.com', realtorCom, 'realtor.com logo', 'Your iGUIDE loads with a single click on realtor.com listings, giving buyers a full walkthrough alongside photos and property details.', 'https://www.realtor.com/'),
      card('Zillow', zillow, 'Zillow logo', 'iGUIDE tours and floor plans embed directly into Zillow listings, so buyers can explore the full tour without leaving the page.', 'https://www.zillow.com'),
    ],
  },
  supported: {
    heading: 'Supported platforms',
    subheading: 'Wherever your work happens, your iGUIDE is already there.',
    groups: [
      {
        id: 'mls-systems',
        heading: 'MLS systems',
        text: 'Publish iGUIDE tours directly through your MLS. No separate uploads, no broken links.',
        items: [
          card('Flexmls', flexmls, 'Flexmls logo', 'The Flexmls Platform puts customization in the hands of the MLS, and iGUIDE is built in. Attach your tour during listing entry and it publishes with the listing.', 'https://www.flexmls.com'),
          card('ITSO', '/assets/Uploads/Integrations-and-PartnershipsITSO.png', 'ITSO logo', 'ITSO is the preferred MLS® System for its Member Associations across Ontario. iGUIDE tours and floor plans flow directly into ITSO listings.', 'https://www.itso.ca'),
        ],
      },
      {
        id: 'real-estate-marketplaces',
        heading: 'Real estate marketplaces',
        text: 'Your tour and floor plan appear with your listing on the marketplaces buyers already search — residential and commercial.',
        items: [
          card('Domain', '/assets/Uploads/domain.png', 'Domain logo', 'Your iGUIDE tours appear on Domain, a leading Australian property marketplace, helping buyers shortlist your listings with confidence.', 'https://www.domain.com.au'),
          card('Funda', '/assets/Uploads/funda_logo.png', 'Funda logo', 'Your iGUIDE tours display on Funda, a leading Dutch home search platform, so buyers can walk the property before they call.', 'https://www.funda.nl'),
          card('Homes.com', '/assets/Integrations-and-Partnerships-Homes.webp', 'Homes.com logo', 'Your iGUIDE tours and floor plans embed directly into Homes.com listings, one of the largest U.S. property marketplaces, so buyers can walk the home before they book a showing.', 'https://www.homes.com'),
          card('idealista', '/assets/Uploads/Integrations-and-Partnershipsidealista.png', 'idealista logo', 'Embed iGUIDEs directly into idealista listing pages and stand out among more than 1.7 million listings for sale or rent in Spain.', 'https://www.idealista.com/'),
          card('JamesEdition', '/assets/Uploads/james_edition.png', 'JamesEdition logo', 'Showcase luxury properties with iGUIDE tours on JamesEdition, a global marketplace connecting buyers and sellers of high-end real estate.', 'https://www.jamesedition.com'),
          card('realestate.com.au', reau, 'realestate.com.au logo', "Your iGUIDE tour appears with your listing on realestate.com.au, Australia's number one property site, so buyers can explore the home before an inspection.", 'https://www.realestate.com.au'),
          card('Realtor.ca', '/assets/Uploads/Integrations-and-PartnershipsRealtor_ca.png', 'REALTOR.ca logo', "REALTOR.ca, Canada's largest real estate website, fully embeds your iGUIDE right in the listing page. Buyers explore the tour without leaving the listing.", 'https://www.realtor.ca'),
          card('realtor.com', realtorCom, 'realtor.com logo', 'Your iGUIDE loads with a single click on realtor.com listings, giving buyers a full walkthrough alongside photos and property details.', 'https://www.realtor.com'),
          card('Royal LePage', '/assets/Uploads/Integrations-and-PartnershipsRoyalLePage.png', 'Royal LePage logo', 'Your iGUIDE tours and floor plans appear on Royal LePage listings, so buyers can explore a home in full before booking a showing.', 'https://www.royallepage.ca'),
          card('SpaceList', '/assets/Uploads/spacelist-v2.png', 'SpaceList logo', "Your iGUIDE tours and floor plans display on SpaceList, Canada's leading commercial real estate marketplace, so tenants and buyers can walk a space before they visit.", 'https://www.spacelist.ca'),
          card('Zillow', zillow, 'Zillow logo', 'iGUIDE tours and floor plans embed directly into Zillow listings, so buyers can explore the full tour without leaving the page.', 'https://www.zillow.com'),
        ],
      },
      {
        id: 'rental-platforms',
        heading: 'Rental platforms',
        text: 'Renters can tour a unit before booking a showing. Fewer wasted visits and faster signed leases.',
        items: [
          card('Apartment Guide', '/assets/Uploads/ApartmentGuide.png', 'Apartment Guide logo', 'iGUIDE tours and floor plans embed directly into apartmentguide.com listing pages, giving renters a walkthrough and accurate floor plan next to photos and pricing.', 'https://www.apartmentguide.com'),
          card('lovely', '/assets/Uploads/Integrations-and-Partnershipslovely.png', 'lovely logo', 'iGUIDE tours and floor plans embed directly into lovely.com listing pages, updated in real time.', 'https://www.lovely.com'),
          card('rent.com', '/assets/Uploads/Integrations-and-Partnershipsrent.com.png', 'rent.com logo', 'Embed iGUIDE tours and floor plans directly into rent.com listings so renters can check the layout before they book a visit.', 'https://www.rent.com'),
          card('Rentals.com', '/assets/Uploads/Integrations-and-Partnershipsrentals_com.png', 'Rentals.com logo', 'iGUIDE tours and floor plans embed directly into Rentals.com listings for houses, condos, townhomes, and more.', 'https://www.rentals.com'),
          card('RentBoard.ca', '/assets/Uploads/Integrations-and-PartnershipsRentBoard.png', 'RentBoard.ca logo', 'Embed iGUIDE tours and floor plans directly into rentboard.ca listings and let renters across Canada tour your vacancies remotely.', 'https://www.rentboard.ca'),
          card('viewit.ca', '/assets/Uploads/Integrations-and-PartnershipsVeiwIt.png', 'viewit.ca logo', 'Embed iGUIDE 3D virtual tours and floor plans directly into viewit.ca listings so Toronto renters can take a full walkthrough before their first showing.', 'https://www.viewit.ca'),
        ],
      },
      {
        id: 'real-estate-software',
        heading: 'Real estate software & media',
        text: 'For photographers, agents and brokerages. iGUIDE plugs into the platforms you use to deliver, market and show properties.',
        items: [
          card('Aryeo', '/assets/Uploads/aryeo.png', 'Aryeo logo', 'Deliver iGUIDE tours and floor plans alongside photos and video in Aryeo. One delivery link and one polished client experience for your photography business.', 'https://www.aryeo.com'),
          card('BrokerBay', '/assets/Uploads/Broker-Bay.png', 'BrokerBay logo', 'Integrate iGUIDE Virtual Showings into the BrokerBay platform and let buyers tour remotely inside the same system your brokerage uses to manage showings.', 'https://www.brokerbay.com'),
          card('Floorplanner', '/assets/Uploads/Integrations-and-PartnershipsFloorplanner.png', 'Floorplanner logo', 'Export iGUIDE data straight into Floorplanner for 3D renders and space planning, so one capture powers your whole design workflow.', 'https://www.floorplanner.com'),
          card('HD PhotoHub', '/assets/Uploads/Integrations-and-PartnershipsHDPhotoHub.png', 'HD PhotoHub logo', 'Embed iGUIDE tours and floor plans directly into HDPhotoHub property listing pages, so your clients get photos, video, tour, and floor plan in one place.', 'https://www.hdphotohub.com'),
          card('Luxury Presence', '/assets/Uploads/luxury_presence_3.png', 'Luxury Presence logo', 'Feature your iGUIDE tours on Luxury Presence websites. The marketing platform helps real estate professionals showcase their brands, save time, and close more deals.', 'https://www.luxurypresence.com'),
        ],
      },
      {
        id: 'construction-insurance',
        heading: 'Construction & insurance',
        text: 'iGUIDE measurements and documentation feed directly into claims, restoration and construction workflows.',
        items: [
          card('Construction Specifications Canada', '/assets/Uploads/Integrations-and-PartnershipsCSC.png', 'Construction Specifications Canada logo', "iGUIDE partners with CSC's Grand Valley and Toronto Chapters on their annual Student Design Competition for Ontario post-secondary students.", 'https://csc-dcc.ca'),
          card('Seek Now', '/assets/Uploads/Integrations-and-PartnershipsSeekNow.png', 'Seek Now logo', "Seek Now's certified inspector network provides on-demand, ground truth insurance inspections and real estate data capture across the continental United States.", 'https://www.seeknow.com'),
          card('Verisk', '/assets/Uploads/Verisk_Logo.png', 'Verisk logo', "iGUIDE integrates with Verisk's Xactimate platform, helping insurance adjusters process claims with greater accuracy, speed, and efficiency.", 'https://www.verisk.com'),
        ],
      },
    ],
  },
}
