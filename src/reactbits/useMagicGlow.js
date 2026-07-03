/*
 * useMagicGlow — the interactive behavior lifted from React Bits' MagicBento
 * (GlobalSpotlight proximity glow + ParticleCard particles + click ripple),
 * scoped onto existing cards instead of MagicBento's own grid. Pine-tinted,
 * disabled for reduced-motion and small screens.
 */
import { useEffect } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const PROXIMITY = 170; // px from card edge where the glow is full strength
const FADE = 360; // px where the glow fully fades out
const PARTICLE_COUNT = 7;

export function useMagicGlow(rootRef, cardSelector = ".work-media") {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const getCards = () => Array.from(root.querySelectorAll(cardSelector));

    // --- cursor-proximity border glow (rAF-batched pointer reads) ---
    let lastEvent = null;
    let rafId = null;

    const applyGlow = () => {
      rafId = null;
      if (!lastEvent) return;
      const { clientX, clientY } = lastEvent;
      getCards().forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const edgeDist =
          Math.hypot(clientX - cx, clientY - cy) - Math.max(r.width, r.height) / 2;
        const d = Math.max(0, edgeDist);

        let intensity = 0;
        if (d <= PROXIMITY) intensity = 1;
        else if (d <= FADE) intensity = (FADE - d) / (FADE - PROXIMITY);

        const gx = ((clientX - r.left) / r.width) * 100;
        const gy = ((clientY - r.top) / r.height) * 100;
        card.style.setProperty("--glow-x", `${gx}%`);
        card.style.setProperty("--glow-y", `${gy}%`);
        card.style.setProperty("--glow-intensity", intensity.toFixed(3));
      });
    };

    const onMove = (e) => {
      lastEvent = e;
      if (rafId == null) rafId = requestAnimationFrame(applyGlow);
    };
    const onOut = () =>
      getCards().forEach((c) => c.style.setProperty("--glow-intensity", "0"));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);

    // --- per-card hover particles + click ripple ---
    const cleanups = [];
    getCards().forEach((card) => {
      let particles = [];

      const spawn = () => {
        const r = card.getBoundingClientRect();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = document.createElement("div");
          p.className = "magic-particle";
          p.style.left = `${Math.random() * r.width}px`;
          p.style.top = `${Math.random() * r.height}px`;
          card.appendChild(p);
          particles.push(p);
          gsap.fromTo(
            p,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
          );
          gsap.to(p, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            duration: 2 + Math.random() * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      };

      const clear = () => {
        particles.forEach((p) => {
          gsap.killTweensOf(p);
          gsap.to(p, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => p.remove(),
          });
        });
        particles = [];
      };

      const onEnter = () => spawn();
      const onLeave = () => clear();
      const onClick = (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const max = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - r.width, y),
          Math.hypot(x, y - r.height),
          Math.hypot(x - r.width, y - r.height)
        );
        const rip = document.createElement("div");
        rip.className = "magic-ripple";
        rip.style.width = `${max * 2}px`;
        rip.style.height = `${max * 2}px`;
        rip.style.left = `${x - max}px`;
        rip.style.top = `${y - max}px`;
        card.appendChild(rip);
        gsap.fromTo(
          rip,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => rip.remove(),
          }
        );
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("click", onClick);
      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("click", onClick);
        clear();
      });
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      if (rafId != null) cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef, cardSelector]);
}
