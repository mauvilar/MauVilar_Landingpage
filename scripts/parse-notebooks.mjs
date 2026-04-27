#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const NOTEBOOKS_DIR = path.resolve(ROOT, "..", "notebooks-source");
const OUTPUT_DATA = path.join(ROOT, "src", "data", "projects.json");
const OUTPUT_IMAGES_DIR = path.join(ROOT, "public", "projects");
const REPO_BASE = "https://github.com/mauvilar/Proyectos-data-science/blob/main";

const EXCLUDED_NOTEBOOKS = new Set([
  "Telecomunicaciones-Operadores-Ineficaces/Descomposicion.ipynb",
]);

const PROJECT_OVERRIDES = {
  Sp_1: {
    title: "Store 1 — Limpieza de datos de clientes",
    summary:
      "Primera fase del proyecto Store 1: limpieza de strings y manipulación de listas y diccionarios para preparar datos de clientes desde Python puro, sin librerías externas.",
    cover: { gradientFrom: "#00DF81", gradientTo: "#0EA5E9", icon: "broom" },
  },
  Sp_2: {
    title: "Store 1 — Perfilado de clientes",
    summary:
      "Segunda fase de Store 1: procesamiento avanzado en Python con listas anidadas, funciones y agregaciones para perfilar clientes y categorías de compra.",
    cover: { gradientFrom: "#6366F1", gradientTo: "#00DF81", icon: "users" },
  },
  Sp_3: {
    title: "Déjame escuchar música",
    summary:
      "Análisis exploratorio con pandas: hábitos musicales de usuarios en dos ciudades. Limpieza de datos, agrupaciones y prueba de hipótesis sobre días de la semana y géneros.",
    cover: { gradientFrom: "#A855F7", gradientTo: "#00DF81", icon: "music" },
  },
  Sp_4: {
    title: "Instacart — Llena ese carrito",
    summary:
      "EDA completo del comportamiento de compra en Instacart: limpieza, valores ausentes, duplicados y análisis profundo de patrones de pedido en comestibles.",
    cover: { gradientFrom: "#F59E0B", gradientTo: "#EF4444", icon: "cart" },
  },
  Sp_5: {
    title: "Megaline — ¿Cuál es la mejor tarifa?",
    summary:
      "Estadística descriptiva e inferencial: comparación de las tarifas Surf vs. Ultimate de un operador móvil y prueba de hipótesis sobre ingresos por usuario.",
    cover: { gradientFrom: "#06B6D4", gradientTo: "#6366F1", icon: "phone" },
  },
  Sp_6: {
    title: "Tienda de videojuegos — Patrones de éxito",
    summary:
      "EDA y análisis de patrones de éxito por plataforma, género y región para una tienda global. Pruebas de hipótesis sobre calificaciones de usuarios y críticos.",
    cover: { gradientFrom: "#EC4899", gradientTo: "#6366F1", icon: "gamepad" },
  },
  Sp_8: {
    title: "Zuber — Taxis en Chicago",
    summary:
      "Análisis de datos extraídos vía SQL: visualización de la demanda por barrio y empresa, y prueba de hipótesis (Welch t-test) sobre la duración de los viajes en condiciones climáticas adversas.",
    cover: { gradientFrom: "#FBBF24", gradientTo: "#00DF81", icon: "taxi" },
  },
  Sp_10: {
    title: "Showz — Análisis de marketing",
    summary:
      "Métricas de producto y marketing para una plataforma de eventos: cohortes, retención, LTV, CAC y ROI por fuente de adquisición para optimizar la inversión publicitaria.",
    cover: { gradientFrom: "#00DF81", gradientTo: "#6366F1", icon: "chart" },
  },
  Sp_11: {
    title: "Tests A/B priorizados con ICE/RICE",
    summary:
      "Análisis estadístico de un test A/B: priorización de hipótesis con frameworks ICE y RICE y evaluación de significancia estadística entre los grupos de prueba.",
    cover: { gradientFrom: "#3B82F6", gradientTo: "#A855F7", icon: "flask" },
  },
  Sp_12: {
    title: "Embudo de eventos & test A/A/B",
    summary:
      "Análisis de logs de eventos de una app: construcción del embudo de conversión paso a paso y evaluación de un test A/A/B para validar cambios en la UI.",
    cover: { gradientFrom: "#10B981", gradientTo: "#0EA5E9", icon: "funnel" },
  },
  Sp_14: {
    title: "Model Fitness — Churn y segmentación",
    summary:
      "Machine learning aplicado a un gimnasio premium: modelo de clasificación para predecir cancelación de clientes y segmentación con clustering jerárquico/K-Means.",
    cover: { gradientFrom: "#00DF81", gradientTo: "#EC4899", icon: "dumbbell" },
  },
  "Telecomunicaciones-Operadores-Ineficaces/Operadores-Ineficaces": {
    title: "Telecom — Identificación de operadores ineficaces",
    summary:
      "Proyecto integral de un call center: análisis exploratorio + machine learning para clasificar a los operadores ineficaces e impulsar la calidad del servicio.",
    cover: { gradientFrom: "#F97316", gradientTo: "#A855F7", icon: "headset" },
  },
  "Telecomunicaciones-Operadores-Ineficaces/Test-AB-Recomendador": {
    title: "Telecom — Test A/B del recomendador",
    summary:
      "Prueba A/B sobre un sistema de recomendaciones para evaluar su impacto real en la conversión y experiencia del usuario.",
    cover: { gradientFrom: "#A855F7", gradientTo: "#00DF81", icon: "flask" },
  },
  "Telecomunicaciones-Operadores-Ineficaces/SQL-Libros": {
    title: "Telecom — Análisis SQL de libros",
    summary:
      "Resolución de tareas analíticas con SQL puro: agregaciones, joins, subconsultas y CTEs sobre un dataset de catálogo de libros y reseñas.",
    cover: { gradientFrom: "#0EA5E9", gradientTo: "#6366F1", icon: "database" },
  },
  "Telecomunicaciones-Operadores-Ineficaces/Descomposicion": {
    title: "Telecom — Plan de descomposición",
    summary:
      "Documento técnico que descompone el proyecto integral de telecomunicaciones en fases, hitos y entregables medibles.",
    cover: { gradientFrom: "#94A3B8", gradientTo: "#475569", icon: "list" },
  },
};

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function findNotebooks(dir) {
  const out = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".ipynb_checkpoints" || entry.name === ".git") continue;
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".ipynb")) {
        out.push(full);
      }
    }
  }
  walk(dir);
  return out.sort();
}

