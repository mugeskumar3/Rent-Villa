import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

import loginImage from '../zebra-loin.png';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Form data submitted:', formData); 
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.data.success) {
        const userType = response.data.userType;
        if (userType === 'seller') {
          navigation('/seller');
        } else if (userType === 'buyer') {
          navigation('/buyer');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in', error);
      setError('An error occurred. Please try again later.');
    }
  };
  const handleSignUpClick = () => {
    navigation('/register');
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
          {error && <p className="login-error-message">{error}</p>}
          <p>Don't have an account? Please <a onClick={handleSignUpClick}>Sign Up</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
