#!/usr/bin/env node
/**
 * Pipeline del portafolio: notebooks → datos → páginas.
 *
 * Lee los notebooks de NOTEBOOKS_DIR según scripts/catalogo.mjs y deja
 * resuelto todo lo que el sitio necesita, para que Next.js no procese
 * notebooks ni sanee HTML en tiempo de ejecución:
 *
 *   src/data/catalogo.json               series y metadatos (portada, sitemap, 404)
 *   src/data/notebooks/<slug>.json       celdas ya convertidas a HTML saneado
 *   public/projects/<slug>/fig-NN.webp   figuras optimizadas con sharp
 *   public/og/<slug>.png, home.png       imágenes para compartir, 1200×630
 *
 * Es determinista: borra lo que generó antes y vuelve a escribirlo todo, sin
 * fechas ni orden que dependa del sistema de archivos. Dos corridas sobre los
 * mismos notebooks dejan los mismos bytes.
 *
 * NOTEBOOKS_DIR apunta al clon de mauvilar/Proyectos-data-science. Por
 * defecto es la carpeta hermana ../notebooks-source. Si no existe (en Vercel,
 * por ejemplo), el script no toca nada y el build usa lo que está versionado.
 *
 *   NOTEBOOKS_DIR=/ruta/al/clon npm run parse
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EXCLUIDOS, REPO, SERIES } from "./catalogo.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NOTEBOOKS_DIR = path.resolve(
  process.env.NOTEBOOKS_DIR || path.join(ROOT, "..", "notebooks-source")
);
const DATA_DIR = path.join(ROOT, "src", "data");
const CATALOGO_JSON = path.join(DATA_DIR, "catalogo.json");
const NOTEBOOKS_OUT = path.join(DATA_DIR, "notebooks");
const FIGURAS_OUT = path.join(ROOT, "public", "projects");
const OG_OUT = path.join(ROOT, "public", "og");
/* Formato anterior (un solo JSON con todas las celdas). Se borra si aparece. */
const OBSOLETOS = [path.join(DATA_DIR, "projects.json")];

const REPO_BLOB = `${REPO}/blob/main`;
const REPO_TREE = `${REPO}/tree/main`;

/* Figuras: ancho máximo servido. Las gráficas de matplotlib en "retina"
   salen a 2,400 px; a 1,600 se leen igual y pesan la mitad. */
const FIGURA_ANCHO_MAX = 1600;
const TEXTO_MAX = 5000;
const DESCRIPCION_MAX = 160;

const TECNOLOGIAS = [
  ["pandas", "pandas"],
  ["polars", "Polars"],
  ["numpy", "NumPy"],
  ["matplotlib", "Matplotlib"],
  ["seaborn", "seaborn"],
  ["plotly", "Plotly"],
  ["scipy", "SciPy"],
  ["statsmodels", "statsmodels"],
  ["sklearn", "scikit-learn"],
  ["xgboost", "XGBoost"],
  ["lightgbm", "LightGBM"],
  ["optuna", "Optuna"],
  ["shap", "SHAP"],
  ["sqlalchemy", "SQLAlchemy"],
];

const MODELOS = {
  logistic_regression: "Regresión logística",
  random_forest: "Random Forest",
  xgboost: "XGBoost",
  lightgbm: "LightGBM",
};

const COLUMNAS_RESULTADOS = [
  { key: "model_name", label: "Modelo", numeric: false },
  { key: "cv_roc_auc", label: "ROC AUC (CV)", numeric: true },
  { key: "test_roc_auc", label: "ROC AUC (test)", numeric: true },
  { key: "test_gini", label: "Gini", numeric: true },
  { key: "test_ks", label: "KS", numeric: true },
  { key: "test_brier", label: "Brier", numeric: true },
];

/* ------------------------------------------------------------------------ */
/* Plantilla del bootcamp                                                     */
/* ------------------------------------------------------------------------ */

