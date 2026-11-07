import { useEffect, useCallback } from 'react'

// items: [{ id, label, img }]  activeIndex: number|null
export default function GalleryLightbox({ items, activeIndex, onClose, onNavigate }) {
  const open = activeIndex !== null && activeIndex !== undefined

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, onNavigate])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goPrev, goNext])

  if (!open) return null
  const item = items[activeIndex]

  return (
    <div className="lightbox active gallery-lightbox">
      <div className="lightbox-overlay" onClick={onClose}></div>
      <div className="lightbox-content gallery-lightbox-content">
        <button className="lightbox-close" onClick={onClose}>&times;</button>
        <div className="lightbox-img-wrap">
          <img src={item.img} alt={item.label} />
        </div>
        <div className="lightbox-caption">
          <h3>{item.label}</h3>
          <p>{activeIndex + 1} / {items.length}</p>
        </div>
        {items.length > 1 && (
          <div className="gallery-lightbox-nav">
            <button onClick={goPrev} aria-label="Previous">← Previous</button>
            <button onClick={goNext} aria-label="Next">Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
