import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import { navigate } from '@reach/router';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const NavBar = () => {
  const handleLogout = async () => {
    try {
      // Make an API request to logout or revoke tokens
      await axios.post('http://127.0.0.1:3000/api/v1/users/logout');

      // Clear session/local storage
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // Navigate to the login page
      navigate('/login');

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Logout Error:', error);
      // Handle error if the logout API request fails
      // You can choose to navigate to the login page or display an error message
    }
  };
  return (
    <nav className='items'>
      <ul className='nav-items items'>
        <div className='nav-items d-flex'>
        <li> <Link class="navbar-brand" to="/user-dashboard">Private Parking</Link></li>
        <li> <Link class="navbar-brand" to="/user-dashboard">Home</Link></li>
        <li>  <Link class="navbar-brand" to="/reservation-list">Reservations</Link></li>
        </div>
        <div>
        <li><Button  variant="primary" onClick={handleLogout}>
        Logout
      </Button></li>
      </div>
      </ul>
    </nav>
  );
};

export default NavBar;
