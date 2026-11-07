import { memo } from 'react'

function ProgressBar({ progress }) {
  return (
    <div
      className="progress-bar"
      style={{ transform: `scaleX(${progress / 100})` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(progress)}
    />
  )
}

export default memo(ProgressBar)
