import SectionHead from "./SectionHead";
import ChipCanvas from "./ChipCanvas";

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

function Showcase() {
  return (
    <section id="showcase" style={{ padding: "90px 24px", background: G.bg2 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead
          tag="3D SHOWCASE"
          title="Silicon Architecture"
          accent="Architecture"
          color={G.purple}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 420,
              background:
                "linear-gradient(135deg,rgba(0,212,255,0.04),rgba(124,58,237,0.04))",
              border: `1px solid ${G.border}`,
              borderRadius: 18,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ChipCanvas />
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "Orbitron,sans-serif",
                fontSize: 8,
                color: "#2d3748",
                letterSpacing: "2px",
              }}
            >
              HOVER TO ROTATE · AI CHIP MODEL
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Orbitron,sans-serif",
                fontSize: 10,
                color: G.cyan,
                letterSpacing: "2px",
                marginBottom: 20,
              }}
            >
              // CHIP DESIGN EXPERTISE
            </div>
            {[
              {
                t: "Gemmini AI Accelerator",
                d: "Extending the Berkeley Gemmini systolic array for Transformer & LLM workloads within Chipyard SoC.",
                c: G.cyan,
              },
              {
                t: "Systolic Array Architecture",
                d: "Weight-stationary and output-stationary designs for efficient matrix multiply in CNN & Transformer inference.",
                c: G.purple,
              },
              {
                t: "RISC-V SoC Integration",
                d: "Full SoC flows integrating AI accelerators with RISC-V cores, memory hierarchies & peripherals.",
                c: G.green,
              },
              {
                t: "FPGA Rapid Prototyping",
                d: "Artix-7 platforms with Vivado HLS for custom AI inference pipeline synthesis & edge deployment.",
                c: G.teal,
              },
            ].map(({ t, d, c }) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  gap: 0,
                  marginBottom: 16,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderLeft: `3px solid ${c}`,
                  borderRadius: "0 10px 10px 0",
                  padding: "14px 16px",
                  transition: "all .3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${c}09`;
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Orbitron,sans-serif",
                      fontSize: 11,
                      color: c,
                      fontWeight: 600,
                      marginBottom: 5,
                      letterSpacing: ".4px",
                    }}
                  >
                    {t}
                  </div>
                  <div
                    style={{ fontSize: 13, color: G.muted, lineHeight: 1.6 }}
                  >
                    {d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
