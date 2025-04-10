import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ConnexionMenu.css";
import { Link } from "react-router-dom"; 

function ConnexionMenu() {
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        credentials: "include", // pour gérer les cookies
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error("Erreur d'identifiants");
      }
  
      console.log(response);
      navigate("/home");  
    } catch (err) {
      console.error("Erreur de connexion:", err);
      alert("Échec de la connexion");
    }
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
