import React from "react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Showcase from "./components/ShowCase";
import Experience from "./components/Experience";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');`;

const CC = {
  AI: "#7c3aed",
  FPGA: "#00d4ff",
  ASIC: "#06b6d4",
  Embedded: "#10b981",
};

export default function App() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent =
      FONTS +
      `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#050816!important;color:#e2e8f0;font-family:'Inter',sans-serif;overflow-x:hidden}
      ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#050816}::-webkit-scrollbar-thumb{background:rgba(0,212,255,0.2);border-radius:3px}
    `;
    document.head.appendChild(s);
    return () => {
      if (document.head.contains(s)) document.head.removeChild(s);
    };
  }, []);
  return (
    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Showcase />
      <Experience />
      <Research />
      <Contact />
      <Footer />
    </div>
  );
}
