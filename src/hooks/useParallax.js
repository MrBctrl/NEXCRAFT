import { useEffect } from 'react'

// Elements with data-parallax="<factor>" drift relative to scroll. Only
// elements currently near the viewport are updated, once per frame, and
// only the `translate` property is written (no layout). Disabled for
// reduced-motion users and on small screens.
export function useParallax() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 768px)')
    if (mq.matches) return undefined

    const els = [...document.querySelectorAll('[data-parallax]')]
    const live = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target)))
    }, { rootMargin: '200px 0px' })
    els.forEach((el) => io.observe(el))

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      live.forEach((el) => {
        const box = (el.parentElement || el).getBoundingClientRect()
        const f = parseFloat(el.dataset.parallax) || 0
        const delta = small.matches ? 0 : (box.top + box.height / 2 - vh / 2) * f
        el.style.setProperty('--py', delta.toFixed(1))
      })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
