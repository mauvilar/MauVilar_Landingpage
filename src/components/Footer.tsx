import Link from "next/link";
import { REPO } from "@/lib/catalogo";
import { PERFIL } from "@/lib/sitio";

const secciones = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#bootcamp", label: "Bootcamp" },
  { href: "/#herramientas", label: "Herramientas" },
  { href: "/#trayectoria", label: "Trayectoria" },
  { href: "/#contacto", label: "Contacto" },
];

const externos = [
  { href: PERFIL.github, label: "GitHub" },
  { href: PERFIL.linkedin, label: "LinkedIn" },
  { href: REPO, label: "Repositorio de los notebooks" },
  { href: PERFIL.nyxai, label: "NyxAI Studio" },
];

export function Footer() {
  return (
    <footer className="surface-warm mt-auto border-t border-rule">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
            <span className="title-row text-[1.0625rem]">{PERFIL.nombre}</span>
          </div>
          <p className="mt-4 max-w-sm text-[0.9375rem] text-ink-muted">
            {PERFIL.puesto} en {PERFIL.ciudad}. Fundador de NyxAI Studio.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="label">Secciones</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {secciones.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-muted hover:text-accent-ink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces externos">
          <h2 className="label">En otros lados</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {externos.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-accent-ink transition-colors"
                >
                  {l.label}
                  <span aria-hidden className="ml-1">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[0.8125rem] text-ink-muted">
          <p>© {new Date().getFullYear()} {PERFIL.nombre}</p>
          <p>
            Sin cookies, formularios ni rastreo propio. Vercel, que hospeda el sitio, guarda
            bitácoras de acceso.
          </p>
        </div>
      </div>
    </footer>
  );
}
