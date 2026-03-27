import HeroCanvas from "./HeroCanvas";

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

function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 580,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <HeroCanvas />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%,rgba(0,212,255,0.04),rgba(5,8,22,0.55) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top,#050816,transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 780,
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron,sans-serif",
            fontSize: 10,
            letterSpacing: "5px",
            color: G.cyan,
            marginBottom: 18,
            opacity: 0.85,
          }}
        >
          ◈ &nbsp;AI HARDWARE ENGINEER &nbsp;◈
        </div>
        <h1
          style={{
            fontFamily: "Orbitron,sans-serif",
            fontSize: "clamp(48px,10vw,100px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          <span style={{ color: G.text }}>TALHA</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#00d4ff,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ALAM
          </span>
        </h1>
        <div
          style={{
            fontFamily: "Orbitron,sans-serif",
            fontSize: "clamp(9px,1.6vw,12px)",
            color: G.purple,
            letterSpacing: "4px",
            marginBottom: 22,
          }}
        >
          FPGA &nbsp;·&nbsp; ASIC &nbsp;·&nbsp; RISC-V &nbsp;·&nbsp; GEMMINI
          &nbsp;·&nbsp; SYSTOLIC ARRAYS
        </div>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "clamp(13px,1.8vw,16px)",
            maxWidth: 500,
            margin: "0 auto 36px",
            lineHeight: 1.8,
          }}
        >
          Accelerating intelligence at the silicon level — designing tomorrow's
          AI hardware, today.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["VIEW PROJECTS", "#projects", G.cyan],
            ["CONTACT ME", "#contact", "#fff"],
          ].map(([lbl, tgt, clr]) => (
            <button
              key={lbl}
              onClick={() =>
                document
                  .getElementById(tgt.slice(1))
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                fontFamily: "Orbitron,sans-serif",
                fontSize: 10,
                letterSpacing: "2px",
                padding: "13px 28px",
                borderRadius: 6,
                cursor: "pointer",
                border: `1px solid ${clr === "0d4ff" ? G.borderHov : "rgba(255,255,255,0.18)"}`,
                background:
                  clr === G.cyan
                    ? "linear-gradient(135deg,rgba(0,212,255,0.12),rgba(124,58,237,0.12))"
                    : "transparent",
                color: clr,
                transition: "all .3s",
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            justifyContent: "center",
            marginTop: 56,
            flexWrap: "wrap",
          }}
        >
          {[
            ["7+", "Publications"],
            ["3", "Intl. Collabs"],
            ["10+", "Projects"],
            ["3.06", "CGPA / 4.0"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: "clamp(22px,3vw,32px)",
                  fontWeight: 700,
                  color: G.cyan,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  color: G.dim,
                  fontSize: 10,
                  letterSpacing: "1px",
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
