import React, { useState } from "react";
import axios from "axios";
import "../pages/style.css";

function ShopkeeperSignup() {
  const [shopkeeper, setShopkeeper] = useState({
    name: "",
    email: "",
    shop_name: "",
    location_name: "",
    latitude: "",
    longitude: "",
    domain: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setShopkeeper({ ...shopkeeper, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, shop_name, location_name, latitude, longitude, domain, password, confirmPassword } = shopkeeper;

    if (!name || !email || !shop_name || !location_name || !latitude || !longitude || !domain || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    try {
      const response = await axios.post("http://localhost:8000/shopkeeper/signup", {
        name, email, shop_name, location_name, latitude: parseFloat(latitude), longitude: parseFloat(longitude), domain, password
      });
      setSuccess(response.data.message);
      setShopkeeper({ name: "", email: "", shop_name: "", location_name: "", latitude: "", longitude: "", domain: "", password: "", confirmPassword: "" });
    } catch (error) {
      setError(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Shopkeeper Signup</h2>
        {error && <p className="text-danger mb-4">{error}</p>}
        {success && <p className="text-success mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" value={shopkeeper.name} onChange={handleChange} className="form-control" placeholder="Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={shopkeeper.email} onChange={handleChange} className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Shop Name</label>
            <input type="text" name="shop_name" value={shopkeeper.shop_name} onChange={handleChange} className="form-control" placeholder="Shop Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Location Name</label>
            <input type="text" name="location_name" value={shopkeeper.location_name} onChange={handleChange} className="form-control" placeholder="Location Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Latitude</label>
            <input type="text" name="latitude" value={shopkeeper.latitude} onChange={handleChange} className="form-control" placeholder="Latitude" />
          </div>
          <div className="mb-3">
            <label className="form-label">Longitude</label>
            <input type="text" name="longitude" value={shopkeeper.longitude} onChange={handleChange} className="form-control" placeholder="Longitude" />
          </div>
          <div className="mb-3">
            <label className="form-label">Domain</label>
            <input type="text" name="domain" value={shopkeeper.domain} onChange={handleChange} className="form-control" placeholder="Domain" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={shopkeeper.password} onChange={handleChange} className="form-control" placeholder="Password" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" value={shopkeeper.confirmPassword} onChange={handleChange} className="form-control" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="btn btn-dark w-100">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default ShopkeeperSignup;