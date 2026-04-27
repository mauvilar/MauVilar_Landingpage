"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const contactLinks = [
  {
    href: "mailto:unicemau@gmail.com",
    label: "unicemau@gmail.com",
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
    fill: true,
  },
  {
    href: "https://github.com/mauvilar",
    label: "GitHub",
    icon: (
      <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
    ),
    fill: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_0%,transparent_85%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center w-full">
        <div className="space-y-8">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] text-xs font-medium text-emerald-200/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Disponible para nuevos proyectos · Cuernavaca, MX
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]"
          >
            <span className="block text-white/95">Mauricio</span>
            <span className="block gradient-text">Vilar Giribet</span>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base"
          >
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/85">
              AI Engineer
            </span>
            <span className="text-white/30">·</span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/85">
              Data Analyst
            </span>
            <span className="text-white/30">·</span>
            <span className="px-3 py-1.5 rounded-full border border-violet-300/20 bg-violet-400/[0.06] text-violet-200/95">
              Automation &amp; LLMs
            </span>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="text-lg text-white/65 max-w-2xl leading-relaxed"
          >
            Diseño soluciones end-to-end con{" "}
            <span className="text-white/90 font-medium">LLMs, MCP y arquitecturas multiagénticas</span>{" "}
            para PYMEs. Especializado en IA generativa, automatización empresarial
            y análisis de datos accionable.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Link href="#proyectos" className="btn-primary group">
              Ver proyectos
              <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost group">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5m0 0l5-5m-5 5V4" />
              </svg>
              Descargar CV
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2 pt-4"
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-white/65 hover:text-white hover:border-emerald-300/30 hover:bg-emerald-300/[0.04] transition"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill={link.fill ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {link.icon}
                </svg>
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center text-white/40 text-xs tracking-[0.3em] uppercase animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-square">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-300/20 via-cyan-400/10 to-violet-500/20 blur-2xl" />
      <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-[#0c0c16]/60 backdrop-blur-2xl overflow-hidden gradient-border">
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="absolute top-6 left-6 right-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
          <span className="ml-2 font-mono text-[10px] text-white/40 tracking-wider">
            mau.ipynb · in [42]
          </span>
        </div>

        <div className="absolute top-16 left-6 right-6 bottom-6 font-mono text-[12.5px] leading-7 text-white/80 space-y-1.5">
          <div>
            <span className="text-violet-300">from</span>{" "}
            <span className="text-emerald-300">anthropic</span>{" "}
            <span className="text-violet-300">import</span>{" "}
            <span className="text-cyan-300">Claude</span>
          </div>
          <div>
            <span className="text-violet-300">import</span>{" "}
            <span className="text-emerald-300">pandas</span>{" "}
            <span className="text-violet-300">as</span>{" "}
            <span className="text-cyan-300">pd</span>
          </div>
          <div className="text-white/30">
            # Pipeline IA + datos para PYMEs
          </div>
          <div className="pt-2">
            <span className="text-cyan-300">df</span>{" "}
            <span className="text-white/50">=</span>{" "}
            <span className="text-cyan-300">pd</span>.
            <span className="text-emerald-300">read_csv</span>(
            <span className="text-amber-200">&quot;customers.csv&quot;</span>)
          </div>
          <div>
            <span className="text-cyan-300">insights</span>{" "}
            <span className="text-white/50">=</span>{" "}
            <span className="text-cyan-300">claude</span>.
            <span className="text-emerald-300">analyze</span>(
            <span className="text-cyan-300">df</span>)
          </div>
          <div className="text-white/30 pt-2"># → segmentos accionables</div>
          <div className="text-white/30"># → insights ejecutivos</div>
          <div className="text-white/30"># → próximos experimentos</div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/5 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-emerald-300/70">
                Churn
              </div>
              <div className="text-emerald-300 font-bold text-sm">−18%</div>
            </div>
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/5 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-cyan-300/70">
                LTV
              </div>
              <div className="text-cyan-300 font-bold text-sm">+34%</div>
            </div>
            <div className="rounded-lg border border-violet-300/20 bg-violet-300/5 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-violet-300/70">
                Auto
              </div>
              <div className="text-violet-300 font-bold text-sm">×6.2</div>
            </div>
          </div>

          <div className="mt-4 flex items-end gap-1 h-16">
            {[40, 65, 50, 80, 95, 70, 88, 110, 75, 120, 100, 130].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h * 0.55}px` }}
                className={`flex-1 rounded-t ${
                  i === 9 || i === 11 ? "bg-emerald-300/70" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 right-4 font-mono text-[10px] text-white/30">
          out [42]
        </div>
      </div>
    </div>
  );
}
