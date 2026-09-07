import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://portfolio.nyxaistudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mauricio Vilar Giribet · Portafolio de Data Science",
    template: "%s · Mauricio Vilar Giribet",
  },
  description:
    "Veinte proyectos de ciencia de datos con el notebook completo a la vista: limpieza, análisis exploratorio, pruebas de hipótesis, SQL y modelos de machine learning.",
  keywords: [
    "Data Science",
    "AI Engineer",
    "Machine Learning",
    "Python",
    "Análisis de Datos",
    "Mauricio Vilar Giribet",
    "NyxAI Studio",
    "Portafolio",
  ],
  authors: [{ name: "Mauricio Vilar Giribet" }],
  creator: "Mauricio Vilar Giribet",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    title: "Mauricio Vilar Giribet · Portafolio de Data Science",
    description:
      "Veinte proyectos de ciencia de datos con el notebook completo a la vista, de la limpieza al modelo.",
    siteName: "Mauricio Vilar · Portafolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauricio Vilar Giribet · Portafolio de Data Science",
    description:
      "Veinte proyectos de ciencia de datos con el notebook completo a la vista, de la limpieza al modelo.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Las variables de fuente van en <html>, no en <body>: `@theme` las lee
       desde :root, y una custom property que referencia otra no definida en
       ese mismo elemento se hereda ya inválida. */
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="relative flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
