import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/style.css";

function ShopkeeperLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/shopkeeper/login", { email, password });
      alert(response.data.message);
      navigate("/shopkeeper_landing");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Shopkeeper Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <a href="/shopkeeper_signup" className="btn btn-outline-dark w-100">Register Here</a>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperLogin;