import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { experience } from "../data/content.js";

export default function Experience() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-head-title .line", {
        yPercent: 115,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".exp-head-title", start: "top 82%" },
      });

      gsap.from(".exp-item", {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="idx">03 — EXPERIENCE / 实习经历</span>
        </div>

        <h2 className="section-title exp-head-title" style={{ marginBottom: "90px" }}>
          <span className="mask">
            <span className="line">Where I've</span>
          </span>
          <span className="mask">
            <span className="line">worked.</span>
          </span>
        </h2>

        <div className="exp-list">
          {experience.map((e) => (
            <div className="exp-item" key={e.company}>
              <div className="exp-period">
                {e.period}
                {e.tag && <span className="exp-tag">{e.tag}</span>}
              </div>
              <div className="exp-body">
                <div className="exp-head">
                  <h3>{e.company}</h3>
                  <span className="exp-sub">{e.sub}</span>
                </div>
                <div className="exp-role">{e.role}</div>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
