import React from "react";
import "./CommandToDeliver.css";
import { FaTimes } from "react-icons/fa";

function CommandToDeliver({ price, deliveryTime, distance, restaurantAddress, deliveryAddress, onDelete, onClick }) {
    return (
      <div className="command-deliver-container" > {/* Appelle onClick sauf sur la croix */}
        <div className="command-deliver-card" onClick={onClick}>
          <div className="card-header">
            <span className="price">{price}€</span>
            <FaTimes className="close-icon" onClick={(e) => { e.stopPropagation(); onDelete(); }} /> {/* Arrête la propagation pour éviter de déclencher onClick */}
          </div>
          <div className="card-info">
            <div className="time-distance">
              <span className="time">⏱ {deliveryTime} min</span>
              <span className="distance">{distance} Km</span>
            </div>
            <div className="addresses">
              <p className="restaurant">
                <strong>📍 {restaurantAddress}</strong>
              </p>
              <p className="delivery">{deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommandToDeliver;
