import { useState } from 'react'
import BrowserFrame from './BrowserFrame.jsx'
import GalleryLightbox from '../galleries/GalleryLightbox.jsx'

export default function WebsiteShowcase({ flagship }) {
  const { desktop, mobile, scrollVideo } = flagship.showcase
  const [activeIndex, setActiveIndex] = useState(null)
  const addressLabel = `${flagship.slug} / digital experience`

  return (
    <div className="showcase">
      <div className="showcase-hero">
        <BrowserFrame addressLabel={addressLabel}>
          <img
            src={desktop[0].img}
            alt={desktop[0].label}
            onClick={() => setActiveIndex(0)}
            className="showcase-clickable"
            loading="lazy"
            decoding="async"
          />
        </BrowserFrame>
        <p className="showcase-hero-caption">
          The digital experience built for {flagship.name}.
        </p>
      </div>

      {scrollVideo && (
        <div className="showcase-video">
          <BrowserFrame addressLabel={addressLabel}>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={scrollVideo} type="video/mp4" />
            </video>
          </BrowserFrame>
        </div>
      )}

      <div className="showcase-sections">
        {desktop.slice(1).map((shot, i) => (
          <button
            key={shot.id}
            className="showcase-thumb"
            onClick={() => setActiveIndex(i + 1)}
          >
            <img src={shot.img} alt={shot.label} loading="lazy" decoding="async" />
            <span>{shot.label}</span>
          </button>
        ))}
      </div>

      {mobile?.length > 0 && (
        <div className="showcase-responsive">
          <div className="showcase-responsive-label">Responsive</div>
          <div className="showcase-mobile-row">
            {mobile.map((shot) => (
              <BrowserFrame key={shot.id} mobile>
                <img src={shot.img} alt={shot.label} loading="lazy" decoding="async" />
              </BrowserFrame>
            ))}
          </div>
        </div>
      )}

      <GalleryLightbox
        items={desktop}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  )
}
