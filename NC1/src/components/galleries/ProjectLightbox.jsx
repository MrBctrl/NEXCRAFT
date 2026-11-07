import { useEffect, useCallback, useState, useMemo } from 'react'

// group: array of portfolio items sharing the same category (subcategory
// or filter). startIndex: which item in that group was clicked.
// Every image from every item in the group is flattened into one list —
// so the arrows walk through ALL fashion shots (across ALL fashion
// items, and all of each item's own images), not just one pic per item.
export default function ProjectLightbox({ group, startIndex, onClose }) {
  const [index, setIndex] = useState(0)
  const open = Array.isArray(group) && group.length > 0

  const shots = useMemo(() => {
    if (!open) return []
    return group.flatMap((item) =>
      item.images.map((src) => ({ src, title: item.title, desc: item.desc }))
    )
  }, [group, open])
  const count = shots.length

  // When a new group opens, jump straight to the first image belonging
  // to whichever item was actually clicked.
  useEffect(() => {
    if (!open) return
    const clickedItem = group[startIndex || 0]
    const firstShotIndex = shots.findIndex((s) => s.title === clickedItem?.title)
    setIndex(firstShotIndex > -1 ? firstShotIndex : 0)
  }, [group, startIndex, open, shots])

  const goPrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count])

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

  if (!open || count === 0) return null
  const shot = shots[index]

  return (
    <div className="lightbox active gallery-lightbox">
      <div className="lightbox-overlay" onClick={onClose}></div>
      <div className="lightbox-content gallery-lightbox-content">
        <button className="lightbox-close" onClick={onClose}>&times;</button>
        <div className="lightbox-img-wrap shot-frame">
          <img src={shot.src} alt={shot.title} />
          {count > 1 && (
            <>
              <button className="shot-arrow shot-arrow-prev" onClick={goPrev} aria-label="Previous design">←</button>
              <button className="shot-arrow shot-arrow-next" onClick={goNext} aria-label="Next design">→</button>
              <span className="shot-count">{index + 1} / {count}</span>
            </>
          )}
        </div>
        <div className="lightbox-caption">
          <h3>{shot.title}</h3>
          <p>{shot.desc}</p>
        </div>
      </div>
    </div>
  )
}