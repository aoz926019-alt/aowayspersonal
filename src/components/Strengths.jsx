import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import SpotlightCard from "../reactbits/SpotlightCard.jsx";
import CapabilityGlyph from "./CapabilityGlyph.jsx";
import "./Strengths.css";

export default function Strengths() {
  const { language, t, content: { capabilities } } = useLanguage();
  const ref = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(hover: hover) and (pointer: fine)",
    }, ({ conditions }) => {
      if (!conditions.motion) return;
      const section = ref.current;
      const drift = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
        .to(".skills-glow--sage", { xPercent: -14, yPercent: 12, rotation: 18, scale: 1.12, duration: 16 }, 0)
        .to(".skills-glow--blue", { xPercent: 16, yPercent: -10, rotation: -15, scale: 1.16, duration: 18 }, 0)
        .to(".skills-glow--pearl", { xPercent: -12, yPercent: -16, scale: .85, duration: 14 }, 0);
      let visible = false;
      const update = () => drift.paused(!visible || document.hidden);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        update();
      });
      observer.observe(section);
      document.addEventListener("visibilitychange", update);

      let move, reset;
      const cardCleanups = [];
      if (conditions.pointer) {
        const field = section.querySelector(".skills-lightfield");
        const xTo = gsap.quickTo(field, "x", { duration: 1.6, ease: "power3.out" });
        const yTo = gsap.quickTo(field, "y", { duration: 1.6, ease: "power3.out" });
        move = (event) => {
          const bounds = section.getBoundingClientRect();
          xTo((event.clientX - bounds.left - bounds.width / 2) * .045);
          yTo((event.clientY - bounds.top - bounds.height / 2) * .035);
        };
        reset = () => { xTo(0); yTo(0); };
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerleave", reset);
        section.querySelectorAll(".cap-card").forEach(card => {
          const inner = card.querySelector(".cap-inner");
          gsap.set(inner, { transformPerspective: 900 });
          const rotateX = gsap.quickTo(inner, "rotationX", { duration: .7, ease: "power3.out" });
          const rotateY = gsap.quickTo(inner, "rotationY", { duration: .7, ease: "power3.out" });
          const tilt = event => {
            const bounds = card.getBoundingClientRect();
            rotateX((.5 - (event.clientY - bounds.top) / bounds.height) * 5);
            rotateY(((event.clientX - bounds.left) / bounds.width - .5) * 5);
          };
          const untilt = () => { rotateX(0); rotateY(0); };
          card.addEventListener("pointermove", tilt);
          card.addEventListener("pointerleave", untilt);
          cardCleanups.push(() => { card.removeEventListener("pointermove", tilt); card.removeEventListener("pointerleave", untilt); });
        });
      }
      return () => {
        observer.disconnect();
        cardCleanups.forEach(cleanup => cleanup());
        document.removeEventListener("visibilitychange", update);
        if (move) {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", reset);
        }
      };
    }, ref);
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".cap-head .line", {
        yPercent: 115,
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: ".cap-head", start: "top 90%", once: true },
      });

      gsap.utils.toArray(".cap-card").forEach((card) => {
        gsap.from(card, {
          y: 24, opacity: 0, duration: .75, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
        gsap.from(card.querySelectorAll(".glyph-trace"), {
          strokeDashoffset: 1, duration: 1.1, stagger: .1, ease: "power2.inOut",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="skills-atmosphere" aria-hidden="true">
        <div className="skills-lightfield">
          <span className="skills-glow skills-glow--sage" />
          <span className="skills-glow skills-glow--blue" />
          <span className="skills-glow skills-glow--pearl" />
        </div>
      </div>
      <div className="shell skills-shell">
        <div className="section-rule">
          <span className="section-rule-track" aria-hidden="true" />
          <span className="idx">
            <DecryptedText
              key={language} text={t("skillsLabel")}
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
          {capabilities.map((c, index) => (
            <SpotlightCard
              key={c.no}
              className="cap-card"
              spotlightColor="rgba(31, 93, 68, 0.20)"
            >
              <div className="cap-inner">
                <div className="cap-card-top"><div className="no">{c.no}</div><CapabilityGlyph index={index} /></div>
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
