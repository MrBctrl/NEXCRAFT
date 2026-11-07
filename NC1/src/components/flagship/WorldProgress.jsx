export default function WorldProgress({ steps, current }) {
  return (
    <div className="world-progress">
      <div className="world-progress-track">
        {steps.map((step, i) => (
          <div key={step} className={`world-progress-dot ${i <= current ? 'done' : ''}`} title={step} />
        ))}
      </div>
      <span className="world-progress-label">{steps[current]}</span>
    </div>
  )
}
