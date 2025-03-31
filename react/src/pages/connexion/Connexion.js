import React from "react";
import { Link } from "react-router-dom"; // Import du composant Link
import "./Connexion.css";
import Header from "../../components/header/headerDeconnecte/HeaderDeconnecte";
import ConnexionMenu from "../../components/connexionMenu/ConnexionMenu";
import Footer from "../../components/footer/SiteFooter";

function Connexion() {
    return(
        <div className="connexion-page">
            <Header />
            <ConnexionMenu />
            <Link to="/inscription" className="inscriptionBouton">Inscription ?</Link> {/* Remplacement par Link */}
            <Footer />
        </div>
    );
}

export default Connexion;