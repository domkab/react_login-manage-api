import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar.js'
import { Home } from '../Home/Home.js'
import { Users } from '../Users/Users.js'
import { Todos } from '../Todos/Todos.js';
// import Posts from './pages/Posts';
// import Comments from './pages/Comments';
// import Profile from './pages/Profile';

export function AppRouter () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/todos' element={<Todos />} />
        {/* <Route path="/posts" component={Posts} /> */}
        {/* <Route path="/comments" component={Comments} /> */}
        {/* <Route path="/profile" component={Profile} /> */}
      </Routes>
    </Router>
  )
}
