import { CERTIFICACIONES, EXPERIENCIA, FORMACION, PERFIL } from "@/lib/sitio";

export function Trayectoria() {
  return (
    <section id="trayectoria" className="surface-warm rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 cq">
        <header className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-16 lg:items-end">
          <h2 className="display poster">Trayectoria</h2>
          <p className="label lg:pb-2">
            {EXPERIENCIA.length} puestos · {CERTIFICACIONES.length} certificaciones
          </p>
        </header>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[22rem_minmax(0,1fr)] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="prose-measure text-[1.0625rem] leading-relaxed">
              Trabajo las dos mitades del mismo oficio: construyo el software y hago el análisis
              al que ese software sirve. Formado en Administración de Empresas y reentrenado en
              datos. Español nativo, inglés B2/C1; doble nacionalidad mexicana y australiana.
            </p>
            <a href={PERFIL.cv} className="btn btn-outline mt-7">
              CV completo
              <span aria-hidden className="opacity-70">
                PDF
              </span>
            </a>
          </div>

          <div className="min-w-0">
            <h3 className="label">Experiencia</h3>
            <ol className="mt-5 border-t border-rule-strong">
              {EXPERIENCIA.map((p) => (
                <li
                  key={p.cargo + p.lugar}
                  className="grid sm:grid-cols-[8.5rem_minmax(0,1fr)] gap-x-8 gap-y-2 py-7 border-b border-rule"
                >
                  <p className="num text-[0.8125rem] text-ink-muted leading-relaxed">
                    {p.desde}
                    <span className="block">{p.hasta}</span>
                  </p>
                  <div className="min-w-0">
                    <h4 className="title-row text-[1.1875rem] text-ink">{p.cargo}</h4>
                    <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-accent-ink">
                      {p.lugar}
                    </p>
                    <p className="mt-3 prose-measure text-[0.9375rem] leading-relaxed text-ink-muted">
                      {p.descripcion}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-14">
              <div>
                <h3 className="label">Formación académica</h3>
                <ul className="mt-5 border-t border-rule-strong">
                  {FORMACION.map((f) => (
                    <li key={f.titulo} className="flex items-baseline justify-between gap-4 py-3.5 border-b border-rule">
                      <span>
                        <span className="block text-[0.9375rem] text-ink leading-snug">{f.titulo}</span>
                        <span className="block mt-0.5 text-[0.8125rem] text-ink-muted">{f.lugar}</span>
                      </span>
                      <span className="num text-[0.8125rem] text-ink-muted shrink-0">{f.anio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="label">Certificaciones y cursos</h3>
                <ul className="mt-5 border-t border-rule-strong">
                  {CERTIFICACIONES.map((c) => (
                    <li key={c.titulo} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-3 border-b border-rule">
                      <span className="num text-[0.8125rem] text-ink-muted">{c.anio}</span>
                      <span>
                        <span className="block text-[0.9375rem] text-ink leading-snug">{c.titulo}</span>
                        <span className="block mt-0.5 text-[0.8125rem] text-ink-muted">{c.lugar}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
