/**
 * Product catalogue: the single source of truth for names, prices and images.
 * Prices are estimated ranges in USD. Set `priceMaxPlus: true` to show "+" after the top price.
 * Images live in /public/images/products and are named after the product slug.
 */
export const productCategories = [
  { id: 'all', label: 'All' },
  { id: 'mobility', label: 'Mobility' },
  { id: 'beds', label: 'Beds & Pressure Care' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'daily-living', label: 'Daily Living' },
]

const img = (slug) => `/images/products/${slug}.webp`

export const products = [
  {
    id: 1,
    slug: 'manual-wheelchair',
    name: 'Manual Wheelchair',
    category: 'mobility',
    description: 'Foldable mobility chair with footrests and hand rims; for users who can self-propel or be pushed by a caregiver.',
    priceMin: 120,
    priceMax: 450,
    image: img('manual-wheelchair'),
    alt: 'Black folding manual wheelchair with large spoked rear wheels, armrests and footrests',
    prescriptionRequired: false,
  },
  {
    id: 2,
    slug: 'transport-wheelchair',
    name: 'Transport Wheelchair',
    category: 'mobility',
    description: 'Lightweight chair with smaller rear wheels, designed for caregiver-assisted transport.',
    priceMin: 100,
    priceMax: 300,
    image: img('transport-wheelchair'),
    alt: 'Lightweight transport wheelchair with small rear wheels and push handles with brakes',
    prescriptionRequired: false,
  },
  {
    id: 3,
    slug: 'rollator-walker',
    name: 'Rollator Walker',
    category: 'mobility',
    description: 'Four-wheel walking aid with hand brakes, seat and storage pouch.',
    priceMin: 70,
    priceMax: 250,
    image: img('rollator-walker'),
    alt: 'Purple four-wheel rollator walker with hand brakes, padded seat and storage bag',
    prescriptionRequired: false,
  },
  {
    id: 4,
    slug: 'standard-folding-walker',
    name: 'Standard Folding Walker',
    category: 'mobility',
    description: 'Height-adjustable walking frame for stable support while standing and walking.',
    priceMin: 25,
    priceMax: 90,
    image: img('standard-folding-walker'),
    alt: 'Aluminum folding walker with adjustable legs and two front wheels',
    prescriptionRequired: false,
  },
  {
    id: 5,
    slug: 'adjustable-crutches',
    name: 'Adjustable Crutches (Pair)',
    category: 'mobility',
    description: 'Height-adjustable underarm or forearm supports for temporary mobility assistance.',
    priceMin: 20,
    priceMax: 80,
    image: img('adjustable-crutches'),
    alt: 'Pair of height-adjustable aluminum forearm crutches with grey handles',
    prescriptionRequired: false,
  },
  {
    id: 6,
    slug: 'electric-hospital-bed',
    name: 'Electric Hospital Bed',
    category: 'beds',
    description: 'Motorized bed with adjustable head and foot sections; features and rails vary by model.',
    priceMin: 900,
    priceMax: 3500,
    image: img('electric-hospital-bed'),
    alt: 'Electric hospital bed with a raised blue mattress, side rails and hand control',
    prescriptionRequired: false,
  },
  {
    id: 7,
    slug: 'manual-hospital-bed',
    name: 'Manual Hospital Bed',
    category: 'beds',
    description: 'Hand-crank adjustable bed for home care or clinical use; mattress and rails may be sold separately.',
    priceMin: 500,
    priceMax: 1500,
    image: img('manual-hospital-bed'),
    alt: 'Manual hospital bed with hand cranks, side rails, a blue mattress and an overbed tray',
    prescriptionRequired: false,
  },
  {
    id: 8,
    slug: 'alternating-pressure-mattress',
    name: 'Alternating Pressure Mattress',
    category: 'beds',
    description: 'Air-cell mattress system that alternates pressure to help reduce prolonged pressure on the skin.',
    priceMin: 80,
    priceMax: 400,
    image: img('alternating-pressure-mattress'),
    alt: 'Beige air-cell pressure mattress on a bed frame with its white air pump',
    prescriptionRequired: false,
  },
  {
    id: 9,
    slug: 'oxygen-concentrator-5-lpm',
    name: 'Oxygen Concentrator (5 LPM)',
    category: 'respiratory',
    description: 'Stationary concentrator that separates oxygen from room air.',
    priceMin: 500,
    priceMax: 1500,
    image: img('oxygen-concentrator-5-lpm'),
    alt: 'Light blue stationary oxygen concentrator on wheels with a carry handle and humidifier bottle',
    prescriptionRequired: true,
  },
  {
    id: 10,
    slug: 'portable-oxygen-concentrator',
    name: 'Portable Oxygen Concentrator',
    category: 'respiratory',
    description: 'Battery-powered portable oxygen device; price depends on flow mode, battery and brand.',
    priceMin: 1500,
    priceMax: 4000,
    priceMaxPlus: true,
    image: img('portable-oxygen-concentrator'),
    alt: 'Compact grey portable oxygen concentrator with a carry handle and control panel',
    prescriptionRequired: true,
  },
  {
    id: 11,
    slug: 'compressor-nebulizer',
    name: 'Compressor Nebulizer',
    category: 'respiratory',
    description: 'Converts prescribed liquid medication into an inhalable mist.',
    priceMin: 25,
    priceMax: 100,
    image: img('compressor-nebulizer'),
    alt: 'White compressor nebulizer with tubing, medication cup and face mask',
    prescriptionRequired: true,
  },
  {
    id: 12,
    slug: 'suction-machine',
    name: 'Suction Machine',
    category: 'respiratory',
    description: 'Portable aspirator for removing secretions.',
    priceMin: 80,
    priceMax: 300,
    image: img('suction-machine'),
    alt: 'Wheeled suction machine with two clear collection bottles and tubing',
    prescriptionRequired: false,
  },
  {
    id: 13,
    slug: 'pulse-oximeter',
    name: 'Pulse Oximeter',
    category: 'monitoring',
    description: 'Finger-worn device estimating blood oxygen saturation and pulse rate.',
    priceMin: 15,
    priceMax: 60,
    image: img('pulse-oximeter'),
    alt: 'Fingertip pulse oximeter with a color screen showing oxygen saturation and pulse rate',
    prescriptionRequired: false,
  },
  {
    id: 14,
    slug: 'blood-pressure-monitor',
    name: 'Automatic Blood Pressure Monitor',
    category: 'monitoring',
    description: 'Upper-arm electronic monitor for home blood-pressure readings.',
    priceMin: 30,
    priceMax: 120,
    image: img('blood-pressure-monitor'),
    alt: 'Upper-arm blood pressure monitor with a digital display and a black arm cuff',
    prescriptionRequired: false,
  },
  {
    id: 15,
    slug: 'bedside-commode-chair',
    name: 'Bedside Commode Chair',
    category: 'daily-living',
    description: 'Portable toileting chair with removable bucket; bariatric and drop-arm models available.',
    priceMin: 40,
    priceMax: 180,
    image: img('bedside-commode-chair'),
    alt: 'Blue and aluminum commode chair on locking casters with armrests and a footrest',
    prescriptionRequired: false,
  },
]

export const featuredProductSlugs = [
  'manual-wheelchair',
  'rollator-walker',
  'electric-hospital-bed',
  'oxygen-concentrator-5-lpm',
  'pulse-oximeter',
  'bedside-commode-chair',
]

const usd = (n) => `$${n.toLocaleString('en-US')}`

export function formatPrice(product) {
  return `${usd(product.priceMin)} – ${usd(product.priceMax)}${product.priceMaxPlus ? '+' : ''}`
}

export function categoryLabel(id) {
  return productCategories.find((c) => c.id === id)?.label ?? id
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}

/** Same-category items first; topped up from other categories when a category is small. */
export function getRelated(product, count = 3) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id)
  const others = products.filter((p) => p.category !== product.category)
  return { items: [...same, ...others].slice(0, count), sameCategoryOnly: same.length >= count }
}
