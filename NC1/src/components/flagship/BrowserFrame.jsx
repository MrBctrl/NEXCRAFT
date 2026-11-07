export default function BrowserFrame({ addressLabel, children, mobile = false }) {
  if (mobile) {
    return (
      <div className="bf-mobile-frame">
        <div className="bf-mobile-notch"></div>
        <div className="bf-mobile-screen">{children}</div>
        <div className="bf-mobile-home-bar"></div>
      </div>
    )
  }

  return (
    <div className="bf-frame">
      <div className="bf-bar">
        <div className="bf-dots"><span></span><span></span><span></span></div>
        <div className="bf-address">{addressLabel}</div>
      </div>
      <div className="bf-screen">{children}</div>
    </div>
  )
}
