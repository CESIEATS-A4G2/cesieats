import React, { useRef, useEffect } from "react";
import "./BurgerMenu.css";
import pfp from "../../resources/images/pfp.png";
import { FaUser, FaBoxOpen, FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BurgerMenu({ isOpen, onClose }) {
  const menuRef = useRef();
  const navigate = useNavigate(); // 💡 à mettre AVANT le return conditionnel

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="burger-menu-overlay">
      <div className="burger-menu" ref={menuRef}>
        <div className="burger-header">
          <img src={pfp} alt="Profil" className="burger-avatar" />
          <h2>Aurélien</h2>
        </div>

        <div
          className="burger-item"
          onClick={() => {
            onClose();
            navigate("/mon-compte");
          }}
        >
          <FaUser className="burger-icon" />
          <span>Gérer le compte</span>
        </div>

  
        <div
          className="burger-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/historique-commande");
          }}
        >
          <FaGift className="burger-icon" />
          <span>Commandes</span>
        </div>
        <div
          className="burger-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/parrainage");
          }}
        >
          <FaGift className="burger-icon" />
          <span>Parrainage</span>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
