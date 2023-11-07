import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

export function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return `navbar-item ${location.pathname === path ? 'is-active' : ''}`;
  };

  return (
    <nav className='navbar custom-navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-menu'>
        <div className='navbar-start'>
          <Link className={getLinkClass('/')} to='/'>
            Home
          </Link>
          <Link className={getLinkClass('/users')} to='/users'>
            Users
          </Link>
          <Link className={getLinkClass('/todos')} to='/todos'>
            Todos
          </Link>
        </div>
      </div>
    </nav>
  );
}