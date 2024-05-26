import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArea } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";
import { SiGooglenearby } from "react-icons/si";
import image from "../landing.jpg";
import "./Buyer.css";
import { HeroSection } from "./HeroSection";

const Buyer: React.FC = () => {
  const sellerId = localStorage.getItem("sellerId");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
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

  const Like = (sellerDetails: any) => {
    alert(`Like Property: ${sellerId} ${sellerDetails?._id}`);
  };
  const unlike = (sellerDetails: any) => {
    console.log(sellerDetails)
    alert(`unlike Property: ${sellerId} ${sellerDetails?._id}`);
  };

  useEffect(() => {
    fetchProperties();
  }, []);



  return (
    <>
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
          {filteredProperties?.map((property: any) => (
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

              {(property as any)?.likes?.length || 0} Likes
              {
                ((property as any)?.likes || [])?.includes(sellerId) ? (
                  <button
                    className="interested-button"
                    onClick={() => unlike(property)}
                  >
                    Un Like
                  </button>
                ) : (
                  <button
                    className="interested-button"
                    onClick={() => Like(property)}
                  >
                    Like
                  </button>
                )
              }

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
