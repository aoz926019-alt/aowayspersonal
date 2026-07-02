import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { profile, stats } from "../data/content.js";
import DotGrid from "../reactbits/DotGrid.jsx";
import CountUp from "../reactbits/CountUp.jsx";
import ShinyText from "../reactbits/ShinyText.jsx";

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

      // fade the dot grid in gently after the title lands
      tl.from(".hero-bg", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0.4);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={ref}>
      {/* React Bits — DotGrid (cool gray dots, pine on proximity) */}
      <div className="hero-bg">
        <DotGrid
          dotSize={4}
          gap={30}
          baseColor="#cfd3d8"
          activeColor="#1f5d44"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          returnDuration={1.4}
        />
      </div>

      <div className="hero-shell shell">
        <div className="hero-top">
          <span>Portfolio — {profile.role}</span>
          <span>
            {profile.location} /{" "}
            <ShinyText
              text={profile.available}
              color="#9aa0a6"
              shineColor="#1f5d44"
              speed={3.2}
              spread={100}
              disabled={prefersReducedMotion}
            />
          </span>
        </div>

        <h1 className="hero-title">
          <span className="mask">
            <span className="line">{profile.nameLines[0]}</span>
          </span>
          <span className="mask">
            <span className="line accent">{profile.nameLines[1]}</span>
          </span>
        </h1>

        <div className="hero-sub">
          <p className="hero-tagline">
            <strong>用数据做决策,亲手把想法做成产品。</strong>
            <br />
            {profile.tagline}
          </p>
          <a className="hero-btn" href="#contact">
            联系我 →
          </a>
        </div>
      </div>

      <div className="hero-data shell">
        {stats.map((s) => (
          <div className="cell" key={s.lab}>
            <div className="num">
              <CountUp to={s.value} duration={1.6} />
              {s.suffix}
            </div>
            <div className="lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
