"use client";

import { motion } from "framer-motion";

const channels = [
  {
    label: "Email",
    value: "unicemau@gmail.com",
    href: "mailto:unicemau@gmail.com",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    color: "emerald",
  },
  {
    label: "LinkedIn",
    value: "/in/mauriciovilargiribet",
    href: "https://linkedin.com/in/mauriciovilargiribet",
    icon: <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.91h.06c.61-1.16 2.1-2.39 4.32-2.39 4.62 0 5.47 3.04 5.47 7v9.48h-4.56v-8.4c0-2 0-4.58-2.79-4.58s-3.22 2.18-3.22 4.43v8.55H8V8z" />,
    fill: true,
    color: "cyan",
  },
  {
    label: "GitHub",
    value: "/mauvilar",
    href: "https://github.com/mauvilar",
    icon: <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.2 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />,
    fill: true,
    color: "violet",
  },
];

const colorMap: Record<string, string> = {
  emerald: "from-emerald-300/15 to-emerald-300/5 group-hover:border-emerald-300/40 group-hover:text-emerald-300",
  cyan: "from-cyan-300/15 to-cyan-300/5 group-hover:border-cyan-300/40 group-hover:text-cyan-300",
  violet: "from-violet-300/15 to-violet-300/5 group-hover:border-violet-300/40 group-hover:text-violet-300",
};

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-emerald-300/80 font-medium"
        >
          Contacto
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          ¿Hablamos sobre{" "}
          <span className="gradient-text-warm">datos, IA o tu próximo proyecto</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-lg text-white/65 max-w-2xl mx-auto leading-relaxed"
        >
          Escríbeme y platiquemos. Respondo en menos de 24 horas a propuestas
          claras y proyectos con sentido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${colorMap[c.color]} p-6 transition`}
            >
              <div className="flex items-center gap-3 text-white/70 transition">
                <span className="grid place-items-center h-10 w-10 rounded-xl border border-white/10 bg-black/30">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill={c.fill ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {c.icon}
                  </svg>
                </span>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {c.label}
                  </div>
                  <div className="text-sm font-medium mt-0.5">{c.value}</div>
                </div>
                <svg className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-sm text-white/55"
        >
          <svg className="h-4 w-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          Ciudad de México · México
        </motion.div>
      </div>
    </section>
  );
}
