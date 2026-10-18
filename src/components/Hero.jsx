import { useRef, useLayoutEffect, lazy, Suspense } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { profile, stats } from "../data/content.js";
import ShinyText from "../reactbits/ShinyText.jsx";

const FloatingLines = lazy(() => import("../reactbits/FloatingLines.jsx"));
const canAnimateBackground = !prefersReducedMotion && typeof window !== "undefined" &&
  window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches;

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero-top", { opacity: 0, duration: 0.8, ease: "power2.out" });

      // BIG title — mask reveal: lines rise from below, slight compress + settle
      tl.from(
        ".hero-title .line",
        { yPercent: 118, duration: 1.5, ease: EASE, stagger: 0.12 },
        "-=0.3"
      );
      tl.from(
        ".hero-title",
        { scaleY: 1.08, transformOrigin: "bottom", duration: 1.4, ease: EASE },
        "<"
      );

      tl.from(
        ".hero-sub > *",
        { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12 },
        "-=0.9"
      );

      tl.from(
        ".hero-data .cell",
        { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
        "-=0.7"
      );

      // Fade the flowing background in after the title lands.
      tl.from(".hero-bg", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0.4);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={ref}>
      {/* Keep the decorative background out of the critical content bundle. */}
      <div className="hero-bg" aria-hidden="true">
        {canAnimateBackground && <Suspense fallback={null}><FloatingLines
          linesGradient={["#1f5d44", "#5cba8d", "#a9dbbf"]}
          animationSpeed={0.8}
          interactive
          parallax
          parallaxStrength={0.15}
          mixBlendMode="screen"
        /></Suspense>}
      </div>

      <div className="hero-shell shell">
        <div className="hero-top">
          <span>Portfolio — {profile.role}</span>
          <span>
            {profile.location} /{" "}
            <ShinyText
              text={profile.available}
              color="#9aa0a6"
              shineColor="#7ef2b8"
              speed={3.2}
              spread={100}
              disabled={prefersReducedMotion}
            />
          </span>
        </div>

        <div className="hero-composition">
        <h1 className="hero-title" aria-label="张敖 AO ZHANG">
          <span className="mask">
            <span className="line">{profile.nameLines[0]}</span>
          </span>
          <span className="mask">
            <span className="line accent">{profile.nameLines[1]}</span>
          </span>
        </h1>

        <div className="hero-sub">
          <span className="hero-role">BUSINESS ANALYTICS<br /> & AI PRODUCT</span>
          <h2 className="hero-headline">{profile.headline}</h2>
          <p className="hero-tagline">
            {profile.tagline}
          </p>
          <div className="hero-actions">
            <a className="hero-btn" href="#work">探索精选项目 <span aria-hidden="true">↗</span></a>
            <a className="hero-secondary" href="#contact">联系我 <span aria-hidden="true">↗</span></a>
          </div>
          <span className="hero-focus">数据分析 / 产品原型 / 商业研究</span>
        </div>
        </div>
      </div>

      <div className="hero-data shell">
        {stats.map((s) => (
          <div className="cell" key={s.lab}>
            <div className="num">
              {s.value}
              {s.suffix}
            </div>
            <div className="lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
