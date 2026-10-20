import { useEffect, useRef } from "react";
import "./ParticleSignature.css";

export default function ParticleSignature() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const canvas = root.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const sample = document.createElement("canvas");
    sample.width = 360; sample.height = 180;
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    if (!ctx || !sampleContext) return;

    const staticMode = matchMedia("(prefers-reduced-motion: reduce), (max-width: 640px)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: -1000, y: -1000 };
    let points = [], raf = 0, visible = false, active = true;
    let previous = 0, introStarted = 0, elapsed = 0, width = 1, height = 1;
    let scale = 1, offsetX = 0, offsetY = 0;

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(offsetX, offsetY); ctx.scale(scale, scale);
      points.forEach(point => {
        ctx.fillStyle = point.color;
        ctx.beginPath(); ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2); ctx.fill();
      });
      ctx.restore();
    };

    const frame = now => {
      raf = 0;
      if (!active || !visible || document.hidden) { previous = 0; return; }
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
      previous = now; elapsed += dt;
      if (!introStarted) introStarted = now;
      const progress = 1 - Math.pow(1 - Math.min((now - introStarted) / 1600, 1), 3);
      const friction = Math.exp(-dt * 10);
      points.forEach((point, index) => {
        const homeX = point.gridX + (point.targetX - point.gridX) * progress;
        const homeY = point.gridY + (point.targetY - point.gridY) * progress;
        const dx = point.x - pointer.x, dy = point.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance > .1 && distance < 42) {
          const force = (1 - distance / 42) * 900;
          point.vx += dx / distance * force * dt;
          point.vy += dy / distance * force * dt;
        }
        const breath = Math.sin(elapsed * .6 + index * .035) * .6 * progress;
        point.vx = (point.vx + (homeX + breath - point.x) * 65 * dt) * friction;
        point.vy = (point.vy + (homeY - point.y) * 65 * dt) * friction;
        point.x += point.vx * dt; point.y += point.vy * dt;
      });
      paint();
      if (!staticMode.matches) raf = requestAnimationFrame(frame);
    };

    const stop = () => { cancelAnimationFrame(raf); raf = 0; previous = 0; };
    const update = () => {
      stop();
      if (staticMode.matches) {
        introStarted = performance.now() - 1600;
        points.forEach(point => { point.x = point.targetX; point.y = point.targetY; point.vx = 0; point.vy = 0; });
        paint();
      } else if (visible && !document.hidden && points.length) raf = requestAnimationFrame(frame);
    };
    const resize = () => {
      width = root.clientWidth; height = root.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      scale = Math.min(width / 360, height / 180);
      offsetX = (width - 360 * scale) / 2; offsetY = (height - 180 * scale) / 2;
      paint();
    };
    const move = event => {
      if (staticMode.matches || !finePointer.matches) return;
      const bounds = root.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left - offsetX) / scale;
      pointer.y = (event.clientY - bounds.top - offsetY) / scale;
    };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) leave();
      update();
    });
    const observer = new ResizeObserver(resize);
    observer.observe(root); intersection.observe(root);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", update);
    staticMode.addEventListener("change", update);

    document.fonts.ready.then(() => {
      if (!active) return;
      sampleContext.font = "600 156px Manrope";
      sampleContext.textAlign = "center"; sampleContext.textBaseline = "middle";
      sampleContext.fillText("AO", 180, 94);
      const pixels = sampleContext.getImageData(0, 0, 360, 180).data;
      const targets = [];
      for (let y = 16; y < 164; y += 5) {
        for (let x = 22; x < 338; x += 5) {
          if (pixels[(y * 360 + x) * 4 + 3] > 160) targets.push({ x, y });
        }
      }
      // Match the sample grid to the letter silhouette with deterministic springs.
      const columns = Math.ceil(Math.sqrt(targets.length * 2));
      const rows = Math.ceil(targets.length / columns);
      points = targets.map((target, index) => {
        const gridX = 42 + index % columns * 276 / Math.max(1, columns - 1);
        const gridY = 28 + Math.floor(index / columns) * 124 / Math.max(1, rows - 1);
        return { targetX: target.x, targetY: target.y, gridX, gridY,
          x: gridX, y: gridY, vx: 0, vy: 0,
          size: 1.65 + (Math.sin(index * 1.7) + 1) * .12,
          color: index % 7 === 0 ? "#729b98" : "#376f55" };
      });
      root.dataset.ready = "true";
      resize(); update();
    });

    return () => {
      active = false; stop(); intersection.disconnect(); observer.disconnect();
      root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", update); staticMode.removeEventListener("change", update);
    };
  }, []);

  return <div className="particle-signature" ref={ref} aria-hidden="true">
    <svg className="signature-fallback" viewBox="0 0 360 180"><text x="180" y="94" textAnchor="middle" dominantBaseline="central">AO</text></svg>
    <canvas />
  </div>;
}
