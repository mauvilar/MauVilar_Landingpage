import { cifras, herramientasEnNotebooks } from "@/lib/catalogo";
import { COMPETENCIAS } from "@/lib/sitio";

export function Herramientas() {
  return (
    <section id="herramientas" className="rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 cq">
        <header className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-16 lg:items-end">
          <div>
            <h2 className="display poster">Herramientas</h2>
            <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed text-ink-muted">
              El primer bloque sale del código de los {cifras.notebooks} notebooks publicados, con el
              número de notebooks en que aparece cada herramienta. Los demás son las competencias
              del CV, agrupadas como ahí.
            </p>
          </div>
          <p className="label lg:pb-2">{herramientasEnNotebooks.length} en el código · {COMPETENCIAS.length} grupos del CV</p>
        </header>

        <dl className="mt-12 lg:mt-16 border-t border-rule-strong">
          <div className="grid sm:grid-cols-[13rem_1fr] gap-x-8 gap-y-3 py-7 border-b border-rule">
            <dt className="title-row text-[1.0625rem] text-ink">En los notebooks</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                {herramientasEnNotebooks.map((h) => (
                  <li key={h.nombre} className="font-mono text-[0.875rem] text-ink">
                    {h.nombre}
                    <span className="num ml-1.5 text-[0.75rem] text-ink-muted">{h.veces}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          {COMPETENCIAS.map((g) => (
            <div key={g.titulo} className="grid sm:grid-cols-[13rem_1fr] gap-x-8 gap-y-3 py-7 border-b border-rule">
              <dt className="title-row text-[1.0625rem] text-ink sm:pr-4">{g.titulo}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
