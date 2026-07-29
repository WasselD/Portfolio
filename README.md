# Portfolio — Static Public Site

This portfolio is a **100% frontend, no-backend** Next.js site. There is no
API, database, or server code anywhere in the project — `next build`
produces a plain static export (`out/`) of HTML, CSS, and JS that you can
drop on any static host. All public-facing content lives in `lib/data/` and
is rendered directly on the home page. The one thing a static site can't do
on its own — receiving the contact form — is handled by
[FormSubmit](https://formsubmit.co), a free third-party form endpoint, so
even the contact form needs no backend of its own.

## What's included

- **Next.js 15 + Tailwind CSS** project scaffold with the design tokens from
  the brief baked into `tailwind.config.js` (background `#050816`, card
  `#0F172A`, primary `#3B82F6`, accent `#06B6D4`, success `#22C55E`, 18–24px
  radii, glass/hairline borders).
- **Dark/light theme system** (`components/providers/ThemeProvider.js`) —
  dark by default, persisted to `localStorage`, respects
  `prefers-color-scheme` on first visit.
- **Space Grotesk (display) + Inter (body)** loaded via `next/font/google`.
- **Global chrome**: animated loading screen, custom cursor (desktop only,
  respects `prefers-reduced-motion`), floating glass navbar with mobile menu
  and theme toggle.
- **Hero section** (`components/sections/Hero.js`): animated gradient blobs +
  grid background, floating shapes, photo placeholder with glass floating
  info cards, typing-effect role rotation, "CompTIA A+ Certified" badge,
  resume download + contact CTAs, social links, scroll indicator.
- **About** — bio, education, and personal values.
- **Skills** — 8 categories, search + filter, animated progress bars.
- **Projects** — featured row, search + category filter, pagination,
  GitHub/live-demo links, status badges.
- **Certifications** — credential cards with status pills.
- **Experience** — vertical timeline with responsibilities and tech tags.
- **Services** — 6-item icon grid.
- **Testimonials** — autoplaying carousel with manual nav + dots.
- **Contact** — contact links, embedded map, and a working message form
  that submits straight to [FormSubmit](https://formsubmit.co) (see below)
  — no API route, no server, no database.
- **Footer** — quick links, socials, copyright, back-to-top.

All content lives in `lib/data/` (`skills.js`, `projects.js`,
`certifications.js`, `experience.js`, `services-testimonials.js`) so it's
easy to edit by hand without any backend wiring.

Also included: `next.config.js` (static export config), `postcss.config.js`
and `jsconfig.json` (the `@/...` import alias used throughout the
components) — these are required for `npm run build` to work and weren't
part of the original upload.

## Contact form (FormSubmit, no backend)

The form in `components/sections/Contact.js` submits directly from the
browser to FormSubmit's AJAX endpoint:

```
https://formsubmit.co/ajax/wasselforbusiness@gmail.com
```

Messages sent from the form arrive by email at **wasselforbusiness@gmail.com**.
There's no API route, server function, or environment variable involved —
it's a plain `fetch()` call from the client, which is why it still works
in a fully static export.

**One-time setup:** the *first* message ever submitted after deploying will
trigger a confirmation email from FormSubmit to wasselforbusiness@gmail.com.
Click the confirmation link in that email once, and every submission after
that is delivered automatically — no further action needed. Until it's
confirmed, submissions won't reach the inbox, so send yourself a test
message right after your first deploy.

Other notes:
- A hidden honeypot field (`_honey`) quietly discards spam-bot submissions.
- `_captcha: "false"` is set because there's no visible reCAPTCHA widget on
  an AJAX form — FormSubmit's spam filtering still applies.
- The email subject line is built from whatever the visitor types into
  "Subject", and the message body uses FormSubmit's table template.
- **To change the destination email**, edit the `FORM_SUBMIT_ENDPOINT`
  constant in `Contact.js` — and remember the new address will need its own
  one-time confirmation email.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Drop your résumé at `public/resume.pdf` so the "Download resume" button
resolves, and swap the photo placeholder in `Hero.js` for a real `<Image />`
when you have a headshot.

## Building & deploying (static, no server)

```bash
npm run build
```

This generates a static site in `out/` — plain HTML, CSS, and JS, with no
Node.js server required to run it. Deploy that folder as-is to any static
host: GitHub Pages, Netlify, Cloudflare Pages, S3/CloudFront, Vercel
(static), etc. There's nothing to configure server-side and no environment
variables to set — the contact form talks to FormSubmit directly from the
visitor's browser.

## Still worth adding later

- Real project screenshots and a real headshot
- SEO extras like sitemap, robots, and structured data
- Extra accessibility and performance polish if you want to keep iterating

Let me know when you're ready for the next phase and I'll pick up from here.
