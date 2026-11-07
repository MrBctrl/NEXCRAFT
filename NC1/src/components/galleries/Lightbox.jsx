import { useEffect } from 'react'

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="lightbox active">
      <div className="lightbox-overlay" onClick={onClose}></div>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>&times;</button>
        <div className="lightbox-img-wrap">
          <img id="lightbox-img" src={item.img} alt={item.title} />
        </div>
        <div className="lightbox-caption">
          <h3 id="lightbox-title">{item.title}</h3>
          <p id="lightbox-desc">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}
