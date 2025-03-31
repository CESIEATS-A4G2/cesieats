import React, { useState, useEffect } from "react";
import "./GestionCompte.css";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png";

function GestionCompte() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("Aurélie Mami");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [email, setEmail] = useState("aurelie.mamie@wanadoo.com");
  const [password, setPassword] = useState("**********");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    alert("Modifications sauvegardées !");
  };

  const handleChangePassword = () => setIsPasswordModalOpen(true);

  const handleCloseModal = () => setIsPasswordModalOpen(false);

  return (
    <div className="gestion-page">
      <Header />
      <div className="gestion-container">
        <div className="infos">
          <h2>Informations personnelles</h2>
          <div className="info-block">
            <p className="label">Nom</p>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{name}</p>
            )}
          </div>
          <div className="info-block">
            <p className="label">Numéro de téléphone</p>
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{phone}</p>
            )}
          </div>
          <div className="info-block">
            <p className="label">E-mail</p>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{email}</p>
            )}
          </div>
          <div className="info-block">
            <p className="label">Mot de passe</p>
            <p className="value">{password}</p>
          </div>
          {isEditing && (
            <button className="change-password-button" onClick={handleChangePassword}>
              Changer le mot de passe
            </button>
          )}
          <div className="edit-save-buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-button">Sauvegarder</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button">Modifier</button>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="illustration">
            <img src={userImg} alt="illustration" />
          </div>
        )}
      </div>
      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Changer le mot de passe</h3>
            <input type="password" placeholder="Mot de passe actuel" />
            <input type="password" placeholder="Nouveau mot de passe" />
            <input type="password" placeholder="Confirmer le nouveau mot de passe" />
            <button className="save-button" onClick={handleCloseModal}>Confirmer</button>
            <button className="cancel-button" onClick={handleCloseModal}>Annuler</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default GestionCompte;
