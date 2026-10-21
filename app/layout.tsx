import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Gilroy-Heavy.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
  fallback: ["Plus Jakarta Sans", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pura.com.ar"),
  title: {
    default: "PURA · Protección solar natural",
    template: "%s · PURA",
  },
  description:
    "Protector solar facial en barra con filtros minerales, FPS 50+ y amplio espectro. Portable, limpio y fácil de reaplicar.",
  openGraph: {
    title: "PURA · Protección solar natural",
    description: "Protección solar que entra en tu bolsillo.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FEFEFE",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={gilroy.variable}>
      <body>
        <a href="#contenido" className="sr-only">
          Saltar al contenido
        </a>
        <SmoothScroll />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
