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

function Footer() {
  return (
    <footer
      style={{
        background: G.bg,
        borderTop: "1px solid rgba(0,212,255,0.07)",
        padding: "26px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Orbitron,sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: G.cyan,
          marginBottom: 7,
          letterSpacing: 2,
        }}
      >
        TALHA<span style={{ color: G.purple }}>.</span>ALAM
      </div>
      <p style={{ color: "#2d3748", fontSize: 11 }}>
        © {new Date().getFullYear()} · Electronics Engineering · UET Peshawar ·
        React + Three.js
      </p>
    </footer>
  );
}

export default Footer;
