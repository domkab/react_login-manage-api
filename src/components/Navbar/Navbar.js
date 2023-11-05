import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss'

export function Navbar () {
  return (
    <nav
      className='navbar custom-navbar'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>
            Home
          </Link>

          <Link className='navbar-item' to='/users'>
            Users
          </Link>

          <Link className='navbar-item' to='/todos'>
            Todos
          </Link>
        </div>
      </div>
    </nav>
  )
}
