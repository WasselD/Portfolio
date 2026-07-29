import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Wassel Dridi — Portfolio",
  description:
    "Portfolio of Wassel Dridi, a developer building a fast, static, content-driven personal site.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Wassel Dridi — Portfolio",
    description:
      "Portfolio of Wassel Dridi, a developer building a fast, static, content-driven personal site.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wassel Dridi — Portfolio",
    description:
      "Portfolio of Wassel Dridi, a developer building a fast, static, content-driven personal site.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
