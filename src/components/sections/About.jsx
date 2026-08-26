import SkillBar from '../shared/SkillBar.jsx'

const SKILLS = [
  { label: "Graphic Design / CorelDRAW", pct: 95 },
  { label: "Brand Identity & Logo Design", pct: 90 },
  { label: "Canva / Digital Ads", pct: 92 },
  { label: "Web Dev (PHP/MySQL)", pct: 75 },
  { label: "UI / UX Design", pct: 82 },
  { label: "Mockups & Packaging", pct: 88 },
  { label: "Motion Design", pct: 80 },
]

export default function About() {
  return (
    <section id="about" className="section-light">
      <div className="section-label">Section 01</div>
      <h2 className="section-heading">About <em>Us</em></h2>
      <div className="about-grid reveal">
        <div className="about-left">
          <p className="about-text">
            <strong>NEXCRAFT CREATIVE STUDIO</strong> is a systems-driven creative business dedicated to helping businesses build a professional digital presence that earns trust, creates value, and drives growth. We specialize in strategic branding, modern websites, and creative digital solutions designed to strengthen credibility and help businesses stand out in a competitive world.
          </p>
          <p className="about-text">
            Rather than simply creating designs, <strong>we focus on delivering meaningful digital experiences that support long-term business success</strong>. Every project is approached with creativity, strategy, and a commitment to building lasting value for our clients.
          </p>
          <div className="about-stats">
            <div className="stat"><div className="stat-number">5+</div><div className="stat-label">Years Designing</div></div>
            <div className="stat"><div className="stat-number">50+</div><div className="stat-label">Projects Done</div></div>
            <div className="stat"><div className="stat-number">2-in-1</div><div className="stat-label">Design + Dev</div></div>
            <div className="stat"><div className="stat-number">100%</div><div className="stat-label">Client Focused</div></div>
          </div>
        </div>
        <div className="about-right">
          <div className="section-label" style={{ marginBottom: 28 }}>Technical Skills</div>
          {SKILLS.map((s) => <SkillBar key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}
