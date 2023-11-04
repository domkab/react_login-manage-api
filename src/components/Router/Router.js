import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar.js';
import { Home } from '../Home/Home.js';
import { Users } from '../Users/Users.js';
import { Todos } from '../Todos/Todos.js';
import { AuthProvider } from '../context/AuthContext.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import { Login } from '../Login/Login.js';  // Assuming you have created a Login component

export function AppRouter () {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <ProtectedRoute path='/' element={<Home />} />
          <ProtectedRoute path='/users' element={<Users />} />
          <ProtectedRoute path='/todos' element={<Todos />} />
          <Route path='/login' element={<Login />} />
          {/* ...other routes... */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
