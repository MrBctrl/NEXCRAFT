// AURELIA — brand palette confirmed by pixel-sampling the uploaded brand
// identity sheet directly. Three of the six hex labels printed on the
// sheet were corrupted/unreadable (an image-generation text artifact, not
// a real font) — those three (Warm Sand, Soft Grey, Gold Accent) use
// measured pixel colors instead. Deep Teal, Sage Green and Navy had clean
// legible labels that matched their sampled swatches, so those are used
// as printed. Background is the sheet's actual page color, also sampled.
//
// Tagline/description below come from the brand sheet ("Elevating Everyday
// Healthcare.") rather than the live site's meta tags ("Care that grows
// with you") since the sheet is the more recently confirmed source — the
// live site copy may be an earlier pass.

export const aurelia = {
  slug: 'aurelia',
  name: 'AURELIA',
  industry: 'Healthcare',
  tagline: 'Elevating Everyday Healthcare.',
  description:
    'Calm, thoughtful healthcare in Cotonou — book appointments, explore specialists, and browse the health library.',
  liveUrl: 'https://aurelia-three-tan.vercel.app/',

  theme: {
    ivory: '#F5F3F0',    // sampled page background
    charcoal: '#0D5C63', // Deep Teal — confirmed label, matches wordmark
    gold: '#BF9B65',     // Gold Accent — label was corrupted, pixel-sampled
  },
  fonts: {
    display: 'Cormorant Garamond, serif',
    body: 'Inter, sans-serif',
  },

  // Full confirmed palette (not all used by WorldTemplate yet)
  palette: {
    deepTeal: '#0D5C63',
    sageGreen: '#6B8F7A',
    warmSand: '#E3D9CB',  // label corrupted, pixel-sampled
    softGrey: '#ECEBE7',  // label corrupted, pixel-sampled
    navy: '#0F1F2E',
    goldAccent: '#BF9B65', // label corrupted, pixel-sampled
  },

  // Any entry below can take multiple shots for its section: change
  // `img: '/path.jpg'` to `img: ['/path-1.jpg', '/path-2.jpg', '/path-3.jpg']`
  // and small prev/next arrows appear automatically on that shot.
  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', img: '/images/aurelia/desktop-hero.jpg' },
      { id: 'specialists', label: 'Specialists', img: '/images/aurelia/desktop-specialists.jpg' },
      { id: 'health-library', label: 'Health Library', img: '/images/aurelia/desktop-library.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/aurelia/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/aurelia/mobile-hero.jpg' },
      { id: 'mobile-booking', label: 'Mobile — Booking', img: '/images/aurelia/mobile-booking.jpg' },
    ],
    scrollVideo: '/videos/aurelia/aurelia-scroll.mp4', // optional, 8-15s muted loop
  },
}
