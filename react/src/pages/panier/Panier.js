import React, { useState, useEffect } from "react";
import "./Panier.css";
import PanierItem from "./PanierItem";
import { FiArrowLeft } from "react-icons/fi";
import api from '../../api';

function Panier({ isOpen, onClose, account_id }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  account_id = "ACC000001";

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      console.log("try");
      const response = await api.getCart(account_id); 
      console.log("La réponse pour ", account_id, " : ", response.data);

      const cartData = response.data;

      // 🔥 Formater les items
      const formattedItems = cartData.Items.map(item => ({
        id: item.item_id,
        name: item.name,
        price: parseFloat(item.price),
        description: item.description,
        quantity: item.Cart_Item.quantity,
        type: "item" // 🔥 On indique que c'est un item
      }));

      // 🔥 Formater les menus
      const formattedMenus = cartData.Menus.map(menu => ({
        id: menu.menu_id,
        name: menu.name,
        price: parseFloat(menu.price),
        description: menu.description,
        quantity: 1, // 🔥 Par défaut 1 car l'API ne renvoie pas de quantité pour les menus
        type: "menu" // 🔥 On indique que c'est un menu
      }));

      // 🔥 Fusionner les items et les menus dans un seul tableau
      const allItems = [...formattedItems, ...formattedMenus];
      setItems(allItems);

      // 🔥 Calculer le total (somme des prix * quantités)
      const totalValue = allItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalValue.toFixed(2));
    } catch (error) {
      console.log("catch");
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la requête.";
      const errorDetails = error.response?.data?.error?.message || "Pas de détails supplémentaires.";
      console.log("message erreur : ", error);
      console.log("message response : ", error.response);
      alert(`Erreur : ${errorMessage}\nDétails : ${errorDetails}`);
    }
};


  const updateQuantity = (id, quantity) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );

    setItems(updatedItems);

    const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal.toFixed(2));
  };

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);

    setItems(updatedItems);

    const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal.toFixed(2));
  };

  if (!isOpen) return null;

  return (
    <div className="panier-overlay" onClick={onClose}>
      <div className="panier-drawer" onClick={(e) => e.stopPropagation()}>
        
        <button className="back-button" onClick={onClose}>
          <FiArrowLeft /> Retour
        </button>

        <h2>Votre Panier</h2>
        
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
