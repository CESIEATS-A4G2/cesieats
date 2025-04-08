import React, { useState, useEffect } from "react";
import "./ListeCommandesLivreur.css";
import HeaderLivreurMobile from "../../components/header/headerLivreurMobile/HeaderLivreurMobile";
import CommandToDeliver from "../../components/commandToDeliver/CommandToDeliver";
import { useNavigate } from "react-router-dom";
import api from "../../api";  // Assure-toi que c'est bien importé

function ListeCommandesLivreur() {
    const navigate = useNavigate();
    const [commands, setCommands] = useState([]);
    
    // 🔥 Récupération des commandes via l'API
    useEffect(() => {
        api.getOrderByStatus("PENDING CONFIRMATION")
            .then(response => {
                const fetchedCommands = response.data.map(command => ({
                    id: command.id,
                    price: command.price,
                    deliveryTime: command.deliveryTime,
                    distance: command.distance,
                    restaurantAddress: command.restaurantAddress,
                    deliveryAddress: command.deliveryAddress
                }));
                setCommands(fetchedCommands);
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
        <HeaderLivreurMobile />
        <div className="liste-command-content">
          {commands.map((command) => (
            <CommandToDeliver 
              key={command.id}
              price={command.price} 
              deliveryTime={command.deliveryTime} 
              distance={command.distance} 
              restaurantAddress={command.restaurantAddress} 
              deliveryAddress={command.deliveryAddress}
              onDelete={() => deleteCommand(command.id)}
              onClick={() => handleCommandClick(command)}
            />
          ))}
        </div>
      </div>
    );
}

export default ListeCommandesLivreur;
