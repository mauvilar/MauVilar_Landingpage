import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* Las tres familias de la marca, una por rol: Archivo para el póster, Outfit
   para el cuerpo, IBM Plex Mono para etiquetas y datos.
   Archivo se carga como variable con el eje wdth: el póster va a wdth 125. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://mauvilarlandingpage.vercel.app";

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

/* Crema, no blanco: la barra del navegador móvil también es superficie. */
export const viewport: Viewport = {
  themeColor: "#F3F1EC",
  colorScheme: "light",
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
      className={`${archivo.variable} ${outfit.variable} ${plexMono.variable}`}
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
