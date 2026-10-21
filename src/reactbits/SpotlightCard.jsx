/*
 * SpotlightCard — adapted from React Bits (https://reactbits.dev) by David Haz.
 * License: MIT + Commons Clause · https://github.com/DavidHDev/react-bits
 * Visual styling (bg/border/radius) intentionally moved to the project's
 * global.css so the card matches the editorial palette — only the spotlight
 * mechanics live in SpotlightCard.css.
 */
import { useEffect, useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(31, 93, 68, 0.18)',
}) => {
  const divRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const cancelFrame = () => { cancelAnimationFrame(frameRef.current); frameRef.current = 0; };
  useEffect(() => cancelFrame, []);

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const card = divRef.current;
      const rect = card.getBoundingClientRect();
      const { x, y } = pointerRef.current;
      card.style.setProperty('--mouse-x', `${x - rect.left - rect.width / 2}px`);
      card.style.setProperty('--mouse-y', `${y - rect.top - rect.height / 2}px`);
    });
  };

  return (
    <div ref={divRef} onPointerMove={handlePointerMove} onPointerLeave={cancelFrame}
      style={{ '--spotlight-color': spotlightColor }} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
};

export default SpotlightCard;
