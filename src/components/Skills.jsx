import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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
const CC = {
  AI: "#7c3aed",
  FPGA: "#00d4ff",
  ASIC: "#06b6d4",
  Embedded: "#10b981",
};

const SKILLS = [
  { n: "AI/ML Hardware Accelerators", p: 92, c: "AI", col: "#7c3aed" },
  { n: "Embedded Systems (C/C++)", p: 90, c: "Embedded", col: "#10b981" },
  { n: "FPGA Design — Vivado / HLS", p: 88, c: "FPGA", col: "#00d4ff" },
  { n: "IoT & Wireless Comm. (LoRa)", p: 88, c: "Embedded", col: "#10b981" },
  { n: "Gemmini & Systolic Arrays", p: 85, c: "AI", col: "#7c3aed" },
  { n: "Python / PyTorch / TensorFlow", p: 85, c: "AI", col: "#7c3aed" },
  { n: "RISC-V Architecture", p: 80, c: "ASIC", col: "#06b6d4" },
  { n: "PCB Design & RF/Antenna", p: 78, c: "FPGA", col: "#00d4ff" },
  { n: "ASIC / VLSI Design", p: 75, c: "ASIC", col: "#8b5cf6" },
  { n: "MATLAB", p: 75, c: "Embedded", col: "#f59e0b" },
];

function Skills() {
  const [vis, setVis] = useState(false);
  const [filt, setFilt] = useState("All");
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const cats = ["All", "AI", "FPGA", "ASIC", "Embedded"];
  const shown = filt === "All" ? SKILLS : SKILLS.filter((s) => s.c === filt);
  const tools = [
    "Vivado",
    "Vitis HLS",
    "Chipyard",
    "HFSS",
    "PyTorch",
    "TensorFlow",
    "C/C++",
    "Python",
    "MATLAB",
    "Verilog",
    "RISC-V",
    "Arduino",
    "ESP32",
    "LoRa",
    "NFC/RFID",
    "Git",
    "Linux",
  ];
  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "90px 24px", background: G.bg2 }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <SectionHead
          tag="TECHNICAL EXPERTISE"
          title="Engineering Skills"
          accent="Skills"
          color={G.purple}
        />
        <div
          style={{
            display: "flex",
            gap: 9,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilt(c)}
              style={{
                background: filt === c ? `${CC[c] || G.cyan}22` : "transparent",
                border: `1px solid ${filt === c ? CC[c] || G.cyan : "rgba(255,255,255,0.12)"}`,
                color: filt === c ? CC[c] || G.cyan : "#64748b",
                padding: "6px 16px",
                borderRadius: 20,
                fontFamily: "Orbitron,sans-serif",
                fontSize: 9.5,
                letterSpacing: "1.5px",
                cursor: "pointer",
                transition: "all .22s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 13, marginBottom: 44 }}>
          {shown.map((s, i) => (
            <div
              key={s.n}
              style={{
                background: "linear-gradient(135deg,#0d1524,#111827)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "15px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 9,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: s.col,
                      display: "inline-block",
                      boxShadow: `0 0 7px ${s.col}`,
                    }}
                  />
                  <span
                    style={{ color: G.text, fontSize: 14, fontWeight: 500 }}
                  >
                    {s.n}
                  </span>
                  <Tag label={s.c} col={CC[s.c] || "#fff"} />
                </div>
                <span
                  style={{
                    fontFamily: "Orbitron,sans-serif",
                    fontSize: 12,
                    color: s.col,
                    fontWeight: 600,
                  }}
                >
                  {s.p}%
                </span>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  height: 7,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg,${s.col}77,${s.col})`,
                    width: vis ? `${s.p}%` : "0%",
                    transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${i * 0.06}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Orbitron,sans-serif",
              fontSize: 9,
              letterSpacing: "3px",
              color: G.dim,
              marginBottom: 16,
            }}
          >
            TOOLS & TECHNOLOGIES
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {tools.map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 20,
                  fontSize: 12,
                  color: "#94a3b8",
                  transition: "all .2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = G.borderHov;
                  e.target.style.color = G.cyan;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.09)";
                  e.target.style.color = "#94a3b8";
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
