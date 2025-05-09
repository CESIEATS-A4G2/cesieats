import React from "react";
import { useNavigate } from "react-router-dom";
import "./GestionUtilisateurAdmin.css";

import Header from "../../components/header/Admin/HeaderAdmin";
import Footer from "../../components/footer/SiteFooter";
import GestionUtilisateur from "../../components/gestionUtilisateur/GestionUtilisateur";
import noProfilPicture from "../../resources/images/noProfilPicture.png"
import api from "../../api";
import { useEffect, useState } from "react";
import axios from "axios";

function GestionUtilisateurAdmin() {

  const navigate = useNavigate();
  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      try {
        const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
        const role = res.data.user.role;

        console.log(role);
        switch (role) {
          case "DeliveryMan":
            break;
          case "Restaurateur":
            navigate("/commandes-restaurateur");
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

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    api.getAllUsers().then(res => {setAccounts(res.data);
      console.log("Comptes récupérés :", res.data);
    }).catch(error => console.error("Erreur lors de la récupération des comptes :", error));
  }, []);

  const handleSuspend = (id) => {
    console.log(`Suspendre l'utilisateur avec l'id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Supprimer l'utilisateur avec l'id ${id}`);
  };

  
 
  return (
    <div className="gestionutilisateur-container">
      <Header role="Admin"/>
      <div className="contenu-utilisateurs">
        <h1>Gestion des utilisateurs</h1>
        {accounts.map((account) => (
          <GestionUtilisateur
            key={account.account_id}
            user={account}
            name={account.name}
            role={account.role}
            onSuspend={handleSuspend}
            onDelete={handleDelete}
            avatar={account.avatar ? account.avatar : noProfilPicture} // Utiliser l'avatar ou une image par défaut
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default GestionUtilisateurAdmin;
