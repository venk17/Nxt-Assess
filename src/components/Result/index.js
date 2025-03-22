import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Result = () => {
  const location = useLocation()
  const history = useHistory()
  const {score, total, timeTaken, isTimeUp} = location.state || {
    score: 0,
    total: 0,
    timeTaken: 0,
    isTimeUp: false,
  }

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }

  const handleReattempt = () => {
    history.replace('/assessment')
  }

  return (
    <div className="result-container">
      <Header />
      {isTimeUp ? (
        <>
          <div className="bg_contaiiner">
            <div className="result_container">
              <img
                src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741779907/calender_1_1_cimdcn.png"
                alt="time up"
                data-testid="timeUpImage"
                className="Result_img"
              />
              <h1 className="heading">Time is up!</h1>
              <p className="time_up_text">
                You did not complete the assessment within the time
              </p>
              <p className="result_score_text">
                Your score:
                <span className="result_score">
                  {score}/{total}
                </span>
              </p>
              <button
                type="button"
                onClick={handleReattempt}
                data-testid="reattemptButton"
                className="reattempt_btn"
              >
                Reattempt
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg_contaiiner">
            <div className="result_container_Score">
              <img
                src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741779894/Asset_2_1_nkix4g.png"
                alt="submit"
                data-testid="submitImage"
                className="Result_img"
              />
              <h1 className="resul_heading">
                Congrats! You completed the assessment
              </h1>
              <p className="time_taken_text">
                Time Taken:
                <span className="timig_text">{formatTime(timeTaken)}</span>
              </p>
              <p className="result_score_text">
                Your score:
                <span className="result_score">
                  {score}/{total}
                </span>
              </p>

              <button
                type="button"
                className="reattempt_btn"
                onClick={handleReattempt}
                data-testid="reattemptButton"
              >
                Reattempt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Result
