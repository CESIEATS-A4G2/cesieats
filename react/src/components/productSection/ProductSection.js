import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import api from '../../api'; // Assure-toi que c'est bien le chemin vers ton api.js
import "./ProductSection.css";

function ProductSection({ restaurant_id }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(restaurant_id)
    api.getAllItemsByRestaurant(restaurant_id)
      .then(res => {
        console.log("Produits récupérés :", res.data);
        setProducts(res.data);
      })
      .catch(err => console.error("Erreur lors de la récupération des produits :", err));
  }, [restaurant_id]);

  return (
    <div className="product-section">
      <h2>NOS PETITES FAIMS</h2>
      <div className="product-list">
        {products.map((item) => (
          <ProductCard
            key={item.item_id}
            name={item.name}
            price={`${item.price} €`} // J'ajoute € après le prix
            image={item.image || "https://via.placeholder.com/150"} // Si l'image est null, on met une image par défaut
            description={item.description}
            optionsLabel="Options" // Tu peux changer ça si tu veux que ça soit dynamique
            options={["Option 1", "Option 2", "Option 3"]} // Tu peux aussi ajouter des vraies options si tu les as dans ta BDD
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
