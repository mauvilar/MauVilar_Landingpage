"use client";

import { motion } from "framer-motion";

export function NyxAICta() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.a
          href="https://nyxaistudio.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group block relative isolate overflow-hidden rounded-[2rem] border border-emerald-300/25 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/15 via-cyan-400/8 to-violet-500/15" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,#000_0%,transparent_60%)]">
            <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-300/30 blur-[120px]" />
          </div>
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,#000_0%,transparent_60%)]">
            <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-violet-500/30 blur-[120px]" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/10 text-xs font-medium text-emerald-200">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
                NyxAI Studio · Mi consultora de IA
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                ¿Necesitas{" "}
                <span className="gradient-text">automatizar tu negocio</span>{" "}
                con IA?
              </h2>
              <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
                Modernizamos y automatizamos tu negocio con software e
                inteligencia artificial. Llevamos los modelos más recientes a
                operaciones reales: ventas, soporte, finanzas y datos.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="btn-primary group/btn">
                  Conoce NyxAI Studio
                  <svg className="h-4 w-4 transition group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="text-sm text-white/55">
                  nyxaistudio.com
                </span>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { label: "Agentes IA", value: "MCP", color: "emerald" },
                { label: "Workflows", value: "n8n", color: "cyan" },
                { label: "LLMs", value: "Claude", color: "violet" },
                { label: "Analytics", value: "BI", color: "pink" },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`rounded-xl p-4 backdrop-blur-md border ${
                    {
                      emerald: "bg-emerald-300/[0.06] border-emerald-300/20",
                      cyan: "bg-cyan-300/[0.06] border-cyan-300/20",
                      violet: "bg-violet-300/[0.06] border-violet-300/20",
                      pink: "bg-pink-300/[0.06] border-pink-300/20",
                    }[card.color]
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                    {card.label}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
