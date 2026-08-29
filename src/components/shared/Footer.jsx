export default function Footer() {
  const scrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <footer>
      <div className="footer-brand">
        Nexcraft<span>.</span>
        <a href="/admin/login" className="footer-admin-dot" aria-label="Admin login" title=""></a>
      </div>
      <div className="footer-note">© 2025 Nexcraft Creative Studio. Designer & Developer. All rights reserved.</div>
      <a href="#" className="footer-top" onClick={scrollTop}>↑ Top</a>
    </footer>
  )
}
