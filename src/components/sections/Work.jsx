import { useState } from 'react'
import { portfolioItems, filterTabs } from '../../data/portfolio.js'
import Lightbox from '../galleries/Lightbox.jsx'

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [activeItem, setActiveItem] = useState(null)

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
        {portfolioItems.map((item) => {
          const hidden = filter !== 'all' && item.filter !== filter
          return (
            <div
              key={item.id}
              className={`port-item ${item.id} ${hidden ? 'hidden' : ''}`}
              tabIndex={0}
              role="button"
              onClick={() => setActiveItem(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveItem(item) } }}
            >
              <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
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

      <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  )
}
