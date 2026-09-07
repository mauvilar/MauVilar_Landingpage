const channels = [
  {
    label: "Correo",
    value: "unicemau@gmail.com",
    href: "mailto:unicemau@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "/in/mauriciovilargiribet",
    href: "https://linkedin.com/in/mauriciovilargiribet",
  },
  {
    label: "GitHub",
    value: "/mauvilar",
    href: "https://github.com/mauvilar",
  },
];

export function Contact() {
  return (
    <section id="contacto" className="rule-section py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_28rem] gap-10 lg:gap-20">
          <div>
            <h2 className="display-sm text-[clamp(1.875rem,4vw,3.25rem)] prose-measure">
              Si tienes datos y no sabes qué preguntarles, escríbeme
            </h2>
            <p className="mt-6 prose-measure text-ink-muted">
              Me interesan los problemas donde la respuesta todavía no está
              clara. Contesto todos los correos que traen un contexto concreto.
            </p>
            <a
              href="mailto:unicemau@gmail.com"
              className="btn btn-solid mt-8"
            >
              Escríbeme
            </a>
          </div>

          <dl className="border-t border-rule-strong lg:mt-2">
            {channels.map((c) => (
              <div
                key={c.label}
                className="flex items-baseline justify-between gap-6 py-4 border-b border-rule"
              >
                <dt className="label text-[0.625rem]">{c.label}</dt>
                <dd className="min-w-0">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-mono text-[0.8125rem] text-ink hover:text-marine-ink transition-colors break-all"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-4 border-b border-rule">
              <dt className="label text-[0.625rem]">Ubicación</dt>
              <dd className="font-mono text-[0.8125rem] text-ink-muted">
                Ciudad de México
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="label text-[0.625rem]">Zona horaria</dt>
              <dd className="font-mono text-[0.8125rem] text-ink-muted">
                GMT−6
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
