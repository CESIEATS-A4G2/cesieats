
import React, { useEffect, useState } from "react";
import "./OffreSection.css";
import RestaurantCard from "../restaurantCard/RestaurantCard";
import api from '../../api';

function OffreSection() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.getAllRestaurants()
      .then(res => {
        setRestaurants(res.data); // On stocke les restos récupérés dans le state
      })
      .catch(error => console.error("Erreur lors de la récupération des restaurants :", error));
  }, []);

  return (
    <div className="offre-section">
      <div className="offre-header">
        <h2>Menu</h2>
        <div className="arrows">
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
      <div className="offre-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            restaurant_id={restaurant.restaurant_id}
            name={restaurant.name}
            image={"https://www.bioburger.fr/wp-content/uploads/IMG_4002-copie-2BIOBURGER.jpg"} // Remplace par une vraie URL si tu en as
            deliveryFee="0,49$" // Tu peux remplacer ça par une donnée qui existe dans ta BDD si tu veux
            deliveryTime={restaurant.open_hour} // J'ai mis les horaires d'ouverture comme "temps de livraison" (à remplacer si besoin)
            address={restaurant.address}
            description={restaurant.description}
          />
        ))}
      </div>
    </div>
  );
}

export default OffreSection;
