import React from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./ConnexionMenu.css";
import { Link } from "react-router-dom"; // Import du composant Link

function ConnexionMenu() {

  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const handleLogin = (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      navigate("/home");  // Redirige vers la page "home"
  };

  return (
    <div className="connexion-menu">
      <form className="form" onSubmit={handleLogin}> {/* Ajout de onSubmit ici */}
        <h1>Connexion</h1>
        <input className="email" type="email" id="email" placeholder="Email" required/>
        <input type="password" id="password" placeholder="Mot de passe" required/>
        <button type="submit" className="boutonConnexion">Se connecter</button>
        <Link to="/inscription" className="inscriptionBouton">Inscription ?</Link>

      </form>
    </div>
  );
}

export default ConnexionMenu;