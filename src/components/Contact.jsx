import { useRef, useLayoutEffect, useEffect, useState, lazy, Suspense } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import Magnet from "../reactbits/Magnet.jsx";
import "./Contact.css";

const FloatingLines = lazy(() => import("../reactbits/FloatingLines.jsx"));
const lineColors = ["#b8ef9d", "#6ccbb5", "#6598b5"];
const waves = ["top", "middle", "bottom"];
const lineCounts = [5, 7, 4];
const lineDistances = [8, 6, 9];
const topWave = { x: 1.5, y: .3, rotate: -.6 };
const middleWave = { x: .7, y: -.25, rotate: .65 };
const bottomWave = { x: 1.8, y: -.7, rotate: -.8 };

function ContactIcon({ type }) {
  return <svg className="contact-tile-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {type === "phone" && <path d="M7 3H4v4c0 7 6 13 13 13h4v-4l-5-2-2 3c-3-1-5-3-6-6l3-2Z" />}
    {type === "location" && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
    {type === "work" && <><rect x="3" y="5" width="18" height="15" rx="1" /><path d="M3 10h18M8 5V3h8v2M8 14h8" /></>}
    {type === "code" && <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" />}
  </svg>;
}

export default function Contact() {
  const { language, t, content: { profile } } = useLanguage();
  const ref = useRef(null);
  const year = new Date().getFullYear();
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); observer.disconnect(); }
    }, { rootMargin: "500px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: ref.current, start: "top bottom", end: "bottom top",
        toggleClass: { targets: ref.current, className: "contact-visible" } });
      gsap.from(".contact-title .line", {
        yPercent: 115,
        duration: 1.4,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".contact-mail, .contact-links .item", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-mail", start: "top 85%" },
      });
      gsap.from(".contact-orbit", { scale: .6, opacity: 0, rotate: -45, duration: 1.5, ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 65%" } });
      gsap.from(".send-fold", { strokeDashoffset: 1, duration: 1.4, ease: "power2.inOut",
        scrollTrigger: { trigger: ".contact-orbit", start: "top 82%", once: true } });
      gsap.fromTo(".contact-motion", { yPercent: 8 }, { yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact contact--motion" id="contact" ref={ref}>
      <div className="contact-bg" aria-hidden="true" />
      <div className="contact-motion" aria-hidden="true">
        <div className="contact-aurora" />
        {nearby && <Suspense fallback={null}><FloatingLines linesGradient={lineColors} enabledWaves={waves}
          lineCount={lineCounts} lineDistance={lineDistances} topWavePosition={topWave}
          middleWavePosition={middleWave} bottomWavePosition={bottomWave} animationSpeed={.7}
          bendRadius={3.5} bendStrength={-.7} parallaxStrength={.18} maxDpr={1.25} /></Suspense>}
      </div>

      <div className="shell">
        <span className="eyebrow">
          <DecryptedText
            key={language} text={t("contactLabel")}
            animateOn="view"
            sequential
            speed={34}
            encryptedClassName="decrypt-scramble"
          />
        </span>
        <div className="contact-heading-layout"><h2 className="contact-title">
          <span className="mask">
            <span className="line">Let's</span>
          </span>
          <span className="mask">
            <span className="line">talk.</span>
          </span>
        </h2><div className="contact-orbit"><Magnet padding={50} magnetStrength={7} disabled={prefersReducedMotion}>
          <a className="contact-orbit-link" href={`mailto:${profile.email}`} aria-label={t("sendMail", { email: profile.email })}>
            <svg viewBox="0 0 180 180" aria-hidden="true"><defs><path id="contact-text-circle" d="M 90,90 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0" /></defs><text><textPath href="#contact-text-circle" textLength="452">LET'S TALK · SAY HELLO · LET'S TALK · SAY HELLO · </textPath></text></svg>
            <span aria-hidden="true"><svg className="contact-send-mark" viewBox="0 0 64 64" fill="none"><path d="M9 29L55 9L35 55L27 36Z" /><path className="send-fold" pathLength="1" d="M27 36L55 9" /></svg></span>
          </a>
        </Magnet></div></div>
        <p className="contact-intro">{t("contactIntro")}</p>

        <a className="contact-mail" href={`mailto:${profile.email}`} aria-label={profile.email}>
          {Array.from(profile.email).map((char, index) => <span aria-hidden="true" key={index} style={{ "--char-index": index }}>{char}</span>)}
        </a>

        <div className="contact-links">
          <div className="item">
            <span className="k"><ContactIcon type="phone" />Phone<small aria-hidden="true">01</small></span>
            <a className="v" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>
          <div className="item">
            <span className="k"><ContactIcon type="location" />Location<small aria-hidden="true">02</small></span>
            <span className="v">{profile.location}</span>
          </div>
          <div className="item">
            <span className="k"><ContactIcon type="work" />Explore<small aria-hidden="true">03</small></span>
            <a className="v" href="#work">
              {t("explore")} ↗
            </a>
          </div>
          <div className="item">
            <span className="k"><ContactIcon type="code" />GitHub<small aria-hidden="true">04</small></span>
            <a className="v" href={profile.github} target="_blank" rel="noreferrer">
              @aoz926019-alt ↗
            </a>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="contact-foot">
          <span>© {year} {t("copyright")}</span>
          <a href="#top">{t("backTop")}<svg className="contact-top-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="12" /><path d="M14 20V8M9 13L14 8L19 13" /></svg></a>
        </div>
      </div>
    </section>
  );
}
