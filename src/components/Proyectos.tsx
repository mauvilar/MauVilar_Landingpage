import Link from "next/link";
import { cifras, notebooksDe, seriesDeNivel, type Serie } from "@/lib/catalogo";
import { Lamina } from "@/components/Lamina";
import { dosDigitos, enPalabras } from "@/lib/texto";

export function Proyectos() {
  const propios = seriesDeNivel("propio");

  return (
    <section id="proyectos" className="surface-night py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 cq">
        <header className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-16 lg:items-end">
          <div>
            <h2 className="display poster">Proyectos</h2>
            <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed text-ink-muted">
              {enPalabras(propios.length).replace(/^./, (c) => c.toUpperCase())} proyectos propios
              sobre datos públicos. Cada uno es una serie de notebooks en orden de lectura: primero
              los datos y su calidad, después el análisis.
            </p>
          </div>
          <p className="label lg:pb-2">
            {propios.length} proyectos · {cifras.notebooksPropios} notebooks
          </p>
        </header>

        <ol className="mt-12 lg:mt-16 border-t border-rule">
          {propios.map((serie, i) => (
            <SerieRow key={serie.id} serie={serie} numero={i + 1} prioridad={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function SerieRow({ serie, numero, prioridad }: { serie: Serie; numero: number; prioridad: boolean }) {
  const lista = notebooksDe(serie);

  return (
    <li
      id={serie.id}
      className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 py-12 lg:py-16 border-b border-rule"
    >
      <div>
        {serie.portada ? (
          <Lamina figura={serie.portada} prioridad={prioridad} />
        ) : (
          <div className="lamina lamina-oscura aspect-[16/9]" aria-hidden />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-4">
          <span className="num text-[0.8125rem] text-ink-faint shrink-0">{dosDigitos(numero)}</span>
          <h3 className="title-row text-[clamp(1.5rem,2.6vw,2.25rem)]">{serie.titulo}</h3>
        </div>

        <p className="mt-4 prose-measure text-[1rem] leading-relaxed text-ink-muted">
          {serie.descripcion}
        </p>

        <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink-faint">
          {serie.herramientas.join(" · ")}
        </p>

        <ol className="mt-7 border-t border-rule">
          {lista.map((n) => (
            <li key={n.slug} className="border-b border-rule">
              <Link
                href={`/projects/${n.slug}`}
                className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-3 py-4 items-baseline"
              >
                <span className="num text-[0.8125rem] text-ink-faint">{dosDigitos(n.posicion)}</span>
                <span className="min-w-0">
                  <span className="block title-row text-[1.125rem] text-ink group-hover:text-accent-ink transition-colors">
                    {n.titulo}
                  </span>
                  <span className="block mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted prose-measure">
                    {n.descripcion}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-ink-faint group-hover:text-accent-ink transition-colors"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {serie.repoUrl && (
          <a href={serie.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-quiet mt-7 text-ink-muted">
            Carpeta del proyecto en GitHub
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </li>
  );
}
