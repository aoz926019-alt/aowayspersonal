import { useRef, useState, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import SpotlightCard from "../reactbits/SpotlightCard.jsx";
import CapabilityGlyph from "./CapabilityGlyph.jsx";
import "./Strengths.css";

const atlasNodes = [
  { x: 20, y: 18, key: "atlasData" }, { x: 278, y: 18, key: "atlasProduct" },
  { x: 20, y: 142, key: "atlasCommunication" }, { x: 278, y: 142, key: "atlasResearch" },
];

function CapabilityAtlas({ capabilities, t, active, select }) {
  return <svg className="cap-atlas" viewBox="0 0 420 220" fill="none" role="group" aria-label={t("capabilityIndex")}>
    <g aria-hidden="true"><ellipse className="atlas-orbit" cx="210" cy="110" rx="152" ry="75" />
      {atlasNodes.map((node, index) => <path key={index} className={`atlas-thread ${active === index ? "is-active" : ""}`} pathLength="1"
        d={`M210 110C${node.x < 100 ? 150 : 270} 110 ${node.x + 61} 110 ${node.x + 61} ${node.y + 30}`} />)}
      <circle className="atlas-hub" cx="210" cy="110" r="20" /><text className="atlas-sign" x="210" y="114">AO</text>
    </g>
    {atlasNodes.map((node, index) => <a key={index} href={`#capability-${capabilities[index].no}`}
      aria-label={t("jumpToCapability", { title: capabilities[index].title })}
      onPointerEnter={() => select(index)} onPointerLeave={() => select(null)} onFocus={() => select(index)} onBlur={() => select(null)}>
      <rect x={node.x} y={node.y} width="122" height="60" rx="4" />
      <g aria-hidden="true"><text className="atlas-code" x={node.x + 12} y={node.y + 19}>{capabilities[index].no}</text>
        <text className="atlas-label" x={node.x + 12} y={node.y + 43}>{t(node.key)}</text>
        <path className="atlas-arrow" d={`M${node.x + 99} ${node.y + 18}h9v9m0-9-9 9`} /></g>
    </a>)}
  </svg>;
}

export default function Strengths() {
  const { language, t, content: { capabilities } } = useLanguage();
  const ref = useRef(null);
  const [activeCap, setActiveCap] = useState(null);

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
      gsap.from(".atlas-thread", { strokeDashoffset: 1, duration: 1.4, stagger: .09, ease: "power2.inOut",
        scrollTrigger: { trigger: ".cap-heading", start: "top 85%", once: true } });

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
        <CapabilityAtlas capabilities={capabilities} t={t} active={activeCap} select={setActiveCap} />
        </div>

        <div className="cap-grid">
          {capabilities.map((c, index) => (
            <SpotlightCard
              key={c.no}
              className={`cap-card ${activeCap === index ? "is-indexed" : ""}`}
              spotlightColor="rgba(31, 93, 68, 0.20)"
            >
              <div className="cap-inner" id={`capability-${c.no}`} tabIndex={-1}>
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
