/* TODO :

- MAKE hamb. menu with all elements
- LINK cart service
- LINK all menu items on hamb. menu
- CHANGE logo from text to image
- REVIEW behaviour (collapsible, etc.)
- REVIEW & MAKE search bar

*/

import React from "react";
import './SiteFooter.css';
import { FaSquareFacebook, FaSquareTwitter, FaInstagram } from "react-icons/fa6"; // https://react-icons.github.io/react-icons/
import { IoLanguageOutline } from "react-icons/io5";
import bannerLogo from '../../resources/images/CESIEat_BannerLogo.png';


function SiteFooter() {
    return (
        <div className="footerContainer">
            <img src={bannerLogo} className="bannerLogo" alt="bannerLogo"/>
            <div className="footLinks">
                <div className="footIcons">
                    <FaSquareFacebook className="footIcon"/>
                    <FaSquareTwitter className="footIcon"/>
                    <FaInstagram className="footIcon"/>
                    <div className="footLanguageIcon">
                        <IoLanguageOutline className="footIcon"/> 
                        <p> Francais </p>
                    </div>
                </div>
                <div className="footTexts">
                    <a href="../public/index.html"> Politique de confidentialité </a>
                    <a href="../public/index.html"> Conditions d'utilisation </a>
                    <a href="../public/index.html"> Mes informations personnelles </a>
                </div>
            </div>
        </div>
    );
}

export default SiteFooter;
