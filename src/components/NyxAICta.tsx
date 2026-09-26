import { PERFIL } from "@/lib/sitio";

export function NyxAICta() {
  return (
    <section className="surface-night py-24 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-20 lg:items-end">
          <div>
            <p className="label">Mi consultora</p>

            {/* El lockup viene del kit de marca. Nunca se tipografía a mano. */}
            <img
              src="/brand/nyxai-lockup-on-dark.svg"
              alt="NyxAI Studio"
              width={1662}
              height={418}
              className="mt-7 h-9 w-auto sm:h-11"
            />

            <h2 className="mt-8 title-row text-[clamp(1.75rem,3.6vw,2.875rem)] prose-measure">
              Lo que aquí es un notebook, en NyxAI Studio es un sistema que corre solo
            </h2>

            <p className="mt-6 prose-measure text-ink-muted">
              NyxAI Studio es la consultora de datos y software que dirijo desde octubre de 2025:
              aplicaciones web, la capa de datos que las alimenta, tableros de indicadores y la
              infraestructura donde corren, para empresas en México.
            </p>
          </div>

          <div className="shrink-0">
            <a href={PERFIL.nyxai} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              nyxaistudio.com
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
