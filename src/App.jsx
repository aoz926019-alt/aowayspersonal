import { useEffect } from "react";
import { ScrollTrigger } from "./hooks/gsap";
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
    // recalc trigger positions once fonts / layout settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      stopSmoothScroll();
    };
  }, []);

  return (
    <>
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
    </>
  );
}
