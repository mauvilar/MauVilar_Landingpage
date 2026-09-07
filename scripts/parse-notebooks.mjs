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
  },
  Sp_2: {
    title: "Store 1 — Perfilado de clientes",
    summary:
      "Segunda fase de Store 1: procesamiento avanzado en Python con listas anidadas, funciones y agregaciones para perfilar clientes y categorías de compra.",
  },
  Sp_3: {
    title: "Déjame escuchar música",
    summary:
      "Análisis exploratorio con pandas: hábitos musicales de usuarios en dos ciudades. Limpieza de datos, agrupaciones y prueba de hipótesis sobre días de la semana y géneros.",
  },
  Sp_4: {
    title: "Instacart — Llena ese carrito",
    summary:
      "EDA completo del comportamiento de compra en Instacart: limpieza, valores ausentes, duplicados y análisis profundo de patrones de pedido en comestibles.",
  },
  Sp_5: {
    title: "Megaline — ¿Cuál es la mejor tarifa?",
    summary:
      "Estadística descriptiva e inferencial: comparación de las tarifas Surf vs. Ultimate de un operador móvil y prueba de hipótesis sobre ingresos por usuario.",
  },
  Sp_6: {
    title: "Tienda de videojuegos — Patrones de éxito",
    summary:
      "EDA y análisis de patrones de éxito por plataforma, género y región para una tienda global. Pruebas de hipótesis sobre calificaciones de usuarios y críticos.",
  },
  Sp_8: {
    title: "Zuber — Taxis en Chicago",
    summary:
      "Análisis de datos extraídos vía SQL: visualización de la demanda por barrio y empresa, y prueba de hipótesis (Welch t-test) sobre la duración de los viajes en condiciones climáticas adversas.",
  },
  Sp_10: {
    title: "Showz — Análisis de marketing",
    summary:
      "Métricas de producto y marketing para una plataforma de eventos: cohortes, retención, LTV, CAC y ROI por fuente de adquisición para optimizar la inversión publicitaria.",
  },
  Sp_11: {
    title: "Tests A/B priorizados con ICE/RICE",
    summary:
      "Análisis estadístico de un test A/B: priorización de hipótesis con frameworks ICE y RICE y evaluación de significancia estadística entre los grupos de prueba.",
  },
  Sp_12: {
    title: "Embudo de eventos & test A/A/B",
    summary:
      "Análisis de logs de eventos de una app: construcción del embudo de conversión paso a paso y evaluación de un test A/A/B para validar cambios en la UI.",
  },
  Sp_14: {
    title: "Model Fitness — Churn y segmentación",
    summary:
      "Machine learning aplicado a un gimnasio premium: modelo de clasificación para predecir cancelación de clientes y segmentación con clustering jerárquico/K-Means.",
  },
  "Telecomunicaciones-Operadores-Ineficaces/Operadores-Ineficaces": {
    title: "Telecom — Identificación de operadores ineficaces",
    summary:
      "Proyecto integral de un call center: análisis exploratorio + machine learning para clasificar a los operadores ineficaces e impulsar la calidad del servicio.",
  },
  "Telecomunicaciones-Operadores-Ineficaces/Test-AB-Recomendador": {
    title: "Telecom — Test A/B del recomendador",
    summary:
      "Prueba A/B sobre un sistema de recomendaciones para evaluar su impacto real en la conversión y experiencia del usuario.",
  },
  "Telecomunicaciones-Operadores-Ineficaces/SQL-Libros": {
    title: "Telecom — Análisis SQL de libros",
    summary:
      "Resolución de tareas analíticas con SQL puro: agregaciones, joins, subconsultas y CTEs sobre un dataset de catálogo de libros y reseñas.",
  },
  "Telecomunicaciones-Operadores-Ineficaces/Descomposicion": {
    title: "Telecom — Plan de descomposición",
    summary:
      "Documento técnico que descompone el proyecto integral de telecomunicaciones en fases, hitos y entregables medibles.",
  },
  "credit-risk-scoring/01_eda": {
    title: "Riesgo crediticio — Exploración y fuga de datos",
    summary:
      "Análisis exploratorio de 30,000 tarjetahabientes de Taiwán (UCI, abril a septiembre de 2005) para predecir el impago del mes siguiente. La clase positiva es minoría, 22% de impago o unos 3.5 a 1, así que las métricas quedan elegidas desde el principio: ROC AUC, PR AUC, Gini y KS en lugar de exactitud. Incluye una prueba explícita de fuga de datos que descarta las tres vías por las que podría colarse, y cierra escribiendo la partición estratificada 80/20 que las fases siguientes reutilizan sin volver a tocar el test.",
  },
  "credit-risk-scoring/02_feature_engineering": {
    title: "Riesgo crediticio — Ingeniería de variables",
    summary:
      "Los datos crudos traen seis fotos mensuales de saldo, pago y morosidad. Las señales que de verdad predicen el impago son razones entre esas fotos, y ninguna existe como columna. Aquí se construye el pipeline de producción: un transformador de scikit-learn que añade 15 variables derivadas fila por fila, y un ColumnTransformer que imputa, escala y codifica según la cardinalidad. Cada variable derivada se valida por su ROC AUC univariado contra el objetivo antes de entrar.",
    results: {
      heading: "Fase 3 · Comparación de modelos",
      note:
        "Estos números no salen de este notebook: los produjo el pipeline de entrenamiento (`make train`, 50 trials de Optuna por modelo, validación cruzada estratificada de 5 folds). La selección se hace por ROC AUC de validación cruzada, nunca por el test. Los notebooks 03 y 04, que grafican curvas ROC, KS, calibración y SHAP, están escritos pero todavía sin ejecutar.",
      /* Se leen del artefacto real que dejó el entrenamiento, no se escriben
         a mano: si vuelve a correr, la tabla del sitio cambia sola. */
      from: "comparison.json",
    },
  },
  "mercado-ia-mx-us/01_recoleccion_y_calidad": {
    title: "Mercado de IA — Auditoría de fuentes y calidad",
    summary:
      "Antes de analizar nada, se audita cada fuente candidata: el mejor dataset real de Kaggle tiene 12 filas mexicanas y ninguna con salario, y el más popular de la categoría resulta ser sintético (12 países, ~4,300 filas cada uno, 100% de sueldos publicados frente al ~19% de un agregador real). Con ambas descartadas, se construye un corpus propio desde la API de Adzuna — 6,990 vacantes, 1,666 con salario — y se confirma en vivo que Adzuna modela sueldos que no tiene: Nueva York devolvió 151 vacantes y solo 1 con salario real.",
  },
  "mercado-ia-mx-us/02_brecha_salarial": {
    title: "Mercado de IA — Brecha salarial México vs Estados Unidos",
    summary:
      "Medianas salariales con intervalos de confianza bootstrap en cinco metros de Estados Unidos — San Francisco Bay Area $225,000 (n=319), Seattle $202,500, Nueva York $200,000 (n=116), Austin $197,575 y Boston $182,500 — frente a una decisión metodológica explícita: México solo tiene 4 vacantes de IA con salario publicado, así que las pruebas de hipótesis se niegan a correr, y el notebook muestra ese rechazo en vez de forzar un resultado.",
  },
  "mercado-ia-mx-us/03_skills_y_transparencia": {
    title: "Mercado de IA — Primas por skill y transparencia salarial",
    summary:
      "Primas salariales por habilidad: dominar prompt engineering o LangChain se paga ~30% por debajo de la mediana nacional, mientras que trabajar con agentes de IA se paga justo en ella — una brecha de $61,050 entre habilidades del mismo mercado. Un hallazgo contraintuitivo: en Estados Unidos, las multinacionales publican el salario 3.4 veces menos que las empresas locales.",
  },
  "mercado-ia-mx-us/04_modelo_imputacion": {
    title: "Mercado de IA — Modelo de imputación salarial",
    summary:
      "Un modelo de gradient boosting entrenado con salarios de Estados Unidos se valida contra un hold-out con los 4 salarios mexicanos observados — veredicto: no publicable, con un MdAPE de 958% frente a un umbral de 35%. El argumento central: con n=4 ningún experimento puede validar la transferencia entre mercados en ningún sentido, así que las estimaciones no deben publicarse.",
  },
};

