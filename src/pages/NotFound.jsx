import { Button, PageHero } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <>
      <title>Page not found | Daud DME</title>
      <PageHero
        eyebrow="404"
        title={['This page has', { text: 'gone missing.', italic: true }]}
        intro="The link may be old or mistyped. Here are some good places to go instead."
      >
        <div className="mt-8 flex flex-col gap-3 pb-20 sm:flex-row">
          <Button to="/">Back to home</Button>
          <Button to="/equipment" variant="outline">Browse equipment</Button>
        </div>
      </PageHero>
    </>
  )
}
