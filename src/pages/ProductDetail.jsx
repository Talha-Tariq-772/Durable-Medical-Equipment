import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { categoryLabel, formatPrice, getProduct, getRelated } from '../data/products.js'
import ProductCard, { CategoryTag, ProductCtas, ProductImage, RxBadge } from '../components/ProductCard.jsx'
import { OrderSteps } from '../components/Sections.jsx'
import { Reveal } from '../components/ui.jsx'
import { PriceNote } from './Products.jsx'
import NotFound from './NotFound.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />

  const related = getRelated(product)

  return (
    <>
      <title>{`${product.name} | Daud DME`}</title>
      <meta name="description" content={`${product.description} Estimated ${formatPrice(product)}. Daud DME, Salt Lake City, Utah.`} />

      <section className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/products" className="underline-offset-4 hover:text-ink hover:underline">Products</Link></li>
            <li className="flex items-center gap-1.5">
              <ChevronRight aria-hidden="true" className="size-4" />
              <Link to={`/products?category=${product.category}`} className="underline-offset-4 hover:text-ink hover:underline">
                {categoryLabel(product.category)}
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-ink">
              <ChevronRight aria-hidden="true" className="size-4 text-ink-soft" />
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          <Reveal y={16}>
            <ProductImage product={product} eager className="aspect-square rounded-[1.75rem] ring-1 ring-line" sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <CategoryTag id={product.category} />
              {product.prescriptionRequired && <RxBadge />}
            </div>
            <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,4.25rem)]">{product.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">{product.description}</p>

            <div className="mt-7 border-y border-line py-5">
              <p className="text-sm font-medium text-ink-soft">Estimated price range</p>
              <p className="mt-1 font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight">{formatPrice(product)}</p>
            </div>

            {product.prescriptionRequired && (
              <p className="mt-5 rounded-2xl bg-mist p-4 leading-relaxed text-ink">
                This item needs a valid prescription from a licensed provider. Have it ready when you order, or ask us what is required.
              </p>
            )}

            <ProductCtas product={product} size="lg" className="mt-7" />
            <PriceNote className="mt-6" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2 py-16 md:py-24">
        <div className="wrap">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-[clamp(2rem,4vw,3rem)]">
              {related.sameCategoryOnly ? `More in ${categoryLabel(product.category)}` : 'You might also need'}
            </h2>
            <Link to="/products" className="font-semibold underline underline-offset-4 hover:text-teal">See all products</Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {related.items.map((p) => (
              <li key={p.slug}><ProductCard product={p} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">How to order</p>
        <OrderSteps className="mt-8" />
      </section>
    </>
  )
}
