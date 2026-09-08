# Portfolio · Mauricio Vilar Giribet

Sitio personal y portfolio de Data Science / AI Engineering, construido con
Next.js 16 (App Router) y Tailwind CSS 4. Cada proyecto se genera a partir de
los Jupyter Notebooks alojados en
[`mauvilar/Proyectos-data-science`](https://github.com/mauvilar/Proyectos-data-science).

Va vestido con el sistema **Editorial v3 de NyxAI Studio**.

## Marca

La fuente de verdad de color y tipografía es
`~/Desktop/Nyx/02_Marca/Brand_Kit/` (`tokens.css` · `DESIGN_SYSTEM.md` ·
`TIPOGRAFIA.md` · `AVOID_AI_SLOP.md`). Este repo **copia** el núcleo de tokens
en `src/app/tokens.css` y construye encima su propia capa semántica en
`src/app/globals.css`, que es lo que la marca deja a cada proyecto.

- **Color.** Verde `#00DF81` como único acento, rich-black `#050706` para las
  secciones oscuras, crema `#F3F1EC` como base clara e ink `#131615` para el
  texto sobre claro. Nada de blanco puro, degradados, sombras difusas ni glow.
- **Tipografía.** Tres familias, una por rol: **Archivo** para el póster
  (mayúsculas, `wght 810` / `wdth 125`), **Outfit** para el cuerpo y la UI, e
  **IBM Plex Mono** para etiquetas, cifras, navegación y botones.
- **Logo.** Se monta desde los assets del kit (`public/logo.png`,
  `public/brand/`). Nunca se tipografía ni se recrea a mano.

### Superficies

La página es crema y dos secciones caen a rich-black. El cambio de superficie
es el separador: donde alterna, no va filete.

| Sección | Superficie |
|---|---|
| Hero | crema `#F3F1EC` |
| Herramientas | crema cálida `#FAF9F5` (`.surface-warm`) |
| **Proyectos** | rich-black (`.surface-night`) |
| Trayectoria | crema |
| **NyxAI Studio** | rich-black (`.surface-night`) |
| Contacto | crema |
| Pie | crema cálida |

Las clases `.surface-warm` y `.surface-night` remapean los tokens semánticos
(`--color-ink`, `--color-rule`, `--color-paper-deep`…), así que los
componentes usan siempre los mismos nombres y no saben en qué fondo cayeron.

En las páginas de proyecto la regla es: **la entrada va en la noche y la
salida en claro**. El código se lee en un pozo rich-black con un tema de
Shiki hecho con los tokens de la marca (`src/lib/highlight.ts`); las figuras,
tablas y stdout se montan como láminas sobre crema.

### Contrastes verificados (WCAG AA)

| Sobre crema `#F3F1EC` | | Sobre rich-black `#050706` | |
|---|---|---|---|
| ink `#131615` | 16.1:1 | crema `#F3F1EC` | 17.9:1 |
| ink-muted `#41413E` | 9.1:1 | crema .70 | 8.8:1 |
| ink-faint `#6F6C66` | 4.6:1 | crema .52 | 5.2:1 |
| verde-800 `#0A6E45` | 5.6:1 | verde `#00DF81` | 11.4:1 |

El verde de marca sobre crema da 1.6:1, así que ahí nunca es texto: como
texto y como enlace sobre claro va el verde-800 de la misma escala, y el
`#00DF81` se reserva para rellenos, filetes y marcas.

### Verificar que los tokens no derivaron

```bash
node ~/Desktop/Nyx/02_Marca/Brand_Kit/check-drift.mjs
```

Si un valor de marca cambia, se cambia en el kit y se vuelve a copiar
`src/app/tokens.css` entero. Aquí no se edita.

## Stack

- **Next.js 16** + App Router + TypeScript estricto
- **Tailwind CSS 4** con los tokens de marca en `@theme`
- **Shiki** con tema propio (`nyx-dark`) para Python y SQL
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
│   ├── tokens.css               Copia del núcleo de tokens NyxAI (no editar)
│   ├── globals.css              Capa semántica, superficies y componentes
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
├── brand/                       Lockups NyxAI del kit oficial
├── logo.png                     Isotipo NyxAI (kit oficial)
├── cv.pdf                       CV descargable
└── projects/<slug>/             Portadas e imágenes extraídas de cada notebook

scripts/
└── parse-notebooks.mjs          Parser de notebooks (build-time)
```

Las portadas de `public/projects/<slug>/cover.svg` están dibujadas con la
paleta de marca: campo rich-black, dibujo en crema y una sola forma verde.
Las gráficas dentro de los notebooks son los outputs originales de
matplotlib y conservan sus colores: son el resultado del análisis, no una
pieza de diseño.

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

- [unicemau@gmail.com](mailto:unicemau@gmail.com)
- [linkedin.com/in/mauriciovilargiribet](https://linkedin.com/in/mauriciovilargiribet)
- [github.com/mauvilar](https://github.com/mauvilar)
- [nyxaistudio.com](https://nyxaistudio.com)
