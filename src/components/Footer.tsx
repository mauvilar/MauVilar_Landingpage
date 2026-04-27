import Link from "next/link";
import Image from "next/image";

const socials = [
  {
    href: "mailto:unicemau@gmail.com",
    label: "Email",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    href: "https://linkedin.com/in/mauriciovilargiribet",
    label: "LinkedIn",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.91h.06c.61-1.16 2.1-2.39 4.32-2.39 4.62 0 5.47 3.04 5.47 7v9.48h-4.56v-8.4c0-2 0-4.58-2.79-4.58s-3.22 2.18-3.22 4.43v8.55H8V8z" />
    ),
  },
  {
    href: "https://github.com/mauvilar",
    label: "GitHub",
    icon: (
      <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Mauricio Vilar"
              width={80}
              height={80}
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold tracking-tight">
              Mauricio Vilar Giribet
            </span>
          </div>
          <p className="text-sm text-white/55 max-w-sm">
            AI Engineer · Data Analyst · Founder de NyxAI Studio. Diseño
            soluciones end-to-end con LLMs y datos.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            Enlaces
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#proyectos" className="text-white/70 hover:text-emerald-300 transition">
                Proyectos
              </Link>
            </li>
            <li>
              <Link href="/#stack" className="text-white/70 hover:text-emerald-300 transition">
                Tech stack
              </Link>
            </li>
            <li>
              <Link href="/#sobre-mi" className="text-white/70 hover:text-emerald-300 transition">
                Sobre mí
              </Link>
            </li>
            <li>
              <a
                href="https://nyxaistudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-emerald-300 transition"
              >
                NyxAI Studio ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            Contacto
          </h4>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="group h-10 w-10 grid place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 hover:text-emerald-300 hover:border-emerald-300/40 transition"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill={s.label === "Email" ? "none" : "currentColor"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/50">
            Cuernavaca, Morelos · México
          </p>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Mauricio Vilar Giribet. Todos los derechos reservados.</p>
          <p>
            Construido con <span className="text-white/70">Next.js</span> ·{" "}
            <span className="text-white/70">Tailwind</span> ·{" "}
            <span className="text-white/70">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
