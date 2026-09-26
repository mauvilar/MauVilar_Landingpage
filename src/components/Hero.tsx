import Link from "next/link";
import { cifras, notebooksDe, seriesDeNivel } from "@/lib/catalogo";
import { PERFIL } from "@/lib/sitio";
import { dosDigitos, enPalabras } from "@/lib/texto";

const contacto = [
  { href: `mailto:${PERFIL.correo}`, label: PERFIL.correo },
  { href: PERFIL.linkedin, label: "LinkedIn" },
  { href: PERFIL.github, label: "GitHub" },
];

export function Hero() {
  const propios = seriesDeNivel("propio");

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-start">
          <div className="rise cq">
            <p className="label">Portafolio de ciencia de datos</p>

            {/* El póster de la marca: Archivo ancho y pesado, mayúsculas,
                partido en tres líneas para que ocupe el bloque entero. */}
            <h1 className="display poster-nombre mt-6">
              <span className="block">Mauricio</span>
              <span className="block">Vilar</span>
              <span className="block">Giribet</span>
            </h1>

            <p className="mt-8 pt-5 border-t border-rule-strong font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-ink">
              {PERFIL.puesto}
              <span aria-hidden className="text-accent-ink px-3">
                ·
              </span>
              <span className="text-ink-muted">{PERFIL.ciudad}</span>
            </p>

            <p className="mt-8 prose-measure text-[1.0625rem] leading-relaxed">
              Cada proyecto abre con el notebook completo: la limpieza del principio, las
              pruebas de hipótesis, el modelo y la decisión que salió de ahí. Lo que se ve es
              el código y las gráficas originales de cada análisis.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={PERFIL.cv} className="btn btn-solid">
                Descargar CV
                <span aria-hidden className="opacity-70">
                  PDF
                </span>
              </a>
              <a href={PERFIL.cvEn} className="btn btn-outline">
                CV en inglés
              </a>
              <Link href="#proyectos" className="btn btn-quiet">
                Ver los proyectos
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[0.9375rem]">
              {contacto.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-ink-muted hover:text-accent-ink transition-colors underline decoration-rule underline-offset-[6px] hover:decoration-accent"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Acceso directo a lo que un reclutador quiere ver primero: los
              proyectos propios. Las cifras vienen del catálogo. */}
          <aside className="rise [animation-delay:120ms] border-t-2 border-accent pt-5">
            <h2 className="label">Proyectos propios</h2>
            <ol className="mt-4">
              {propios.map((s, i) => (
                <li key={s.id} className="border-b border-rule">
                  <Link
                    href={`/#${s.id}`}
                    className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-3 py-3.5 items-baseline"
                  >
                    <span className="num text-[0.8125rem] text-ink-muted">{dosDigitos(i + 1)}</span>
                    <span className="title-row text-[1.0625rem] text-ink group-hover:text-accent-ink transition-colors">
                      {s.titulo}
                    </span>
                    <span className="num text-[0.75rem] text-ink-muted whitespace-nowrap">
                      {notebooksDe(s).length} notebooks
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              {cifras.notebooks} notebooks publicados en total: los {enPalabras(cifras.propios)}{" "}
              proyectos propios, el proyecto final del bootcamp y {enPalabras(cifras.sprints)}{" "}
              sprints de TripleTen.
            </p>
            <Link href="#bootcamp" className="btn btn-quiet mt-4 text-ink-muted">
              Ver el bootcamp
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
