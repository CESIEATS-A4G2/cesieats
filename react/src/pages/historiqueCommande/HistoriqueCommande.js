import React from "react";
import "./HistoriqueCommande.css";
import CommandeItem from "./CommandeItem";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import { useNavigate } from "react-router-dom";

import mcdoImage from "../../resources/images/mcdo.png";
import otacosImage from "../../resources/images/tacos.png";

function HistoriqueCommande() {
  const navigate = useNavigate();

  return (
    <div className="historique-container">
      <Header />

      <div className="historique-section">
        <h2>Commande en cours</h2>
        <CommandeItem
          restaurantName="McDonald's® (Paris Hotel De Ville)"
          image={mcdoImage}
          rating="4.5"
          details="1 plat pour 8 € • 19/03/2025 à 10:50"
          description="1 Menu Best-of • Big Mac • Frites • Coca-Cola"
          status="En cours de préparation"
          buttonLabel="Suivre la commande"
          buttonAction={() => navigate("/suivi-commande")}
        />
      </div>

      <div className="historique-section">
        <h2>Commandes passées</h2>
        <CommandeItem
          restaurantName="O’Tacos - Saint-Michel"
          image={otacosImage}
          rating=""
          details="1 plat pour 9 € • 07/03/2025 à 20:50"
          description="1 Menu Tacos L • Steak, nuggets, mayonnaise • Frites"
          buttonLabel="Afficher l'établissement"
          buttonAction={() => navigate("/restaurant/otacos")}
        />
        <CommandeItem
          restaurantName="McDonald's® (Paris Hotel De Ville)"
          image={mcdoImage}
          rating=""
          details="1 plat pour 12 € • 02/03/2025 à 20:50"
          description="1 Menu Best-of • Big Mac • Frites • Coca-Cola\n1 P'tit Wrap Ranch"
          buttonLabel="Afficher l'établissement"
          buttonAction={() => navigate("/restaurant/mcdonalds")}
        />
      </div>

      <Footer />
    </div>
  );
}

export default HistoriqueCommande;
