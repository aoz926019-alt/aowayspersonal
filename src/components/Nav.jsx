import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage.js";
import { gsap } from "../hooks/gsap";

export default function Nav() {
  const { language, selectLanguage, t, content: { nav } } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const ref = useRef(null);
  const toggle = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".nav-progress", { scaleX: 0 }, { scaleX: 1, ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: .2 },
      });
    }, ref);
    return () => media.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: "-15% 0px -65% 0px" });
    ["top", ...nav.map((item) => item.href.slice(1))].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      } else if (event.type === "pointerdown" && !ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [open]);

  return (
    <nav className="site-nav" aria-label={t("mainNav")} ref={ref}>
      <span className="nav-progress" aria-hidden="true" />
      <a className="site-logo" href="#top" onClick={() => setOpen(false)} aria-label={t("home")}>
        {t("logo")}<span>.</span>{language === "zh" && <small>AO ZHANG</small>}
      </a>
      <ul className={`nav-links ${open ? "is-open" : ""}`} id="nav-links">
        {nav.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={active === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}>{item.label}</a>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <div className="language-switch" role="group" aria-label={t("language")} data-language={language}>
          <button type="button" aria-pressed={language === "zh"} aria-label={t("selectChinese")} onClick={() => { setOpen(false); selectLanguage("zh"); }}>CN</button>
          <button type="button" aria-pressed={language === "en"} aria-label={t("selectEnglish")} onClick={() => { setOpen(false); selectLanguage("en"); }}>EN</button>
        </div>
        <button className="nav-toggle" ref={toggle} type="button" aria-expanded={open}
          aria-controls="nav-links" aria-label={t(open ? "closeNav" : "openNav")} onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
    </nav>
  );
}
