import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./InscriptionMenu.css"; 
import { Link } from "react-router-dom"; 

function InscriptionMenu() {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate("/home");  
  };

  return (
    <div className="inscription-menu">
  <form className="inscription-form" onSubmit={handleLogin}>
    <h1>Enregistrement</h1>

    {/* Choix du rôle */}
    <div className="inscription-role">
      <label>
        <input
          type="radio"
          name="role"
          value="client"
          required
        />
        Client
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="livreur"
        />
        Livreur
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="restaurateur"
        />
        Restaurateur
      </label>
    </div>

    <input className="inscription-email" type="email" id="email" placeholder="Email" required />
    <input type="password" className="inscription-password1" id="password" placeholder="Mot de passe" required />
    <input type="password" className="inscription-password2" placeholder="Confirmez le mot de passe" required />
    <button type="submit" className="inscription-boutonValid">Enregistrer</button>
    <Link to="/" className="inscription-connectionBouton">Connexion ?</Link>
  </form>
</div>

  );
}

export default InscriptionMenu;
