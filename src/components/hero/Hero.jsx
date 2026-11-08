// Entrance animation is pure CSS (.hero [data-stagger] + the --i index), so
// there is no post-paint JS that hides and re-shows content.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true"></div>
      <div className="hero-bg-text" data-parallax="0.35" aria-hidden="true">NEXCRAFT</div>
      <div className="hero-content" data-parallax="-0.1">
        <div className="hero-tag" data-stagger style={{ '--i': 0 }}>
          <span className="hero-tag-dot" aria-hidden="true"></span>
          Independent Studio · Available for Projects
        </div>
        <h1 className="hero-title" id="hero-title" data-stagger style={{ '--i': 1 }}>
          Nexcraft<sup className="hero-reg" aria-hidden="true">®</sup><br />
          <span className="red">Creative</span>
          <span className="outline">Technology Studio.</span>
        </h1>
        <div className="hero-divider" data-stagger style={{ '--i': 2 }} aria-hidden="true">
          <div className="hero-divider-line"></div>
          <div className="hero-divider-diamond"></div>
          <div className="hero-divider-line"></div>
        </div>
        <p className="hero-subtitle" data-stagger style={{ '--i': 3 }}>
          Designer by instinct. Developer by discipline.<br />
          <em>Websites, interfaces, brands and automation, built by one founder.</em>
        </p>
        <a className="hero-founder" href="#founder" data-stagger style={{ '--i': 4 }}>
          <img
            src="/images/brendan-okonji.jpg"
            alt=""
            width="44"
            height="44"
            decoding="async"
          />
          <span>
            An independent creative technology practice, founded and led by <strong>Brendan Okonji</strong>
          </span>
        </a>
        <div className="hero-cta" data-stagger style={{ '--i': 5 }}>
          <a href="#work" className="btn-primary">View Selected Work</a>
          <a href="#contact" className="btn-secondary">Let's Talk</a>
        </div>
        <div className="hero-stats" data-stagger style={{ '--i': 6 }}>
          <div className="hero-stat">
            <span className="hero-stat-num">1</span>
            <span className="hero-stat-label">Founder-led</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">5</span>
            <span className="hero-stat-label">Disciplines</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">2-in-1</span>
            <span className="hero-stat-label">Design + Dev</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
