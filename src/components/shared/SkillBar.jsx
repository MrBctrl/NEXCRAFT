import { useEffect, useRef, useState } from 'react'

export default function SkillBar({ label, pct }) {
  const barRef = useRef(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setFilled(true), 200)
        obs.unobserve(entry.target)
      }
    }, { threshold: 0.4 })
    obs.observe(barRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span>{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar" ref={barRef}>
        <div className="skill-fill" style={{ width: filled ? `${pct}%` : '0%' }} />
      </div>
    </div>
  )
}
