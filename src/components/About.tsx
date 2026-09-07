const experience = [
  {
    role: "Founder & AI Engineer",
    org: "NyxAI Studio",
    period: "Oct 2025",
    periodEnd: "Actualidad",
    description:
      "Fundé NyxAI Studio para llevar IA generativa, automatización y análisis de datos a PYMEs. Diseño y entrego el sistema completo, del pipeline de datos a la interfaz con la que el cliente lo usa.",
  },
  {
    role: "Trader independiente",
    org: "Autónomo",
    period: "Ene 2020",
    periodEnd: "Actualidad",
    description:
      "Operación sistemática en mercados financieros. Desarrollo modelos cuantitativos, backtests y tableros para gestión de portafolio y control de riesgo.",
  },
  {
    role: "Business Development Associate",
    org: "Cenote Gardens, Tulum",
    period: "Jun 2024",
    periodEnd: "Jul 2025",
    description:
      "Estrategia comercial y analítica de un destino turístico premium. Traduje datos de ocupación, marketing y experiencia del huésped en decisiones operativas.",
  },
];

const education = [
  {
    title: "Bootcamp de Ciencia de Datos y Análisis de Datos",
    org: "TripleTen",
    year: "2025",
  },
  { title: "Cursos oficiales de Claude", org: "Anthropic", year: "2025" },
  { title: "Certificación de Power BI", org: "DataCamp", year: "2025" },
  {
    title: "Licenciatura en Administración de Empresas",
    org: "UDLAP",
    year: "2024",
  },
];

const inProgress = [
  { title: "Certificación A2 de Excel, macros y Power BI" },
  { title: "Microsoft Azure Fundamentals (AZ-900)" },
];

export function About() {
  return (
    <section id="sobre-mi" className="rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[22rem_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="display-sm text-[clamp(1.875rem,3.5vw,2.75rem)]">
              Trayectoria
            </h2>
            <p className="mt-4 prose-measure text-ink-muted">
              Mexicano y australiano, formado en negocios y reentrenado en datos
              e IA. Español nativo, inglés C1. Lo que mejor hago es traducir un
              problema de negocio en una pregunta que los datos sí pueden
              contestar.
            </p>
          </div>

          <div>
            <h3 className="label">Experiencia</h3>
            <ol className="mt-5 border-t border-rule-strong">
              {experience.map((item) => (
                <li
                  key={item.role}
                  className="grid sm:grid-cols-[8.5rem_1fr] gap-x-8 gap-y-2 py-7 border-b border-rule"
                >
                  <p className="num text-[0.8125rem] text-ink-faint leading-relaxed">
                    {item.period}
                    <span aria-hidden className="block">
                      {item.periodEnd}
                    </span>
                  </p>
                  <div>
                    <h4 className="text-lg font-semibold text-ink leading-snug">
                      {item.role}
                    </h4>
                    <p className="mt-0.5 text-[0.9375rem] text-marine-ink">
                      {item.org}
                    </p>
                    <p className="mt-3 prose-measure text-[0.9375rem] leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14">
              <div>
                <h3 className="label">Formación</h3>
                <ul className="mt-5 border-t border-rule-strong">
                  {education.map((ed) => (
                    <li
                      key={ed.title}
                      className="flex items-baseline justify-between gap-4 py-3.5 border-b border-rule"
                    >
                      <span>
                        <span className="block text-[0.9375rem] text-ink leading-snug">
                          {ed.title}
                        </span>
                        <span className="block mt-0.5 text-[0.8125rem] text-ink-faint">
                          {ed.org}
                        </span>
                      </span>
                      <span className="num text-[0.8125rem] text-ink-faint shrink-0">
                        {ed.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="label">En curso</h3>
                <ul className="mt-5 border-t border-rule-strong">
                  {inProgress.map((ed) => (
                    <li
                      key={ed.title}
                      className="flex items-baseline justify-between gap-4 py-3.5 border-b border-rule"
                    >
                      <span className="text-[0.9375rem] text-ink leading-snug">
                        {ed.title}
                      </span>
                      <span className="label shrink-0 text-[0.5625rem]">
                        Cursando
                      </span>
                    </li>
                  ))}
                </ul>

                <h3 className="label mt-10">Idiomas</h3>
                <ul className="mt-5 border-t border-rule-strong">
                  {[
                    { lang: "Español", level: "Nativo" },
                    { lang: "Inglés", level: "C1" },
                  ].map((l) => (
                    <li
                      key={l.lang}
                      className="flex items-baseline justify-between gap-4 py-3.5 border-b border-rule"
                    >
                      <span className="text-[0.9375rem] text-ink">
                        {l.lang}
                      </span>
                      <span className="text-[0.8125rem] text-ink-faint">
                        {l.level}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8125rem] text-ink-faint">
                  Doble nacionalidad mexicana y australiana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
