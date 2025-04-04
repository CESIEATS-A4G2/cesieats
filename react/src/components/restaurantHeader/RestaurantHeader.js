import React from "react";
import "./RestaurantHeader.css";

function RestaurantHeader({ name, description, address, open_hour, image }) {
  return (
    <div className="restaurant-header">
      <div 
        className="restaurant-banner" 
        style={{ 
          background: `url(${image}) center/cover no-repeat`,
          height: '200px'
        }}
      >
        <div className="restaurant-banner-overlay">{name}</div>
      </div>
      <div className="restaurant-info">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Adresse : {address}</p>
        <p>Heures d'ouverture : {open_hour}</p>
      </div>
    </div>
  );
}

export default RestaurantHeader;
