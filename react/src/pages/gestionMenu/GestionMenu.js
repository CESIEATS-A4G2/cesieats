import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionMenu.css";
import MenuRestaurateur from "../../components/menuRestaurateur/MenuRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";

// Images des articles
import doubleCheeseImage from "../../resources/images/doubleCheese.png";
import frites from "../../resources/images/frites.png";
import glace from "../../resources/images/icecream-bowl.png";
import nuggets from "../../resources/images/nuggets.png";

function GestionMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Exemple de menus existants
  const menus = [
    {
      name: "Best Of",
      description: "Menu classique avec burger, frites et boisson",
      price: "9.99",
      image: doubleCheeseImage,
      items: [
        { name: "CheeseBurger", image: doubleCheeseImage },
        { name: "Frites", image: frites },
      ],
    },
    {
      name: "Menu Enfant",
      description: "Un menu adapté aux enfants",
      price: "6.50",
      image: nuggets,
      items: [
        { name: "Nuggets", image: nuggets },
        { name: "Glace", image: glace },
      ],
    },
    {
      name: "Double Burger",
      description: "Pour les gros appétits",
      price: "11.50",
      image: doubleCheeseImage,
      items: [
        { name: "Double CheeseBurger", image: doubleCheeseImage },
        { name: "Frites", image: frites },
        { name: "Glace", image: glace },
      ],
    },
  ];

  const handleCreateMenu = () => {
    navigate("/creationmenu-restaurateur"); // Nouvelle création
  };

  return (
    <div className="command-restaurateur-page">
      <div className="header">
        <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
        <h1 className="title">Menus</h1>
        <button className="create-btn" onClick={handleCreateMenu}>
          Créer
        </button>
      </div>

      <div className="columns">
        {menus.map((menu, index) => (
          <MenuRestaurateur
            key={index}
            name={menu.name}
            description={menu.description}
            price={menu.price}
            image={menu.image}
            items={menu.items}
          />
        ))}
      </div>

      <BurgerMenuRestaurateur
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}

export default GestionMenu;
