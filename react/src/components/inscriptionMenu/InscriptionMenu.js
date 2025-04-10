import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./InscriptionMenu.css"; 
import { Link } from "react-router-dom"; 

function InscriptionMenu() {
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.querySelector('.inscription-password2').value;
    const role = form.role.value;
  
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    console.log({
      email,
      password,
      role,
      name: email
    });
  
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role,
          name: email // si nom non renseigné, envoie le mail (atm pas de champ existant)
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {      
        console.log(response);
        alert(data.msg || "Inscription réussie !");
        navigate("/");
      } else {
        alert(data.msg || "Erreur lors de l'inscription.");
      }
  
    } catch (err) {
      console.error("Erreur d'inscription :", err);
      alert("Erreur lors de l'inscription.");
    }
  };
  
  
  return (
    <div className="inscription-menu">
  <form className="inscription-form" onSubmit={handleRegister}>
    <h1>Enregistrement</h1>

    {/* Choix du rôle */}
    <div className="inscription-role">
      <label>
        <input
          type="radio"
          name="role"
          value="User"
          required
        />
        Client
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="DeliveryMan"
        />
        Livreur
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Restaurateur"
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
