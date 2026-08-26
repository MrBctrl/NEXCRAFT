import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { flagships } from '../data/flagships.js'

export default function FlagshipWorld() {
  const { slug } = useParams()
  const flagship = flagships.find((f) => f.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!flagship) return <Navigate to="/" replace />

  const style = flagship.theme
    ? {
        background: flagship.theme.bg,
        color: flagship.theme.paper,
        '--fp-accent': flagship.theme.accent,
      }
    : undefined

  return (
    <div className="flagship-world" style={style}>
      <Link to="/" className="flagship-back">← NEXCRAFT</Link>
      <div className="flagship-world-intro">
        <div className="flagship-world-industry">{flagship.industry}</div>
        <h1 className="flagship-world-name">{flagship.name}</h1>
        <p className="flagship-world-status">World in progress — this case study is being built.</p>
      </div>
    </div>
  )
}
