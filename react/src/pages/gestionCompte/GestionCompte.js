import React, { useState, useEffect } from "react";
import "./GestionCompte.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// User, DeliveryMan, Restaurateur, Admin
function GestionCompte({ userType = "User" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("Aurélie Mami");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [email, setEmail] = useState("aurelie.mamie@wanadoo.com");
  const [password, setPassword] = useState("**********");
  const [description, setDescription] = useState("Description du restaurant");
  const [adresse, setAdresse] = useState("Adresse du restaurant");
  const [frais, setFrais] = useState("Frais de livraison");
  const [horaire, setHoraire] = useState("Horaires d'ouverture");
  const preset_key = "cldinery";
  const cloud_name = "dzsnjlgc5";
  const [image, setImage] = useState();

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

  const handleChangePassword = () => setIsPasswordModalOpen(true);
  const handleCloseModal = () => setIsPasswordModalOpen(false);

  function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.error(err));
  }

  const roleActions = {
    User: { label: "Parrainer un ami", path: "/parrainage", role: "User" },
    Admin: { label: "Accéder au dashboard admin", path: "/admin/dashboard", role: "Admin" },
    DeliveryMan: { label: "Parrainer un ami", path: "/parrainage", role: "DeliveryMan" },
    Restaurateur: { label: "Parrainer un ami", path: "/parrainage", role: "Restaurateur" },
  };
  const action = roleActions[userType];
console.log("action, ", action.role)
  return (
    <div className="gestion-page5">
      {userType !== "Restaurateur" && <Header role={userType} />}
      <div className="gestion-container5">
        <div className="infos5">
        {userType === "Restaurateur" && (
  <button className="back-button5" onClick={() => navigate(-1)}>← Retour</button>
)}
          <h2>Informations personnelles ({userType})</h2>
          <div className="info-block5">
            <p className="label5">Image de profil</p>
            {isEditing ? (
              <input type="file" onChange={handleFile} className="editable-input5" />
            ) : (
              <p className="value5">{name}</p>
            )}
          </div>
          {image && <img src={image} alt="pic" height="200" width="200" />}

          <div className="info-block5">
            <p className="label5">Nom</p>
            {isEditing ? (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="editable-input5" />
            ) : (
              <p className="value5">{name}</p>
            )}
          </div>

          {userType === "restaurateur" && (
            <>
              <div className="info-block5">
                <p className="label5">Description</p>
                {isEditing ? (
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{description}</p>
                )}
              </div>
              <div className="info-block5">
                <p className="label5">Adresse</p>
                {isEditing ? (
                  <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{adresse}</p>
                )}
              </div>
              <div className="info-block5">
                <p className="label5">Frais</p>
                {isEditing ? (
                  <input type="text" value={frais} onChange={(e) => setFrais(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{frais}</p>
                )}
              </div>
              <div className="info-block5">
                <p className="label5">Horaires</p>
                {isEditing ? (
                  <input type="text" value={horaire} onChange={(e) => setHoraire(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{horaire}</p>
                )}
              </div>
            </>
          )}

          {userType !== "restaurateur" && (
            <>
              <div className="info-block5">
                <p className="label5">Numéro de téléphone</p>
                {isEditing ? (
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{phone}</p>
                )}
              </div>
              <div className="info-block5">
                <p className="label5">E-mail</p>
                {isEditing ? (
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="editable-input5" />
                ) : (
                  <p className="value5">{email}</p>
                )}
              </div>
            </>
          )}

          <div className="info-block5">
            <p className="label5">Mot de passe</p>
            <p className="value5">{password}</p>
          </div>

          {isEditing && (
            <button className="change-password-button5" onClick={handleChangePassword}>Changer le mot de passe</button>
          )}

          <div className="edit-save-buttons5">
            {isEditing ? (
              <button onClick={handleSave} className="save-button5">Sauvegarder</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button5">Modifier</button>
            )}
            {action && (
              <button className="parrainage-button5" onClick={() => navigate(action.path,  { state: { role: action.role } })}>
                {action.label}
              </button>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="illustration5">
            <img src={userImg} alt="illustration" />
          </div>
        )}
      </div>
      {isPasswordModalOpen && (
        <div className="modal-overlay5">
          <div className="modal5">
            <h3>Changer le mot de passe</h3>
            <input type="password" placeholder="Mot de passe actuel" />
            <input type="password" placeholder="Nouveau mot de passe" />
            <input type="password" placeholder="Confirmer le nouveau mot de passe" />
            <button className="save-button5" onClick={handleCloseModal}>Confirmer</button>
            <button className="cancel-button5" onClick={handleCloseModal}>Annuler</button>
          </div>
        </div>
      )}
      {userType !== "Restaurateur" && userType !== "DeliveryMan" && <Footer />}
    </div>
  );
}

export default GestionCompte;
