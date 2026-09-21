/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site in `out/` — deployable to Netlify, GitHub Pages, Cloudflare Pages, S3...
  output: "export",
  // /admin -> admin/index.html so it works on every static host
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
