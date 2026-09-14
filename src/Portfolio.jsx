import { useEffect, useState } from 'react'
import ChipScene from './components/ChipScene'
import {
  archiveProjects,
  capabilities,
  experience,
  profile,
  proofPoints,
  projects,
  publications,
  talks,
} from './portfolio-data'
import './portfolio.css'

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={diagonal ? 'M6 18 18 6M7 6h11v11' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function External({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<Arrow diagonal /></a>
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function Mark({ compact = false }) {
  return <span className={compact ? 'mark mark-compact' : 'mark'} aria-hidden="true"><i /><i /><i /><i /></span>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const links = [['work', 'Work'], ['approach', 'Approach'], ['research', 'Research'], ['contact', 'Contact']]
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href="#top" aria-label="Talha Alam home"><Mark compact /><span>talha alam<span className="wordmark-dot">.</span></span></a>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>{open ? 'Close' : 'Menu'}</button>
        <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
          {links.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <External className="header-link" href={profile.links.github}>GitHub</External>
      </div>
    </header>
  )
}

function ProjectGlyph({ kind }) {
  const cells = Array.from({ length: 64 }, (_, index) => index)
  const warm = new Set(kind === 'attention' ? [9, 10, 17, 18, 25, 26, 33, 34, 41, 42, 49, 50] : kind === 'fpga' ? [3, 4, 11, 12, 19, 20, 27, 28, 35, 36, 43, 44] : [27, 28, 35, 36])
  if (kind === 'physical') return (
    <svg className="project-glyph glyph-physical" viewBox="0 0 560 300" role="img" aria-label="Physical design floorplan illustration">
      <rect x="94" y="35" width="372" height="228" rx="4" />
      <rect x="126" y="66" width="124" height="84" rx="2" />
      <rect x="272" y="66" width="160" height="39" rx="2" />
      <rect x="272" y="120" width="72" height="113" rx="2" />
      <rect x="360" y="120" width="72" height="113" rx="2" />
      <path d="M70 52h24M70 95h24M70 138h24M70 181h24M70 224h24M466 52h24M466 95h24M466 138h24M466 181h24M466 224h24" />
      <path className="glyph-route" d="M250 108h22M344 105v14M344 234v-14M252 150h20" />
    </svg>
  )
  if (kind === 'stream') return (
    <svg className="project-glyph glyph-stream" viewBox="0 0 560 300" role="img" aria-label="Streaming dataflow illustration">
      <path d="M50 148h458" />
      {[0, 1, 2, 3, 4, 5].map((index) => <g key={index}><rect x={74 + index * 66} y={116 - (index % 2) * 7} width="40" height="64" rx="4" /><path d={`M${94 + index * 66} 180v28`} /></g>)}
      <circle className="glyph-pulse" cx="93" cy="148" r="8" /><path className="glyph-route" d="M50 148h24m40 0h26m40 0h26m40 0h26m40 0h26m40 0h26" />
    </svg>
  )
  if (kind === 'nce') return (
    <svg className="project-glyph glyph-nce" viewBox="0 0 560 300" role="img" aria-label="Mixed precision lane illustration">
      {[0, 1, 2, 3].map((index) => <g key={index}><rect x="82" y={38 + index * 56} width="108" height="38" rx="4" /><rect x="226" y={38 + index * 56} width="108" height="38" rx="4" /><rect x="370" y={38 + index * 56} width="108" height="38" rx="4" /><path d={`M190 ${57 + index * 56}h36m108 0h36`} /></g>)}
      <path className="glyph-route" d="M78 20v260M482 20v260" />
    </svg>
  )
  return (
    <svg className="project-glyph" viewBox="0 0 560 300" role="img" aria-label="Processing element array illustration">
      <path className="glyph-grid" d="M100 75h360M100 113h360M100 151h360M100 189h360M100 227h360M138 37v228M176 37v228M214 37v228M252 37v228M290 37v228M328 37v228M366 37v228M404 37v228M442 37v228" />
      {cells.map((index) => <rect key={index} className={warm.has(index) ? 'glyph-cell glyph-cell-warm' : 'glyph-cell'} x={132 + (index % 8) * 38} y={51 + Math.floor(index / 8) * 38} width="13" height="13" rx="2" />)}
      <path className="glyph-route" d="M70 75h30M460 227h30M328 37v-16M176 265v15" />
    </svg>
  )
}

function FigureArt({ kind }) {
  if (kind === 'accel') return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="AccelClosure prompt to GDSII flow diagram">
      <defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="currentColor" /></marker><linearGradient id="flow-glow" x1="0" x2="1"><stop stopColor="#6fe2c4" /><stop offset="1" stopColor="#f0a36c" /></linearGradient></defs>
      <path className="figure-line" d="M116 185h92m116 0h92m116 0h92m116 0h92" markerEnd="url(#flow-arrow)" />
      {[['01', 'Prompt', 'natural language'], ['02', 'RTL', 'array + wrapper'], ['03', 'Verify', 'exact + suites'], ['04', 'Synthesize', 'timing + PPA'], ['05', 'Place / route', 'open SKY130'], ['06', 'GDSII', 'layout evidence']].map(([number, title, detail], index) => <g key={number} transform={`translate(${28 + index * 148} 120)`}><rect className={index === 5 ? 'figure-node figure-node-final' : 'figure-node'} width="116" height="132" rx="10" /><text className="figure-index" x="16" y="25">{number}</text><circle className="figure-node-dot" cx="96" cy="24" r="4" /><text className="figure-title" x="16" y="64">{title}</text><text className="figure-detail" x="16" y="89">{detail}</text><text className="figure-detail" x="16" y="106">{index === 5 ? 'final artifact' : 'checkpoint'}</text></g>)}
      <rect x="28" y="311" width="864" height="72" rx="8" className="figure-band" /><text className="figure-band-label" x="52" y="341">CLOSED 8 × 8 REFERENCE</text><text className="figure-band-value" x="52" y="365">208.95 MHz · 0.497935 mm² · 0.317 W · zero setup / hold / DRC</text><text className="figure-band-label" x="677" y="341">GDS SHA</text><text className="figure-band-value" x="677" y="365">cd7dc93c…</text>
    </svg>
  )
  if (kind === 'gemmini') return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="Gemmini systolic array and multiplier datapath diagram">
      <defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="currentColor" /></marker></defs>
      <g transform="translate(54 58)"><text className="figure-kicker" x="0" y="-18">SYSTOLIC ARRAY</text>{Array.from({ length: 64 }, (_, index) => <rect key={index} className={(index % 9 === 0 || index === 27 || index === 36) ? 'figure-cell figure-cell-hot' : 'figure-cell'} x={(index % 8) * 35} y={Math.floor(index / 8) * 35} width="24" height="24" rx="4" />)}<path className="figure-line" d="M10 302V286m0-252V18M10 18h274M10 302h274" markerEnd="url(#flow-arrow)" /></g>
      <g transform="translate(414 82)"><text className="figure-kicker" x="0" y="-22">PE ARITHMETIC</text><rect className="figure-node" width="178" height="62" rx="9" /><text className="figure-title" x="22" y="27">INT8 operands</text><text className="figure-detail" x="22" y="46">signed a × b</text><path className="figure-line" d="M178 31h60" markerEnd="url(#flow-arrow)" /><rect className="figure-node" x="238" width="210" height="62" rx="9" /><text className="figure-title" x="260" y="27">Radix-4 Booth</text><text className="figure-detail" x="260" y="46">four partial products</text><path className="figure-line" d="M343 62v42" markerEnd="url(#flow-arrow)" /><rect className="figure-node" x="238" y="104" width="210" height="62" rx="9" /><text className="figure-title" x="260" y="131">3:2 / 4:2 tree</text><text className="figure-detail" x="260" y="150">four reduction stages</text><path className="figure-line" d="M343 166v42" markerEnd="url(#flow-arrow)" /><rect className="figure-node figure-node-final" x="238" y="208" width="210" height="62" rx="9" /><text className="figure-title" x="260" y="235">Kogge–Stone</text><text className="figure-detail" x="260" y="254">carry-propagate result</text></g>
      <rect x="414" y="374" width="454" height="38" rx="8" className="figure-band" /><text className="figure-band-value" x="436" y="399">16×16 SKY130: −13.49% area · −15.49% cells</text>
    </svg>
  )
  if (kind === 'nce') return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="Eight lane mixed precision neural compute engine diagram">
      <defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="currentColor" /></marker></defs>
      <text className="figure-kicker" x="34" y="36">MIXED-PRECISION LANE FABRIC</text><rect className="figure-node" x="34" y="76" width="156" height="282" rx="12" /><text className="figure-title" x="58" y="117">AXI4-Lite</text><text className="figure-detail" x="58" y="140">control plane</text><text className="figure-detail" x="58" y="172">tensor SRAM</text><text className="figure-detail" x="58" y="198">status + DMA</text><path className="figure-line" d="M190 217h44" markerEnd="url(#flow-arrow)" />
      {[['INT8 × 4', '#6fe2c4'], ['BF16 × 2', '#8cb9ad'], ['BF24', '#e4c290'], ['FP32 ACC', '#f0a36c']].map(([label, color], index) => <g key={label} transform={`translate(234 ${76 + index * 70})`}><rect className="figure-lane" width="346" height="48" rx="8" style={{ stroke: color }} /><circle cx="24" cy="24" r="6" fill={color} /><text className="figure-title" x="47" y="29">{label}</text><path className="figure-line" d="M150 24h152" markerEnd="url(#flow-arrow)" /></g>)}
      <rect className="figure-node figure-node-final" x="620" y="76" width="262" height="282" rx="12" /><text className="figure-title" x="650" y="120">Systolic output</text><text className="figure-detail" x="650" y="148">GEMM / convolution</text><text className="figure-detail" x="650" y="181">8 lanes · packed input</text><text className="figure-detail" x="650" y="214">FP32 accumulation</text><path className="figure-line" d="M650 274h198" /><text className="figure-band-value" x="650" y="307">62 / 62 suites</text><text className="figure-detail" x="650" y="330">1,006 AXI transactions</text>
    </svg>
  )
  if (kind === 'attention') return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="INT4 transformer attention dataflow diagram">
      <defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="currentColor" /></marker></defs>
      <text className="figure-kicker" x="36" y="38">16 × 16 INT4 ATTENTION TILE</text><path className="figure-line" d="M148 194h54m146 0h54m146 0h54m146 0h54" markerEnd="url(#flow-arrow)" />
      {[['Q · Kᵀ', 'INT4 GEMM'], ['scale', 'fixed-point'], ['softmax', 'exact verify'], ['P · V', 'INT4 GEMM'], ['MMIO', '8-bit wrapper']].map(([title, detail], index) => <g key={title} transform={`translate(${36 + index * 176} 132)`}><rect className={index === 2 ? 'figure-node figure-node-hot' : 'figure-node'} width="132" height="124" rx="10" /><text className="figure-title" x="18" y="48">{title}</text><text className="figure-detail" x="18" y="75">{detail}</text><text className="figure-index" x="18" y="103">0{index + 1}</text></g>)}
      <rect x="36" y="314" width="848" height="68" rx="8" className="figure-band" /><text className="figure-band-label" x="58" y="341">FROZEN STANDALONE RUN</text><text className="figure-band-value" x="58" y="365">333.33 MHz · 286,546 cells · 1,201 cycles · 3.410 GMAC/s</text>
    </svg>
  )
  if (kind === 'stream' || kind === 'fpga') return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="Streaming line buffer and FPGA resource diagram">
      <defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="currentColor" /></marker></defs>
      <text className="figure-kicker" x="36" y="38">MODEL → WINDOW → PIPELINE → PREDICTION</text><path className="figure-line" d="M144 190h50m156 0h50m156 0h50m156 0h50" markerEnd="url(#flow-arrow)" />
      {[['INT8 model', 'quantized'], ['line buffer', 'sliding window'], ['1D CNN', 'pipelined MAC'], ['PE stream', 'unrolled'], ['output', kind === 'fpga' ? 'Arty S7-35T' : 'real-time']].map(([title, detail], index) => <g key={title} transform={`translate(${36 + index * 176} 128)`}><rect className={index === 4 ? 'figure-node figure-node-final' : 'figure-node'} width="128" height="124" rx="10" /><text className="figure-title" x="16" y="48">{title}</text><text className="figure-detail" x="16" y="76">{detail}</text><text className="figure-index" x="16" y="103">0{index + 1}</text></g>)}
      <rect x="36" y="314" width="848" height="68" rx="8" className="figure-band" /><text className="figure-band-value" x="58" y="342">{kind === 'fpga' ? '3,953 LUTs · 4,506 FFs · 42 DSPs · 33 BRAMs' : '3× lower latency · 0 DSP blocks · 21% lower reported power'}</text><text className="figure-band-label" x="58" y="366">IMPLEMENTATION SNAPSHOT</text>
    </svg>
  )
  return (
    <svg className="case-figure-svg" viewBox="0 0 920 440" role="img" aria-label="ASIC physical design floorplan and signoff checks">
      <text className="figure-kicker" x="36" y="38">RTL → SYNTHESIS → PLACE / ROUTE → CHECKS</text><rect className="figure-floorplan" x="64" y="76" width="374" height="274" rx="8" /><rect className="figure-macro" x="92" y="108" width="116" height="82" rx="4" /><rect className="figure-macro" x="230" y="108" width="178" height="36" rx="4" /><rect className="figure-macro" x="230" y="162" width="80" height="156" rx="4" /><rect className="figure-macro" x="326" y="162" width="82" height="156" rx="4" /><path className="figure-route" d="M208 149h22M310 144v18M310 318v-18M208 231h22" /><text className="figure-title" x="92" y="335">core / macros / routes</text><path className="figure-line" d="M474 212h64" markerEnd="url(#flow-arrow)" /><g transform="translate(568 92)">{[['Timing', '0 setup / hold'], ['Physical', '0 DRC / antenna'], ['Layout', kind === 'physical' ? 'GDSII evidence' : 'open flow']].map(([title, detail], index) => <g key={title} transform={`translate(0 ${index * 78})`}><rect className="figure-node figure-node-final" width="292" height="56" rx="8" /><circle className="figure-node-dot" cx="24" cy="28" r="5" /><text className="figure-title" x="44" y="25">{title}</text><text className="figure-detail" x="44" y="43">{detail}</text></g>)}</g>
    </svg>
  )
}

