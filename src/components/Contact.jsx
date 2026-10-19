import { useRef, useLayoutEffect, useEffect, useState, lazy, Suspense } from "react";
import { gsap, prefersReducedMotion, EASE } from "../hooks/gsap";
import DecryptedText from "../reactbits/DecryptedText.jsx";
import { profile } from "../data/content.js";
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

export default function Contact() {
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
            text="05 — CONTACT / 联系"
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
          <a className="contact-orbit-link" href={`mailto:${profile.email}`} aria-label={`发送邮件至 ${profile.email}`}>
            <svg viewBox="0 0 180 180" aria-hidden="true"><defs><path id="contact-text-circle" d="M 90,90 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0" /></defs><text><textPath href="#contact-text-circle" textLength="452">LET'S TALK · SAY HELLO · LET'S TALK · SAY HELLO · </textPath></text></svg>
            <span aria-hidden="true">↗</span>
          </a>
        </Magnet></div></div>
        <p className="contact-intro">欢迎交流商业分析、AI 产品与项目合作。</p>

        <a className="contact-mail" href={`mailto:${profile.email}`} aria-label={profile.email}>
          {Array.from(profile.email).map((char, index) => <span aria-hidden="true" key={index} style={{ "--char-index": index }}>{char}</span>)}
        </a>

        <div className="contact-links">
          <div className="item">
            <span className="k">Phone</span>
            <a className="v" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>
          <div className="item">
            <span className="k">Location</span>
            <span className="v">{profile.location}</span>
          </div>
          <div className="item">
            <span className="k">Explore</span>
            <a className="v" href="#work">
              精选项目 ↗
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
          <a href="https://github.com/aoz926019-alt/aowayspersonal" target="_blank" rel="noreferrer">本页源码 · React / GSAP ↗</a>
          <a href="#top">返回顶部 ↑</a>
        </div>
      </div>
    </section>
  );
}
