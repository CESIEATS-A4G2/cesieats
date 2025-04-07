
import React, { useEffect, useState } from "react";
import "./OffreSection.css";
import RestaurantCard from "../restaurantCard/RestaurantCard";
import api from '../../api';

function OffreSection() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.getAllRestaurants()
      .then(res => {
        console.log("Restaurants récupérés :", res.data);
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
          image={restaurant.image} // Remplace par une vraie URL si tu en as
          description={restaurant.description}
          address={restaurant.address}
          open_hour={restaurant.open_hour} // J'ai mis les horaires d'ouverture ici, mais tu peux changer ça si besoin
          fees={0.49} // Tu peux remplacer ça par une donnée qui existe dans ta BDD si tu veux
          prep_time={restaurant.prep_time} // J'ai mis les horaires d'ouverture comme "temps de livraison" (à remplacer si besoin)
        />
        ))}
      </div>
    </div>
  );
}

export default OffreSection;
