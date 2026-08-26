import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#uiux', label: 'UI / UX' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-brand">Nexcraft<span>.</span></a>
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false) }}
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
