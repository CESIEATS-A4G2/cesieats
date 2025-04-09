import React from "react";
import HeaderUser from "./User/HeaderUser";
import HeaderUserMobile from "./User/HeaderUserMobile";
import HeaderLivreur from "./Livreur/HeaderLivreur";
import HeaderAdmin from "./Admin/HeaderAdmin";

function Header({ role }) {
  const headers = {
    User: <HeaderUser />,
    DeliveryMan: <HeaderLivreur />,
    Admin: <HeaderAdmin />
  };

  return headers[role] || <HeaderUser />; // Fallback par défaut
}

export default Header;
