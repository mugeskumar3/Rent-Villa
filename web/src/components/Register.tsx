import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import loginImage from "../zebra-loin.png";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "buyer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      userType: "buyer",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", formData);
      alert("User registered successfully");
      resetForm();
    } catch (error) {
      console.error("Error registering user", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-image-container">
          <img src={loginImage} alt="Register" className="register-image" />
        </div>
        <div className="register-form-container">
          <h2>Register</h2>
          <p>Please enter your details</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="register-form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="register-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="register-form-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="register-form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="register-form-group">
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? Please{" "}
            <a onClick={handleLoginClick}>Login</a>.
          </p>
          <br/>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default Register;
