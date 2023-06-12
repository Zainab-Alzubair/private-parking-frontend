import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './user.css'
const SignupForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add the body background class when the component mounts
    document.body.classList.add('body-background');

    // Remove the body background class when the component unmounts
    return () => {
      document.body.classList.remove('body-background');
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/users/sign_up', {
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

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.auth_token);
        navigate('/login');
        toast.success('Signup successful');
      } else {
        toast.error('Signup failed', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  return (
    <div className='container-wrap '>
      <h1 className='welcome-title'>Welcome to your Private Parking</h1>
    <div className='container-form'>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
          <input
          type="name"
          placeholder="Last Name"
          value={surname}
          onChange={(e) => setSurName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="title">
          <p className="add-new">Already have an account? </p>
          <p   className='login-btn'type="button"  onClick={() => navigate('/login')}>
            Login
          </p>
        </div>
      </div>
      </div>
  );
};

export default SignupForm;
