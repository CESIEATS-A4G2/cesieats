import React, { useState, useEffect } from "react";
import "./CreationMenu.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

import doubleCheeseImage from "../../resources/images/doubleCheese.png";
import frites from "../../resources/images/frites.png";
import glace from "../../resources/images/icecream-bowl.png";
import nuggets from "../../resources/images/nuggets.png";

function CreationMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.restaurantId || "RES000001";
  const isNew = location.state?.mode === "new";

  const menuData = location.state || {};

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [menuName, setMenuName] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setMenuName(menuData.name || "");
      setDescription(menuData.description || "");
      setPrice(menuData.price || "");
      setImage(menuData.image || null);
      setItems(menuData.items || []);
    }
  }, []);

  const [availableItems] = useState([
    { name: "CheeseBurger", image: doubleCheeseImage },
    { name: "Frites", image: frites },
    { name: "Glace", image: glace },
    { name: "Nuggets", image: nuggets },
  ]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAddItem = () => setShowModal(true);

  const handleSelectItem = (item) => {
    setItems([...items, { name: item.name, image: item.image }]);
    setShowModal(false);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      restaurant_id: restaurantId,
      name: menuName,
      description,
      price,
      image,
    };

    try {
      await api.createMenu(restaurantId, data);
      alert("✅ Menu créé avec succès !");
      navigate("/gestionmenu-restaurateur");
    } catch (error) {
      console.error("Erreur lors de la création du menu :", error);
      alert("❌ Une erreur est survenue lors de l'ajout du menu.");
    }
  };

  return (
    <div className="command-restaurateur-page">
      <div className="header">
        <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
        <h1 className="title">Création de menu</h1>
      </div>

      <form className="creation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="menuName">Nom du menu</label>
          <input
            type="text"
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Entrez le nom du menu"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Entrez une description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Entrez le prix"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Choisir une image</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <button type="button" onClick={handleAddItem} className="add-item-btn">
            Ajouter un article
          </button>
        </div>

        <div className="items-list">
          <h4>Articles dans le menu :</h4>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="item">
                <img src={item.image} alt={item.name} className="item-image" />
                <span>{item.name}</span>
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="submit-btn">Ajouter le menu</button>
      </form>

      <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Choisissez un article</h2>
            <div className="modal-items">
              {availableItems.map((item, index) => (
                <div key={index} className="modal-item" onClick={() => handleSelectItem(item)}>
                  <img src={item.image} alt={item.name} className="modal-item-image" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="close-modal-btn">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreationMenu;
