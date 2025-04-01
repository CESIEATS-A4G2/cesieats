import React from "react";
import "./TopNavBarMobile.css";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import bannerLogo from "../../resources/images/CESIEat_BannerLogo.png";
import { useNavigate } from "react-router-dom";

function TopNavBarMobile() {
    const navigate = useNavigate();

    return (
        <div className="topNavBarMobileContainer">
            {/* Logo */}
            <div className="logoContainer" onClick={() => navigate("/")}>
                <img src={bannerLogo} alt="CESIEATS" className="mobileLogo" />
            </div>

            {/* Icons */}
            <div className="iconsContainerMobile">
                <FiBell className="notificationIcon" />
                <FiShoppingCart className="cartIcon" onClick={() => navigate("/panier")} />
            </div>
        </div>
    );
}

export default TopNavBarMobile;
