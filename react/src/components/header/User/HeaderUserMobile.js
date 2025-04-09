import React, { useState, useEffect } from "react";
import "./HeaderUserMobile.css";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import Panier from "../../../pages/panier/Panier";
import { useNavigate } from "react-router-dom";
import bannerLogo from "../../../resources/images/CESIEat_BannerLogo.png";

function HeaderUserMobile() {
    const [isPanierOpen, setIsPanierOpen] = useState(false); // État pour le panier

    const navigate = useNavigate();

    const togglePanier = () => setIsPanierOpen(!isPanierOpen); // Fonction pour ouvrir/fermer le panier

    return (
        <>
            <div className="HeaderUserMobileContainer">
                {/* Logo */}
                <div className="logoContainer" onClick={() => navigate("/home")}>
                    <img src={bannerLogo} alt="CESIEATS" className="mobileLogo" />
                </div>

                {/* Icons */}
                <div className="iconsContainerMobile">
                    <FiBell className="notificationIcon" />
                    <FiShoppingCart className="cartIcon" onClick={togglePanier} />
                </div>
            </div>

            {/* Affichage du panier */}
            <Panier isOpen={isPanierOpen} onClose={() => setIsPanierOpen(false)} />
        </>
    );
}

export default HeaderUserMobile;
