import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

export const metadata = {
  // TODO: set this to your real domain (used to resolve social-share URLs)
  metadataBase: new URL("https://example.com"),
  title: "Wassel Dridi | Full Stack Developer",
  description:
    "Full stack developer and CompTIA Security+ certified. Building secure, scalable web applications with AI-driven efficiency.",
  openGraph: {
    title: "Wassel Dridi | Full Stack Developer",
    description: "Building secure, scalable web applications with AI-driven efficiency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wassel Dridi | Full Stack Developer",
    description: "Building secure, scalable web applications with AI-driven efficiency.",
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
