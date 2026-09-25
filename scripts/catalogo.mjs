/**
 * Catálogo del portafolio: qué se publica, en qué orden y con qué nombre.
 *
 * Es la única fuente de los slugs. Se escriben a mano y no se derivan del
 * título, para que una URL no cambie cuando cambia un texto. Si un slug
 * cambia, el viejo va a `next.config.ts` como redirección permanente.
 *
 * Tres niveles, en el orden en que aparecen en la portada:
 *   propio    · proyectos propios, con portada de gráfica
 *   final     · el proyecto final del bootcamp
 *   formacion · los sprints de TripleTen, del más avanzado al primero
 *
 * Cada notebook lleva:
 *   ruta         relativa a NOTEBOOKS_DIR
 *   slug         la URL: /projects/<slug>
 *   titulo       corto, cabe en tres renglones en un teléfono
 *   descripcion  una o dos frases, máximo 160 caracteres (meta y tarjetas)
 *   resumen      el párrafo de entrada en la página del notebook
 *   area         solo en formación: la habilidad que el sprint demuestra
 *
 * Las cifras de los resúmenes se copiaron de las salidas de cada notebook.
 * Si un notebook se vuelve a ejecutar con datos nuevos, hay que revisarlas.
 */

export const REPO = "https://github.com/mauvilar/Proyectos-data-science";

/** Notebooks que existen en el repo y no se publican. */
export const EXCLUIDOS = [
  "Telecomunicaciones-Operadores-Ineficaces/Descomposicion.ipynb",
];

