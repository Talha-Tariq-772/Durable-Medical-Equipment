import { promises } from '../data/content.js'
import { site } from '../data/site.js'
import { Certificate, ClosingCta } from '../components/Sections.jsx'
import { PageHero, Reveal, Seal } from '../components/ui.jsx'

export default function About() {
  return (
    <>
      <title>About | Daud DME</title>
      <PageHero
        eyebrow="About us"
        title={['A new company with an', { text: 'old-fashioned', italic: true }, 'idea of service.']}
      />

      <section className="wrap grid items-center gap-12 pb-20 md:grid-cols-2 md:gap-20 md:pb-32">
        <Reveal className="relative">
          <img
            src="/images/care-team.webp"
            alt="A team of doctors and nurses in white coats and blue scrubs"
            width="735"
            height="801"
            className="w-full rounded-t-[50vw] rounded-b-3xl bg-paper-2 object-cover md:rounded-t-[16rem]"
          />
          <Seal className="absolute -bottom-6 right-2 size-24 md:size-32" />
        </Reveal>
        <div className="space-y-5 text-lg text-ink-soft">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
              A durable medical equipment business provides equipment and supplies to patients, hospitals, clinics and healthcare providers. That is what we do, and we take it personally.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              {site.legalName} specializes in supplying high-quality medical equipment designed to support patient care, recovery, mobility and daily living needs.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              The company was organized in Utah in May 2026 and is based in {site.address.city}. Behind every order is someone trying to get home, stay home or care for a person they love, so we work to make that part of life simpler.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-pine-deep py-20 text-paper md:py-32">
        <div className="wrap">
          <p className="eyebrow text-mist!">What you can hold us to</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="border-t border-paper/25 pt-5">
                <p className="font-display text-xl italic text-glow">0{i + 1}</p>
                <h2 className="mt-3 text-[clamp(2rem,3vw,2.5rem)]">{p.title}</h2>
                <p className="mt-3 text-mist">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap overflow-x-clip py-20 md:py-32">
        <Certificate />
      </section>

      <ClosingCta />
    </>
  )
}
