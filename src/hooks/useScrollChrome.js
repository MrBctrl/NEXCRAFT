import { useEffect, useState } from 'react'

// Combines progress bar %, nav "scrolled" state, and active-section id —
// the three scroll-driven concerns previously wired directly to the DOM
// in script.js.
export function useScrollChrome(sectionIds = []) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 60)

      let current = ''
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 130) {
          current = id
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { progress, scrolled, activeSection }
}
