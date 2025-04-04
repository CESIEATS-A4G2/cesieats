import React, { useRef, useEffect } from "react";
import "./BurgerMenuRestaurateur.css";
import pfp from "../../resources/images/pfp.png";
import { FaUser, FaSuitcase, FaClipboardList, FaHamburger, FaChartLine} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BurgerMenuRestaurateur({ isOpen, onClose }) {
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
          className="suitcase-item"
          onClick={() => {
            onClose();
            navigate("/commandes-restaurateur");
          }}
        >
          <FaSuitcase className="suitcase-icon" />
          <span>Commandes</span>
        </div>

  
        <div
          className="menu-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/home");
          }}
        >
          <FaClipboardList className="menu-icon" />
          <span>Menu</span>
        </div>

        <div
          className="article-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/home");
          }}
        >
          <FaHamburger className="article-icon" />
          <span>Articles</span>
        </div>

        <div
          className="account-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/mon-compte");
          }}
        >
          <FaUser className="account-icon" />
          <span>Compte</span>
        </div>

        <div
          className="stat-item"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/home");
          }}
        >
          <FaChartLine className="stat-icon" />
          <span>Statistique</span>
        </div>

      </div>
    </div>
  );
}

export default BurgerMenuRestaurateur;
