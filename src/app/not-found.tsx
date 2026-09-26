import Link from "next/link";
import { notebooksDe, seriesDeNivel } from "@/lib/catalogo";

export default function NotFound() {
  const propios = seriesDeNivel("propio");

  return (
    <section className="mx-auto max-w-[88rem] px-6 lg:px-10 pt-36 pb-24">
      <div className="grid lg:grid-cols-[1fr_26rem] gap-12 lg:gap-20">
        <div>
          <p className="label">Error 404</p>
          <h1 className="display-sm mt-6 text-[clamp(2rem,6vw,4.5rem)]">Esta página no existe</h1>
          <p className="mt-7 prose-measure text-ink-muted">
            La dirección no corresponde a ningún notebook. Puede que el enlace sea viejo o que
            tenga una letra de más.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-solid">
              Ir al inicio
            </Link>
            <Link href="/#proyectos" className="btn btn-outline">
              Ver los proyectos
            </Link>
          </div>
        </div>

        <aside className="border-t-2 border-accent pt-5">
          <h2 className="label">Quizá buscabas</h2>
          <ul className="mt-5 border-t border-rule">
            {propios.map((s) => {
              const primero = notebooksDe(s)[0];
              return (
                <li key={s.id} className="border-b border-rule">
                  <Link
                    href={primero ? `/projects/${primero.slug}` : "/#proyectos"}
                    className="flex items-baseline justify-between gap-4 py-3.5 text-[0.9375rem] text-ink hover:text-accent-ink transition-colors"
                  >
                    <span>{s.titulo}</span>
                    <span className="num shrink-0 text-[0.75rem] text-ink-muted">
                      {s.notebooks.length} notebooks
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
