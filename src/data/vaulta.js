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

  // Any entry below can take multiple shots for its section: change
  // `img: '/path.jpg'` to `img: ['/path-1.jpg', '/path-2.jpg', '/path-3.jpg']`
  // and small prev/next arrows appear automatically on that shot.
  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', 
        img: [
          '/images/vaulta/desktop-hero.png',
          '/images/vaulta/desktop-hero2.png',
          '/images/vaulta/desktop-hero3.png',
          '/images/vaulta/desktop-hero4.png',
          '/images/vaulta/desktop-hero5.png',
          '/images/vaulta/desktop-hero6.png',
        ],   
      },
      { id: 'signup', label: 'signup', img: '/images/vaulta/signup.png' },
      { id: 'personal-dashboard', label: 'Personal Dashboard', 
        img: [
          '/images/vaulta/desktop-personal.png',
          '/images/vaulta/desktop-personal2.png',
          '/images/vaulta/desktop-personal3.png',
          '/images/vaulta/desktop-personal5.png',
          '/images/vaulta/desktop-personal4.png',
        ],
      },
      { id: 'business-dashboard', label: 'Business Dashboard', 
        img: [
          '/images/vaulta/desktop-business.png',
          '/images/vaulta/desktop-business2.png',
          '/images/vaulta/desktop-business3.png',
          '/images/vaulta/desktop-business4.png',
          '/images/vaulta/desktop-business5.png',
          '/images/vaulta/desktop-business6.png',
        ], 
      },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', 
        img: [
          '/images/vaulta/mobile-hero.png',
          '/images/vaulta/mobile-hero2.png',
          '/images/vaulta/mobile-hero3.png',
          '/images/vaulta/mobile-hero4.png',
          '/images/vaulta/mobile-hero5.png',
        ],
      },
      { id: 'mobile-dashboard', label: 'Mobile — Dashboard', 
        img: [
          '/images/vaulta/mobile-dashboard.png',
          '/images/vaulta/mobile-dashboard2.png',
          '/images/vaulta/mobile-dashboard3.png',
          '/images/vaulta/mobile-dashboard4.png',
          '/images/vaulta/mobile-dashboard5.png',
        ], 
      },
    ],
    scrollVideo: '/videos/vaulta/vaulta-scroll.mp4',
  },
}
