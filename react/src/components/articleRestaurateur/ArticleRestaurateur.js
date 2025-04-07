import React from "react";
import { useNavigate } from "react-router-dom";
import "./ArticleRestaurateur.css"; // CSS dédié pour les articles

function ArticleRestaurateur({ name, description, price, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/creationarticle-restaurateur", {
      state: {
        name,
        description,
        price,
        image,
      },
    });
  };

  return (
    <div className="article-card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default ArticleRestaurateur;
