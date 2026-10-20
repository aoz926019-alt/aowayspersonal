import { useRef, useLayoutEffect, useEffect, useMemo, useState } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import DockTags from "../reactbits/DockTags.jsx";
import FlexCarousel from "../reactbits/FlexCarousel.jsx";
import "./Projects.css";
import { useLanguage } from "../hooks/useLanguage.js";

function ProjectSummary({ project }) {
  const { t } = useLanguage();
  const summary = project.summary;
  return (
    <span className="project-summary">
      <span className="summary-label">{summary.label} <span>{t("summary")} / {project.no}</span></span>
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
  const { language, t, content: { projects, projectCategories } } = useLanguage();
  const ref = useRef(null);
  const dialogRef = useRef(null);
  const carouselRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("all");
  const [activeNo, setActiveNo] = useState(projects[0].no);
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches);
  const visibleProjects = useMemo(() => projects.filter((project) => category === "all" || project.category === category), [category, projects]);
  const carouselItems = useMemo(() => visibleProjects.map((project) => ({
    src: project.image, alt: t("projectImage", { title: project.subtitle }), title: project.title,
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
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: ".work-title", start: "top 90%", once: true },
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo(".project-rail-copy", { y: 8, autoAlpha: .6 }, { y: 0, autoAlpha: 1, duration: .4 })
        .fromTo(".project-skill", { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: .3, stagger: .035 }, .06);
    }, ref);
    return () => media.revert();
  }, [category, activeNo]);

  return (
    <section className="section" id="work" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="section-rule-track" aria-hidden="true" />
          <span className="idx">
            <DecryptedText
              key={language} text={t("workLabel")}
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
        <p className="section-intro" id="project-carousel-help">{t("workIntro")}</p>

        <div className="work-browse">
          <div className="project-filters" role="group" aria-label={t("filterProjects")}>
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
          <output className="project-count" aria-live="polite" aria-atomic="true">{t("projectCount", { count: visibleProjects.length })}</output>
        </div>

        <div className="project-showcase" id="project-list">
          <div className="project-carousel-stage" data-lenis-prevent-wheel>
            <FlexCarousel
              ref={carouselRef}
              key={category}
              items={carouselItems}
              labels={{ region: t("carouselLabel"), open: title => t("openOverview", { title }), status: (title, index, count) => t("carouselStatus", { title, index, count }) }}
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
                <div className="project-rail-heading">
                  <h3 id="active-project-title">{activeProject.title}</h3>
                  <ul className="project-skills" aria-label={t("projectSkills", { title: activeProject.title })}>
                    {activeProject.skills.map((skill) => <li className="project-skill" key={skill}>{skill}</li>)}
                  </ul>
                </div>
                <p>{activeProject.subtitle}{activeProject.note && <span className="project-demo-note">{t("demoNote")}</span>}</p>
              </div>
              <nav className="project-carousel-controls" aria-label={t("browse")}>
                <button type="button" onClick={() => focusProject(activeIndex - 1)} aria-label={t("previous")}>←</button>
                <span>{String(activeIndex + 1).padStart(2, "0")} <span>/ {String(visibleProjects.length).padStart(2, "0")}</span></span>
                <button type="button" onClick={() => focusProject(activeIndex + 1)} aria-label={t("next")}>→</button>
              </nav>
              <button type="button" className="project-open" onClick={() => openProject(activeProject)} aria-label={t("openOverview", { title: activeProject.title })}>{t("overview")} <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </div>
      </div>
      <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" data-lenis-prevent
        onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        {selected && <div className="project-dialog-content">
          <div className="project-dialog-head">
            <span className="eyebrow">PROJECT {selected.no} / {String(projects.length).padStart(2, "0")} — {selected.title}</span>
            <button className="dialog-close" type="button" aria-label={t("closeOverview")} onClick={() => dialogRef.current.close()} autoFocus>×</button>
          </div>
          <div className="project-dialog-layout">
            <div className="project-dialog-image">{selected.image ? <>
              <a href={selected.image} target="_blank" rel="noreferrer" aria-label={t("fullImage", { title: selected.title })}><img src={selected.image} alt={t("imageAlt", { title: selected.subtitle })} width={selected.w} height={selected.h} /></a>
              <span className="project-image-hint">{t("imageHint")}</span>
            </> : <ProjectSummary project={selected} />}</div>
            <div className="project-dialog-info work-info">
              <div className="num">{selected.no} / {String(projects.length).padStart(2, "0")}</div>
              <h2 id="project-dialog-title" tabIndex={-1}>{selected.title}</h2>
              <div className="work-subtitle">{selected.subtitle}</div>
              <div className="role">{selected.role}</div>
              <div className="work-context">{selected.context}</div>
              <p>{selected.desc}</p>
              {selected.note && <p className="work-note">{selected.note}</p>}
              <div className="work-deliverable"><span>{t("deliverables")}</span>{selected.deliverable}</div>
              <DockTags tags={selected.tags} />
              <div className="work-actions">
                {selected.demo && <a className="text-link" href={selected.demo} target="_blank" rel="noreferrer">{t("tryDemo")} <span aria-hidden="true">↗</span></a>}
                {selected.source && <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </div>
          <nav className="project-pager" aria-label={t("projectSwitch")}>
            <button type="button" disabled={selectedIndex <= 0} onClick={() => openProject(visibleProjects[selectedIndex - 1])}>← {t("previousProject")}</button>
            <span>{selectedIndex + 1} / {visibleProjects.length}</span>
            <button type="button" disabled={selectedIndex >= visibleProjects.length - 1} onClick={() => openProject(visibleProjects[selectedIndex + 1])}>{t("nextProject")} →</button>
          </nav>
        </div>}
      </dialog>
    </section>
  );
}
