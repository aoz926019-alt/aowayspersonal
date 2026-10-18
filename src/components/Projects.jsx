import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import Magnet from "../reactbits/Magnet.jsx";
import DockTags from "../reactbits/DockTags.jsx";
import { useBorderGlowProximity } from "../reactbits/useBorderGlowProximity";
import { projects, projectCategories } from "../data/content.js";

function ProjectSummary({ project }) {
  const summary = project.summary;
  return (
    <span className="project-summary">
      <span className="summary-label">{summary.label} <span>研究概览 / {project.no}</span></span>
      <span className="summary-title">{summary.title}</span>
      {summary.metrics && <span className="summary-metrics">{summary.metrics.map((metric) => (
        <span key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></span>
      ))}</span>}
      {summary.steps && <span className="summary-steps">{summary.steps.map((step, index) => (
        <span key={step}><small>0{index + 1}</small>{step}</span>
      ))}</span>}
      <span className="summary-footer">{summary.footer}</span>
    </span>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("all");
  const visibleProjects = projects.filter((project) => category === "all" || project.category === category);
  const selectedIndex = visibleProjects.findIndex((project) => project.no === selected?.no);

  useEffect(() => {
    if (selected && dialogRef.current) {
      if (!dialogRef.current.open) dialogRef.current.showModal();
      else document.getElementById("project-dialog-title")?.focus();
      dialogRef.current.scrollTop = 0;
    }
  }, [selected]);

  // light-friendly edge glow that lights up as the cursor approaches each image
  useBorderGlowProximity(ref, ".work-frame");

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      // section title
      gsap.from(".work-title .line", {
        yPercent: 115,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".work-title", start: "top 82%" },
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [category]);

  return (
    <section className="section" id="work" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="idx">
            <DecryptedText
              text="02 — SELECTED WORK / 精选项目"
              animateOn="view"
              sequential
              speed={32}
              encryptedClassName="decrypt-scramble"
            />
          </span>
        </div>

        <h2 className="section-title work-title">
          <span className="mask">
            <span className="line">Selected</span>
          </span>
          <span className="mask">
            <span className="line">Work</span>
          </span>
        </h2>
        <p className="section-intro">从招聘与供应链数据，到企业现金流、用户研究和 AI 原型。点击项目，查看研究概览或产品界面。</p>

        <div className="work-browse">
          <div className="project-filters" role="group" aria-label="按项目方向筛选">
            {projectCategories.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id}
                aria-controls="project-list" onClick={() => setCategory(item.id)}>
                {item.label}<span>{String(projects.filter((project) => item.id === "all" || project.category === item.id).length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <output className="project-count" aria-live="polite" aria-atomic="true">显示 {visibleProjects.length} 个项目</output>
        </div>

        <div className="work-list" id="project-list">
          {visibleProjects.map((p, i) => (
            <article
              className={`work-card ${i % 2 === 1 ? "reverse" : ""}`}
              key={p.no}
              id={`project-${p.no}`}
            >
              <div className={`work-media ${p.image ? "has-image" : "has-summary"} ${p.h > p.w ? "portrait-media" : ""}`}>
                {p.image ? (
                  <Magnet
                    padding={90}
                    magnetStrength={5}
                    disabled={prefersReducedMotion}
                    wrapperClassName="work-magnet"
                    innerClassName="work-magnet-inner"
                    style={{ position: "relative", display: "block", width: "100%" }}
                  >
                    <button className="work-frame" type="button" onClick={() => setSelected(p)} aria-label={`查看 ${p.title} 项目截图与概览`}>
                      <span className="work-frame-clip">
                        <img
                          className="img"
                          src={p.image}
                          alt={`${p.subtitle} — 项目界面`}
                          width={p.w}
                          height={p.h}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="reveal" />
                      </span>
                      <span className="work-blade" aria-hidden="true" />
                      <span className="work-zoom" aria-hidden="true">查看项目 ↗</span>
                    </button>
                  </Magnet>
                ) : (
                  <button className="work-frame" type="button" onClick={() => setSelected(p)} aria-label={`查看 ${p.title} 研究概览`}>
                    <ProjectSummary project={p} />
                    <span className="work-zoom" aria-hidden="true">查看项目 ↗</span>
                  </button>
                )}
              </div>

              <div className="work-info">
                <div className="num">{p.no} / {String(projects.length).padStart(2, "0")}</div>
                <h3>{p.title}</h3>
                <div className="work-subtitle">{p.subtitle}</div>
                <div className="role">{p.role}</div>
                <div className="work-context">{p.context}</div>
                <p>{p.teaser}</p>
                {p.note && <p className="work-note">{p.note}</p>}
                <div className="work-deliverable"><span>项目内容</span>{p.deliverable}</div>
                <DockTags tags={p.tags} />
                <div className="work-actions">
                  <button type="button" className="text-link" onClick={() => setSelected(p)} aria-label={`查看 ${p.title} 项目概览`}>项目概览 <span aria-hidden="true">↗</span></button>
                  {p.demo && <a className="text-link" href={p.demo} target="_blank" rel="noreferrer">体验原型 <span aria-hidden="true">↗</span></a>}
                  {p.source && <a className="text-link muted" href={p.source} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" data-lenis-prevent
        onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        {selected && <div className="project-dialog-content">
          <div className="project-dialog-head">
            <div><span className="eyebrow">PROJECT {selected.no} / {String(projects.length).padStart(2, "0")}</span><h2 id="project-dialog-title" tabIndex={-1}>{selected.title}</h2><p>{selected.subtitle}</p></div>
            <button className="dialog-close" type="button" aria-label="关闭项目概览" onClick={() => dialogRef.current.close()} autoFocus>×</button>
          </div>
          <div className="project-dialog-image">{selected.image ? <img src={selected.image} alt={`${selected.subtitle} — 完整项目截图`} width={selected.w} height={selected.h} /> : <ProjectSummary project={selected} />}</div>
          <div className="project-dialog-info"><span className="eyebrow">{selected.role}</span><p className="work-context">{selected.context}</p><p>{selected.desc}</p>{selected.note && <p className="work-note">{selected.note}</p>}<p className="dialog-deliverable">{selected.deliverable}</p>
            {selected.demo && <a className="text-link dialog-demo" href={selected.demo} target="_blank" rel="noreferrer">体验 PWA 原型 ↗</a>}
            {selected.source && <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">在 GitHub 查看项目 ↗</a>}
          </div>
          <nav className="project-pager" aria-label="项目切换">
            <button type="button" disabled={selectedIndex <= 0} onClick={() => setSelected(visibleProjects[selectedIndex - 1])}>← 上一个项目</button>
            <span>{selectedIndex + 1} / {visibleProjects.length}</span>
            <button type="button" disabled={selectedIndex >= visibleProjects.length - 1} onClick={() => setSelected(visibleProjects[selectedIndex + 1])}>下一个项目 →</button>
          </nav>
        </div>}
      </dialog>
    </section>
  );
}
