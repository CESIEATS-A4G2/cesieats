import React from "react";
import "./PanierItem.css";
import { FiTrash2 } from "react-icons/fi";

function PanierItem({ id, name, price, description, quantity, updateQuantity, removeItem }) {
  const handleIncrease = () => updateQuantity(id, quantity + 1);
  const handleDecrease = () => updateQuantity(id, Math.max(1, quantity - 1));

  return (
    <div className="panier-item">
      <div className="item-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="quantity-controls">
        <button onClick={handleDecrease}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className="item-price">
        <p>{(price * quantity).toFixed(2)} $US</p>
      </div>
      <div className="remove-icon" onClick={() => removeItem(id)}>
        <FiTrash2 />
      </div>
    </div>
  );
}

export default PanierItem;
