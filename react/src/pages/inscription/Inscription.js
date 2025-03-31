import React from "react";
import { Link } from "react-router-dom"; // Import du composant Link
import "./Inscription.css";
import Header from "../../components/header/headerDeconnecte/HeaderDeconnecte";
import InscriptionMenu from "../../components/inscriptionMenu/InscriptionMenu";
import Footer from "../../components/footer/SiteFooter";

function Inscription() {
    return(
        <div className="inscription-page">
            <Header />
            <InscriptionMenu />
            <Link to="/" className="ConnectionBouton">Connection ?</Link> {}
            <Footer />
        </div>
    );
}

export default Inscription;