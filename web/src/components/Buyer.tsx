import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBath,FaBed } from "react-icons/fa";
import { SiGooglenearby } from "react-icons/si";
import { BiArea } from "react-icons/bi";
import "./Buyer.css";
import image from '../zebra-loin.png'
const Buyer: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filter, setFilter] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearby: '',
  });

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    let filtered = properties;
    Object.keys(filter).forEach(key => {
      if (filter[key as keyof typeof filter]) {
        filtered = filtered.filter((property: any) =>
          property[key].toString().toLowerCase().includes(filter[key as keyof typeof filter].toLowerCase())
        );
      }
    });
    setFilteredProperties(filtered);
  };

  const handleInterested = (sellerDetails: any) => {
    alert(`Contact Seller: ${sellerDetails}`);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

 
  return (
    <>
    <div className="buyer-container">
      <h2>Villa for Rent</h2>
      <div className="filter-section">
        <input type="text" name="place" placeholder="Place" onChange={handleFilterChange} />
        <input type="text" name="area" placeholder="Area" onChange={handleFilterChange} />
        <select name="bedrooms" onChange={handleFilterChange}>
          <option value="">Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5">5+ Bedrooms</option>
        </select>
        <select name="bathrooms" onChange={handleFilterChange}>
          <option value="">Bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="4">4 Bathrooms</option>
          <option value="5">5+ Bathrooms</option>
        </select>
        <input type="text" name="nearby" placeholder="Nearby" onChange={handleFilterChange} />
        <button className="apply-filters" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </div>

    <div className="villasContainer">
  {filteredProperties.map((property: any) => (
    <div key={property._id} className="card">
      <img src={image} alt="Property Image" />
      <div className="location_text">
        <span>{property.place}</span>
        <span>
          {/* <RxDot /> */}
        </span>
        {/* <span>{element.category}</span> */}
      </div>
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
      <button className="interested-button" onClick={() => handleInterested(property.sellerDetails)}>
              Interested
            </button>
    </div>
  ))}
</div>

    </>
  );
};

export default Buyer;