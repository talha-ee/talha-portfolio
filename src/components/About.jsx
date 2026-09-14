import SectionHead from "./SectionHead";
import Tag from "./Tag";

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

function About() {
  const card = {
    background: "linear-gradient(135deg,#0d1524,#111827)",
    border: `1px solid ${G.border}`,
    borderRadius: 10,
    padding: "16px",
    transition: "all .3s",
    cursor: "default",
  };
  const specs = [
    {
      i: "⬛",
      l: "AI Accelerators",
      d: "Gemmini, Systolic Arrays, Custom Dataflows",
    },
    { i: "🔷", l: "FPGA Design", d: "Vivado, Vitis HLS, Artix-7, Zynq" },
    { i: "◈", l: "RISC-V / ASIC", d: "PicoRV32, Chipyard, VLSI Flows" },
    { i: "📡", l: "IoT & Embedded", d: "LoRa, ESP32, Biomedical Sensing" },
    { i: "🛰", l: "Nano-Satellites", d: "CubeSat, PocketQube, RF Systems" },
    { i: "🧠", l: "Edge AI", d: "Quantization, 1D-CNN, PyTorch" },
  ];
  return (
    <section
      id="about"
      style={{
        padding: "90px 24px",
        background: "linear-gradient(180deg,#050816,#080d1a)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead
          tag="ABOUT ME"
          title="Building the Future of AI Hardware"
          accent="AI Hardware"
          color={G.cyan}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 40,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,212,255,0.04),rgba(124,58,237,0.04))",
                border: `1px solid ${G.border}`,
                borderRadius: 14,
                padding: "24px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: 10,
                  color: G.cyan,
                  letterSpacing: "2px",
                  marginBottom: 14,
                }}
              >
                // PROFILE
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                Electronics Engineering undergraduate at UET Peshawar (CGPA:
                3.06/4.0, 2022–2026) specializing in AI hardware acceleration,
                embedded sensing, and wireless communication. Extending Gemmini
                for Transformer & LLM acceleration.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14 }}>
                First student at UET Peshawar Abbottabad to establish the
                operational AI, Embedded System, IC Design & Antenna Design Lab
                — serving 3 engineering departments.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {[
                ["University", "UET Peshawar"],
                ["CGPA", "3.06 / 4.0"],
                ["Duration", "2022 – 2026"],
                ["Location", "KPK, Pakistan"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                    padding: "11px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: G.dim,
                      letterSpacing: "1px",
                      marginBottom: 3,
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ color: G.text, fontWeight: 600, fontSize: 13 }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(0,212,255,0.04))",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 10,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: 9,
                  color: G.purple,
                  letterSpacing: "2px",
                  marginBottom: 12,
                }}
              >
                // ACHIEVEMENTS
              </div>
              {[
                {
                  t: "NRTC Bronze Shield",
                  o: "National Radio Telecom Corp, Haripur",
                  y: "Dec 2025",
                },
                {
                  t: "National CanSat Competition",
                  o: "IST, Islamabad",
                  y: "Apr 2024",
                },
                {
                  t: "Capital Youth Expo",
                  o: "Project Exhibition, Islamabad",
                  y: "Nov 2023",
                },
                {
                  t: "AFAQ Expo TMA — 1st Position",
                  o: "Project Exhibition, Haripur",
                  y: "Jun 2015",
                },
              ].map((a) => (
                <div
                  key={a.t}
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 9,
                    paddingBottom: 9,
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    style={{
                      color: G.cyan,
                      flexShrink: 0,
                      fontSize: 11,
                      marginTop: 2,
                    }}
                  >
                    ◆
                  </span>
                  <div>
                    <div
                      style={{ color: G.text, fontSize: 13, fontWeight: 500 }}
                    >
                      {a.t}
                    </div>
                    <div style={{ color: G.dim, fontSize: 11 }}>
                      {a.o} · {a.y}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Orbitron,sans-serif",
                fontSize: 10,
                color: G.cyan,
                letterSpacing: "2px",
                marginBottom: 16,
              }}
            >
              // SPECIALIZATIONS
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {specs.map(({ i, l, d }) => (
                <div
                  key={l}
                  style={card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = G.borderHov;
                    e.currentTarget.style.boxShadow =
                      "0 6px 22px rgba(0,212,255,0.1)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = G.border;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 7 }}>{i}</div>
                  <div
                    style={{
                      fontFamily: "Orbitron,sans-serif",
                      fontSize: 10,
                      color: G.text,
                      letterSpacing: ".6px",
                      marginBottom: 5,
                      fontWeight: 600,
                    }}
                  >
                    {l}
                  </div>
                  <div style={{ fontSize: 12, color: G.dim, lineHeight: 1.5 }}>
                    {d}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,212,255,0.05),rgba(124,58,237,0.05))",
                border: `1px solid ${G.border}`,
                borderRadius: 12,
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: 9,
                  color: G.cyan,
                  letterSpacing: "2px",
                  marginBottom: 12,
                }}
              >
                // FINAL YEAR PROJECT
              </div>
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: 12,
                  color: G.text,
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                Extending Gemmini AI Accelerator for Transformer & LLM
                Acceleration
              </div>
              <p style={{ color: G.muted, fontSize: 13, lineHeight: 1.65 }}>
                Optimization of Gemmini systolic array to efficiently support
                Transformer and LLM workloads within the RISC-V Chipyard SoC
                framework.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginTop: 14,
                }}
              >
                {["Gemmini", "RISC-V", "Chipyard", "Scala", "Transformer"].map(
                  (t) => (
                    <Tag key={t} label={t} col={G.cyan} />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
