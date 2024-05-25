import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css";
import logo from "../logo.png";
import userProfile from "../user.png";
import { useNavigate } from "react-router-dom";

interface Property {
  _id: string;
  name: string;
  place: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  nearby: string;
}

const Seller: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyDetails, setPropertyDetails] = useState({
    name: "",
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearby: "",
  });
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/seller/properties"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, place, area, bedrooms, bathrooms, nearby } = propertyDetails;

    if (!name || !place || !area || !bedrooms || !bathrooms || !nearby) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/seller/property",
        propertyDetails
      );
      fetchProperties();
      setError("");
      setPropertyDetails({
        name: "",
        place: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        nearby: "",
      });
    } catch (error) {
      console.error("Error posting property", error);
      setError(
        "An error occurred while posting the property. Please try again."
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/seller/property/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={logo} alt="logo" />
          <span>Rent Vila</span>
        </div>
        <div
          className="navbar__user-profile"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={userProfile} alt="User Profile" />
          {isHovered && (
            <div className="navbar__hover-text">
              <div className="navbar__hover-option" onClick={handleLoginClick}>
                Login
              </div>
              <div
                className="navbar__hover-option"
                onClick={handleRegisterClick}
              >
                Register
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="seller-container">
        <h1 className="seller-container__header">Post a New Property</h1>
        <form onSubmit={handleSubmit} className="seller-container__form">
          {["name", "place", "area", "bedrooms", "bathrooms", "nearby"].map(
            (field) => (
              <div className="seller-container__form-group" key={field}>
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={
                    ["area", "bedrooms", "bathrooms"].includes(field)
                      ? "number"
                      : "text"
                  }
                  id={field}
                  name={field}
                  value={propertyDetails[field as keyof typeof propertyDetails]}
                  onChange={handleChange}
                />
              </div>
            )
          )}

          <button type="submit" className="seller-container__button">
            Post Property
          </button>
          {error && <p className="seller-container__error-message">{error}</p>}
        </form>
<div>
        <h2 className="seller-container__header">My Properties</h2>
        <ul className="seller-container__property-list">
          {properties.map((property) => (
            <li key={property._id} className="seller-container__property-item">
              <div className="seller-container__property-details">
                {[
                  "name",
                  "place",
                  "area",
                  "bedrooms",
                  "bathrooms",
                  "nearby",
                ].map((detail) => (
                  <p key={detail}>
                    <strong>
                      {detail.charAt(0).toUpperCase() + detail.slice(1)}:
                    </strong>{" "}
                    {property[detail as keyof Property]}
                  </p>
                ))}
              </div>
              <button
                className="seller-container__delete-button"
                onClick={() => handleDelete(property._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default Seller;
