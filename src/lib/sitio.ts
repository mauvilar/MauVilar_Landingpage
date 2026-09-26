/* Datos de la persona y del sitio. Los de trayectoria salen del CV de
   septiembre de 2026 (public/cv.pdf y public/cv-en.pdf): nada de aquí se
   inventa ni se actualiza sin actualizar antes el CV. */

export const SITE_URL = "https://mauvilarlandingpage.vercel.app";

export const PERFIL = {
  nombre: "Mauricio Vilar Giribet",
  nombreCorto: "Mauricio Vilar",
  puesto: "Desarrollador de Ciencia de Datos y Software",
  puestoEn: "Data Science and Software Developer",
  ciudad: "Ciudad de México",
  correo: "unicemau@gmail.com",
  linkedin: "https://linkedin.com/in/mauriciovilargiribet",
  github: "https://github.com/mauvilar",
  nyxai: "https://nyxaistudio.com",
  cv: "/cv.pdf",
  cvEn: "/cv-en.pdf",
};

export interface Puesto {
  cargo: string;
  lugar: string;
  desde: string;
  hasta: string;
  descripcion: string;
}

export const EXPERIENCIA: Puesto[] = [
  {
    cargo: "Ingeniero de Software",
    lugar: "Dot Com Media (DCM Moguls), remoto desde California",
    desde: "Jul 2026",
    hasta: "A la fecha",
    descripcion:
      "Limpio y reestructuro los workflows de GoHighLevel y de las herramientas internas, y construyo y opero flujos de datos y automatizaciones en producción que integran el CRM, bases de datos y APIs REST. Desarrollo funcionalidades nuevas para los productos internos y el front end completo de varios de ellos. Trabajo en inglés con un equipo distribuido.",
  },
  {
    cargo: "Fundador, Datos y Software",
    lugar: "NyxAI Studio, Ciudad de México",
    desde: "Oct 2025",
    hasta: "A la fecha",
    descripcion:
      "Consultoría de datos y software para empresas en México, con el ciclo completo a mi cargo: levantamiento de necesidades, alcance, especificación, construcción, despliegue y soporte. Aplicaciones web en React, TypeScript y Next.js sobre servicios en Python y FastAPI; la capa de datos que las alimenta, los tableros de indicadores y la infraestructura donde corren (Docker, funciones serverless y n8n en Azure y AWS).",
  },
  {
    cargo: "Asociado de Desarrollo de Negocio",
    lugar: "Cenote Gardens, Tulum",
    desde: "Jun 2024",
    hasta: "Jul 2025",
    descripcion:
      "Tableros comerciales a partir del CRM HubSpot para seguir la generación de prospectos, la conversión y el cierre, con la integridad del embudo a mi cargo. Modelos financieros (TIR, VPN y flujo proyectado) para decisiones de precio con inversionistas de México, Estados Unidos y Europa, mientras dirigía al equipo comercial.",
  },
  {
    cargo: "Trader independiente",
    lugar: "Por cuenta propia, Ciudad de México",
    desde: "Ene 2020",
    hasta: "A la fecha",
    descripcion:
      "Scripts de análisis cuantitativo y backtesting en Python sobre series de tiempo y datos de mercado en vivo, bajo un marco formal de riesgo: tamaño de posición, niveles de salida y razón beneficio riesgo.",
  },
  {
    cargo: "Prácticas profesionales",
    lugar: "Add Valant y Hotel Four Points by Sheraton, Puebla",
    desde: "Ene 2023",
    hasta: "Dic 2023",
    descripcion:
      "Actualización y validación de bases de datos de clientes, corrigiendo inconsistencias antes de su uso operativo, y facturación y cobranza conforme a procedimientos internos y fechas comprometidas.",
  },
];

export const FORMACION = [
  { titulo: "Bootcamp de Ciencia de Datos y Análisis de Datos", lugar: "TripleTen", anio: "2025" },
  {
    titulo: "Licenciatura en Administración de Empresas",
    lugar: "Universidad de las Américas Puebla (UDLAP)",
    anio: "2024",
  },
];

export const CERTIFICACIONES = [
  { anio: "2026", titulo: "Introduction to FastAPI e Introduction to APIs in Python", lugar: "DataCamp" },
  { anio: "2026", titulo: "Introducción a Databricks", lugar: "DataCamp" },
  {
    anio: "2026",
    titulo: "Retrieval Augmented Generation (RAG) con LangChain y Developing LLM Applications with LangChain",
    lugar: "DataCamp",
  },
  { anio: "2026", titulo: "Working with the OpenAI API y Developing AI Systems with the OpenAI API", lugar: "DataCamp" },
  { anio: "2026", titulo: "DevOps Concepts y Software Development con Claude Code", lugar: "DataCamp" },
  { anio: "2026", titulo: "Azure AI: Document Intelligence, Azure OpenAI y Azure AI Foundry", lugar: "Microsoft Learn" },
  { anio: "2025", titulo: "Excel y macros, Power Pivot y DAX, y Power BI", lugar: "A2" },
  {
    anio: "2025",
    titulo: "Cursos oficiales de Claude: Claude Code, Prompt Engineering, Building with Claude, MCP y Tool Use",
    lugar: "Anthropic",
  },
  {
    anio: "2025",
    titulo: "Logros del bootcamp: Dashboards Whiz (Tableau y Dash) y Gurú del análisis empresarial",
    lugar: "TripleTen",
  },
  {
    anio: "2022",
    titulo: "Power BI: preparación y transformación de datos y caso de cancelación de clientes",
    lugar: "DataCamp",
  },
];

/** Competencias técnicas del CV, agrupadas como ahí. */
export const COMPETENCIAS = [
  {
    titulo: "Desarrollo de software",
    items: [
      "Python", "FastAPI", "TypeScript y JavaScript", "React", "Next.js", "APIs REST",
      "HTML5 y CSS3", "Git y GitHub", "pytest", "Claude Code",
    ],
  },
  {
    titulo: "SQL, bases de datos e ingeniería de datos",
    items: [
      "SQL (joins, CTE, subconsultas y funciones de ventana)", "PostgreSQL", "MySQL", "MongoDB",
      "Supabase", "Redis", "ETL", "APIs REST y webhooks", "Databricks", "Parquet y pyarrow",
    ],
  },
  {
    titulo: "Análisis, estadística y modelado",
    items: [
      "Análisis exploratorio", "Estadística descriptiva e inferencial",
      "Pruebas de hipótesis (Mann-Whitney, Welch)", "Pruebas A/B", "Embudos, cohortes y retención",
      "LTV y ARPU", "Regresión logística", "Random forest", "K-means",
    ],
  },
  {
    titulo: "Calidad de datos y trazabilidad",
    items: [
      "Verificaciones contra especificación", "Duplicados, faltantes e inconsistencias",
      "Conciliación entre fuentes", "Trazabilidad de cifras", "Pruebas automatizadas de calidad",
    ],
  },
  {
    titulo: "Visualización y reportería",
    items: [
      "Plotly Dash", "Tableau", "Power BI con DAX", "Excel avanzado y Power Query",
      "Definición y seguimiento de KPIs", "Reportes ejecutivos",
    ],
  },
  {
    titulo: "Nube, contenedores e integración de IA",
    items: [
      "Docker", "Funciones serverless", "Microsoft Azure (Functions, AI Foundry, Azure OpenAI, Key Vault, Entra ID)",
      "AWS EC2", "Render y Vercel", "n8n autoalojado", "APIs de Anthropic, OpenAI y Azure OpenAI",
      "LangChain", "RAG", "Servidores MCP",
    ],
  },
];
