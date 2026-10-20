import { useId, useLayoutEffect, useRef } from "react";
import { gsap } from "../hooks/gsap";
import "./SignalWeave.css";

// Project a family of closed curves around a trefoil into a static SVG mesh.
// Only the layers move at runtime; the geometry is never rebuilt on pointer input.
const strands = Array.from({ length: 22 }, (_, strand) => {
  const phase = strand / 22 * Math.PI * 2;
  const points = Array.from({ length: 193 }, (_, index) => {
    const t = index / 192 * Math.PI * 2;
    const radius = 1.1 + .3 * Math.cos(3 * t) + .09 * Math.cos(phase);
    const x = radius * Math.cos(2 * t);
    const y = radius * Math.sin(2 * t);
    const z = .47 * Math.sin(3 * t) + .09 * Math.sin(phase);
    const tiltedY = y * .62 - z * .78;
    const depth = y * .78 + z * .62;
    const perspective = 4.5 / (4.5 - depth);
    return `${(180 + (x * .94 + tiltedY * .34) * 91 * perspective).toFixed(2)},${(102 + (tiltedY * .94 - x * .34) * 91 * perspective).toFixed(2)}`;
  });
  return `M${points.join("L")}Z`;
});

export default function SignalWeave() {
  const ref = useRef(null);
  const gradientId = useId();

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(hover: hover) and (pointer: fine)",
    }, ({ conditions }) => {
      if (!conditions.motion) return;
      const root = ref.current;
      const heading = root.closest(".profile-heading");
      const layer = root.querySelector(".weave-pointer");
      gsap.from(".weave-strand", {
        strokeDashoffset: 1, duration: 1.8, stagger: .022, ease: "power2.inOut",
        scrollTrigger: { trigger: heading, start: "top 90%", once: true },
      });
      gsap.fromTo(".weave-scroll", { rotation: -10, y: 8 }, {
        rotation: 12, y: -8, ease: "none",
        scrollTrigger: { trigger: heading, start: "top bottom", end: "bottom top", scrub: .8 },
      });
      if (!conditions.pointer) return;
      const xTo = gsap.quickTo(layer, "x", { duration: .9, ease: "power3.out" });
      const yTo = gsap.quickTo(layer, "y", { duration: .9, ease: "power3.out" });
      const rotateTo = gsap.quickTo(layer, "rotation", { duration: 1.1, ease: "power3.out" });
      const move = event => {
        const bounds = heading.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        xTo(x * 18); yTo(y * 12); rotateTo(x * 7);
      };
      const reset = () => { xTo(0); yTo(0); rotateTo(0); };
      heading.addEventListener("pointermove", move, { passive: true });
      heading.addEventListener("pointerleave", reset);
      return () => {
        heading.removeEventListener("pointermove", move);
        heading.removeEventListener("pointerleave", reset);
      };
    }, ref);
    return () => media.revert();
  }, []);

  return <div className="signal-weave" ref={ref} aria-hidden="true">
    <div className="weave-guide"><span /><i /><span /></div>
    <div className="weave-pointer"><svg className="weave-scroll" viewBox="20 -25 330 280" fill="none">
      <defs><linearGradient id={gradientId} x1="60" y1="30" x2="300" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8cac9c" /><stop offset=".42" stopColor="#1f5d44" /><stop offset="1" stopColor="#76a6b3" />
      </linearGradient></defs>
      {strands.map((d, index) => <path className="weave-strand" key={index} d={d} pathLength="1" stroke={`url(#${gradientId})`} />)}
    </svg></div>
    <div className="weave-caption"><span>ANALYSIS</span><i /><span>CREATION</span></div>
  </div>;
}
