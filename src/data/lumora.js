
export const lumora = {
  slug: 'lumora',
  name: 'LUMORA',
  industry: 'Property / Home Services',
  tagline: 'Every Detail. Every Space. Beautifully Connected.',
  description:
    'Premium Living & Property Services — Property, Interior Design, Furnishing, Home Services and Property Management under one roof.',
  liveUrl: 'https://lumora-mu-khaki.vercel.app/',
  // Brand sheet lists lumora.com as the intended domain — not yet live.

  theme: {
    ivory: '#F8F5F0',    // Warm Ivory — background
    charcoal: '#2F2F2F', // Slate Charcoal — primary text
    gold: '#C6A15B',     // Brushed Brass — accent
  },
  fonts: {
    display: 'Cormorant Garamond, serif',
    body: 'Inter, sans-serif',
  },

  // Full confirmed palette (not all used by WorldTemplate yet)
  palette: {
    warmIvory: '#F8F5F0',
    walnutBrown: '#6E5645',
    slateCharcoal: '#2F2F2F',
    softSage: '#A8B2A1',
    stoneGrey: '#D9D6D2',
    brushedBrass: '#C6A15B',
  },

  // Logo symbolism, from the sheet — not rendered yet, kept for a future
  // richer World build.
  logoMeaning: {
    doorway: 'New beginnings, opportunity, welcome.',
    light: 'Lumen. Clarity, warmth, life.',
    structure: 'Architecture, trust, strength, balance.',
  },

  // Any entry below can take multiple shots for its section: change
  // `img: '/path.jpg'` to `img: ['/path-1.jpg', '/path-2.jpg', '/path-3.jpg']`
  // and small prev/next arrows appear automatically on that shot.
  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', 
        img: [
          '/images/lumora/desktop-hero.png',
          '/images/lumora/desktop-hero2.png',
          '/images/lumora/desktop-hero3.png',
          '/images/lumora/desktop-hero4.png',
          '/images/lumora/desktop-hero5.png',
        ], 
      },
      { id: 'listings', label: 'Listings', 
        img: [
          '/images/lumora/desktop-listings.png',
          '/images/lumora/desktop-listings2.png',
          '/images/lumora/desktop-listings3.png',
          '/images/lumora/desktop-listings4.png',
          '/images/lumora/desktop-listings5.png',
      ], 
    },
      { id: 'divisions', label: 'Divisions', 
        img: [
          '/images/lumora/desktop-divisions.png'

      ], 
    },
      { id: 'booking', label: 'booking', 
        img: [
          '/images/lumora/desktop-booking.png'
      ], 
    },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', 
        img: [
          '/images/lumora/mobile-hero.png',
          '/images/lumora/mobile-hero2.png',
        ], 
      },
      { id: 'mobile-listing', label: 'Mobile — Listing', 
        img: [
          '/images/lumora/mobile-listing.png',
          '/images/lumora/mobile-listing2.png',
        ], 
      },
    ],
    scrollVideo: '/videos/lumora/lumora-scroll.mp4',
  },
}