/* Los notebooks de TripleTen traen instrucciones para el alumno que, en un
   portafolio, se leen como trabajo sin terminar. Se comparan sin acentos y
   en minúsculas, después de quitar la marca de encabezado o de lista. */
const LINEAS_PLANTILLA = [
  /^escribe aqui tus? /,
  /^escribe tus (observaciones|conclusiones|respuestas)/,
  /^escribe algunas observaciones por tu parte/,
  /^describe brevemente (tus|cuales son tus) hallazgos/,
  /^\[(describe|escribe)\b.*\]$/,
  /escribelo aqui\.?`?$/,
];
const COMENTARIO_PLANTILLA = /#\s*escribe tu codigo aqui\s*$/;

const sinAcentos = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function esLineaPlantilla(linea) {
  const limpia = sinAcentos(linea)
    .replace(/^\s*(#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*)*/, "")
    .replace(/^[`*_]+|[`*_]+$/g, "")
    .trim();
  return limpia !== "" && LINEAS_PLANTILLA.some((re) => re.test(limpia));
}

/** Pistas plegables del bootcamp: `<details>` con "Haz clic para ver la pista". */
const esPista = (md) => /^\s*<details>/i.test(md) && /ver la pista/i.test(md);

/** Retroalimentación del revisor pegada en el notebook: no es trabajo propio. */
const esRetroalimentacion = (md) =>
  /\btu (trabajo|proyecto)\b/i.test(md) &&
  /(fortalezas|oportunidad de mejora|sigue así)/i.test(md);

function limpiarMarkdown(md) {
  if (esPista(md) || esRetroalimentacion(md)) return { texto: "", quitadas: 0 };
  const lineas = md.split("\n");
  // Si el primer renglón con texto es un encabezado de plantilla, la celda
  // entera son instrucciones para el alumno.
  const primera = lineas.find((l) => l.trim() !== "") || "";
  if (/^\s*#/.test(primera) && esLineaPlantilla(primera)) return { texto: "", quitadas: 1 };
  const quedan = lineas.filter((l) => !esLineaPlantilla(l));
  const texto = quedan
    .join("\n")
    // Una fila de "=" debajo de un párrafo lo vuelve título (setext). En
    // estos notebooks se usa como separador, así que se vuelve filete.
    .replace(/^={3,}\s*$/gm, "\n* * *\n")
    .replace(/\n{3,}/g, "\n\n");
  return { texto, quitadas: lineas.length - quedan.length };
}

function limpiarCodigo(codigo) {
  return codigo
    .split("\n")
    .flatMap((l) => {
      if (!COMENTARIO_PLANTILLA.test(sinAcentos(l))) return [l];
      const sin = l.replace(/#\s*escribe tu c[oó]digo aqu[ií]\s*$/i, "").replace(/\s+$/, "");
      return sin.trim() === "" ? [] : [sin];
    })
    .join("\n")
    .replace(/\n+$/, "");
}

/* ------------------------------------------------------------------------ */
/* Utilidades                                                                 */
/* ------------------------------------------------------------------------ */

const texto = (v) => (Array.isArray(v) ? v.join("") : v || "");
const escapar = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sinAnsi = (s) => s.replace(/\u001b\[[0-9;]*[A-Za-z]/g, "");

function encabezadoPlano(md) {
  return md
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*\d+[.)]\s*/, "")
    .trim();
}

function recortar(s, max) {
  if (s.length <= max) return s;
  const corte = s.slice(0, max);
  const ultimo = corte.lastIndexOf("\n");
  return `${corte.slice(0, ultimo > max * 0.6 ? ultimo : max)}\n… (salida recortada; está completa en GitHub)`;
}

function detectarTecnologias(celdas) {
  const encontradas = new Set();
  let sql = false;
  for (const c of celdas) {
    if (c.cell_type !== "code") continue;
    const src = texto(c.source);
    for (const [modulo, nombre] of TECNOLOGIAS) {
      const re = new RegExp(`^\\s*(?:from|import)\\s+${modulo}(?:[\\s.,;]|$)`, "m");
      if (re.test(src)) encontradas.add(nombre);
    }
    if (/\bSELECT\s+[\s\S]+?\bFROM\b/i.test(src)) sql = true;
  }
  const orden = TECNOLOGIAS.map(([, n]) => n).filter((n, i, a) => a.indexOf(n) === i);
  return ["Python", ...orden.filter((n) => encontradas.has(n)), ...(sql ? ["SQL"] : [])];
}

/** Títulos literales de la gráfica en el código que la produjo, en orden. */
const PATRONES_TITULO = [
  /\btitulo\(\s*\w+\s*,\s*(f?)(["'])((?:(?!\2).)*)\2/g,
  /\.set_title\(\s*(f?)(["'])((?:(?!\2).)*)\2/g,
  /\bplt\.title\(\s*(f?)(["'])((?:(?!\2).)*)\2/g,
  /\bsuptitle\(\s*(f?)(["'])((?:(?!\2).)*)\2/g,
  /\.plot\((?:[^()]|\([^()]*\))*?\btitle\s*=\s*(f?)(["'])((?:(?!\2).)*)\2/g,
];
function titulosDeGrafica(codigo) {
  const hallados = [];
  for (const re of PATRONES_TITULO) {
    for (const m of codigo.matchAll(re)) {
      const [, esF, , valor] = m;
      if (esF && /[{}]/.test(valor)) continue;
      const limpio = valor
        .replace(/\\n/g, " ")
        .replace(/\s*—\s*/g, ", ")
        .replace(/\s+/g, " ")
        .trim();
      if (limpio.length > 3) hallados.push([m.index, limpio]);
    }
  }
  return hallados.sort((a, b) => a[0] - b[0]).map(([, t]) => t);
}

/** Representaciones que Jupyter imprime al graficar: ruido, no resultado. */
const REPR_RUIDO =
  /^(?:<(?:Figure|Axes|AxesSubplot|matplotlib|seaborn)[^>]*>|\[<matplotlib[^\]]*\]|Text\(\d.*\)|<Figure size [^>]+>)\s*$/;

function cargarResultados(spec, dirNotebook) {
  if (!spec) return null;
  const archivo = path.join(dirNotebook, spec.archivo);
  if (!fs.existsSync(archivo)) {
    console.warn(`  ⚠ resultados no encontrados: ${archivo}`);
    return null;
  }
  const raw = JSON.parse(fs.readFileSync(archivo, "utf-8"));
  // Mismo orden con el que el pipeline eligió el modelo: ROC AUC de CV.
  const rows = [...raw.models]
    .sort((a, b) => b.cv_roc_auc - a.cv_roc_auc)
    .map((m) => {
      const row = { model_name: MODELOS[m.model_name] || m.model_name };
      for (const col of COLUMNAS_RESULTADOS) {
        // Cadena con cuatro decimales para que la columna alinee.
        if (col.numeric) row[col.key] = m[col.key].toFixed(4);
      }
      row.best = m.model_name === raw.best_model;
      return row;
    });
  return {
    heading: spec.titulo,
    note: spec.nota,
    source: `${spec.archivo} · ${new Date(raw.generated_at).toISOString().slice(0, 10)}`,
    columns: COLUMNAS_RESULTADOS,
    rows,
  };
}

/* ------------------------------------------------------------------------ */
/* Render: markdown, código, tablas y figuras                                  */
/* ------------------------------------------------------------------------ */

async function crearRender() {
  const [{ marked }, { default: DOMPurify }, { createHighlighter }, { default: sharp }] =
    await Promise.all([
      import("marked"),
      import("isomorphic-dompurify"),
      import("shiki"),
      import("sharp"),
    ]);

  marked.setOptions({ gfm: true, breaks: false });

  /* Enlaces externos: pestaña nueva y sin referrer. */
  DOMPurify.addHook("afterSanitizeAttributes", (nodo) => {
    if (nodo.tagName === "A" && /^https?:/i.test(nodo.getAttribute("href") || "")) {
      nodo.setAttribute("target", "_blank");
      nodo.setAttribute("rel", "noopener noreferrer");
    }
  });

  const SANEAR_MD = {
    ALLOWED_TAGS: [
      "p", "br", "hr", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong",
      "em", "b", "i", "del", "s", "code", "pre", "blockquote", "a", "table",
      "thead", "tbody", "tr", "th", "td", "sub", "sup", "small", "span",
      "details", "summary",
    ],
    ALLOWED_ATTR: ["href", "id", "title", "colspan", "rowspan", "align"],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|#)/i,
  };
  const SANEAR_TABLA = {
    ALLOWED_TAGS: [
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "br",
      "b", "i", "strong", "em", "code", "span", "p",
    ],
    ALLOWED_ATTR: ["colspan", "rowspan"],
  };

  /* Tema de clasificación: cada categoría de token lleva un color centinela
     que aquí se traduce a una clase corta. Los colores reales los pone
     globals.css desde los tokens de la marca (.code-block .k, .f, ...). */
  const CATEGORIAS = {
    k: ["keyword", "keyword.control", "keyword.operator.logical", "storage", "storage.type",
      "storage.modifier", "variable.language", "constant.language", "support.type.primitive"],
    f: ["entity.name.function", "support.function", "meta.function-call.generic",
      "entity.name.class", "entity.name.type", "support.class", "support.type"],
    n: ["constant.numeric", "constant.language.boolean", "constant.other",
      "entity.name.function.decorator", "meta.decorator", "support.module"],
    c: ["comment", "punctuation.definition.comment", "string.quoted.docstring"],
  };
  /* La puntuación y los operadores van en el color base, sin clase: en
     notebooks de pandas son casi la mitad de los tokens, y marcarlos
     duplicaba el peso del HTML sin ayudar a leer. */
  const CENTINELA = { k: "#000001", f: "#000002", n: "#000003", c: "#000005" };
  const CLASE = Object.fromEntries(Object.entries(CENTINELA).map(([k, v]) => [v, k]));
  const tema = {
    name: "clasificador",
    type: "dark",
    colors: { "editor.background": "#000000", "editor.foreground": "#FFFFFF" },
    settings: [
      { settings: { background: "#000000", foreground: "#FFFFFF" } },
      // Cadenas, variables, puntuación y operadores quedan en el color base:
      // sin clase y sin <span>. "keyword.operator" va explícito para que no
      // herede el verde de "keyword".
      {
        scope: ["string", "variable", "meta.object-literal.key", "punctuation", "keyword.operator", "meta.brace"],
        settings: { foreground: "#FFFFFF" },
      },
      // Orden: lo más específico al final para que gane.
      ...["k", "f", "n", "c"].map((k) => ({
        scope: CATEGORIAS[k],
        settings: { foreground: CENTINELA[k] },
      })),
    ],
  };
  const resaltador = await createHighlighter({ themes: [tema], langs: ["python", "sql"] });

  function codigoHtml(codigo, lenguaje) {
    const lang = resaltador.getLoadedLanguages().includes(lenguaje) ? lenguaje : "python";
    const { tokens } = resaltador.codeToTokens(codigo, { lang, theme: "clasificador" });
    const lineas = tokens.map((linea) => {
      let html = "";
      let actual = null;
      let buffer = "";
      const vaciar = () => {
        if (!buffer) return;
        html += actual ? `<span class="${actual}">${buffer}</span>` : buffer;
        buffer = "";
      };
      for (const t of linea) {
        const clase = CLASE[(t.color || "").toLowerCase()] || null;
        // Espacios sin clase propia: se pegan al token vecino.
        const efectiva = /^\s+$/.test(t.content) ? actual : clase;
        if (efectiva !== actual) {
          vaciar();
          actual = efectiva;
        }
        buffer += escapar(t.content);
      }
      vaciar();
      return html;
    });
    return `<pre><code>${lineas.join("\n")}</code></pre>`;
  }

  function markdownHtml(tokens) {
    const html = marked.parser(tokens);
    return DOMPurify.sanitize(html, SANEAR_MD)
      .replace(/<h1\b/g, "<h2")
      .replace(/<\/h1>/g, "</h2>");
  }

  function tablaHtml(html) {
    return DOMPurify.sanitize(html, SANEAR_TABLA)
      .replace(/>\s+</g, "><")
      .trim();
  }

  async function tono(buf) {
    // Promedio de luminancia del borde: el fondo de la figura.
    const { data, info } = await sharp(buf)
      .flatten({ background: "#ffffff" })
      .resize({ width: 120 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: w, height: hgt, channels: ch } = info;
    let suma = 0;
    let n = 0;
    for (let y = 0; y < hgt; y++) {
      for (let x = 0; x < w; x++) {
        if (x > 1 && x < w - 2 && y > 1 && y < hgt - 2) continue;
        const i = (y * w + x) * ch;
        suma += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        n++;
      }
    }
    return suma / n / 255 < 0.35 ? "oscura" : "clara";
  }

  async function figura(base64, slug, numero) {
    const buf = Buffer.from(base64, "base64");
    const t = await tono(buf);
    const base = () =>
      sharp(buf)
        .flatten({ background: t === "oscura" ? "#050706" : "#ffffff" })
        .resize({ width: FIGURA_ANCHO_MAX, withoutEnlargement: true });
    // Dos codificaciones y se queda la más ligera: con pérdida gana en las
    // gráficas grandes y reducidas; casi sin pérdida gana en las de colores
    // planos de matplotlib, que así no se ensucian alrededor del texto.
    const [conPerdida, casiSinPerdida] = await Promise.all([
      base().webp({ quality: 84, effort: 6 }).toBuffer({ resolveWithObject: true }),
      base().webp({ nearLossless: true, quality: 60, effort: 6 }).toBuffer({ resolveWithObject: true }),
    ]);
    const { data, info } =
      casiSinPerdida.data.length <= conPerdida.data.length ? casiSinPerdida : conPerdida;
    const nombre = `fig-${String(numero).padStart(2, "0")}.webp`;
    fs.writeFileSync(path.join(FIGURAS_OUT, slug, nombre), data);
    return {
      src: `/projects/${slug}/${nombre}`,
      ancho: info.width,
      alto: info.height,
      tono: t,
      bytes: data.length,
      original: buf,
    };
  }

  return { marked, markdownHtml, codigoHtml, tablaHtml, figura };
}

/* ------------------------------------------------------------------------ */
/* Un notebook                                                                */
/* ------------------------------------------------------------------------ */

async function procesarNotebook(nb, meta, r) {
  const lenguaje = (nb.metadata?.kernelspec?.language || "python").toLowerCase();
  fs.mkdirSync(path.join(FIGURAS_OUT, meta.slug), { recursive: true });

  // 1 · Limpiar la plantilla y tokenizar el markdown.
  const bloques = [];
  let quitadas = 0;
  for (const celda of nb.cells) {
    if (celda.cell_type === "markdown") {
      const { texto: md, quitadas: q } = limpiarMarkdown(texto(celda.source));
      quitadas += q;
      if (md.trim() === "") continue;
      bloques.push({ tipo: "md", tokens: r.marked.lexer(md), celda });
    } else if (celda.cell_type === "code") {
      const original = texto(celda.source);
      const codigo = limpiarCodigo(original);
      if (codigo !== original.replace(/\n+$/, "")) quitadas++;
      bloques.push({ tipo: "code", codigo, celda });
    }
  }

  // 2 · Un solo h1 por página: el título de la página. Se quita el título
  //     del notebook (el primer h1 antes de la primera celda de código) y
  //     los demás encabezados se recorren para que el más alto sea h2.
  for (const b of bloques) {
    if (b.tipo === "code") break;
    const i = b.tokens.findIndex((t) => t.type === "heading" && t.depth === 1);
    if (i !== -1) {
      b.tokens.splice(i, 1);
      break;
    }
  }
  let minimo = 7;
  for (const b of bloques) {
    if (b.tipo !== "md") continue;
    r.marked.walkTokens(b.tokens, (t) => {
      if (t.type === "heading") minimo = Math.min(minimo, t.depth);
    });
  }
  const desplazamiento = minimo === 7 ? 0 : 2 - minimo;

  // 3 · Convertir cada bloque a su forma final.
  const celdas = [];
  const figuras = [];
  let ultimoEncabezado = null;
  for (const b of bloques) {
    if (b.tipo === "md") {
      r.marked.walkTokens(b.tokens, (t) => {
        if (t.type === "heading") {
          t.depth = Math.min(6, Math.max(2, t.depth + desplazamiento));
          ultimoEncabezado = encabezadoPlano(t.text);
        }
      });
      if (!b.tokens.some((t) => t.type !== "space")) continue;
      // Una celda que quedó solo con encabezados (su cuerpo era plantilla)
      // no aporta nada.
      if (
        b.tokens.every((t) => t.type === "space" || t.type === "heading") &&
        limpiarMarkdown(texto(b.celda.source)).quitadas > 0
      ) {
        continue;
      }
      const html = r.markdownHtml(b.tokens);
      if (html.trim()) celdas.push({ t: "md", html });
      continue;
    }

    const { codigo, celda } = b;
    const salidas = [];
    let textoAcumulado = "";
    const soltarTexto = () => {
      const limpio = textoAcumulado.replace(/\s+$/, "");
      if (limpio.trim()) salidas.push({ t: "texto", texto: recortar(limpio, TEXTO_MAX) });
      textoAcumulado = "";
    };
    const titulos = titulosDeGrafica(codigo);
    const imagenes = [];
    for (const out of celda.outputs || []) {
      if (out.output_type === "stream") {
        // stderr son avisos de librerías y bitácoras: ruido, no resultado.
        if (out.name === "stderr") continue;
        textoAcumulado += sinAnsi(texto(out.text));
        continue;
      }
      if (out.output_type === "error") continue;
      const d = out.data || {};
      if (d["image/png"]) {
        soltarTexto();
        const lugar = salidas.length;
        salidas.push(null);
        imagenes.push({ lugar, base64: texto(d["image/png"]) });
      } else if (d["text/html"]) {
        soltarTexto();
        const html = r.tablaHtml(texto(d["text/html"]));
        if (html) salidas.push({ t: "tabla", html });
      } else if (d["text/plain"]) {
        const plano = sinAnsi(texto(d["text/plain"]));
        if (!REPR_RUIDO.test(plano.trim())) textoAcumulado += `${plano}\n`;
      }
    }
    soltarTexto();

    for (let k = 0; k < imagenes.length; k++) {
      const numero = figuras.length + 1;
      const fig = await r.figura(imagenes[k].base64, meta.slug, numero);
      let alt;
      if (titulos.length === imagenes.length) alt = titulos[k];
      else if (imagenes.length === 1 && titulos.length > 0) alt = titulos.join("; ");
      else if (ultimoEncabezado) alt = `Gráfica de la sección «${ultimoEncabezado}»`;
      else alt = `Gráfica ${numero} de «${meta.titulo}»`;
      const registro = { t: "fig", n: numero, src: fig.src, ancho: fig.ancho, alto: fig.alto, tono: fig.tono, alt };
      salidas[imagenes[k].lugar] = registro;
      figuras.push({ ...registro, bytes: fig.bytes, original: fig.original });
    }

    if (codigo.trim()) {
      celdas.push({
        t: "code",
        lineas: codigo.split("\n").length,
        html: r.codigoHtml(codigo, lenguaje === "sql" ? "sql" : "python"),
      });
    }
    celdas.push(...salidas.filter(Boolean));
  }

  return { celdas, figuras, quitadas };
}

/* ------------------------------------------------------------------------ */
/* Validación del catálogo                                                    */
/* ------------------------------------------------------------------------ */

function validarCatalogo() {
  const errores = [];
  const slugs = new Set();
  const rutas = new Set();
  for (const s of SERIES) {
    for (const n of s.notebooks) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(n.slug)) errores.push(`slug inválido: ${n.slug}`);
      if (slugs.has(n.slug)) errores.push(`slug repetido: ${n.slug}`);
      slugs.add(n.slug);
      rutas.add(n.ruta);
      if (!fs.existsSync(path.join(NOTEBOOKS_DIR, n.ruta))) {
        errores.push(`no existe en NOTEBOOKS_DIR: ${n.ruta}`);
      }
      if (n.descripcion.length > DESCRIPCION_MAX) {
        errores.push(`descripción de ${n.slug} con ${n.descripcion.length} caracteres (máximo ${DESCRIPCION_MAX})`);
      }
      for (const campo of ["titulo", "descripcion", "resumen"]) {
        if (/—/.test(n[campo])) errores.push(`raya larga en ${campo} de ${n.slug}`);
      }
    }
  }
  if (errores.length) {
    for (const e of errores) console.error(`  ✗ ${e}`);
    throw new Error(`catálogo con ${errores.length} errores`);
  }
  // Notebooks que están en el repo pero no en el catálogo: no se publican.
  const encontrados = [];
  (function recorrer(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) recorrer(full);
      else if (e.name.endsWith(".ipynb")) encontrados.push(path.relative(NOTEBOOKS_DIR, full).split(path.sep).join("/"));
    }
  })(NOTEBOOKS_DIR);
  for (const rel of encontrados) {
    if (!rutas.has(rel) && !EXCLUIDOS.includes(rel)) {
      console.warn(`  ⚠ sin configurar en scripts/catalogo.mjs, no se publica: ${rel}`);
    }
  }
}

function limpiarSalidas() {
  for (const dir of [NOTEBOOKS_OUT, FIGURAS_OUT, OG_OUT]) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }
  for (const f of OBSOLETOS) fs.rmSync(f, { force: true });
}

/* ------------------------------------------------------------------------ */
/* Principal                                                                  */
/* ------------------------------------------------------------------------ */

async function main() {
  console.log(`[parse-notebooks] NOTEBOOKS_DIR = ${NOTEBOOKS_DIR}`);
  if (!fs.existsSync(NOTEBOOKS_DIR)) {
    if (fs.existsSync(CATALOGO_JSON)) {
      console.log("[parse-notebooks] no está la carpeta de notebooks; se usa lo versionado en src/data.");
      return;
    }
    throw new Error("no hay carpeta de notebooks ni src/data/catalogo.json");
  }

  validarCatalogo();
  const r = await crearRender();
  limpiarSalidas();

  const catalogo = { series: [], notebooks: [] };
  const figurasPorRuta = new Map();

  for (const serie of SERIES) {
    const slugs = [];
    const herramientas = new Set();
    for (const [i, n] of serie.notebooks.entries()) {
      const archivo = path.join(NOTEBOOKS_DIR, n.ruta);
      const nb = JSON.parse(fs.readFileSync(archivo, "utf-8"));
      const tecnologias = detectarTecnologias(nb.cells);
      tecnologias.forEach((t) => herramientas.add(t));
      const { celdas, figuras, quitadas } = await procesarNotebook(nb, n, r);
      figurasPorRuta.set(n.ruta, figuras);
      const resultados = cargarResultados(n.resultados, path.dirname(archivo));

      fs.writeFileSync(
        path.join(NOTEBOOKS_OUT, `${n.slug}.json`),
        `${JSON.stringify({ slug: n.slug, celdas, resultados })}\n`
      );
      const primera = figuras[0];
      catalogo.notebooks.push({
        slug: n.slug,
        serie: serie.id,
        posicion: i + 1,
        titulo: n.titulo,
        descripcion: n.descripcion,
        resumen: n.resumen,
        ...(n.area ? { area: n.area } : {}),
        ruta: n.ruta,
        repoUrl: `${REPO_BLOB}/${n.ruta}`,
        herramientas: tecnologias,
        celdas: nb.cells.length,
        figuras: figuras.length,
        portada: primera
          ? { src: primera.src, ancho: primera.ancho, alto: primera.alto, tono: primera.tono, alt: primera.alt }
          : null,
        tieneResultados: Boolean(resultados),
      });
      slugs.push(n.slug);
      const kb = figuras.reduce((s, f) => s + f.bytes, 0) / 1024;
      console.log(
        `  ✓ ${n.slug}  (${celdas.length} bloques, ${figuras.length} figuras ${kb.toFixed(0)} KB` +
          `${quitadas ? `, ${quitadas} de plantilla fuera` : ""})`
      );
    }

    let portada = null;
    if (serie.portada) {
      const figs = figurasPorRuta.get(serie.portada.ruta) || [];
      const elegida =
        figs[serie.portada.figura - 1] ||
        serie.notebooks.map((n) => (figurasPorRuta.get(n.ruta) || [])[0]).find(Boolean);
      if (elegida) {
        portada = { src: elegida.src, ancho: elegida.ancho, alto: elegida.alto, tono: elegida.tono, alt: elegida.alt };
      } else {
        console.warn(`  ⚠ ${serie.id}: sin figura para la portada`);
      }
    }
    const orden = TECNOLOGIAS.map(([, t]) => t);
    catalogo.series.push({
      id: serie.id,
      nivel: serie.nivel,
      titulo: serie.titulo,
      descripcion: serie.descripcion,
      ...(serie.carpeta ? { repoUrl: `${REPO_TREE}/${serie.carpeta}` } : {}),
      portada,
      herramientas: [...herramientas].sort(
        (a, b) =>
          (a === "Python" ? -1 : orden.indexOf(a) === -1 ? 99 : orden.indexOf(a)) -
          (b === "Python" ? -1 : orden.indexOf(b) === -1 ? 99 : orden.indexOf(b))
      ),
      notebooks: slugs,
    });
  }

  fs.writeFileSync(CATALOGO_JSON, `${JSON.stringify(catalogo, null, 2)}\n`);

  // Imágenes para compartir.
  const { crearRenderOg } = await import("./og.mjs");
  const og = await crearRenderOg(ROOT);
  const propios = catalogo.series.filter((s) => s.nivel === "propio").map((s) => s.titulo.split(":")[0]);
  fs.writeFileSync(
    path.join(OG_OUT, "home.png"),
    await og.home({
      nombre: ["Mauricio Vilar", "Giribet"],
      puesto: "Desarrollador de Ciencia de Datos y Software",
      lugar: "Ciudad de México",
      proyectos: propios,
    })
  );
  for (const n of catalogo.notebooks) {
    const serie = catalogo.series.find((s) => s.id === n.serie);
    fs.writeFileSync(
      path.join(OG_OUT, `${n.slug}.png`),
      await og.notebook({
        serie: serie.titulo,
        posicion: n.posicion,
        total: serie.notebooks.length,
        titulo: n.titulo,
        descripcion: n.descripcion,
      })
    );
  }

  const total = catalogo.notebooks.length;
  const figs = catalogo.notebooks.reduce((s, n) => s + n.figuras, 0);
  console.log(`[parse-notebooks] ${total} notebooks, ${figs} figuras, ${catalogo.series.length} series.`);
}

main().catch((e) => {
  console.error(`[parse-notebooks] ${e.stack || e.message}`);
  process.exit(1);
});
