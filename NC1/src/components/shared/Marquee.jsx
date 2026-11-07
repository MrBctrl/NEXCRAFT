const ITEMS = [
  "Web Development", "UI / UX Design", "Brand Identity", "Graphic Design",
  "AI Automation", "React", "Figma", "n8n", "Supabase", "Print & Social",
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-wrap" aria-hidden="true">
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
