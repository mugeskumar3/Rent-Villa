import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';

import loginImage from '../zebra-loin.png';

interface LoginProps {
  onLogin: (userType: string) => void;
  auth:any
}

const Login: React.FC<LoginProps> = ({ onLogin,auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if(!auth?.isAuthenticated) return 
    if (auth.userType === 'seller') {
      navigate('/seller');
    } else if(auth.userType === 'buyer') {
      navigate('/buyer');
    };
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.data.success) {
        onLogin(response.data);
        if (response.data.userType === 'seller') {
          navigate('/seller');
        } else {
          navigate('/buyer');
        }
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-container">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>
        <div className="login-form-container">
          <h2>Welcome back</h2>
          <p>Welcome back! Please enter your details.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter password" onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? Please <a onClick={handleSignUpClick}>Sign Up</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
