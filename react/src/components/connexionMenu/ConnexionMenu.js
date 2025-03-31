import React from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./ConnexionMenu.css";

function ConnexionMenu() {

  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const handleLogin = (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      navigate("/inscription");  // Redirige vers la page "home"
  };

  return (
    <div className="connexion-menu">
      <form className="form" onSubmit={handleLogin}> {/* Ajout de onSubmit ici */}
        <input className="email" type="email" id="email" placeholder="Email" required/>
        <input type="password" id="password" placeholder="Mot de passe" required/>
        <button type="submit">Se connecter</button>

      </form>
    </div>
  );
}

export default ConnexionMenu;