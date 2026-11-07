import { Link } from 'react-router-dom'

export default function FlagshipPortalCard({ flagship }) {
  const themed = !!flagship.theme
  const style = themed
    ? {
        '--fp-bg': flagship.theme.bg,
        '--fp-accent': flagship.theme.accent,
        '--fp-paper': flagship.theme.paper,
      }
    : undefined

  return (
    <Link
      to={`/work/${flagship.slug}`}
      className={`portal-card ${themed ? 'portal-card-themed' : ''}`}
      style={style}
    >
      <div className="portal-card-industry">{flagship.industry}</div>
      <div className="portal-card-body">
        <div className="portal-card-name">{flagship.name}</div>
        {flagship.tagline && <div className="portal-card-tagline">{flagship.tagline}</div>}
      </div>
      <div className="portal-card-enter">
        Enter World
        <span className="portal-card-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  )
}
