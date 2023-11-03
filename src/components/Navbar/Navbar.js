import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* Add more navigation items here */}
          <Link className="navbar-item" to="/users">
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
}
