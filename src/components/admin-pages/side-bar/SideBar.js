import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; 
import { navigate } from '@reach/router';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Sidebar = () => {
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
    <div className="sidebar-container">
      {/* Sidebar content */}
      <ul className="nav flex-column">
      <li className="l-title">
         <h3>Private Parking</h3>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin-dashboard">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manage-working-hour">Manage Working Hours</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manage-slots">Manage Slots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manage-reservations">Manage Reservations</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manage-customers">Manage Customers</a>
        </li>
      </ul>
      <Button className="logout" variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
