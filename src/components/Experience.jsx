import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import Leadership from "./Leadership.jsx";
import CapabilityGlyph from "./CapabilityGlyph.jsx";
import "./Experience.css";

export default function Experience() {
  const { language, t, content: { experience } } = useLanguage();
  const ref = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".exp-head-title .line", {
        yPercent: 115,
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: ".exp-head-title", start: "top 90%", once: true },
      });

      gsap.fromTo(".exp-spine-fill", { scaleY: 0 }, { scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".exp-list", start: "top 58%", end: "bottom 58%", scrub: .6 },
      });
      gsap.from(".exp-orbit-path", { strokeDashoffset: 1, duration: 1.8, ease: "power2.inOut",
        stagger: .15, scrollTrigger: { trigger: ".experience-heading", start: "top 80%" } });
      gsap.fromTo(".exp-orbit", { rotation: -12 }, { rotation: 32, ease: "none",
        scrollTrigger: { trigger: ".experience-heading", start: "top bottom", end: "bottom top", scrub: 1 } });

      gsap.utils.toArray(".exp-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".exp-process li"), { y: 6, opacity: 0, stagger: .09, duration: .55,
          ease: "power2.out", scrollTrigger: { trigger: item, start: "top 80%", once: true } });
        gsap.from(item.querySelectorAll(".glyph-trace"), { strokeDashoffset: 1, duration: 1.2,
          ease: "power2.inOut", scrollTrigger: { trigger: item, start: "top 85%", once: true } });
        gsap.from(item.querySelectorAll(".exp-period, .exp-body"), {
          y: 16, opacity: 0, duration: .75, ease: "power3.out", stagger: .04,
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
        });
        ScrollTrigger.create({ trigger: item, start: "top 58%", end: "bottom 58%",
          toggleClass: { targets: item, className: "is-current" } });
      });
    }, ref);
    return () => media.revert();
  }, []);

  return (
    <section className="section experience-section" id="experience" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="section-rule-track" aria-hidden="true" />
          <span className="idx">
            <DecryptedText
              key={language} text={t("experienceLabel")}
              animateOn="view"
              sequential
              speed={34}
              encryptedClassName="decrypt-scramble"
            />
          </span>
        </div>

        <div className="experience-heading">
        <h2 className="section-title exp-head-title">
          <span className="mask">
            <span className="line">Where I've</span>
          </span>
          <span className="mask">
            <span className="line">worked.</span>
          </span>
        </h2>
          <div className="experience-overview" aria-label={t("experienceCount", { count: experience.length })}>
            <div className="exp-orbit-wrap" aria-hidden="true">
              <svg className="exp-orbit" viewBox="0 0 180 180" fill="none">
                <path className="exp-orbit-path" pathLength="1" d="M 24 90 A 66 66 0 1 1 156 90" />
                <path className="exp-orbit-path exp-orbit-path--inner" pathLength="1" d="M 40 90 A 50 50 0 1 0 140 90" />
                <circle cx="24" cy="90" r="3" /><circle cx="140" cy="90" r="3" />
              </svg>
              <span className="exp-total">{String(experience.length).padStart(2, "0")}</span>
            </div>
            <span className="exp-overview-label">{t("internships")}<span>2024 — 2026</span></span>
          </div>
        </div>

        <div className="exp-list">
          <div className="exp-spine" aria-hidden="true"><span className="exp-spine-fill" /></div>
          {experience.map((e, index) => (
            <article className="exp-item" key={e.period}>
              <span className="exp-point" aria-hidden="true" />
              <div className="exp-period">
                <div className="exp-date-top"><span className="exp-sequence" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><CapabilityGlyph index={[0, 1, 3, 4][index]} /></div>
                <span>{e.period}</span>
                <span className="exp-focus">{e.focus}</span>
                {e.tag && <span className="exp-tag">{e.tag}</span>}
              </div>
              <div className="exp-body">
                <div className="exp-head">
                  <h3>{e.company}</h3>
                  <span className="exp-sub">{e.sub}</span>
                </div>
                <div className="exp-role">{e.role}</div>
                <p>{e.desc}</p>
                <ol className="exp-process" aria-label={t("workflow", { company: e.company })}>
                  {e.workflow.map((step, stepIndex) => <li key={stepIndex}><span className="process-node" aria-hidden="true" />{step}</li>)}
                </ol>
              </div>
            </article>
          ))}
        </div>
        <Leadership />
      </div>
    </section>
  );
}
