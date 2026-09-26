import { Hero } from "@/components/Hero";
import { Proyectos } from "@/components/Proyectos";
import { Bootcamp } from "@/components/Bootcamp";
import { Herramientas } from "@/components/Herramientas";
import { Trayectoria } from "@/components/Trayectoria";
import { NyxAICta } from "@/components/NyxAICta";
import { Contacto } from "@/components/Contacto";

/* La portada, en el orden en que se lee: quién es, qué hizo por su cuenta,
   qué hizo en el bootcamp, con qué, dónde ha trabajado, su consultora y
   cómo escribirle. Todo se genera en el build; no hay estado en el cliente. */
export default function Home() {
  return (
    <>
      <Hero />
      <Proyectos />
      <Bootcamp />
      <Herramientas />
      <Trayectoria />
      <NyxAICta />
      <Contacto />
    </>
  );
}
