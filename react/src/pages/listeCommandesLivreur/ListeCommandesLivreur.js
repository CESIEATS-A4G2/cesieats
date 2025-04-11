import React, { useState, useEffect } from "react";
import "./ListeCommandesLivreur.css";
import Header from "../../components/header/Header"
import CommandToDeliver from "../../components/commandToDeliver/CommandToDeliver";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

function ListeCommandesLivreur() {
    const navigate = useNavigate();

    useEffect(() => {
      const checkRoleAndRedirect = async () => {
        try {
          const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
          const role = res.data.user.role;
  
          console.log(role);
          switch (role) {
            case "DeliveryMan":
              break;
            case "Restaurateur":
              navigate("/commandes-restaurateur");
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
    
    const [commands, setCommands] = useState([]);
    
    // 🔥 Récupération des commandes via l'API
    useEffect(() => {
        api.getOrderByStatus("IN_PREPARATION")
            .then(res => {
                setCommands(res.data); 
            })
            .catch(error => console.error("Erreur lors de la récupération des commandes :", error));
    }, []);

    const deleteCommand = (id) => {
        setCommands(commands.filter(command => command.id !== id));
    };

    const handleCommandClick = (command) => {
        navigate("/livraison-livreur", { state: { command } }); // Redirige vers "/livraison-livreur"
    };

    return (
      <div className="liste-command-page">
      <Header role="DeliveryMan"/>
        <div className="liste-command-content">
          {commands.map((command) => (
            <CommandToDeliver 
              command={command} // 🔥 Passe l'objet entier ici
              onDelete={() => deleteCommand(command.id)}
              onClick={() => handleCommandClick(command)}
            />
          ))}
        </div>
      </div>
    );
}

export default ListeCommandesLivreur;
