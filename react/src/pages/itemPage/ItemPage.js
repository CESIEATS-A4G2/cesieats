import React, { useEffect, useState } from "react";
import "./ItemPage.css";
import "./ItemPageMobile.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api"; // Import de ton fichier API

function ItemPage() {
  const location = useLocation();
  const item_id = location.pathname.split('/').pop();
  const segments = location.pathname.split('/');
  const restaurantId = segments[segments.length - 3];

  const type = segments[segments.length - 2];
  const navigate = useNavigate();
  console.log("Restaurant ID : ", restaurantId)
  const isMobile = window.innerWidth <= 768;
  const account_id = "ACC000001";
  const [itemData, setItemData] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === "items") {
          response = await api.getItem(restaurantId, item_id);
        } else if (type === "menus") {
          response = await api.getMenu(restaurantId, item_id);
        }
        setItemData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
      }
    };

    fetchData();
  }, [item_id, restaurantId, type]);

  const { name, price, description, image } = itemData;

  const handleAddToCart = async () => {
    try {
      if (type === "items") {
        await api.addItemToCart(account_id, item_id, quantity);
      } else if (type === "menus") {
        await api.addMenuToCart(account_id, item_id, quantity);
      }
      window.location.reload();
      alert("L'item a été ajouté au panier !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la requête.";
      const errorDetails = error.response?.data?.error?.message || "Pas de détails supplémentaires.";
      alert('Erreur : ${errorMessage}\nDétails : ${errorDetails}');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (isMobile) {
    return (
      <div className="item-page-mobile">
        <Header role="User"/>
        <div className="item-content-mobile">
          <button className="back-btn-mobile" onClick={() => navigate(-1)}>← Retour</button>
          <div className="item-main-mobile">
            <img src={image} alt={name} className="item-image-mobile" />
            <div className="item-details-mobile">
              <h1>{name}</h1>
              <p className="price-mobile">{price}</p>
              <p>{description}</p>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
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
        <div className="item-main vertical">
          <img src={image} alt={name} className="item-image full-width" />
          <div className="item-details">
            <h1>{name}</h1>
            <p className="price">{price}</p>
            <p>{description}</p>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="add-btn" onClick={handleAddToCart}>Ajouter au panier</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;
