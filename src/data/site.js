/**
 * Everything the business needs to edit lives here.
 *
 * VERIFIED: `legalName`, `registry` and `address` come from the State of Utah
 * Certificate of Organization.
 *
 * PLACEHOLDER: `phone` and `email` are NOT real. Replace them before launch.
 * (555-01xx numbers and .example domains are reserved and never reach anyone.)
 */
export const site = {
  name: 'Daud DME',
  legalName: 'Daud DME Ltd LLC',
  tagline: 'Durable medical equipment and supplies',

  // PLACEHOLDER: replace before launch
  phone: { display: '(801) 555-0100', href: 'tel:+18015550100' },
  email: 'info@dauddme.example',

  // Set to a string such as 'Mon to Fri, 8am to 6pm' and it appears on the contact page and footer.
  hours: null,

  address: {
    street: '1669 N Morton Dr',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84116-4100',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=1669+N+Morton+Dr,+Salt+Lake+City,+UT+84116',
  mapsEmbed: 'https://www.google.com/maps?q=1669+N+Morton+Dr,+Salt+Lake+City,+UT+84116&output=embed',

  registry: {
    entityNumber: '14692581-0160',
    filingNumber: '260507984315B',
    effective: 'May 7, 2026',
    type: 'Domestic Limited Liability Company',
    duration: 'Perpetual',
    member: 'Daud Jamil',
    office: 'Utah Division of Corporations and Commercial Code',
    verifyUrl: 'https://businessregistration.utah.gov/',
  },
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/equipment', label: 'Equipment' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]
