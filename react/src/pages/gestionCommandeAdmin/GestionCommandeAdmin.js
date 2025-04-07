import React, { useState } from "react";
import "./GestionCommandeAdmin.css";
import TicketCommandeAdmin from "../../components/ticketCommandeAdmin/TicketCommandeAdmin";
import TicketCommandePreteAdmin from "../../components/ticketCommandeAdmin/TicketCommandePreteAdmin";
import { FiAlignJustify } from "react-icons/fi";  // Import de l'icône
import Header from "../../components/header/TopNavBarAdmin";
import Footer from "../../components/footer/SiteFooter";

function GestionCommandeAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
      
        <div className="command-admin-page">
          <Header />
            <div className="header">
                <h1 className="title">Commandes</h1>
            </div>

            <div className="columns">
                <div className="column">
                    <h2>Préparation</h2>
                    <TicketCommandeAdmin nom="Dems" temps="25 min" type="preparation"/>
                </div>
                <div className="column">
                    <h2>Prête</h2>
                    <TicketCommandePreteAdmin nom="Emilie N" temps="10 min" type="prete" />
                    <TicketCommandePreteAdmin nom="Jean D" temps="5 min" type="prete" />
                    <TicketCommandePreteAdmin nom="Sophie M" temps="2 min" type="prete" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GestionCommandeAdmin;
