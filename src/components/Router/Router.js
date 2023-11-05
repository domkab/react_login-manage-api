import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar.js'
import { Home } from '../Home/Home.js'
import { Users } from '../Users/Users.js'
import { Todos } from '../Todos/Todos.js'
import { Login } from '../Login/Login.js'
import { AuthContext } from '../../context/AuthContext.js'

export function AppRouter () {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/users'
          element={isAuthenticated ? <Users /> : <Navigate to='/login' />}
        />
        <Route
          path='/todos'
          element={isAuthenticated ? <Todos /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  )
}
