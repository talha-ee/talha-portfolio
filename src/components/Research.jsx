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

const PUBS = [
  {
    title:
      "Stride Prediction and Prefetch Buffering for PicoRV32 RISC-V Processor",
    authors: "N. Chalane, M. M. Khan, Talha Alam",
    venue: "ICCIIoT 2025 — 6th Int. Conf. on Computational Intelligence & IoT",
    year: 2025,
  },
  {
    title:
      "High Gain Dipole Tape Antenna for IoT PocketQube/CubeSat Satellite Applications",
    authors: "Talha Alam, M Javed, A.A.M.Anik, R Wahid",
    venue:
      "ICETECC 25' — 2nd Int. Conf. on Emerging Technologies in Electronics, Computing & Communication",
    year: 2025,
  },
  {
    title: "Multifunctional Robotic System for Enhanced Farm Management",
    authors: "I Murtaza, M Shaikh, M Javed, Talha Alam",
    venue: "ICETECC 25'",
    year: 2025,
  },
  {
    title:
      "Computational Cognitive Network-Based Radiological Inspection Robot for Nuclear Environment Survey",
    authors: "A.A.M.Anik, M.Sadia, A.Tahmid, ..., Talha Alam",
    venue:
      "MMSE 2025 — 11th Int. Conf. on Advances in Machinery, Material Science & Engineering",
    year: 2025,
  },
  {
    title:
      "Intelligent Meteorological Observation System Amid IR and Piconet Network Protocol",
    authors: "A.A.Mamun, M.Sadia, Talha Alam, M.F.Mahmood",
    venue: "MMSE 2025",
    year: 2025,
  },
  {
    title:
      "CanSat: Design, Development, and Deployment of Open-Source Weather Monitoring Nano-Satellite",
    authors: "Talha Alam, M.Javed, A.Rehman, A.A.Mamun",
    venue: "ICoDT 2024 — 4th IEEE Int. Conference",
    year: 2024,
  },
  {
    title:
      "Cost-Effective and Reliable Small Satellites: New Methodologies for Design and Implementation",
    authors: "Talha Alam, M.Javed, M.Umer",
    venue: "SmallSatEducation Conference — NASA Kennedy Space Center, Florida",
    year: 2024,
  },
];

function Research() {
  return (
    <section id="research" style={{ padding: "90px 24px", background: G.bg2 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHead
          tag="RESEARCH OUTPUT"
          title="Publications & Research"
          accent="Research"
          color={G.cyan}
        />
        <p
          style={{
            textAlign: "center",
            color: G.dim,
            marginTop: -28,
            marginBottom: 40,
            fontSize: 14,
          }}
        >
          {PUBS.length} peer-reviewed publications · International conferences
          across 3 continents
        </p>
        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {PUBS.map((pub, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg,#0d1524,#111827)",
                border: `1px solid ${G.border}`,
                borderRadius: 12,
                padding: "18px 22px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                transition: "all .3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = G.borderHov;
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0,212,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = G.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "rgba(0,212,255,0.15)",
                  minWidth: 34,
                  marginTop: 2,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: G.text,
                    lineHeight: 1.5,
                    marginBottom: 7,
                  }}
                >
                  {pub.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: G.purple,
                    marginBottom: 7,
                    fontStyle: "italic",
                  }}
                >
                  {pub.authors}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 12, color: G.dim }}>
                    {pub.venue}
                  </span>
                  <Tag label={String(pub.year)} col={G.cyan} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(0,212,255,0.05))",
            border: "1px solid rgba(124,58,237,0.22)",
            borderRadius: 14,
            padding: "28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron,sans-serif",
              fontSize: 9,
              letterSpacing: "3px",
              color: G.purple,
              marginBottom: 10,
            }}
          >
            ◈ INSTITUTION BUILDER
          </div>
          <h3
            style={{
              fontFamily: "Orbitron,sans-serif",
              fontSize: "clamp(13px,2.5vw,18px)",
              color: G.text,
              marginBottom: 10,
            }}
          >
            Lab Founder & Developer
          </h3>
          <p
            style={{
              color: "#94a3b8",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            First student at UET Peshawar Abbottabad to establish the
            operational{" "}
            <span style={{ color: G.cyan }}>
              AI, Embedded System, IC Design & Antenna Design Lab
            </span>{" "}
            — serving Electronics Engineering, Computer Science, and Software
            Engineering departments.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Research;
