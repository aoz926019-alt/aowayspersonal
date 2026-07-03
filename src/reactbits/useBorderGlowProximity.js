/*
 * useBorderGlowProximity — drives BorderGlow's --edge-proximity / --cursor-angle
 * from cursor PROXIMITY (not just direct hover), so the edge light appears as the
 * pointer APPROACHES each card. It toggles the component's own `sweep-active`
 * class, which lifts BorderGlow's `:not(:hover)` opacity gate.
 */
import { useEffect } from "react";

const ZONE = 90; // px around the card where the glow starts responding

export function useBorderGlowProximity(rootRef, cardSelector = ".border-glow-card") {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let last = null;
    let rafId = null;
    const getCards = () => Array.from(root.querySelectorAll(cardSelector));

    const apply = () => {
      rafId = null;
      if (!last) return;
      const mx = last.clientX;
      const my = last.clientY;

      getCards().forEach((card) => {
        const r = card.getBoundingClientRect();
        const near =
          mx > r.left - ZONE &&
          mx < r.right + ZONE &&
          my > r.top - ZONE &&
          my < r.bottom + ZONE;

        if (!near) {
          card.classList.remove("sweep-active");
          card.style.setProperty("--edge-proximity", "0");
          return;
        }

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;

        // BorderGlow's edge-proximity: ~1 at/beyond the edge, → 0 at the center
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = r.width / 2 / Math.abs(dx);
        if (dy !== 0) ky = r.height / 2 / Math.abs(dy);
        const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

        let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (deg < 0) deg += 360;

        card.classList.add("sweep-active");
        card.style.setProperty("--edge-proximity", (edge * 100).toFixed(2));
        card.style.setProperty("--cursor-angle", `${deg.toFixed(2)}deg`);
      });
    };

    const onMove = (e) => {
      last = e;
      if (rafId == null) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [rootRef, cardSelector]);
}
