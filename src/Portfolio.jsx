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
        <a className="wordmark" href="#top" aria-label="Talha Alam home"><Mark compact /><span>talha<span className="wordmark-dot">.</span></span></a>
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

function ProjectCard({ project, lead, onOpen }) {
  return (
    <article className={lead ? 'work-card work-card-lead' : 'work-card'}>
      <div className="work-card-art"><span className="art-index">{project.index} / {project.year}</span><ProjectGlyph kind={project.visual} /><span className="art-caption">{project.kind}</span></div>
      <div className="work-card-copy">
        <div className="work-card-topline"><span>{project.kind}</span><span className="live-dot">{project.year}</span></div>
        <h3>{project.title}</h3>
        <p className="work-deck">{project.deck}</p>
        <p className="work-summary">{project.summary}</p>
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="work-card-footer"><div className="primary-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><button className="case-button" type="button" onClick={() => onOpen(project)}>Open case note <Arrow /></button></div>
      </div>
    </article>
  )
}

function CaseNote({ project, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = previousOverflow }
  }, [onClose])
  return (
    <div className="note-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="case-note" role="dialog" aria-modal="true" aria-labelledby="case-note-title">
        <div className="note-header"><SectionLabel number={project.index}>{project.kind}</SectionLabel><button className="note-close" type="button" onClick={onClose}>Close <span aria-hidden="true">×</span></button></div>
        <h2 id="case-note-title">{project.title}</h2>
        <p className="note-lede">{project.deck}</p>
        <div className="note-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
        <div className="note-body"><div><span className="note-label">Build note</span><p>{project.detail}</p></div><div><span className="note-label">Evidence & scope</span><p>{project.note}</p><div className="note-stats">{project.secondary.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></div>
        <div className="note-footer">{project.links.map((link) => <External key={link.href} className="text-link" href={link.href}>{link.label}</External>)}<a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project discussion: ${project.title}`)}`}>Discuss this project <Arrow diagonal /></a></div>
      </section>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-rule" />Independent engineer · Pakistan</div>
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
  const [selected, setSelected] = useState(null)
  const [showArchive, setShowArchive] = useState(false)
  const filters = ['All', 'AI', 'ASIC', 'FPGA']
  const visibleProjects = projects.filter((project) => filter === 'All' || project.categories.includes(filter))
  return (
    <section className="section shell work-section" id="work">
      <div className="section-heading"><div><SectionLabel number="01">Selected systems</SectionLabel><h2>Newest work first.<br /><em>Evidence beside the idea.</em></h2></div><p>Each case note keeps the scope visible: architecture, implementation flow, and the number that actually belongs to that configuration.</p></div>
      <div className="work-toolbar"><div className="filter-row" aria-label="Filter selected work">{filters.map((item) => <button key={item} type="button" className={filter === item ? 'filter-button is-active' : 'filter-button'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'All' ? 'All systems' : item}</button>)}</div><span className="result-count">{visibleProjects.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')} projects</span></div>
      <div className="work-list">{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} lead={index === 0} onOpen={setSelected} />)}</div>
      <div className="archive-panel"><div className="archive-heading"><div><SectionLabel number="01b">Earlier work</SectionLabel><h3>The rest of the lab notebook.</h3></div><button className="archive-button" type="button" onClick={() => setShowArchive((value) => !value)} aria-expanded={showArchive}>{showArchive ? 'Hide archive' : 'Open archive'}<span>{showArchive ? '−' : '+'}</span></button></div>{showArchive && <div className="archive-list">{archiveProjects.map((project) => <article key={project.title}><div className="archive-year">{project.year}</div><div className="archive-main"><div className="archive-meta"><span>{project.status}</span><span>↗</span></div><h4>{project.title}</h4><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>}</div>
      {selected && <CaseNote project={selected} onClose={() => setSelected(null)} />}
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

export default function Portfolio() {
  return (
    <div className="portfolio" id="portfolio"><a className="skip-link" href="#work">Skip to selected work</a><Navigation /><main><Hero /><div className="signal-strip"><div className="shell"><span>RTL DESIGN</span><span>LOW-PRECISION AI</span><span>FPGA SYSTEMS</span><span>RISC-V</span><span>RTL → GDSII</span></div></div><WorkSection /><ApproachSection /><ExperienceSection /><ResearchSection /><ContactSection /></main><footer className="site-footer"><div className="shell footer-inner"><a className="wordmark" href="#top"><Mark compact /><span>talha<span className="wordmark-dot">.</span></span></a><span>Designed around the work · © {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div></footer></div>
  )
}
