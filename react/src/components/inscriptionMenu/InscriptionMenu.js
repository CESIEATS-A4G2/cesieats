import React from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./InscriptionMenu.css";
import { Link } from "react-router-dom"; // Import du composant Link

function InscriptionMenu() {

  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const handleLogin = (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      navigate("/home");  // Redirige vers la page "home"
  };

  return (
    <div className="inscription-menu">
      <form className="form" onSubmit={handleLogin}> {/* Ajout de onSubmit ici */}
        <h1>Enregistrement</h1>
        <input className="email" type="email" id="email" placeholder="Email" required/>
        <input type="password" className="password1" id="password" placeholder="Mot de passe" required/>
        <input type="password" className="password2" placeholder="Confirmez le mot de passe" required/>
        <button type="submit" className="inscriptionBouton">Enregistrer</button>
        <Link to="/" className="connectionBouton">Connexion ?</Link> {}
      </form>
    </div>
  );
}

export default InscriptionMenu;