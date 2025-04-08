import React, { useState, useEffect } from "react";
import "./TopNavBar.css";
import TopNavBarMobile from "./TopNavBarMobile"; 
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import bannerLogo from "../../resources/images/CESIEat_BannerLogo.png";

import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      </div>
    </>
  );
}

export default TopNavBar;
