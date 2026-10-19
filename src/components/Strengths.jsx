import { useRef, useLayoutEffect, useEffect, useState, lazy, Suspense } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { capabilities } from "../data/content.js";
import SpotlightCard from "../reactbits/SpotlightCard.jsx";
import "./Strengths.css";

const MagnetLines = lazy(() => import("../reactbits/MagnetLines.jsx"));

export default function Strengths() {
  const ref = useRef(null);
  const [animateField, setAnimateField] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setAnimateField(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".cap-head .line", {
        yPercent: 115,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".cap-head", start: "top 82%" },
      });

      gsap.from(".cap-card", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".cap-grid", start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="skills-field" aria-hidden="true">{animateField && <Suspense fallback={null}>
        <MagnetLines lineColor="#7c9687" accentColor="#47785d" spacing={42} lineHeight={14}
          lineWidth={1} mode="attract" radius={220} edgeFade={.15} fade={.65}
          intro={false} maxDevicePixelRatio={1.25} />
      </Suspense>}</div>
      <div className="shell skills-shell">
        <div className="section-rule">
          <span className="idx">
            <DecryptedText
              text="04 — CAPABILITIES / 个人优势"
              animateOn="view"
              sequential
              speed={34}
              encryptedClassName="decrypt-scramble"
            />
          </span>
        </div>

        <div className="cap-heading">
        <h2 className="section-title cap-head">
          <span className="mask">
            <span className="line">What I</span>
          </span>
          <span className="mask">
            <span className="line">bring.</span>
          </span>
        </h2>
        </div>

        <div className="cap-grid">
          {capabilities.map((c) => (
            <SpotlightCard
              key={c.no}
              className="cap-card"
              spotlightColor="rgba(31, 93, 68, 0.20)"
            >
              <div className="cap-inner">
                <div className="no">{c.no}</div>
                <h3>{c.title}</h3>
                <div className="h-cn">{c.cn}</div>
                <p>{c.desc}</p>
                <div className="stack">
                  {c.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
