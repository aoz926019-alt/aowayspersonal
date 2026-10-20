// Abstract capability illustrations; the shapes do not encode performance data.
export default function CapabilityGlyph({ index }) {
  return <svg className={`cap-glyph cap-glyph--${index}`} viewBox="0 0 112 72" fill="none" aria-hidden="true">
    {index === 0 && <>
      <path className="glyph-guide" d="M12 59H103M18 10V59M18 35H102" />
      {[23, 39, 31, 47, 39, 52].map((height, i) => <path className="glyph-bar" style={{ "--glyph-delay": `${i * 45}ms` }} key={i} d={`M${29 + i * 13} 58V${58 - height}`} />)}
      <path className="glyph-trace" pathLength="1" d="M22 38L39 27L55 35L72 14L88 21L101 10" />
      <circle className="glyph-dot" cx="72" cy="14" r="3" /><circle className="glyph-dot" cx="101" cy="10" r="2.5" />
    </>}
    {index === 1 && <>
      <g className="glyph-layer glyph-layer--back"><path d="M56 35L97 52L56 69L15 52Z" /></g>
      <g className="glyph-layer glyph-layer--middle"><path d="M56 20L97 37L56 54L15 37Z" /></g>
      <g className="glyph-layer glyph-layer--front"><path d="M56 5L97 22L56 39L15 22Z" /><path className="glyph-trace" pathLength="1" d="M39 22L56 15L73 22L56 29Z" /><circle className="glyph-dot" cx="56" cy="22" r="2" /></g>
      <path className="glyph-guide" d="M9 22H3M109 52H103" />
    </>}
    {index === 2 && <>
      <path className="glyph-guide" d="M11 37C11 4 101 4 101 37S11 70 11 37Z" />
      <g className="glyph-dialog glyph-dialog--a"><path d="M20 15H58V39H37L27 47V39H20Z" /><path className="glyph-trace" pathLength="1" d="M28 24H49M28 31H42" /></g>
      <g className="glyph-dialog glyph-dialog--b"><path d="M59 32H94V56H87V63L77 56H59Z" /><path className="glyph-trace" pathLength="1" d="M67 41H85M67 48H79" /></g>
      <circle className="glyph-dot" cx="98" cy="25" r="2.5" />
    </>}
    {index === 3 && <>
      <path className="glyph-guide" d="M8 59H104M19 10V59M19 35H104" />
      <path className="glyph-fan" d="M23 53L47 35L69 42L99 13L69 58L47 49Z" />
      <path className="glyph-trace" pathLength="1" d="M23 53L47 35L69 42L99 13" />
      <path className="glyph-guide" d="M47 35V59M69 42V59M99 13V59" />
      <circle className="glyph-dot" cx="47" cy="35" r="2.5" /><circle className="glyph-dot" cx="69" cy="42" r="2.5" /><circle className="glyph-dot" cx="99" cy="13" r="3" />
    </>}
  </svg>;
}
