import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav class="nav">
      <ul className='nav-items'>
        <li> <Link class="navbar-brand" to="/">Private Parking</Link></li>
        <li> <Link class="navbar-brand" to="/user-dashboard">Home</Link></li>
        <li>  <Link class="navbar-brand" to="/reservation-list">Reservations</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
