import type { NextConfig } from "next";
import { redirecciones } from "./scripts/catalogo.mjs";

const nextConfig: NextConfig = {
  /* Las imágenes salen del parser ya en su tamaño final (WebP y PNG) y se
     sirven como archivos estáticos con <img>. Sin el optimizador de Vercel:
     en el plan gratuito tiene límites y aquí no hace falta. */
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  /* Los slugs viejos de producción redirigen (308) a los del catálogo. */
  async redirects() {
    return redirecciones();
  },
};

export default nextConfig;
