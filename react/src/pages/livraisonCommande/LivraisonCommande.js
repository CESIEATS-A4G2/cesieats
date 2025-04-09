import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header"
import "./LivraisonCommande.css";
import { useLocation, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import api from "../../api";

const LivraisonCommande = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialisation de useNavigate
  const command = location.state?.command || {}; // Récupère la commande envoyée via navigate()
    const [client, setClient] = useState([]);

  const [isRecupere, setIsRecupere] = useState(false);


  useEffect(() => {
    api.getUser(command.account_id)
        .then(res => {
          setClient(res.data); 
        })
        .catch(error => console.log("Erreur lors de la récupération des commandes :", error));
  }, []);


  const handleRecupereClick = () => {
    api.changeStatusByOrder(command._id, "DELIVERY_IN_PROGRESS")
        .then(res => {
            console.log(res); 
            setIsRecupere(true);
        })
        .catch(error => console.log("Erreur lors de la mise à jour du statut :", error));
  };
  
  const handleLivreeClick = () => {
    api.changeStatusByOrder(command._id, "DONE")
        .then(res => {
            console.log(res); 
            navigate("/liste-commandes-livreur");
        })
        .catch(error => console.log("Erreur lors de la mise à jour du statut :", error));
  };



  return (
    <div className="livraison-command-page">
      <Header role="DeliveryMan"/>
      
      <div className="livraison-card">
        
        <div className="price-section">
          <p className="price">{command.totalPrice} €</p>
          <p className="details">⏱️ {command.deliveryTime} min | {command.distance} Km</p>
        </div>
        
        <div className="qr-code">
          <p>QR CODE</p>
        </div>
        
        <div className="contact-info">
          <p>{client.name}</p>
          <p>{client.phone}</p>
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
            disabled={!isRecupere} // Désactive le bouton si la commande n'est pas récupérée
            onClick={handleLivreeClick} // Redirige quand on clique
          >
            Commande livrée
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivraisonCommande;