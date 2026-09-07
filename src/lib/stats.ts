import { projects } from "@/lib/projects";
import { ALL_CATEGORIES } from "@/lib/projects";

/**
 * Cifras del portafolio calculadas de projects.json en tiempo de build.
 * Nada aquí se escribe a mano: si cambia un notebook, cambia el número.
 */
export const portfolioStats = {
  projects: projects.length,
  cells: projects.reduce((sum, p) => sum + p.cellCount, 0),
  figures: projects.reduce((sum, p) => sum + p.imageCount, 0),
  byCategory: ALL_CATEGORIES.map((category) => ({
    category,
    count: projects.filter((p) => p.categories.includes(category)).length,
  })).sort((a, b) => b.count - a.count),
};
