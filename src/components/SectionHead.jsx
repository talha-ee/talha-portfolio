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

function SectionHead({ tag, title, accent, color = G.cyan }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div
        style={{
          fontFamily: "Orbitron,sans-serif",
          fontSize: 10,
          letterSpacing: "4px",
          color,
          marginBottom: 10,
        }}
      >
        ◈ {tag}
      </div>
      <h2
        style={{
          fontFamily: "Orbitron,sans-serif",
          fontSize: "clamp(22px,4vw,36px)",
          fontWeight: 700,
          color: G.text,
        }}
      >
        {title.split(accent)[0]}
        <span style={{ color }}>{accent}</span>
        {title.split(accent)[1]}
      </h2>
      <div
        style={{
          width: 60,
          height: 2,
          background: `linear-gradient(90deg,${G.cyan},${G.purple})`,
          margin: "14px auto 0",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export default SectionHead;
