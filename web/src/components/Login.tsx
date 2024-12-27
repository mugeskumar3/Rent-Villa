import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "../zebra-loin.png";

interface LoginProps {
  onLogin: (userData: { success: boolean; userType: string }) => void;
  auth: { isAuthenticated: boolean; userType: string } | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, auth }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(auth.userType === "seller" ? "/seller" : "/buyer");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        formData
      );
      if (response.data.success) {
        onLogin(response.data);
        navigate(response.data.userType === "seller" ? "/seller" : "/buyer");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/register");
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
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            Don't have an account? Please{" "}
            <button onClick={handleSignUpClick} className="sign-up-link">
              Sign Up
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
