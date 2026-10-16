import { useEffect, useRef, useState } from "react";
import { nav } from "../data/content.js";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const ref = useRef(null);
  const toggle = useRef(null);

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
    <nav className="site-nav" aria-label="主导航" ref={ref}>
      <a className="site-logo" href="#top" onClick={() => setOpen(false)} aria-label="张敖，返回首页">
        张敖<span>.</span><small>AO ZHANG</small>
      </a>
      <button className="nav-toggle" ref={toggle} type="button" aria-expanded={open}
        aria-controls="nav-links" aria-label={open ? "关闭导航" : "打开导航"} onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <ul className={`nav-links ${open ? "is-open" : ""}`} id="nav-links">
        {nav.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={active === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
