import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { About } from "@/components/About";
import { NyxAICta } from "@/components/NyxAICta";
import { Contact } from "@/components/Contact";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <ProjectsGallery projects={projects} />
      <About />
      <NyxAICta />
      <Contact />
    </>
  );
}
