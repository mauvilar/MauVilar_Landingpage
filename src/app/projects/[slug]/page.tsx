import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAdjacentProjects,
  getAllSlugs,
  getProject,
  projects,
} from "@/lib/projects";
import { NotebookRenderer } from "@/components/NotebookRenderer";

const CATEGORY_CHIP: Record<string, string> = {
  "Machine Learning": "chip-pink",
  "Estadística & Pruebas de Hipótesis": "chip-amber",
  "SQL & Analítica de Producto": "chip-cyan",
  "Visualización & Dashboards": "chip-violet",
  "Análisis Exploratorio (EDA)": "chip-accent",
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · Mauricio Vilar Giribet`,
      description: project.summary,
      type: "article",
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  return (
    <article className="relative">
      <ProjectHeader project={project} index={projectIndex} />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div className="min-w-0 space-y-6 pt-6">
          <NotebookRenderer cells={project.cells} />

          <div className="mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white/65 hover:text-emerald-300 transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a proyectos
            </Link>
            <div className="flex flex-wrap gap-2">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-sm hover:border-emerald-300/30 hover:text-emerald-300 transition"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Anterior
                </Link>
              )}
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-300/[0.06] border border-emerald-300/30 text-sm text-emerald-200 hover:bg-emerald-300/15 transition"
                >
                  Siguiente
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        <Sidebar project={project} prev={prev} next={next} />
      </div>
    </article>
  );
}

function ProjectHeader({
  project,
  index,
}: {
  project: ReturnType<typeof getProject> & object;
  index: number;
}) {
  const heroImage = project.coverImage;
  const fallbackFrom = project.cover?.gradientFrom ?? "#34d399";
  const fallbackTo = project.cover?.gradientTo ?? "#a78bfa";

  return (
    <header className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="absolute inset-0 z-0">
        {heroImage ? (
          <>
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07070b]/40 via-[#07070b]/85 to-[#07070b]" />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: `linear-gradient(135deg, ${fallbackFrom}, ${fallbackTo})` }}
          />
        )}
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_0%,transparent_85%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <nav className="text-xs text-white/45 mb-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-emerald-300 transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/#proyectos" className="hover:text-emerald-300 transition">
            Proyectos
          </Link>
          <span>/</span>
          <span className="text-white/75 line-clamp-1">{project.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/60">
            #{String(index + 1).padStart(2, "0")}
          </span>
          {project.categories.map((cat) => (
            <span key={cat} className={`chip ${CATEGORY_CHIP[cat] ?? "chip-accent"}`}>
              {cat}
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl">
          {project.title}
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-3xl leading-relaxed">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-medium hover:border-emerald-300/40 hover:text-emerald-300 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
            </svg>
            Notebook original en GitHub
            <svg className="h-3 w-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5L8 16M5 5h4M5 19h14" />
            </svg>
          </a>
          <span className="text-sm text-white/45 font-mono">
            {project.cellCount} celdas · {project.imageCount} visualizaciones
          </span>
        </div>
      </div>
    </header>
  );
}

function Sidebar({
  project,
  prev,
  next,
}: {
  project: ReturnType<typeof getProject> & object;
  prev: ReturnType<typeof getAdjacentProjects>["prev"];
  next: ReturnType<typeof getAdjacentProjects>["next"];
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-2 no-scrollbar pt-6">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
            Tecnologías
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/[0.06] text-white/75 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
            Categorías
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <span key={c} className={`chip ${CATEGORY_CHIP[c] ?? "chip-accent"}`}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
            Recurso
          </h3>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 text-sm text-white/80 hover:text-emerald-300 transition"
          >
            <svg className="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
            </svg>
            <span className="break-all leading-snug">
              {project.repoPath}
              <span className="block text-[11px] text-white/40 mt-1">
                Abrir en GitHub ↗
              </span>
            </span>
          </a>
        </div>

        {(prev || next) && (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
              Navegación
            </h3>
            <div className="space-y-2.5">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="block group rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:border-emerald-300/25 hover:bg-emerald-300/[0.04] transition"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    ← Anterior
                  </div>
                  <div className="text-sm font-medium text-white/85 mt-1 line-clamp-2">
                    {prev.title}
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="block group rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:border-emerald-300/25 hover:bg-emerald-300/[0.04] transition"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Siguiente →
                  </div>
                  <div className="text-sm font-medium text-white/85 mt-1 line-clamp-2">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
