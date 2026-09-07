export function NyxAICta() {
  return (
    <section className="rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 lg:items-end">
          <div>
            <p className="label">Mi consultora</p>
            <h2 className="display-sm mt-5 text-[clamp(1.875rem,4vw,3.25rem)] prose-measure">
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
