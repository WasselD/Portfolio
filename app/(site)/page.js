import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Training from "@/components/sections/Training";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Training />
      <Experience />
      <Services />
      <Languages />
      <Contact />
    </>
  );
}
