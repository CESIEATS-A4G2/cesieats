import React, { useState } from "react";
import "./ListeCommandesLivreur.css";
import Header from "../../components/header/TopNavBar";
import CommandToDeliver from "../../components/commandToDeliver/CommandToDeliver";
import { useNavigate } from "react-router-dom";

function ListeCommandesLivreur() {
    const navigate = useNavigate();

    const [commands, setCommands] = useState([
        { id: 1, price: "20", deliveryTime: "10", distance: "8.7", restaurantAddress: "25 Avenue du McDo, 13290 Aix", deliveryAddress: "280 Avenue du Bidule, 13290 Aix" },
        { id: 2, price: "18", deliveryTime: "15", distance: "5.2", restaurantAddress: "10 Rue des Oliviers, 13090 Marseille", deliveryAddress: "12 Avenue du Soleil, 13090 Marseille" },
        { id: 3, price: "30", deliveryTime: "8", distance: "12.3", restaurantAddress: "3 Rue du Louvre, 75001 Paris", deliveryAddress: "50 Boulevard Haussmann, 75008 Paris" },
    ]);

    const deleteCommand = (id) => {
        setCommands(commands.filter(command => command.id !== id));
    };

    const handleCommandClick = (command) => {
        navigate("/livraison-livreur", { state: { command } }); // 🔥 Redirige vers "/livraison-livreur"
    };

    return (
      <div className="liste-command-page">
        <Header />
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
              onClick={() => handleCommandClick(command)} // 🔥 Passe l'ID de la commande
            />
          ))}
        </div>
      </div>
    );
}

export default ListeCommandesLivreur;
