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

const EXP = [
  {
    role: "Chief Technology Officer (HoE)",
    org: "Syncro Pakistan",
    period: "Nov 2025 – Present",
    desc: "Guiding development of modern electronic solutions. Operating at the intersection of engineering education and real-world technology leadership.",
    type: "industry",
  },
  {
    role: "Undergrad Research Assistant",
    org: "University of Stirling, UK (Virtual)",
    period: "Oct 2025 – Present",
    desc: "Under Dr. Hazrat Ali — AI for Biomedical on edge FPGA targeting low-power ASIC applications in the medical field.",
    type: "research",
  },
  {
    role: "Undergrad Research Assistant",
    org: "South Dakota State University, USA (Virtual)",
    period: "Dec 2024 – Present",
    desc: "Under Dr. Mazhar Sher — heart failure monitoring & smart battery-less systems for agriculture and biomedical IoT.",
    type: "research",
  },
  {
    role: "Research Intern",
    org: "GIKI, Pakistan",
    period: "Jan 2024 – Present",
    desc: "13-month internship on IoT, embedded sensing, and real-time data acquisition for advanced system development.",
    type: "research",
  },
  {
    role: "Leadership Fellow",
    org: "Aspire Institute — HBS, USA",
    period: "Jan 2024 – Apr 2024",
    desc: "Completed leadership program developing strategic decision-making, team leadership, and problem-solving skills.",
    type: "leadership",
  },
  {
    role: "Technical Intern",
    org: "Tarbela Dam, Pakistan",
    period: "Jan 2024 – Feb 2024",
    desc: "Hands-on experience across P&I 1, P&I 2, SCARDA, and Operations at one of the world's largest dams.",
    type: "industry",
  },
  {
    role: "Project Manager",
    org: "Government Post Graduate College, Abbottabad, Pakistan",
    period: "Nov 2023 – Dec 2023",
    desc: "Designed and implemented an IoT-based device for a research project at the Government Post Graduate College’s Botany Department, enabling real-time environmental monitoring and data collection for scientific analysis. ",
    type: "Research",
  },
];
function Experience() {
  const TC = { industry: G.cyan, research: G.purple, leadership: G.green };
  const TL = {
    industry: "Industry",
    research: "Research",
    leadership: "Leadership",
  };
  return (
    <section
      id="experience"
      style={{
        padding: "90px 24px",
        background: "linear-gradient(180deg,#050816,#080d1a)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHead
          tag="EXPERIENCE"
          title="Professional Journey"
          accent="Journey"
          color={G.purple}
        />
        <div style={{ position: "relative", paddingLeft: 38 }}>
          <div
            style={{
              position: "absolute",
              left: 13,
              top: 8,
              bottom: 8,
              width: 1,
              background:
                "linear-gradient(180deg,rgba(0,212,255,0.3),rgba(124,58,237,0.3),rgba(0,212,255,0.1))",
            }}
          />
          {EXP.map((ex, i) => {
            const c = TC[ex.type];
            return (
              <div key={i} style={{ position: "relative", marginBottom: 22 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -29,
                    top: 18,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: `2px solid ${c}`,
                    background: G.bg,
                    zIndex: 1,
                    boxShadow: `0 0 10px ${c}55`,
                  }}
                />
                <div
                  style={{
                    background: "linear-gradient(135deg,#0d1524,#111827)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: 12,
                    padding: "17px 22px",
                    transition: "all .3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${c}44`;
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 7,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "Orbitron,sans-serif",
                          fontSize: 11,
                          fontWeight: 600,
                          color: G.text,
                          marginBottom: 4,
                          letterSpacing: ".4px",
                        }}
                      >
                        {ex.role}
                      </h3>
                      <div style={{ fontSize: 13, color: c, fontWeight: 500 }}>
                        {ex.org}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "Orbitron,sans-serif",
                          fontSize: 9,
                          color: G.dim,
                          letterSpacing: "1px",
                          marginBottom: 5,
                        }}
                      >
                        {ex.period}
                      </div>
                      <Tag label={TL[ex.type]} col={c} />
                    </div>
                  </div>
                  <p style={{ color: G.muted, fontSize: 13, lineHeight: 1.65 }}>
                    {ex.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
