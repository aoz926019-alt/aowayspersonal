import { useRef, useLayoutEffect, useEffect, useMemo, useState } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import DockTags from "../reactbits/DockTags.jsx";
import FlexCarousel from "../reactbits/FlexCarousel.jsx";
import "./Projects.css";
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
  const carouselRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("all");
  const [activeNo, setActiveNo] = useState(projects[0].no);
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches);
  const visibleProjects = useMemo(() => projects.filter((project) => category === "all" || project.category === category), [category]);
  const carouselItems = useMemo(() => visibleProjects.map((project) => ({
    src: project.image, alt: `${project.subtitle} — 项目界面`, title: project.title,
    subtitle: project.subtitle, projectNo: project.no,
  })), [visibleProjects]);
  const activeIndex = Math.max(0, visibleProjects.findIndex((project) => project.no === activeNo));
  const activeProject = visibleProjects[activeIndex];
  const selectedIndex = visibleProjects.findIndex((project) => project.no === selected?.no);

  const focusProject = (index) => {
    const next = (index + visibleProjects.length) % visibleProjects.length;
    setActiveNo(visibleProjects[next].no);
    carouselRef.current?.goTo(next);
  };
  const openProject = (project) => {
    focusProject(visibleProjects.findIndex((item) => item.no === project.no));
    setSelected(project);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setCompact(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (selected && dialogRef.current) {
      carouselRef.current?.goTo(visibleProjects.findIndex(project => project.no === selected.no));
      if (!dialogRef.current.open) dialogRef.current.showModal();
      else document.getElementById("project-dialog-title")?.focus();
      dialogRef.current.scrollTop = 0;
    }
  }, [selected]);

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

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".project-rail-copy", { y: 10, autoAlpha: .35 },
        { y: 0, autoAlpha: 1, duration: .4, ease: "power2.out" });
    }, ref);
    return () => media.revert();
  }, [category, activeNo]);

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
        <p className="section-intro" id="project-carousel-help">从企业现金流、供应链风险到用户研究与 AI 产品。滚轮滑动、左右拖动或方向键浏览，点击项目图片查看完整画面与详情。</p>

        <div className="work-browse">
          <div className="project-filters" role="group" aria-label="按项目方向筛选">
            {projectCategories.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id}
                aria-controls="project-list" onClick={() => {
                  setCategory(item.id);
                  setActiveNo(projects.find((project) => item.id === "all" || project.category === item.id).no);
                }}>
                {item.label}<span>{String(projects.filter((project) => item.id === "all" || project.category === item.id).length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <output className="project-count" aria-live="polite" aria-atomic="true">显示 {visibleProjects.length} 个项目</output>
        </div>

        <div className="project-showcase" id="project-list">
          <div className="project-carousel-stage" data-lenis-prevent-wheel>
            <FlexCarousel
              ref={carouselRef}
              key={category}
              items={carouselItems}
              preset="liquid"
              intro={prefersReducedMotion ? "none" : "rise"}
              cardHeight={compact ? .5 : .7}
              gap={12}
              squeeze={0.2}
              focusOnClick={false}
              captions={false}
              fit="natural"
              radius={0}
              lensWidth={0.74}
              lensHeight={1.18}
              tilt={62}
              roundness={1}
              bend={0.34}
              reach={0.38}
              curl="twist"
              dispersion={0.45}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel
              onChange={(_, item) => item && setActiveNo(item.projectNo)}
              onSelect={(_, item) => openProject(visibleProjects.find((project) => project.no === item.projectNo))}
            />
            <div className="project-rail">
              <div className="project-rail-copy">
                <h3 id="active-project-title">{activeProject.title}</h3>
                <p>{activeProject.subtitle}{activeProject.note && <span className="project-demo-note">含模拟数据演示</span>}</p>
              </div>
              <nav className="project-carousel-controls" aria-label="浏览项目">
                <button type="button" onClick={() => focusProject(activeIndex - 1)} aria-label="展示上一个项目">←</button>
                <span>{String(activeIndex + 1).padStart(2, "0")} <span>/ {String(visibleProjects.length).padStart(2, "0")}</span></span>
                <button type="button" onClick={() => focusProject(activeIndex + 1)} aria-label="展示下一个项目">→</button>
              </nav>
              <button type="button" className="project-open" onClick={() => openProject(activeProject)} aria-label={`查看 ${activeProject.title} 项目概览`}>项目概览 <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </div>
      </div>
      <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" data-lenis-prevent
        onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        {selected && <div className="project-dialog-content">
          <div className="project-dialog-head">
            <span className="eyebrow">PROJECT {selected.no} / {String(projects.length).padStart(2, "0")} — {selected.title}</span>
            <button className="dialog-close" type="button" aria-label="关闭项目概览" onClick={() => dialogRef.current.close()} autoFocus>×</button>
          </div>
          <div className="project-dialog-layout">
            <div className="project-dialog-image">{selected.image ? <>
              <a href={selected.image} target="_blank" rel="noreferrer" aria-label={`查看 ${selected.title} 原尺寸图片`}><img src={selected.image} alt={`${selected.subtitle} — 完整项目截图`} width={selected.w} height={selected.h} /></a>
              <span className="project-image-hint">完整项目画面 · 点击查看原图 ↗</span>
            </> : <ProjectSummary project={selected} />}</div>
            <div className="project-dialog-info work-info">
              <div className="num">{selected.no} / {String(projects.length).padStart(2, "0")}</div>
              <h2 id="project-dialog-title" tabIndex={-1}>{selected.title}</h2>
              <div className="work-subtitle">{selected.subtitle}</div>
              <div className="role">{selected.role}</div>
              <div className="work-context">{selected.context}</div>
              <p>{selected.desc}</p>
              {selected.note && <p className="work-note">{selected.note}</p>}
              <div className="work-deliverable"><span>项目内容</span>{selected.deliverable}</div>
              <DockTags tags={selected.tags} />
              <div className="work-actions">
                {selected.demo && <a className="text-link" href={selected.demo} target="_blank" rel="noreferrer">体验原型 <span aria-hidden="true">↗</span></a>}
                {selected.source && <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </div>
          <nav className="project-pager" aria-label="项目切换">
            <button type="button" disabled={selectedIndex <= 0} onClick={() => openProject(visibleProjects[selectedIndex - 1])}>← 上一个项目</button>
            <span>{selectedIndex + 1} / {visibleProjects.length}</span>
            <button type="button" disabled={selectedIndex >= visibleProjects.length - 1} onClick={() => openProject(visibleProjects[selectedIndex + 1])}>下一个项目 →</button>
          </nav>
        </div>}
      </dialog>
    </section>
  );
}
