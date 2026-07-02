import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { profile } from "../data/content.js";

export default function Contact() {
  const ref = useRef(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-title .line", {
        yPercent: 115,
        duration: 1.4,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact", start: "top 70%" },
      });
      gsap.from(".contact-mail, .contact-links .item", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-mail", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="shell">
        <span className="eyebrow">05 — CONTACT / 联系</span>
        <h2 className="contact-title">
          <span className="mask">
            <span className="line">Let's</span>
          </span>
          <span className="mask">
            <span className="line">talk.</span>
          </span>
        </h2>

        <a className="contact-mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="contact-links">
          <div className="item">
            <span className="k">Phone</span>
            <span className="v">{profile.phone}</span>
          </div>
          <div className="item">
            <span className="k">Location</span>
            <span className="v">{profile.location}</span>
          </div>
          <div className="item">
            <span className="k">Website</span>
            <a className="v" href={profile.website} target="_blank" rel="noreferrer">
              Personal site ↗
            </a>
          </div>
          <div className="item">
            <span className="k">GitHub</span>
            <a className="v" href={profile.github} target="_blank" rel="noreferrer">
              @aoz926019-alt ↗
            </a>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="contact-foot">
          <span>© {year} 张敖 · AO ZHANG</span>
          <span>Business Analytics & Product</span>
        </div>
      </div>
    </section>
  );
}
