import { Children, cloneElement, isValidElement } from 'react'

// Deterministic pseudo-random in [-1, 1] so the scatter is stable between renders.
const rnd = (n, salt) => (((n * 9301 + salt * 49297) % 233280) / 233280) * 2 - 1

function plain(node) {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(plain).join('')
  if (isValidElement(node)) return plain(node.props.children)
  return ''
}

function split(node, ctr, key = 'k') {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((tok, wi) => {
      if (!tok) return null
      if (/^\s+$/.test(tok)) return ' '
      return (
        <span className="nano-word" aria-hidden="true" key={`${key}-${wi}`}>
          {[...tok].map((ch, ci) => {
            const n = ctr.n++
            return (
              <span
                className="nano-ch"
                key={ci}
                style={{
                  '--i': n,
                  '--dx': `${(rnd(n, 1) * 46).toFixed(0)}px`,
                  '--dy': `${(rnd(n, 2) * 38).toFixed(0)}px`,
                  '--r': `${(rnd(n, 3) * 70).toFixed(0)}deg`,
                }}
              >
                {ch}
              </span>
            )
          })}
        </span>
      )
    })
  }
  if (isValidElement(node)) {
    const kids = Children.toArray(node.props.children).map((c, i) => split(c, ctr, `${key}-${i}`))
    return cloneElement(node, { key }, kids)
  }
  return node
}

// Heading text that assembles itself from scattered "nano" fragments when
// scrolled into view. Same markup/semantics as a normal heading.
export default function NanoText({ as: Tag = 'h2', className = '', children, ...rest }) {
  const ctr = { n: 0 }
  const parts = Children.toArray(children).map((c, i) => split(c, ctr, `t${i}`))
  return (
    <Tag className={`nano reveal ${className}`} aria-label={plain(children)} {...rest}>
      {parts}
    </Tag>
  )
}
