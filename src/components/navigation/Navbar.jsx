import { memo, useState, useEffect } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#founder', label: 'Founder' },
  { href: '#work', label: 'Work' },
  { href: '#uiux', label: 'UI / UX' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

function Navbar({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
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
                aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        inert={menuOpen ? undefined : ''}
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

export default memo(Navbar)
