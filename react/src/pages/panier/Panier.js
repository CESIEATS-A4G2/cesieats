import React, { useState, useEffect } from "react";
import "./Panier.css";
import PanierItem from "./PanierItem";
import { FiArrowLeft } from "react-icons/fi";
import api from '../../api';
import { useNavigate } from "react-router-dom";

function Panier({ isOpen, onClose, account_id }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  account_id = "ACC000001";

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      const response = await api.getCart(account_id); 
      const cartData = response.data;

      const formattedItems = cartData.Items.map(item => ({
        id: item.item_id,
        name: item.name,
        price: parseFloat(item.price),
        description: item.description,
        quantity: item.Cart_Item.quantity,
        type: "item"
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
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la requête.";
      const errorDetails = error.response?.data?.error?.message || "Pas de détails supplémentaires.";
      console.log("message erreur : ", error);
      console.log("message response : ", error.response);
      alert(`Erreur : ${errorMessage}\nDétails : ${errorDetails}`);
    }
};

const handleClose = () => {
  onClose(); // Fermer l'overlay normalement
  window.location.reload();
};
const updateQuantity = async (id, quantity) => {
  try {
    // 🔥 Appel de ton API pour mettre à jour la quantité
    await api.changeQuantityToCart(account_id, id, quantity);

    // 🔥 Met à jour localement l'état des items après l'appel API réussi
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );

    setItems(updatedItems);

    const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal.toFixed(2));

    console.log(`La quantité de l'item ${id} a été changée à ${quantity}.`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la quantité :", error);
    alert("Une erreur est survenue lors de la mise à jour de la quantité.");
  }
};


  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);

    setItems(updatedItems);

    const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal.toFixed(2));
  };

  const handlePaymentRedirect = () => {
    navigate("/payment", { state: { total } }); // ✅ Envoie le total à la page de paiement
};


  if (!isOpen) return null;

  return (
    <div className="panier-overlay" onClick={handleClose}>
      <div className="panier-drawer" onClick={(e) => e.stopPropagation()}>
        
        <button className="back-button" onClick={handleClose}>
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
          <button className="pay-button" onClick={handlePaymentRedirect}>Passer au paiement</button>
        </div>
      </div>
    </div>
  );
}

export default Panier;
