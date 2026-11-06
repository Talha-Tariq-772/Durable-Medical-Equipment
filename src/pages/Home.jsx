import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { promises } from '../data/content.js'
import { equipment } from '../data/equipment.js'
import { featuredProductSlugs, getProduct, products } from '../data/products.js'
import { site } from '../data/site.js'
import PlateGrid from '../components/Plates.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { AudienceCards, Certificate, ClosingCta, FaqList, Pillars, Process } from '../components/Sections.jsx'
import { Button, Marquee, PulseLine, Reveal, SectionHead, Seal, TextReveal } from '../components/ui.jsx'

const featured = ['wheelchair', 'hospital-bed', 'oxygen', 'rollator', 'cpap', 'shower-chair'].map((id) =>
  equipment.find((e) => e.id === id),
)
const featuredProducts = featuredProductSlugs.map(getProduct)

function FeaturedProducts() {
  return (
    <section className="bg-paper-2 py-20 md:py-32">
      <div className="wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Featured products"
            title={['Ready when', { text: 'you', italic: true }, 'are.']}
            intro="Some of the equipment patients and care teams ask for most, with estimated price ranges. Request a quote by email or call to order."
          />
          <Reveal className="shrink-0">
            <Button to="/products" variant="outline">Browse all {products.length} products</Button>
          </Reveal>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {featuredProducts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08} y={20}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-8 text-sm text-ink-soft">
            Prices are estimated ranges and vary by brand, model and features. Prescription-required items need a valid prescription from a licensed provider.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const circleY = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <section ref={ref} className="relative overflow-x-clip pt-28 md:pt-48 lg:pt-44">
      <div className="wrap grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="eyebrow">
            Durable medical equipment · Salt Lake City, Utah
          </motion.p>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            parts={['Care doesn’t stop at the', { text: 'hospital door.', italic: true }]}
            className="mt-5 text-[clamp(3.25rem,9.2vw,8rem)] leading-[0.98]!"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-7 max-w-xl text-lg text-ink-soft md:text-xl">
              Daud DME supplies high-quality medical equipment and supplies to patients, hospitals, clinics and healthcare providers, to support care, recovery, mobility and daily living.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/products">Browse products</Button>
              <Button href={site.phone.href} variant="outline" icon={false}>Call {site.phone.display}</Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none xl:pl-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-t-[50vw] rounded-b-3xl bg-mist lg:rounded-t-[16rem]">
            <motion.img
              src="/images/clinic-lobby.webp"
              alt="A bright clinic lobby with a reception desk, plants and patients seated by tall windows"
              width="736"
              height="1302"
              fetchPriority="high"
              style={{ y: imageY, scale: 1.16 }}
              className="size-full object-cover object-[center_65%]"
            />
          </div>
          <motion.div style={{ y: circleY }} className="absolute -bottom-6 -left-3 w-[42%] sm:-left-10">
            <img
              src="/images/home-family.webp"
              alt="Wooden family figures and a blue heart beside a stethoscope"
              width="735"
              height="490"
              className="aspect-square w-full rounded-full border-[6px] border-paper object-cover object-[52%_center] shadow-xl"
            />
          </motion.div>
          <Seal className="absolute -right-2 top-[6%] size-24 sm:-right-6 sm:size-32" />
        </motion.div>
      </div>
      <PulseLine className="mt-10 h-20 w-full text-pine-ink md:mt-6 md:h-28" />
    </section>
  )
}

function CorridorBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="relative flex min-h-[32rem] items-end overflow-hidden md:min-h-[42rem]">
      <motion.img
        src="/images/hospital-corridor.webp"
        alt=""
        loading="lazy"
        style={{ y, scale: 1.24 }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/50 to-pine-deep/10" />
      <div className="wrap relative pb-10 pt-32 md:pb-16">
        <p className="eyebrow text-sage!">Who we serve</p>
        <TextReveal
          parts={['One standard of care, from the', { text: 'ward', italic: true, className: 'text-glow!' }, 'to the', { text: 'living room.', italic: true, className: 'text-glow!' }]}
          className="mt-4 max-w-4xl text-[clamp(2.5rem,6.4vw,5.5rem)] text-cream"
        />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee
        items={['Wheelchairs', 'Hospital beds', 'Oxygen concentrators', 'Rollators', 'CPAP', 'Patient lifts', 'Shower chairs', 'Nebulizers', 'Everyday supplies']}
        className="border-y border-line py-4 font-display text-[clamp(1.75rem,4vw,3rem)] italic text-pine-ink md:py-5"
      />

      <FeaturedProducts />

      <section className="wrap py-20 md:py-32">
        <SectionHead
          eyebrow="What we do"
          title={['Four reasons the right equipment', { text: 'matters.', italic: true }]}
          className="mb-12 md:mb-20"
        />
        <Pillars />
      </section>

      <section className="bg-paper-2 py-20 md:py-32">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Equipment guide"
              title={['Built for', { text: 'everyday', italic: true }, 'use.']}
              intro="New to medical equipment? Open any plate to see what it does and who it helps, or add it to your list to talk it over with us."
            />
            <Reveal className="shrink-0">
              <Button to="/equipment" variant="outline">Open the equipment guide</Button>
            </Reveal>
          </div>
          <PlateGrid items={featured} />
        </div>
      </section>

      <CorridorBand />
      <section className="bg-pine-deep pb-20 pt-6 md:pb-32">
        <div className="wrap">
          <AudienceCards />
        </div>
      </section>

      <section className="wrap py-20 md:py-32">
        <SectionHead
          eyebrow="How it works"
          title={['Four steps,', { text: 'one', italic: true }, 'team.']}
          intro="Getting medical equipment can feel like a maze. Here is what to expect from us."
          className="mx-auto text-center"
        />
        <Process />
      </section>

      <section className="border-y border-line bg-card">
        <div className="wrap grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="py-9 md:px-8 md:py-14 md:first:pl-0 md:last:pr-0">
              <p className="eyebrow">Our promise</p>
              <h3 className="mt-3 text-[2rem]">{p.title}</h3>
              <p className="mt-3 text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap overflow-x-clip py-20 md:py-32">
        <Certificate />
      </section>

      <section className="bg-paper-2 py-20 md:py-32">
        <div className="wrap grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Good to know" title={['Questions, answered', { text: 'plainly.', italic: true }]} />
            <Reveal delay={0.2} className="mt-8">
              <Button to="/faq" variant="outline">All questions</Button>
            </Reveal>
          </div>
          <FaqList limit={4} />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
