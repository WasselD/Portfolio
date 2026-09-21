import { Toaster } from "react-hot-toast";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { ContentProvider } from "@/components/providers/ContentProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <IntroProvider>
      <ContentProvider>
        <SmoothScroll />
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4500,
            style: {
              background: "#fff",
              color: "#000",
              borderRadius: "0px",
              padding: "12px 22px",
              fontSize: "0.9rem",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.9)",
            },
            iconTheme: { primary: "#000", secondary: "#fff" },
          }}
        />
      </ContentProvider>
    </IntroProvider>
  );
}
