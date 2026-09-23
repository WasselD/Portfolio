import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return (
    <div data-tone="ink" className="min-h-screen">
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#000",
            borderRadius: "0px",
            padding: "12px 22px",
            fontSize: "0.9rem",
          },
          iconTheme: { primary: "#000", secondary: "#fff" },
        }}
      />
    </div>
  );
}
