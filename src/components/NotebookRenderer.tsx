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
                <summary className="inline-flex items-center gap-2 mb-2 font-mono text-[0.75rem] text-ink-faint hover:text-ink transition-colors">
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
              {/* Passe-partout crema: la gráfica de matplotlib llega con fondo
                  claro, así que se monta como lámina en vez de flotar sobre
                  el navy. */}
              <div className="bg-ink p-4 sm:p-6 border border-rule">
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <figcaption className="mt-2.5 flex items-baseline gap-3 text-[0.75rem] text-ink-faint">
                <span className="num shrink-0">Fig. {n}</span>
                <span className="border-l border-rule pl-3 min-w-0 truncate">
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
              className="my-6 overflow-x-auto border border-rule bg-paper-deep p-4 font-mono text-[0.8125rem] [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_th]:p-2 [&_th]:text-ink [&_th]:border-b [&_th]:border-rule-strong [&_td]:p-2 [&_td]:border-b [&_td]:border-rule [&_td]:tabular-nums"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "text-output":
          return (
            <pre
              key={key}
              className="my-4 overflow-x-auto whitespace-pre-wrap border border-rule bg-paper-deep px-4 py-3 font-mono text-[0.75rem] leading-relaxed text-ink-muted"
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
