import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css";

interface Property {
  _id: string;
  name: string;
  place: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  nearby: string;
  likes?: string[];
}

const Seller: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>([]);

  const [propertyDetails, setPropertyDetails] = useState<Partial<Property>>({
    name: "",
    place: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    nearby: "",
  });

  const fetchProperties = async () => {
    try {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        throw new Error("Seller ID not found.");
      }

      const response = await axios.get(
        `http://localhost:4000/api/seller/properties?sellerId=${sellerId}`
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

    if (
      !name ||
      !place ||
      area === undefined ||
      bedrooms === undefined ||
      bathrooms === undefined ||
      !nearby
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        throw new Error("Seller ID not found.");
      }

      await axios.post("http://localhost:4000/api/seller/property", {
        ...propertyDetails,
        sellerId,
      });
      fetchProperties();
      setError("");
      setPropertyDetails({
        name: "",
        place: "",
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
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
      await axios.delete(`http://localhost:4000/api/seller/property/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property", error);
      setError("Could not delete property.");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
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
                value={
                  propertyDetails[field as keyof typeof propertyDetails] || ""
                }
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
      <h2 className="seller-container__header">My Properties</h2>
      <ul className="seller-container__property-list">
        {properties.map((property) => (
          <li key={property._id} className="seller-container__property-item">
            <div className="seller-container__property-details">
              {["name", "place", "area", "bedrooms", "bathrooms", "nearby"].map(
                (detail) => (
                  <p key={detail}>
                    <strong>
                      {detail.charAt(0).toUpperCase() + detail.slice(1)}:
                    </strong>{" "}
                    {property[detail as keyof Property]}
                  </p>
                )
              )}
            </div>
            <p style={{ color: "green", fontWeight: 700 }}>
              {property.likes?.length || 0} Likes
            </p>
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
  );
};

export default Seller;
