import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

export const metadata = {
  title: "Wassel Dridi | Full-Stack Developer & UX/UI Designer",
  description:
    "Wassel Dridi is a full-stack developer and UX/UI designer from Manouba, Tunisia, with experience in social media management and cybersecurity training.",
  icons: {
    icon: "/hero-portrait.jpg",
    shortcut: "/hero-portrait.jpg",
  },
  openGraph: {
    title: "Wassel Dridi | Full-Stack Developer & UX/UI Designer",
    description: "Full-stack development, UX/UI design, social media management, and practical AI tools.",
    type: "website",
    images: [
      {
        url: "https://raw.githubusercontent.com/WasselD/Portfolio/main/public/hero-portrait.jpg",
        width: 1024,
        height: 1024,
        alt: "Wassel Dridi, full-stack developer and UX/UI designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wassel Dridi | Full-Stack Developer & UX/UI Designer",
    description: "Full-stack development, UX/UI design, social media management, and practical AI tools.",
    images: ["https://raw.githubusercontent.com/WasselD/Portfolio/main/public/hero-portrait.jpg"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
