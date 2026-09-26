import type { Celda } from "@/lib/catalogo";
import { Lamina } from "@/components/Lamina";
import { dosDigitos } from "@/lib/texto";

/* A partir de aquí el código se pliega: un bloque largo sigue disponible,
   pero no interrumpe la lectura del análisis. */
const LINEAS_PLEGADAS = 30;

/**
 * Las celdas ya vienen convertidas del parser: markdown saneado, código con
 * su resaltado y figuras en WebP. Aquí sólo se montan.
 */
export function NotebookRenderer({ celdas }: { celdas: Celda[] }) {
  return (
    <div>
      {celdas.map((c, i) => {
        const key = `c${i}`;
        switch (c.t) {
          case "md":
            return <div key={key} className="markdown-body" dangerouslySetInnerHTML={{ __html: c.html }} />;

          case "code":
            if (c.lineas > LINEAS_PLEGADAS) {
              return (
                <details key={key} className="group/code my-5">
                  <summary className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted hover:text-accent-ink transition-colors">
                    <span aria-hidden className="inline-block w-3 text-center transition-transform group-open/code:rotate-90">
                      ›
                    </span>
                    <span className="group-open/code:hidden">Mostrar las {c.lineas} líneas de código</span>
                    <span className="hidden group-open/code:inline">Ocultar el código</span>
                  </summary>
                  <div className="code-block mt-2.5" dangerouslySetInnerHTML={{ __html: c.html }} />
                </details>
              );
            }
            return <div key={key} className="code-block my-5" dangerouslySetInnerHTML={{ __html: c.html }} />;

          case "fig":
            return (
              <figure key={key} className="my-8">
                <Lamina figura={c} />
                <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.75rem] text-ink-muted">
                  <span className="num shrink-0 uppercase tracking-[0.1em]">Fig. {dosDigitos(c.n)}</span>
                  <span className="border-l border-rule-strong pl-3 min-w-0">{c.alt}</span>
                  {c.tono === "clara" && (
                    <span className="basis-full sm:basis-auto sm:border-l sm:border-rule-strong sm:pl-3">
                      Figura original del notebook
                    </span>
                  )}
                </figcaption>
              </figure>
            );

          case "tabla":
            return <div key={key} className="tabla my-6" dangerouslySetInnerHTML={{ __html: c.html }} />;

          case "texto":
            return (
              <pre key={key} className="salida my-4">
                {c.texto}
              </pre>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
