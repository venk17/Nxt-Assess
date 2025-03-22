import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = ({history}) => {
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <Link to="/" className="logo_container">
        <img
          src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741432845/image_28_Traced_pw8m0d.png"
          alt="website logo"
          data-testid="websiteLogo"
          className="header_logo"
        />
        <h1 className="logo_heading">NXT Assess</h1>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        data-testid="logoutButton"
        className="Logout_button"
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
