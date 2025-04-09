import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({id, name, price, type, image, description, optionsLabel, options}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentUrl = location.pathname; // Par exemple : "/restaurant/1/menu"
    navigate(`${currentUrl}/${type}/${id}`); // On redirige vers la page du restaurant par son ID
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  );
}

export default ProductCard;
