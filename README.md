# Daud DME website

Front-end website for Daud DME Ltd LLC, a durable medical equipment supplier in Salt Lake City, Utah.

Built with React, Vite, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Editing content

- **Products and prices:** `src/data/products.js` is the single source of truth for the catalogue at `/products`. Photos live in `public/images/products/`, named after each product's slug (lowercase, as Vercel paths are case-sensitive).
- **Phone, email and address:** `src/data/site.js`. Every link on the site reads from here.
- **Hours:** set `hours` in `src/data/site.js` to show them on the site.
- **Colors and dark mode:** `src/index.css`. Light values are in `@theme`; dark overrides are under `:root[data-theme='dark']`.

## Worth checking

- **Services and FAQ wording:** `src/data/content.js` describes delivery, repairs, coverage review and similar services. Confirm each one matches what the business offers.
- **Equipment guide:** `src/data/equipment.js` lists the illustrated guide at `/equipment`. Remove anything not supplied.
- **Contact form:** there is no backend, so the form opens the visitor's email app with the request written out. To collect requests directly, connect it to a form service in `submit` in `src/pages/Contact.jsx`.
- **Images:** check you hold a license for every photo in `public/images`.
- **Legal pages:** add a privacy policy and, if applicable, a HIPAA Notice of Privacy Practices.

## Where things live

| Path | Contents |
| --- | --- |
| `src/data/` | All editable content |
| `src/pages/` | One file per route |
| `src/lib/theme.js` | Light and dark mode toggle |
| `src/components/EquipmentArt.jsx` | Hand-drawn SVG plates |
| `src/index.css` | Colors, fonts and base styles |

Deep links work on Vercel through `vercel.json`. Other hosts need an equivalent rewrite to `index.html`.
