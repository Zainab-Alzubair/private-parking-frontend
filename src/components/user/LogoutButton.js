import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Make an API request to logout or revoke tokens
      await axios.post('http://127.0.0.1:3000/api/v1/users/logout');

      // Clear session/local storage
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // Navigate to the login page or any other desired page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
      // Handle error if the logout API request fails
      // You can choose to navigate to the login page or display an error message
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
