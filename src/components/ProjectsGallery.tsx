"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

const FILTERS = [
  "Todos",
  "Machine Learning",
  "Análisis Exploratorio (EDA)",
  "SQL & Analítica de Producto",
  "Estadística & Pruebas de Hipótesis",
  "Visualización & Dashboards",
] as const;

const SHORT_NAMES: Record<string, string> = {
  Todos: "Todos",
  "Machine Learning": "Machine Learning",
  "Análisis Exploratorio (EDA)": "EDA",
  "SQL & Analítica de Producto": "SQL y producto",
  "Estadística & Pruebas de Hipótesis": "Estadística",
  "Visualización & Dashboards": "Visualización",
};

interface Props {
  projects: Project[];
}

export function ProjectsGallery({ projects }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");

  const counts = useMemo(() => {
    const map: Record<string, number> = { Todos: projects.length };
    for (const f of FILTERS) {
      if (f === "Todos") continue;
      map[f] = projects.filter((p) => p.categories.includes(f)).length;
    }
    return map;
  }, [projects]);

  const filtered = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter, projects]
  );

  return (
    <section id="proyectos" className="rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 lg:items-end">
          <div>
            <h2 className="display-sm text-[clamp(1.875rem,3.5vw,2.75rem)]">
              Proyectos
            </h2>
            <p className="mt-4 prose-measure text-ink-muted">
              Trabajos del bootcamp de ciencia de datos de TripleTen y proyectos
              propios. Cada ficha abre el notebook completo: el código como se
              escribió, las gráficas como salieron y las conclusiones sin
              maquillar.
            </p>
          </div>
        </div>

        <div className="mt-10 border-y border-rule">
          <div
            role="group"
            aria-label="Filtrar proyectos por área"
            className="flex flex-wrap items-stretch -mx-3"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={`relative px-3 py-3.5 text-[0.8125rem] transition-colors ${
                    isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {SHORT_NAMES[f] ?? f}
                  <span className="num ml-1.5 text-[0.6875rem] text-ink-faint">
                    {counts[f]}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-0 h-[2px] bg-accent transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ol className="mt-2">
            {filtered.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={projects.indexOf(project)}
                reversed={i % 2 === 1}
              />
            ))}
          </ol>
        ) : (
          <EmptyState area={SHORT_NAMES[filter] ?? filter} onReset={() => setFilter("Todos")} />
        )}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  return (
    <li className="group border-b border-rule py-8 lg:py-12">
      <div
        className={`grid gap-6 lg:gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-start ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <ProjectCover project={project} priority={index < 2} />
        <ProjectDetails project={project} index={index} />
      </div>
    </li>
  );
}

function ProjectCover({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      tabIndex={-1}
      aria-hidden
      className="relative block aspect-[16/9] overflow-hidden border border-rule bg-paper-deep"
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover object-center"
          priority={priority}
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center">
          <span className="display text-[clamp(3rem,7vw,6rem)] text-rule-strong select-none px-6 text-center">
            {project.title.split(" ")[0]}
          </span>
        </span>
      )}
    </Link>
  );
}

function ProjectDetails({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="lg:pt-1">
      <div className="flex items-baseline gap-4">
        <span className="num text-sm text-ink-faint shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="display-sm text-[clamp(1.375rem,2.4vw,2rem)]">
          <Link
            href={`/projects/${project.slug}`}
            className="decoration-transparent underline underline-offset-[7px] decoration-2 transition-[text-decoration-color] duration-200 group-hover:decoration-accent"
          >
            {project.title}
          </Link>
        </h3>
      </div>

      <ul className="mt-4 sm:ml-9 flex flex-wrap gap-1.5">
        {project.categories.map((cat, i) => (
          <li key={cat}>
            <span className={i === 0 ? "tag tag-lead" : "tag"}>{cat}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 sm:ml-9 prose-measure text-[0.9375rem] leading-relaxed text-ink-muted">
        {project.summary}
      </p>

      <p className="mt-5 sm:ml-9 font-mono text-[0.75rem] leading-relaxed text-ink-faint">
        {project.technologies.join("  ·  ")}
      </p>

      <div className="mt-6 sm:ml-9 flex flex-wrap items-center gap-6">
        <Link
          href={`/projects/${project.slug}`}
          className="btn btn-quiet text-sm"
        >
          Abrir el notebook
          <span aria-hidden>→</span>
        </Link>
        <span className="num text-xs text-ink-faint">
          {project.cellCount} celdas · {project.imageCount} gráficas
        </span>
      </div>
    </div>
  );
}

function EmptyState({
  area,
  onReset,
}: {
  area: string;
  onReset: () => void;
}) {
  return (
    <div className="border-b border-rule py-20 text-center">
      <p className="display-sm text-2xl">Todavía no hay nada en {area}</p>
      <p className="mt-3 text-ink-muted">
        Es un área en la que sigo trabajando. Mientras tanto, el resto del
        portafolio está completo.
      </p>
      <button type="button" onClick={onReset} className="btn btn-outline mt-7">
        Ver los proyectos
      </button>
    </div>
  );
}
