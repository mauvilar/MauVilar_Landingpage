import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cifras } from "@/lib/catalogo";
import { PERFIL, SITE_URL } from "@/lib/sitio";
import { enPalabras } from "@/lib/texto";

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

const TITULO = `${PERFIL.nombre} · Portafolio de ciencia de datos`;
/* La cifra sale del catálogo: si entra un notebook, cambia sola. */
const DESCRIPCION = `${cifras.notebooks} notebooks de ciencia de datos publicados completos: ${enPalabras(cifras.propios)} proyectos propios, el proyecto final del bootcamp y ${enPalabras(cifras.sprints)} sprints de TripleTen.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO,
    template: `%s · ${PERFIL.nombre}`,
  },
  description: DESCRIPCION,
  authors: [{ name: PERFIL.nombre, url: SITE_URL }],
  creator: PERFIL.nombre,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: PERFIL.nombre,
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: `${PERFIL.nombre}, ${PERFIL.puesto}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};

/* Crema, no blanco: la barra del navegador móvil también es superficie. */
export const viewport: Viewport = {
  themeColor: "#F3F1EC",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    /* Las variables de fuente van en <html>, no en <body>: `@theme` las lee
       desde :root, y una custom property que referencia otra no definida en
       ese mismo elemento se hereda ya inválida. */
    <html lang="es" className={`${archivo.variable} ${outfit.variable} ${plexMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
