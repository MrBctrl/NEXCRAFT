import { useEffect, useState } from 'react'
import { fetchVisibleUiuxProjects } from '../../services/uiuxService.js'
import SelectedWork from './SelectedWork.jsx'
import PhoneCard from '../uiux/PhoneCard.jsx'

export default function UIUX() {
  const [mobileProjects, setMobileProjects] = useState([])

  useEffect(() => {
    fetchVisibleUiuxProjects().then(setMobileProjects)
  }, [])

  return (
    <section id="uiux" className="section-dark" aria-labelledby="uiux-heading">
      <div className="section-label accent-label">Section 04</div>
      <h2 className="section-heading light-heading" id="uiux-heading">Web & <em>UI/UX</em> Work</h2>
      <p className="work-intro reveal" style={{ color: 'rgba(245,240,232,0.5)' }}>
        Web systems, interfaces and digital products, designed and built end to end.
      </p>

      <SelectedWork />

      <div className="uiux-block reveal">
        <div className="uiux-block-label">
          <span className="uiux-block-icon">📱</span>
          Mobile UI / UX
        </div>
        <div className="phone-grid">
          {mobileProjects.map((p) => <PhoneCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
