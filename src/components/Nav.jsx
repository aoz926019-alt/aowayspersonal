import PillNav from "../reactbits/PillNav.jsx";
import { nav } from "../data/content.js";

export default function Nav() {
  return (
    <PillNav
      logoNode={
        <>
          张敖<span style={{ color: "var(--accent)" }}>.</span>
        </>
      }
      logoHref="#top"
      items={nav}
      baseColor="var(--paper)"
      pillColor="var(--ink)"
      hoveredPillTextColor="var(--paper)"
      pillTextColor="var(--ink)"
    />
  );
}