const RESULT_COLUMNS = [
  { key: "model_name", label: "Modelo", numeric: false },
  { key: "cv_roc_auc", label: "ROC AUC (CV)", numeric: true },
  { key: "test_roc_auc", label: "ROC AUC (test)", numeric: true },
  { key: "test_gini", label: "Gini", numeric: true },
  { key: "test_ks", label: "KS", numeric: true },
  { key: "test_brier", label: "Brier", numeric: true },
];

const MODEL_LABELS = {
  logistic_regression: "Regresión logística",
  random_forest: "Random Forest",
  xgboost: "XGBoost",
  lightgbm: "LightGBM",
};

/**
 * Lee la tabla de resultados del artefacto que dejó el entrenamiento, junto al
 * notebook. Se ordena por la misma métrica con la que se seleccionó el modelo
 * (ROC AUC de validación cruzada) para que la tabla cuente la misma historia
 * que el pipeline.
 */
function loadResults(spec, notebookDir) {
  if (!spec) return null;
  const file = path.join(notebookDir, spec.from);
  if (!fs.existsSync(file)) {
    console.warn(`  ⚠ resultados no encontrados: ${file}`);
    return null;
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
  const rows = [...raw.models]
    .sort((a, b) => b.cv_roc_auc - a.cv_roc_auc)
    .map((m) => {
      const row = { model_name: MODEL_LABELS[m.model_name] || m.model_name };
      for (const col of RESULT_COLUMNS) {
        // Cadena, no número: 0.141 rompería la alineación tabular contra 0.1431.
        if (col.numeric) row[col.key] = m[col.key].toFixed(4);
      }
      row.best = m.model_name === raw.best_model;
      return row;
    });
  return {
    heading: spec.heading,
    note: spec.note,
    source: `${spec.from} · ${new Date(raw.generated_at).toISOString().slice(0, 10)}`,
    columns: RESULT_COLUMNS,
    rows,
  };
}

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
      // Una carpeta con varios notebooks se identifica por carpeta/archivo;
      // una carpeta con uno solo, por la carpeta. Se resuelve mirando qué
      // clave existe, sin listar prefijos a mano.
      const nestedKey = `${folder}/${baseName}`;
      const override =
        PROJECT_OVERRIDES[nestedKey] || PROJECT_OVERRIDES[folder] || {};

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
        results: loadResults(override.results, path.dirname(nbPath)),
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
  // Bloques del portafolio, del más viejo al más reciente.
  const blockRank = (folder) =>
    folder.startsWith("credit-risk") ? 2 : folder.startsWith("Telecom") ? 1 : 0;

  projects.sort((a, b) => {
    const aBlock = blockRank(a.folder);
    const bBlock = blockRank(b.folder);
    if (aBlock !== bBlock) return aBlock - bBlock;
    if (aBlock === 1) {
      return TELECOM_ORDER.indexOf(a.slug) - TELECOM_ORDER.indexOf(b.slug);
    }
    const an = parseInt((a.folder.match(/Sp_(\d+)/) || [])[1] || "999", 10);
    const bn = parseInt((b.folder.match(/Sp_(\d+)/) || [])[1] || "999", 10);
    if (an !== bn) return an - bn;
    // Within a multi-notebook folder (e.g. mercado-ia-mx-us), keep the notebooks'
    // own numeric prefix (01_, 02_, ...) instead of falling back to title order.
    const aSeq = parseInt((path.basename(a.repoPath).match(/^(\d+)/) || [])[1], 10);
    const bSeq = parseInt((path.basename(b.repoPath).match(/^(\d+)/) || [])[1], 10);
    if (!Number.isNaN(aSeq) && !Number.isNaN(bSeq) && aSeq !== bSeq) return aSeq - bSeq;
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
