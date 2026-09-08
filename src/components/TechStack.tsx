type Group = {
  label: string;
  note: string;
  items: readonly string[];
  extras?: readonly string[];
  extrasLabel?: string;
  mono?: boolean;
};

const groups: Group[] = [
  {
    label: "IA & LLMs",
    note: "Lo que uso para construir agentes y producto con modelos",
    items: [
      "Claude",
      "Anthropic API",
      "OpenAI",
      "Gemini",
      "MCP",
      "LangChain",
      "RAG",
      "AI Agents",
    ],
    extras: [
      "Google AI Studio",
      "Prompt Engineering",
      "Fine-tuning",
      "Vector Databases",
      "LLM Orchestration",
      "Vapi",
      "Eleven Labs",
      "Retell",
    ],
  },
  {
    label: "Datos & BI",
    note: "El stack de los notebooks de este portafolio",
    items: [
      "Python",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "scikit-learn",
      "plotly",
      "SQL",
      "PostgreSQL",
      "Power BI",
      "Tableau",
    ],
    extras: [
      "scipy",
      "statsmodels",
      "sklearn.model_selection",
      "sklearn.linear_model",
      "sklearn.ensemble",
      "sklearn.metrics",
      "sklearn.preprocessing",
      "sqlite3",
      "sqlalchemy",
      "missingno",
      "collections",
      "math",
      "datetime",
      "random",
      "os",
      "sys",
      "re",
      "json",
      "requests",
    ],
    extrasLabel: "Ver los módulos que aparecen en el código",
    mono: true,
  },
  {
    label: "Automatización",
    note: "Cómo conecto sistemas que no se hablaban",
    items: [
      "n8n",
      "Make",
      "GoHighLevel",
      "Google Apps Script",
      "Meta Graph API",
      "Cloudinary",
      "OAuth 2.0",
      "APIs REST",
      "Webhooks",
    ],
  },
  {
    label: "Dev & Cloud",
    note: "Dónde termina viviendo lo que construyo",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Supabase",
      "Stripe",
      "Vercel",
      "Docker",
      "AWS",
    ],
    extras: [
      "Vite",
      "GitHub Actions",
      "Git",
      "SSH",
      "Linux/Ubuntu",
      "Caddy",
      "Hostinger VPS",
      "pencil.dev",
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="surface-warm py-20 lg:py-28 border-t border-rule">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <header>
          <p className="label">Stack</p>
          <h2 className="display mt-5 text-[clamp(2.75rem,9.5vw,8rem)]">
            Herramientas
          </h2>
        </header>

        <div className="mt-14 lg:mt-20 grid lg:grid-cols-[22rem_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="prose-measure text-ink-muted">
              Lo que de verdad tengo abierto en el día. El primer bloque es el
              que aparece en los notebooks de este sitio; el resto es lo que uso
              para llevar un análisis a producción.
            </p>
          </div>

          <dl className="border-t border-rule-strong">
            {groups.map((group) => (
              <div
                key={group.label}
                className="grid sm:grid-cols-[10rem_1fr] gap-x-8 gap-y-3 py-7 border-b border-rule"
              >
                <div>
                  <dt className="title-row text-[1.0625rem] text-ink">
                    {group.label}
                  </dt>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-faint sm:pr-4">
                    {group.note}
                  </p>
                </div>

                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className={`text-[0.9375rem] text-ink-muted ${
                          group.mono ? "font-mono text-[0.875rem]" : ""
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {group.extras && (
                    <details className="group/ex mt-4">
                      <summary className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint hover:text-accent-ink transition-colors">
                        <span
                          aria-hidden
                          className="inline-block w-3 text-center transition-transform group-open/ex:rotate-90"
                        >
                          ›
                        </span>
                        <span className="group-open/ex:hidden">
                          {group.extrasLabel ??
                            `Ver los otros ${group.extras.length}`}
                        </span>
                        <span className="hidden group-open/ex:inline">
                          Ocultar
                        </span>
                      </summary>
                      <ul className="mt-3 pl-5 flex flex-wrap gap-x-5 gap-y-2 border-l border-rule">
                        {group.extras.map((item) => (
                          <li
                            key={item}
                            className={`text-[0.875rem] text-ink-faint ${
                              group.mono ? "font-mono text-[0.8125rem]" : ""
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
