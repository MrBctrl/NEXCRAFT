import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { flagships } from '../../data/flagships.js'
import LogoReveal from './LogoReveal.jsx'
import WebsiteShowcase from './WebsiteShowcase.jsx'
import WorldProgress from './WorldProgress.jsx'
import { useFlagshipFonts } from '../../hooks/useFlagshipFonts.js'

const STEPS = ['Brief', 'Website', 'Build']

export default function WorldTemplate({ flagship }) {
  const [revealDone, setRevealDone] = useState(false)
  const [step, setStep] = useState(0)

  useFlagshipFonts(flagship.fonts)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!revealDone) return
    const onScroll = () => {
      const sections = document.querySelectorAll('[data-world-step]')
      let current = 0
      sections.forEach((s, i) => {
        if (window.scrollY >= s.offsetTop - 200) current = i
      })
      setStep(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [revealDone])

  const t = flagship.theme
  const hasFullTheme = !!(t && (t.ivory || t.paper || t.bg) && (t.charcoal || t.charcoal2 || t.ink))
  const hasAccent = !!(t && (t.gold || t.accent))
  const style = (hasFullTheme || hasAccent)
    ? {
        ...(hasFullTheme ? {
          '--fw-bg': t.ivory || t.paper || t.bg,
          '--fw-fg': t.charcoal || t.charcoal2 || t.ink,
        } : {}),
        ...(hasAccent ? { '--fw-accent': t.gold || t.accent } : {}),
        fontFamily: flagship.fonts?.body || undefined,
      }
    : undefined

  const idx = flagships.findIndex((f) => f.slug === flagship.slug)
  const nextFlagship = flagships[(idx + 1) % flagships.length]

  return (
    <div className={`fw-world ${hasFullTheme ? 'fw-themed' : 'fw-neutral'}`} style={style}>
      <LogoReveal flagship={flagship} onDone={() => setRevealDone(true)} />

      {revealDone && (
        <>
          <Link to="/" className="flagship-back fw-back">← NEXCRAFT</Link>
          <WorldProgress steps={STEPS} current={step} />

          <section className="fw-section fw-intro" data-world-step>
            <div className="fw-industry">{flagship.industry}</div>
            <h1 className="fw-name" style={{ fontFamily: flagship.fonts?.display || undefined }}>
              {flagship.name}
            </h1>
            <p className="fw-tagline">{flagship.tagline}</p>
          </section>

          <section className="fw-section fw-brief" data-world-step>
            <div className="section-label fw-label">The Brief</div>
            <p className="fw-brief-text" style={{ fontFamily: flagship.fonts?.display || undefined }}>
              {flagship.description}
            </p>
          </section>

          <section className="fw-section fw-website" data-world-step>
            <div className="section-label fw-label">The Digital Experience</div>
            <WebsiteShowcase flagship={flagship} />
          </section>

          <section className="fw-section fw-build" data-world-step>
            <div className="section-label fw-label">The Build</div>
            <div className="fw-build-tags">
              <span className="tag">React</span>
              <span className="tag">Vite</span>
              <span className="tag">JavaScript</span>
              <span className="tag">CSS</span>
              <span className="tag">Responsive Design</span>
            </div>
            <a href={flagship.liveUrl} target="_blank" rel="noopener noreferrer" className="fw-live-link">
              View Live Website →
            </a>
          </section>

          <section className="fw-section fw-next">
            <span className="fw-next-label">Next World</span>
            <Link to={`/work/${nextFlagship.slug}`} className="fw-next-name">
              {nextFlagship.name} →
            </Link>
          </section>
        </>
      )}
    </div>
  )
}
