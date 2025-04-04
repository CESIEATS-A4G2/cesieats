import React, { useState, useEffect } from "react";
import "./TopNavBar.css";
import TopNavBarMobile from "./TopNavBarMobile"; // 🔥 Importation de la version mobile
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import bannerLogo from "../../resources/images/CESIEat_BannerLogo.png";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import Panier from "../../pages/panier/Panier";
import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanierOpen, setIsPanierOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détecter si mobile

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePanier = () => setIsPanierOpen(!isPanierOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <TopNavBarMobile />;
  }

  return (
    <>
      <div className="topNavBarContainer">
        <div className="topNavBarLeft">
          <FiAlignJustify className="hambIcon" onClick={toggleMenu} />
          <img
            src={bannerLogo}
            className="bannerLogo2"
            alt="bannerLogo"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="topNavBarCart" onClick={togglePanier}>
          <PiShoppingCartSimpleFill className="cartIcon" />
          Panier • 1
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Panier isOpen={isPanierOpen} onClose={() => setIsPanierOpen(false)} />
    </>
  );
}

export default TopNavBar;
