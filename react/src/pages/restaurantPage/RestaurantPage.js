import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantHeader from "../../components/restaurantHeader/RestaurantHeader";
import ProductSection from "../../components/productSection/ProductSection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import api from '../../api';
import "./RestaurantPage.css";

function RestaurantPage() {
  const { name } = useParams(); // 🔥 Ici tu récupères l'ID du restaurant dans l'URL
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    api.getRestaurant(name)
      .then(res => setRestaurant(res.data))
      .catch(err => console.error("Erreur lors de la récupération du restaurant :", err));
  }, [name]);

  if (!restaurant) return <div>Chargement...</div>;

  return (
    <div className="restaurant-page">
      <Header role="User"/>
      <RestaurantHeader 
        name={restaurant.name} 
        description={restaurant.description} 
        address={restaurant.address} 
        open_hour={restaurant.open_hour}
        image={restaurant.image || "https://via.placeholder.com/800x200"}
      />
      
      <ProductSection restaurant_id={restaurant.restaurant_id} titre="Nos Menus" type="menus" />
      <ProductSection restaurant_id={restaurant.restaurant_id} titre="Nos Items" type="items" />

      <Footer />
    </div>
  );
}

export default RestaurantPage;
