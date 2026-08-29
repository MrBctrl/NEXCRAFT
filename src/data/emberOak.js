// EMBER & OAK — confirmed facts from the live site
// (https://ember-and-oak-ebon.vercel.app/) plus the uploaded brand identity
// sheet. Two of the five printed hex labels were garbled in the sheet
// (Espresso read as a navy-purple value that didn't match the actual brown
// swatch; Cream's label had an invalid extra character) — both corrected
// by pixel-sampling the real swatch colors rather than trusting the
// broken text. Charcoal, Copper and Oak matched their labels and are used
// as printed.

export const emberOak = {
  slug: 'ember-oak',
  name: 'EMBER & OAK',
  industry: 'Hospitality',
  tagline: 'Slow Fire, Considered Craft',
  description:
    'A fire-led table for late evenings, generous pours, and food made slowly enough to remember. Cotonou, Benin — since 2018.',
  liveUrl: 'https://ember-and-oak-ebon.vercel.app/',

  theme: {
    ivory: '#0F0E0E',    // charcoal — primary background (dark, moody)
    charcoal: '#F6EEE5', // cream — primary text (pixel-verified, label was garbled)
    gold: '#B67333',     // copper — accent
  },
  fonts: {
    display: 'Cormorant Garamond, serif',
    body: 'Inter, sans-serif',
  },

  // Extra confirmed facts, not yet used by WorldTemplate
  address: '12 Avenue des Cocotiers, Haie Vive, Cotonou, Benin',
  phone: '+229 90 67 21 63 52',
  email: 'hello@emberandoak.com',
  hours: 'Tue–Thu 18:00–23:00 · Fri–Sat 18:00–00:00 · Sun 17:00–22:00',
  chef: 'Chef Amara Mensah',

  // Any entry below can take multiple shots for its section: change
  // `img: '/path.jpg'` to `img: ['/path-1.jpg', '/path-2.jpg', '/path-3.jpg']`
  // and small prev/next arrows appear automatically on that shot.
  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', img: '/images/ember-oak/desktop-hero.jpg' },
      { id: 'menu', label: 'Menu', img: '/images/ember-oak/desktop-menu.jpg' },
      { id: 'story', label: 'Our Story', img: '/images/ember-oak/desktop-story.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/ember-oak/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/ember-oak/mobile-hero.jpg' },
      { id: 'mobile-reservations', label: 'Mobile — Reservations', img: '/images/ember-oak/mobile-reservations.jpg' },
    ],
    scrollVideo: '/videos/ember-oak/ember-oak-scroll.mp4',
  },
}
