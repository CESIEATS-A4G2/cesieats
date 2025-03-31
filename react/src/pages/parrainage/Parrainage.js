import React from "react";
import "./Parrainage.css";
import TopNavBar from "../../components/header/TopNavBar";
import SiteFooter from "../../components/footer/SiteFooter";
import { FaUsers, FaPaperPlane, FaEnvelope } from "react-icons/fa";
import icecream from "../../resources/images/icecream-bowl.png";

function Parrainage() {
  const code = "cesieats-fdg12qsdkm";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copié !");
  };

  return (
    <>
      <TopNavBar />
      <div className="parrainage-container">
        <FaUsers className="icon-large" />
        <h1>
          À plusieurs, <span className="highlight">c’est toujours meilleur</span>
        </h1>
        <p className="subtitle">
          Obtenez des promotions pour vous et vos amis lors de leurs premières commandes !
        </p>

        <div className="parrainage-section">
          <FaPaperPlane className="icon-medium" />
          <h2>
            Partager ce code pour gagner <span className="highlight">10€ de réduction</span>
          </h2>
          <p className="description">
            Code valable pour un minimum de commande de 15€. Applicable lors des 2 premières
            commandes après la création d’un nouveau compte CesiEats. Après utilisation du code par
            un ami, la réduction s’appliquera automatiquement sur votre prochaine commande.
          </p>

          <div className="code-box">
            <span>{code}</span>
            <button onClick={copyToClipboard}>Copier</button>
          </div>

          <button className="email-button">
            Envoyer par email <FaEnvelope className="mail-icon" />
          </button>
        </div>

        <img src={icecream} alt="dessert" className="illustration" />
      </div>
      <SiteFooter />
    </>
  );
}

export default Parrainage;
