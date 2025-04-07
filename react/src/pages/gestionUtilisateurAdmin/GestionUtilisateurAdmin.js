import React from "react";
import "./GestionUtilisateurAdmin.css";

import Header from "../../components/header/headerDeconnecte";
import Footer from "../../components/footer/SiteFooter";
import GestionUtilisateur from "../../components/gestionUtilisateur/GestionUtilisateur";
import noProfilPicture from "../../resources/images/noProfilPicture.png"

function GestionUtilisateurAdmin() {
  const users = [
    {
      id: 1,
      username: "Abdel",
      role: "Livreur",
      avatar: noProfilPicture,
    },
    {
      id: 2,
      username: "Karim",
      role: "Restaurateur",
      avatar: noProfilPicture,
    },
    {
        id: 3,
        username: "Paul",
        role: "Utilisateur",
        avatar: noProfilPicture,
      }
  ];

  const handleSuspend = (id) => {
    console.log(`Suspendre l'utilisateur avec l'id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Supprimer l'utilisateur avec l'id ${id}`);
  };

  return (
    <div className="gestionutilisateur-container">
      <Header />
      <div className="contenu-utilisateurs">
        <h1>Gestion des utilisateurs</h1>
        {users.map((user) => (
          <GestionUtilisateur
            key={user.id}
            user={user}
            onSuspend={handleSuspend}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default GestionUtilisateurAdmin;
