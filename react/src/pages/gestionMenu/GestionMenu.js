import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionMenu.css";
import MenuRestaurateur from "../../components/menuRestaurateur/MenuRestaurateur";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import api from "../../api";
import axios from "axios";


function GestionMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  useEffect(() => {
      api.getAllMenus("RES000001")
        .then(res => {
          console.log("Menus récupérés :", res.data);
          setMenus(res.data);
        })
        .catch(err => console.error("Erreur lors de la récupération des menus :", err));
  }, []);

  const handleCreateMenu = () => {
    navigate("/creationmenu-restaurateur", {
      state: {
        id : "new",
        name : "new",
        description : "new",
        price : "new",
        image : "new",
        items : "new",
      },
    });
  }

  {menus.map((menu, index) => (
    console.log("menus, ", menu)
  ))}

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
            id={menu.menu_id}
            name={menu.name}
            description={menu.description}
            price={menu.price}
            image={menu.image}
            items={menu.Items}
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
