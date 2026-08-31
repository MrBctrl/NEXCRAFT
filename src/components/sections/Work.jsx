import { useState, useEffect } from 'react'
import { filterTabs } from '../../data/portfolio.js'
import { fetchVisiblePortfolioItems } from '../../services/portfolioService.js'
import ProjectLightbox from '../galleries/ProjectLightbox.jsx'

export default function Work() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [activeGroup, setActiveGroup] = useState(null)
  const [activeStartIndex, setActiveStartIndex] = useState(0)

  useEffect(() => {
    fetchVisiblePortfolioItems().then(setItems)
  }, [])

  const openItem = (item) => {
    const group = items.filter((i) => (i.subcategory || i.filter) === (item.subcategory || item.filter))
    setActiveGroup(group)
    setActiveStartIndex(group.findIndex((i) => i.id === item.id))
  }

  return (
    <section id="work" className="section-light">
      <div className="section-label">Section 03</div>
      <h2 className="section-heading">Graphic <em>Design</em> Work</h2>
      <p className="work-intro reveal">
        A curated selection of branding, print, and digital design projects — each one built with intention.
      </p>

      <div className="filter-tabs reveal">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="portfolio-grid reveal">
        {items.map((item) => {
          const hidden = filter !== 'all' && item.filter !== filter
          return (
            <div
              key={item.id}
              className={`port-item ${hidden ? 'hidden' : ''}`}
              tabIndex={0}
              role="button"
              onClick={() => openItem(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item) } }}
            >
              <img src={item.images[0]} alt={item.title} loading="lazy" decoding="async" />
              <div className="port-overlay">
                <div className="port-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ProjectLightbox group={activeGroup} startIndex={activeStartIndex} onClose={() => setActiveGroup(null)} />
    </section>
  )
}