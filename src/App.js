import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/user/LoginForm';
import SignupForm from './components/user/SignupForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:3000/api/v1/auth/validate_token', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setAuthenticated(true);
            setRole(data.role);
          } else {
            localStorage.removeItem('authToken');
            setAuthenticated(false);
            setRole('');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      } else {
        setAuthenticated(false);
        setRole('');
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard role={role} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route
          exact
          path="/"
          element={authenticated ? <Dashboard role={role} /> : <LoginForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;
