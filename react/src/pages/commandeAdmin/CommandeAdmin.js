import React, { useEffect, useState } from "react";
import "./CommandeAdmin.css";
import Header from "../../components/header/TopNavBarAdmin";
import Footer from "../../components/footer/SiteFooter";
import { useNavigate, useLocation } from "react-router-dom";
import mcdoImage from "../../resources/images/mcdo.png";
import api from "../../api";

// Fonction pour formater la date
function formatDate(dateString) {
  // Vérification que la date est valide
  const date = new Date(dateString);

  // Vérification si la date est invalide
  if (isNaN(date)) {
    console.error("Date invalide :", dateString);
    return "Date invalide"; // Retourne un texte par défaut si la date est invalide
  }

  const options = {
    weekday: 'long', // Nom complet du jour de la semaine
    year: 'numeric', // Année
    month: 'long', // Mois en entier
    day: 'numeric', // Jour du mois
    hour: 'numeric', // Heure
    minute: 'numeric', // Minute
    hour12: false, // Utilisation du format 24h (pas de AM/PM)
  };

  // Formater la date avec les options et la locale en français
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

function textChangingStatus(type, textnumber){
  const key = `${type}-${textnumber}`;
  switch (key) {
    case "PENDING_CONFIRMATION-1":
      return "En attente de confirmation";
    case "PENDING_CONFIRMATION-2":
      return "L’établissement va confirmer votre commande.";
    case "IN_PREPARATION-1":
      return "En cours de préparation...";
    case "IN_PREPARATION-2":
      return "L’établissement a pris en charge votre commande et est en train de la préparer.";
    case "DELIVERY_IN_PROGRESS-1":
      return "Livraison en cours";
    case "DELIVERY_IN_PROGRESS-2":
      return "Le livreur est en chemin vers l'adresse de livraison.";
    case "DONE-1":
      return "Commande récupérée";
    case "DONE-2":
      return "La commande a bien été livrée à l'adresse de livraison.";
    default:
      return "Valeurs inconnues";
  }
}

function CommandeAdmin() {
  const navigate = useNavigate();
  const location = useLocation(); // Récupérer l'état passé avec navigate
  const { idCommande, nomClient, duree, type } = location.state || {}; // Déstructuration de l'état
  console.log(idCommande, nomClient, duree, type)

  // Récupérer la commande avec son id
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.getOrderById(idCommande);
        setOrder(res.data);
      } catch (error) {
        console.log("Erreur lors de la récupération de la commande :", error);
      }
    };

    if (idCommande) {
      fetchOrder();
    }
  }, [idCommande]);
  // Récupérer le restaurant avec son id
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (order.restaurant_id) {
          const res = await api.getRestaurant(order.restaurant_id);
          setRestaurant(res.data);
        } else {
          console.log("Restaurant ID manquant");
        }
      } catch (error) {
        console.log("Erreur lors de la récupération du restaurant :", error);
      }
    };

    if (order.restaurant_id) {
      fetchRestaurant();
    }
  }, [order.restaurant_id]);


  const menuItemsList = (order.menus && order.menus.length > 0) ? order.menus.map(menu => {
    const menuName = `${menu.name} x${menu.quantity} `;
    const itemNames = menu.items.map(item => item.name).join(" • ");
    return `${menuName}: ${itemNames}`;
  }).join(" • ") : "...";

  // Fonction pour déterminer quelle icône est active en fonction du type
  const getActiveStepClass = (status) => {
    console.log("type, ", type);
    if (type === "PENDING_CONFIRMATION" && status === "preparing") {
      console.log("1");
      return "preparing-wrapper";  // Marmite active pour PENDING_CONFIRMATION
    }
    if (type === "IN_PREPARATION" && status === "searching") {
      console.log("2");
      return "preparing-wrapper";  // Loupe active pour IN_PREPARATION
    }
    if (type === "DELIVERY_IN_PROGRESS" && status === "delivering") {
      console.log("3");
      return "preparing-wrapper";  // Scooter active pour DELIVERY_IN_PROGRESS
    }
    if (type === "DONE" && status === "delivered") {
      console.log("4");
      return "preparing-wrapper";  // Maison active pour DONE
    }
    return "";  // Désactive toutes les autres étapes
  };

  return (
    <>
      <Header />
      <div className="suivi-commande-container">
        <h2>Commande de {nomClient}</h2>

        <div className="commande-info">
          <img src={mcdoImage} alt="McDonald's" className="commande-image" />
          <div>
            <h3>{restaurant.name}</h3>
            <p>{order.totalPrice}€ • {formatDate(order.createdAt)}</p>
            <p>{menuItemsList}</p>
          </div>
          <button 
            className="btn-etablissement" 
            onClick={() => navigate("/restaurant/mcdonalds")}
          >
            Afficher l'établissement
          </button>
        </div>

        <div className="tracking-icons">

          <div className={getActiveStepClass("preparing")}>
            <div className="tracking-step">🍲</div> {/* Marmite */}
          </div>

          <div className="tracking-line" />

          <div className={getActiveStepClass("searching")}>
            <div className="tracking-step">🔍</div> {/* Loupe */}
          </div>

          <div className="tracking-line" />

          <div className={getActiveStepClass("delivering")}>
            <div className="tracking-step">🛵</div> {/* Scooter */}
          </div>

          <div className="tracking-line" />

          <div className={getActiveStepClass("delivered")}>
            <div className="tracking-step">🏠</div> {/* Maison */}
          </div>
        </div>

        <div className="tracking-text">
          <h3>{textChangingStatus(type, "1")}</h3>
          <p>{textChangingStatus(type, "2")}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}



export default CommandeAdmin;
