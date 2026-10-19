import { useRef, useLayoutEffect, lazy, Suspense } from "react";
import { gsap, prefersReducedMotion } from "../hooks/gsap";
import { profile } from "../data/content.js";
import Magnet from "../reactbits/Magnet.jsx";
import "./Hero.css";

const RippleGrid = lazy(() => import("../reactbits/RippleGrid.jsx"));
const OrbitalSculpture = lazy(() => import("./OrbitalSculpture.jsx"));

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".kinetic-meta", { opacity: 0, y: 12, duration: .65 })
        .from(".kinetic-name .name-char", { yPercent: 115, rotateX: -80, rotateZ: 6, opacity: 0, stagger: .055, duration: 1.15 }, "-=.25")
        .from(".hero-sculpture", { opacity: 0, scale: .76, rotate: -12, duration: 1.8 }, "-=1.1")
        .from(".kinetic-intro > *, .kinetic-foot", { opacity: 0, y: 18, stagger: .12, duration: .8 }, "-=1.2");
      gsap.to(".hero-sculpture-scroll", { yPercent: 18, rotate: 12, scale: 1.12, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".kinetic-name", { yPercent: -12, letterSpacing: "-.025em", ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header className="hero hero--kinetic" id="top" ref={ref}>
      <div className="hero-grid-bg" aria-hidden="true">{!prefersReducedMotion && <Suspense fallback={null}><RippleGrid color="#87b99c" cellSize={62} glow={0.4} rippleStrength={0.8} autoRipple="none" intro={false} fade={.6} opacity={.46} dpr={1.25} /></Suspense>}</div>
      <div className="shell kinetic-shell">
        <div className="kinetic-meta"><span><i /> AO ZHANG — PERSONAL PORTFOLIO</span><span>MACAU, CHINA <b>/</b> 2026</span></div>
        <div className="kinetic-composition">
          <div className="kinetic-identity">
            <p className="kinetic-eyebrow">你好，我是张敖。<span>BUSINESS ANALYTICS & AI PRODUCT</span></p>
            <h1 className="kinetic-name" aria-label="张敖 AO ZHANG">{profile.nameLines.map((line, index) => <span className={`name-row ${index ? "name-row-accent" : ""}`} key={line} aria-hidden="true">{Array.from(line).map((char, i) => <span className="name-char" key={i}>{char}</span>)}</span>)}</h1>
            <div className="kinetic-intro"><h2>{profile.headline}</h2><p>{profile.tagline}</p><div className="kinetic-actions">
              <Magnet padding={35} magnetStrength={8} disabled={prefersReducedMotion}><a className="kinetic-primary" href="#profile">认识我 <span aria-hidden="true">↓</span></a></Magnet>
              <a className="kinetic-secondary" href="#contact">与我联系 <span aria-hidden="true">↗</span></a>
            </div></div>
          </div>
          <div className="hero-sculpture-scroll" aria-hidden="true"><div className="hero-sculpture"><div className="sculpture-glow" /><div className="sculpture-fallback" />{!prefersReducedMotion && <Suspense fallback={null}><OrbitalSculpture /></Suspense>}<span className="sculpture-label label-a">DATA</span><span className="sculpture-label label-b">PRODUCT</span><span className="sculpture-label label-c">AI</span><div className="sculpture-caption"><span>IDEAS IN MOTION</span><span>↗</span></div></div></div>
        </div>
        <div className="kinetic-foot"><span>CURIOUS MIND. HANDS-ON BUILDER.</span><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#profile">向下认识我 <span aria-hidden="true">↓</span></a></div>
      </div>
    </header>
  );
}
