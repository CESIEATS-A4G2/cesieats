import React, { useState, useEffect } from "react";
import "./GestionCompteRestau.css";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FiAlignJustify } from "react-icons/fi";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";

function GestionCompteRestaurant({ userType = "User" }) {  // Ajout du paramètre userType
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("A SYNCHRONISER AVEC LA BDD");
  const [description, setDescription] = useState("A SYNCHRONISER AVEC LA BDD");
  const [adresse, setAdresse] = useState("A SYNCHRONISER AVEC LA BDD");
  const [frais, setFrais] = useState("A SYNCHRONISER AVEC LA BDD");
  const [horaire, setHoraire] = useState("A SYNCHRONISER AVEC LA BDD");
  const preset_key = "cldinery";
  const cloud_name = "dzsnjlgc5";
  const [image, setImage] = useState();  


    const navigate = useNavigate();
    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            try {
                const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
                const role = res.data.user.role;

                console.log(role);
                switch (role) {
                    case "DeliveryMan":
                        navigate("/liste-commandes-livreur");
                        break;
                    case "Restaurateur":
                        break;
                    case "Admin":
                        break;
                    default:
                        navigate("/home");
                }
            } catch (error) {
                console.error("Erreur d'authentification :", error);
            }
        };
        checkRoleAndRedirect();
    }, [navigate]);

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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCloseModal = () => setIsPasswordModalOpen(false);

  function handleFile(event){
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key); // Remplace par ton upload preset
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    .then(res => setImage(res.data.secure_url))
    .catch(err => console.error(err));
    
  }
  return (
    <div className="gestion-page">
      <div className="header">
          <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
      </div>
      <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
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
            <p className="label">Description</p>
            {isEditing ? (
              <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="editable-input"
            />
            ) : (
              <p className="value">{description}</p>
            )}
          </div>
          <div className="info-block">
            <p className="label">Adresse</p>
            {isEditing ? (
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{adresse}</p>
            )}
          </div>
          
          <div className="info-block">
            <p className="label">Frais</p>
            {isEditing ? (
              <input
                type="text"
                value={frais}
                onChange={(e) => setFrais(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{frais}</p>
            )}
          </div>
          <div className="info-block">
            <p className="label">Horaire d'ouverture</p>
            {isEditing ? (
              <input
                type="text"
                value={horaire}
                onChange={(e) => setHoraire(e.target.value)}
                className="editable-input"
              />
            ) : (
              <p className="value">{horaire}</p>
            )}
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
            {userType === "User" && (
              <button className="parrainage-button" onClick={() => navigate("/parrainage")}>
                Parrainer un ami
              </button>
            )}
            {userType === "admin" && (
              <button className="admin-button" onClick={() => navigate("/admin/dashboard")}>
                Accéder au dashboard admin
              </button>
            )}
            {userType === "Delivery Man" && (
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
    </div>
    
  );
}

export default GestionCompteRestaurant;