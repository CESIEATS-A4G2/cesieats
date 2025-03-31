import React from "react";
import "./OffreSection.css";
import RestaurantCard from "../restaurantCard/RestaurantCard";

function OffreSection() {
  return (
    <div className="offre-section">
      <div className="offre-header">
        <h2>Offre du jour</h2>
        <div className="arrows">
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
      <div className="offre-list">
      <RestaurantCard name="McDo" image="mcdo" deliveryFee="0,49$" deliveryTime="10-20min" />
      <RestaurantCard name="tacos" image="tacos" deliveryFee="0,49$" deliveryTime="10-20min" />
      <RestaurantCard name="McDo" image="mcdo" deliveryFee="0,49$" deliveryTime="10-20min" />
      </div>
    </div>
  );
}

export default OffreSection;