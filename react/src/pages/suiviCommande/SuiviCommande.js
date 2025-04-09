import React, { useEffect, useState } from "react";
import "./SuiviCommande.css";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import { useNavigate } from "react-router-dom";
import api from "../../api";

import mcdoImage from "../../resources/images/mcdo.png";

function SuiviCommande() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="suivi-commande-container">
        <h2>Commande en cours</h2>
        
        <div className="commande-info">
          <img src={mcdoImage} alt="McDonald's" className="commande-image" />
          <div>
            <h3>McDonald's® (Paris Hotel De Ville)</h3>
            <p>1 plat pour 8 € • 19/03/2025 à 10:50</p>
            <p>1 Menu Best-of • Big Mac • Frites • Coca-Cola</p>
          </div>
          <button 
            className="btn-etablissement" 
            onClick={() => navigate("/restaurant/mcdonalds")}
          >
            Afficher l'établissement
          </button>
        </div>

        <div className="tracking-icons">
          <div className="preparing-wrapper">
            <div className="tracking-step preparing">🍲</div>
          </div>
          <div className="tracking-line" />
          <div className="tracking-step">🔍</div>
          <div className="tracking-line" />
          <div className="tracking-step">🛵</div>
          <div className="tracking-line" />
          <div className="tracking-step">🏠</div>
        </div>

        <div className="tracking-text">
          <h3>En cours de préparation...</h3>
          <p>L’établissement a pris en charge votre commande et est en train de la préparer.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SuiviCommande;
