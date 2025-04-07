import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionArticle.css";
import ArticleRestaurateur from "../../components/articleRestaurateur/ArticleRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import doubleCheeseImage from "../../resources/images/doubleCheese.png";

function GestionArticle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const handleCreateArticle = (e) => {
        e.preventDefault(); 
        navigate("/creationarticle-restaurateur");
    };

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Articles</h1>
                <button className="create-btn" onClick={handleCreateArticle}>Créer</button>
            </div>

            <div className="columns">
                <ArticleRestaurateur
                    name="Cheeseburger"
                    description="Un délicieux cheeseburger avec fromage fondu"
                    price={5.99}
                    image={doubleCheeseImage}
                />
                <ArticleRestaurateur
                    name="Double Cheese"
                    description="Deux fois plus de fromage, deux fois plus de plaisir"
                    price={7.49}
                    image={doubleCheeseImage}
                />
                <ArticleRestaurateur
                    name="Double Cheese"
                    description="Deux fois plus de fromage, deux fois plus de plaisir"
                    price={7.49}
                    image={doubleCheeseImage}
                />
            </div>

            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default GestionArticle;
