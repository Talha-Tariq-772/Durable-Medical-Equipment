import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, Search } from 'lucide-react'
import { productCategories, products, categoryLabel } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { OrderSteps } from '../components/Sections.jsx'
import { Button, PageHero, Reveal } from '../components/ui.jsx'

export function PriceNote({ className = '' }) {
  return (
    <div className={`flex gap-3 rounded-2xl bg-paper-2 p-4 text-[0.95rem] leading-relaxed text-ink-soft md:p-5 ${className}`}>
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-teal" />
      <p>
        Prices shown are estimated ranges and vary by brand, model and features. Contact us for a current quote.{' '}
        <strong className="font-semibold text-ink">Prescription-required items need a valid prescription from a licensed provider.</strong>
      </p>
    </div>
  )
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const requested = params.get('category')
  const category = productCategories.some((c) => c.id === requested) ? requested : 'all'

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return `${p.name} ${p.description} ${categoryLabel(p.category)}`.toLowerCase().includes(q)
    })
  }, [category, query])

  const choose = (id) => setParams(id === 'all' ? {} : { category: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <title>Products | Daud DME</title>
      <meta name="description" content="Browse wheelchairs, walkers, hospital beds, oxygen concentrators, monitors and more from Daud DME in Salt Lake City, Utah. Estimated price ranges and quick quotes." />
      <PageHero
        eyebrow="Products"
        title={['Equipment, priced', { text: 'plainly.', italic: true }]}
        intro="Browse the equipment we supply, with estimated price ranges. Request a quote by email or call us to order."
      />

      <section className="wrap pb-16 md:pb-24">
        <PriceNote className="mb-8" />

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
            {productCategories.map((c) => {
              const active = c.id === category
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(c.id)}
                  className={`relative min-h-12 rounded-full border-[1.5px] px-5 font-medium transition-colors ${
                    active ? 'border-pine text-cream' : 'border-ink/30 hover:border-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="product-category-pill"
                      className="absolute -inset-[1.5px] rounded-full bg-pine"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>
          <div className="relative xl:w-80">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" />
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="field rounded-full! pl-12!"
            />
          </div>
        </div>

        <p role="status" className="mb-5 text-sm text-ink-soft">
          Showing {items.length} of {products.length} products
        </p>

        {items.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((p) => (
                <motion.li
                  key={p.slug}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={p} headingLevel="h2" />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink/30 p-10 text-center">
            <h2 className="text-3xl">No products match that search.</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">We may still be able to source it. Tell us what you need.</p>
            <Button to="/contact" className="mt-6">Ask us</Button>
          </div>
        )}
      </section>

      <section className="border-t border-line bg-card py-16 md:py-24">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">How to order</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">Three simple steps.</h2>
          </Reveal>
          <OrderSteps className="mt-10" />
        </div>
      </section>
    </>
  )
}
