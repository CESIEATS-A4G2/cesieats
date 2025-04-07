import React from "react";
import "./ItemPage.css";
import "./ItemPageMobile.css";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api"; // Import de ton fichier API

function ItemPage() {
  const { state } = useLocation();
  const location = useLocation();
  const item_id = location.pathname.split('/').pop();

  const navigate = useNavigate();
  const account_id = "ACC000001"; // Remplace par l'ID de l'utilisateur connecté
  const {
    name,
    price,
    description,
    image,
    optionsLabel,
    options,
  } = state || {};


  const isMobile = window.innerWidth <= 768;

  const handleAddToCart = async () => {
    try {
      // Envoi de l'item au panier via l'API
      console.log("voila : ", account_id, item_id);
      await api.addItemToCart(account_id, item_id, 1);
      alert("L'item a été ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      alert("Une erreur est survenue lors de l'ajout au panier.");
    }
  };

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

              {options?.length > 0 && (
                <div className="option-block-mobile">
                  <div className="option-title-mobile">
                    <strong>{optionsLabel}</strong>
                    <span className="mandatory-mobile">Obligatoire</span>
                  </div>
                  <p>Choisissez-en 1</p>
                  {options.map((option, i) => (
                    <label key={i} className="option-line-mobile">
                      <input type="radio" name="option" />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              <button className="add-btn-mobile" onClick={handleAddToCart}>Ajouter au panier</button>
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

            {options?.length > 0 && (
              <div className="option-block">
                <div className="option-title">
                  <strong>{optionsLabel}</strong>
                  <span className="mandatory">Obligatoire</span>
                </div>
                <p>Choisissez-en 1</p>
                {options.map((option, i) => (
                  <label key={i} className="option-line">
                    <input type="radio" name="option" />
                    {option}
                  </label>
                ))}
              </div>
            )}

            <button className="add-btn" onClick={handleAddToCart}>Ajouter au panier</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;
