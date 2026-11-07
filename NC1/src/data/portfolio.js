// `images` holds every shot for a project — the grid thumbnail is always
// images[0]. `subcategory` groups items for the lightbox arrows (falls
// back to `filter` if not set) — narrower than the nav tabs so clicking
// a logo cycles through logos, not everything in "Branding".
//
// Each item has 4 images. Only images[0] is an actual existing file for
// now — the numbered ones (Name1, Name2, Name3) are placeholders. Drop
// real files into public/images/ using these exact filenames and they'll
// show up automatically.
export const portfolioItems = [
  { id: 'p1',  filter: 'print',    subcategory: 'fashion',    title: "Fashion Collection Poster",     desc: "Editorial Design",
    images: [
      "/images/Fashion.png",
      "/images/Fashion1.png",
      "/images/Fashion2.png",
      "/images/Fashion3.png",
    ],
  },
  { id: 'p2',  filter: 'branding', subcategory: 'logo',       title: "Beluxe Hairhub",                desc: "Logo & Brand Identity",
    images: [
      "/images/Beluxe.jpg",
      "/images/Beluxe1.jpg",
      "/images/Beluxe2.jpg",
      "/images/Beluxe3.jpg",
    ],
  },
  { id: 'p3',  filter: 'print',    subcategory: 'ad',         title: "D'lip Therapy",                 desc: "Product Advertisement",
    images: [
      "/images/Dlip 2.jpg",
      "/images/Dlip 3.jpg",
      "/images/Dlip 4.jpg",
      "/images/Dlip 5.jpg",
    ],
  },
  { id: 'p4',  filter: 'mockup',   subcategory: 'mockup',     title: "Cafe Mockup",                   desc: "Packaging & Mockup",
    images: [
      "/images/Brand mockup.png",
      "/images/Brand mockup1.png",
      "/images/Brand mockup2.png",
      "/images/Brand mockup3.png",
    ],
  },
  { id: 'p5',  filter: 'print',    subcategory: 'flyer',      title: "Cherryfield Schools Banner",    desc: "Print Design",
    images: [
      "/images/School Banner.jpg",
      "/images/School Banner1.jpg",
      "/images/School Banner2.jpg",
      "/images/School Banner3.jpg",
    ],
  },
  { id: 'p6',  filter: 'branding', subcategory: 'letterhead', title: "Cherryfield Hiring Flyer",      desc: "Print Design",
    images: [
      "/images/school-hiring.png",
      "/images/school-hiring1.png",
      "/images/school-hiring2.png",
      "/images/school-hiring3.png",
    ],
  },
  { id: 'p7',  filter: 'print',    subcategory: 'social',     title: "Velvet Nails Studio",           desc: "Social Media Design",
    images: [
      "/images/Velvet Nails.jpg",
      "/images/Velvet Nails1.jpg",
      "/images/Velvet Nails2.jpg",
      "/images/Velvet Nails3.jpg",
    ],
  },
  { id: 'p8',  filter: 'apparel',  subcategory: 'apparel',    title: "Swaggy Xclusive",               desc: "Apparel Design",
    images: [
      "/images/Swaggy Fashion 2.jpg",
      "/images/Swaggy Fashion 3.jpg",
      "/images/Swaggy Fashion 4.jpg",
      "/images/Swaggy Fashion 5.jpg",
    ],
  },
  { id: 'p9',  filter: 'print',    subcategory: 'poster',     title: "Marvelous Baptist Church",      desc: "Event Print Design",
    images: [
      "/images/churcu-flyer.jpg",
      "/images/churcu-flyer1.jpg",
      "/images/churcu-flyer2.jpg",
      "/images/churcu-flyer3.jpg",
    ],
  },
  { id: 'p10', filter: 'print',    subcategory: 'social',     title: "Valentine's Design",            desc: "Social Media Design",
    images: [
      "/images/valentine.jpg",
      "/images/valentine1.jpg",
      "/images/valentine2.jpg",
      "/images/valentine3.jpg",
    ],
  },
]

export const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'branding', label: 'Branding' },
  { key: 'print', label: 'Print & Digital' },
  { key: 'mockup', label: 'Mockups' },
  { key: 'apparel', label: 'Apparel' },
]