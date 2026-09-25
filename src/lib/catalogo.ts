import fs from "node:fs";
import path from "node:path";
import datos from "@/data/catalogo.json";

/* Todo lo que se lee aquí lo generó scripts/parse-notebooks.mjs a partir de
   scripts/catalogo.mjs. Nada se escribe a mano en src/data. */

export type Nivel = "propio" | "final" | "formacion";

export interface Figura {
  src: string;
  ancho: number;
  alto: number;
  /** Fondo de la gráfica: las de marca son oscuras, las de matplotlib claras. */
  tono: "oscura" | "clara";
  alt: string;
}

export interface NotebookMeta {
  slug: string;
  serie: string;
  posicion: number;
  titulo: string;
  descripcion: string;
  resumen: string;
  area?: string;
  ruta: string;
  repoUrl: string;
  herramientas: string[];
  celdas: number;
  figuras: number;
  portada: Figura | null;
  tieneResultados: boolean;
}

export interface Serie {
  id: string;
  nivel: Nivel;
  titulo: string;
  lema?: string;
  descripcion: string;
  repoUrl?: string;
  portada: Figura | null;
  herramientas: string[];
  notebooks: string[];
}

export type Celda =
  | { t: "md"; html: string }
  | { t: "code"; html: string; lineas: number }
  | ({ t: "fig"; n: number } & Figura)
  | { t: "tabla"; html: string }
  | { t: "texto"; texto: string };

export interface ResultsTable {
  heading: string;
  note: string;
  /** De qué artefacto salieron las cifras, para que se puedan rastrear. */
  source: string;
  columns: { key: string; label: string; numeric: boolean }[];
  rows: (Record<string, string | number | boolean> & { best?: boolean })[];
}

export interface Contenido {
  slug: string;
  celdas: Celda[];
  resultados: ResultsTable | null;
}

const catalogo = datos as unknown as { series: Serie[]; notebooks: NotebookMeta[] };

export const series = catalogo.series;
export const notebooks = catalogo.notebooks;

const porSlug = new Map(notebooks.map((n) => [n.slug, n]));
const porId = new Map(series.map((s) => [s.id, s]));

export const getNotebook = (slug: string) => porSlug.get(slug);
export const getSerie = (id: string) => porId.get(id);
export const seriesDeNivel = (nivel: Nivel) => series.filter((s) => s.nivel === nivel);
export const notebooksDe = (serie: Serie) =>
  serie.notebooks.map((slug) => porSlug.get(slug)).filter((n): n is NotebookMeta => Boolean(n));

/** Anterior y siguiente dentro de la misma serie, en orden de lectura. */
export function vecinos(slug: string) {
  const n = porSlug.get(slug);
  const serie = n && porId.get(n.serie);
  if (!n || !serie) return { anterior: null, siguiente: null };
  const i = serie.notebooks.indexOf(slug);
  return {
    anterior: i > 0 ? porSlug.get(serie.notebooks[i - 1]) ?? null : null,
    siguiente: i < serie.notebooks.length - 1 ? porSlug.get(serie.notebooks[i + 1]) ?? null : null,
  };
}

/** Las celdas de un notebook. Se lee en el build: las páginas son estáticas. */
export function leerContenido(slug: string): Contenido {
  const archivo = path.join(process.cwd(), "src", "data", "notebooks", `${slug}.json`);
  return JSON.parse(fs.readFileSync(archivo, "utf-8")) as Contenido;
}

export const NIVEL_ETIQUETA: Record<Nivel, string> = {
  propio: "Proyecto propio",
  final: "Proyecto final del bootcamp",
  formacion: "Formación TripleTen",
};

/** Cifras del portafolio, calculadas de los datos en el build. */
export const cifras = {
  notebooks: notebooks.length,
  propios: seriesDeNivel("propio").length,
  figuras: notebooks.reduce((s, n) => s + n.figuras, 0),
};

/** Qué herramientas aparecen en el código de cuántos notebooks. */
export const herramientasEnNotebooks = (() => {
  const cuenta = new Map<string, number>();
  for (const n of notebooks) for (const h of n.herramientas) cuenta.set(h, (cuenta.get(h) ?? 0) + 1);
  return [...cuenta.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([nombre, veces]) => ({ nombre, veces }));
})();
