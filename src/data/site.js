/**
 * Everything the business needs to edit lives here, including the contact details
 * used across the header, footer, contact page and product buttons.
 *
 * `legalName`, `registry` and `address` come from the State of Utah
 * Certificate of Organization.
 */
export const site = {
  name: 'Daud DME',
  legalName: 'Daud DME Ltd LLC',
  tagline: 'Durable medical equipment and supplies',
  serviceArea: 'Serving Salt Lake City, Utah',

  phone: { display: '(801) 554-5819', href: 'tel:+18015545819' },
  email: 'Daudjamil54@gmail.com',

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

export const emailHref = `mailto:${site.email}`

/** Email link with the product name already in the subject line. */
export function quoteMailto(productName) {
  const subject = `Quote request: ${productName}`
  const body = `Hello Daud DME,\n\nI would like a quote for: ${productName}\n\nName:\nPhone:\nZIP code:\n\nThank you.`
  return `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// `desktop: false` hides an item from the desktop header (the logo already links home).
export const nav = [
  { to: '/', label: 'Home', desktop: false },
  { to: '/products', label: 'Products' },
  { to: '/equipment', label: 'Equipment guide' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]
