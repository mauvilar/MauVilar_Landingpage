import Link from "next/link";
import { projects } from "@/lib/projects";

export default function NotFound() {
  const sugerencias = projects.slice(0, 4);

  return (
    <section className="mx-auto max-w-[88rem] px-6 lg:px-10 pt-36 pb-24">
      <div className="grid lg:grid-cols-[1fr_28rem] gap-12 lg:gap-20">
        <div>
          <p className="label">Error 404</p>
          <h1 className="display mt-6 text-[clamp(2.25rem,7vw,5.5rem)]">
            Esta página no existe
          </h1>
          <p className="mt-7 prose-measure text-ink-muted">
            La dirección que escribiste no corresponde a ningún proyecto. Puede
            que el enlace esté viejo o que tenga una letra de más.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-solid">
              Ir al inicio
            </Link>
            <Link href="/#proyectos" className="btn btn-outline">
              Ver todos los proyectos
            </Link>
          </div>
        </div>

        <aside className="border-t-2 border-accent pt-5">
          <h2 className="label">Quizá buscabas</h2>
          <ul className="mt-5 border-t border-rule">
            {sugerencias.map((p) => (
              <li key={p.slug} className="border-b border-rule">
                <Link
                  href={`/projects/${p.slug}`}
                  className="block py-3.5 text-[0.9375rem] text-ink-muted hover:text-accent-ink transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
