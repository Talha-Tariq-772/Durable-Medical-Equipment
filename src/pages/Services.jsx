import { ClipboardCheck, FileText, GraduationCap, Repeat, Truck, Wrench } from 'lucide-react'
import { services } from '../data/content.js'
import { AudienceRows, ClosingCta, Process } from '../components/Sections.jsx'
import { PageHero, Reveal, SectionHead } from '../components/ui.jsx'

const icons = { ClipboardCheck, FileText, GraduationCap, Repeat, Truck, Wrench }

export default function Services() {
  return (
    <>
      <title>Services | Daud DME</title>
      <PageHero
        eyebrow="Services"
        title={['More than a', { text: 'delivery.', italic: true }]}
        intro="Equipment only helps when it fits, works and is used with confidence. Our services cover everything around the equipment itself."
      />

      <section className="wrap pb-20 md:pb-32">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-[#d9d5ca] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal key={s.title} delay={i * 0.05} y={14} className="bg-paper p-6 md:p-8">
                <span className="grid size-13 place-items-center rounded-full bg-mist text-pine">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h2 className="mt-5 text-[1.875rem]">{s.title}</h2>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Who we serve" title={['Different needs,', { text: 'same', italic: true }, 'care.']} className="mb-14 md:mb-20" />
          <AudienceRows />
        </div>
      </section>

      <section className="wrap py-20 md:py-32">
        <SectionHead
          eyebrow="How it works"
          title={['Four steps,', { text: 'one', italic: true }, 'team.']}
          className="mx-auto text-center"
        />
        <Process />
      </section>

      <ClosingCta />
    </>
  )
}
