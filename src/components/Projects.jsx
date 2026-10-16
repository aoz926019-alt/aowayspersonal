import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import Magnet from "../reactbits/Magnet.jsx";
import DockTags from "../reactbits/DockTags.jsx";
import { useBorderGlowProximity } from "../reactbits/useBorderGlowProximity";
import { projects } from "../data/content.js";

export default function Projects() {
  const ref = useRef(null);
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected && dialogRef.current) {
      dialogRef.current.showModal();
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

      const cards = gsap.utils.toArray(".work-card");
      cards.forEach((card) => {
        const media = card.querySelector(".work-media");
        const reveal = card.querySelector(".reveal");
        const img = card.querySelector(".img");
        const info = card.querySelectorAll(".work-info > *");

        // image clip-reveal: paper curtain wipes upward
        gsap.fromTo(
          reveal,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 1.3,
            ease: EASE,
            scrollTrigger: { trigger: media, start: "top 80%" },
          }
        );

        // parallax only on placeholder gradient fills — real screenshots render at
        // their natural ratio (in flow), so a translate would open gaps / clip edges
        if (img && img.tagName !== "IMG") {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8, // smoothed lag instead of 1:1 scroll-tied — reads as silky, not jittery
              },
            }
          );
        }

        // info column staggers in
        gsap.from(info, {
          y: 32,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: card, start: "top 75%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

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
        <p className="section-intro">从业务问题出发，以分析、原型与研究呈现思考。点击项目，可查看完整截图与项目概览。</p>

        <div className="work-list">
          {projects.map((p, i) => (
            <article
              className={`work-card ${i % 2 === 1 ? "reverse" : ""}`}
              key={p.no}
              id={`project-${p.no}`}
            >
              <div className={`work-media ${p.image ? "has-image" : ""}`}>
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
                  <>
                    <div className={`img ${p.tint}`}>{p.media}</div>
                    <div className="reveal" />
                  </>
                )}
              </div>

              <div className="work-info">
                <div className="num">{p.no} / {String(projects.length).padStart(2, "0")}</div>
                <h3>{p.title}</h3>
                <div className="work-subtitle">{p.subtitle}</div>
                <div className="role">{p.role}</div>
                <p>{p.desc}</p>
                <div className="work-deliverable"><span>项目内容</span>{p.deliverable}</div>
                <DockTags tags={p.tags} />
                <div className="work-actions">
                  <button type="button" className="text-link" onClick={() => setSelected(p)} aria-label={`查看 ${p.title} 项目概览`}>项目概览 <span aria-hidden="true">↗</span></button>
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
            <div><span className="eyebrow">PROJECT {selected.no} / 05</span><h2 id="project-dialog-title">{selected.title}</h2><p>{selected.subtitle}</p></div>
            <button className="dialog-close" type="button" aria-label="关闭项目概览" onClick={() => dialogRef.current.close()} autoFocus>×</button>
          </div>
          <div className="project-dialog-image"><img src={selected.image} alt={`${selected.subtitle} — 完整项目截图`} width={selected.w} height={selected.h} /></div>
          <div className="project-dialog-info"><span className="eyebrow">{selected.role}</span><p>{selected.desc}</p><p className="dialog-deliverable">{selected.deliverable}</p>
            {selected.source && <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">在 GitHub 查看项目 ↗</a>}
          </div>
        </div>}
      </dialog>
    </section>
  );
}
