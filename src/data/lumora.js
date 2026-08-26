// LUMORA — brand palette confirmed by pixel-sampling the uploaded brand
// identity sheet. All six hex labels were legible this time and matched
// their sampled swatch colors within normal antialiasing tolerance — no
// corrections needed, unlike AURELIA/EMBER & OAK's sheets.
//
// Three taglines exist across sources: the live site's meta tag ("Light
// Reveals Home"), the sheet's logo subtitle ("Premium Living & Property
// Services"), and the sheet's footer slogan ("Every Detail. Every Space.
// Beautifully Connected."). Using the footer slogan as the primary
// tagline since it reads as the actual brand line; the subtitle is folded
// into the description. Worth checking which is meant to be canonical.

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

  showcase: {
    desktop: [
      { id: 'home-hero', label: 'Homepage — Hero', img: '/images/lumora/desktop-hero.jpg' },
      { id: 'listings', label: 'Listings', img: '/images/lumora/desktop-listings.jpg' },
      { id: 'divisions', label: 'Divisions', img: '/images/lumora/desktop-divisions.jpg' },
      { id: 'footer', label: 'Footer', img: '/images/lumora/desktop-footer.jpg' },
    ],
    mobile: [
      { id: 'mobile-hero', label: 'Mobile — Hero', img: '/images/lumora/mobile-hero.jpg' },
      { id: 'mobile-listing', label: 'Mobile — Listing', img: '/images/lumora/mobile-listing.jpg' },
    ],
    scrollVideo: '/videos/lumora/lumora-scroll.mp4',
  },
}
