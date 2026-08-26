// LUMEN — full brand palette confirmed by pixel-sampling the uploaded
// brand identity sheet. All six labels were legible and matched their
// swatches — no corrections needed. Oxford Navy (#0B2545) also matches
// the live site's theme-color meta tag exactly, confirming it across two
// independent sources. Tagline matches the live site too ("Limitless
// Potential.") — no conflict here, unlike ELANE/AURELIA/LUMORA.

export const lumen = {
  slug: 'lumen',
  name: 'LUMEN',
  industry: 'Education',
  tagline: 'Limitless Potential.',
  description:
    'A premium education ecosystem for learners, educators and institutions who believe in excellence.',
  liveUrl: 'https://lumen-green-nine.vercel.app/',

  theme: {
    ivory: '#F8F4E3',    // Ivory — background
    charcoal: '#0B2545', // Oxford Navy — primary text (confirmed via live site meta too)
    gold: '#C9A227',     // Antique Gold — accent
  },
  fonts: {
    display: 'Cormorant Garamond, serif',
    body: 'Inter, sans-serif',
  },

  // Full confirmed palette (not all used by WorldTemplate yet)
  palette: {
    oxfordNavy: '#0B2545',
    forestGreen: '#1B4332',
    antiqueGold: '#C9A227',
    ivory: '#F8F4E3',
    charcoal: '#36454F',
    darkBrown: '#4E342E',
  },

  // Extra confirmed facts, not yet rendered by WorldTemplate
  quote: {
    text: 'The beautiful thing about learning is that no one can take it away from you.',
    attribution: 'B. B. King',
  },
  values: ['Curiosity', 'Excellence', 'Integrity', 'Community', 'Impact'],

  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', img: '/images/lumen/desktop-hero.jpg' },
      { id: 'portals', label: 'Portals', img: '/images/lumen/desktop-portals.jpg' },
      { id: 'courses', label: 'Courses / Admin', img: '/images/lumen/desktop-courses.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/lumen/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/lumen/mobile-hero.jpg' },
      { id: 'mobile-portal', label: 'Mobile — Portal', img: '/images/lumen/mobile-portal.jpg' },
    ],
    scrollVideo: '/videos/lumen/lumen-scroll.mp4',
  },
}
