import { useState } from "react";
import SectionHead from "./SectionHead";

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

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", msg: "" });
    }, 4500);
  };
  return (
    <section
      id="contact"
      style={{
        padding: "90px 24px 80px",
        background: "linear-gradient(180deg,#080d1a,#050816)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionHead
          tag="GET IN TOUCH"
          title="Let's Collaborate"
          accent="Collaborate"
          color={G.purple}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 40,
          }}
        >
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
              // CONTACT INFO
            </div>
            {[
              {
                ic: "✉",
                l: "Email",
                v: "talhaalame.e@gmail.com",
                h: "mailto:talhaalame.e@gmail.com",
              },
              { ic: "📍", l: "Location", v: "KPK, Pakistan", h: "#" },
              {
                ic: "📞",
                l: "Phone",
                v: "+92 349 9530896",
                h: "tel:+923499530896",
              },
            ].map(({ ic, l, v, h }) => (
              <a
                key={l}
                href={h}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  marginBottom: 14,
                  textDecoration: "none",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 9,
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = G.borderHov;
                  e.currentTarget.style.background = "rgba(0,212,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <span style={{ fontSize: 18, minWidth: 26 }}>{ic}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "Orbitron,sans-serif",
                      fontSize: 9,
                      color: G.dim,
                      letterSpacing: "1.5px",
                      marginBottom: 3,
                    }}
                  >
                    {l}
                  </div>
                  <div style={{ color: G.text, fontSize: 13 }}>{v}</div>
                </div>
              </a>
            ))}
            <div
              style={{
                fontFamily: "Orbitron,sans-serif",
                fontSize: 9,
                color: G.dim,
                letterSpacing: "2px",
                marginTop: 20,
                marginBottom: 12,
              }}
            >
              PROFILES
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { l: "LinkedIn", href: "https://www.linkedin.com/in/talhaalam-e-e/" ,c: "#0ea5e9" },
                { l: "GitHub", href: "https://github.com/talha-ee", c: "#549492" },
                { l: "Google Scholar", href: "https://scholar.google.com/citations?user=Ue74-00AAAAJ&hl=en", c: G.cyan },
                { l: "ResearchGate", href: "https://www.researchgate.net/profile/Talha-Alam-3?ev=hdr_xprf", c: "#00ccbb" },
                { l: "ORCID", href: "https://orcid.org/0009-0007-6627-4601", c: "#a6ce39" },
            ].map(({ l, href, c }) => (
                <a
                  key={l}
                  href={href}
                  style={{
                    padding: "6px 12px",
                    background: `${c}1a`,
                    border: `1px solid ${c}33`,
                    borderRadius: 6,
                    fontSize: 10.5,
                    color: c,
                    textDecoration: "none",
                    fontFamily: "Orbitron,sans-serif",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${c}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${c}1a`;
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg,#0d1524,#111827)",
              border: `1px solid ${G.border}`,
              borderRadius: 14,
              padding: "26px",
            }}
          >
            <div
              style={{
                fontFamily: "Orbitron,sans-serif",
                fontSize: 10,
                color: G.cyan,
                letterSpacing: "2px",
                marginBottom: 20,
              }}
            >
              // SEND MESSAGE
            </div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
                <div
                  style={{
                    fontFamily: "Orbitron,sans-serif",
                    fontSize: 13,
                    color: G.green,
                    letterSpacing: "2px",
                  }}
                >
                  MESSAGE SENT!
                </div>
                <p style={{ color: G.muted, marginTop: 8, fontSize: 13 }}>
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div>
                {[
                  { k: "name", l: "Your Name", t: "text", p: "John Doe" },
                  {
                    k: "email",
                    l: "Email Address",
                    t: "email",
                    p: "john@example.com",
                  },
                  {
                    k: "subject",
                    l: "Subject",
                    t: "text",
                    p: "Research Collaboration",
                  },
                ].map(({ k, l, t, p }) => (
                  <div key={k} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontFamily: "Orbitron,sans-serif",
                        fontSize: 9,
                        color: G.dim,
                        letterSpacing: "1.5px",
                        marginBottom: 6,
                      }}
                    >
                      {l}
                    </div>
                    <input
                      type={t}
                      placeholder={p}
                      value={form[k]}
                      onChange={up(k)}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        padding: "11px 14px",
                        color: G.text,
                        fontFamily: "Inter,sans-serif",
                        fontSize: 14,
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: "Orbitron,sans-serif",
                      fontSize: 9,
                      color: G.dim,
                      letterSpacing: "1.5px",
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </div>
                  <textarea
                    placeholder="Tell me about your project or research idea..."
                    value={form.msg}
                    onChange={up("msg")}
                    rows={5}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      padding: "11px 14px",
                      color: G.text,
                      fontFamily: "Inter,sans-serif",
                      fontSize: 14,
                      width: "100%",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  onClick={submit}
                  style={{
                    width: "100%",
                    fontFamily: "Orbitron,sans-serif",
                    fontSize: 10,
                    letterSpacing: "2px",
                    padding: "13px",
                    borderRadius: 6,
                    cursor: "pointer",
                    border: `1px solid rgba(0,212,255,0.38)`,
                    background:
                      "linear-gradient(135deg,rgba(0,212,255,0.15),rgba(124,58,237,0.15))",
                    color: G.cyan,
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,rgba(0,212,255,0.28),rgba(124,58,237,0.28))";
                    e.currentTarget.style.boxShadow =
                      "0 0 22px rgba(0,212,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,rgba(0,212,255,0.15),rgba(124,58,237,0.15))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  SEND MESSAGE →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
