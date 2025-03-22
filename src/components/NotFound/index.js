import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741432867/Group_n0i6ps.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
    </p>
    <Link to="/" className="not-found-link">
      Go to Home
    </Link>
  </div>
)

export default NotFound
