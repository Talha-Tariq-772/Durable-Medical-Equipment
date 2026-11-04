import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { categories, equipment } from '../data/equipment.js'
import PlateGrid from '../components/Plates.jsx'
import { ClosingCta } from '../components/Sections.jsx'
import { Button, PageHero } from '../components/ui.jsx'

export default function Equipment() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const requested = params.get('category')
  const category = categories.some((c) => c.id === requested) ? requested : 'all'

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return equipment.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (!q) return true
      return [item.name, item.summary, item.forWhom, ...item.features].join(' ').toLowerCase().includes(q)
    })
  }, [category, query])

  const choose = (id) => setParams(id === 'all' ? {} : { category: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <title>Equipment | Daud DME</title>
      <PageHero
        eyebrow="The catalogue"
        title={['Every plate, a piece of', { text: 'someone’s day.', italic: true }]}
        intro="Browse the equipment and supplies we provide. Availability and models vary, so add what interests you to your list and we will talk through the best fit."
      />

      <section className="wrap pb-16 md:pb-24">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = c.id === category
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(c.id)}
                  className={`relative min-h-12 rounded-full border-[1.5px] px-5 font-medium transition-colors ${
                    active ? 'border-pine text-paper' : 'border-ink/30 hover:border-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute -inset-[1.5px] rounded-full bg-pine"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>
          <div className="relative lg:w-72">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" />
            <label htmlFor="equipment-search" className="sr-only">Search equipment</label>
            <input
              id="equipment-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment"
              className="field rounded-full! pl-12!"
            />
          </div>
        </div>

        <p role="status" className="mb-4 text-sm text-ink-soft">
          Showing {items.length} of {equipment.length}
        </p>

        {items.length > 0 ? (
          <PlateGrid items={items} />
        ) : (
          <div className="rounded-2xl border border-dashed border-ink/30 p-10 text-center">
            <h2 className="text-3xl">Nothing matches that search.</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              We may still be able to help. Tell us what you are looking for and we will find out.
            </p>
            <Button to="/contact" className="mt-6">Ask us</Button>
          </div>
        )}
      </section>

      <ClosingCta />
    </>
  )
}
