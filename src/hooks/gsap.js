import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// shared easing tuned for "slow, silky, no cheap bounce"
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

export { gsap, ScrollTrigger };
