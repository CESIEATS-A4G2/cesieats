import React, { useEffect, useState } from "react";
import "./CommandesRestaurateur.css";
import TicketCommandePreteRestaurateur from "../../components/ticketCommandeRestaurateur/TicketCommandePreteRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";  // Import de l'icône
import api from '../../api';

function CommandesRestaurateur() {
const [orders, setOrders] = useState([]);

    const [ordersWait, setOrdersWait] = useState([]);
    const [ordersPrepare, setOrdersPrepare] = useState([]);
      const [usersNames, setUsersNames] = useState({}); 

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

    function calculatePreparationTime(order) {
        let totalItems = 0;
        order.items.forEach(item => totalItems += item.quantity);
        order.menus.forEach(menu => totalItems += menu.quantity * menu.items.length);
        const totalTime = totalItems * 2; // Chaque item prend 2 minutes
        return `${totalTime} min`;
      }

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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    // console.log("ordersPrepare : ", ordersPrepare)
    // console.log("ordersWait : ", ordersWait)

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Commandes</h1>
            </div>

            <div className="columns">
                <div className="column">
                    <h2>Préparation</h2>
                    {ordersWait.map((orderWait) => (
                        <TicketCommandePreteRestaurateur
                        order={orderWait}
                        nom={fetchUserName(orderWait.account_id)}
                        temps={calculatePreparationTime(orderWait)}
                        />
                    ))}
                </div>
                <div className="column">
                    <h2>Prête</h2>

                    {ordersPrepare.map((orderPrepare) => (
                        <TicketCommandePreteRestaurateur
                        order={orderPrepare}
                        nom={fetchUserName(orderPrepare.account_id)}
                        temps={calculatePreparationTime(orderPrepare)}
                        />
                    ))}
                   
                </div>
            </div>
            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        </div>
    );
}

export default CommandesRestaurateur;
