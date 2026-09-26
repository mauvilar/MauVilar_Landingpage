import Link from "next/link";
import { notebooksDe, seriesDeNivel, sprintDe } from "@/lib/catalogo";
import { dosDigitos, enPalabras } from "@/lib/texto";

export function Bootcamp() {
  const final = seriesDeNivel("final")[0];
  const formacion = seriesDeNivel("formacion")[0];
  const finales = final ? notebooksDe(final) : [];
  const sprints = formacion ? notebooksDe(formacion) : [];

  return (
    <section id="bootcamp" className="surface-warm py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 cq">
        <header className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-16 lg:items-end">
          <div>
            <h2 className="display poster">Bootcamp</h2>
            <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed text-ink-muted">
              Ciencia de datos en TripleTen, 2025. El proyecto final y los {enPalabras(sprints.length)}{" "}
              sprints, del más avanzado al primero, con el notebook completo en cada uno.
            </p>
          </div>
          <p className="label lg:pb-2">
            {finales.length + sprints.length} notebooks · TripleTen
          </p>
        </header>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          {final && (
            <div className="lg:sticky lg:top-24">
              <h3 className="label border-t-2 border-accent pt-4">Proyecto final</h3>
              <p className="mt-4 title-row text-[1.375rem]">{final.titulo.replace(/^Proyecto final:\s*/i, "").replace(/^./, (c) => c.toUpperCase())}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted prose-measure">
                {final.descripcion}
              </p>
              <ol className="mt-6 border-t border-rule">
                {finales.map((n) => (
                  <li key={n.slug} className="border-b border-rule">
                    <Link
                      href={`/projects/${n.slug}`}
                      className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] gap-x-3 py-3.5 items-baseline"
                    >
                      <span className="num text-[0.8125rem] text-ink-muted">{dosDigitos(n.posicion)}</span>
                      <span className="min-w-0">
                        <span className="block title-row text-[1.0625rem] text-ink group-hover:text-accent-ink transition-colors">
                          {n.titulo}
                        </span>
                        <span className="block mt-1 text-[0.875rem] leading-relaxed text-ink-muted">
                          {n.descripcion}
                        </span>
                      </span>
                      <span aria-hidden className="text-ink-muted group-hover:text-accent-ink transition-colors">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {formacion && (
            <div>
              <h3 className="label border-t-2 border-accent pt-4">Sprints</h3>
              <ol className="mt-4 border-t border-rule">
                {sprints.map((n) => {
                  const sprint = sprintDe(n);
                  return (
                    <li key={n.slug} className="border-b border-rule">
                      <Link
                        href={`/projects/${n.slug}`}
                        className="group grid grid-cols-[3.25rem_minmax(0,1fr)] sm:grid-cols-[3.25rem_minmax(0,1fr)_11rem] gap-x-4 gap-y-1 py-3.5 items-baseline"
                      >
                        <span className="num text-[0.8125rem] text-ink-muted">
                          {sprint ? `Sp. ${sprint}` : dosDigitos(n.posicion)}
                        </span>
                        <span className="title-row text-[1.0625rem] text-ink group-hover:text-accent-ink transition-colors">
                          {n.titulo}
                        </span>
                        <span className="col-start-2 sm:col-start-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-muted sm:text-right">
                          {n.area}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
