import React, { useState } from "react";
import "./GestionCommandeRestaurateur.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function GestionCommandeRestaurateur() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
    const location = useLocation();
    const nomClient = location.state?.nomClient || "Client inconnu";
    const tempsPreparation = location.state?.duree || "Non défini";
    const typeCommande = location.state?.type || "preparation"; // Récupérez le type ici
  
    const commandes = [
      { item: "CHICKEN McNUGGETS™", quantite: 6, prix: 7.60 },
      { item: "CHICKEN McNUGGETS™", quantite: 6, prix: 7.60 },
      { item: "CHICKEN McNUGGETS™", quantite: 6, prix: 7.60 },
    ];
  
    const total = commandes.reduce((acc, curr) => acc + curr.prix, 0);

  return (
    <div className="gestioncommand-restaurateur-page">
      <div className="header-gestioncommand">
        <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
        <h1 className="title">Commandes</h1>
      </div>

      <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="commande-container">
        <div className="commande-details">
          <h2 className="client-name">{nomClient}</h2>
          <ul className="commande-list">
            {commandes.map((cmd, index) => (
              <li key={index} className="commande-item">
                <span>{cmd.quantite} X {cmd.item}</span>
                <span>{cmd.prix.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
          <div className="commande-total">
            <strong>Total</strong>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>

        <div className="commande-side">
          <div className="ready-time">
            <span>{typeCommande === "prete" ? "Prête depuis" : "Temps de préparation"}</span>
            <h2>{tempsPreparation}</h2>
          </div>
          <div className="commande-buttons">
            <button className="refuser">Refuser</button>
            <button className="accepter">{typeCommande === "prete" ? "Délivrée" : "Prête"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionCommandeRestaurateur;
