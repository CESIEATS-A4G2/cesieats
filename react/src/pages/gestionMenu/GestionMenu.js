import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "./GestionMenu.css";
import MenuRestaurateur from "../../components/menuRestaurateur/MenuRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";  // Import de l'icône
import doubleCheeseImage from "../../resources/images/doubleCheese.png";

function GestionMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialiser useNavigate

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
      const handleCreateMenu = (e) => {
        e.preventDefault(); 
        navigate("/creationnmenu-restaurateur");  
      };

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Menus</h1>
                <button className="create-btn" onClick={handleCreateMenu}>Créer</button>
            </div>

            <div className="columns">
                <MenuRestaurateur name={"Best of"} image={doubleCheeseImage} />
                <MenuRestaurateur name={"Best of"} image={doubleCheeseImage} />
                <MenuRestaurateur name={"Best of"} image={doubleCheeseImage} />
            </div>
            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default GestionMenu;
