import React from "react";
import "./GestionCompte.css";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png"; // remplace par ton image

function GestionCompte() {
  return (
    <div className="gestion-page">
      <Header />
      <div className="gestion-container">
        <div className="infos">
          <h2>Informations personnelles</h2>

          <div className="info-block">
            <p className="label">Nom</p>
            <p className="value">Aurélien Mattera</p>
          </div>

          <div className="info-block">
            <p className="label">Numéro de téléphone</p>
            <p className="value">+33 6 12 34 56 78</p>
          </div>

          <div className="info-block">
            <p className="label">E-mail</p>
            <p className="value">aurelien.mattera@wanadoo.com</p>
          </div>

          <div className="info-block">
            <p className="label">Mot de passe</p>
            <p className="value">**********</p>
          </div>
        </div>

        <div className="illustration">
          <img src={userImg} alt="illustration" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GestionCompte;
