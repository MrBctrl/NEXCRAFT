// Wraps any block. When it scrolls into view a grid of tiny accent "bots"
// swarms over it and dissolves in random order, revealing the content.
export default function NanoBlock({ cols = 6, rows = 6, as: Tag = 'div', className = '', children, ...rest }) {
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const d = Math.round((((i * 9301 + 49297) % 233280) / 233280) * 650)
    return <i className="nano-cell" key={i} style={{ '--d': `${d}ms` }} />
  })
  return (
    <Tag className={`nano-block reveal ${className}`} {...rest}>
      {children}
      <span
        className="nano-grid"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {cells}
      </span>
    </Tag>
  )
}
