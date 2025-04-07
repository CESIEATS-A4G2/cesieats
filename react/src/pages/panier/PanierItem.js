import React from "react";
import "./PanierItem.css";
import { FiTrash2 } from "react-icons/fi";
import api from '../../api';

function PanierItem({ id, name, price, description, quantity, updateQuantity, removeItem }) {
  const handleIncrease = () => updateQuantity(id, quantity + 1);
  const handleDecrease = () => updateQuantity(id, Math.max(1, quantity - 1));
  

  const handleAddToCart = async () => {
    try {
      const deleteResponse = await api.deleteItemToCart("ACC000001", id);
      removeItem(id);
      alert("L'item a été supprimé du panier !");
    } catch (error1) {
      try {
        const deleteResponse = await api.deleteMenuToCart("ACC000001", id);
        removeItem(id);
        alert("Le menu a été supprimé du panier !");
      } catch (error2) {
        const errorMessage = error2.response?.data?.message || "Une erreur est survenue lors de la requête.";
        const errorDetails = error2.response?.data?.error?.message || "Pas de détails supplémentaires.";
        alert(`Erreur : ${errorMessage}\nDétails : ${errorDetails}`);
      }
    }
  };


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
      <div className="remove-icon" onClick={handleAddToCart}>
        <FiTrash2 />
      </div>
    </div>
  );
}

export default PanierItem;
