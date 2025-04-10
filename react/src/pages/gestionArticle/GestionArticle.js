import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionArticle.css";
import ArticleRestaurateur from "../../components/articleRestaurateur/ArticleRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import api from "../../api";
import axios from "axios";

function GestionArticle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            try {
                const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
                const role = res.data.user.role;

                console.log(role);
                switch (role) {
                    case "DeliveryMan":
                        navigate("/liste-commandes-livreur");
                        break;
                    case "Restaurateur":
                        break;
                    case "Admin":
                        break;
                    default:
                        navigate("/home");
                }
            } catch (error) {
                console.error("Erreur d'authentification :", error);
            }
        };
        checkRoleAndRedirect();
    }, [navigate]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const handleCreateArticle = (e) => {
        e.preventDefault(); 
        navigate("/creationarticle-restaurateur", {
            state: {
              id : "new",
              name : "new",
              description : "new",
              price : "new",
              image : "new",
              items : "new",
            },
          });    };

    useEffect(() => {
        api.getAllItemsByRestaurant("RES000001")
          .then(res => {
            setItems(res.data);
          })
          .catch(err => console.error("Erreur lors de la récupération des menus :", err));
    }, []);

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Articles</h1>
                <button className="create-btn" onClick={handleCreateArticle}>Créer</button>
            </div>

            <div className="columns">
                {items.map((item, index) => (
                    <ArticleRestaurateur
                        key={index}
                        id={item.item_id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                 ))}
            </div>

            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default GestionArticle;
