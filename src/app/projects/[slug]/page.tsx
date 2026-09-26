import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ANCLA_NIVEL,
  NIVEL_ETIQUETA,
  getNotebook,
  getSerie,
  leerContenido,
  notebooks,
  notebooksDe,
  sprintDe,
  vecinos,
  type NotebookMeta,
  type Serie,
} from "@/lib/catalogo";
import { NotebookRenderer } from "@/components/NotebookRenderer";
import { ModelResults } from "@/components/ModelResults";
import { Lamina } from "@/components/Lamina";
import { dosDigitos } from "@/lib/texto";

/* Sólo existen las páginas del catálogo: cualquier otro slug es un 404 y
   no se intenta generar nada en tiempo de ejecución. */
export const dynamicParams = false;

export function generateStaticParams() {
  return notebooks.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNotebook(slug);
  if (!n) return {};
  const serie = getSerie(n.serie);
  const titulo = serie ? `${n.titulo} · ${serie.titulo}` : n.titulo;
  const imagen = { url: `/og/${slug}.png`, width: 1200, height: 630, alt: titulo };
  return {
    title: n.titulo,
    description: n.descripcion,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title: titulo,
      description: n.descripcion,
      images: [imagen],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: n.descripcion,
      images: [imagen.url],
    },
  };
}

/** "2 de 4" en una serie; "Sprint 14" en la formación. */
function posicionEn(n: NotebookMeta, total: number) {
  const sprint = sprintDe(n);
  return sprint ? `Sprint ${sprint}` : `${n.posicion} de ${total}`;
}

export default async function PaginaNotebook({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNotebook(slug);
  const serie = n ? getSerie(n.serie) : undefined;
  if (!n || !serie) notFound();

  const contenido = leerContenido(slug);
  const { anterior, siguiente } = vecinos(slug);
  const hermanos = notebooksDe(serie);

  return (
    <article>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10 pt-24 lg:pt-28 pb-10 lg:pb-14">
          <nav aria-label="Ruta" className="label flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/" className="hover:text-accent-ink transition-colors">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href={ANCLA_NIVEL[serie.nivel]} className="hover:text-accent-ink transition-colors">
              {serie.nivel === "propio" ? "Proyectos" : "Bootcamp"}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{serie.titulo}</span>
          </nav>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="min-w-0">
              <p className="label text-accent-ink">
                {NIVEL_ETIQUETA[serie.nivel]} · {posicionEn(n, hermanos.length)}
              </p>
              <h1 className="display-sm mt-4 text-[clamp(1.5rem,4vw,3.5rem)]">{n.titulo}</h1>
              <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed">{n.resumen}</p>
              <p className="mt-5 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink-muted">
                {n.herramientas.join(" · ")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={n.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Ver el notebook en GitHub
                  <span aria-hidden>↗</span>
                </a>
                <span className="num text-[0.8125rem] text-ink-muted">
                  {n.celdas} celdas · {n.figuras} gráficas
                </span>
              </div>
            </div>

            {n.portada && <Lamina figura={n.portada} prioridad />}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 pb-24 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0 pt-10">
          <NotebookRenderer celdas={contenido.celdas} />

          {contenido.resultados && <ModelResults results={contenido.resultados} />}

          <nav aria-label="Dentro de la serie" className="mt-16 pt-8 border-t border-rule-strong grid sm:grid-cols-2 gap-6">
            {anterior ? (
              <Link href={`/projects/${anterior.slug}`} className="group block">
                <span className="label">← Anterior en la serie</span>
                <span className="mt-2 block title-row text-lg text-ink group-hover:text-accent-ink transition-colors">
                  {anterior.titulo}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {siguiente && (
              <Link href={`/projects/${siguiente.slug}`} className="group block sm:text-right">
                <span className="label">Siguiente en la serie →</span>
                <span className="mt-2 block title-row text-lg text-ink group-hover:text-accent-ink transition-colors">
                  {siguiente.titulo}
                </span>
              </Link>
            )}
          </nav>
        </div>

        <Ficha n={n} serie={serie} hermanos={hermanos} />
      </div>
    </article>
  );
}

function Ficha({ n, serie, hermanos }: { n: NotebookMeta; serie: Serie; hermanos: NotebookMeta[] }) {
  const filas = [
    { dt: "Celdas", dd: String(n.celdas) },
    { dt: "Gráficas", dd: String(n.figuras) },
  ];

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar pt-10">
      <h2 className="label border-t-2 border-accent pt-4">
        {hermanos.length > 1 ? "En esta serie" : "Serie"}
      </h2>
      <p className="mt-3 title-row text-[1rem] text-ink">{serie.titulo}</p>
      <ol className="mt-3 border-t border-rule">
        {hermanos.map((h) => {
          const actual = h.slug === n.slug;
          const sprint = sprintDe(h);
          return (
            <li key={h.slug} className="border-b border-rule">
              <Link
                href={`/projects/${h.slug}`}
                aria-current={actual ? "page" : undefined}
                className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-x-2 py-2.5 text-[0.875rem] leading-snug transition-colors ${
                  actual ? "text-ink" : "text-ink-muted hover:text-accent-ink"
                }`}
              >
                <span className={`num text-[0.75rem] ${actual ? "text-accent-ink" : ""}`}>
                  {sprint ? `Sp. ${sprint}` : dosDigitos(h.posicion)}
                </span>
                <span>{h.titulo}</span>
              </Link>
            </li>
          );
        })}
      </ol>

      <h2 className="label mt-9 border-t-2 border-accent pt-4">Ficha</h2>
      <dl className="mt-3 text-[0.8125rem]">
        {filas.map((f) => (
          <div key={f.dt} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-rule">
            <dt className="text-ink-muted">{f.dt}</dt>
            <dd className="num text-ink">{f.dd}</dd>
          </div>
        ))}
        <div className="py-3 border-b border-rule">
          <dt className="text-ink-muted">Archivo original</dt>
          <dd className="mt-1.5">
            <a
              href={n.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.75rem] leading-relaxed text-accent-ink hover:text-ink transition-colors break-all"
            >
              {n.ruta}
            </a>
          </dd>
        </div>
        {serie.repoUrl && (
          <div className="py-3">
            <dt className="text-ink-muted">Carpeta del proyecto</dt>
            <dd className="mt-1.5">
              <a
                href={serie.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.75rem] leading-relaxed text-accent-ink hover:text-ink transition-colors break-all"
              >
                GitHub ↗
              </a>
            </dd>
          </div>
        )}
      </dl>

      <Link href={ANCLA_NIVEL[serie.nivel]} className="btn btn-quiet mt-7">
        <span aria-hidden>←</span>
        Volver al índice
      </Link>
    </aside>
  );
}
