import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import { about, profile } from "../data/content.js";
import { scrollToId } from "../hooks/smoothScroll";
import ProfileCard from "../reactbits/ProfileCard.jsx";
import DecryptedText from "../reactbits/DecryptedText.jsx";

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

      // the portrait card handles its own entrance/tilt animation (ProfileCard) —
      // just fade the wrapper in on scroll so it doesn't pop
      gsap.from(".pc-card-wrapper", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-portrait", start: "top 85%" },
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

  const scrollToContact = () => scrollToId("contact");

  return (
    <section className="section" id="profile" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="idx">
            <DecryptedText
              text="01 — PROFILE / 关于"
              animateOn="view"
              sequential
              speed={38}
              encryptedClassName="decrypt-scramble"
            />
          </span>
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
            <ProfileCard
              avatarUrl={profile.portrait}
              name="张敖"
              title={profile.role}
              handle="aoz926019-alt"
              status={profile.available}
              contactText="联系我"
              onContactClick={scrollToContact}
            />
          </div>

          <div className="about-body">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="about-meta">
              {about.meta.map((m) => (
                <div className="row" key={m.k}>
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
