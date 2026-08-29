export default function PhoneCard({ project }) {
  return (
    <div className="phone-card">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {project.mediaType === 'image' && project.mediaUrl ? (
            <img src={project.mediaUrl} alt={project.title} loading="lazy" decoding="async" />
          ) : project.mediaType === 'video' && project.mediaUrl ? (
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={project.mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="screen-placeholder small">
              <div className="placeholder-icon">▶</div>
              <p>{project.title}</p>
              <span>Coming soon</span>
            </div>
          )}
        </div>
        <div className="phone-home-bar"></div>
      </div>
      <div className="phone-card-info">
        <h3 className="device-card-title">{project.title}</h3>
        <p className="device-card-desc">{project.desc}</p>
        <div className="device-card-tags">
          {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}
