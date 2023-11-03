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
          {/* Add more navigation items here */}

          <Link className='navbar-item' to='/'>
            Home
          </Link>

          <Link className='navbar-item' to='/users'>
            Users
          </Link>
        </div>
      </div>
    </nav>
  )
}
