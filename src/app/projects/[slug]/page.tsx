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
import { ModelResults } from "@/components/ModelResults";

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
  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <article>
      <ProjectHeader project={project} index={index} />

      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 pb-24 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0 pt-10">
          <NotebookRenderer cells={project.cells} />

          {project.results && <ModelResults results={project.results} />}

          <nav
            aria-label="Entre proyectos"
            className="mt-16 pt-8 border-t border-rule-strong grid sm:grid-cols-2 gap-6"
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group block">
                <span className="label text-[0.625rem]">← Anterior</span>
                <span className="mt-2 block title-row text-lg text-ink-muted group-hover:text-accent-ink transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group block sm:text-right"
              >
                <span className="label text-[0.625rem]">Siguiente →</span>
                <span className="mt-2 block title-row text-lg text-ink-muted group-hover:text-accent-ink transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </div>

        <Sidebar project={project} index={index} />
      </div>
    </article>
  );
}

function ProjectHeader({
  project,
  index,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  index: number;
}) {
  return (
    <header className="border-b border-rule-strong">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 pt-24 lg:pt-28 pb-10">
        <nav
          aria-label="Ruta"
          className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint"
        >
          <Link href="/" className="hover:text-accent-ink transition-colors">
            Inicio
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#proyectos" className="hover:text-accent-ink transition-colors">
            Proyectos
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </nav>

        <div className="mt-8 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <h1 className="display-sm text-[clamp(2rem,5.2vw,4.25rem)]">
              {project.title}
            </h1>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.categories.map((cat, i) => (
                <li key={cat}>
                  <span className={i === 0 ? "tag tag-lead" : "tag"}>{cat}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed text-ink-muted">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Ver el notebook en GitHub
                <span aria-hidden>↗</span>
              </a>
              <span className="num text-[0.8125rem] text-ink-faint">
                {project.cellCount} celdas · {project.imageCount} gráficas
              </span>
            </div>
          </div>

          {project.coverImage && (
            <div className="relative aspect-[16/10] border border-rule bg-paper-raised overflow-hidden">
              <Image
                src={project.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Sidebar({
  project,
  index,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  index: number;
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar pt-10">
      <h2 className="label border-t-2 border-accent pt-4">Ficha técnica</h2>

      <dl className="mt-5 text-[0.8125rem]">
        <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-rule">
          <dt className="text-ink-faint">Número</dt>
          <dd className="num text-ink">
            {String(index + 1).padStart(2, "0")} / {projects.length}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-rule">
          <dt className="text-ink-faint">Celdas</dt>
          <dd className="num text-ink">{project.cellCount}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-rule">
          <dt className="text-ink-faint">Gráficas</dt>
          <dd className="num text-ink">{project.imageCount}</dd>
        </div>
        <div className="py-3 border-b border-rule">
          <dt className="text-ink-faint">Herramientas</dt>
          <dd className="mt-2 font-mono text-[0.75rem] leading-relaxed text-ink-muted">
            {project.technologies.join("  ·  ")}
          </dd>
        </div>
        <div className="py-3">
          <dt className="text-ink-faint">Archivo original</dt>
          <dd className="mt-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.75rem] leading-relaxed text-accent-ink hover:text-ink transition-colors break-all"
            >
              {project.repoPath}
            </a>
          </dd>
        </div>
      </dl>

      <Link href="/#proyectos" className="btn btn-quiet mt-7">
        <span aria-hidden>←</span>
        Volver al índice
      </Link>
    </aside>
  );
}
