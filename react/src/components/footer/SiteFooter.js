import React, { useState, useEffect } from "react";
import './SiteFooter.css';
import { FaHome, FaReceipt, FaUser } from "react-icons/fa";
import { FaSquareFacebook, FaSquareTwitter, FaInstagram } from "react-icons/fa6"; 
import { IoLanguageOutline } from "react-icons/io5";
import bannerLogo from '../../resources/images/CESIEat_BannerLogo.png';
import { useNavigate } from "react-router-dom";

function SiteFooter() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <div className="footerMobile">
                    <div className="mobileIcon" onClick={() => navigate("/")}>
                        <FaHome />
                        <p>Home</p>
                    </div>
                    <div className="mobileIcon" onClick={() => navigate("/historique")}>
                        <FaReceipt />
                        <p>Orders</p>
                    </div>
                    <div className="mobileIcon" onClick={() => navigate("/mon-compte")}>
                        <FaUser />
                        <p>User</p>
                    </div>
                </div>
            ) : (
                <div className="footerContainer">
                    <img src={bannerLogo} className="bannerLogo" alt="bannerLogo"/>
                    <div className="footLinks">
                        <div className="footLinksGauche">
                            <div className="footIcons">
                                <FaSquareFacebook className="footIcon"/>
                                <FaSquareTwitter className="footIcon"/>
                                <FaInstagram className="footIcon"/>
                            </div>
                            <div className="footLanguageIcon">
                                <IoLanguageOutline className="footIcon"/> 
                                <p> Français </p>
                            </div>
                        </div>
                        <div className="footTexts">
                            <a href="#"> Politique de confidentialité </a>
                            <a href="#"> Conditions d'utilisation </a>
                            <a href="#"> Mes informations personnelles </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SiteFooter;
