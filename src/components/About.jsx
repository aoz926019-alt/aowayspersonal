import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { about, profile } from "../data/content.js";

export default function About() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      // big english title reveals first, dramatically
      gsap.from(".about-title .line", {
        yPercent: 115,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".about-title", start: "top 82%" },
      });

      // portrait clip reveal + slow parallax on the inner fill
      gsap.from(".about-portrait .ph", {
        scale: 1.18,
        duration: 1.6,
        ease: EASE,
        scrollTrigger: { trigger: ".about-portrait", start: "top 85%" },
      });
      gsap.to(".about-portrait .ph", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-portrait",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8, // smoothed lag instead of 1:1 scroll-tied — reads as silky, not jittery
        },
      });

      // body paragraphs + meta rows stagger in
      gsap.from(".about-body p, .about-meta .row", {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".about-body", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="profile" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="idx">01 — PROFILE / 关于</span>
        </div>

        <h2 className="section-title about-title" style={{ marginBottom: "90px" }}>
          <span className="mask">
            <span className="line">Data first.</span>
          </span>
          <span className="mask">
            <span className="line">Then build.</span>
          </span>
        </h2>

        <div className="about-grid">
          <div className="about-portrait">
            {profile.portrait ? (
              <img
                className="ph"
                src={profile.portrait}
                alt="张敖 · Ao Zhang"
                onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
              />
            ) : (
              <div className="ph">
                <span>PORTRAIT — /public/portrait.jpg</span>
              </div>
            )}
            <div className="corner">张敖 · AO ZHANG</div>
          </div>

          <div className="about-body">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="about-meta">
              {about.meta.map((m) => (
                <div className={`row ${m.wide ? "row-wide" : ""}`} key={m.k}>
                  <span className="k">{m.k}</span>
                  <span className="v">{m.v}</span>
                </div>
              ))}
            </div>

            <div className="about-meta" style={{ marginTop: 0, borderTop: 0 }}>
              <div className="row" style={{ borderRight: 0 }}>
                <span className="k">Email</span>
                <span className="v">{profile.email}</span>
              </div>
              <div className="row">
                <span className="k">Phone</span>
                <span className="v">{profile.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
