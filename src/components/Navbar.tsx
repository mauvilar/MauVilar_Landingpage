"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "/#proyectos", label: "Proyectos", section: "proyectos" },
  { href: "/#stack", label: "Herramientas", section: "stack" },
  { href: "/#sobre-mi", label: "Trayectoria", section: "sobre-mi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.section))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-rule">
      <nav
        aria-label="Principal"
        className="mx-auto max-w-[88rem] px-6 lg:px-10 h-16 flex items-center justify-between gap-6"
      >
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* El isotipo va montado desde el kit de marca, nunca recreado. */}
          <Image
            src="/logo.png"
            alt=""
            width={512}
            height={512}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[0.9375rem] font-semibold tracking-tight">
              Mauricio Vilar
            </span>
            <span className="label mt-1.5 text-[0.5625rem] hidden sm:block">
              Datos · IA
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center h-full">
          {links.map((l) => {
            const isActive = active === l.section;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-full flex items-center px-4 font-mono text-[0.75rem] uppercase tracking-[0.16em] transition-colors ${
                  isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-4 bottom-0 h-[2px] bg-accent transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
          <span aria-hidden className="mx-3 h-4 w-px bg-rule-strong" />
          <a
            href="https://nyxaistudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink-faint hover:text-accent-ink transition-colors px-2"
          >
            NyxAI Studio
            <span aria-hidden className="ml-1.5">
              ↗
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:unicemau@gmail.com"
            className="hidden md:inline-flex btn btn-solid py-3 px-6 text-[0.6875rem]"
          >
            Escríbeme
          </a>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-ink"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        hidden={!open}
        className="md:hidden border-t border-rule bg-paper"
      >
        <div className="px-6 py-2 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink border-b border-rule last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://nyxaistudio.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-accent-ink border-t border-rule"
          >
            NyxAI Studio ↗
          </a>
          <a
            href="mailto:unicemau@gmail.com"
            onClick={() => setOpen(false)}
            className="btn btn-solid my-4 justify-center"
          >
            Escríbeme
          </a>
        </div>
      </div>
    </header>
  );
}
