"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const dealerId = localStorage.getItem("dealerId")
    const shopkeeperId = localStorage.getItem("shopkeeperId")

    if (dealerId) {
      setIsLoggedIn(true)
      setUserType("dealer")
    } else if (shopkeeperId) {
      setIsLoggedIn(true)
      setUserType("shopkeeper")
    } else {
      setIsLoggedIn(false)
      setUserType("")
    }
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("dealerId")
    localStorage.removeItem("shopkeeperId")
    setIsLoggedIn(false)
    setUserType("")
    window.location.href = "/"
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-link"></i> SupplyConnect
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/inventory" className="nav-links" onClick={() => setIsOpen(false)}>
              Inventory
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/workflow" className="nav-links" onClick={() => setIsOpen(false)}>
              Workflow
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link
                  to={userType === "dealer" ? "/dealer_landing" : "/shopkeeper_landing"}
                  className="nav-links"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <span className="nav-links dropdown-toggle">
                  Login <i className="fas fa-chevron-down"></i>
                </span>
                <div className="dropdown-menu">
                  <Link to="/dealer_login" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Dealer Login
                  </Link>
                  <Link to="/shopkeeper_login" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Shopkeeper Login
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-links dropdown-toggle">
                  Sign Up <i className="fas fa-chevron-down"></i>
                </span>
                <div className="dropdown-menu">
                  <Link to="/dealer_signup" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Dealer Sign Up
                  </Link>
                  <Link to="/shopkeeper_signup" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Shopkeeper Sign Up
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

