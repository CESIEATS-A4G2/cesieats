import React from "react";
import "./RestaurantCard.css";
import images from "../../resources/images";

function RestaurantCard({ name, image, deliveryFee, deliveryTime }) {
  const imgSrc = images[image];

  return (
    <div className="restaurant-card">
      <img src={imgSrc} alt={name} className="restaurant-image" />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        <div className="restaurant-details">
          <span className="fee">Frais de livraison : {deliveryFee}</span>
          <span className="dot">•</span>
          <span className="time">{deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
