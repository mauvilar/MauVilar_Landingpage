import Image from "next/image";
import type { NotebookCell } from "@/lib/projects";
import { renderMarkdown } from "@/lib/markdown";
import { highlightCode } from "@/lib/highlight";
import { sanitizeHtml } from "@/lib/sanitize";

const COLLAPSE_THRESHOLD = 30;

export async function NotebookRenderer({ cells }: { cells: NotebookCell[] }) {
  const rendered = await Promise.all(
    cells.map(async (cell, idx) => {
      const key = `cell-${idx}`;
      switch (cell.type) {
        case "markdown": {
          const html = sanitizeHtml(renderMarkdown(cell.content));
          return (
            <div
              key={key}
              className="markdown-body max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "code": {
          const lines = cell.content.split("\n").length;
          const html = await highlightCode(cell.content, cell.language || "python");
          if (lines > COLLAPSE_THRESHOLD) {
            return (
              <details key={key} className="code-block group/code">
                <summary className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-300/80 bg-emerald-300/[0.06] border border-emerald-300/15 w-fit hover:bg-emerald-300/[0.1] transition cursor-pointer">
                  <svg className="h-3 w-3 transition group-open/code:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Mostrar bloque ({lines} líneas)
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
              className="code-block"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "image":
          return (
            <figure
              key={key}
              className="my-6 rounded-xl border border-white/10 bg-white/[0.02] p-3 overflow-hidden"
            >
              <Image
                src={cell.src}
                alt={cell.alt}
                width={1200}
                height={720}
                className="w-full h-auto rounded-lg"
                unoptimized
              />
            </figure>
          );
        case "html": {
          const html = sanitizeHtml(cell.content);
          return (
            <div
              key={key}
              className="my-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 overflow-x-auto text-sm [&_table]:w-full [&_table]:text-left [&_th]:p-2 [&_th]:bg-white/[0.04] [&_td]:p-2 [&_td]:border-t [&_td]:border-white/5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        case "text-output":
          return (
            <pre
              key={key}
              className="my-3 px-4 py-3 rounded-lg bg-black/40 border border-white/[0.06] text-[13px] font-mono text-white/70 overflow-x-auto whitespace-pre-wrap"
            >
              {cell.content}
            </pre>
          );
        default:
          return null;
      }
    })
  );

  return <div className="space-y-1">{rendered}</div>;
}
