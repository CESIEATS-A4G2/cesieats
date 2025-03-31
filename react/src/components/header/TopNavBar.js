import React, { useState } from "react";
import "./TopNavBar.css";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import bannerLogo from "../../resources/images/CESIEat_BannerLogo.png";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import Panier from "../../pages/panier/Panier";
import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanierOpen, setIsPanierOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePanier = () => setIsPanierOpen(!isPanierOpen);

  return (
    <>
      <div className="topNavBarContainer">
        <div className="topNavBarLeft">
          <FiAlignJustify className="hambIcon" onClick={toggleMenu} />
          <img
            src={bannerLogo}
            className="bannerLogo2"
            alt="bannerLogo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="topNavBarSearch">
          <FiSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Plats, courses alimentaires, boissons, etc."
            className="searchInput"
          />
        </div>

        <div className="topNavBarCart" onClick={togglePanier}>
          <PiShoppingCartSimpleFill className="cartIcon" />
          Panier • 1
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Panier isOpen={isPanierOpen} onClose={() => setIsPanierOpen(false)} /> {/* 🔥 Ajout du panier */}
    </>
  );
}

export default TopNavBar;
