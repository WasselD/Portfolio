/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a fully static site in `out/` on `npm run build` — plain
  // HTML/CSS/JS with no Node.js server or API routes required. Deployable
  // to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3, etc).
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
