import NanoText from '../shared/NanoText.jsx'
import ServiceCard from '../shared/ServiceCard.jsx'

const SERVICES = [
  { num: '01', title: 'Web Development', desc: 'Websites and web applications built with HTML, CSS, JavaScript and React, backed by PHP, MySQL or Supabase. Responsive, fast and written to be maintained.', tags: ['React + Vite', 'PHP / MySQL', 'Supabase'] },
  { num: '02', title: 'UI / UX Design', desc: 'Interfaces designed in Figma, from structure and flow to finished screens. Wireframes, prototypes and layouts that make a product easy to understand and use.', tags: ['Figma', 'Wireframes', 'Prototyping'] },
  { num: '03', title: 'Graphic & Social Media Design', desc: 'Posters, flyers, banners, social media content, packaging mockups and apparel graphics, designed to communicate clearly in print and on screen.', tags: ['Print', 'Social media', 'Mockups'] },
  { num: '04', title: 'Branding & Visual Identity', desc: 'Logos, colour, typography and the guidelines that hold them together, so a business looks consistent everywhere it appears.', tags: ['Logo design', 'Brand guide', 'CorelDRAW'] },
  { num: '05', title: 'AI Automation', desc: 'Workflows built in n8n that connect the tools a business already uses and remove repetitive manual work, designed around a real operational problem.', tags: ['n8n', 'Integrations', 'Workflow design'] },
]

export default function Services() {
  return (
    <section id="services" className="section-light" aria-labelledby="services-heading">
      <div className="section-label">Section 05</div>
      <NanoText className="section-heading" id="services-heading">What NEXCRAFT <em>Does</em></NanoText>
      <p className="work-intro reveal">
        Five disciplines handled by one person, so a project can move from identity to interface to working system without a handover.
      </p>
      <ul className="services-list">
        {SERVICES.map((s) => <ServiceCard key={s.num} {...s} />)}
      </ul>
    </section>
  )
}
