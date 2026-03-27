import { useEffect } from "react";
import { useState } from "react";

const G = {
  cyan: "#00d4ff",
  purple: "#7c3aed",
  green: "#10b981",
  teal: "#06b6d4",
  bg: "#050816",
  bg2: "#080d1a",
  bg3: "#0d1524",
  text: "#e2e8f0",
  muted: "#64748b",
  dim: "#475569",
  border: "rgba(0,212,255,0.12)",
  borderHov: "rgba(0,212,255,0.35)",
};

function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const links = [
    ["hero", "Home"],
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["showcase", "3D"],
    ["experience", "Exp"],
    ["research", "Research"],
    ["contact", "Contact"],
  ];

  useEffect(() => {
    const h = () => {
      const sy = window.scrollY + 80;
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop && sy < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(5,8,22,0.94)",
    backdropFilter: "blur(20px)",
    borderBottom: `1px solid rgba(0,212,255,0.1)`,
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div
          onClick={() => go("hero")}
          style={{
            fontFamily: "Orbitron,sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: G.cyan,
            letterSpacing: 2,
            cursor: "pointer",
          }}
        >
          Talha<span style={{ color: G.purple }}> Alam</span>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {links.map(([id, l]) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `1.5px solid ${active === id ? G.cyan : "transparent"}`,
                cursor: "pointer",
                fontFamily: "Orbitron,sans-serif",
                fontSize: 9.5,
                letterSpacing: "1.5px",
                padding: "4px 0",
                color: active === id ? G.cyan : "#64748b",
                transition: "color .2s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
