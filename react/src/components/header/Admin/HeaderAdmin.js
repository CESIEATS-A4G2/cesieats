import React, { useState, useEffect } from "react";
import "../User/HeaderUser.css";
import HeaderUserMobile from "../User/HeaderUserMobile"; // 🔥 Importation de la version mobile
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import bannerLogo from "../../../resources/images/CESIEat_BannerLogo.png";
import BurgerMenuAdmin from "../../burgerMenu/BurgerMenuAdmin";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détecter si mobile

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <HeaderUserMobile />;
  }

  return (
    <>
      <div className="HeaderUserContainer">
        <div className="HeaderUserLeft">
          <FiAlignJustify className="hambIcon" onClick={toggleMenu} />
          <img
            src={bannerLogo}
            className="bannerLogo2"
            alt="bannerLogo"
            onClick={() => navigate("/gestioncommand-admin")} // A UPDATE !!!
            style={{ cursor: "pointer" }}
          />
        </div>
        
      </div>

      <BurgerMenuAdmin isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default HeaderAdmin;
