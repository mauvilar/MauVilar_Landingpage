import projectsData from "@/data/projects.json";

export type NotebookCell =
  | { type: "markdown"; content: string }
  | { type: "code"; language: string; content: string; execution_count: number | null }
  | { type: "image"; src: string; alt: string }
  | { type: "html"; content: string }
  | { type: "text-output"; content: string };

export interface Project {
  slug: string;
  title: string;
  summary: string;
  repoPath: string;
  repoUrl: string;
  folder: string;
  technologies: string[];
  categories: string[];
  cellCount: number;
  imageCount: number;
  coverImage: string | null;
  cover: { gradientFrom: string; gradientTo: string; icon: string } | null;
  cells: NotebookCell[];
}

const COVER_OVERRIDES: Record<string, string> = {
  "store-1-limpieza-de-datos-de-clientes": "/projects/store-1-limpieza-de-datos-de-clientes/cover.svg",
  "store-1-perfilado-de-clientes": "/projects/store-1-perfilado-de-clientes/cover.svg",
  "dejame-escuchar-musica": "/projects/dejame-escuchar-musica/cover.svg",
  "instacart-llena-ese-carrito": "/projects/instacart-llena-ese-carrito/cover.svg",
  "megaline-cual-es-la-mejor-tarifa": "/projects/megaline-cual-es-la-mejor-tarifa/cover.svg",
  "tienda-de-videojuegos-patrones-de-exito": "/projects/tienda-de-videojuegos-patrones-de-exito/cover.svg",
  "zuber-taxis-en-chicago": "/projects/zuber-taxis-en-chicago/cover.svg",
  "showz-analisis-de-marketing": "/projects/showz-analisis-de-marketing/cover.svg",
  "tests-a-b-priorizados-con-ice-rice": "/projects/tests-a-b-priorizados-con-ice-rice/cover.svg",
  "embudo-de-eventos-test-a-a-b": "/projects/embudo-de-eventos-test-a-a-b/cover.svg",
  "model-fitness-churn-y-segmentacion": "/projects/model-fitness-churn-y-segmentacion/cover.svg",
  "telecom-identificacion-de-operadores-ineficaces": "/projects/telecom-identificacion-de-operadores-ineficaces/cover.svg",
  "telecom-test-a-b-del-recomendador": "/projects/telecom-test-a-b-del-recomendador/cover.svg",
  "telecom-analisis-sql-de-libros": "/projects/telecom-analisis-sql-de-libros/cover.svg",
};

export const projects = (projectsData as Project[]).map((p) => ({
  ...p,
  coverImage: COVER_OVERRIDES[p.slug] ?? p.coverImage,
}));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const ALL_CATEGORIES = [
  "Machine Learning",
  "Estadística & Pruebas de Hipótesis",
  "SQL & Analítica de Producto",
  "Visualización & Dashboards",
  "Análisis Exploratorio (EDA)",
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];

export function getProjectsByCategory(category: Category | "Todos"): Project[] {
  if (category === "Todos") return projects;
  return projects.filter((p) => p.categories.includes(category));
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
