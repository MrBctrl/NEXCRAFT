import { useEffect, useLayoutEffect, useState } from 'react'

const KEY = 'nx-splash-seen'

function shouldShow() {
  try { if (sessionStorage.getItem(KEY)) return false } catch { /* storage blocked */ }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.location.pathname.startsWith('/admin')) return false
  return true
}

const BOTS = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.4
  const r = 160 + ((i * 53) % 140)
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, d: (i * 29) % 340, s: 4 + (i % 3) * 2 }
})

// Quick brand splash, once per browser session. Pure inline SVG + CSS so it
// adds no network request; the page underneath loads while it plays.
export default function LogoSplash() {
  const [phase, setPhase] = useState(() => (shouldShow() ? 'in' : 'off'))

  useLayoutEffect(() => {
    if (phase === 'off') return undefined
    document.documentElement.classList.add('has-splash')
    return () => document.documentElement.classList.remove('has-splash')
  }, [phase])

  useEffect(() => {
    if (phase === 'off') return undefined
    try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
    const t1 = setTimeout(() => setPhase('out'), 1500)
    const t2 = setTimeout(() => setPhase('off'), 1950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase === 'off'])

  if (phase === 'off') return null

  return (
    <div
      className={`splash ${phase === 'out' ? 'splash-out' : ''}`}
      role="presentation"
      onClick={() => setPhase('off')}
    >
      <div className="splash-stage">
        {BOTS.map((b, i) => (
          <i
            className="splash-bot"
            key={i}
            style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--d': `${b.d}ms`, width: b.s, height: b.s }}
          />
        ))}
        <svg className="splash-logo" viewBox="290 190 690 850" aria-label="NEXCRAFT" role="img">
          <path className="sl-p sl-w" d="M318 216 L745 572 L745 690 L420 428 L420 795 L476 742 L514 800 L318 1005 Z" />
          <path className="sl-p sl-r1" d="M938 342 L938 1013 L498 636 L498 510 L840 800 L840 433 Z" />
          <path className="sl-p sl-r2" d="M743 405 L938 216 L938 328 L786 477 Z" />
        </svg>
      </div>
    </div>
  )
}
