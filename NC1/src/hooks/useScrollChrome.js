import { useEffect, useState } from 'react'

// Combines progress bar %, nav "scrolled" state, and active-section id.
// Scroll events are coalesced to one update per animation frame and the
// listener is passive, so scrolling never waits on React work.
export function useScrollChrome(sectionIds = []) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (y / total) * 100) : 0)
      setScrolled(y > 60)

      let current = ''
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && y >= section.offsetTop - 130) current = id
      })
      setActiveSection(current)
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { progress, scrolled, activeSection }
}
