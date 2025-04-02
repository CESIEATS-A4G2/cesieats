import React from "react";
import "./ItemPage.css";
import "./ItemPageMobile.css";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import { useLocation, useNavigate } from "react-router-dom";

function ItemPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    name,
    price,
    description,
    image,
    optionsLabel,
    options,
  } = state || {};

  // Détecte si l'utilisateur est sur un appareil mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <div className="item-page-mobile">
        <Header />
        <div className="item-content-mobile">
          <button className="back-btn-mobile" onClick={() => navigate(-1)}>← Retour</button>
          <div className="item-main-mobile">
            <img src={image} alt={name} className="item-image-mobile" />
            <div className="item-details-mobile">
              <h1>{name}</h1>
              <p className="price-mobile">{price}</p>
              <p>{description}</p>

              <div className="option-block-mobile">
                <div className="option-title-mobile">
                  <strong>{optionsLabel}</strong>
                  <span className="mandatory-mobile">Obligatoire</span>
                </div>
                <p>Choisissez-en 1</p>
                {options?.map((option, i) => (
                  <label key={i} className="option-line-mobile">
                    <input type="radio" name="option" />
                    {option}
                  </label>
                ))}
              </div>

              <button className="add-btn-mobile">Ajouter au panier</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="item-page">
      <Header />
      <div className="item-content">
        <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>
        <div className="item-main">
          <img src={image} alt={name} className="item-image" />
          <div className="item-details">
            <h1>{name}</h1>
            <p className="price">{price}</p>
            <p>{description}</p>

            <div className="option-block">
              <div className="option-title">
                <strong>{optionsLabel}</strong>
                <span className="mandatory">Obligatoire</span>
              </div>
              <p>Choisissez-en 1</p>
              {options?.map((option, i) => (
                <label key={i} className="option-line">
                  <input type="radio" name="option" />
                  {option}
                </label>
              ))}
            </div>

            <button className="add-btn">Ajouter au panier</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;
