import { useEffect, useState } from 'react'

export default function LogoReveal({ flagship, onDone }) {
  const storageKey = `nexcraft-visited-${flagship.slug}`
  const [visible, setVisible] = useState(() => {
    try { return !localStorage.getItem(storageKey) } catch { return true }
  })

  useEffect(() => {
    if (!visible) { onDone(); return }
    try { localStorage.setItem(storageKey, 'true') } catch {}
    const t = setTimeout(() => { setVisible(false); onDone() }, 2000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (!visible) return null

  const skip = () => { setVisible(false); onDone() }
  const style = flagship.theme
    ? { background: flagship.theme.charcoal || flagship.theme.bg, color: flagship.theme.ivory || flagship.theme.paper }
    : undefined

  return (
    <div className="logo-reveal" style={style}>
      <div className="logo-reveal-mark" style={{ color: flagship.theme?.gold || flagship.theme?.accent }}>
        {flagship.name}
      </div>
      <div className="logo-reveal-tagline">{flagship.tagline}</div>
      <button className="logo-reveal-skip" onClick={skip}>Skip →</button>
    </div>
  )
}
