import { PERFIL } from "@/lib/sitio";

const canales = [
  { label: "Correo", valor: PERFIL.correo, href: `mailto:${PERFIL.correo}` },
  { label: "LinkedIn", valor: "/in/mauriciovilargiribet", href: PERFIL.linkedin },
  { label: "GitHub", valor: "/mauvilar", href: PERFIL.github },
  { label: "Consultora", valor: "nyxaistudio.com", href: PERFIL.nyxai },
];

export function Contacto() {
  return (
    <section id="contacto" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_26rem] gap-10 lg:gap-20">
          <div>
            <p className="label">Contacto</p>
            <h2 className="display-sm mt-4 text-[clamp(2rem,4.6vw,3.5rem)] prose-measure">
              Estoy buscando equipo
            </h2>
            <p className="mt-6 prose-measure text-[1.0625rem] leading-relaxed">
              Vacantes de ciencia de datos, analítica o desarrollo de software, en Ciudad de
              México o remotas. Contesto todos los correos que traen una vacante o un proyecto
              concreto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${PERFIL.correo}`} className="btn btn-solid">
                Escríbeme
              </a>
              <a href={PERFIL.cv} className="btn btn-outline">
                Descargar CV
              </a>
            </div>
          </div>

          <dl className="min-w-0 border-t border-rule-strong lg:mt-2">
            {canales.map((c) => (
              <div key={c.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-rule">
                <dt className="label">{c.label}</dt>
                <dd className="min-w-0">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono text-[0.8125rem] text-ink hover:text-accent-ink transition-colors break-all"
                  >
                    {c.valor}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-rule">
              <dt className="label">Ubicación</dt>
              <dd className="font-mono text-[0.8125rem] text-ink-muted">{PERFIL.ciudad}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <dt className="label">Zona horaria</dt>
              <dd className="font-mono text-[0.8125rem] text-ink-muted">UTC-6</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
