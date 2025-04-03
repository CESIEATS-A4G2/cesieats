import React from "react";
import "./RestaurantCard.css";
import images from "../../resources/images";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ name, image, deliveryFee, deliveryTime }) {
  const imgSrc = images[image];
  const navigate = useNavigate();

  const handleClick = () => {
    // Tu peux passer des paramètres ici si besoin
    navigate(`/restaurant/${name.toLowerCase()}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
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
