import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "../hooks/gsap";
import { useLanguage } from "../hooks/useLanguage.js";
import { scrollToId } from "../hooks/smoothScroll";
import ProfileCard from "../reactbits/ProfileCard.jsx";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import ParticleSignature from "./ParticleSignature.jsx";
import CountUp from "../reactbits/CountUp.jsx";
import "./About.css";

export default function About() {
  const { language, t, content: { about, profile, education, stats } } = useLanguage();
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-title .line", {
        yPercent: 115,
        duration: 1,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: ".about-title", start: "top 90%", once: true },
      });

      // the portrait card handles its own entrance/tilt animation (ProfileCard) —
      // just fade the wrapper in on scroll so it doesn't pop
      gsap.from(".pc-card-wrapper", {
        opacity: 0,
        y: 16,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-portrait", start: "top 90%", once: true },
      });

      gsap.utils.toArray(".about-body > p, .education-item").forEach((item) => {
        gsap.from(item, {
          y: 16, opacity: 0, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
        });
      });
      gsap.from(".stat-accent", { scaleX: 0, transformOrigin: "left", duration: .9,
        stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".profile-stats", start: "top 90%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => scrollToId("contact");

  return (
    <section className="section" id="profile" ref={ref}>
      <div className="shell">
        <div className="section-rule">
          <span className="section-rule-track" aria-hidden="true" />
          <span className="idx">
            <DecryptedText
              key={language} text={t("profileLabel")}
              animateOn="view"
              sequential
              speed={38}
              encryptedClassName="decrypt-scramble"
            />
          </span>
        </div>

        <div className="profile-heading"><h2 className="section-title about-title">
          <span className="mask">
            <span className="line">Data first.</span>
          </span>
          <span className="mask">
            <span className="line">Then build.</span>
          </span>
        </h2><ParticleSignature /></div>

        <div className="profile-stats">{stats.map((stat, index) => <div className="profile-stat" key={index}>
          <span className="stat-accent" aria-hidden="true" /><span className="stat-index" aria-hidden="true">0{index + 1}</span>
          <strong aria-label={`${stat.value}${stat.suffix}`}><span aria-hidden="true">{prefersReducedMotion ? stat.value : <CountUp to={stat.value} duration={1.2} />}{stat.suffix}</span></strong>
          <span className="stat-label">{stat.lab}</span>
        </div>)}</div>
        <div className="about-grid">
          <div className="about-portrait">
            <ProfileCard
              avatarUrl={profile.portrait}
              name={t("name")}
              title={profile.role}
              handle="aoz926019-alt"
              status={profile.available}
              contactText={t("portraitContact")}
              onContactClick={scrollToContact}
              enableTilt={!prefersReducedMotion}
            />
          </div>

          <div className="about-body">
            {about.body.map((p, i) => (
              <p className={i === 0 ? "about-lead" : "about-practice"} key={i}>{p}</p>
            ))}

            <div className="education-list" aria-labelledby="education-title">
              <h3 id="education-title">{t("education")} <span>{t("educationCaption")}</span></h3>
              {education.map((item, index) => (
                <div className="education-item" key={index}>
                  <span className="education-seal" aria-hidden="true"><span>{["HKU", "UM", "KU"][index]}</span><i /></span>
                  <div className="education-copy"><div className="education-topline"><h4>{item.school}</h4><span className="education-period">{item.period}</span></div>
                    <p>{item.program}</p><span className="education-location"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 6.5C13 10 8 14 8 14S3 10 3 6.5a5 5 0 1 1 10 0Z" /><circle cx="8" cy="6.5" r="1.5" /></svg>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <details className="profile-credentials" onToggle={() => ScrollTrigger.refresh()}>
              <summary>{t("credentials")} <span className="disclosure-count">{t("itemCount", { count: about.meta.length })}</span><span className="disclosure-icon" aria-hidden="true">+</span></summary>
              <div className="about-meta">
              {about.meta.map((m, index) => (
                <div className="row" key={m.k}>
                  <span className="k"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 2.5h7l3 3V17H5Z M12 2.5V6h3 M8 9h4 M8 12h4" /></svg>{m.k}<small>0{index + 1}</small></span>
                  <span className="v">{m.v}</span>
                </div>
              ))}
              </div>
            </details>

            <div className="about-meta profile-contact">
              <div className="row">
                <span className="k">Email</span>
                <a className="v" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a>
              </div>
              <div className="row">
                <span className="k">Phone</span>
                <a className="v" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}<span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
