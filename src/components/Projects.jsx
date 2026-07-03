import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { useMagicGlow } from "../reactbits/useMagicGlow";
import { projects } from "../data/content.js";

export default function Projects() {
  const ref = useRef(null);

  // MagicBento-style cursor glow + hover particles + click ripple on each image frame
  useMagicGlow(ref, ".work-media");

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

        <h2 className="section-title work-title" style={{ marginBottom: "110px" }}>
          <span className="mask">
            <span className="line">Selected</span>
          </span>
          <span className="mask">
            <span className="line">Work</span>
          </span>
        </h2>

        <div className="work-list">
          {projects.map((p, i) => (
            <article
              className={`work-card ${i % 2 === 1 ? "reverse" : ""}`}
              key={p.no}
            >
              <div className={`work-media ${p.image ? "has-image" : ""}`}>
                {p.image ? (
                  <img
                    className="img"
                    src={p.image}
                    alt={p.title}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
                  />
                ) : (
                  <div className={`img ${p.tint}`}>{p.media}</div>
                )}
                <div className="reveal" />
              </div>

              <div className="work-info">
                <div className="num">{p.no} / {String(projects.length).padStart(2, "0")}</div>
                <h3>{p.title}</h3>
                <div className="role">{p.role}</div>
                <p>{p.desc}</p>
                <div className="work-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
