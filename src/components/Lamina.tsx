import type { Figura } from "@/lib/catalogo";

/**
 * Una gráfica sobre su lámina. La clara funde el blanco de matplotlib con la
 * crema (`multiply`); la oscura, ya en la paleta de la marca, va sobre noche.
 * Ancho y alto vienen del catálogo: el espacio queda reservado antes de que
 * cargue la imagen y la proporción es la real, sin recortes.
 */
export function Lamina({
  figura,
  prioridad = false,
  className = "",
}: {
  figura: Figura;
  prioridad?: boolean;
  className?: string;
}) {
  const clara = figura.tono === "clara";
  return (
    <div className={`lamina ${clara ? "lamina-clara" : "lamina-oscura"} ${className}`.trim()}>
      <img
        src={figura.src}
        alt={figura.alt}
        width={figura.ancho}
        height={figura.alto}
        loading={prioridad ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={prioridad ? "high" : "auto"}
      />
    </div>
  );
}
