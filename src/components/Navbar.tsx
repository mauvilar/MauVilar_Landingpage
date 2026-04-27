"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#stack", label: "Stack" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "https://nyxaistudio.com", label: "NyxAI Studio", external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#07070b]/70 border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="relative flex h-10 w-10 items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Mauricio Vilar"
              width={40}
              height={40}
              priority
              unoptimized
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-semibold">Mauricio Vilar</span>
            <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-0.5">
              Data · AI
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="relative px-3.5 py-2 text-sm text-white/70 hover:text-white transition rounded-full hover:bg-white/5"
            >
              {l.label}
              {l.external && (
                <span className="ml-1 text-[10px] text-emerald-300/70">↗</span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:unicemau@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#0a0a14] hover:shadow-lg hover:shadow-emerald-400/30 transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contacto
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#07070b]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="px-3 py-2.5 text-sm text-white/80 rounded-lg hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:unicemau@gmail.com"
                onClick={() => setOpen(false)}
                className="mt-1 px-3 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#0a0a14]"
              >
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
