import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";

/**
 * Tema de código construido con los tokens de la marca.
 *
 * El sistema tiene un solo color — el verde #00DF81 — así que el resaltado no
 * puede pintar cada tipo de token de un color distinto sin salirse de la
 * paleta. La distinción la hacen la crema en cuatro niveles y el verde en dos:
 * lo que estructura el código (palabras clave, funciones) va en verde; lo que
 * es contenido (nombres, cadenas) va en crema; lo que es comentario se apaga.
 *
 * Contrastes sobre el pozo #0B0F0D: crema 17.1:1 · crema .70 8.6:1 ·
 * crema .52 5.2:1 · verde 10.9:1 · verde-300 11.9:1.
 */
const NYX_DARK: ThemeRegistration = {
  name: "nyx-dark",
  type: "dark",
  colors: {
    "editor.background": "#0B0F0D",
    "editor.foreground": "#F3F1EC",
  },
  settings: [
    { settings: { background: "#0B0F0D", foreground: "#F3F1EC" } },

    // Comentarios: el nivel más apagado que sigue siendo legible.
    {
      scope: ["comment", "punctuation.definition.comment", "string.quoted.docstring"],
      settings: { foreground: "rgba(243,241,236,0.52)", fontStyle: "italic" },
    },

    // Estructura del lenguaje: verde.
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.logical",
        "storage",
        "storage.type",
        "storage.modifier",
        "variable.language",
        "constant.language",
        "support.type.primitive",
      ],
      settings: { foreground: "#00DF81" },
    },

    // Lo que se invoca o se define: verde claro, para separarlo de la
    // estructura sin abrir un color nuevo.
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
        "entity.name.class",
        "entity.name.type",
        "support.class",
        "support.type",
      ],
      settings: { foreground: "#40E5A3" },
    },

    // Cadenas: crema plena. En un notebook de datos casi todo el texto
    // literal es una etiqueta de columna, y se lee mucho.
    {
      scope: ["string", "string.quoted", "constant.character", "constant.other.symbol"],
      settings: { foreground: "#F3F1EC" },
    },

    // Números y constantes: mono tabular sobre crema al 70%.
    {
      scope: ["constant.numeric", "constant.language.boolean", "constant.other"],
      settings: { foreground: "rgba(243,241,236,0.70)" },
    },

    // Variables, parámetros y propiedades: el cuerpo del código.
    {
      scope: [
        "variable",
        "variable.other",
        "variable.parameter",
        "meta.object-literal.key",
        "support.variable",
        "entity.name.tag",
      ],
      settings: { foreground: "#F3F1EC" },
    },

    // Puntuación y operadores: se apagan para que la línea respire.
    {
      scope: [
        "punctuation",
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.definition",
        "keyword.operator",
        "meta.brace",
      ],
      settings: { foreground: "rgba(243,241,236,0.52)" },
    },

    // Decoradores e imports quedan a media tinta: son andamio, no contenido.
    {
      scope: ["entity.name.function.decorator", "meta.decorator", "support.module"],
      settings: { foreground: "rgba(243,241,236,0.70)" },
    },
  ],
};

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [NYX_DARK],
      langs: ["python", "sql", "bash", "json", "javascript", "typescript"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang = "python"): Promise<string> {
  const hl = await getHighlighter();
  const supported = hl.getLoadedLanguages().includes(lang);
  const language = supported ? lang : "python";
  return hl.codeToHtml(code, {
    lang: language,
    theme: "nyx-dark",
  });
}
