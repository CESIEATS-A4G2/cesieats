import React, { useEffect, useState } from "react";
import "./HistoriqueCommande.css";
import CommandeItem from "./CommandeItem";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import { useNavigate } from "react-router-dom";
import api from "../../api";

// Formater une date en français
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    console.error("Date invalide :", dateString);
    return "Date invalide";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
}

// Traduction du statut
function convertStatus(status) {
  switch (status) {
    case "PENDING_CONFIRMATION":
      return "En attente de confirmation";
    case "IN_PREPARATION":
      return "En cours de préparation";
    case "DELIVERY_IN_PROGRESS":
      return "En cours de livraison";
    default:
      return "Reçue";
  }
}

function ItemsInOrder(order) {
  const menuDetails = (order.menus && order.menus.length > 0)
    ? order.menus.map((menu) => {
        const menuName = `${menu.name} x${menu.quantity}`;
        const itemNames = menu.items.map((item) => item.name).join(" • ");
        return `${menuName}: ${itemNames}`;
      })
    : [];

  const itemDetails = (order.items && order.items.length > 0)
    ? order.items.map((item) => `${item.name} x${item.quantity}`)
    : [];

  const allDetails = [...menuDetails, ...itemDetails];

  return allDetails.length > 0 ? allDetails.join(" • ") : "...";
}

function HistoriqueCommande() {
  const navigate = useNavigate();
  const [ordersAccPreparing, setOrdersAccPreparing] = useState([]);
  const [ordersAccDone, setOrdersAccDone] = useState([]);
  const [restaurantInfos, setRestaurantInfos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingRes, prepRes, deliveryRes, doneRes] = await Promise.all([
          api.getOrderByAccountAndStatus("ACC000001", "PENDING_CONFIRMATION"),
          api.getOrderByAccountAndStatus("ACC000001", "IN_PREPARATION"),
          api.getOrderByAccountAndStatus("ACC000001", "DELIVERY_IN_PROGRESS"),
          api.getOrderByAccountAndStatus("ACC000001", "DONE"),
        ]);

        const commandesEnCours = [
          ...pendingRes.data,
          ...prepRes.data,
          ...deliveryRes.data,
        ];
        const commandesPassees = doneRes.data;

        setOrdersAccPreparing(commandesEnCours);
        setOrdersAccDone(commandesPassees);

        const allOrders = [...commandesEnCours, ...commandesPassees];
        const uniqueRestaurantIds = [
          ...new Set(allOrders.map((o) => o.restaurant_id)),
        ];

        const restoMap = {};
        await Promise.all(
          uniqueRestaurantIds.map((id) =>
            api
              .getRestaurant(id)
              .then((res) => {
                restoMap[id] = {
                  name: res.data.name,
                  image: res.data.image || "",
                };
              })
              .catch(() => {
                restoMap[id] = { name: "Nom introuvable", image: "" };
              })
          )
        );

        setRestaurantInfos(restoMap);
      } catch (error) {
        console.error("Erreur chargement commandes + restos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="historique-container">
      <Header role="User"/>

      <div className="historique-section">
        <h2>Commandes en cours</h2>
        {ordersAccPreparing.map((order) => {
          const resto = restaurantInfos[order.restaurant_id];
          return (
            <CommandeItem
              key={order.id}
              restaurantName={resto?.name || "Chargement..."}
              image={resto?.image}
              details={`${order.totalPrice}€ • ${formatDate(order.createdAt)}`}
              description={ItemsInOrder(order)}
              status={convertStatus(order.status)}
              buttonLabel="Suivre la commande"
              buttonAction={() => navigate("/suivi-commande")}
            />
          );
        })}
      </div>

      <div className="historique-section">
        <h2>Commandes passées</h2>
        {ordersAccDone.map((order) => {
          const resto = restaurantInfos[order.restaurant_id];
          return (
            <CommandeItem
              key={order.id}
              restaurantName={resto?.name || "Chargement..."}
              image={resto?.image}
              details={`${order.totalPrice}€ • ${formatDate(order.createdAt)}`}
              description={ItemsInOrder(order)}
              status={convertStatus(order.status)}
              buttonLabel="Afficher l'établissement"
              buttonAction={() => navigate(`/restaurant/${order.restaurant_id}`)}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default HistoriqueCommande;
