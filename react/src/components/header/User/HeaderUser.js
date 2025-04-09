import React, { useState, useEffect } from "react";
import "./HeaderUser.css";
import HeaderUserMobile from "./HeaderUserMobile";
import { FiAlignJustify } from "react-icons/fi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import bannerLogo from "../../../resources/images/CESIEat_BannerLogo.png";
import BurgerMenu from "../../burgerMenu/BurgerMenu";
import Panier from "../../../pages/panier/Panier";
import { useNavigate } from "react-router-dom";
import api from '../../../api'; // 🔥 Importation de ton fichier API

function HeaderUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanierOpen, setIsPanierOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [itemCount, setItemCount] = useState(0); // 🔥 Nouvelle state pour compter les items

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePanier = () => setIsPanierOpen(!isPanierOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchCartItemCount(); // 🔥 Appel de la fonction pour compter les items
  }, []);

  const fetchCartItemCount = async () => {
    try {
      const response = await api.getCart("ACC000001"); // 🔥 Remplace par ton ID de compte actuel
      const cartData = response.data;

      // Compter le nombre total d'items
      const totalItems = cartData.Items.reduce((acc, item) => acc + item.Cart_Item.quantity, 0);

      // Compter le nombre total de menus
      const totalMenus = cartData.Menus?.length || 0;

      const totalCount = totalItems + totalMenus;
      setItemCount(totalCount); // 🔥 Mise à jour du nombre total
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
    }
  };

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
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="HeaderUserCart" onClick={togglePanier}>
          <PiShoppingCartSimpleFill className="cartIcon" />
          Panier • {itemCount} {/* 🔥 Affiche dynamiquement le nombre d’items */}
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Panier isOpen={isPanierOpen} onClose={() => setIsPanierOpen(false)} />
    </>
  );
}

export default HeaderUser;
