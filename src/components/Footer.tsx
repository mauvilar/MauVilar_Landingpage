import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#stack", label: "Herramientas" },
  { href: "/#sobre-mi", label: "Trayectoria" },
  { href: "/#contacto", label: "Contacto" },
];

const externos = [
  { href: "https://github.com/mauvilar", label: "GitHub" },
  {
    href: "https://linkedin.com/in/mauriciovilargiribet",
    label: "LinkedIn",
  },
  { href: "https://nyxaistudio.com", label: "NyxAI Studio" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule-strong bg-paper-deep">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={80}
              height={80}
              className="h-9 w-9 object-contain"
            />
            <span className="font-semibold tracking-tight">
              Mauricio Vilar Giribet
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[0.9375rem] text-ink-muted">
            AI Engineer y Data Analyst en Ciudad de México. Fundador de NyxAI
            Studio.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="label text-[0.625rem]">Secciones</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink-muted hover:text-ink transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces externos">
          <h2 className="label text-[0.625rem]">En otros lados</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {externos.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-ink transition-colors"
                >
                  {l.label}
                  <span aria-hidden className="text-ink-faint ml-1">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[0.8125rem] text-ink-faint">
          <p>
            © {new Date().getFullYear()} Mauricio Vilar Giribet
          </p>
          <p>
            Este sitio no usa cookies, analítica ni formularios: no recoge
            ningún dato tuyo.
          </p>
        </div>
      </div>
    </footer>
  );
}
