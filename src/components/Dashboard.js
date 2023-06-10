import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null; // Or you can render a loading spinner or a message
};

export default Dashboard;
