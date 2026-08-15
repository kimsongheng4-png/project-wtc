# Toto Coffee (React)

Converted from the original static HTML/CSS site into a React app using Vite + React Router.

## How it maps to your original files

| Original file    | React equivalent                         |
|-------------------|-------------------------------------------|
| index.html        | `src/pages/Home.jsx`                      |
| menu.html          | `src/pages/Menu.jsx`                      |
| delivery.html      | `src/pages/Delivery.jsx`                  |
| contact.html       | `src/pages/Contact.jsx`                   |
| nav (repeated)     | `src/components/Navbar.jsx`               |
| footer (repeated)  | `src/components/Footer.jsx`               |
| product `<div class="card">` blocks | `src/components/ProductCard.jsx` (reused, data-driven) |
| style.css          | `src/style.css` (unchanged, same class names) |

Product data (name/price/image) now lives in `src/data/products.js` instead of being copy-pasted in the HTML — edit that file to add/remove drinks.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`, which you can deploy anywhere (Netlify, Vercel, GitHub Pages, etc.).
