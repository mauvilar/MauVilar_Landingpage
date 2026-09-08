import Image from "next/image";
import type { NotebookCell } from "@/lib/projects";
import { renderMarkdown } from "@/lib/markdown";
import { highlightCode } from "@/lib/highlight";
import { sanitizeHtml } from "@/lib/sanitize";

const COLLAPSE_THRESHOLD = 30;

export async function NotebookRenderer({ cells }: { cells: NotebookCell[] }) {
  /* Las figuras se numeran de corrido, como las láminas de un informe. */
  let figure = 0;

  const rendered = await Promise.all(
    cells.map(async (cell, idx) => {
      const key = `cell-${idx}`;
      switch (cell.type) {
        case "markdown": {
          const html = sanitizeHtml(renderMarkdown(cell.content));
          return (
            <div
              key={key}
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "code": {
          const lines = cell.content.split("\n").length;
          const html = await highlightCode(cell.content, cell.language || "python");
          if (lines > COLLAPSE_THRESHOLD) {
            return (
              <details key={key} className="group/code my-5">
                <summary className="inline-flex items-center gap-2 mb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint hover:text-accent-ink transition-colors">
                  <span
                    aria-hidden
                    className="inline-block w-3 text-center transition-transform group-open/code:rotate-90"
                  >
                    ›
                  </span>
                  <span className="group-open/code:hidden">
                    Mostrar las {lines} líneas de código
                  </span>
                  <span className="hidden group-open/code:inline">
                    Ocultar el código
                  </span>
                </summary>
                <div
                  className="code-block"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </details>
            );
          }
          return (
            <div
              key={key}
              className="code-block my-5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "image": {
          figure += 1;
          const n = figure;
          return (
            <figure key={key} className="my-8">
              {/* La regla de la página: la entrada (el código) va en la
                  noche y toda salida va en claro: figura, tabla y stdout.
                  La gráfica de matplotlib ya viene con fondo claro, así que
                  se monta como lámina y no como recorte flotando. */}
              <div className="bg-paper-raised p-4 sm:p-6 border border-rule">
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 text-[0.75rem] text-ink-faint">
                <span className="num shrink-0 uppercase tracking-[0.1em]">
                  Fig. {String(n).padStart(2, "0")}
                </span>
                <span className="border-l border-rule-strong pl-3 min-w-0 truncate">
                  {cell.alt}
                </span>
              </figcaption>
            </figure>
          );
        }
        case "html": {
          const html = sanitizeHtml(cell.content);
          return (
            <div
              key={key}
              className="my-6 overflow-x-auto border border-rule bg-paper-raised p-4 font-mono text-[0.8125rem] text-ink-muted [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_th]:p-2 [&_th]:text-ink [&_th]:uppercase [&_th]:tracking-[0.06em] [&_th]:text-[0.6875rem] [&_th]:border-b [&_th]:border-rule-strong [&_td]:p-2 [&_td]:border-b [&_td]:border-rule [&_td]:tabular-nums"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "text-output":
          return (
            <pre
              key={key}
              className="my-4 overflow-x-auto whitespace-pre-wrap border-l-2 border-rule-strong bg-paper-raised px-4 py-3 font-mono text-[0.75rem] leading-relaxed text-ink-muted"
            >
              {cell.content}
            </pre>
          );
        default:
          return null;
      }
    })
  );

  return <div>{rendered}</div>;
}
