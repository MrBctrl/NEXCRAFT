const ITEMS = [
  "Brand Identity", "Logo Design", "CorelDRAW", "Web Development",
  "UI / UX Design", "Mockups & Packaging", "Motion Design", "PHP / MySQL", "Print Design",
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {track.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item} <span className="marquee-dot"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
