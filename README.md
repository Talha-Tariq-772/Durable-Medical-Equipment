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

## Before launch

- **Phone and email:** `src/data/site.js` holds placeholders. Replace them with the real details.
- **Hours:** set `hours` in `src/data/site.js` to show them on the site.
- **Services and FAQ wording:** `src/data/content.js` describes delivery, repairs, coverage review and similar services. Confirm each one matches what the business offers.
- **Equipment list:** `src/data/equipment.js` lists the catalogue. Remove anything not supplied.
- **Contact form:** there is no backend, so the form opens the visitor's email app with the request written out. To collect requests directly, connect it to a form service in `submit` in `src/pages/Contact.jsx`.
- **Images:** check you hold a license for every photo in `public/images`.
- **Legal pages:** add a privacy policy and, if applicable, a HIPAA Notice of Privacy Practices.

## Where things live

| Path | Contents |
| --- | --- |
| `src/data/` | All editable content |
| `src/pages/` | One file per route |
| `src/components/EquipmentArt.jsx` | Hand-drawn SVG plates |
| `src/index.css` | Colors, fonts and base styles |

Deep links work on Vercel through `vercel.json`. Other hosts need an equivalent rewrite to `index.html`.
