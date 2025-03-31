import React from "react";
import "../TopNavBar.css";
import bannerLogo from "../../../resources/images/CESIEat_BannerLogo.png";
import { useNavigate } from "react-router-dom";

function HeaderDeconnecte() {
  const navigate = useNavigate(); // ← ajout du hook

  return (
    <>
      <div className="topNavBarContainer">
        {/* Gauche : Logo */}
        <div className="topNavBarLeft">
          <img
            src={bannerLogo}
            className="bannerLogo"
            alt="bannerLogo"
            onClick={() => navigate("/")} // ← redirection vers Home
            style={{ cursor: "pointer" }} // ← optionnel : curseur pointeur
          />
        </div>
      </div>

    </>
  );
}

export default HeaderDeconnecte;
