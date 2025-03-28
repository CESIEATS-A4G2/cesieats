import React, { useState } from "react";
import "./TopNavBar.css";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import bannerLogo from "../../resources/images/CESIEat_BannerLogo.png";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // ← ajout du hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="topNavBarContainer">
        {/* Gauche : Hamburger + Logo */}
        <div className="topNavBarLeft">
          <FiAlignJustify className="hambIcon" onClick={toggleMenu} />
          <img
            src={bannerLogo}
            className="bannerLogo"
            alt="bannerLogo"
            onClick={() => navigate("/")} // ← redirection vers Home
            style={{ cursor: "pointer" }} // ← optionnel : curseur pointeur
          />
        </div>

        {/* Milieu : Barre de recherche */}
        <div className="topNavBarSearch">
          <FiSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Plats, courses alimentaires, boissons, etc."
            className="searchInput"
          />
        </div>

        {/* Droite : Panier */}
        <div className="topNavBarCart">
          <PiShoppingCartSimpleFill className="cartIcon" />
          Panier • 1
        </div>
      </div>

      {/* Menu latéral (Burger) */}
      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default TopNavBar;
