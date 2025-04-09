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
import axios from "axios";

function CreationMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.restaurantId || "RES000001";
  const isNew = location.state?.id === "new";

  const menuData = location.state || {};

  const [menuId, setMenuId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [menuName, setMenuName] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const preset_key = "cldinery";
  const cloud_name = "dzsnjlgc5";

  useEffect(() => {
    if (!isNew) {
      setMenuId(menuData.id || ""); // ou menuData.menu_id selon ta structure
      setMenuName(menuData.name || "");
      setDescription(menuData.description || "");
      setPrice(menuData.price || "");
      setImage(menuData.image || null);
      setItems(Array.isArray(menuData.items) ? menuData.items : []);
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

  function handleFile(event){
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key); // Remplace par ton upload preset
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    .then(res => setImage(res.data.secure_url))
    .catch(err => console.error(err));
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataCre = {
      restaurant_id: restaurantId,
      name: menuName,
      description,
      price,
      image,
    };
    const dataUp = {
      menu_id: menuId,
      restaurant_id: restaurantId,
      name: menuName,
      description,
      price,
      image,
    };

    try {
      if (isNew) {
        await api.createMenu(restaurantId, dataCre);
        alert("✅ Menu créé avec succès !");
      } else {
        await api.updateMenuMajUser(restaurantId, dataUp);
        alert("✅ Menu modifié avec succès !");
      }
      navigate("/gestionmenu-restaurateur");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du menu :", error);
      alert("❌ Une erreur est survenue lors de l'enregistrement du menu.");
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
          <input
          type="file"
          onChange={handleFile}
          className="form-group"
          />
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

        <button type="submit" className="submit-btn">
          {isNew ? "Ajouter le menu" : "Modifier le menu"}
        </button>
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
