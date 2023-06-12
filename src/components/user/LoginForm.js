import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add the body background class when the component mounts
    document.body.classList.add('body-login-background');

    // Remove the body background class when the component unmounts
    return () => {
      document.body.classList.remove('body-login-background');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            surname,
            email,
            password,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.auth_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user_id', data.user_id);
        navigate('/dashboard');
        toast.success('Login successful');
      } else {
        toast.error('Login failed', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
            <input
          className="login-input"
          type="name"
          placeholder="Last Name"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="title">
          <p  className="l-title" type="button"  onClick={() => navigate('/signup')}>
          Create an account? Signup
          </p>
        </div>
    </div>
  );
};

export default LoginForm;
