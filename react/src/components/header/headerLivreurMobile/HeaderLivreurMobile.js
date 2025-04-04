import React from "react";
import "./HeaderLivreurMobile.css";
import { FiBell, FiUser } from "react-icons/fi";
import bannerLogo from "../../../resources/images/CESIEat_BannerLogo.png";
import { useNavigate } from "react-router-dom";

function HeaderLivreurMobile() {

    const navigate = useNavigate();

    return (
        <>
            <div className="topNavBarMobileContainer">
                {/* Logo */}
                <div className="logoContainer" onClick={() => navigate("/liste-commandes-livreur")}>
                    <img src={bannerLogo} alt="CESIEATS" className="mobileLogo" />
                </div>

                {/* Icons */}
                <div className="iconsContainerMobile">
                    <FiBell className="notificationIcon" />
                    <FiUser className="accountIcon" onClick={() => navigate("/mon-compte")} /> {/* Icône de compte */}
                </div>
            </div>
        </>
    );
}

export default HeaderLivreurMobile;
