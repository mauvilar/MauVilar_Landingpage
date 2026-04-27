"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  "Machine Learning": "ML",
  "Análisis Exploratorio (EDA)": "EDA",
  "SQL & Analítica de Producto": "SQL",
  "Estadística & Pruebas de Hipótesis": "Estadística",
  "Visualización & Dashboards": "Visual",
};

const CATEGORY_CHIP: Record<string, string> = {
  "Machine Learning": "chip-pink",
  "Estadística & Pruebas de Hipótesis": "chip-amber",
  "SQL & Analítica de Producto": "chip-cyan",
  "Visualización & Dashboards": "chip-violet",
  "Análisis Exploratorio (EDA)": "chip-accent",
};

interface Props {
  projects: Project[];
}

export function ProjectsGallery({ projects }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");

  const filtered = useMemo(() => {
    if (filter === "Todos") return projects;
    return projects.filter((p) => p.categories.includes(filter));
  }, [filter, projects]);

  return (
    <section
      id="proyectos"
      className="relative py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-300/80 font-medium">
              Proyectos
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
              Análisis con{" "}
              <span className="gradient-text-warm">impacto real</span>
            </h2>
            <p className="mt-4 text-lg text-white/60 leading-relaxed">
              Una selección de proyectos del bootcamp de Data Science de
              TripleTen y trabajos personales. Cada caso incluye limpieza,
              análisis, modelado y conclusiones de negocio.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition whitespace-nowrap ${
                  filter === f
                    ? "text-[#0a0a14]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{SHORT_NAMES[f] ?? f}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-white/50 py-12">
              No hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.04 * (index % 4), ease: [0.16, 1, 0.3, 1] }}
      className={`group relative grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-stretch rounded-3xl border border-white/[0.06] bg-white/[0.015] p-3 lg:p-4 card-hover overflow-hidden ${
        isReversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <ProjectCover project={project} index={index} />
      <ProjectDetails project={project} index={index} />
    </motion.article>
  );
}

function ProjectCover({ project, index }: { project: Project; index: number }) {
  const cover = project.cover;
  const fallbackFrom = cover?.gradientFrom ?? "#34d399";
  const fallbackTo = cover?.gradientTo ?? "#a78bfa";

  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[280px] lg:min-h-[360px] bg-gradient-to-br from-[#0e0e1a] to-[#15152a] border border-white/[0.05]">
      {project.coverImage ? (
        <>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#07070b]/85 via-[#07070b]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-transparent" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${fallbackFrom}, ${fallbackTo})`,
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-7xl lg:text-9xl font-black text-white/10 select-none tracking-tighter px-8 text-center leading-none">
              {project.title.split(" ")[0]}
            </span>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
        <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white/90">
          {String(index + 1).padStart(2, "0")} / Proyecto
        </span>
        {project.categories[0] && (
          <span
            className={`chip ${CATEGORY_CHIP[project.categories[0]] ?? "chip-accent"} backdrop-blur-md`}
          >
            {project.categories[0]}
          </span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Mau Vilar · Data Scientist
        </span>
        <span className="hidden sm:inline px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/65 font-mono">
          {project.cellCount} celdas · {project.imageCount} viz
        </span>
      </div>
    </div>
  );
}

function ProjectDetails({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-col justify-between p-3 lg:p-6">
      <div className="space-y-5">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm sm:text-base lg:text-lg text-white/20 leading-none">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight leading-tight whitespace-nowrap">
            <Link
              href={`/projects/${project.slug}`}
              className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] hover:bg-[length:100%_2px] bg-no-repeat bg-left-bottom transition-all duration-500"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6ee7b7, #22d3ee)",
              }}
            >
              {project.title}
            </Link>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span key={cat} className={`chip ${CATEGORY_CHIP[cat] ?? "chip-accent"}`}>
              {cat}
            </span>
          ))}
        </div>

        <p className="text-white/65 leading-relaxed line-clamp-5 lg:line-clamp-none">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 8).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-white/65 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 8 && (
            <span className="px-2 py-1 rounded-md text-[11px] font-medium text-white/45 font-mono">
              +{project.technologies.length - 8}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-medium text-white hover:bg-emerald-300/10 hover:border-emerald-300/40 hover:text-emerald-300 transition"
        >
          Ver proyecto
          <svg className="h-4 w-4 transition group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-white/55 hover:text-white transition"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
          </svg>
          Notebook en GitHub
        </a>
      </div>
    </div>
  );
}
