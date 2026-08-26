import { useEffect, useRef } from 'react'

export default function Hero() {
  const rootRef = useRef(null)

  useEffect(() => {
    const els = rootRef.current.querySelectorAll('[data-stagger]')
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.7s ease ${i * 0.1 + 0.1}s, transform 0.7s ease ${i * 0.1 + 0.1}s`
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = ''
          el.style.transform = ''
        }, 50)
      })
    })
  }, [])

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero-noise"></div>
      <div className="hero-bg-text">NEXCRAFT</div>
      <div className="hero-content">
        <div className="hero-tag" data-stagger>
          <span className="hero-tag-dot"></span>
          Available for Projects — Worldwide
        </div>
        <h1 className="hero-title" data-stagger>
          Nexcraft<br />
          <span className="red">Creative</span>
          <span className="outline">Studio.</span>
        </h1>
        <div className="hero-divider" data-stagger>
          <div className="hero-divider-line"></div>
          <div className="hero-divider-diamond"></div>
          <div className="hero-divider-line"></div>
        </div>
        <p className="hero-subtitle" data-stagger>
          Designer by instinct. Developer by discipline.<br />
          <em>We build brands that look like empires.</em>
        </p>
        <div className="hero-cta" data-stagger>
          <a href="#work" className="btn-primary">View Our Work</a>
          <a href="#contact" className="btn-secondary">Let's Talk</a>
        </div>
        <div className="hero-stats" data-stagger>
          <div className="hero-stat">
            <span className="hero-stat-num">5+</span>
            <span className="hero-stat-label">Years</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">50+</span>
            <span className="hero-stat-label">Projects</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">2-in-1</span>
            <span className="hero-stat-label">Design + Dev</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
