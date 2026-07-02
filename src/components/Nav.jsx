import { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, EASE_SOFT } from "../hooks/gsap";
import { nav, profile } from "../data/content.js";

export default function Nav() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-inner > *", {
        y: -22,
        opacity: 0,
        duration: 1,
        ease: EASE_SOFT,
        stagger: 0.08,
        delay: 1.5, // let the hero opening lead
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <nav className="nav" ref={ref}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          张敖<span>.</span>
        </a>
        <div className="nav-links">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href={`mailto:${profile.email}`}>
          Get in touch
        </a>
      </div>
    </nav>
  );
}
