import { ClosingCta, FaqList } from '../components/Sections.jsx'
import { PageHero } from '../components/ui.jsx'

export default function Faq() {
  return (
    <>
      <title>FAQ | Daud DME</title>
      <PageHero
        eyebrow="Good to know"
        title={['Questions, answered', { text: 'plainly.', italic: true }]}
        intro="If your question is not here, please ask. There is no such thing as a small question when it comes to someone’s care."
      />
      <section className="wrap max-w-5xl! pb-12 md:pb-20">
        <FaqList />
      </section>
      <ClosingCta />
    </>
  )
}
