import React from "react";
import "./CommandToDeliver.css";
import { FaTimes } from "react-icons/fa";

function CommandToDeliver({ command, onDelete, onClick }) {
    return (
      <div className="command-deliver-container">
        <div className="command-deliver-card" onClick={onClick}>
          <div className="card-header">
            <span className="price">{command.totalPrice}€</span>
            <FaTimes className="close-icon" onClick={(e) => { e.stopPropagation(); onDelete(); }} />
          </div>
          <div className="card-info">
            <div className="time-distance">
              <span className="time">⏱ {command.deliveryTime} min</span>
              <span className="distance">{command.distance} Km</span>
            </div>
            <div className="addresses">
              <p className="restaurant">
                <strong>📍 {command.restaurantAddress}</strong>
              </p>
              <p className="delivery">{command.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommandToDeliver;
