import React, {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const handleLogin = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        setError(data.error_msg)
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="form_container">
        <img
          src="https://res.cloudinary.com/dhtc3kc4p/image/upload/v1741358102/Nxt_Assess_logo_kkr0wi.png"
          alt="login website logo"
          className="form_img"
        />
        <div className="input_container">
          <label htmlFor="username">USERNAME</label>
          <br />
          <input
            id="username"
            placeholder="Enter Name"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            data-testid="usernameInput"
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            id="password"
            placeholder="Enter Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="passwordInput"
          />
        </div>
        <div className="checkbox_container">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              data-testid="showPassword"
              className="check_box"
            />
            Show Password
          </label>
        </div>
        <button type="submit" data-testid="loginButton" className="login_btn">
          Login
        </button>
        {error && (
          <p className="error_msg" data-testid="errorMessage">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
