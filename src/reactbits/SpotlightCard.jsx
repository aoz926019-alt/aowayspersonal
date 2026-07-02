/*
 * SpotlightCard — adapted from React Bits (https://reactbits.dev) by David Haz.
 * License: MIT + Commons Clause · https://github.com/DavidHDev/react-bits
 * Visual styling (bg/border/radius) intentionally moved to the project's
 * global.css so the card matches the editorial palette — only the spotlight
 * mechanics live in SpotlightCard.css.
 */
import { useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(31, 93, 68, 0.18)',
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
};

export default SpotlightCard;
