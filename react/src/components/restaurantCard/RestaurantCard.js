import React from "react";
import "./RestaurantCard.css";
import images from "../../resources/images";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant_id, name, image, description, address, open_hour }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(restaurant_id)
    navigate(`/restaurant/${restaurant_id}`); // On redirige vers la page du restaurant par son ID
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <img src={image} alt={name} className="restaurant-image" />
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-description">{description}</p>
        <div className="restaurant-details">
          <span className="address">{address}</span>
          <span className="dot">•</span>
          <span className="open-hour">{open_hour}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