export const SERIES = [
  {
    id: "nearshoring-en-cifras",
    nivel: "propio",
    titulo: "Nearshoring en cifras",
    descripcion:
      "Veinte años de inversión extranjera directa en México por estado, país de origen y tipo de inversión. Los datos salen de la API de datos.gob.mx y cuadran con los boletines de la Secretaría de Economía.",
    carpeta: "ied-nearshoring-mx",
    portada: { ruta: "ied-nearshoring-mx/02_nearshoring_en_cifras.ipynb", figura: 1 },
    notebooks: [
      {
        ruta: "ied-nearshoring-mx/01_api_y_calidad.ipynb",
        slug: "nearshoring-api-y-calidad",
        titulo: "La API de datos.gob.mx y una tabla limpia",
        descripcion:
          "Ocho tablas de inversión extranjera bajadas de la API de datos.gob.mx, seis mañas del formato documentadas y tres validaciones contra los totales oficiales.",
        resumen:
          "La inversión extranjera directa de México vive en datos.gob.mx, pero el CSV directo responde 403 y los Excel de la Secretaría de Economía piden una verificación de navegador. La API del datastore es la única puerta abierta y exige un User-Agent de navegador. Este notebook baja ocho tablas paginadas (2006 a 2025 en cifras actualizadas, hasta el primer trimestre de 2026 en originales), documenta seis mañas del formato con su evidencia (montos acumulados dentro del año, nulos que significan confidencial, un total que cambia de nombre, eñes rotas, tres niveles del SCIAN en una columna, originales contra actualizadas) y cierra con tres validaciones como aserciones: los estados suman el total nacional con diferencia cero y las cifras originales cuadran al millón con los boletines oficiales.",
      },
      {
        ruta: "ied-nearshoring-mx/02_nearshoring_en_cifras.ipynb",
        slug: "nearshoring-a-donde-llega-la-inversion",
        titulo: "A dónde llega la inversión extranjera",
        descripcion:
          "Cuánto del récord de inversión extranjera es dinero nuevo, a qué estados llega y de qué países viene, con veinte años de cifras de la Secretaría de Economía.",
        resumen:
          "Cuatro hallazgos sobre veinte años de IED: el récord de 2025 está hecho de reinversión de utilidades (68 %, contra 37 % de promedio entre 2006 y 2018) y las nuevas inversiones de 2024 son las más bajas de la serie; la Ciudad de México pasó de 20 % a 53 % de la inversión; los estados que suman el 80 % bajaron de 13 a 6; Estados Unidos aporta 39 % y China nunca ha pasado de 2.4 %. Empieza con una consulta en vivo a la API y la gráfica principal en cinco celdas, y cierra con la advertencia más importante para leer estas cifras: la Secretaría asigna cada flujo al estado del domicilio fiscal de la empresa, aunque la planta esté en otro.",
      },
    ],
  },
  {
    id: "salarios-del-imss",
    nivel: "propio",
    titulo: "Salarios del IMSS",
    descripcion:
      "El salario base de cotización de los puestos formales afiliados al IMSS en cinco cortes de agosto, de 2018 a 2026: promedio, mediana, estados, sectores y brecha entre mujeres y hombres.",
    carpeta: "salarios-imss-mx",
    portada: { ruta: "salarios-imss-mx/02_cuanto_se_gana.ipynb", figura: 1 },
    notebooks: [
      {
        ruta: "salarios-imss-mx/01_imss_datos_abiertos.ipynb",
        slug: "salarios-imss-datos-abiertos",
        titulo: "Los datos abiertos del IMSS, 2018 a 2026",
        descripcion:
          "Cinco archivos de 300 a 400 MB leídos con Polars, cinco mañas del formato documentadas y el corte de agosto de 2026 validado contra el boletín del IMSS.",
        resumen:
          "El IMSS publica cada mes el salario base de cotización de cada puesto de trabajo afiliado, agregado por estado, municipio, sector, sexo, edad, rango salarial y tamaño del patrón, en archivos de 300 a 400 MB. Este notebook descarga cinco cortes de agosto (2018 a 2026) con caché, los lee con Polars sin cargarlos completos, documenta cinco mañas del formato (dos poblaciones en una tabla, un promedio que se calcula sobre los puestos con salario, el tope de 25 UMA, catálogos propios, y sexo y edad codificados) y valida el corte de 2026 contra el boletín oficial: 22,798,473 puestos y 673.1 pesos diarios, exactos. Cuantifica el tope legal de 25 UMA (2.3 % de los puestos lo cotizan y cargan 10 % de la masa salarial; el tope bajó de 22.8 a 9.3 salarios mínimos entre 2018 y 2026) y deja diez agregados compactos para el análisis.",
      },
      {
        ruta: "salarios-imss-mx/02_cuanto_se_gana.ipynb",
        slug: "salarios-imss-cuanto-se-gana",
        titulo: "¿Cuánto se gana en México?",
        descripcion:
          "Promedio, mediana y cuartiles del salario formal de 2018 a 2026 por estado, sector, sexo y tamaño de empresa, con el tope de 25 UMA a la vista.",
        resumen:
          "El promedio de cotización llegó a 673 pesos diarios en agosto de 2026, pero es una cota inferior: el salario está topado a 25 UMA, así que cada promedio va acompañado de la mediana y los cuartiles calculados desde los rangos salariales. La mediana es de 542 pesos, unos 16,500 al mes. El salario mínimo subió 257 % desde 2018 contra 145 % de la mediana, que pasó de 2.5 a 1.7 veces el mínimo, y los puestos que cotizan a dos mínimos o menos pasaron de 40 % a 69 %. Por promedio, la Ciudad de México parece pagar 1.5 veces lo que Nayarit; por mediana, los estados quedan a 15 % entre sí, porque la capital concentra a los topados. Las mujeres cotizan 89 pesos por cada 100 de los hombres en promedio y 96 en la mediana, y los 199 mil trabajadores de plataformas digitales cotizan 63 % de lo que cotiza el resto.",
      },
    ],
  },
  {
    id: "mercado-de-ia",
    nivel: "propio",
    titulo: "Mercado de trabajo de IA: México vs. EE. UU.",
    descripcion:
      "Cuánto paga el trabajo de inteligencia artificial en México frente a Estados Unidos, y por qué es tan difícil saberlo: auditoría de fuentes, un corpus propio desde la API de Adzuna y medianas con intervalos de confianza.",
    carpeta: "mercado-ia-mx-us",
    portada: { ruta: "mercado-ia-mx-us/02_brecha_salarial.ipynb", figura: 1 },
    notebooks: [
      {
        ruta: "mercado-ia-mx-us/01_recoleccion_y_calidad.ipynb",
        slug: "mercado-de-ia-auditoria-de-fuentes-y-calidad",
        titulo: "Auditoría de fuentes y calidad de datos",
        descripcion:
          "Por qué se descartaron los datasets de Kaggle, cómo se armó un corpus propio con la API de Adzuna y cómo se detectan los salarios que el proveedor modela.",
        resumen:
          "Antes de analizar nada, se audita cada fuente candidata: el mejor dataset real de Kaggle tiene 12 filas mexicanas y ninguna con salario, y el más popular de la categoría resulta ser sintético (12 países, unas 4,300 filas cada uno, 100 % de sueldos publicados frente al 19 % de un agregador real). Con ambas descartadas, se construye un corpus propio desde la API de Adzuna (6,990 vacantes, 1,666 con salario) y se confirma en vivo que Adzuna modela sueldos que no tiene: Nueva York devolvió 151 vacantes y solo 1 con salario real.",
      },
      {
        ruta: "mercado-ia-mx-us/02_brecha_salarial.ipynb",
        slug: "mercado-de-ia-brecha-salarial",
        titulo: "Brecha salarial México vs. Estados Unidos",
        descripcion:
          "Medianas con intervalos de confianza bootstrap en cinco áreas metropolitanas de Estados Unidos, y por qué 4 salarios mexicanos no alcanzan para ninguna prueba.",
        resumen:
          "Medianas salariales con intervalos de confianza bootstrap en cinco áreas metropolitanas de Estados Unidos: San Francisco Bay Area $225,000 (n=319), Seattle $202,500, Nueva York $200,000 (n=116), Austin $197,575 y Boston $182,500. México solo tiene 4 vacantes de IA con salario publicado, así que el notebook no corre las pruebas de hipótesis y deja documentada la razón.",
      },
      {
        ruta: "mercado-ia-mx-us/03_skills_y_transparencia.ipynb",
        slug: "mercado-de-ia-primas-por-habilidad",
        titulo: "Primas por habilidad y transparencia salarial",
        descripcion:
          "Cuánto paga cada habilidad de IA frente a la mediana nacional de Estados Unidos, y qué tipo de empresa publica el salario en sus vacantes.",
        resumen:
          "Primas salariales por habilidad: dominar prompt engineering o LangChain se paga cerca de 30 % por debajo de la mediana nacional, mientras que trabajar con agentes de IA se paga justo en ella, una brecha de $61,050 entre habilidades del mismo mercado. En Estados Unidos, además, las multinacionales publican el salario 3.4 veces menos que las empresas locales.",
      },
      {
        ruta: "mercado-ia-mx-us/04_modelo_imputacion.ipynb",
        slug: "mercado-de-ia-modelo-de-imputacion-salarial",
        titulo: "Modelo de imputación salarial",
        descripcion:
          "Gradient boosting entrenado con salarios de Estados Unidos y validado contra los 4 salarios mexicanos observados: MdAPE de 958 %, así que no se publica.",
        resumen:
          "Un modelo de gradient boosting entrenado con salarios de Estados Unidos se valida contra un hold-out con los 4 salarios mexicanos observados. El veredicto es no publicable: un MdAPE de 958 % frente a un umbral de 35 %. Con n=4 ningún experimento puede validar la transferencia entre mercados, así que las estimaciones para México no se publican.",
      },
    ],
  },
  {
    id: "riesgo-crediticio",
    nivel: "propio",
    titulo: "Riesgo crediticio",
    descripcion:
      "Predicción del impago de 30,000 tarjetahabientes (UCI, Taiwán, 2005) con una clase minoritaria de 22 %: métricas elegidas desde el principio, una prueba de fuga de datos y el pipeline de variables de producción.",
    carpeta: "credit-risk-scoring",
    portada: { ruta: "credit-risk-scoring/01_eda.ipynb", figura: 2 },
    notebooks: [
      {
        ruta: "credit-risk-scoring/01_eda.ipynb",
        slug: "riesgo-crediticio-exploracion-y-fuga-de-datos",
        titulo: "Exploración y prueba de fuga de datos",
        descripcion:
          "Análisis exploratorio de 30,000 tarjetahabientes con 22 % de impago: métricas elegidas desde el inicio y una prueba explícita de fuga de datos.",
        resumen:
          "Análisis exploratorio de 30,000 tarjetahabientes de Taiwán (UCI, abril a septiembre de 2005) para predecir el impago del mes siguiente. La clase positiva es minoría, 22 % de impago o unos 3.5 a 1, así que las métricas quedan elegidas desde el principio: ROC AUC, PR AUC, Gini y KS en lugar de exactitud. Incluye una prueba explícita de fuga de datos que descarta las tres vías por las que podría colarse, y cierra escribiendo la partición estratificada 80/20 que las fases siguientes reutilizan sin volver a tocar el test.",
      },
      {
        ruta: "credit-risk-scoring/02_feature_engineering.ipynb",
        slug: "riesgo-crediticio-ingenieria-de-variables",
        titulo: "Ingeniería de variables",
        descripcion:
          "Un transformador de scikit-learn que deriva 15 variables de seis meses de saldo, pago y morosidad, cada una validada por su ROC AUC antes de entrar al modelo.",
        resumen:
          "Los datos crudos traen seis fotos mensuales de saldo, pago y morosidad. Las señales que de verdad predicen el impago son razones entre esas fotos, y ninguna existe como columna. Aquí se construye el pipeline de producción: un transformador de scikit-learn que añade 15 variables derivadas fila por fila, y un ColumnTransformer que imputa, escala y codifica según la cardinalidad. Cada variable derivada se valida por su ROC AUC univariado contra el objetivo antes de entrar.",
        resultados: {
          titulo: "Fase 3: comparación de modelos",
          nota:
            "Estas cifras vienen del pipeline de entrenamiento del proyecto (`make train`, 50 pruebas de Optuna por modelo y validación cruzada estratificada de 5 folds), no de este notebook. El modelo se elige por ROC AUC de validación cruzada y el test solo se usa para reportar. Las curvas ROC y KS, la calibración y SHAP están en los notebooks 03 y 04 del proyecto, que no forman parte de esta publicación.",
          /* Se leen del artefacto que dejó el entrenamiento, junto al
             notebook: si vuelve a correr, la tabla del sitio cambia sola. */
          archivo: "comparison.json",
        },
      },
    ],
  },
  {
    id: "proyecto-final",
    nivel: "final",
    titulo: "Proyecto final: telecomunicaciones",
    descripcion:
      "El cierre del bootcamp de TripleTen: un caso principal con los registros de llamadas de un servicio de telecomunicaciones y dos casos complementarios, una prueba A/B y un ejercicio de SQL.",
    carpeta: "Telecomunicaciones-Operadores-Ineficaces",
    notebooks: [
      {
        ruta: "Telecomunicaciones-Operadores-Ineficaces/Operadores-Ineficaces.ipynb",
        slug: "telecom-operadores-ineficaces",
        titulo: "Operadores ineficaces en un call center",
        descripcion:
          "Métricas por operador (llamadas perdidas, espera y salientes), una regla de percentiles para marcar a los ineficaces y pruebas de Mann-Whitney.",
        resumen:
          "Caso principal del proyecto final, con 53,902 registros de llamadas y 732 clientes. Por operador se calculan la proporción de llamadas entrantes perdidas, la espera promedio ponderada y el volumen de llamadas salientes. Un operador se marca como ineficaz si cae en el peor cuartil de al menos dos de las tres métricas, con un mínimo de llamadas para evitar ruido, y la diferencia entre grupos se valida con pruebas de Mann-Whitney.",
      },
      {
        ruta: "Telecomunicaciones-Operadores-Ineficaces/Test-AB-Recomendador.ipynb",
        slug: "telecom-test-a-b-del-recomendador",
        titulo: "Test A/B del sistema de recomendaciones",
        descripcion:
          "Validación de audiencia y periodo, embudo de la página de producto a la compra y pruebas z con corrección de Bonferroni para decidir si se implementa.",
        resumen:
          "Segundo caso del proyecto final. Antes de leer resultados se valida el experimento: audiencia de la región EU, registros del 7 al 21 de diciembre de 2020, exclusión de usuarios que también estaban en otra prueba y una ventana de 14 días desde el registro. Después se compara la conversión de los grupos A y B en cada paso del embudo (página de producto, carrito y compra) con pruebas z para proporciones y corrección de Bonferroni.",
      },
      {
        ruta: "Telecomunicaciones-Operadores-Ineficaces/SQL-Libros.ipynb",
        slug: "telecom-analisis-sql-de-libros",
        titulo: "Consultas SQL sobre un catálogo de libros",
        descripcion:
          "Cinco preguntas de negocio resueltas con SQL (joins, subconsultas y CTE) sobre una base de libros, autores, editoriales, calificaciones y reseñas.",
        resumen:
          "Tercer caso del proyecto final: cinco tareas resueltas con SQL sobre una base de datos de libros, autores, editoriales, calificaciones y reseñas, desde contar los libros publicados después del año 2000 hasta el promedio de reseñas de los usuarios que calificaron más de 50 libros. Usa joins, subconsultas y CTE, y lee cada resultado con pandas.",
      },
    ],
  },
  {
    id: "formacion-tripleten",
    nivel: "formacion",
    titulo: "Formación TripleTen",
    descripcion:
      "Los sprints del bootcamp de ciencia de datos, del más avanzado al primero: machine learning, pruebas A/B, analítica de negocio, estadística, limpieza de datos y Python.",
    notebooks: [
      {
        ruta: "Sp_14/sp_14.ipynb",
        slug: "model-fitness-churn-y-segmentacion",
        titulo: "Model Fitness: cancelación y segmentación",
        area: "Machine learning",
        descripcion:
          "Regresión logística y bosque aleatorio para predecir la cancelación en una cadena de gimnasios, y K-means con cinco segmentos para orientar la retención.",
        resumen:
          "Predicción de la cancelación del mes siguiente para 4,000 clientes de una cadena de gimnasios. La regresión logística supera al bosque aleatorio (exactitud 0.92, precisión 0.86 y recall 0.81, contra 0.90, 0.83 y 0.76), y la segmentación con dendrograma y K-means en cinco clústeres separa grupos cuya tasa de cancelación va de 3 % a 52 %. Cierra con recomendaciones de retención por segmento.",
      },
      {
        ruta: "Sp_12/sp_12.ipynb",
        slug: "embudo-de-eventos-test-a-a-b",
        titulo: "Embudo de eventos y test A/A/B",
        area: "Pruebas A/B",
        descripcion:
          "Embudo de conversión construido desde los registros de eventos de una app y un test A/A/B sobre un cambio de fuentes en la interfaz.",
        resumen:
          "Registros de eventos de una app convertidos en un embudo de conversión, desde la pantalla principal hasta el pago, y un test A/A/B con dos grupos de control y uno con fuentes nuevas. El test A/A confirma que los controles son equivalentes, y en las 6 pruebas de hipótesis al 0.05 ninguna diferencia resulta significativa, así que no hay evidencia de que el cambio de fuentes afecte la conversión.",
      },
      {
        ruta: "Sp_11/sp_11.ipynb",
        slug: "tests-a-b-priorizados-con-ice-rice",
        titulo: "Priorización ICE y RICE y test A/B",
        area: "Pruebas A/B",
        descripcion:
          "Hipótesis priorizadas con ICE y RICE, y un test A/B de conversión y ticket promedio analizado con datos brutos y sin valores atípicos.",
        resumen:
          "Primero se priorizan hipótesis para aumentar los ingresos con los marcos ICE y RICE. Después se analiza un test A/B con datos brutos y filtrados: el grupo B convierte mejor (2.90 % contra 2.50 %, p ≈ 0.017; 2.84 % contra 2.39 % sin atípicos, p ≈ 0.006) con el mismo ticket promedio, así que la recomendación es detener la prueba y adoptar B.",
      },
      {
        ruta: "Sp_10/sp_10.ipynb",
        slug: "showz-analisis-de-marketing",
        titulo: "Showz: métricas de marketing",
        area: "Analítica de negocio",
        descripcion:
          "Visitas, pedidos y gasto publicitario de una plataforma de eventos: usuarios activos, conversión, LTV, CAC y ROMI por fuente para decidir dónde invertir.",
        resumen:
          "Tres tablas de una plataforma de eventos (visitas, pedidos y costos de marketing) convertidas en métricas de producto y de negocio: usuarios activos por día, semana y mes, duración de las sesiones y frecuencia de regreso, tiempo hasta la primera compra, LTV, CAC y ROMI por fuente de adquisición. El resultado señala qué fuentes recuperan la inversión y en cuáles el costo de adquirir un cliente se acerca o supera a lo que ese cliente deja.",
      },
      {
        ruta: "Sp_8/sp_8.ipynb",
        slug: "zuber-taxis-en-chicago",
        titulo: "Zuber: viajes en taxi en Chicago",
        area: "Pruebas de hipótesis",
        descripcion:
          "Demanda de taxis por barrio y empresa con datos extraídos por SQL, y una prueba de Welch sobre la duración de los viajes con mal clima.",
        resumen:
          "Datos de viajes en taxi de Chicago extraídos con SQL: la demanda se concentra en Loop, River North y Streeterville, y dos empresas se llevan la mayor parte de los viajes. Una prueba t de Welch confirma que los sábados con lluvia o tormenta el trayecto de Loop al aeropuerto O'Hare dura unos 7 minutos más (40.5 contra 33.3 minutos de media, p < 0.001).",
      },
      {
        ruta: "Sp_6/sp_6.ipynb",
        slug: "tienda-de-videojuegos-patrones-de-exito",
        titulo: "Tienda de videojuegos: patrones de éxito",
        area: "Análisis exploratorio",
        descripcion:
          "Ventas por plataforma, género y región para planear la campaña de 2017 de una tienda de videojuegos, con pruebas de hipótesis sobre calificaciones.",
        resumen:
          "Ciclo de vida de las plataformas, ventas por género y preferencias por región (Norteamérica, Europa y Japón), con pruebas de hipótesis sobre las calificaciones de los usuarios. La conclusión para 2017: priorizar PS4 y Xbox One, apostar por los géneros líderes de cada región y usar las críticas especializadas para afinar campañas e inventario.",
      },
      {
        ruta: "Sp_5/sp_5.ipynb",
        slug: "megaline-cual-es-la-mejor-tarifa",
        titulo: "Megaline: ¿cuál es la mejor tarifa?",
        area: "Estadística",
        descripcion:
          "Comparación de las tarifas Surf y Ultimate de un operador móvil con datos de 500 clientes, y pruebas de hipótesis sobre el ingreso por usuario.",
        resumen:
          "Llamadas, mensajes y datos móviles de 500 clientes de un operador de telecomunicaciones en 2018, convertidos en el ingreso mensual de cada usuario para comparar las tarifas Surf y Ultimate. Estadística descriptiva por tarifa y dos pruebas de hipótesis sobre el ingreso promedio: entre tarifas, y entre el área de Nueva York y Nueva Jersey y el resto de las regiones.",
      },
      {
        ruta: "Sp_4/notebook.ipynb",
        slug: "instacart-llena-ese-carrito",
        titulo: "Instacart: hábitos de compra",
        area: "Limpieza y EDA",
        descripcion:
          "Cinco tablas de pedidos limpiadas (duplicados, valores ausentes y tipos) y un análisis de cuándo, cada cuánto y qué compran los clientes de Instacart.",
        resumen:
          "Preprocesamiento de las cinco tablas de Instacart (pedidos, productos, pasillos, departamentos y productos por pedido): duplicados, valores ausentes y tipos, con cada decisión justificada. Después, cuándo se hacen los pedidos, cada cuánto vuelven los clientes, qué productos se compran y se vuelven a pedir más, y cuántos artículos lleva un pedido.",
      },
      {
        ruta: "Sp_3/BP_project_template_ES_updated.ipynb",
        slug: "dejame-escuchar-musica",
        titulo: "Hábitos de escucha en dos ciudades",
        area: "pandas",
        descripcion:
          "Limpieza de encabezados, valores ausentes y duplicados con pandas, y una comparación de la actividad musical de dos ciudades por día de la semana.",
        resumen:
          "Primer proyecto con pandas: normalizar encabezados, tratar valores ausentes y duplicados, y comparar cuánta música se escucha en Springfield y en Shelbyville según el día. Springfield reproduce más del doble (42,741 contra 18,512) y queda arriba tanto el lunes como el viernes.",
      },
      {
        ruta: "Sp_2/Proyecto_2_Bootcamp.ipynb",
        slug: "store-1-perfilado-de-clientes",
        titulo: "Store 1: perfilado de clientes",
        area: "Python",
        descripcion:
          "Listas anidadas, bucles, condicionales y funciones en Python puro para limpiar registros de clientes y segmentarlos por edad, gasto y categoría.",
        resumen:
          "Segunda fase de Store 1, en Python sin librerías: una función que limpia cada registro, bucles y condicionales para encontrar a los clientes jóvenes, a los de alto gasto y a los compradores de cada categoría, y el ingreso total de la tienda.",
      },
      {
        ruta: "Sp_1/New_Project_1_student_version_ESP.ipynb",
        slug: "store-1-limpieza-de-datos-de-clientes",
        titulo: "Store 1: limpieza de datos de clientes",
        area: "Python",
        descripcion:
          "Cadenas, listas y tipos de datos en Python puro para limpiar los nombres, las edades y las categorías de compra de los clientes de una tienda.",
        resumen:
          "Primera fase de Store 1, en Python sin librerías: quitar espacios y guiones bajos de los nombres, convertir tipos, validar edades con try y except, ordenar listas y armar el resumen de cada cliente con f-strings.",
      },
    ],
  },
];
