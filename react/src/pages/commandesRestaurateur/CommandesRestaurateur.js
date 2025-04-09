import React, { useEffect, useState } from "react";
import "./CommandesRestaurateur.css";
import TicketCommandePreteRestaurateur from "../../components/ticketCommandeRestaurateur/TicketCommandePreteRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";  // Import de l'icône
import api from '../../api';

function CommandesRestaurateur() {
const [orders, setOrders] = useState([]);
    // useEffect(() => {
    //     api.getAllOrders()
    //       .then(res => {
    //         setOrders(res.data);
    //         console.log(res.data)
    //       })
    //       .catch(error => console.error("Erreur lors de la récupération des commandes :", error));
    //   }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Commandes</h1>
            </div>

            <div className="columns">
                <div className="column">
                    <h2>Préparation</h2>
                    <TicketCommandePreteRestaurateur nom="Dems" temps="25 min" type="preparation"/>
                    
                </div>
                <div className="column">
                    <h2>Prête</h2>
                    <TicketCommandePreteRestaurateur nom="Emilie N" temps="10 min" type="prete" />
                    <TicketCommandePreteRestaurateur nom="Jean D" temps="5 min" type="prete" />
                    <TicketCommandePreteRestaurateur nom="Sophie M" temps="2 min" type="prete" />
                </div>
            </div>
            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        </div>
    );
}

export default CommandesRestaurateur;
