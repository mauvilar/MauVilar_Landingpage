import Image from "next/image";

export function NyxAICta() {
  return (
    <section className="surface-night py-24 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 lg:items-end">
          <div>
            <p className="label">Mi consultora</p>

            {/* El lockup viene del kit de marca. Nunca se tipografía a mano. */}
            <Image
              src="/brand/nyxai-lockup-on-dark.svg"
              alt="NyxAI Studio"
              width={1662}
              height={418}
              className="mt-7 h-9 w-auto sm:h-11"
            />

            <h2 className="mt-8 title-row text-[clamp(1.75rem,3.6vw,2.875rem)] prose-measure">
              Lo que aquí es un notebook, en NyxAI Studio es un sistema que
              corre solo
            </h2>

            <p className="mt-6 prose-measure text-ink-muted">
              Fundé NyxAI Studio para llevar este trabajo a empresas que no
              tienen equipo de datos: modelos, automatizaciones y tableros que
              se quedan funcionando después de que entrego el proyecto.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://nyxaistudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              nyxaistudio.com
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
