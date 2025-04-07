import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuRestaurateur.css";

function MenuRestaurateur({ name, image}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home", {
      state: {
        name,
        image
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
