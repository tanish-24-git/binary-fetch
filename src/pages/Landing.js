import React from "react";
import "../pages/style.css";

function Landing() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-4">Welcome to SupplyConnect</h1>
        <p className="lead">Streamline your supply chain operations.</p>
        <div className="mt-4">
          <a href="/dealer_login" className="btn btn-primary btn-lg mx-2">Dealer Login</a>
          <a href="/shopkeeper_login" className="btn btn-secondary btn-lg mx-2">Shopkeeper Login</a>
        </div>
      </div>
    </div>
  );
}

export default Landing;