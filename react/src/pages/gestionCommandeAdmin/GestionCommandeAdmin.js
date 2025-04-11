import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionCommandeAdmin.css";
import TicketCommandePreteAdmin from "../../components/ticketCommandeAdmin/TicketCommandePreteAdmin";
import Header from "../../components/header/Admin/HeaderAdmin";
import Footer from "../../components/footer/SiteFooter";
import api from "../../api";

function GestionCommandeAdmin() {

  
    const navigate = useNavigate();
    useEffect(() => {
      const checkRoleAndRedirect = async () => {
          const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
          const role = res.data.user.role;
    
          switch (role) {
            case "Admin":
              break;
            case "DeliveryMan":
              navigate("/liste-commandes-livreur");
              break;
            case "Restaurateur":
              navigate("/commandes-restaurateur");
              break;
            default:
              navigate("/home");
              break;
          }
        } catch (error) {
          console.error("Erreur d'authentification :", error);
        }
      };
  
      checkRoleAndRedirect();
    }, [navigate]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // États pour les commandes
  const [ordersWait, setOrdersWait] = useState([]);
  const [ordersPrepare, setOrdersPrepare] = useState([]);
  const [ordersDeliver, setOrdersDeliver] = useState([]);
  const [ordersDone, setOrdersDone] = useState([]);
  const [usersNames, setUsersNames] = useState({}); // Dictionnaire pour stocker les noms des utilisateurs

  // Récupérer les commandes en attente
  useEffect(() => {
    api.getOrderByStatus("PENDING_CONFIRMATION")
      .then((res) => setOrdersWait(res.data))
      .catch((error) => console.error("Erreur lors de la récupération des commandes en attente :", error));
  }, []);

  // Récupérer les commandes en préparation
  useEffect(() => {
    api.getOrderByStatus("IN_PREPARATION")
      .then((res) => setOrdersPrepare(res.data))
      .catch((error) => console.error("Erreur lors de la récupération des commandes prépa :", error));
  }, []);

  // Récupérer les commandes en livraison
  useEffect(() => {
    api.getOrderByStatus("DELIVERY_IN_PROGRESS")
      .then((res) => setOrdersDeliver(res.data))
      .catch((error) => console.error("Erreur lors de la récupération des commandes en livraison :", error));
  }, []);

  // Récupérer les commandes terminées
  useEffect(() => {
    api.getOrderByStatus("DONE")
      .then((res) => setOrdersDone(res.data))
      .catch((error) => console.error("Erreur lors de la récupération des commandes finies :", error));
  }, []);

  // Récupérer le nom de l'utilisateur par son ID
  const fetchUserName = (userId) => {
    // Vérifier si le nom est déjà stocké dans l'état
    if (usersNames[userId]) {
      return usersNames[userId];
    }

    // Si le nom n'est pas déjà stocké, faire la requête API
    api.getUser(userId)
      .then((res) => {
        setUsersNames((prevNames) => ({
          ...prevNames,
          [userId]: res.data.name, // Ajouter le nom à l'état
        }));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du nom de l'utilisateur :", error);
      });

    return "Nom en cours de récupération..."; // Retourner un texte temporaire jusqu'à ce que la requête réussisse
  };

  // Calculer le temps de préparation
  function calculatePreparationTime(order) {
    let totalItems = 0;
    order.items.forEach(item => totalItems += item.quantity);
    order.menus.forEach(menu => totalItems += menu.quantity * menu.items.length);
    const totalTime = totalItems * 2; // Chaque item prend 2 minutes
    return `${totalTime} min`;
  }

  // Calculer la différence de temps
  function getTimeDifferenceFromNow(isoDate) {
    const pastDate = new Date(isoDate);
    const now = new Date();
    const diffMs = now - pastDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    return diffHours > 0 ? `${diffHours}h ${remainingMinutes}min` : `${diffMinutes}min`;
  }

  return (
    <div className="command-admin-page">
      <Header role="Admin"/>
      <div className="header">
        <h1 className="title">Commandes</h1>
      </div>

      <div className="columns">
        <div className="column">
          <h2>Attente</h2>
          {ordersWait.map((orderWait) => (
            <TicketCommandePreteAdmin
              key={orderWait._id}
              id={orderWait._id}
              nom={fetchUserName(orderWait.account_id)} // Appel pour récupérer le nom
              temps={calculatePreparationTime(orderWait)}
              type={orderWait.status}
            />
          ))}
        </div>

        <div className="column">
          <h2>Préparation</h2>
          {ordersPrepare.map((orderPrepare) => (
            <TicketCommandePreteAdmin
            key={orderPrepare._id}
            id={orderPrepare._id}
              nom={fetchUserName(orderPrepare.account_id)} // Appel pour récupérer le nom
              temps={calculatePreparationTime(orderPrepare)}
              type={orderPrepare.status}
            />
          ))}
        </div>

        <div className="column">
          <h2>Livraison</h2>
          {ordersDeliver.map((orderDeliver) => (
            <TicketCommandePreteAdmin
            key={orderDeliver._id}
              id={orderDeliver._id}
              nom={fetchUserName(orderDeliver.account_id)} // Appel pour récupérer le nom
              temps={calculatePreparationTime(orderDeliver)}
              type={orderDeliver.status}
            />
          ))}
        </div>

        <div className="column">
          <h2>Terminée</h2>
          {ordersDone.map((orderDone) => (
            <TicketCommandePreteAdmin
            key={orderDone._id}
              id={orderDone._id}
              nom={fetchUserName(orderDone.account_id)} // Appel pour récupérer le nom
              temps={getTimeDifferenceFromNow(orderDone.createdAt)}
              type={orderDone.status}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GestionCommandeAdmin;
