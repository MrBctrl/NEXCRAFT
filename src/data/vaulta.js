// VAULTA — confirmed facts from live site meta tags
// (https://vaulta-bice.vercel.app/) plus the uploaded brand identity sheet.
// Palette verified by pixel-sampling the actual swatches in the sheet
// (one swatch's printed hex label was truncated/unreadable and blends
// into the background — skipped rather than guessed).

export const vaulta = {
  slug: 'vaulta',
  name: 'VAULTA',
  industry: 'Fintech',
  tagline: 'Banking Beyond Boundaries',
  description: 'A premium digital financial ecosystem for individuals and businesses.',
  liveUrl: 'https://vaulta-bice.vercel.app/',

  theme: {
    ivory: '#0A1236',    // deep navy — primary background (dark-mode brand)
    charcoal: '#E5E8EC', // light grey — primary text on navy
    gold: '#14B8A6',     // teal — accent
  },
  fonts: {
    display: 'Space Grotesk, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', img: '/images/vaulta/desktop-hero.jpg' },
      { id: 'personal-dashboard', label: 'Personal Dashboard', img: '/images/vaulta/desktop-personal.jpg' },
      { id: 'business-dashboard', label: 'Business Dashboard', img: '/images/vaulta/desktop-business.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/vaulta/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/vaulta/mobile-hero.jpg' },
      { id: 'mobile-dashboard', label: 'Mobile — Dashboard', img: '/images/vaulta/mobile-dashboard.jpg' },
    ],
    scrollVideo: '/videos/vaulta/vaulta-scroll.mp4',
  },
}
