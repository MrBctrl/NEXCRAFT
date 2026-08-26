import { useState, useRef } from 'react'
import { flagships } from '../../data/flagships.js'
import { webProjects } from '../../data/uiuxProjects.js'
import FlagshipPortalCard from '../flagship/FlagshipPortalCard.jsx'
import LaptopCard from '../uiux/LaptopCard.jsx'

export default function SelectedWork() {
  const [othersOpen, setOthersOpen] = useState(false)
  const panelRef = useRef(null)

  return (
    <div className="uiux-block reveal">
      <div className="uiux-block-label">
        <span className="uiux-block-icon">🌐</span>
        Selected Work
      </div>

      <div className="portal-grid">
        {flagships.map((f) => <FlagshipPortalCard key={f.slug} flagship={f} />)}
      </div>

      <button
        className="others-toggle"
        onClick={() => setOthersOpen((o) => !o)}
        aria-expanded={othersOpen}
      >
        Others
        <span className={`others-toggle-chevron ${othersOpen ? 'open' : ''}`}>▾</span>
      </button>

      <div
        className={`others-panel ${othersOpen ? 'open' : ''}`}
        ref={panelRef}
        style={{ maxHeight: othersOpen ? panelRef.current?.scrollHeight ?? 2000 : 0 }}
      >
        <div className="laptop-grid others-laptop-grid">
          {webProjects.map((p) => <LaptopCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  )
}
