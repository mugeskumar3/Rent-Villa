import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBath, FaBed } from "react-icons/fa";
import { SiGooglenearby } from "react-icons/si";
import { BiArea } from "react-icons/bi";
import "./Buyer.css";
import image from "../zebra-loin.png";
import logo from "../logo.png";
import userProfile from "../user.png";
import { HeroSection } from "./HeroSection";
import { useNavigate } from "react-router-dom";

const Buyer: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearby: "",
  });

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/properties");
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    let filtered = properties;
    Object.keys(filter).forEach((key) => {
      if (filter[key as keyof typeof filter]) {
        filtered = filtered.filter((property: any) =>
          property[key]
            .toString()
            .toLowerCase()
            .includes(filter[key as keyof typeof filter].toLowerCase())
        );
      }
    });
    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setFilter({
      place: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      nearby: "",
    });
    setFilteredProperties(properties);
  };

  const handleInterested = (sellerDetails: any) => {
    alert(`Contact Seller: ${sellerDetails}`);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

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
      <HeroSection />
      <div className="buyer-container">
        <div className="filter-section">
          <input
            type="text"
            name="place"
            placeholder="Place"
            onChange={handleFilterChange}
            value={filter.place}
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            onChange={handleFilterChange}
            value={filter.area}
          />
          <select
            name="bedrooms"
            onChange={handleFilterChange}
            value={filter.bedrooms}
          >
            <option value="">Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
          <select
            name="bathrooms"
            onChange={handleFilterChange}
            value={filter.bathrooms}
          >
            <option value="">Bathrooms</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathrooms</option>
            <option value="3">3 Bathrooms</option>
            <option value="4">4 Bathrooms</option>
            <option value="5">5+ Bathrooms</option>
          </select>
          <input
            type="text"
            name="nearby"
            placeholder="Nearby"
            onChange={handleFilterChange}
            value={filter.nearby}
          />
          <button className="apply-filters" onClick={applyFilters}>
            Apply Filters
          </button>
          <button className="clear-filters" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
      <section id="topVillas">
        <h1>TOP PICK VILLAS</h1>
        <p>
          The company itself is a very successful company. The consequence of
          his being these, but whom, therefore, the least pain of them was
          chosen to follow the training said pain provides nothing for the
          pleasures. To be taken!
        </p>
        <div className="villasContainer">
          {filteredProperties.map((property: any) => (
            <div key={property._id} className="card">
              <img src={image} alt="Property Image" />

              <div className="title_text">raja villa</div>
              <div className="specifications">
                <div className="spec">
                  <SiGooglenearby />
                  <span>{property.nearby}</span>
                </div>
                <div className="spec">
                  <FaBed />
                  <span>{property.bedrooms}</span>
                  Bedrooms
                </div>
                <div className="spec">
                  <BiArea />
                  <span>{property.area}</span>
                  Area
                </div>
                <div className="spec">
                  <FaBath />
                  <span>{property.bathrooms}</span>
                  Bathrooms
                </div>
              </div>
              <div className="badge">
                From <span>€1500 / Day</span>
              </div>
              <button
                className="interested-button"
                onClick={() => handleInterested(property.sellerDetails)}
              >
                Interested
              </button>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 RealEstate. All rights reserved.</p>
          <p>
            Follow us on:
            <a href="https://facebook.com">Facebook</a> |
            <a href="https://twitter.com">Twitter</a> |
            <a href="https://instagram.com">Instagram</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Buyer;
