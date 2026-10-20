import { useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../hooks/gsap";
import { leadership as leadershipData } from "../data/content.js";
import { useLanguage } from "../hooks/useLanguage.js";
import "./Leadership.css";

const number = (index) => String(index + 1).padStart(2, "0");
const nodes = leadershipData.map((_, index) => {
  const angle = -Math.PI / 2 + index * Math.PI * 2 / leadershipData.length;
  const dx = Math.cos(angle) * 100, dy = Math.sin(angle) * 100;
  return {
    x: 160 + dx, y: 146 + dy,
    labelX: 160 + dx * 1.2, labelY: 146 + dy * 1.2,
    path: `M160 146 Q${160 + dx * .55 - dy * .3} ${146 + dy * .55 + dx * .3} ${160 + dx} ${146 + dy}`,
  };
});

export default function Leadership() {
  const { t, content: { leadership } } = useLanguage();
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);
  const activeIndex = previewIndex ?? openIndex ?? 0;
  const active = leadership[activeIndex];
  const point = nodes[activeIndex];

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".leadership-header", { y: 18, opacity: 0, duration: .8,
        scrollTrigger: { trigger: ref.current, start: "top 88%" } });
      gsap.from(".leadership-entry", { y: 20, opacity: 0, stagger: .07, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: ".leadership-list", start: "top 88%" } });
      gsap.from(".archive-thread", { strokeDashoffset: 1, duration: 1.6, stagger: .08, ease: "power2.inOut",
        scrollTrigger: { trigger: ".leadership-archive", start: "top 84%" } });
    }, ref);
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".archive-active-path", { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: .65, ease: "power2.inOut" });
      gsap.fromTo(".archive-preview-copy", { y: 7, opacity: .4 },
        { y: 0, opacity: 1, duration: .4, ease: "power2.out" });
    }, ref);
    return () => media.revert();
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ScrollTrigger.refresh();
  }, [openIndex]);

  const navigate = (event, index) => {
    const targets = { ArrowDown: (index + 1) % leadership.length,
      ArrowUp: (index - 1 + leadership.length) % leadership.length, Home: 0, End: leadership.length - 1 };
    if (targets[event.key] === undefined) return;
    event.preventDefault();
    ref.current.querySelectorAll(".leadership-trigger")[targets[event.key]].focus();
  };

  return (
    <section className="leadership-section" id="leadership" aria-labelledby="leadership-title" ref={ref}>
      <div className="leadership-header">
        <h3 id="leadership-title">{t("leadershipTitle")}<span>{t("leadershipCaption")}</span></h3>
        <span className="leadership-total">{String(leadership.length).padStart(2, "0")} <span>ENTRIES</span></span>
      </div>
      <div className="leadership-layout">
        <aside className="leadership-archive" aria-label={t("experienceIndex")}>
          <div className="archive-topline"><span>EXPERIENCE INDEX</span><span>2023 — 2026</span></div>
          <svg className="archive-map" viewBox="0 0 320 292" fill="none" aria-hidden="true">
            <circle className="archive-orbit" cx="160" cy="146" r="100" />
            <ellipse className="archive-orbit archive-orbit--tilted" cx="160" cy="146" rx="128" ry="76" transform="rotate(-25 160 146)" />
            {nodes.map((node, index) => <g key={index}>
              <path className="archive-thread" d={node.path} pathLength="1" />
              <circle className="archive-node" cx={node.x} cy={node.y} r="2.5" />
              <text className={`archive-node-label ${index === activeIndex ? "is-active" : ""}`} x={node.labelX} y={node.labelY + 3}>{number(index)}</text>
            </g>)}
            <path key={activeIndex} className="archive-active-path" d={point.path} pathLength="1" />
            <g className="archive-cursor" style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>
              <circle r="9" /><circle className="archive-cursor-core" r="3" />
            </g>
            <circle className="archive-hub" cx="160" cy="146" r="36" />
            <text className="archive-center-code" x="160" y="146">{number(activeIndex)}</text>
            <text className="archive-center-total" x="160" y="164">/ {String(leadership.length).padStart(2, "0")}</text>
          </svg>
          <div className="archive-preview-copy">
            <span className="archive-preview-type">{active.type}</span>
            <h4>{active.category}</h4>
            <span className="archive-preview-period">{active.period}</span>
          </div>
          <div className="archive-footer"><span className="archive-status-dot" />{t("archiveFooter")}</div>
        </aside>
        <div className="leadership-list" onPointerLeave={() => setPreviewIndex(null)}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPreviewIndex(null); }}>
          {leadership.map((item, index) => {
            const open = openIndex === index;
            return <article className="leadership-entry" key={index} data-preview={activeIndex === index}>
              <h4 className="leadership-entry-heading">
                <button type="button" className="leadership-trigger" id={`leadership-trigger-${index}`}
                  aria-expanded={open} aria-controls={`leadership-panel-${index}`}
                  aria-label={t(open ? "collapseEntry" : "expandEntry", { title: item.title })}
                  onPointerEnter={() => setPreviewIndex(index)} onFocus={() => setPreviewIndex(index)}
                  onKeyDown={(event) => navigate(event, index)}
                  onClick={() => { setOpenIndex(open ? null : index); setPreviewIndex(index); }}>
                  <span className="leadership-entry-number" aria-hidden="true">{number(index)}</span>
                  <span className="leadership-entry-label">
                    <span className="leadership-entry-meta"><span>{item.period}</span><span>{item.type}</span></span>
                    <span className="leadership-entry-title">{item.title}</span>
                    <span className="leadership-entry-role">{item.role}</span>
                  </span>
                  <span className="disclosure-icon" aria-hidden="true">+</span>
                </button>
              </h4>
              <div className="leadership-panel" id={`leadership-panel-${index}`} role="region"
                aria-labelledby={`leadership-trigger-${index}`} aria-hidden={!open}
                onTransitionEnd={(event) => {
                  if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") ScrollTrigger.refresh();
                }}>
                <div className="leadership-panel-inner"><div className="leadership-panel-content">
                  <p>{item.desc}</p>
                  <ul className="leadership-skills" aria-label={t("keySkills")}>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
                </div></div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
