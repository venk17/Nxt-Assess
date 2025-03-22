import React from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const Loading = () => (
  <div className="loader-container" data-testid="loader">
    <Loader
      type="ThreeDots"
      color="#0b69ff"
      height="50"
      width="50"
      className="loading_dots"
    />
  </div>
)

export default Loading
