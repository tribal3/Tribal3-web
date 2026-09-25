import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";
import MovingGrid3x3 from "@/components/ui/MovingGrid3x3";
import Founders from "@/components/sections/Founders";
import Expertise from "@/components/sections/Expertise";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Approach />
      <MovingGrid3x3 />
      <Founders />
      <Expertise />
      <Contact />
    </>
  );
}