import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 👈
import "./CreationMenu.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";

import doubleCheeseImage from "../../resources/images/doubleCheese.png";
import frites from "../../resources/images/frites.png";
import glace from "../../resources/images/icecream-bowl.png";
import nuggets from "../../resources/images/nuggets.png";

function CreationMenu() {
  const location = useLocation(); // 👈 Récupération des données
  const menuData = location.state || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuName, setMenuName] = useState(menuData.name || "");
  const [description, setDescription] = useState(menuData.description || "");
  const [price, setPrice] = useState(menuData.price || "");
  const [image, setImage] = useState(menuData.image || null);
  const [items, setItems] = useState(menuData.items || []);
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ menuName, description, price, image, items });
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
