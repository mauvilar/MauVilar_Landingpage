"use client";

import { motion } from "framer-motion";

const experience = [
  {
    role: "Founder & AI Engineer",
    org: "NyxAI Studio",
    period: "Oct 2025 — Actualidad",
    description:
      "Fundé NyxAI Studio para llevar IA generativa, automatización y análisis de datos a PYMEs. Diseño y entrego soluciones end-to-end con LLMs, MCP y arquitecturas multiagénticas.",
    accent: "emerald",
  },
  {
    role: "Trader independiente",
    org: "Autónomo",
    period: "Ene 2020 — Actualidad",
    description:
      "Operación sistemática en mercados financieros. Desarrollo modelos cuantitativos, backtests y dashboards para gestión de portafolio y control de riesgo.",
    accent: "cyan",
  },
  {
    role: "Business Development Associate",
    org: "Cenote Gardens · Tulum",
    period: "Jun 2024 — Jul 2025",
    description:
      "Estrategia comercial y analítica de un destino turístico premium. Traduje datos de ocupación, marketing y experiencia del huésped en decisiones operativas.",
    accent: "violet",
  },
];

const education = [
  {
    title: "Bootcamp de Ciencia de Datos y Análisis de Datos",
    org: "TripleTen",
    year: "2025",
  },
  {
    title: "Licenciatura en Administración de Empresas",
    org: "UDLAP",
    year: "2024",
  },
  {
    title: "Cursos oficiales de Claude",
    org: "Anthropic",
    year: "2025",
  },
];

const accentColor: Record<string, string> = {
  emerald: "from-emerald-300 to-cyan-300 ring-emerald-300/40 bg-emerald-300",
  cyan: "from-cyan-300 to-sky-400 ring-cyan-300/40 bg-cyan-300",
  violet: "from-violet-300 to-fuchsia-400 ring-violet-300/40 bg-violet-300",
};

export function About() {
  return (
    <section
      id="sobre-mi"
      className="relative py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-emerald-300/80 font-medium">
            Sobre mí
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Trayectoria entre{" "}
            <span className="gradient-text">datos, negocio y código</span>
          </h2>
          <p className="mt-4 text-lg text-white/60 leading-relaxed">
            Mexicano-australiano, formado en negocios y reentrenado en datos e
            IA. Hablo español e inglés a nivel nativo (C1) y disfruto traducir
            problemas de negocio en pipelines y modelos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-white/45 mb-8">
              Experiencia
            </h3>
            <div className="relative">
              <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-300/40 via-violet-300/30 to-transparent" />
              <ul className="space-y-10">
                {experience.map((item, i) => (
                  <motion.li
                    key={item.role}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-12"
                  >
                    <span
                      className={`absolute left-0 top-1.5 h-[31px] w-[31px] rounded-full ring-4 ring-[#07070b] grid place-items-center bg-gradient-to-br ${accentColor[item.accent].split(" ").slice(0, 2).join(" ")}`}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#07070b]" />
                    </span>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1.5">
                      {item.period}
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      {item.role}
                    </h4>
                    <p className="text-sm text-emerald-300/90 font-medium mt-0.5">
                      {item.org}
                    </p>
                    <p className="mt-3 text-white/65 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs uppercase tracking-[0.22em] text-white/45 mb-6">
                Educación
              </h3>
              <ul className="space-y-3">
                {education.map((ed, i) => (
                  <motion.li
                    key={ed.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.06 * i }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-emerald-300/25 transition"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium text-white leading-snug">
                        {ed.title}
                      </p>
                      <span className="text-xs font-mono text-white/40 shrink-0">
                        {ed.year}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-300/90">{ed.org}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-300/[0.04] to-violet-400/[0.04] p-6"
            >
              <h3 className="text-xs uppercase tracking-[0.22em] text-white/45 mb-4">
                Idiomas
              </h3>
              <div className="space-y-3">
                <LangRow lang="Español" level="Nativo" pct={100} />
                <LangRow lang="Inglés" level="C1 · bilingüe" pct={95} />
              </div>
              <p className="mt-4 text-xs text-white/45">
                Doble nacionalidad mexicana · australiana 🇲🇽 🇦🇺
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LangRow({ lang, level, pct }: { lang: string; level: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-white">{lang}</span>
        <span className="text-white/55">{level}</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
        />
      </div>
    </div>
  );
}
