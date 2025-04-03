import React from "react";
import "./CommandToDeliver.css";
import { FaTimes } from "react-icons/fa"; // Import de l'icône croix

function CommandToDeliver({ price, deliveryTime, distance, restaurantAddress, deliveryAddress, onDelete }) {
    return (
      <div className="command-deliver-container">
        <div className="command-deliver-card">
          <div className="card-header">
            <span className="price">{price}€</span>
            <FaTimes className="close-icon" onClick={onDelete} /> {/* Gère la suppression */}
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
