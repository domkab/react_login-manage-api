import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export function ProtectedRoute ({ element, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to='/login' />}
    />
  )
}
