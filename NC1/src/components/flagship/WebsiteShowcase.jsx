import { useState } from 'react'
import BrowserFrame from './BrowserFrame.jsx'
import GalleryLightbox from '../galleries/GalleryLightbox.jsx'

// Each showcase entry's `img` can be a single path (string) or an array of
// paths — this lets any section (hero, collection, about, footer, mobile…)
// carry more than one screenshot without changing the data shape for
// entries that only have one.
const shotsOf = (entry) => (Array.isArray(entry.img) ? entry.img : [entry.img])

export default function WebsiteShowcase({ flagship }) {
  const { desktop, mobile, scrollVideo } = flagship.showcase
  const [activeIndex, setActiveIndex] = useState(null)
  const [heroShot, setHeroShot] = useState(0)
  const [sectionShot, setSectionShot] = useState({})
  const [mobileShot, setMobileShot] = useState({})
  const addressLabel = `${flagship.slug} / digital experience`

  // Flatten every shot, in section order, into one list so the lightbox
  // still works as a single "tour" through the whole site — now including
  // any extra shots a section has.
  const flatShots = []
  desktop.forEach((entry, sectionIdx) => {
    const shots = shotsOf(entry)
    shots.forEach((img, shotIdx) => {
      flatShots.push({
        id: `${entry.id}-${shotIdx}`,
        label: shots.length > 1 ? `${entry.label} (${shotIdx + 1}/${shots.length})` : entry.label,
        img,
        sectionIdx,
      })
    })
  })
  const flatStartOf = (sectionIdx) => flatShots.findIndex((s) => s.sectionIdx === sectionIdx)

  const heroShots = shotsOf(desktop[0])
  const heroSrc = heroShots[heroShot] ?? heroShots[0]
  const stepHero = (dir) => (e) => {
    e.stopPropagation()
    setHeroShot((prev) => (prev + dir + heroShots.length) % heroShots.length)
  }

  const stepSection = (sectionIdx, dir) => (e) => {
    e.stopPropagation()
    const shots = shotsOf(desktop[sectionIdx])
    setSectionShot((prev) => ({
      ...prev,
      [sectionIdx]: ((prev[sectionIdx] ?? 0) + dir + shots.length) % shots.length,
    }))
  }

  const stepMobile = (id, dir, len) => (e) => {
    e.stopPropagation()
    setMobileShot((prev) => ({ ...prev, [id]: ((prev[id] ?? 0) + dir + len) % len }))
  }

  return (
    <div className="showcase">
      <div className="showcase-hero">
        <BrowserFrame addressLabel={addressLabel}>
          <div className="shot-frame">
            <img
              src={heroSrc}
              alt={desktop[0].label}
              onClick={() => setActiveIndex(flatStartOf(0) + heroShot)}
              className="showcase-clickable"
              loading="lazy"
              decoding="async"
            />
            {heroShots.length > 1 && (
              <>
                <button type="button" className="shot-arrow shot-arrow-prev" onClick={stepHero(-1)} aria-label="Previous shot">‹</button>
                <button type="button" className="shot-arrow shot-arrow-next" onClick={stepHero(1)} aria-label="Next shot">›</button>
                <span className="shot-count">{heroShot + 1}/{heroShots.length}</span>
              </>
            )}
          </div>
        </BrowserFrame>
        <p className="showcase-hero-caption">
          The digital experience built for {flagship.name}.
        </p>
      </div>

      {scrollVideo && (
        <div className="showcase-video">
          <BrowserFrame addressLabel={addressLabel}>
            <video autoPlay muted loop playsInline preload="metadata" poster={heroShots[0]}>
              <source src={scrollVideo} type="video/mp4" />
            </video>
          </BrowserFrame>
        </div>
      )}

      <div className="showcase-sections">
        {desktop.slice(1).map((entry, i) => {
          const sectionIdx = i + 1
          const shots = shotsOf(entry)
          const shotIdx = sectionShot[sectionIdx] ?? 0
          const src = shots[shotIdx] ?? shots[0]
          return (
            <div key={entry.id} className="showcase-thumb">
              <div className="shot-frame">
                <button
                  type="button"
                  className="shot-frame-btn"
                  onClick={() => setActiveIndex(flatStartOf(sectionIdx) + shotIdx)}
                >
                  <img src={src} alt={entry.label} loading="lazy" decoding="async" />
                </button>
                {shots.length > 1 && (
                  <>
                    <button type="button" className="shot-arrow shot-arrow-prev" onClick={stepSection(sectionIdx, -1)} aria-label="Previous shot">‹</button>
                    <button type="button" className="shot-arrow shot-arrow-next" onClick={stepSection(sectionIdx, 1)} aria-label="Next shot">›</button>
                    <span className="shot-count">{shotIdx + 1}/{shots.length}</span>
                  </>
                )}
              </div>
              <span>{entry.label}</span>
            </div>
          )
        })}
      </div>

      {mobile?.length > 0 && (
        <div className="showcase-responsive">
          <div className="showcase-responsive-label">Responsive</div>
          <div className="showcase-mobile-row">
            {mobile.map((entry) => {
              const shots = shotsOf(entry)
              const shotIdx = mobileShot[entry.id] ?? 0
              const src = shots[shotIdx] ?? shots[0]
              return (
                <BrowserFrame key={entry.id} mobile>
                  <div className="shot-frame">
                    <img src={src} alt={entry.label} loading="lazy" decoding="async" />
                    {shots.length > 1 && (
                      <>
                        <button type="button" className="shot-arrow shot-arrow-prev shot-arrow-sm" onClick={stepMobile(entry.id, -1, shots.length)} aria-label="Previous shot">‹</button>
                        <button type="button" className="shot-arrow shot-arrow-next shot-arrow-sm" onClick={stepMobile(entry.id, 1, shots.length)} aria-label="Next shot">›</button>
                        <span className="shot-count shot-count-sm">{shotIdx + 1}/{shots.length}</span>
                      </>
                    )}
                  </div>
                </BrowserFrame>
              )
            })}
          </div>
        </div>
      )}

      <GalleryLightbox
        items={flatShots}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  )
}
