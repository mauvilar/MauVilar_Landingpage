import type { ResultsTable } from "@/lib/projects";

/**
 * Tabla de resultados que no salió del notebook que se está leyendo.
 * Va etiquetada con su fuente para que el lector sepa exactamente de dónde
 * viene cada cifra.
 */
export function ModelResults({ results }: { results: ResultsTable }) {
  return (
    <section
      aria-labelledby="resultados"
      className="mt-14 pt-8 border-t-2 border-accent"
    >
      <h2 id="resultados" className="display-sm text-[clamp(1.5rem,2.6vw,2.125rem)]">
        {results.heading}
      </h2>

      <p className="mt-4 prose-measure text-[0.9375rem] leading-relaxed text-ink-muted">
        {results.note}
      </p>

      <div className="mt-7 overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-[0.8125rem]">
          <caption className="sr-only">
            {results.heading}, ordenado por ROC AUC de validación cruzada
          </caption>
          <thead>
            <tr>
              {results.columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`border-b border-rule-strong py-2.5 px-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint font-medium ${
                    col.numeric ? "text-right" : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-rule ${
                  row.best ? "bg-paper-raised" : ""
                }`}
              >
                {results.columns.map((col, j) => (
                  <td
                    key={col.key}
                    className={`py-2.5 px-3 ${
                      col.numeric
                        ? "text-right num text-ink"
                        : "text-left text-ink"
                    }`}
                  >
                    {row[col.key]}
                    {j === 0 && row.best && (
                      <span className="label ml-2.5 text-[0.5625rem] text-accent-ink">
                        Elegido
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[0.75rem] text-ink-faint">
        Fuente: {results.source}
      </p>
    </section>
  );
}
