import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

// Single Lenis instance for the whole page. Driven off GSAP's ticker so
// smooth scrolling and every ScrollTrigger stay on the same clock (no
// double-rAF drift, no jitter between the parallax and the scroll).

let lenis = null;
let rafHandler = null;

const NAV_OFFSET = -90; // stop this far above an anchor so the fixed pill nav doesn't cover it

export function startSmoothScroll() {
  if (prefersReducedMotion || lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    // expo-out — matches the site's --ease feel; long, silky, no bounce
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: { offset: NAV_OFFSET },
  });

  lenis.on("scroll", ScrollTrigger.update);

  rafHandler = (time) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function stopSmoothScroll() {
  if (rafHandler) {
    gsap.ticker.remove(rafHandler);
    rafHandler = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: "smooth" });
}
