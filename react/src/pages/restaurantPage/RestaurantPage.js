import React from "react";
import { useParams } from "react-router-dom";
import RestaurantHeader from "../../components/restaurantHeader/RestaurantHeader";
import ProductSection from "../../components/productSection/ProductSection";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import "./RestaurantPage.css";

function RestaurantPage() {
  const { name } = useParams();

  return (
    <div className="restaurant-page">
      <Header />
      <RestaurantHeader restaurantName={name} />
      <ProductSection restaurantName={name} />
      <Footer />
    </div>
  );
}

export default RestaurantPage;