import React, { useState } from "react";
import "./GestionCommandeRestaurateur.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

function GestionCommandeRestaurateur() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const location = useLocation();
  const order = location.state?.order || "Pas d'order";
  const nomClient = location.state?.nomClient || "Client inconnu";
  const tempsPreparation = location.state?.duree || "Non défini";

  const items = order.items;
  const menus = order.menus;

  const handleClickInPrepa = () => {
    api.changeStatusByOrder(order._id, "IN_PREPARATION")
        .then(res => {
            console.log(res); 
            navigate(-1);
        })
        .catch(error => console.log("Erreur lors de la mise à jour du statut :", error));
  };

  const handleClickPendingCon = () => {
    api.changeStatusByOrder(order._id, "PENDING_CONFIRMATION")
        .then(res => {
            console.log(res); 
            navigate(-1);
        })
        .catch(error => console.log("Erreur lors de la mise à jour du statut :", error));
  };

  return (
    <div className="gestioncommand-restaurateur-page2">
      <div className="header-gestioncommand2">
        <FiAlignJustify className="menu-icon2" onClick={toggleMenu} />
        <h1 className="title2">Commandes</h1>
      </div>

      <BurgerMenuRestaurateur
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className="commande-container2">
        <div className="commande-details2">
          <h2 className="client-name2">{nomClient}</h2>
          <ul className="commande-list2">
            {Array.isArray(menus) && menus.length > 0 && (
              <>
                <h3>Menus</h3>
                {menus.map((cmd, index) => (
                  <li key={`menu-${index}`} className="commande-item2">
                    <span>{cmd.quantity} x {cmd.name}</span>
                    <span>{cmd.price} €</span>
                  </li>
                ))}
              </>
            )}

            {Array.isArray(items) && items.length > 0 && (
              <>
                <h3>Articles</h3>
                {items.map((item, index) => (
                  <li key={`item-${index}`} className="commande-item2">
                    <span>{item.quantity} x {item.name}</span>
                    <span>{item.price} €</span>
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className="commande-total2">
            <strong>Total</strong>
            <span>{order.totalPrice} €</span>
          </div>
        </div>

        <div className="commande-side2">
          <div className="ready-time2">
            {order.status === "IN_PREPARATION" ? (
              <h2>Commande prête à être récupérée</h2>
            ) : (
              <>
                <span>Temps de préparation</span>
                <h2>{tempsPreparation}</h2>
              </>
            )}
          </div>

          <div className="commande-buttons2">
            {order.status === "PENDING_CONFIRMATION" ? (
              <>
                <button className="refuser2">Refuser</button>
                <button className="accepter2" onClick={handleClickInPrepa}>Prête</button>
              </>
            ) : (
              <button className="accepter2" onClick={handleClickPendingCon}>Commande récupérée</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionCommandeRestaurateur;
