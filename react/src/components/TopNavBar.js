/* TODO :

- MAKE hamb. menu with all elements
- LINK cart service
- LINK all menu items on hamb. menu
- CHANGE logo from text to image
- REVIEW behaviour (collapsible, etc.)
- REVIEW & MAKE search bar

*/

import React from "react";
import './TopNavBar.css';
import { FiAlignJustify, FiSearch } from "react-icons/fi"; //https://react-icons.github.io/react-icons/
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import bannerLogo from '../Resources/CESIEat_BannerLogo.png';

function topNavBar() {
  return (
    <div className="topNavBarContainer">

      {/* Hamb. Menu & bannerLogo*/}
      <div className="topNavBarLeft">
        <FiAlignJustify className="hambIcon"/>
        <img src={bannerLogo} className="bannerLogo" alt="bannerLogo"/>
      </div>

      {/* Search entry*/}
      <div className="topNavBarSearch">
      <FiSearch className="searchIcon"/>
        <input
          type="text"
          placeholder="Plats, courses alimentaires, boissons, etc."
          className="searchInput"
        />
      </div>

      {/* Cart button*/}
      <div className="topNavBarCart">
        <PiShoppingCartSimpleFill className="cartIcon"/>
        Panier • 1
      </div>
    </div>
  );
}

export default topNavBar;
