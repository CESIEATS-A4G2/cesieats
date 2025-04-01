import React from "react";
import "./RestaurantHeader.css";

function RestaurantHeader() {
  return (
    <div className="restaurant-header">
      <div className="restaurant-banner">
      </div>
      <div className="restaurant-info">
        <h1>McDonald's®</h1>
        <p>⭐ 4.5 (171 notes) • Américain • $ • <a href="#">Plus d'informations</a></p>
        <p>5 Rue Du Renard, PARIS, - 75004</p>
        <p>$ • Américain • Burgers • Fast food</p>
      </div>
    </div>
  );
}

export default RestaurantHeader;
