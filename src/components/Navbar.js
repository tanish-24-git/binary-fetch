import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SupplyConnect</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dealer_login">Dealer Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shopkeeper_login">Shopkeeper Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dealer_signup">Dealer Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shopkeeper_signup">Shopkeeper Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/inventory">Inventory</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;