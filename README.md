# Portfolio · Mauricio Vilar Giribet

Sitio personal y portfolio de Data Science / AI Engineering, construido con
Next.js 16 (App Router) y Tailwind CSS 4. Cada proyecto se genera a partir de
los Jupyter Notebooks alojados en
[`mauvilar/Proyectos-data-science`](https://github.com/mauvilar/Proyectos-data-science).

## Stack

- **Next.js 16** + App Router + TypeScript estricto
- **Tailwind CSS 4** con tokens de tema en CSS
- **Framer Motion** para animaciones de entrada y stagger en grids
- **Shiki** (`one-dark-pro`) para syntax highlighting de Python/SQL
- **marked** + `isomorphic-dompurify` para markdown saneado
- **sharp** para optimización de imágenes
- Generación 100% estática (SSG) con `generateStaticParams`

## Cómo correr localmente

```bash
# 1. Clonar el repo de notebooks junto a esta carpeta:
#    /your-folder/
#      ├── notebooks-source/   ← clona aquí los .ipynb
#      └── portfolio-ds/       ← este proyecto
git clone https://github.com/mauvilar/Proyectos-data-science.git ../notebooks-source

# 2. Instalar dependencias
npm install

# 3. Ejecutar el parser (extrae markdown, código e imágenes)
npm run parse

# 4. Modo desarrollo
npm run dev
```

## Build

```bash
npm run build
```

El comando `build` ejecuta primero `scripts/parse-notebooks.mjs`, que:

1. Recorre `../notebooks-source/**/*.ipynb`
2. Extrae celdas markdown, código y outputs `image/png`
3. Genera `src/data/projects.json` con la metadata de cada proyecto
4. Guarda las imágenes decodificadas en `public/projects/<slug>/`

Si la carpeta `notebooks-source` no existe, el script reutiliza el
`projects.json` ya generado — útil para builds en Vercel donde sólo
se sirve el contenido pre-procesado.

## Estructura

```
src/
├── app/
│   ├── layout.tsx               Layout global con Navbar + Footer
│   ├── page.tsx                 Home (Hero, Stack, Proyectos, About, CTA, Contacto)
│   ├── projects/[slug]/page.tsx Página dinámica por proyecto (SSG)
│   ├── sitemap.ts               Sitemap automático
│   ├── robots.ts                robots.txt
│   └── not-found.tsx            404 personalizada
├── components/                  Hero, Tech Stack, Projects, About, etc.
├── data/projects.json           Metadata generada (no editar a mano)
└── lib/                         Helpers (markdown, sanitize, highlight, projects)

public/
├── cv.pdf                       CV descargable
└── projects/<slug>/             Imágenes extraídas de cada notebook

scripts/
└── parse-notebooks.mjs          Parser de notebooks (build-time)
```

## Añadir un nuevo proyecto

1. Sube tu notebook al repo `Proyectos-data-science` en GitHub.
2. Localmente, hacé `git pull` en la carpeta hermana `notebooks-source`.
3. `npm run parse` regenera el manifiesto e imágenes.
4. `npm run build && npx vercel --prod` redespliega.

## Deploy

```bash
npx vercel --prod
```

El proyecto está pensado para hospedarse en Vercel con dominio personalizado
`portfolio.nyxaistudio.com`.

## Autor

Mauricio Vilar Giribet — AI Engineer · Data Analyst · Founder de NyxAI Studio.

- 📧 [unicemau@gmail.com](mailto:unicemau@gmail.com)
- 💼 [linkedin.com/in/mauriciovilargiribet](https://linkedin.com/in/mauriciovilargiribet)
- 🐙 [github.com/mauvilar](https://github.com/mauvilar)
- 🌐 [nyxaistudio.com](https://nyxaistudio.com)
