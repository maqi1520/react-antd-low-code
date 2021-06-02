import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export function useAuth() {
  return window.sessionStorage.getItem('token')
}

export default function PrivateRoute({ component, ...rest }: RouteProps) {
  const isAuth = useAuth()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          React.createElement(component as any, props)
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
