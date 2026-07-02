import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { capabilities } from "../data/content.js";
import SpotlightCard from "../reactbits/SpotlightCard.jsx";

export default function Strengths() {
  const ref = useRef(null);

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
    <section className="section" id="skills" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="idx">04 — CAPABILITIES / 个人优势</span>
        </div>

        <h2 className="section-title cap-head" style={{ marginBottom: "90px" }}>
          <span className="mask">
            <span className="line">What I</span>
          </span>
          <span className="mask">
            <span className="line">bring.</span>
          </span>
        </h2>

        <div className="cap-grid">
          {capabilities.map((c) => (
            <SpotlightCard
              key={c.no}
              className="cap-card"
              spotlightColor="rgba(31, 93, 68, 0.20)"
            >
              <div className="cap-inner">
                <div className="no">{c.no}</div>
                <h4>{c.title}</h4>
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
