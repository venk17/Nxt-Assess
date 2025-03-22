import React, {useEffect, useState} from 'react'
import './index.css'

const Timer = ({totalTime, onTimeUp}) => {
  const [timeLeft, setTimeLeft] = useState(totalTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) onTimeUp()
  }, [timeLeft, onTimeUp])

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="timer_container">
      <p className="timer_text" data-testid="timer">
        Time Left
      </p>
      <p className="timer"> {formatTime(timeLeft)}</p>
    </div>
  )
}

export default Timer
