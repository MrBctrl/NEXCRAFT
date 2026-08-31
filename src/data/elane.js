// ÉLANE — confirmed facts only.
// Tagline, description and theme-color pulled from the live site's meta
// tags (https://elane-sigma.vercel.app/). Color palette and typefaces are
// the established brand tokens from prior sessions. No client names,
// stats, or copy have been invented.

export const elane = {
  slug: 'elane',
  name: 'ÉLANE',
  industry: 'Fashion / Retail',
  tagline: 'Quiet Luxury, Worn With Intention',
  description:
    'A contemporary luxury fashion house rooted in African craftsmanship — tailoring, ready-to-wear, and accessories for those who choose confidence over noise.',
  liveUrl: 'https://elane-sigma.vercel.app/',

  theme: {
    ivory: '#F7F3EA',
    charcoal: '#2B2622',
    gold: '#B79B6B',
  },
  fonts: {
    display: 'Fraunces, serif',
    body: 'Inter, sans-serif',
  },

  // The website showcase captures live here once you export them from the
  // real site. Drop files into public/images/elane/ and public/videos/elane/
  // using these exact names, or edit the paths below to match what you export.
  // Any entry below can take multiple shots for its section: change
  // `img: '/path.jpg'` to `img: ['/path-1.jpg', '/path-2.jpg', '/path-3.jpg']`
  // and small prev/next arrows appear automatically on that shot.
  showcase: {
    desktop: [
      {
        id: 'home-hero',
        label: 'Homepage — Hero',
        img: [
          '/images/elane/desktop-hero.png',
          '/images/elane/desktop-hero-2.png',
          '/images/elane/desktop-hero-3.png',
          '/images/elane/desktop-hero-4.png',
          '/images/elane/desktop-hero-5.png',
        ],
      },
      { id: 'collection', label: 'Collection', 
        img: [
          '/images/elane/desktop-collection.png',
          '/images/elane/desktop-collection2.png',
          '/images/elane/desktop-collection3.png',
          '/images/elane/desktop-collection4.png',
          '/images/elane/desktop-collection5.png',
          '/images/elane/desktop-collection6.png',
        ],
      },
      { id: 'about', label: 'About / Craftsmanship', 
        img: [
          '/images/elane/desktop-about.png',
          '/images/elane/desktop-about2.png',
          '/images/elane/desktop-about3.png',
          '/images/elane/desktop-about4.png',
        ], 
      },
      { id: 'journey', label: 'Journey', img: '/images/elane/desktop-journey.png' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', 
        img: [
          '/images/elane/mobile-hero.png',
          '/images/elane/mobile-hero2.png',
          '/images/elane/mobile-hero3.png',
          '/images/elane/mobile-hero4.png',
          '/images/elane/mobile-hero5.png',
          '/images/elane/mobile-hero6.png',
        ],
      },
      { id: 'mobile-about', label: 'Mobile — About',
        img: ['/images/elane/mobile-about.png'],
      },
      { id: 'mobile-collection', label: 'Mobile — Collection', 
        img: [
          '/images/elane/mobile-collection.png',
          '/images/elane/mobile-collection2.png',
        ],
      },
    ],
    scrollVideo: '/videos/elane/elane-scroll.mp4', 
  },
}
