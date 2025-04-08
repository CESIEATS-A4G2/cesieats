import React, { useState, useEffect } from "react";
import "./AdminCompte.css";
import Header from "../../components/header/TopNavBarAdmin";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png";
import { useNavigate } from "react-router-dom"; 
import api from '../../api'; // 💡 Chemin vers ton fichier api.js
import axios from "axios";

const trigger = false; // Variable globale pour le trigger
function AdminCompte({ userType = "admin" }) {  // Ajout du paramètre userType
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("Aurélie Mami");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [email, setEmail] = useState("aurelie.mamie@wanadoo.com");
  const [password, setPassword] = useState("**********");
  const preset_key = "cldinery";
  const cloud_name = "dzsnjlgc5";
  const [image, setImage] = useState(); // Remplace par une vraie URL si tu en as
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    
    setIsEditing(false);
    alert("Modifications sauvegardées !");

  };

function handleFile(event){
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_key); // Remplace par ton upload preset
  axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
  .then(res => setImage(res.data.secure_url))
  .catch(err => console.error(err));
}
  
  const handleChangePassword = () => setIsPasswordModalOpen(true);

  const handleCloseModal = () => setIsPasswordModalOpen(false);



  return (
    <div className="gestion-page">
      <Header />
      <div className="gestion-container">
        <div className="infos">
          
          <h2>Informations personnelles ({userType})</h2>
          <div className="info-block">
            <p className="label">Image de profil</p>
            {isEditing ? (
              <input
                type="file"
                onChange={handleFile}
                className="editable-input"
              />
            ) : (
              <p className="value">{name}</p>
            )}
          </div>
          {image &&<img src={image} alt="pic" height="200" width="200" />}
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
            {userType === "client" && (
              <button className="parrainage-button" onClick={() => navigate("/parrainage")}>
                Parrainer un ami
              </button>
            )}
            {userType === "admin" && (
              <button className="admin-button" onClick={() => navigate("/admin/dashboard")}>
                Accéder au dashboard admin
              </button>
            )}
            {userType === "livreur" && (
              <button className="livreur-button" onClick={() => navigate("/livreur/commandes")}>
                Voir les commandes à livrer
              </button>
            )}
            {userType === "restaurateur" && (
              <button className="restaurateur-button" onClick={() => navigate("/restaurateur/menu")}>
                Gérer mon menu
              </button>
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

export default AdminCompte;