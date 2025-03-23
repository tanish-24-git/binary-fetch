"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../styles/Auth.css"

const ShopkeeperSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shop_name: "",
    location_name: "",
    latitude: "",
    longitude: "",
    domain: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...apiData } = formData

      // Convert latitude and longitude to numbers
      apiData.latitude = Number.parseFloat(apiData.latitude)
      apiData.longitude = Number.parseFloat(apiData.longitude)

      const response = await axios.post("http://localhost:8000/shopkeeper/signup", apiData)

      // Store shopkeeper ID in localStorage
      localStorage.setItem("shopkeeperId", response.data.shopkeeper_id)

      // Redirect to home page
      navigate("/")
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.response?.data?.detail || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Shopkeeper Signup</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="shop_name">Shop Name</label>
            <input
              type="text"
              id="shop_name"
              name="shop_name"
              value={formData.shop_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location_name">Location</label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                step="any"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group half">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="domain">Business Domain</label>
            <select id="domain" name="domain" value={formData.domain} onChange={handleChange} required>
              <option value="">Select Domain</option>
              <option value="Grocery">Grocery</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Hardware">Hardware</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/shopkeeper/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ShopkeeperSignup

