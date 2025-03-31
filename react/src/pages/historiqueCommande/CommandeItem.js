import React from "react";
import "./CommandeItem.css";

function CommandeItem({ restaurantName, image, rating, details, description, status, buttonLabel, buttonAction }) {
  return (
    <div className="commande-item">
      <div className="commande-left">
        <img src={image} alt={restaurantName} className="commande-image" />
        <div>
          <h3>{restaurantName}</h3>
          {rating && <span className="rating">{rating}</span>}
        </div>
      </div>

      <div className="commande-details">
        <p className="commande-info">{details}</p>
        <p className="commande-description">{description}</p>
        {status && <p className="commande-status">{status}</p>}
      </div>

      <button className="commande-button" onClick={buttonAction}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default CommandeItem;
