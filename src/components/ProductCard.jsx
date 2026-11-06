import { Link } from 'react-router-dom'
import { FileSignature, Mail, Phone } from 'lucide-react'
import { categoryLabel, formatPrice } from '../data/products.js'
import { quoteMailto, site } from '../data/site.js'

export function RxBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-on-ember ${className}`}>
      <FileSignature aria-hidden="true" className="size-3.5" />
      Prescription required
    </span>
  )
}

export function CategoryTag({ id }) {
  return (
    <span className="inline-flex self-start rounded-full bg-mist px-3 py-1 text-xs font-semibold tracking-wide text-pine-ink">
      {categoryLabel(id)}
    </span>
  )
}

/** "Request a Quote" (prefilled email) and "Call to Order" (phone). */
export function ProductCtas({ product, size = 'sm', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]'
  const sizing = size === 'lg' ? 'min-h-13 px-7 text-base' : 'min-h-12 px-4 text-[0.95rem]'
  return (
    <div className={`grid gap-2 ${size === 'lg' ? 'grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]' : 'grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]'} ${className}`}>
      <a
        href={quoteMailto(product.name)}
        aria-label={`Request a quote for ${product.name} by email`}
        className={`${base} ${sizing} bg-ember text-on-ember shadow-soft hover:bg-ember-deep`}
      >
        <Mail aria-hidden="true" className="size-4 shrink-0" />
        Request a Quote
      </a>
      <a
        href={site.phone.href}
        aria-label={`Call ${site.phone.display} to order ${product.name}`}
        className={`${base} ${sizing} border-[1.5px] border-ink/60 text-ink hover:bg-ink hover:text-paper`}
      >
        <Phone aria-hidden="true" className="size-4 shrink-0" />
        Call to Order
      </a>
    </div>
  )
}

/** Product photos are shot on white, so they sit in a warm "photo well" and blend in with multiply. */
export function ProductImage({ product, className = '', eager = false, sizes }) {
  return (
    <div className={`relative overflow-hidden bg-photo ${className}`}>
      <img
        src={product.image}
        alt={product.alt}
        width="600"
        height="600"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className="absolute inset-0 size-full object-contain p-[9%] mix-blend-multiply transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
      />
    </div>
  )
}

export default function ProductCard({ product, headingLevel: H = 'h3' }) {
  const href = `/products/${product.slug}`
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-card shadow-soft ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <ProductImage product={product} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </Link>
      {product.prescriptionRequired && <RxBadge className="absolute left-3 top-3" />}
      <div className="flex flex-1 flex-col p-5">
        <CategoryTag id={product.category} />
        <H className="mt-3 text-[1.625rem] leading-tight">
          <Link to={href} className="underline-offset-4 hover:underline">{product.name}</Link>
        </H>
        <p className="mt-2 line-clamp-3 text-[0.975rem] leading-relaxed text-ink-soft">{product.description}</p>
        <p className="mt-4 font-display text-2xl tracking-tight">
          <span className="sr-only">Estimated price </span>
          {formatPrice(product)}
        </p>
        <ProductCtas product={product} className="mt-auto pt-5" />
      </div>
    </article>
  )
}