function ProjectPage({ project }) {
  const nextProject = projects[(projects.findIndex((item) => item.id === project.id) + 1) % projects.length]
  const hasImage = Boolean(project.figureImage)
  useEffect(() => {
    document.title = `${project.title} · Talha Alam`
    return () => { document.title = 'Talha Alam · AI Hardware' }
  }, [project.title])
  return (
    <div className="portfolio case-study-page" id="portfolio"><Navigation /><main>
      <section className="case-hero shell"><a className="back-link" href="#work"><Arrow /> Back to selected systems</a><div className="case-hero-meta"><SectionLabel number={project.index}>{project.kind}</SectionLabel><span>{project.year}</span></div><div className="case-hero-grid"><div><h1>{project.title}</h1><p className="case-deck">{project.deck}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="case-hero-stat"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div></section>
      <section className="case-intro shell"><div><span className="note-label">The brief</span><p className="case-lede">{project.summary}</p></div><div><span className="note-label">What I built</span><p>{project.detail}</p></div></section>
      <section className="case-figures shell"><div className="case-section-heading"><div><SectionLabel number="01">Figures & evidence</SectionLabel><h2>From architecture<br /><em>to physical proof.</em></h2></div><p>Each figure is scoped to the implementation record for this project. The visual explains the path; the metric keeps it honest.</p></div><div className="case-figure-grid"><figure className="case-figure case-figure-wide"><div className="case-figure-topline"><span>FIG. {project.index}A · SYSTEM VIEW</span><span>{project.visual === 'physical' ? 'PHYSICAL DESIGN' : 'ARCHITECTURE'}</span></div><FigureArt kind={project.visual} /><figcaption>{project.visual === 'accel' ? 'AccelClosure closes the loop from a natural-language request to a reproducible GDSII artifact.' : `A code-native schematic of the ${project.title.toLowerCase()} data path and its measured checkpoints.`}</figcaption></figure>{hasImage && <figure className="case-figure case-figure-image"><div className="case-figure-topline"><span>FIG. {project.index}B · LAYOUT RECORD</span><span>GDSII / KLAYOUT</span></div><img src={project.figureImage} alt="AccelClosure GDSII layout opened in KLayout" /><figcaption>Actual layout evidence from the AccelClosure project record. The screenshot shows the final Sky130HD array GDS in KLayout.</figcaption></figure>}<figure className="case-figure case-figure-metrics"><div className="case-figure-topline"><span>FIG. {project.index}{hasImage ? 'C' : 'B'} · IMPLEMENTATION RECORD</span><span>REPORTED CONFIGURATION</span></div><div className="case-stat-grid">{project.secondary.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="case-scope"><span className="note-label">Scope note</span><p>{project.note}</p></div></figure></div></section>
      <section className="case-details shell"><div><SectionLabel number="02">Build note</SectionLabel><h2>Why this<br /><em>configuration.</em></h2></div><div className="case-detail-copy"><p>{project.detail}</p><div className="case-link-row">{project.links.map((link) => <External key={link.href} className="text-link" href={link.href}>{link.label}</External>)}<a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project discussion: ${project.title}`)}`}>Discuss this project <Arrow diagonal /></a></div></div></section>
      <section className="case-next shell"><div><span className="note-label">Next system</span><h2>{nextProject.title}</h2><p>{nextProject.deck}</p></div><a className="button button-primary" href={projectPath(nextProject.id)}>Open next case <Arrow /></a></section>
    </main><footer className="site-footer"><div className="shell footer-inner"><a className="wordmark" href="#top"><Mark compact /><span>talha alam<span className="wordmark-dot">.</span></span></a><span>Designed around the work · © {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div></footer></div>
  )
}

function projectPath(id) {
  return `#/projects/${id}`
}

function ProjectCard({ project, lead }) {
  return (
    <article className={lead ? 'work-card work-card-lead' : 'work-card'}>
      <div className="work-card-art"><span className="art-index">{project.index} / {project.year}</span><ProjectGlyph kind={project.visual} /><span className="art-caption">{project.kind}</span></div>
      <div className="work-card-copy">
        <div className="work-card-topline"><span>{project.kind}</span><span className="live-dot">{project.year}</span></div>
        <h3>{project.title}</h3>
        <p className="work-deck">{project.deck}</p>
        <p className="work-summary">{project.summary}</p>
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="work-card-footer"><div className="primary-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><a className="case-button" href={projectPath(project.id)}>Open case study <Arrow /></a></div>
      </div>
    </article>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-rule" />Talha Alam / Electronics engineer · Pakistan</div>
        <h1>{profile.headline}</h1>
        <p className="hero-subhead">{profile.subhead}</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">See selected work <Arrow /></a><a className="button button-quiet" href="./Talha-Alam-Resume.pdf" download>Download CV <Arrow diagonal /></a></div>
        <div className="hero-status"><span className="status-pulse" />Open to research collaborations and ambitious hardware work</div>
        <div className="proof-grid">{proofPoints.map((point) => <div key={point.label}><strong>{point.value}</strong><span>{point.label}</span></div>)}</div>
      </div>
      <div className="hero-visual"><ChipScene /></div>
    </section>
  )
}

function WorkSection() {
  const [filter, setFilter] = useState('All')
  const [showArchive, setShowArchive] = useState(false)
  const filters = ['All', 'AI', 'ASIC', 'FPGA']
  const visibleProjects = projects.filter((project) => filter === 'All' || project.categories.includes(filter))
  return (
    <section className="section shell work-section" id="work">
      <div className="section-heading"><div><SectionLabel number="01">Selected systems</SectionLabel><h2>Newest work first.<br /><em>Evidence beside the idea.</em></h2></div><p>Each case note keeps the scope visible: architecture, implementation flow, and the number that actually belongs to that configuration.</p></div>
      <div className="work-toolbar"><div className="filter-row" aria-label="Filter selected work">{filters.map((item) => <button key={item} type="button" className={filter === item ? 'filter-button is-active' : 'filter-button'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'All' ? 'All systems' : item}</button>)}</div><span className="result-count">{visibleProjects.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')} projects</span></div>
      <div className="work-list">{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} lead={index === 0} />)}</div>
      <div className="archive-panel"><div className="archive-heading"><div><SectionLabel number="01b">Earlier work</SectionLabel><h3>The rest of the lab notebook.</h3></div><button className="archive-button" type="button" onClick={() => setShowArchive((value) => !value)} aria-expanded={showArchive}>{showArchive ? 'Hide archive' : 'Open archive'}<span>{showArchive ? '−' : '+'}</span></button></div>{showArchive && <div className="archive-list">{archiveProjects.map((project) => <article key={project.title}><div className="archive-year">{project.year}</div><div className="archive-main"><div className="archive-meta"><span>{project.status}</span><span>↗</span></div><h4>{project.title}</h4><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>}</div>
    </section>
  )
}

function ApproachSection() {
  return (
    <section className="section approach-section" id="approach">
      <div className="shell"><div className="section-heading"><div><SectionLabel number="02">Approach</SectionLabel><h2>Make the system legible<br /><em>from model to metal.</em></h2></div><p>The best accelerator is not only fast. It is explainable, testable, and honest about where a number came from.</p></div>
        <div className="approach-grid"><div className="approach-statement"><span className="statement-mark">“</span><p>I work across the seams: the quantized model, the dataflow, the RTL, the constraints, and the layout report.</p><span className="statement-caption">Talha Alam · design principle</span><div className="education-note"><span>Education</span><strong>B.Sc. Electronics Engineering</strong><p>{profile.education.replace('B.Sc. Electronics Engineering · ', '')}</p></div></div><div className="capability-list">{capabilities.map((capability, index) => <article key={capability.title}><span className="capability-index">0{index + 1}</span><div><h3>{capability.title}</h3><p>{capability.description}</p><span>{capability.stack}</span></div></article>)}</div></div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="section experience-section shell" id="experience"><div className="section-heading"><div><SectionLabel number="03">Experience</SectionLabel><h2>Research, taught<br /><em>and shipped.</em></h2></div><p>A timeline shaped by applied research, open hardware flows, and the responsibility to make complex systems teachable.</p></div><div className="timeline">{experience.map((item, index) => <article key={`${item.org}-${item.period}`}><div className="timeline-marker"><span>0{index + 1}</span><i /></div><div className="timeline-date">{item.period}</div><div className="timeline-copy"><h3>{item.role}</h3><span>{item.org}</span><p>{item.description}</p></div></article>)}</div></section>
  )
}

function ResearchSection() {
  return (
    <section className="section research-section" id="research"><div className="shell"><div className="section-heading"><div><SectionLabel number="04">Research & writing</SectionLabel><h2>The work continues<br /><em>in the margins.</em></h2></div><External className="text-link" href={profile.links.scholar}>Open Google Scholar</External></div><div className="research-layout"><div className="publication-list">{publications.map((publication) => <article key={publication.title}><div className="publication-year">{publication.year}</div><div className="publication-copy"><span>{publication.type}</span><h3>{publication.title}</h3><p>{publication.authors}</p><div className="publication-bottom"><small>{publication.venue}</small>{publication.href && <External className="text-link" href={publication.href}>DOI</External>}</div></div></article>)}</div><aside className="talk-card"><span className="note-label">Field note</span><div className="talk-rule" />{talks.map((talk) => <div key={talk.title}><span className="talk-label">{talk.label}</span><h3>{talk.title}</h3><p>{talk.detail}</p><External className="text-link" href={talk.href}>View poster note</External></div>)}<div className="talk-footer"><span>Research areas</span><div><span>AI hardware</span><span>Biomedical edge AI</span><span>Open silicon</span></div></div></aside></div></div></section>
  )
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact"><div className="shell contact-inner"><div><SectionLabel number="05">Contact</SectionLabel><h2>Have a hard problem?<br /><em>Let’s build the proof.</em></h2></div><div className="contact-copy"><p>For accelerator architecture, RTL/FPGA work, physical design, or research collaboration, send a note. I’m always happy to talk through the constraints first.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><a className="phone-link" href={`tel:${profile.phone.replaceAll(' ', '')}`}>{profile.phone} · {profile.location}</a><div className="contact-links"><External href={profile.links.github}>GitHub</External><External href={profile.links.linkedin}>LinkedIn</External><External href={profile.links.orcid}>ORCID</External></div></div></div></section>
  )
}

function HomePage() {
  return (
    <div className="portfolio" id="portfolio"><a className="skip-link" href="#work">Skip to selected work</a><Navigation /><main><Hero /><div className="signal-strip"><div className="shell"><span>RTL DESIGN</span><span>LOW-PRECISION AI</span><span>FPGA SYSTEMS</span><span>RISC-V</span><span>RTL → GDSII</span></div></div><WorkSection /><ApproachSection /><ExperienceSection /><ResearchSection /><ContactSection /></main><footer className="site-footer"><div className="shell footer-inner"><a className="wordmark" href="#top"><Mark compact /><span>talha alam<span className="wordmark-dot">.</span></span></a><span>Designed around the work · © {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div></footer></div>
  )
}

function routeProject() {
  const match = window.location.hash.match(/^#\/projects\/([^/?]+)/)
  if (!match) return null
  return projects.find((project) => project.id === decodeURIComponent(match[1])) ?? null
}

export default function Portfolio() {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))
  useEffect(() => {
    const onHashChange = () => { setHash(window.location.hash); window.scrollTo({ top: 0, behavior: 'auto' }) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  const project = hash.startsWith('#/projects/') ? routeProject() : null
  return project ? <ProjectPage project={project} /> : <HomePage />
}
