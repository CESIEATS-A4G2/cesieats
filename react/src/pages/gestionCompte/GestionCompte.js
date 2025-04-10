import React, { useState, useEffect } from "react";
import "./GestionCompte.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import userImg from "../../resources/images/account-illustration.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";

const API_URL = "http://localhost:8080/api";

function GestionCompte({ userType = "User" }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [idAccount, setIdAccount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("**********");
  const [image, setImage] = useState(null);

  const [restoName, setRestoName] = useState("Nom restaurant");
  const [description, setDescription] = useState("Description du restaurant");
  const [adresse, setAdresse] = useState("Adresse du restaurant");
  const [frais, setFrais] = useState("Frais de livraison");
  const [horaire, setHoraire] = useState("Horaires d'ouverture");

  const [resto, setResto] = useState([]);
  const navigate = useNavigate();

  const preset_key = "cldinery";
  const cloud_name = "dzsnjlgc5";

  const updateUser = (userId, data) => {
    console.log("ID et data", userId, data)
    console.log(data.name, data.phone, data.email)
    return api.updateUser(userId, { name: data.name, phone: data.phone, email: data.email, password: data.password });
  };

  const updateResto = (restoId, data) => {
    console.log("RESTO ID et data", restoId, data)
    return api.UpdateRestorant(restoId, data);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
        const user = res.data.user;
        setUserData(user);

        const roleCleaned = user.role?.replace(/\s+/g, "") || "";
        const accountId = user.account_id || "no ID";

        setIdAccount(accountId);
        setName(user.name.split("@")[0]);
        setPhone(user.phone || "Aucun numéro");
        setEmail(user.email);
        setRole(roleCleaned);
        setImage(user.image || null);
        setPassword(user.password);

        if (roleCleaned === "Restaurateur" && accountId) {
          try {
            const restoRes = await api.getRestaurantByAccountId(accountId);
            const restoData = restoRes.data;

            setResto(restoData);
            setRestoName(restoData.name || "Nom restaurant");
            setDescription(restoData.description || "Description du restaurant");
            setAdresse(restoData.address || "Adresse du restaurant");
            setFrais(restoData.fees || "Frais de livraison");
            setHoraire(restoData.open_hour || "Horaires d'ouverture");
            
            if (restoRes.data.length === 0) {
              await api.modifyOwnerRestaurant("RES000001", { account_id: accountId });
              const updatedResto = await api.getRestaurant("RES000001");
              const newRestoData = updatedResto.data;

              setResto(newRestoData);
              setRestoName(newRestoData.name || "Nom restaurant");
              setDescription(newRestoData.description || "Description du restaurant");
              setAdresse(newRestoData.address || "Adresse du restaurant");
              setFrais(newRestoData.fees || "Frais de livraison");
              setHoraire(newRestoData.open_hour || "Horaires d'ouverture");
              
              
            }
           
          } catch (err) {
            console.error("Erreur lors de la récupération du restaurant :", err);
          }
        }
      } catch (err) {
        console.log("Erreur lors de l'authentification :", err);
      }
    };

    fetchData();
  }, []);

  console.log("resto, ", resto);
  console.log("restoName, ", restoName);
  console.log("description, ", description);
  console.log("frais, ", adresse);
  console.log("frais, ", frais);
  console.log("horaire, ", horaire);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = async () => {
    setIsEditing(false);

    if(role === "Restaurateur"){
      const updatedDataRes = {
        name: restoName,
        description: description,
        address: adresse,
        fees: frais,
        prep_time: resto.prep_time,
        image: resto.image,
        open_hour: horaire
      };
      try {
          await updateResto(resto.restaurant_id, updatedDataRes);
          alert("Modifications sauvegardées !");
        }
       catch (err) {
        alert("Erreur lors de la sauvegarde des modifications.", err);
      }
    }
    else {

      try {
        if (userData) {
          const updatedData = {
            name: name,
            phone: phone,
            email: email,
            password: password
          };
  
          await updateUser(idAccount, updatedData);
        }
        alert("Modifications sauvegardées !");
      } catch (err) {
        console.error("Erreur lors de la mise à jour :", err);
        alert("Erreur lors de la sauvegarde des modifications.");
      }
    }

  };

  const handleChangePassword = () => setIsPasswordModalOpen(true);
  const handleCloseModal = () => setIsPasswordModalOpen(false);

  let fileInput = null;
  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.error(err));
  };

  const roleActions = {
    User: { label: "Parrainer un ami", path: "/parrainage", role: "User" },
    Admin: { label: "Accéder au dashboard admin", path: "/admin/dashboard", role: "Admin" },
    DeliveryMan: { label: "Parrainer un ami", path: "/parrainage", role: "DeliveryMan" },
    Restaurateur: { label: "Parrainer un ami", path: "/parrainage", role: "Restaurateur" },
  };

  const action = roleActions[role];

  return (
    <div className="gestion-page5">
      {role !== "Restaurateur" && <Header role={role} />}

      <div className="gestion-container5">
        <div className="infos5">
          {role === "Restaurateur" && (
            <button className="back-button5" onClick={() => navigate(-1)}>← Retour</button>
          )}

          <h2>Informations personnelles ({role})</h2>

          <div className="info-block5">
            <p className="label5">Image de profil</p>
            {image ? (
              <img src={image} alt="profil" className="profile-pic5" height="200" width="200" />
            ) : (
              <p className="value5">Aucune image</p>
            )}
            {isEditing && (
              <>
                <input type="file" ref={(input) => (fileInput = input)} onChange={handleFile} style={{ display: "none" }} />
                <button onClick={() => fileInput && fileInput.click()} className="edit-button5">Modifier l’image</button>
              </>
            )}
          </div>

          <div className="info-block5">
            <p className="label5">Nom</p>
            {isEditing ? (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="editable-input5" />
            ) : (
              <p className="value5">{name}</p>
            )}
          </div>
          
          {role === "Restaurateur" ? (
            <>
          
              <div className="info-block5"><p className="label5">Nom Restaurants</p>
                {isEditing ? (
                  <input type="text" value={restoName} onChange={(e) => setRestoName(e.target.value)} className="editable-input5" /> 
                ) : ( 
                  <p className="value5">{restoName}</p>
                )}
              </div>
              <div className="info-block5"><p className="label5">Description</p>
                {isEditing ? (
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="editable-input5" /> 
                ) : (
                  <p className="value5">{description}</p>
                )}
              </div>
              <div className="info-block5"><p className="label5">Adresse</p>
                {isEditing ? (
                <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="editable-input5" /> 
                ) : (
                <p className="value5">{adresse}</p>
              )}
              </div>
              <div className="info-block5"><p className="label5">Frais</p>
                {isEditing ? (
                <input type="text" value={frais} onChange={(e) => setFrais(e.target.value)} className="editable-input5" /> 
              ) : (
                <p className="value5">{frais}</p>
              )}
              </div>
              <div className="info-block5"><p className="label5">Horaires</p>
                {isEditing ? ( 
                <input type="text" value={horaire} onChange={(e) => setHoraire(e.target.value)} className="editable-input5" /> 
              ) : ( 
                <p className="value5">{horaire}</p>
              )}
              </div>
            </>
          ) : (
            <>
              <div className="info-block5"><p className="label5">Numéro de téléphone</p>{isEditing ? <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="editable-input5" /> : <p className="value5">{phone}</p>}</div>
              <div className="info-block5"><p className="label5">E-mail</p>{isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="editable-input5" /> : <p className="value5">{email}</p>}</div>
            </>
          )}

          <div className="info-block5"><p className="label5">Mot de passe</p><p className="value5">*****</p></div>

          {isEditing && <button className="change-password-button5" onClick={handleChangePassword}>Changer le mot de passe</button>}

          <div className="edit-save-buttons5">
            {isEditing ? (
              <button onClick={handleSave} className="save-button5">Sauvegarder</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button5">Modifier</button>
            )}
            {action && <button className="parrainage-button5" onClick={() => navigate(action.path, { state: { role: action.role } })}>{action.label}</button>}
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

      {role !== "Restaurateur" && role !== "DeliveryMan" && <Footer />}
    </div>
  );
}

export default GestionCompte;
