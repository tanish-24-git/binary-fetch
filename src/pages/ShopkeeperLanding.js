import React from "react";
import "../pages/style.css";

function ShopkeeperLanding() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-4">Welcome, Shopkeeper!</h1>
        <p className="lead">Manage your shop efficiently.</p>
        <a href="/inventory" className="btn btn-primary btn-lg mt-3">Go to Inventory</a>
      </div>
    </div>
  );
}

export default ShopkeeperLanding;