import { useRef } from 'react'

export default function ServiceCard({ num, icon, title, desc, tags }) {
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6
    cardRef.current.style.transform = `translateY(-3px) rotateX(${-y}deg) rotateY(${x}deg)`
  }
  const onMouseLeave = () => { cardRef.current.style.transform = '' }

  return (
    <div className="service-card" ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="service-num-bg">{num}</div>
      <div className="service-icon">{icon}</div>
      <div className="service-title">{title}</div>
      <p className="service-desc">{desc}</p>
      <div className="service-tags">
        {tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
    </div>
  )
}
