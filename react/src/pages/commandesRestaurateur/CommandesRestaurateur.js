import React, { useState } from "react";
import "./CommandesRestaurateur.css";
import TicketCommandeRestaurateur from "../../components/ticketCommandeRestaurateur/TicketCommandeRestaurateur";
import TicketCommandePreteRestaurateur from "../../components/ticketCommandeRestaurateur/TicketCommandePreteRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";  // Import de l'icône

function CommandesRestaurateur() {
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
                    <TicketCommandeRestaurateur />
                </div>
                <div className="column">
                    <h2>Prête</h2>
                    <TicketCommandePreteRestaurateur />
                    <TicketCommandePreteRestaurateur />
                    <TicketCommandePreteRestaurateur />
                </div>
            </div>
            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        </div>
    );
}

export default CommandesRestaurateur;
