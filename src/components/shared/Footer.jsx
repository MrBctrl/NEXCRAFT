export default function Footer() {
  const scrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <footer>
      <div className="footer-brand">Nexcraft<span>.</span></div>
      <div className="footer-note">© 2025 Nexcraft Creative Studio. Designer & Developer. All rights reserved.</div>
      <a href="#" className="footer-top" onClick={scrollTop}>↑ Top</a>
    </footer>
  )
}
