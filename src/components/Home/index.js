import React from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="container">
      <img
        alt="assessment"
        src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741432867/Group_n0i6ps.png"
        className="home_img"
      />
      <div className="instructions">
        <h1>Instructions</h1>
        <ol>
          <li>Total Questions: 10</li>
          <li>Types of Questions: MCQs</li>
          <li>Duration: 10 Mins</li>
          <li>Marking Scheme: Every correct response, get 1 mark</li>
          <li>
            All the progress will be lost, if you reload during the assessment
          </li>
        </ol>
        <Popup
          trigger={
            <button className="start-assessment-button" type="button">
              Start Assessment
            </button>
          }
          modal
          nested
        >
          {close => (
            <div className="modal">
              <button className="close" onClick={close} type="button">
                &times;
              </button>
              <div className="header">Note:</div>
              <div className="content">
                Please complete the assessment within the given time. If you do
                not, it will be automatically submitted upon timeout.
              </div>
              <div className="actions">
                <Link to="/assessment">
                  <button
                    className="button"
                    onClick={() => {
                      close()
                    }}
                    type="button"
                  >
                    Continue to Assessment
                  </button>
                </Link>
                <button
                  className="button"
                  onClick={() => {
                    console.log('Modal closed')
                    close()
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  </div>
)

export default Home
