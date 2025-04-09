import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuRestaurateur.css";

function MenuRestaurateur({ id, name, image, description, price, items }) {
  const navigate = useNavigate();

  console.log("id, ", id)

  const handleClick = () => {
    navigate("/creationmenu-restaurateur", {
      state: {
        id,
        name,
        description,
        price,
        image,
        items,
      },
    });
  };

  return (
    <div className="menu-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default MenuRestaurateur;
