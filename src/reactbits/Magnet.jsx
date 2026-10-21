/* React Bits Magnet by David Haz; MIT + Commons Clause.
 * Adapted to reuse GSAP tweens and skip pointer work outside the viewport.
 * Full license: public/licenses/React-Bits.txt
 */
import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/gsap';

export default function Magnet({ children, padding = 100, disabled = false, magnetStrength = 2,
  wrapperClassName = '', innerClassName = '', ...props }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (disabled) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const wrapper = wrapperRef.current;
      const xTo = gsap.quickTo(innerRef.current, 'x', { duration: .4, ease: 'power3.out' });
      const yTo = gsap.quickTo(innerRef.current, 'y', { duration: .4, ease: 'power3.out' });
      let frame = 0, visible = false, active = false, pointer;
      const reset = () => { if (active) { active = false; xTo(0); yTo(0); } };
      const move = event => {
        if (!visible || document.hidden) return;
        pointer = { x: event.clientX, y: event.clientY };
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!visible || document.hidden) return;
          const rect = wrapper.getBoundingClientRect();
          const dx = pointer.x - rect.left - rect.width / 2;
          const dy = pointer.y - rect.top - rect.height / 2;
          if (Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding) {
            active = true;
            xTo(dx / magnetStrength); yTo(dy / magnetStrength);
          } else reset();
        });
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) reset();
      });
      observer.observe(wrapper);
      window.addEventListener('pointermove', move, { passive: true });
      document.documentElement.addEventListener('pointerleave', reset);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener('pointermove', move);
        document.documentElement.removeEventListener('pointerleave', reset);
      };
    });
    return () => media.revert();
  }, [padding, disabled, magnetStrength]);

  return <div ref={wrapperRef} className={wrapperClassName} style={{ position: 'relative', display: 'inline-block' }} {...props}>
    <div ref={innerRef} className={innerClassName}>{children}</div>
  </div>;
}
