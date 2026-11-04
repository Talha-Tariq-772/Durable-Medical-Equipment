import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check, ExternalLink, Minus, Plus } from 'lucide-react'
import { audiences, faqs, pillars, steps } from '../data/content.js'
import { site } from '../data/site.js'
import { Button, Reveal, SectionHead, Seal, TextReveal } from './ui.jsx'

/* ------------------------------------------------------------------ */
/* Four pillars: sticky image that follows the text on large screens   */
/* ------------------------------------------------------------------ */
export function Pillars() {
  const [active, setActive] = useState(0)
  const current = pillars[active]

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="sticky top-28 hidden h-fit lg:block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[10rem] rounded-b-3xl bg-paper-2">
          <AnimatePresence initial={false}>
            <motion.img
              key={current.id}
              src={current.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: current.position }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        <ol className="mt-5 flex gap-2" aria-hidden="true">
          {pillars.map((p, i) => (
            <li key={p.id} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full bg-ember" animate={{ scaleX: i <= active ? 1 : 0 }} style={{ originX: 0 }} transition={{ duration: 0.5 }} />
            </li>
          ))}
        </ol>
      </div>

      <div>
        {pillars.map((p, i) => (
          <motion.div
            key={p.id}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: '-45% 0px -45% 0px' }}
            className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:py-14"
          >
            <Reveal className="mb-7 lg:hidden">
              <img
                src={p.image}
                alt={p.alt}
                width="735"
                height="490"
                loading="lazy"
                className="aspect-[3/2] w-full rounded-t-[5rem] rounded-b-2xl object-cover"
                style={{ objectPosition: p.position }}
              />
            </Reveal>
            <p className="font-display italic text-ember">0{i + 1} — {p.label}</p>
            <TextReveal as="h3" parts={[p.title]} className="mt-3 text-[clamp(2rem,4vw,3.25rem)]" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg text-ink-soft">{p.body}</p>
            </Reveal>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Process: a heartbeat that draws as you scroll                       */
/* ------------------------------------------------------------------ */
const PROCESS_PATH =
  'M50 0V110l-5 10 10 18-14 22 13 18-4 12V360l-5 10 10 18-14 22 13 18-4 12V610l-5 10 10 18-14 22 13 18-4 12V860l-5 10 10 18-14 22 13 18-4 12V1000'

export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative mt-14 md:mt-20">
      {/* Phone rail */}
      <div className="absolute inset-y-2 left-[1.2rem] w-0.5 bg-line md:hidden" aria-hidden="true">
        <motion.div className="h-full w-full origin-top bg-ember" style={{ scaleY }} />
      </div>
      {/* Desktop heartbeat */}
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 hidden h-full w-24 -translate-x-1/2 md:block"
      >
        <path d={PROCESS_PATH} stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={PROCESS_PATH}
          stroke="var(--color-ember)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>

      <ol className="relative">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`relative flex pb-12 pl-14 last:pb-0 md:min-h-64 md:w-1/2 md:items-center md:pb-0 md:pl-0 ${
              i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'
            }`}
          >
            <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-pine font-display text-lg text-paper md:hidden">
              {i + 1}
            </span>
            <Reveal className="w-full">
              <p className="hidden font-display text-[5rem] italic leading-none text-ember/25 md:block">0{i + 1}</p>
              <h3 className="text-[clamp(1.875rem,3vw,2.75rem)]">{step.title}</h3>
              <p className={`mt-3 max-w-md text-lg text-ink-soft ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The certificate: a real, checkable fact in place of invented stats  */
/* ------------------------------------------------------------------ */
export function Certificate() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'center 55%'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const { registry, address } = site

  const rows = [
    ['Entity name', site.legalName],
    ['Entity number', registry.entityNumber],
    ['Effective date', registry.effective],
    ['Classification', 'Limited Liability Company'],
    ['Duration', registry.duration],
    ['Principal office', `${address.street}, ${address.city}, ${address.state}`],
    ['Member', registry.member],
  ]

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHead
          eyebrow="On the record"
          title={['Registered in', { text: 'Utah,', italic: true }, 'and easy to check.']}
          intro="Trust in healthcare should not rest on slogans. Here are our organization details as filed with the State of Utah. You are welcome to look them up yourself."
        />
        <Reveal delay={0.2} className="mt-8">
          <Button href={registry.verifyUrl} target="_blank" rel="noreferrer" variant="outline" icon={false}>
            Search Utah’s business registry
            <ExternalLink aria-hidden="true" className="size-4" />
          </Button>
        </Reveal>
      </div>

      <motion.figure ref={ref} style={{ rotate, y }} className="relative rounded-sm bg-card p-6 shadow-[0_30px_70px_-30px_#0a2f2c66] ring-1 ring-line md:p-10">
        <Seal className="absolute -right-3 -top-8 size-24 md:-right-8 md:-top-10 md:size-32" dark />
        <figcaption className="max-w-[calc(100%-4.5rem)] md:max-w-[calc(100%-5rem)]">
          <p className="eyebrow">Summary of our Certificate of Organization</p>
          <p className="mt-2 font-display text-2xl leading-tight md:text-3xl">Filed with the {registry.office}</p>
        </figcaption>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-0.5 py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-sm text-ink-soft">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-ink-soft">Filing number {registry.filingNumber}</p>
      </motion.figure>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Who we serve                                                        */
/* ------------------------------------------------------------------ */
export function AudienceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map((a, i) => (
        <Reveal key={a.id} delay={i * 0.08}>
          <article className="group h-full overflow-hidden rounded-t-[6rem] rounded-b-2xl bg-paper text-ink">
            <div className="aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
              <img
                src={a.image}
                alt={a.alt}
                loading="lazy"
                width="600"
                height="750"
                style={{ objectPosition: a.position }}
                className="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-[1.75rem]">{a.title}</h3>
              <p className="mt-2 text-ink-soft">{a.body}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export function AudienceRows() {
  return (
    <div className="space-y-16 md:space-y-24">
      {audiences.map((a, i) => (
        <div key={a.id} id={a.id} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-16">
          <Reveal className={i % 2 ? 'md:order-2' : ''}>
            <img
              src={a.image}
              alt={a.alt}
              loading="lazy"
              width="735"
              height="551"
              style={{ objectPosition: a.position }}
              className={`aspect-[4/3] w-full object-cover ${i % 2 ? 'rounded-t-[7rem] rounded-b-2xl' : 'rounded-[1.25rem] rounded-br-[7rem]'}`}
            />
          </Reveal>
          <div>
            <TextReveal as="h3" parts={[a.title]} className="text-[clamp(2.25rem,4vw,3.25rem)]" />
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg text-ink-soft">{a.body}</p>
              <ul className="mt-5 space-y-2.5">
                {a.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-teal" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */
export function FaqList({ limit }) {
  const [open, setOpen] = useState(0)
  const items = limit ? faqs.slice(0, limit) : faqs
  return (
    <div className="border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="border-b border-line">
            <h3 className="font-sans! tracking-normal!">
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight transition-colors hover:text-teal"
              >
                {f.q}
                <span className={`grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors ${isOpen ? 'border-pine bg-pine text-paper' : 'border-ink/50'}`}>
                  {isOpen ? <Minus aria-hidden="true" className="size-5" /> : <Plus aria-hidden="true" className="size-5" />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-lg text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Closing call to action                                              */
/* ------------------------------------------------------------------ */
export function ClosingCta() {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-pine text-paper md:grid-cols-[7fr_5fr]">
        <div className="relative z-10 p-7 py-12 md:p-14 lg:p-20">
          <TextReveal
            parts={['Tell us what', { text: 'care', italic: true, className: 'text-glow!' }, 'needs next.']}
            className="text-[clamp(2.75rem,6vw,5.5rem)]"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-mist">
              Whether you are planning for a parent’s homecoming or stocking a clinic, a conversation is the right place to start.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="light">Start a request</Button>
              <Button href={site.phone.href} variant="outlineLight" icon={false}>Call {site.phone.display}</Button>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-72 md:min-h-full">
          <img
            src="/images/stethoscope-circle.webp"
            alt="Clinicians in green scrubs standing in a circle holding out their stethoscopes"
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