function cellSource(cell) {
  return Array.isArray(cell.source) ? cell.source.join("") : cell.source || "";
}

function extractTitle(notebook, fallback) {
  for (const cell of notebook.cells) {
    if (cell.cell_type !== "markdown") continue;
    const src = cellSource(cell);
    const m = src.match(/^#\s+(.+?)\s*(?:<a[^>]*>.*?<\/a>)?\s*$/m);
    if (m) {
      const title = m[1].replace(/<[^>]+>/g, "").trim();
      if (title.length > 1) return title;
    }
  }
  return fallback;
}

function extractFirstParagraph(notebook, maxLen = 280) {
  for (const cell of notebook.cells) {
    if (cell.cell_type !== "markdown") continue;
    const src = cellSource(cell)
      .replace(/<[^>]+>/g, " ")
      .replace(/^#+\s.*$/gm, "")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
      .replace(/[*_>~|]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (src.length > 40) {
      return src.length > maxLen ? src.slice(0, maxLen).replace(/\s+\S*$/, "") + "…" : src;
    }
  }
  return "Proyecto de Data Science con análisis profundo, visualizaciones y conclusiones accionables.";
}

const TECH_LIBS = [
  ["pandas", "Pandas"],
  ["numpy", "NumPy"],
  ["matplotlib", "Matplotlib"],
  ["seaborn", "Seaborn"],
  ["plotly", "Plotly"],
  ["sklearn", "scikit-learn"],
  ["scikit-learn", "scikit-learn"],
  ["scipy", "SciPy"],
  ["statsmodels", "statsmodels"],
  ["xgboost", "XGBoost"],
  ["lightgbm", "LightGBM"],
  ["catboost", "CatBoost"],
  ["tensorflow", "TensorFlow"],
  ["keras", "Keras"],
  ["torch", "PyTorch"],
  ["nltk", "NLTK"],
  ["spacy", "spaCy"],
];

function extractTechnologies(notebook) {
  const techs = new Set();
  let hasSql = false;
  for (const cell of notebook.cells) {
    if (cell.cell_type !== "code") continue;
    const src = cellSource(cell);
    for (const [needle, label] of TECH_LIBS) {
      const re = new RegExp(`\\b(?:from|import)\\s+${needle}(?:[\\s.,;]|$)`, "m");
      if (re.test(src)) techs.add(label);
    }
    if (/SELECT\s+[\s\S]+?FROM/i.test(src)) hasSql = true;
  }
  if (hasSql) techs.add("SQL");
  techs.add("Python");
  return [...techs];
}

function classify(notebook, techs, srcAll) {
  const cats = new Set();
  const lower = srcAll.toLowerCase();
  if (techs.includes("scikit-learn") || /train_test_split|RandomForest|LogisticRegression|DecisionTree|KMeans|cluster|classifier|regress/.test(srcAll)) {
    cats.add("Machine Learning");
  }
  if (/scipy\.stats|ttest_ind|ttest_rel|chi2_contingency|mannwhitneyu|levene|shapiro|st\.t\b|welch/i.test(srcAll)) {
    cats.add("Estadística & Pruebas de Hipótesis");
  }
  if (/SELECT\s+[\s\S]+?FROM/i.test(srcAll) || /cohort|funnel|test\s*a\/?b|a\/a\/b|retention|ltv|cac|roi/i.test(lower)) {
    cats.add("SQL & Analítica de Producto");
  }
  if (techs.includes("Plotly") || /interactive|dashboard|fig\.show\(\)|plotly\.express/i.test(srcAll)) {
    cats.add("Visualización & Dashboards");
  }
  if (cats.size === 0 || /describe\(\)|value_counts\(\)|isnull\(\)|missing|duplicated\(\)|info\(\)/.test(srcAll)) {
    cats.add("Análisis Exploratorio (EDA)");
  }
  return [...cats];
}

function extractCells(notebook, projectSlug) {
  const cells = [];
  let imageCounter = 0;
  let firstImagePath = null;

  for (let i = 0; i < notebook.cells.length; i++) {
    const cell = notebook.cells[i];
    const src = cellSource(cell).trim();
    if (!src && cell.cell_type !== "code") continue;

    if (cell.cell_type === "markdown") {
      cells.push({ type: "markdown", content: cellSource(cell) });
    } else if (cell.cell_type === "code") {
      cells.push({
        type: "code",
        language: "python",
        content: cellSource(cell),
        execution_count: cell.execution_count ?? null,
      });
      if (Array.isArray(cell.outputs)) {
        for (const out of cell.outputs) {
          if (!out.data) continue;
          if (out.data["image/png"]) {
            const b64 = Array.isArray(out.data["image/png"])
              ? out.data["image/png"].join("")
              : out.data["image/png"];
            const filename = `cell-${i}-${imageCounter}.png`;
            const dir = path.join(OUTPUT_IMAGES_DIR, projectSlug);
            fs.mkdirSync(dir, { recursive: true });
            const filePath = path.join(dir, filename);
            fs.writeFileSync(filePath, Buffer.from(b64, "base64"));
            const webPath = `/projects/${projectSlug}/${filename}`;
            cells.push({ type: "image", src: webPath, alt: `Output ${imageCounter} de la celda ${i}` });
            if (!firstImagePath) firstImagePath = webPath;
            imageCounter++;
          } else if (out.data["text/html"]) {
            const html = Array.isArray(out.data["text/html"])
              ? out.data["text/html"].join("")
              : out.data["text/html"];
            const trimmed = html.length > 8000 ? html.slice(0, 8000) + "<!-- truncated -->" : html;
            cells.push({ type: "html", content: trimmed });
          } else if (out.data["text/plain"]) {
            const txt = Array.isArray(out.data["text/plain"])
              ? out.data["text/plain"].join("")
              : out.data["text/plain"];
            if (txt.trim()) {
              cells.push({ type: "text-output", content: txt.length > 4000 ? txt.slice(0, 4000) + "\n…[truncated]" : txt });
            }
          }
          if (out.text) {
            const txt = Array.isArray(out.text) ? out.text.join("") : out.text;
            if (txt.trim()) {
              cells.push({ type: "text-output", content: txt.length > 4000 ? txt.slice(0, 4000) + "\n…[truncated]" : txt });
            }
          }
        }
      }
    }
  }
  return { cells, firstImagePath, imageCount: imageCounter };
}

function relativeRepoPath(absolute) {
  return path.relative(NOTEBOOKS_DIR, absolute).split(path.sep).join("/");
}

async function main() {
  console.log(`[parse-notebooks] notebooks dir: ${NOTEBOOKS_DIR}`);
  if (!fs.existsSync(NOTEBOOKS_DIR)) {
    console.warn(
      `[parse-notebooks] notebooks source not found at ${NOTEBOOKS_DIR}. ` +
        `Skipping regeneration — will use the previously generated projects.json if it exists.`
    );
    if (fs.existsSync(OUTPUT_DATA)) {
      console.log("[parse-notebooks] using existing projects.json");
      return;
    }
    console.error("[parse-notebooks] no projects.json found either. Cannot continue.");
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });

  const notebooks = findNotebooks(NOTEBOOKS_DIR);
  console.log(`[parse-notebooks] found ${notebooks.length} notebooks`);

  const projects = [];

  for (const nbPath of notebooks) {
    const _rel = relativeRepoPath(nbPath);
    if (EXCLUDED_NOTEBOOKS.has(_rel)) {
      console.log(`  ⊘ skipped (excluded): ${_rel}`);
      continue;
    }
    try {
      const raw = fs.readFileSync(nbPath, "utf-8");
      const nb = JSON.parse(raw);
      const repoPath = relativeRepoPath(nbPath);
      const folder = path.dirname(repoPath);
      const baseName = path.basename(nbPath, ".ipynb");
      const overrideKey = folder.startsWith("Telecom")
        ? `${folder}/${baseName}`
        : folder;
      const override = PROJECT_OVERRIDES[overrideKey] || {};

      const filenameClean = baseName.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const title = override.title || extractTitle(nb, filenameClean);
      const slugBase = override.title ? slugify(override.title) : slugify(`${folder}-${baseName}`);
      const slug = slugBase || slugify(baseName);

      const allSrc = nb.cells.map((c) => cellSource(c)).join("\n");
      const techs = extractTechnologies(nb);
      const categories = classify(nb, techs, allSrc);
      const summary = override.summary || extractFirstParagraph(nb);
      const { cells, firstImagePath, imageCount } = extractCells(nb, slug);

      const project = {
        slug,
        title,
        summary,
        repoPath,
        repoUrl: `${REPO_BASE}/${repoPath}`,
        folder,
        technologies: techs,
        categories,
        cellCount: nb.cells.length,
        imageCount,
        coverImage: firstImagePath,
        cover: override.cover || null,
        cells,
      };

      projects.push(project);
      console.log(
        `  ✓ ${slug}  (${cells.length} cells, ${imageCount} imgs, ${categories.join(" / ")})`
      );
    } catch (err) {
      console.warn(`  ⚠ failed to parse ${nbPath}: ${err.message}`);
    }
  }

  const TELECOM_ORDER = [
    "telecom-identificacion-de-operadores-ineficaces",
    "telecom-test-a-b-del-recomendador",
    "telecom-analisis-sql-de-libros",
  ];
  projects.sort((a, b) => {
    const aIsTelecom = a.folder.startsWith("Telecom");
    const bIsTelecom = b.folder.startsWith("Telecom");
    if (aIsTelecom && !bIsTelecom) return 1;
    if (!aIsTelecom && bIsTelecom) return -1;
    if (aIsTelecom && bIsTelecom) {
      return TELECOM_ORDER.indexOf(a.slug) - TELECOM_ORDER.indexOf(b.slug);
    }
    const an = parseInt((a.folder.match(/Sp_(\d+)/) || [])[1] || "999", 10);
    const bn = parseInt((b.folder.match(/Sp_(\d+)/) || [])[1] || "999", 10);
    if (an !== bn) return an - bn;
    return a.title.localeCompare(b.title);
  });

  fs.mkdirSync(path.dirname(OUTPUT_DATA), { recursive: true });
  fs.writeFileSync(OUTPUT_DATA, JSON.stringify(projects, null, 2));
  console.log(`[parse-notebooks] wrote ${OUTPUT_DATA} (${projects.length} projects)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
