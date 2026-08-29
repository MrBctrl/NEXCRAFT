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
          '/images/elane/desktop-hero.jpg',
          '/images/elane/desktop-hero-2.jpg',
          '/images/elane/desktop-hero-3.jpg',
        ],
      },
      { id: 'collection', label: 'Collection', img: '/images/elane/desktop-collection.jpg' },
      { id: 'about', label: 'About / Craftsmanship', img: '/images/elane/desktop-about.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/elane/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/elane/mobile-hero.jpg' },
      { id: 'mobile-collection', label: 'Mobile — Collection', img: '/images/elane/mobile-collection.jpg' },
    ],
    scrollVideo: '/videos/elane/elane-scroll.mp4', // 8-15s autoplay muted loop, optional
  },
}
