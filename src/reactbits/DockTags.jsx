/*
 * DockTags — the cursor-proximity magnification from React Bits' Dock, adapted
 * to a row of text tag pills. The pill nearest the cursor smoothly scales up
 * (macOS-dock style) via a spring, without reflowing its neighbours.
 */
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import "./DockTags.css";

const SPRING = { mass: 0.1, stiffness: 170, damping: 14 };
const DISTANCE = 110; // px falloff on each side
const PEAK = 1.32; // magnification at the cursor

function DockTag({ label, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const targetScale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, PEAK, 1]);
  const scale = useSpring(targetScale, SPRING);

  return (
    <motion.span ref={ref} className="dock-tag" style={{ scale }}>
      {label}
    </motion.span>
  );
}

export default function DockTags({ tags, className = "" }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className={`work-tags dock-tags ${className}`.trim()}
      onPointerMove={(e) => mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(Infinity)}
    >
      {tags.map((t) => (
        <DockTag key={t} label={t} mouseX={mouseX} />
      ))}
    </div>
  );
}
