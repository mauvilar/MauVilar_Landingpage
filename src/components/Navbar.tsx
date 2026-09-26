"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PERFIL } from "@/lib/sitio";

/* Las secciones de la portada en el orden de la página. Las que no llevan
   enlace sólo sirven para que el subrayado se apague al pasar por ellas. */
const SECCIONES = [
  { id: "proyectos", label: "Proyectos", enlace: true },
  { id: "bootcamp", label: "Bootcamp", enlace: false },
  { id: "herramientas", label: "Herramientas", enlace: true },
  { id: "trayectoria", label: "Trayectoria", enlace: true },
  { id: "contacto", label: "Contacto", enlace: true },
];
const ENLACES = SECCIONES.filter((s) => s.enlace);

export function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);

  /* La sección activa es la última cuyo inicio ya pasó la línea de lectura.
     Arriba del todo no hay ninguna: al volver al hero no queda nada marcado. */
  useEffect(() => {
    let pendiente = 0;
    const medir = () => {
      pendiente = 0;
      const linea = window.scrollY + window.innerHeight * 0.3;
      let actual: string | null = null;
      for (const s of SECCIONES) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= linea) actual = s.id;
      }
      setActiva(actual);
    };
    const programar = () => {
      if (!pendiente) pendiente = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", programar, { passive: true });
    window.addEventListener("resize", programar);
    return () => {
      window.removeEventListener("scroll", programar);
      window.removeEventListener("resize", programar);
      if (pendiente) cancelAnimationFrame(pendiente);
    };
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierto]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-rule">
      <nav
        aria-label="Principal"
        className="mx-auto max-w-[88rem] px-6 lg:px-10 h-16 flex items-center justify-between gap-6"
      >
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* El isotipo va montado desde el kit de marca, nunca recreado. */}
          <img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.9375rem] font-semibold tracking-tight">{PERFIL.nombreCorto}</span>
            <span className="label mt-1.5 hidden sm:block">Datos y software</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center h-full">
          {ENLACES.map((s) => {
            const esActiva = activa === s.id;
            return (
              <Link
                key={s.id}
                href={`/#${s.id}`}
                aria-current={esActiva ? "true" : undefined}
                className={`relative h-full flex items-center px-4 font-mono text-[0.75rem] uppercase tracking-[0.16em] transition-colors ${
                  esActiva ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {s.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-4 bottom-0 h-[2px] bg-accent transition-opacity ${
                    esActiva ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a href={PERFIL.cv} className="hidden lg:inline-flex btn btn-solid py-3 px-6 text-[0.6875rem]">
            Descargar CV
          </a>
          <button
            type="button"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {abierto ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="menu-movil" hidden={!abierto} className="lg:hidden border-t border-rule bg-paper">
        <div className="px-6 py-2 flex flex-col">
          {ENLACES.map((s) => (
            <Link
              key={s.id}
              href={`/#${s.id}`}
              onClick={() => setAbierto(false)}
              className="py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink border-b border-rule"
            >
              {s.label}
            </Link>
          ))}
          <a href={PERFIL.cv} onClick={() => setAbierto(false)} className="btn btn-solid my-4 justify-center">
            Descargar CV
          </a>
        </div>
      </div>
    </header>
  );
}
