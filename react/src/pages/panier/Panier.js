import React, { useState } from "react";
import "./Panier.css";
import PanierItem from "./PanierItem";

function Panier({ isOpen, onClose }) {
  const [items, setItems] = useState([
    { id: 1, name: "6 CHICKEN McNUGGETS™", price: 7.6, description: "6 spécialités panées au poulet", quantity: 1 },
    { id: 2, name: "DOUBLE CHEESE", price: 6.5, description: "Double fromage, double plaisir", quantity: 1 },
    { id: 3, name: "PETITE FRITE", price: 3.9, description: "Frites dorées et croustillantes", quantity: 1 },
    { id: 4, name: "P'TIT WRAP RANCH", price: 4.0, description: "Wrap frais au poulet", quantity: 1 },
    { id: 5, name: "COCA-COLA", price: 2.5, description: "Boisson rafraîchissante", quantity: 1 },
    { id: 6, name: "NUGGETS X20", price: 14.0, description: "20 morceaux de nuggets délicieux", quantity: 1 },
  ]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const updateQuantity = (id, quantity) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="panier-overlay" onClick={onClose}>
      <div className="panier-drawer" onClick={(e) => e.stopPropagation()}>
        <h2>Votre Panier</h2>
        
        {/* List of items */}
        <div className="panier-items">
          {items.map(item => (
            <PanierItem 
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        
        {/* Total & Payment Button */}
        <div className="panier-total-section">
          <div className="panier-total">
            <span>Total :</span>
            <span>{total} $US</span>
          </div>
          <button className="pay-button">Passer au paiement</button>
        </div>
      </div>
    </div>
  );
}

export default Panier;
