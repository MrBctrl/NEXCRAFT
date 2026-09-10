import { useState } from 'react'

export default function PhoneCard({ project }) {
  const [shot, setShot] = useState(0)
  const urls = project.mediaUrls || []
  const step = (dir) => (e) => {
    e.stopPropagation()
    setShot((prev) => (prev + dir + urls.length) % urls.length)
  }

  return (
    <div className="phone-card">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {urls.length === 0 ? (
            <div className="screen-placeholder small">
              <div className="placeholder-icon">▶</div>
              <p>{project.title}</p>
              <span>Coming soon</span>
            </div>
          ) : project.mediaType === 'image' ? (
            <div className="shot-frame">
              <img src={urls[shot]} alt={project.title} loading="lazy" decoding="async" />
              {urls.length > 1 && (
                <>
                  <button type="button" className="shot-arrow shot-arrow-prev shot-arrow-sm" onClick={step(-1)} aria-label="Previous shot">‹</button>
                  <button type="button" className="shot-arrow shot-arrow-next shot-arrow-sm" onClick={step(1)} aria-label="Next shot">›</button>
                  <span className="shot-count shot-count-sm">{shot + 1}/{urls.length}</span>
                </>
              )}
            </div>
          ) : (
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={urls[0]} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="phone-home-bar"></div>
      </div>
      <div className="phone-card-info">
        <h3 className="device-card-title">{project.title}</h3>
        <p className="device-card-desc">{project.desc}</p>
        <div className="device-card-tags">
          {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}