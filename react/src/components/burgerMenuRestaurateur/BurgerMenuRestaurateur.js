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
    <div className="burger-menuresto-overlay">
      <div className="burger-menuresto" ref={menuRef}>
        <div className="burger-headerresto">
          <img src={pfp} alt="Profil" className="burger-avatarresto" />
          <h2>Aurélien</h2>
        </div>

        <div
          className="suitcase-itemresto"
          onClick={() => {
            onClose();
            navigate("/commandes-restaurateur");
          }}
        >
          <FaSuitcase className="suitcase-iconresto" />
          <span>Commandes</span>
        </div>

  
        <div
          className="menu-itemresto"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/gestionmenu-restaurateur");
          }}
        >
          <FaClipboardList className="menu-iconresto" />
          <span>Menu</span>
        </div>

        <div
          className="article-itemresto"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/home");
          }}
        >
          <FaHamburger className="article-iconresto" />
          <span>Articles</span>
        </div>

        <div
          className="account-itemresto"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/mon-compte");
          }}
        >
          <FaUser className="account-iconresto" />
          <span>Compte</span>
        </div>

        <div
          className="stat-itemresto"
          onClick={() => {
            onClose(); // ferme le menu
            navigate("/home");
          }}
        >
          <FaChartLine className="stat-iconresto" />
          <span>Statistique</span>
        </div>

      </div>
    </div>
  );
}

export default BurgerMenuRestaurateur;
