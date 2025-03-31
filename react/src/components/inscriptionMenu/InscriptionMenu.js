import React from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./InscriptionMenu.css";

function InscriptionMenu() {

  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const handleLogin = (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      navigate("/home");  // Redirige vers la page "home"
  };

  return (
    <div className="inscription-menu">
      <form className="form" onSubmit={handleLogin}> {/* Ajout de onSubmit ici */}
        <input className="email" type="email" id="email" placeholder="Email" required/>
        <input type="password" id="password" placeholder="Mot de passe" required/>
        <input type="password" id="password" placeholder="Confirmez le mot de passe" required/>
        <button type="submit">Enregistrer</button>
        
      </form>
    </div>
  );
}

export default InscriptionMenu;