import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import api from '../../api';
import "./ProductSection.css";

function ProductSection({ restaurant_id, titre, type }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (type === "items") {
      api.getAllItemsByRestaurant(restaurant_id)
        .then(res => {
          console.log("Produits récupérés :", res.data);
          setProducts(res.data);
        })
        .catch(err => console.error("Erreur lors de la récupération des produits :", err));
    }
  
    if (type === "menus") {
      api.getAllMenus(restaurant_id)
        .then(res => {
          console.log("Menus récupérés :", res.data);
          setProducts(res.data);
        })
        .catch(err => console.error("Erreur lors de la récupération des menus :", err));
    }
  }, [restaurant_id, type]);

  return (
    <div className="product-section">
      <h2>{titre}</h2>
      <div className="product-list">
        {products.map((item) => (
          <ProductCard
            id={item.item_id || item.menu_id}
            name={item.name}
            price={item.price ? `${item.price} €` : "Menu"}
            type = {type}
            image={item.image || "https://via.placeholder.com/150"}
            description={item.description}
            optionsLabel="Options"
            options={["Option 1", "Option 2", "Option 3"]}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
