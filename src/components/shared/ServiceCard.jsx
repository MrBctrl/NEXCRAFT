export default function ServiceCard({ num, title, desc, tags }) {
  return (
    <li className="service-row reveal">
      <span className="service-num">{num}</span>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>
      <ul className="service-tags" aria-label={`${title} tools and focus areas`}>
        {tags.map((t) => <li className="tag" key={t}>{t}</li>)}
      </ul>
    </li>
  )
}
