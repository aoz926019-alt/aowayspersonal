import { useEffect } from "react";
import { ScrollTrigger, prefersReducedMotion } from "./hooks/gsap";
import ClickSpark from "./reactbits/ClickSpark.jsx";
import { startSmoothScroll, stopSmoothScroll } from "./hooks/smoothScroll";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Strengths from "./components/Strengths.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  useEffect(() => {
    startSmoothScroll();
    // Font swaps can change line wrapping after the first layout.
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      stopSmoothScroll();
    };
  }, []);

  return (
    <ClickSpark sparkColor={["#2c7a5b", "#86d6ac"]} sparkSize={9} sparkRadius={26}
      sparkCount={7} duration={420} disabled={prefersReducedMotion} className="site-interaction">
      <a className="skip-link" href="#main-content">跳到正文</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Strengths />
        <Contact />
      </main>
    </ClickSpark>
  );
}
