import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export function scrollToPosition(top) {
  if (lenis) lenis.scrollTo(top, { immediate: true });
  else window.scrollTo({ top, behavior: "instant" });
}

// Single Lenis instance for the whole page. Driven off GSAP's ticker so
// smooth scrolling and every ScrollTrigger stay on the same clock (no
// double-rAF drift, no jitter between the parallax and the scroll).

let lenis = null;
let rafHandler = null;

function syncNativeAnchor() {
  lenis?.reset(); // Native history may already have moved the viewport; discard the old animated position.
  const target = document.getElementById(window.location.hash.slice(1));
  lenis?.scrollTo(target || window.scrollY, { immediate: true });
}

function onAnchorClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!link || link.hasAttribute("download") || (link.getAttribute("target") && link.getAttribute("target") !== "_self")) return;
  const url = new URL(link.getAttribute("href"), window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
  const target = document.getElementById(url.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (url.hash !== window.location.hash) window.history.pushState(window.history.state, "", url);
  lenis.scrollTo(target, { onComplete: () => {
    if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  } });
}

export function startSmoothScroll() {
  if (prefersReducedMotion || lenis) return lenis;

  lenis = new Lenis({
    duration: .95,
    // expo-out — matches the site's --ease feel; long, silky, no bounce
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: false, // One delegated handler owns anchor scrolling and respects prevented clicks.
  });

  lenis.on("scroll", ScrollTrigger.update);

  rafHandler = (time) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);
  // Native fragment navigation must replace any previous smooth-scroll destination.
  window.addEventListener("hashchange", syncNativeAnchor);
  window.addEventListener("click", onAnchorClick);
  if (window.location.hash) syncNativeAnchor();

  return lenis;
}

export function stopSmoothScroll() {
  window.removeEventListener("hashchange", syncNativeAnchor);
  window.removeEventListener("click", onAnchorClick);
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
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth" });
}
