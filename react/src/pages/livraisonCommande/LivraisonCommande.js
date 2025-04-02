import React, { useState } from "react";
import Header from "../../components/header/TopNavBar";
import "./LivraisonCommande.css";
import { useLocation, useNavigate } from "react-router-dom"; // 🔥 Ajout de useNavigate

const LivraisonCommande = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 🔥 Initialisation de useNavigate
  const command = location.state?.command || {}; // 🔥 Récupère la commande envoyée via navigate()

  const [isRecupere, setIsRecupere] = useState(false);

  const handleRecupereClick = () => {
    setIsRecupere(true);
  };

  const handleLivreeClick = () => {
    navigate("/liste-commandes-livreur"); // 🔥 Redirige vers la page de la liste des commandes
  };

  return (
    <div className="livraison-command-page">
      <Header />
      
      <div className="livraison-card">
        
        <div className="price-section">
          <p className="price">{command.price} €</p>
          <p className="details">⏱️ {command.deliveryTime} min | {command.distance} Km</p>
        </div>
        
        <div className="qr-code">
          <p>QR CODE</p>
        </div>
        
        <div className="contact-info">
          <p>AurélienM</p>
          <p>06 12 34 56 78</p>
        </div>
        
        <div className="address-section">
          <p>📍 {command.restaurantAddress}</p>
          <button 
            className={`button button-recupere ${isRecupere ? 'clicked' : ''}`} 
            onClick={handleRecupereClick}
          >
            Commande récupérée
          </button>
        </div>
        
        <div className="address-section">
          <p>🏠 {command.deliveryAddress}</p>
          <button 
            className={`button button-livree ${isRecupere ? 'active' : ''}`}
            disabled={!isRecupere} // 🔒 Désactive le bouton si la commande n'est pas récupérée
            onClick={handleLivreeClick} // 🔥 Redirige quand on clique
          >
            Commande livrée
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivraisonCommande;
