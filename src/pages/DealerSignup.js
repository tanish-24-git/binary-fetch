"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../styles/Auth.css"

const DealerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    location_name: "",
    latitude: "",
    longitude: "",
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

      const response = await axios.post("http://localhost:8000/dealer/signup", apiData)

      // Store dealer ID in localStorage
      localStorage.setItem("dealerId", response.data.dealer_id)

      // Redirect to dealer inventory page
      navigate("/dealer/inventory")
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
        <h2>Dealer Signup</h2>

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
            <label htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
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
          Already have an account? <Link to="/dealer/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default DealerSignup

