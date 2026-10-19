import { useRef, useLayoutEffect, useState, lazy, Suspense } from "react";
import { gsap, prefersReducedMotion } from "../hooks/gsap";
import { profile, projects } from "../data/content.js";
import "./Hero.css";

const RippleGrid = lazy(() => import("../reactbits/RippleGrid.jsx"));
const canAnimateBackground = !prefersReducedMotion && typeof window !== "undefined" &&
  window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches;
const featured = [
  { label: "DATA", project: projects[1], caption: "从运输记录到供应链风险看板", metric: "113,097", unit: "条运输记录", tools: "Python / MySQL / Power BI" },
  { label: "PRODUCT", project: projects[4], caption: "从用户需求到可测试 PWA", metric: "PWA", unit: "可体验的产品原型", tools: "PRD / AI Assistant / PWA" },
  { label: "FINANCE", project: projects[0], caption: "从年报原页到现金流分析", metric: "09", unit: "份年报 · 三家港股车企", tools: "MySQL / Excel / Financial Analysis" },
];

export default function Hero({ onPreview }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const item = featured[active];

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".studio-meta", { y: 10, opacity: 0, duration: .6 })
        .from(".studio-copy > *", { y: 28, opacity: 0, stagger: .08, duration: .75 }, "-=.3")
        .from(".build-preview", { y: 35, opacity: 0, rotate: 2, duration: 1 }, "-=.7")
        .from(".studio-name .line", { yPercent: 110, duration: 1.1 }, "-=.7")
        .from(".studio-bottom", { opacity: 0, duration: .6 }, "-=.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header className="hero hero--studio" id="top" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        {canAnimateBackground && <Suspense fallback={null}><RippleGrid color="#b8f58b"
          cellSize={48} glow={0.4} rippleStrength={0.8} autoRipple="none" intro={false}
          fade={0.35} opacity={0.85} dpr={1.5} /></Suspense>}
      </div>
      <div className="shell studio-shell">
        <div className="studio-meta"><span><i /> BUSINESS ANALYTICS & AI PRODUCT</span><span>MACAU, CHINA <span className="meta-divider">/</span> PORTFOLIO 2026</span></div>
        <div className="studio-composition">
          <div className="studio-copy">
            <p className="studio-intro">你好，我是张敖。<span>ANALYST. THINKER. BUILDER.</span></p>
            <h2>读懂数据。<br /><span>让想法成为产品。</span></h2>
            <p className="studio-description">香港大学商业分析硕士研0 · 澳门大学大四在读。<br />用代码连接数据、业务与用户，交付看板、研究和可用原型。</p>
            <div className="studio-actions">
              <a className="studio-primary" href="#work">探索我的项目 <span aria-hidden="true">↗</span></a>
              <a className="studio-secondary" href="#lab">试试代码实验 <span aria-hidden="true">↓</span></a>
            </div>
            <div className="studio-stack"><span>Python</span><span>SQL</span><span>Power BI</span><span>AI / PWA</span></div>
          </div>
          <div className="build-preview">
            <div className="build-preview-top"><span><b /> SELECTED BUILD</span><span>0{active + 1} / 03</span></div>
            <div className="build-preview-tabs" role="group" aria-label="预览项目方向">
              {featured.map((entry, index) => <button key={entry.label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{entry.label}<span aria-hidden="true">↗</span></button>)}
            </div>
            <button className="build-image" type="button" onClick={() => onPreview(item.project)} aria-label={`查看 ${item.project.title} 项目详情`}><img key={item.label} src={item.project.image} alt={item.project.subtitle} width={item.project.w} height={item.project.h} fetchpriority="high" /></button>
            <div className="build-preview-info" aria-live="polite" aria-atomic="true"><div><strong>{item.metric}</strong><span>{item.unit}</span></div><p>{item.caption}<small>{item.tools}</small></p></div>
            <div className="build-preview-foot"><span>INPUT → ANALYSIS → IMPACT</span><button type="button" onClick={() => onPreview(item.project)} aria-label={`打开 ${item.project.title} 项目概览`}>查看项目 ↗</button></div>
          </div>
        </div>
        <h1 className="studio-name" aria-label="张敖 AO ZHANG"><span className="mask"><span className="line">AO ZHANG<span className="name-period">.</span></span></span><span className="name-side" aria-hidden="true">张 敖<br />个人作品集</span></h1>
        <div className="studio-bottom"><span>DATA-DRIVEN THINKING. HANDS-ON BUILDING.</span><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#work">向下探索 <span aria-hidden="true">↓</span></a></div>
      </div>
    </header>
  );
}
