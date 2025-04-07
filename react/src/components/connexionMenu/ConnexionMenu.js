import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ConnexionMenu.css";  // Assurez-vous que le bon fichier CSS est importé
import { Link } from "react-router-dom"; 

function ConnexionMenu() {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate("/home");  
  };

  return (
    <div className="connexion-menu">
      <form className="connexion-form" onSubmit={handleLogin}>
        <h1>Connexion</h1>
        <input className="connexion-email" type="email" id="email" placeholder="Email" required/>
        <input className="connexion-password" type="password" id="password" placeholder="Mot de passe" required/>
        <button type="submit" className="connexion-boutonConnexion">Se connecter</button>
        <Link to="/inscription" className="connexion-inscriptionBouton">Inscription ?</Link>
      </form>
    </div>
  );
}

export default ConnexionMenu;
