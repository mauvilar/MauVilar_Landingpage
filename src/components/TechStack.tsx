"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Accent = "emerald" | "cyan" | "violet" | "pink";

type Group = {
  label: string;
  accent: Accent;
  items: readonly string[];
  extras?: readonly string[];
  extrasMono?: boolean;
};

const groups: Group[] = [
  {
    label: "IA & LLMs",
    accent: "emerald",
    items: [
      "Claude",
      "Anthropic API",
      "OpenAI",
      "Gemini",
      "MCP",
      "LangChain",
      "RAG",
      "AI Agents",
    ],
    extras: [
      "Google AI Studio",
      "Prompt Engineering",
      "Fine-tuning",
      "Vector Databases",
      "LLM Orchestration",
      "Vapi",
      "Eleven Labs",
      "Retell",
    ],
  },
  {
    label: "Data & BI",
    accent: "cyan",
    items: [
      "Python",
      "pandas",
      "numpy",
      "matplotlib.pyplot",
      "seaborn",
      "sklearn",
      "plotly",
      "SQL",
      "PostgreSQL",
      "Power BI",
      "Tableau",
    ],
    extras: [
      "scipy",
      "statsmodels",
      "sklearn.model_selection",
      "sklearn.linear_model",
      "sklearn.ensemble",
      "sklearn.metrics",
      "sklearn.preprocessing",
      "sqlite3",
      "sqlalchemy",
      "missingno",
      "collections",
      "math",
      "datetime",
      "random",
      "os",
      "sys",
      "re",
      "json",
      "requests",
    ],
    extrasMono: true,
  },
  {
    label: "Automatización",
    accent: "violet",
    items: [
      "n8n",
      "Make",
      "GoHighLevel",
      "Google Apps Script",
      "Meta Graph API",
      "Cloudinary",
      "OAuth 2.0",
      "APIs REST",
      "Webhooks",
    ],
  },
  {
    label: "Dev & Cloud",
    accent: "pink",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Supabase",
      "Stripe",
      "pencil.dev",
      "Vercel",
      "Docker",
      "AWS",
    ],
    extras: [
      "Vite",
      "Framer Motion",
      "Radix UI",
      "GitHub Actions",
      "REST APIs",
      "Git",
      "SSH",
      "Linux/Ubuntu",
      "Caddy",
      "Hostinger VPS",
    ],
  },
];

const accentClass: Record<Accent, string> = {
  emerald: "from-emerald-300 to-cyan-300 text-emerald-300",
  cyan: "from-cyan-300 to-sky-400 text-cyan-300",
  violet: "from-violet-300 to-fuchsia-400 text-violet-300",
  pink: "from-pink-300 to-rose-400 text-pink-300",
};

const cardAccentRing: Record<Accent, string> = {
  emerald: "hover:border-emerald-300/40 hover:shadow-emerald-300/10",
  cyan: "hover:border-cyan-300/40 hover:shadow-cyan-300/10",
  violet: "hover:border-violet-300/40 hover:shadow-violet-300/10",
  pink: "hover:border-pink-300/40 hover:shadow-pink-300/10",
};

const buttonAccent: Record<Accent, string> = {
  emerald: "border-emerald-300/30 text-emerald-200 hover:bg-emerald-300/10 hover:border-emerald-300/50",
  cyan: "border-cyan-300/30 text-cyan-200 hover:bg-cyan-300/10 hover:border-cyan-300/50",
  violet: "border-violet-300/30 text-violet-200 hover:bg-violet-300/10 hover:border-violet-300/50",
  pink: "border-pink-300/30 text-pink-200 hover:bg-pink-300/10 hover:border-pink-300/50",
};

export function TechStack() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <section
      id="stack"
      className="relative py-24 lg:py-32 border-t border-white/5"
    >
      <div className="absolute inset-0 dot-bg opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_0%,transparent_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-emerald-300/80 font-medium">
            Tech Stack
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Las herramientas con las que{" "}
            <span className="gradient-text">construyo</span>
          </h2>
          <p className="mt-4 text-lg text-white/60 leading-relaxed">
            Un stack moderno y enfocado: desde la analítica clásica con Python
            hasta arquitecturas multiagénticas con MCP y Claude.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 items-start">
          {groups.map((group, i) => {
            const isOpen = !!expanded[group.label];
            const hasExtras = !!group.extras && group.extras.length > 0;

            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition shadow-[0_0_0_1px_rgba(255,255,255,0)_inset] ${cardAccentRing[group.accent]} hover:bg-white/[0.04]`}
              >
                <div className={`inline-flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.18em] font-semibold ${accentClass[group.accent].split(" ")[2]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accentClass[group.accent].split(" ").slice(0, 2).join(" ")}`} />
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-[12.5px] font-medium bg-white/[0.04] border border-white/[0.06] text-white/80"
                    >
                      {item}
                    </span>
                  ))}

                  <AnimatePresence initial={false}>
                    {hasExtras && isOpen && (
                      <motion.div
                        key="extras"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="basis-full overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {group.extras!.map((item) => (
                            <motion.span
                              key={item}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              className={`px-2.5 py-1 rounded-md text-[12.5px] font-medium bg-white/[0.03] border border-white/[0.06] text-white/70 ${group.extrasMono ? "font-mono" : ""}`}
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {hasExtras && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [group.label]: !prev[group.label],
                      }))
                    }
                    aria-expanded={isOpen}
                    className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white/[0.02] text-[11.5px] font-medium uppercase tracking-[0.12em] transition ${buttonAccent[group.accent]}`}
                  >
                    <span>
                      {isOpen
                        ? "Ver menos"
                        : `Ver todas (+${group.extras!.length})`}
                    </span>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
