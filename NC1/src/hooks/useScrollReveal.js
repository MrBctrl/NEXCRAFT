import { useEffect } from 'react'

// Attaches an IntersectionObserver to every element with class="reveal"
// currently in the DOM and adds "visible" with a slight stagger, matching
// the original script.js behavior. Re-run when route/content changes by
// passing a dependency array.
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
