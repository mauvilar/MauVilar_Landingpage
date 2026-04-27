import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center px-6 py-32 relative overflow-hidden">
      <div className="aurora opacity-50" />
      <div className="relative text-center max-w-xl">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80 font-semibold">
          Error 404
        </p>
        <h1 className="mt-3 text-6xl sm:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Página no encontrada</span>
        </h1>
        <p className="mt-6 text-lg text-white/65">
          La página que buscas no existe o se movió. Puedes volver al inicio
          y explorar los proyectos.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
