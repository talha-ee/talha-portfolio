import { useState } from "react";
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

const PROJECTS = [
  {
    id: 1,
    title: "Extending Gemmini for LLM Acceleration",
    desc: "FYP: Extending the Berkeley Gemmini systolic array accelerator to support Transformer & LLM workloads on RISC-V within the Chipyard SoC framework.",
    tech: ["Gemmini", "RISC-V", "Chipyard", "Scala", "HLS"],
    cat: "AI",
    img: "/assets/placeholders/project1.png",
    featured: true,
  },
  {
    id: 2,
    title: "High-Performance AI Accelerator ASIC for CGM Applications (RTL-to-GDSII)",
    desc: "Verilog, SkyWater 130nm PDK, Librelane, Yosys, OpenROAD, KLayout, Area: 21.79 mm² (core), Total Power: 0.216 mW, Timing Closure: 0 setup/hold violations @ 35ns clock ",
    tech: ["Verilog", "GDSII", "SkyWater 130nm PDK", "Librelane", "Yosys", "OpenROAD", "KLayout","INT8", "PyTorch", "RTL"],
    cat: "ASIC/AI",
    img: "/assets/placeholders/project2.png",
    featured: true,
  },
  {
    id: 3,
    title: "Streaming Line-Buffer and Dataflow Optimized Tiny 1D-CNN Accelerator for Real-Time Glucose Prediction",
    desc: "FPGA (Artix-7), Vitis HLS, Vivado, Micro-Architectural Optimizations: Zero DSP Usage, Loop Unrolling, Pipelining, Sliding Window Buffer, 3x Latency Improvement, 21% Power Reduction",
    tech: ["Artix-7", "Vivado", "Vitis", "INT8", "PyTorch", "RTL"],
    cat: "FPGA/AI",
    img: "/assets/placeholders/project2.png",
    featured: true,
  },
  {
    id: 4,
    title: "PicoRV32 Stride Prediction & Prefetch",
    desc: "Implemented stride prediction and prefetch buffering for PicoRV32 RISC-V processor. Published at ICCIIoT 2025.",
    tech: ["RISC-V", "PicoRV32", "Verilog", "HDL", "FPGA"],
    cat: "ASIC",
    img: "/assets/placeholders/project3.png",
    featured: false,
  },
  {
    id: 5,
    title: "CanSat Weather Monitoring Satellite",
    desc: "Design, development & deployment of open-source nano-satellite for weather monitoring. Presented at National CanSat Competition, IST Islamabad 2024.",
    tech: ["LoRa", "C/C++", "RF", "IoT", "Nano-Sat"],
    cat: "Embedded",
    img: "/assets/placeholders/project4.png",
    featured: true,
  },
  {
    id: 6,
    title: "Battery-less NFC Plant Sensor",
    desc: "NFC/RFID biodegradable flexible sensor for wireless plant monitoring — zero battery needed. Cloud-connected precision agriculture solution.",
    tech: ["NFC", "RFID", "Biodegradable", "Wireless", "IoT"],
    cat: "Embedded",
    img: "/assets/placeholders/project5.png",
    featured: false,
  },
  {
    id: 7,
    title: "High-Gain CubeSat Dipole Antenna",
    desc: "High-gain dipole tape antenna for IoT PocketQube/CubeSat satellite applications. Designed and simulated in HFSS. Published at ICETECC 25'.",
    tech: ["HFSS", "RF", "CubeSat", "MATLAB", "Antenna"],
    cat: "FPGA",
    img: "/assets/placeholders/project6.png",
    featured: false,
  },
  {
    id: 8,
    title: "BLDC Motor IoT Monitor",
    desc: "ESP-enabled comprehensive IoT solution for real-time BLDC motor monitoring with web dashboard and cloud data handling.",
    tech: ["ESP32", "C/C++", "HTML", "IoT", "Cloud"],
    cat: "Embedded",
    img: "/assets/placeholders/project7.png",
    featured: false,
  },
  {
    id: 9,
    title: "EV Battery Management System",
    desc: "BMS for Lithium-ion cells targeting EV applications with IoT wireless monitoring, SOC estimation, and cloud analytics dashboard.",
    tech: ["C/C++", "IoT", "Embedded", "Wireless", "Cloud"],
    cat: "Embedded",
    img: "/assets/placeholders/project8.png",
    featured: false,
  },
];

function Projects() {
  const [filt, setFilt] = useState("All");
  const [hov, setHov] = useState(null);
  const cats = ["All", "AI", "FPGA", "ASIC", "Embedded"];
  const icons = { AI: "🧠", FPGA: "🔷", ASIC: "⬛", Embedded: "📡" };
  const shown =
    filt === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filt);
  return (
    <section
      id="projects"
      style={{
        padding: "90px 24px",
        background: "linear-gradient(180deg,#080d1a,#050816)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHead
          tag="PROJECT SHOWCASE"
          title="Hardware Portfolio"
          accent="Portfolio"
          color={G.cyan}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {shown.map((p) => {
            const col = CC[p.cat];
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHov(p.id)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: "linear-gradient(135deg,#0d1524,#111827)",
                  border: `1px solid ${hov === p.id ? col + "55" : G.border}`,
                  borderRadius: 13,
                  overflow: "hidden",
                  transition: "all .3s",
                  transform:
                    hov === p.id ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hov === p.id ? `0 14px 44px ${col}1a` : "none",
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "52%",
                    background: `linear-gradient(135deg,${col}0d,rgba(124,58,237,0.07))`,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.img}
                    alt={`${p.title} Placeholder`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: 34, opacity: 0.4 }}>
                      {icons[p.cat]}
                    </div>
                    <div
                      style={{
                        fontFamily: "Orbitron,sans-serif",
                        fontSize: 8,
                        letterSpacing: "3px",
                        color: col,
                        opacity: 0.5,
                      }}
                    >
                      [ PROJECT IMAGE ]
                    </div>
                    <div style={{ fontSize: 9, color: "#334155" }}>{p.img}</div>
                  </div>
                  {p.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background:
                          "linear-gradient(135deg,rgba(0,212,255,0.2),rgba(124,58,237,0.2))",
                        border: `1px solid ${G.cyan}66`,
                        borderRadius: 20,
                        padding: "2px 10px",
                        fontFamily: "Orbitron,sans-serif",
                        fontSize: 8,
                        color: G.cyan,
                        letterSpacing: "1px",
                      }}
                    >
                      FEATURED
                    </div>
                  )}
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                      gap: 8,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Orbitron,sans-serif",
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: G.text,
                        lineHeight: 1.4,
                        flex: 1,
                      }}
                    >
                      {p.title}
                    </h3>
                    <Tag label={p.cat} col={col} />
                  </div>
                  <p
                    style={{
                      color: G.muted,
                      fontSize: 13,
                      lineHeight: 1.65,
                      marginBottom: 14,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                      marginBottom: 14,
                    }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "2px 8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: 4,
                          fontSize: 11,
                          color: "#94a3b8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: col,
                      fontSize: 10.5,
                      textDecoration: "none",
                      fontFamily: "Orbitron,sans-serif",
                      letterSpacing: "1px",
                    }}
                  >
                    ⟶ VIEW ON GITHUB
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
