import ServiceCard from '../shared/ServiceCard.jsx'

const SERVICES = [
  { num: '01', icon: '🎯', title: "Brand Identity Design", desc: "Full brand systems from concept to delivery — logos, color palettes, typography, brand guidelines. Everything your business needs to look unforgettable and professionally established.", tags: ["Logo Design", "Brand Guide", "CorelDRAW"] },
  { num: '02', icon: '🎨', title: "Print & Digital Design", desc: "Posters, banners, flyers, social media content, ads, and event graphics — designed to grab attention and communicate clearly across every format and platform.", tags: ["Flyers", "Banners", "Social Media"] },
  { num: '03', icon: '📦', title: "Packaging & Mockups", desc: "Product packaging design and professional mockup presentations that make your brand look premium and market-ready before you print a single copy.", tags: ["Packaging", "Mockups", "Product Design"] },
  { num: '04', icon: '🖥️', title: "UI / UX Design", desc: "Clean, intuitive interfaces for web and mobile apps. We design systems people actually enjoy using — wireframes, prototypes, and pixel-perfect final designs.", tags: ["Web UI", "Mobile UI", "Prototyping"] },
  { num: '05', icon: '💻', title: "Web Development", desc: "Custom websites, web systems, and software built with PHP and MySQL. From portfolio sites to full management systems — functional, clean, and built to last.", tags: ["PHP / MySQL", "HTML / CSS", "Web Systems"] },
  { num: '06', icon: '🎬', title: "Motion & Apparel", desc: "Animated graphics, motion posters, and bold print-ready apparel designs for fashion brands, merchandise drops, and digital campaigns.", tags: ["Motion Design", "T-Shirt Design", "Animation"] },
]

export default function Services() {
  return (
    <section id="services" className="section-dark">
      <div className="section-label accent-label">Section 02</div>
      <h2 className="section-heading light-heading">What We <em>Offer</em></h2>
      <div className="services-grid reveal">
        {SERVICES.map((s) => <ServiceCard key={s.num} {...s} />)}
      </div>
    </section>
  )
}
