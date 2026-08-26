import { useEffect } from 'react'

// Maps a font-family string like "Cormorant Garamond, serif" to its
// Google Fonts family param.
const FONT_QUERY = {
  'Fraunces': 'Fraunces:ital,wght@0,400;0,500;0,600;1,400',
  'Inter': 'Inter:wght@300;400;500;600',
  'Space Grotesk': 'Space+Grotesk:wght@400;500;600;700',
  'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400',
}

export function useFlagshipFonts(fonts) {
  useEffect(() => {
    if (!fonts) return

    const families = [fonts.display, fonts.body]
      .filter(Boolean)
      .map((f) => f.split(',')[0].trim())
      .filter((name) => FONT_QUERY[name])

    if (families.length === 0) return

    const params = families.map((f) => FONT_QUERY[f]).join('&family=')
    const href = `https://fonts.googleapis.com/css2?family=${params}&display=swap`

    const existing = document.querySelector(`link[data-flagship-font="${href}"]`)
    if (existing) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.dataset.flagshipFont = href
    document.head.appendChild(link)

    return () => {
      // Leave it cached in the browser rather than yanking it — avoids a
      // flash of unstyled text if the person navigates back to this World.
    }
  }, [fonts])
}
