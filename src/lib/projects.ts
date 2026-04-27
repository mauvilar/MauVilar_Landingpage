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

export const projects = projectsData as Project[];

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
