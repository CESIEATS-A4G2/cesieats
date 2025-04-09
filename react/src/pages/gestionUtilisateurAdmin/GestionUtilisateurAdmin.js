import React from "react";
import "./GestionUtilisateurAdmin.css";

import Header from "../../components/header/Admin/HeaderAdmin";
import Footer from "../../components/footer/SiteFooter";
import GestionUtilisateur from "../../components/gestionUtilisateur/GestionUtilisateur";
import noProfilPicture from "../../resources/images/noProfilPicture.png"
import api from "../../api";
import { useEffect, useState } from "react";

function GestionUtilisateurAdmin() {
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
