import Link from "next/link";
import { portfolioStats } from "@/lib/stats";

const contactLinks = [
  { href: "mailto:unicemau@gmail.com", label: "unicemau@gmail.com" },
  {
    href: "https://linkedin.com/in/mauriciovilargiribet",
    label: "LinkedIn",
  },
  { href: "https://github.com/mauvilar", label: "GitHub" },
];

export function Hero() {
  const { projects, cells, figures, byCategory } = portfolioStats;

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="rise">
            <p className="label">Portafolio de ciencia de datos</p>

            {/* El póster de la marca: Archivo ancho y pesado, mayúsculas,
                partido en tres líneas para que ocupe el bloque entero. */}
            <h1 className="display mt-6 text-[clamp(2.75rem,10.5vw,7.5rem)]">
              <span className="block">Mauricio</span>
              <span className="block">Vilar</span>
              <span className="block">Giribet</span>
            </h1>

            {/* El separador va pegado al término que sigue, para que un
                punto suelto nunca termine una línea. */}
            <ul className="mt-8 pt-5 border-t border-rule-strong flex flex-wrap font-mono text-[0.8125rem] uppercase tracking-[0.14em]">
              <li className="text-ink">AI Engineer</li>
              <li className="text-ink">
                <span aria-hidden className="text-accent px-3">
                  ·
                </span>
                Data Analyst
              </li>
              <li className="text-ink-faint">
                <span aria-hidden className="text-accent px-3">
                  ·
                </span>
                Ciudad de México
              </li>
            </ul>

            <p className="mt-8 prose-measure text-[1.0625rem] leading-relaxed text-ink-muted">
              Cada proyecto de aquí abre con el notebook entero a la vista: la
              limpieza sucia del principio, las pruebas de hipótesis, el modelo
              y la decisión de negocio que salió de ahí. No son capturas de
              pantalla, es el código y las gráficas originales.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#proyectos" className="btn btn-solid">
                Ver los {projects} proyectos
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Descargar CV
                <span aria-hidden className="text-ink-faint">
                  PDF
                </span>
              </a>
              <a
                href="/cv-en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet"
              >
                En inglés
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-sm">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-ink-muted hover:text-accent-ink transition-colors underline decoration-rule-strong underline-offset-[6px] hover:decoration-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <PortfolioIndex
            projects={projects}
            cells={cells}
            figures={figures}
            byCategory={byCategory}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * El índice del portafolio. Todas las cifras vienen de projects.json,
 * calculadas en el build: no hay una sola métrica escrita a mano.
 */
function PortfolioIndex({
  projects,
  cells,
  figures,
  byCategory,
}: typeof portfolioStats) {
  const max = Math.max(...byCategory.map((c) => c.count));

  return (
    <aside className="rise [animation-delay:120ms] border-t-2 border-accent pt-5">
      <h2 className="label">Índice</h2>

      <dl className="mt-5 grid grid-cols-3 gap-px bg-rule border border-rule">
        {[
          { term: "Proyectos", value: projects },
          { term: "Celdas", value: cells },
          { term: "Gráficas", value: figures },
        ].map((stat) => (
          <div key={stat.term} className="bg-paper px-3 py-4">
            <dd className="num text-[1.75rem] leading-none text-ink">
              {stat.value}
            </dd>
            <dt className="label mt-2 text-[0.5625rem]">{stat.term}</dt>
          </div>
        ))}
      </dl>

      <table className="mt-6 w-full text-sm">
        <caption className="sr-only">
          Proyectos por área de trabajo
        </caption>
        <tbody>
          {byCategory.map(({ category, count }) => (
            <tr key={category} className="border-b border-rule last:border-b-0">
              <th
                scope="row"
                className="py-2.5 pr-3 text-left font-normal text-ink-muted align-middle"
              >
                {category}
              </th>
              <td className="py-2.5 w-24 align-middle">
                <span
                  aria-hidden
                  className="block h-[3px] bg-accent"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </td>
              <td className="num py-2.5 pl-3 text-right text-ink w-10 align-middle">
                {count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs text-ink-faint">
        Un proyecto puede contar en varias áreas.
      </p>
    </aside>
  );
}
