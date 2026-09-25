/**
 * Imágenes para compartir (Open Graph), 1200×630 en PNG.
 *
 * LinkedIn, X y WhatsApp no muestran SVG, así que se dibujan aquí con el
 * motor de next/og (Satori + resvg) y se guardan como archivos estáticos.
 * El motor no lee fuentes variables: usa las instancias estáticas de
 * scripts/og-fonts/ (Archivo ancho y pesado, Outfit, IBM Plex Mono).
 */
import fs from "node:fs";
import path from "node:path";
import React from "react";

const h = React.createElement;

export const OG_ANCHO = 1200;
export const OG_ALTO = 630;

/* Primitivos de tokens.css. Satori no lee CSS, así que los valores van
   aquí, con el nombre del token al lado para rastrearlos. */
const C = {
  noche: "#050706", //  --nyx-night-900
  crema: "#F3F1EC", //  --nyx-cream / --nyx-on-dark
  cremaMedia: "rgba(243, 241, 236, 0.70)", // --nyx-on-dark-muted
  cremaTenue: "rgba(243, 241, 236, 0.52)", // --nyx-on-dark-faint
  filete: "rgba(243, 241, 236, 0.12)", //     --nyx-line-dark
  verde: "#00DF81", //  --nyx-green
};

export async function crearRenderOg(root) {
  const { ImageResponse } = await import("next/og.js");
  const fuentes = path.join(root, "scripts", "og-fonts");
  const leer = (f) => fs.readFileSync(path.join(fuentes, f));
  const fonts = [
    { name: "Archivo", data: leer("Archivo-Expanded-ExtraBold.ttf"), weight: 800, style: "normal" },
    { name: "Outfit", data: leer("Outfit-Regular.ttf"), weight: 400, style: "normal" },
    { name: "Outfit", data: leer("Outfit-Medium.ttf"), weight: 500, style: "normal" },
    { name: "Plex", data: leer("IBMPlexMono-Medium.ttf"), weight: 500, style: "normal" },
  ];
  /* El isotipo sale del kit (public/logo.png): se monta, no se redibuja. */
  const logo = `data:image/png;base64,${fs.readFileSync(path.join(root, "public", "logo.png")).toString("base64")}`;

  const marco = (hijos) =>
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.noche,
          color: C.crema,
          padding: "64px 72px",
          fontFamily: "Outfit",
        },
      },
      ...hijos
    );

  const cabecera = (texto) =>
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 20 } },
      h("img", { src: logo, width: 52, height: 52 }),
      h(
        "div",
        {
          style: {
            fontFamily: "Plex",
            fontSize: 20,
            letterSpacing: 3.6,
            textTransform: "uppercase",
            color: C.cremaMedia,
          },
        },
        texto
      )
    );

  const barra = h("div", { style: { width: 96, height: 6, background: C.verde } });

  const { default: sharp } = await import("sharp");
  async function png(elemento) {
    const res = new ImageResponse(elemento, { width: OG_ANCHO, height: OG_ALTO, fonts });
    // Paleta de 256 colores: tres tintas planas y texto; baja de ~60 a ~20 KB.
    return sharp(Buffer.from(await res.arrayBuffer()))
      .png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 })
      .toBuffer();
  }

  return {
    /** Portada del sitio. */
    async home({ nombre, puesto, lugar, proyectos }) {
      return png(
        marco([
          cabecera("Portafolio de ciencia de datos"),
          h(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 26 } },
            h(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "Archivo",
                  fontSize: 92,
                  lineHeight: 0.92,
                  letterSpacing: -1.4,
                  textTransform: "uppercase",
                },
              },
              ...nombre.map((linea) => h("div", { key: linea }, linea))
            ),
            h("div", { style: { fontSize: 32, color: C.crema } }, `${puesto} · ${lugar}`)
          ),
          h(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 18 } },
            barra,
            h(
              "div",
              {
                style: {
                  fontFamily: "Plex",
                  fontSize: 18,
                  letterSpacing: 0.4,
                  color: C.cremaMedia,
                },
              },
              proyectos.join(" · ")
            )
          ),
        ])
      );
    },

    /** Un notebook: a qué proyecto pertenece, su título y su descripción. */
    async notebook({ serie, posicion, total, titulo, descripcion }) {
      const tam = titulo.length > 38 ? 54 : titulo.length > 26 ? 62 : 70;
      return png(
        marco([
          cabecera("Mauricio Vilar Giribet"),
          h(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 24 } },
            h(
              "div",
              {
                style: {
                  fontFamily: "Plex",
                  fontSize: 22,
                  letterSpacing: 2.6,
                  textTransform: "uppercase",
                  color: C.verde,
                },
              },
              total > 1 ? `${serie} · ${posicion} de ${total}` : serie
            ),
            h(
              "div",
              {
                style: {
                  fontFamily: "Archivo",
                  fontSize: tam,
                  lineHeight: 0.98,
                  letterSpacing: -0.8,
                  textTransform: "uppercase",
                  maxWidth: 1040,
                },
              },
              titulo
            )
          ),
          h(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 20 } },
            barra,
            h(
              "div",
              { style: { fontSize: 26, lineHeight: 1.35, color: C.cremaMedia, maxWidth: 1000 } },
              descripcion
            )
          ),
        ])
      );
    },
  };
}
