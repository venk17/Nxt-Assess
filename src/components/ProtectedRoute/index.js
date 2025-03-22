import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('jwt_token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default ProtectedRoute
