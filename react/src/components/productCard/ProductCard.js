import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ name, price, image, description, optionsLabel, options }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/restaurant/item", {
      state: {
        name,
        price,
        description,
        image,
        optionsLabel,
        options,
      },
    });
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
