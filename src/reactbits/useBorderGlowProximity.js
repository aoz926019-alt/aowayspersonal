/*
 * useEdgeGlowProximity — drives a light-friendly edge glow from cursor proximity.
 * Sets --edge-proximity (0–100) and --cursor-angle on each frame so a bright
 * "light blade" on the border follows the cursor and a soft halo swells as the
 * pointer APPROACHES (not only on direct hover). Built to read on a LIGHT card,
 * so it uses plain bright colors instead of dark-only blend modes.
 */
import { useEffect } from "react";

const ZONE = 100; // px around the frame where the glow starts responding

export function useBorderGlowProximity(rootRef, cardSelector = ".work-frame") {
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
          card.style.setProperty("--edge-proximity", "0");
          return;
        }

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;

        // proximity: 1 at/inside the frame, easing to 0 at the edge of the zone
        const outX = Math.max(0, Math.abs(dx) - r.width / 2);
        const outY = Math.max(0, Math.abs(dy) - r.height / 2);
        const outDist = Math.hypot(outX, outY);
        const proximity = Math.max(0, 1 - outDist / ZONE);

        let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (deg < 0) deg += 360;

        card.style.setProperty("--edge-proximity", (proximity * 100).toFixed(2));
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
