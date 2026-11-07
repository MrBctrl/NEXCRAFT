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

  // Filtered items are removed from the grid (not just faded) so the grid
  // reflows without gaps and hidden items cannot receive keyboard focus.
  const visibleItems = filter === 'all' ? items : items.filter((i) => i.filter === filter)

  const openItem = (item) => {
    const group = items.filter((i) => (i.subcategory || i.filter) === (item.subcategory || item.filter))
    setActiveGroup(group)
    setActiveStartIndex(group.findIndex((i) => i.id === item.id))
  }

  return (
    <section id="work" className="section-light" aria-labelledby="work-heading">
      <div className="section-label">Section 03</div>
      <h2 className="section-heading" id="work-heading">Graphic <em>Design</em> Work</h2>
      <p className="work-intro reveal">
        A selection of branding, print and digital design projects. Open any project to see the full set.
      </p>

      <div className="filter-tabs reveal">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
            aria-pressed={filter === tab.key}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="portfolio-grid reveal">
        {visibleItems.map((item) => {
          return (
            <div
              key={item.id}
              className="port-item"
              tabIndex={0}
              role="button"
              aria-label={`${item.title}, ${item.desc}. Open project`}
              onClick={() => openItem(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item) } }}
            >
              <img src={item.images[0]} alt="" loading="lazy" decoding="async" />
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